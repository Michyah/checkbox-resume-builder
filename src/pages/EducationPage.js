// ===== EDUCATION PAGE =====
import { state, saveToStorage, generateId } from '../utils/store.js';
import { showToast, renderTopBar, sortAlpha, formatDateRange, esc } from '../utils/helpers.js';
import { renderResumePreview } from '../components/ResumePreview.js';

let editingId = null;

export function renderEducationPage() {
  state.currentStep = 1;
  const app = document.getElementById('app');
  app.innerHTML = '';

  const page = document.createElement('div');
  page.id = 'page-education';
  page.className = 'page active';

  page.innerHTML = `
    <div id="topbar-edu"></div>
    <div class="split-layout">
      <div class="split-left">
        <div class="section-header">
          <div class="section-eyebrow">Step 2 of 6</div>
          <h2>Education</h2>
          <p class="section-desc">Add your educational background. Check the ones you want to appear on your résumé.</p>
        </div>
        <div id="education-tiles"></div>
        <button class="add-tile" id="btn-add-edu">+ Add Education</button>
        <div class="nav-footer">
          <button class="btn btn-ghost" id="btn-edu-back">← Back</button>
          <button class="btn btn-primary" id="btn-edu-next">Next: Experience →</button>
        </div>
      </div>
      <div class="split-right">
        <div id="resume-preview-container"></div>
      </div>
    </div>
    <!-- MODAL -->
    <div class="modal-overlay" id="edu-modal">
      <div class="modal">
        <div class="modal-title" id="edu-modal-title">Add Education</div>
        <div class="form-group">
          <label>Institution Name *</label>
          <input type="text" id="edu-institution" placeholder="e.g. University of California, Berkeley" />
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">
          <div class="form-group">
            <label>Degree</label>
            <input type="text" id="edu-degree" placeholder="e.g. Bachelor of Science" />
          </div>
          <div class="form-group">
            <label>Major / Field</label>
            <input type="text" id="edu-major" placeholder="e.g. Computer Science" />
          </div>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">
          <div class="form-group">
            <label>Start Date</label>
            <input type="month" id="edu-start" />
          </div>
          <div class="form-group">
            <label>End Date (or expected)</label>
            <input type="month" id="edu-end" />
          </div>
        </div>
        <div class="form-group">
          <label>GPA (optional)</label>
          <input type="text" id="edu-gpa" placeholder="e.g. 3.8 / 4.0" />
        </div>
        <div class="form-group">
          <label>Notes / Honors (optional)</label>
          <textarea id="edu-notes" placeholder="e.g. Dean's List, Relevant coursework..."></textarea>
        </div>
        <div class="modal-footer">
          <button class="btn btn-ghost" id="edu-modal-cancel">Cancel</button>
          <button class="btn btn-primary" id="edu-modal-save">Save</button>
        </div>
      </div>
    </div>
  `;

  app.appendChild(page);
  renderTopBar(document.getElementById('topbar-edu'), 1, goToStep);
  renderTiles();
  renderResumePreview('resume-preview-container');

  // Events
  document.getElementById('btn-add-edu').addEventListener('click', () => openModal());
  document.getElementById('btn-edu-back').addEventListener('click', () => {
    saveToStorage();
    import('./ProfilePage.js').then(m => m.renderProfilePage());
  });
  document.getElementById('btn-edu-next').addEventListener('click', () => {
    saveToStorage();
    import('./ExperiencePage.js').then(m => m.renderExperiencePage());
  });
  document.getElementById('edu-modal-cancel').addEventListener('click', closeModal);
  document.getElementById('edu-modal').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) closeModal();
  });
  document.getElementById('edu-modal-save').addEventListener('click', saveEntry);
}

