// ===== EXPERIENCE PAGE =====
import { state, saveToStorage, generateId } from '../utils/store.js';
import { showToast, renderTopBar, sortAlpha, formatDateRange, esc } from '../utils/helpers.js';
import { renderResumePreview } from '../components/ResumePreview.js';

let editingId = null;

export function renderExperiencePage() {
  state.currentStep = 2;
  const app = document.getElementById('app');
  app.innerHTML = '';

  const page = document.createElement('div');
  page.id = 'page-experience';
  page.className = 'page active';

  page.innerHTML = `
    <div id="topbar-exp"></div>
    <div class="split-layout">
      <div class="split-left">
        <div class="section-header">
          <div class="section-eyebrow">Step 3 of 6</div>
          <h2>Work Experience</h2>
          <p class="section-desc">Add your work history. Check the ones you want on your résumé — ordered by your selection.</p>
        </div>
        <div id="experience-tiles"></div>
        <button class="add-tile" id="btn-add-exp">+ Add Experience</button>
        <div class="nav-footer">
          <button class="btn btn-ghost" id="btn-exp-back">← Back</button>
          <button class="btn btn-primary" id="btn-exp-next">Next: Projects →</button>
        </div>
      </div>
      <div class="split-right">
        <div id="resume-preview-container"></div>
      </div>
    </div>

    <!-- MODAL -->
    <div class="modal-overlay" id="exp-modal">
      <div class="modal">
        <div class="modal-title" id="exp-modal-title">Add Experience</div>
        <div class="form-group">
          <label>Job Title *</label>
          <input type="text" id="exp-title" placeholder="e.g. Software Engineer" />
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">
          <div class="form-group">
            <label>Company *</label>
            <input type="text" id="exp-company" placeholder="e.g. Acme Corp" />
          </div>
          <div class="form-group">
            <label>Location</label>
            <input type="text" id="exp-location" placeholder="e.g. New York, NY" />
          </div>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">
          <div class="form-group">
            <label>Start Date</label>
            <input type="month" id="exp-start" />
          </div>
          <div class="form-group">
            <label>End Date</label>
            <div style="display:flex;gap:8px;align-items:center">
              <input type="month" id="exp-end" style="flex:1" />
              <label style="display:flex;align-items:center;gap:4px;margin:0;font-size:0.75rem;white-space:nowrap;text-transform:none;letter-spacing:0">
                <input type="checkbox" id="exp-present" style="width:auto;margin:0" /> Present
              </label>
            </div>
          </div>
        </div>
        <div class="form-group">
          <label>Bullet Points (one per line)</label>
          <textarea id="exp-bullets" rows="5" placeholder="• Designed and launched X, resulting in Y&#10;• Led team of 5 engineers to deliver Z&#10;• Increased performance by 40%..."></textarea>
        </div>
        <div class="modal-footer">
          <button class="btn btn-ghost" id="exp-modal-cancel">Cancel</button>
          <button class="btn btn-primary" id="exp-modal-save">Save</button>
        </div>
      </div>
    </div>
  `;

  app.appendChild(page);
  renderTopBar(document.getElementById('topbar-exp'), 2, goToStep);
  renderTiles();
  renderResumePreview('resume-preview-container');

  document.getElementById('btn-add-exp').addEventListener('click', () => openModal());
  document.getElementById('btn-exp-back').addEventListener('click', () => {
    saveToStorage();
    import('./EducationPage.js').then(m => m.renderEducationPage());
  });
  document.getElementById('btn-exp-next').addEventListener('click', () => {
    saveToStorage();
    import('./ProjectsPage.js').then(m => m.renderProjectsPage());
  });
  document.getElementById('exp-modal-cancel').addEventListener('click', closeModal);
  document.getElementById('exp-modal').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) closeModal();
  });
  document.getElementById('exp-modal-save').addEventListener('click', saveEntry);
  document.getElementById('exp-present').addEventListener('change', (e) => {
    document.getElementById('exp-end').disabled = e.target.checked;
    if (e.target.checked) document.getElementById('exp-end').value = '';
  });
}

