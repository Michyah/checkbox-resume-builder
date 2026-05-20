// ===== SKILLS & INTERESTS PAGE =====
import { state, saveToStorage, generateId } from '../utils/store.js';
import { showToast, renderTopBar, sortAlpha, esc } from '../utils/helpers.js';
import { renderResumePreview } from '../components/ResumePreview.js';

let editingId = null;

const PRESET_CATEGORIES = [
  'Programming Languages', 'Frameworks & Libraries', 'Tools & Platforms',
  'Languages', 'Soft Skills', 'Interests & Hobbies', 'Certifications', 'Other'
];

export function renderSkillsPage() {
  state.currentStep = 4;
  const app = document.getElementById('app');
  app.innerHTML = '';

  const page = document.createElement('div');
  page.id = 'page-skills';
  page.className = 'page active';

  page.innerHTML = `
    <div id="topbar-skills"></div>
    <div class="split-layout">
      <div class="split-left">
        <div class="section-header">
          <div class="section-eyebrow">Step 5 of 6</div>
          <h2>Skills &amp; Interests</h2>
          <p class="section-desc">Add individual skills, languages, tools, or interests. Group them by category. Check the ones to include.</p>
        </div>

        <div id="skills-tiles"></div>
        <button class="add-tile" id="btn-add-skill">+ Add Skill / Interest</button>
        <div class="nav-footer">
          <button class="btn btn-ghost" id="btn-skills-back">← Back</button>
          <button class="btn btn-primary" id="btn-skills-next">Preview Résumé →</button>
        </div>
      </div>
      <div class="split-right">
        <div id="resume-preview-container"></div>
      </div>
    </div>

    <div class="modal-overlay" id="skill-modal">
      <div class="modal">
        <div class="modal-title" id="skill-modal-title">Add Skill</div>
        <div class="form-group">
          <label>Skill / Item *</label>
          <input type="text" id="skill-name" placeholder="e.g. Python, Spanish, Figma, Chess..." />
        </div>
        <div class="form-group">
          <label>Category</label>
          <select id="skill-category">
            ${PRESET_CATEGORIES.map(c => `<option value="${esc(c)}">${esc(c)}</option>`).join('')}
            <option value="__custom__">+ Custom category...</option>
          </select>
        </div>
        <div class="form-group" id="custom-cat-group" style="display:none">
          <label>Custom Category Name</label>
          <input type="text" id="skill-custom-cat" placeholder="e.g. Design Tools" />
        </div>
        <div class="modal-footer">
          <button class="btn btn-ghost" id="skill-modal-cancel">Cancel</button>
          <button class="btn btn-primary" id="skill-modal-save">Save</button>
        </div>
      </div>
    </div>
  `;

  app.appendChild(page);
  renderTopBar(document.getElementById('topbar-skills'), 4, goToStep);
  renderTiles();
  renderResumePreview('resume-preview-container');

  document.getElementById('btn-add-skill').addEventListener('click', () => openModal());
  document.getElementById('btn-skills-back').addEventListener('click', () => {
    saveToStorage();
    import('./ProjectsPage.js').then(m => m.renderProjectsPage());
  });
  document.getElementById('btn-skills-next').addEventListener('click', () => {
    saveToStorage();
    import('./PreviewPage.js').then(m => m.renderPreviewPage());
  });
  document.getElementById('skill-modal-cancel').addEventListener('click', closeModal);
  document.getElementById('skill-modal').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) closeModal();
  });
  document.getElementById('skill-modal-save').addEventListener('click', saveEntry);
  document.getElementById('skill-category').addEventListener('change', (e) => {
    document.getElementById('custom-cat-group').style.display =
      e.target.value === '__custom__' ? 'block' : 'none';
  });
}