function renderTiles() {
  const container = document.getElementById('education-tiles');
  if (!container) return;
  const sorted = sortAlpha(state.education, 'institution');

  if (sorted.length === 0) {
    container.innerHTML = `<p class="text-muted" style="margin-bottom:16px">No education added yet. Click below to add your first entry.</p>`;
    return;
  }

  container.innerHTML = sorted.map(e => {
    const isSelected = state.selectedEducation.has(e.id);
    const dateStr = formatDateRange(e.startDate, e.endDate);
    return `
      <div class="tile ${isSelected ? 'selected' : ''}" data-id="${e.id}">
        <div class="tile-checkbox"></div>
        <div class="tile-title">${esc(e.institution)}</div>
        <div class="tile-subtitle">${[esc(e.degree), esc(e.major)].filter(Boolean).join(' · ')}</div>
        <div class="tile-meta">${esc(dateStr)}${e.gpa ? ` · GPA: ${esc(e.gpa)}` : ''}</div>
        <div class="tile-actions">
          <button class="btn btn-ghost btn-sm tile-edit-btn" data-id="${e.id}">Edit</button>
          <button class="btn btn-ghost btn-sm tile-delete-btn" data-id="${e.id}" style="color:#c0392b">Delete</button>
        </div>
      </div>
    `;
  }).join('');

  // Toggle selection
  container.querySelectorAll('.tile').forEach(tile => {
    tile.addEventListener('click', (e) => {
      if (e.target.closest('.tile-actions')) return;
      const id = tile.dataset.id;
      if (state.selectedEducation.has(id)) {
        state.selectedEducation.delete(id);
      } else {
        state.selectedEducation.add(id);
      }
      tile.classList.toggle('selected');
      renderResumePreview('resume-preview-container');
    });
  });

  container.querySelectorAll('.tile-edit-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      openModal(btn.dataset.id);
    });
  });

  container.querySelectorAll('.tile-delete-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.dataset.id;
      state.education = state.education.filter(e => e.id !== id);
      state.selectedEducation.delete(id);
      renderTiles();
      renderResumePreview('resume-preview-container');
      showToast('Entry removed.');
    });
  });
}

function openModal(id = null) {
  editingId = id;
  const modal = document.getElementById('edu-modal');
  const title = document.getElementById('edu-modal-title');

  if (id) {
    const entry = state.education.find(e => e.id === id);
    if (!entry) return;
    title.textContent = 'Edit Education';
    document.getElementById('edu-institution').value = entry.institution || '';
    document.getElementById('edu-degree').value = entry.degree || '';
    document.getElementById('edu-major').value = entry.major || '';
    document.getElementById('edu-start').value = entry.startDate || '';
    document.getElementById('edu-end').value = entry.endDate || '';
    document.getElementById('edu-gpa').value = entry.gpa || '';
    document.getElementById('edu-notes').value = entry.notes || '';
  } else {
    title.textContent = 'Add Education';
    ['edu-institution','edu-degree','edu-major','edu-start','edu-end','edu-gpa','edu-notes'].forEach(f => {
      document.getElementById(f).value = '';
    });
  }
  modal.classList.add('open');
  document.getElementById('edu-institution').focus();
}

function closeModal() {
  document.getElementById('edu-modal').classList.remove('open');
  editingId = null;
}

function saveEntry() {
  const institution = document.getElementById('edu-institution').value.trim();
  if (!institution) { showToast('Please enter an institution name.'); return; }

  const entry = {
    id: editingId || generateId(),
    institution,
    degree: document.getElementById('edu-degree').value.trim(),
    major: document.getElementById('edu-major').value.trim(),
    startDate: document.getElementById('edu-start').value,
    endDate: document.getElementById('edu-end').value,
    gpa: document.getElementById('edu-gpa').value.trim(),
    notes: document.getElementById('edu-notes').value.trim(),
  };

  if (editingId) {
    const idx = state.education.findIndex(e => e.id === editingId);
    if (idx !== -1) state.education[idx] = entry;
  } else {
    state.education.push(entry);
    state.selectedEducation.add(entry.id); // auto-select new
  }

  closeModal();
  renderTiles();
  renderResumePreview('resume-preview-container');
  showToast(editingId ? 'Education updated.' : 'Education added.');
}

function goToStep(step) {
  saveToStorage();
  const pages = [
    () => import('./ProfilePage.js').then(m => m.renderProfilePage()),
    () => import('./EducationPage.js').then(m => m.renderEducationPage()),
    () => import('./ExperiencePage.js').then(m => m.renderExperiencePage()),
    () => import('./ProjectsPage.js').then(m => m.renderProjectsPage()),
    () => import('./SkillsPage.js').then(m => m.renderSkillsPage()),
    () => import('./PreviewPage.js').then(m => m.renderPreviewPage()),
  ];
  if (pages[step]) pages[step]();
}
