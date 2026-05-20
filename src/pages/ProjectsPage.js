// ===== PROJECTS PAGE =====
import { state, saveToStorage, generateId } from '../utils/store.js';
import { showToast, renderTopBar, sortAlpha, esc } from '../utils/helpers.js';
import { renderResumePreview } from '../components/ResumePreview.js';

let editingId = null;

export function renderProjectsPage() {
  state.currentStep = 3;
  const app = document.getElementById('app');
  app.innerHTML = '';

  const page = document.createElement('div');
  page.id = 'page-projects';
  page.className = 'page active';

  page.innerHTML = `
    <div id="topbar-proj"></div>
    <div class="split-layout">
      <div class="split-left">
        <div class="section-header">
          <div class="section-eyebrow">Step 4 of 6</div>
          <h2>Personal Projects</h2>
          <p class="section-desc">Showcase side projects, open-source contributions, or personal builds. Check the ones to include.</p>
        </div>
        <div id="project-tiles"></div>
        <button class="add-tile" id="btn-add-proj">+ Add Project</button>
        <div class="nav-footer">
          <button class="btn btn-ghost" id="btn-proj-back">← Back</button>
          <button class="btn btn-primary" id="btn-proj-next">Next: Skills →</button>
        </div>
      </div>
      <div class="split-right">
        <div id="resume-preview-container"></div>
      </div>
    </div>

    <div class="modal-overlay" id="proj-modal">
      <div class="modal">
        <div class="modal-title" id="proj-modal-title">Add Project</div>
        <div class="form-group">
          <label>Project Name *</label>
          <input type="text" id="proj-name" placeholder="e.g. Personal Finance Tracker" />
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">
          <div class="form-group">
            <label>Technologies Used</label>
            <input type="text" id="proj-tech" placeholder="e.g. React, Node.js, PostgreSQL" />
          </div>
          <div class="form-group">
            <label>Date / Year</label>
            <input type="text" id="proj-date" placeholder="e.g. 2024" />
          </div>
        </div>
        <div class="form-group">
          <label>Link (GitHub, Demo, etc.)</label>
          <input type="text" id="proj-link" placeholder="github.com/you/project" />
        </div>
        <div class="form-group">
          <label>Description</label>
          <textarea id="proj-desc" rows="4" placeholder="What did you build? What problem does it solve? What's notable about it?"></textarea>
        </div>
        <div class="modal-footer">
          <button class="btn btn-ghost" id="proj-modal-cancel">Cancel</button>
          <button class="btn btn-primary" id="proj-modal-save">Save</button>
        </div>
      </div>
    </div>
  `;

  app.appendChild(page);
  renderTopBar(document.getElementById('topbar-proj'), 3, goToStep);
  renderTiles();
  renderResumePreview('resume-preview-container');

  document.getElementById('btn-add-proj').addEventListener('click', () => openModal());
  document.getElementById('btn-proj-back').addEventListener('click', () => {
    saveToStorage();
    import('./ExperiencePage.js').then(m => m.renderExperiencePage());
  });
  document.getElementById('btn-proj-next').addEventListener('click', () => {
    saveToStorage();
    import('./SkillsPage.js').then(m => m.renderSkillsPage());
  });
  document.getElementById('proj-modal-cancel').addEventListener('click', closeModal);
  document.getElementById('proj-modal').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) closeModal();
  });
  document.getElementById('proj-modal-save').addEventListener('click', saveEntry);
}

function renderTiles() {
  const container = document.getElementById('project-tiles');
  if (!container) return;
  const sorted = sortAlpha(state.projects, 'name');

  if (sorted.length === 0) {
    container.innerHTML = `<p class="text-muted" style="margin-bottom:16px">No projects added yet.</p>`;
    return;
  }

  container.innerHTML = sorted.map(p => {
    const isSelected = state.selectedProjects.has(p.id);
    return `
      <div class="tile ${isSelected ? 'selected' : ''}" data-id="${p.id}">
        <div class="tile-checkbox"></div>
        <div class="tile-title">${esc(p.name)}</div>
        ${p.tech ? `<div class="tile-subtitle">${esc(p.tech)}</div>` : ''}
        ${p.date ? `<div class="tile-meta">${esc(p.date)}</div>` : ''}
        ${p.description ? `<div class="tile-meta" style="margin-top:4px;font-style:italic">${esc(p.description.substring(0,80))}${p.description.length > 80 ? '...' : ''}</div>` : ''}
        <div class="tile-actions">
          <button class="btn btn-ghost btn-sm tile-edit-btn" data-id="${p.id}">Edit</button>
          <button class="btn btn-ghost btn-sm tile-delete-btn" data-id="${p.id}" style="color:#c0392b">Delete</button>
        </div>
      </div>
    `;
  }).join('');

  container.querySelectorAll('.tile').forEach(tile => {
    tile.addEventListener('click', (e) => {
      if (e.target.closest('.tile-actions')) return;
      const id = tile.dataset.id;
      if (state.selectedProjects.has(id)) {
        state.selectedProjects.delete(id);
      } else {
        state.selectedProjects.add(id);
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
      state.projects = state.projects.filter(pr => pr.id !== btn.dataset.id);
      state.selectedProjects.delete(btn.dataset.id);
      renderTiles();
      renderResumePreview('resume-preview-container');
      showToast('Project removed.');
    });
  });
}

function openModal(id = null) {
  editingId = id;
  const title = document.getElementById('proj-modal-title');
  if (id) {
    const p = state.projects.find(pr => pr.id === id);
    if (!p) return;
    title.textContent = 'Edit Project';
    document.getElementById('proj-name').value = p.name || '';
    document.getElementById('proj-tech').value = p.tech || '';
    document.getElementById('proj-date').value = p.date || '';
    document.getElementById('proj-link').value = p.link || '';
    document.getElementById('proj-desc').value = p.description || '';
  } else {
    title.textContent = 'Add Project';
    ['proj-name','proj-tech','proj-date','proj-link','proj-desc'].forEach(f => {
      document.getElementById(f).value = '';
    });
  }
  document.getElementById('proj-modal').classList.add('open');
  document.getElementById('proj-name').focus();
}

function closeModal() {
  document.getElementById('proj-modal').classList.remove('open');
  editingId = null;
}

function saveEntry() {
  const name = document.getElementById('proj-name').value.trim();
  if (!name) { showToast('Please enter a project name.'); return; }

  const entry = {
    id: editingId || generateId(),
    name,
    tech: document.getElementById('proj-tech').value.trim(),
    date: document.getElementById('proj-date').value.trim(),
    link: document.getElementById('proj-link').value.trim(),
    description: document.getElementById('proj-desc').value.trim(),
  };

  if (editingId) {
    const idx = state.projects.findIndex(p => p.id === editingId);
    if (idx !== -1) state.projects[idx] = entry;
  } else {
    state.projects.push(entry);
    state.selectedProjects.add(entry.id);
  }

  closeModal();
  renderTiles();
  renderResumePreview('resume-preview-container');
  showToast(editingId ? 'Project updated.' : 'Project added.');
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