function renderTiles() {
  const container = document.getElementById('experience-tiles');
  if (!container) return;
  const sorted = sortAlpha(state.experiences, 'company');

  if (sorted.length === 0) {
    container.innerHTML = `<p class="text-muted" style="margin-bottom:16px">No experience added yet.</p>`;
    return;
  }

  container.innerHTML = sorted.map(e => {
    const isSelected = state.selectedExperiences.has(e.id);
    const dateStr = e.endDate === 'present'
      ? `${formatDateRange(e.startDate, null)} – Present`
      : formatDateRange(e.startDate, e.endDate);
    const preview = e.bullets?.filter(Boolean)[0] || e.description || '';
    return `
      <div class="tile ${isSelected ? 'selected' : ''}" data-id="${e.id}">
        <div class="tile-checkbox"></div>
        <div class="tile-title">${esc(e.title)}</div>
        <div class="tile-subtitle">${esc(e.company)}${e.location ? ` · ${esc(e.location)}` : ''}</div>
        <div class="tile-meta">${esc(dateStr)}</div>
        ${preview ? `<div class="tile-meta" style="margin-top:4px;font-style:italic">${esc(preview.substring(0,80))}${preview.length > 80 ? '...' : ''}</div>` : ''}
        <div class="tile-actions">
          <button class="btn btn-ghost btn-sm tile-edit-btn" data-id="${e.id}">Edit</button>
          <button class="btn btn-ghost btn-sm tile-delete-btn" data-id="${e.id}" style="color:#c0392b">Delete</button>
        </div>
      </div>
    `;
  }).join('');

  container.querySelectorAll('.tile').forEach(tile => {
    tile.addEventListener('click', (e) => {
      if (e.target.closest('.tile-actions')) return;
      const id = tile.dataset.id;
      if (state.selectedExperiences.has(id)) {
        state.selectedExperiences.delete(id);
      } else {
        state.selectedExperiences.add(id);
      }
      tile.classList.toggle('selected');
      renderResumePreview('resume-preview-container');
    });
  });

  container.querySelectorAll('.tile-edit-btn').forEach(btn => {
    btn.addEventListener('click', (e) => { e.stopPropagation(); openModal(btn.dataset.id); });
  });

  container.querySelectorAll('.tile-delete-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      state.experiences = state.experiences.filter(ex => ex.id !== btn.dataset.id);
      state.selectedExperiences.delete(btn.dataset.id);
      renderTiles();
      renderResumePreview('resume-preview-container');
      showToast('Entry removed.');
    });
  });
}

function openModal(id = null) {
  editingId = id;
  const title = document.getElementById('exp-modal-title');
  if (id) {
    const e = state.experiences.find(ex => ex.id === id);
    if (!e) return;
    title.textContent = 'Edit Experience';
    document.getElementById('exp-title').value = e.title || '';
    document.getElementById('exp-company').value = e.company || '';
    document.getElementById('exp-location').value = e.location || '';
    document.getElementById('exp-start').value = e.startDate || '';
    const isPresent = e.endDate === 'present';
    document.getElementById('exp-present').checked = isPresent;
    document.getElementById('exp-end').value = isPresent ? '' : (e.endDate || '');
    document.getElementById('exp-end').disabled = isPresent;
    document.getElementById('exp-bullets').value = (e.bullets || []).join('\n');
  } else {
    title.textContent = 'Add Experience';
    ['exp-title','exp-company','exp-location','exp-start','exp-end','exp-bullets'].forEach(f => {
      document.getElementById(f).value = '';
    });
    document.getElementById('exp-present').checked = false;
    document.getElementById('exp-end').disabled = false;
  }
  document.getElementById('exp-modal').classList.add('open');
  document.getElementById('exp-title').focus();
}

function closeModal() {
  document.getElementById('exp-modal').classList.remove('open');
  editingId = null;
}

function saveEntry() {
  const title = document.getElementById('exp-title').value.trim();
  const company = document.getElementById('exp-company').value.trim();
  if (!title || !company) { showToast('Title and company are required.'); return; }

  const isPresent = document.getElementById('exp-present').checked;
  const bulletsRaw = document.getElementById('exp-bullets').value;
  const bullets = bulletsRaw.split('\n').map(b => b.replace(/^[•\-–]\s*/, '').trim()).filter(Boolean);

  const entry = {
    id: editingId || generateId(),
    title,
    company,
    location: document.getElementById('exp-location').value.trim(),
    startDate: document.getElementById('exp-start').value,
    endDate: isPresent ? 'present' : document.getElementById('exp-end').value,
    bullets,
  };

  if (editingId) {
    const idx = state.experiences.findIndex(e => e.id === editingId);
    if (idx !== -1) state.experiences[idx] = entry;
  } else {
    state.experiences.push(entry);
    state.selectedExperiences.add(entry.id);
  }

  closeModal();
  renderTiles();
  renderResumePreview('resume-preview-container');
  showToast(editingId ? 'Experience updated.' : 'Experience added.');
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
