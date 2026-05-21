// ===== PREVIEW & SAVE PAGE =====
import { state, saveToStorage } from '../utils/store.js';
import { showToast, renderTopBar, esc } from '../utils/helpers.js';
import { buildResumeHTML } from '../components/ResumePreview.js';

export function renderPreviewPage() {
  state.currentStep = 5;
  const app = document.getElementById('app');
  app.innerHTML = '';

  const page = document.createElement('div');
  page.id = 'page-preview';
  page.className = 'page active';

  page.innerHTML = `
    <div id="topbar-preview"></div>
    <div class="split-layout">
      <div class="split-left">
        <div class="section-header">
          <div class="section-eyebrow">Step 6 of 6</div>
          <h2>Your Résumé</h2>
          <p class="section-desc">This is your final résumé. Use the progress bar above to go back and make any changes, or proceed to save and print.</p>
        </div>

        <div style="background:var(--white);border:1.5px solid var(--cream-darker);border-radius:var(--radius-lg);padding:20px;margin-bottom:20px">
          <div style="font-size:0.72rem;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:var(--brown);margin-bottom:12px">Summary</div>
          <div id="resume-summary"></div>
        </div>

        <div class="form-group">
          <label>Save As (Résumé Name)</label>
          <input type="text" id="resume-save-name" placeholder='e.g. "Software Engineer 2025"' value="${esc(state.profile.name ? state.profile.name + ' — Résumé' : '')}" />
        </div>

        <div style="display:flex;flex-direction:column;gap:10px;margin-bottom:24px">
          <button class="btn btn-brown" id="btn-save-resume" style="justify-content:center;padding:14px">
            ✦ Save Résumé to Library
          </button>
          <button class="btn btn-primary" id="btn-print-resume" style="justify-content:center;padding:14px">
            ↓ Export Clean PDF
          </button>
        </div>

        <div class="divider"></div>
        <div class="nav-footer" style="border:none;margin:0;padding:0">
          <button class="btn btn-ghost" id="btn-preview-back">← Edit Skills</button>
          <button class="btn btn-ghost" id="btn-start-over">Start Over</button>
        </div>
      </div>

      <div class="split-right" style="background:#d9d3c8">
        <div id="resume-preview-container"></div>
      </div>
    </div>
  `;

  app.appendChild(page);
  renderTopBar(document.getElementById('topbar-preview'), 5, goToStep);
  renderSummary();
  renderFullPreview();
  injectPreviewStyles();

  document.getElementById('btn-preview-back').addEventListener('click', () => {
    saveToStorage();
    import('./SkillsPage.js').then(m => m.renderSkillsPage());
  });

  document.getElementById('btn-start-over').addEventListener('click', () => {
    if (confirm('Start a fresh résumé? Your saved library entries will remain.')) {
      import('./LandingPage.js').then(m => m.renderLanding());
    }
  });

  document.getElementById('btn-save-resume').addEventListener('click', () => {
    const saveName = document.getElementById('resume-save-name').value.trim() || 'My Résumé';
    const snapshot = {
      name: saveName,
      savedAt: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      profile: { ...state.profile },
      education: [...state.education],
      selectedEducation: [...state.selectedEducation],
      experiences: [...state.experiences],
      selectedExperiences: [...state.selectedExperiences],
      projects: [...state.projects],
      selectedProjects: [...state.selectedProjects],
      skills: [...state.skills],
      selectedSkills: [...state.selectedSkills],
    };

    // Check if same-named resume exists, replace it
    const existingIdx = state.savedResumes.findIndex(r => r.name === saveName);
    if (existingIdx !== -1) {
      state.savedResumes[existingIdx] = snapshot;
    } else {
      state.savedResumes.push(snapshot);
    }

    saveToStorage();
    showToast(`"${saveName}" saved to library!`);

    // Animate button
    const btn = document.getElementById('btn-save-resume');
    btn.textContent = '✓ Saved!';
    btn.style.background = 'var(--brown-dark)';
    setTimeout(() => {
      btn.textContent = '✦ Save Résumé to Library';
      btn.style.background = '';
    }, 2000);
  });

  document.getElementById('btn-print-resume').addEventListener('click', () => {
    printResume();
  });
}

function renderSummary() {
  const container = document.getElementById('resume-summary');
  const selEdu = state.education.filter(e => state.selectedEducation.has(e.id));
  const selExp = state.experiences.filter(e => state.selectedExperiences.has(e.id));
  const selProj = state.projects.filter(p => state.selectedProjects.has(p.id));
  const selSkills = state.skills.filter(s => state.selectedSkills.has(s.id));

  const rows = [
    { label: 'Name', value: state.profile.name || '—' },
    { label: 'Education entries', value: selEdu.length },
    { label: 'Experience entries', value: selExp.length },
    { label: 'Projects', value: selProj.length },
    { label: 'Skills & Interests', value: selSkills.length },
  ];

  container.innerHTML = rows.map(r => `
    <div style="display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid var(--cream-darker)">
      <span style="font-size:0.82rem;color:var(--ink-muted)">${esc(r.label)}</span>
      <span style="font-size:0.82rem;font-weight:700;color:var(--ink)">${esc(String(r.value))}</span>
    </div>
  `).join('');
}

function renderFullPreview() {
  const container = document.getElementById('resume-preview-container');
  if (!container) return;
  container.innerHTML = buildResumeHTML();

  // Make the preview slightly larger on the final page
  const sheet = container.querySelector('.resume-sheet');
  if (sheet) {
    sheet.style.fontSize = '10px';
  }
  const wrap = container.querySelector('.resume-preview-wrap');
  if (wrap) wrap.style.maxWidth = '520px';
}

async function printResume() {
  const sheetEl = document.getElementById('resume-sheet-content');
  if (!sheetEl) { showToast('Nothing to export yet.'); return; }

  const btn = document.getElementById('btn-print-resume');
  btn.textContent = '⏳ Generating PDF...';
  btn.disabled = true;

  try {
    // Dynamically load html2pdf from CDN
    if (!window.html2pdf) {
      await loadScript('https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js');
    }

    const fileName = (state.profile.name || 'Resume').replace(/[^a-z0-9]/gi, '_') + '_Resume.pdf';

    // Clone the sheet so we can apply clean print styles without affecting the live preview
    const clone = sheetEl.cloneNode(true);
    clone.style.cssText = `
      background: #fff;
      width: 775px;
      padding: 24px 24px;
      font-family: Georgia, serif;
      font-size: 18px;
      line-height: 1.55;
      color: #1a1410;
      box-shadow: none;
    `;

    // Hide placeholder elements in clone
    clone.querySelectorAll('.resume-empty-hint, .resume-name.placeholder').forEach(el => {
      el.style.display = 'none';
    });

    const opt = {
      margin:      [0.25, 0.25, 0.25, 0.25], // inches: top, left, bottom, right
      filename:    fileName,
      image:       { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, letterRendering: true },
      jsPDF:       { unit: 'in', format: 'letter', orientation: 'portrait' },
    };

    await html2pdf().set(opt).from(clone).save();
    showToast('PDF exported successfully!');
  } catch (err) {
    console.error('PDF export failed:', err);
    showToast('Export failed — please try again.');
  } finally {
    btn.textContent = '↓ Export Clean PDF';
    btn.disabled = false;
  }
}

function loadScript(src) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
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

function injectPreviewStyles() {
  if (document.getElementById('preview-page-styles')) return;
  const s = document.createElement('style');
  s.id = 'preview-page-styles';
  s.textContent = `
    #page-preview .split-right { background: #ccc9c0; }
  `;
  document.head.appendChild(s);
}