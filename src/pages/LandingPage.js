// ===== LANDING PAGE =====
import { navigateTo, showToast } from '../utils/helpers.js';
import { state, loadFromStorage, clearAll, saveToStorage } from '../utils/store.js';

export function renderLanding() {
  const app = document.getElementById('app');

  const hasExisting = (() => {
    try {
      return !!localStorage.getItem('resumeBuilderData');
    } catch { return false; }
  })();

  // Build saved resumes list if any
  const savedResumesHTML = state.savedResumes.length > 0
    ? `
      <div class="saved-resumes-section">
        <div class="divider"></div>
        <h3 style="font-family:var(--font-display);font-size:0.9rem;color:var(--ink-soft);margin-bottom:12px;">Saved Résumés</h3>
        ${state.savedResumes.map((r, i) => `
          <div class="saved-resume-item" data-index="${i}">
            <div>
              <div style="font-weight:700;font-size:0.88rem;color:var(--ink)">${r.name || 'Untitled Résumé'}</div>
              <div style="font-size:0.78rem;color:var(--ink-muted)">${r.savedAt || ''}</div>
            </div>
            <div class="flex gap-8">
              <button class="btn btn-ghost btn-sm load-resume-btn" data-index="${i}">Open</button>
              <button class="btn btn-ghost btn-sm delete-resume-btn" data-index="${i}" style="color:#c0392b">Delete</button>
            </div>
          </div>
        `).join('')}
      </div>
    `
    : '';

  const page = document.createElement('div');
  page.id = 'page-landing';
  page.className = 'page active';
  page.innerHTML = `
    <div class="landing-container">
      <div class="landing-inner">
        <div class="landing-eyebrow">Professional</div>
        <h1 class="landing-title">Résumé<br>Builder</h1>
        <p class="landing-desc">Create a clean, professional résumé in minutes. Your information is saved locally — private and yours.</p>

        <div class="landing-actions">
          <button class="btn btn-primary landing-btn" id="btn-new-resume">
            <span>✦</span> Start New Résumé
          </button>
          ${hasExisting ? `
            <button class="btn btn-secondary landing-btn" id="btn-continue-resume">
              ↩ Continue Where I Left Off
            </button>
          ` : ''}
        </div>

        ${savedResumesHTML}
      </div>
      <div class="landing-art">
        <div class="landing-art-paper">
          <div class="landing-art-line w-60"></div>
          <div class="landing-art-line w-40 indent"></div>
          <div class="landing-art-spacer"></div>
          <div class="landing-art-line-sm w-30"></div>
          <div class="landing-art-line-sm w-50"></div>
          <div class="landing-art-line-sm w-45"></div>
          <div class="landing-art-spacer"></div>
          <div class="landing-art-line-sm w-30"></div>
          <div class="landing-art-line-sm w-55"></div>
          <div class="landing-art-line-sm w-40"></div>
          <div class="landing-art-line-sm w-35"></div>
          <div class="landing-art-spacer"></div>
          <div class="landing-art-line-sm w-30"></div>
          <div class="landing-art-line-sm w-48"></div>
          <div class="landing-art-line-sm w-52"></div>
        </div>
      </div>
    </div>
  `;

  // Clear existing pages
  app.innerHTML = '';
  app.appendChild(page);

  // Add landing styles
  injectLandingStyles();

  // Events
  document.getElementById('btn-new-resume')?.addEventListener('click', () => {
    clearAll();
    saveToStorage();
    state.currentStep = 0;
    import('./ProfilePage.js').then(m => m.renderProfilePage());
  });

  document.getElementById('btn-continue-resume')?.addEventListener('click', () => {
    state.currentStep = 0;
    import('./ProfilePage.js').then(m => m.renderProfilePage());
  });

  document.querySelectorAll('.load-resume-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.dataset.index);
      const resume = state.savedResumes[idx];
      if (!resume) return;
      // Restore saved resume state
      state.profile = resume.profile || {};
      state.education = resume.education || [];
      state.selectedEducation = new Set(resume.selectedEducation || []);
      state.experiences = resume.experiences || [];
      state.selectedExperiences = new Set(resume.selectedExperiences || []);
      state.projects = resume.projects || [];
      state.selectedProjects = new Set(resume.selectedProjects || []);
      state.skills = resume.skills || [];
      state.selectedSkills = new Set(resume.selectedSkills || []);
      state.currentStep = 5;
      import('./PreviewPage.js').then(m => m.renderPreviewPage());
    });
  });

  document.querySelectorAll('.delete-resume-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.dataset.index);
      state.savedResumes.splice(idx, 1);
      saveToStorage();
      showToast('Résumé deleted.');
      renderLanding();
    });
  });
}

function injectLandingStyles() {
  if (document.getElementById('landing-styles')) return;
  const style = document.createElement('style');
  style.id = 'landing-styles';
  style.textContent = `
    .landing-container {
      display: flex;
      flex: 1;
      min-height: 100vh;
      align-items: stretch;
    }
    .landing-inner {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 80px 80px;
      max-width: 580px;
    }
    .landing-eyebrow {
      font-size: 0.72rem;
      font-weight: 700;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: var(--brown);
      margin-bottom: 12px;
    }
    .landing-title {
      font-size: 4rem;
      line-height: 1.05;
      color: var(--ink);
      margin-bottom: 20px;
    }
    .landing-desc {
      font-size: 1rem;
      color: var(--ink-muted);
      max-width: 380px;
      line-height: 1.7;
      margin-bottom: 40px;
    }
    .landing-actions {
      display: flex;
      flex-direction: column;
      gap: 12px;
      max-width: 280px;
    }
    .landing-btn {
      justify-content: center;
      padding: 14px 28px;
      font-size: 0.82rem;
    }
    .landing-art {
      flex: 1;
      background: var(--ink);
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .landing-art-paper {
      background: var(--cream);
      width: 220px;
      padding: 32px 28px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.4);
    }
    .landing-art-line {
      height: 10px;
      background: var(--ink);
      margin-bottom: 6px;
      border-radius: 1px;
    }
    .landing-art-line-sm {
      height: 5px;
      background: var(--cream-darker);
      margin-bottom: 5px;
      border-radius: 1px;
    }
    .w-60 { width: 60%; margin: 0 auto 8px; }
    .w-40 { width: 40%; }
    .w-30 { width: 30%; background: var(--brown-light) !important; }
    .w-50 { width: 50%; }
    .w-45 { width: 45%; }
    .w-55 { width: 55%; }
    .w-35 { width: 35%; }
    .w-48 { width: 48%; }
    .w-52 { width: 52%; }
    .indent { margin-left: 20%; }
    .landing-art-spacer { height: 12px; }
    .saved-resumes-section { margin-top: 8px; }
    .saved-resume-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 14px;
      background: var(--white);
      border: 1.5px solid var(--cream-darker);
      border-radius: var(--radius);
      margin-bottom: 8px;
    }
  `;
  document.head.appendChild(style);
}