function renderTiles() {
  const container = document.getElementById('skills-tiles');
  if (!container) return;

  if (state.skills.length === 0) {
    container.innerHTML = `<p class="text-muted" style="margin-bottom:16px">No skills added yet. Add languages, tools, frameworks, and interests.</p>`;
    return;
  }

  // Group by category
  const grouped = {};
  const sorted = sortAlpha(state.skills, 'name');
  sorted.forEach(s => {
    const cat = s.category || 'Other';
    if (!grouped[cat]) grouped[cat] = [];
    grouped[cat].push(s);
  });

  container.innerHTML = Object.entries(grouped).map(([cat, items]) => `
    <div style="margin-bottom:20px">
      <div style="font-size:0.72rem;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:var(--brown);margin-bottom:8px">${esc(cat)}</div>
      <div class="skills-grid">
        ${items.map(s => {
          const isSelected = state.selectedSkills.has(s.id);
          return `
            <div class="skill-tile tile ${isSelected ? 'selected' : ''}" data-id="${s.id}" style="display:inline-flex;flex-direction:column;padding:10px 14px;cursor:pointer">
              <div style="display:flex;align-items:center;justify-content:space-between;gap:12px">
                <span class="tile-title" style="font-size:0.85rem;padding:0">${esc(s.name)}</span>
                <div class="tile-checkbox" style="position:relative;top:auto;right:auto;flex-shrink:0"></div>
              </div>
              <div class="tile-actions" style="margin-top:6px">
                <button class="btn btn-ghost btn-sm tile-edit-btn" data-id="${s.id}" style="padding:2px 8px;font-size:0.7rem">Edit</button>
                <button class="btn btn-ghost btn-sm tile-delete-btn" data-id="${s.id}" style="padding:2px 8px;font-size:0.7rem;color:#c0392b">✕</button>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `).join('');

  // Inject grid style if needed
  if (!document.getElementById('skills-grid-style')) {
    const s = document.createElement('style');
    s.id = 'skills-grid-style';
    s.textContent = `.skills-grid { display: flex; flex-wrap: wrap; gap: 8px; }
    .skill-tile { min-width: 120px; }`;
    document.head.appendChild(s);
  }

  container.querySelectorAll('.skill-tile').forEach(tile => {
    tile.addEventListener('click', (e) => {
      if (e.target.closest('.tile-actions')) return;
      const id = tile.dataset.id;
      if (state.selectedSkills.has(id)) {
        state.selectedSkills.delete(id);
      } else {
        state.selectedSkills.add(id);
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
      state.skills = state.skills.filter(s => s.id !== btn.dataset.id);
      state.selectedSkills.delete(btn.dataset.id);
      renderTiles();
      renderResumePreview('resume-preview-container');
    });
  });
}

function openModal(id = null) {
  editingId = id;
  const title = document.getElementById('skill-modal-title');
  document.getElementById('custom-cat-group').style.display = 'none';
  if (id) {
    const s = state.skills.find(sk => sk.id === id);
    if (!s) return;
    title.textContent = 'Edit Skill';
    document.getElementById('skill-name').value = s.name || '';
    const catEl = document.getElementById('skill-category');
    const exists = PRESET_CATEGORIES.includes(s.category);
    if (exists) {
      catEl.value = s.category;
    } else {
      catEl.value = '__custom__';
      document.getElementById('custom-cat-group').style.display = 'block';
      document.getElementById('skill-custom-cat').value = s.category || '';
    }
  } else {
    title.textContent = 'Add Skill';
    document.getElementById('skill-name').value = '';
    document.getElementById('skill-category').value = PRESET_CATEGORIES[0];
    document.getElementById('skill-custom-cat').value = '';
  }
  document.getElementById('skill-modal').classList.add('open');
  document.getElementById('skill-name').focus();
}

function closeModal() {
  document.getElementById('skill-modal').classList.remove('open');
  editingId = null;
}

function saveEntry() {
  const name = document.getElementById('skill-name').value.trim();
  if (!name) { showToast('Please enter a skill or item.'); return; }

  let category = document.getElementById('skill-category').value;
  if (category === '__custom__') {
    category = document.getElementById('skill-custom-cat').value.trim() || 'Other';
  }

  const entry = { id: editingId || generateId(), name, category };

  if (editingId) {
    const idx = state.skills.findIndex(s => s.id === editingId);
    if (idx !== -1) state.skills[idx] = entry;
  } else {
    state.skills.push(entry);
    state.selectedSkills.add(entry.id);
  }

  closeModal();
  renderTiles();
  renderResumePreview('resume-preview-container');
  showToast(editingId ? 'Updated.' : 'Added.');
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
