// ===== PROFILE PAGE =====
import { state, saveToStorage, loadFromStorage } from '../utils/store.js';
import { showToast, renderTopBar } from '../utils/helpers.js';
import { renderResumePreview } from '../components/ResumePreview.js';

export function renderProfilePage() {
  state.currentStep = 0;
  const app = document.getElementById('app');
  app.innerHTML = '';

  const page = document.createElement('div');
  page.id = 'page-profile';
  page.className = 'page active';

  page.innerHTML = `
    <div id="topbar-profile"></div>
    <div class="split-layout">
      <div class="split-left">
        <div class="section-header">
          <div class="section-eyebrow">Step 1 of 6</div>
          <h2>Personal Information</h2>
          <p class="section-desc">Let's start with the basics. This will appear at the top of your résumé.</p>
        </div>

        <div id="profile-form">
          <div class="form-group">
            <label>Full Name *</label>
            <input type="text" id="inp-name" placeholder="e.g. Alexandra Chen" value="${esc(state.profile.name)}" />
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">
            <div class="form-group">
              <label>Phone Number</label>
              <input type="tel" id="inp-phone" placeholder="(555) 000-0000" value="${esc(state.profile.phone)}" />
            </div>
            <div class="form-group">
              <label>Email Address</label>
              <input type="email" id="inp-email" placeholder="you@email.com" value="${esc(state.profile.email)}" />
            </div>
          </div>
          <div class="form-group">
            <label>Location</label>
            <input type="text" id="inp-location" placeholder="e.g. San Francisco, CA" value="${esc(state.profile.location)}" />
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">
            <div class="form-group">
              <label>LinkedIn (optional)</label>
              <input type="text" id="inp-linkedin" placeholder="linkedin.com/in/..." value="${esc(state.profile.linkedin)}" />
            </div>
            <div class="form-group">
              <label>Website (optional)</label>
              <input type="text" id="inp-website" placeholder="yoursite.com" value="${esc(state.profile.website)}" />
            </div>
          </div>
        </div>

        <div class="nav-footer">
          <button class="btn btn-ghost" id="btn-profile-back">← Back</button>
          <button class="btn btn-primary" id="btn-profile-next">Next: Education →</button>
        </div>
      </div>
      <div class="split-right">
        <div id="resume-preview-container"></div>
      </div>
    </div>
  `;

  app.appendChild(page);

  // Render top bar
  renderTopBar(document.getElementById('topbar-profile'), 0, goToStep);

  // Render preview
  renderResumePreview('resume-preview-container');

  // Live update preview on input
  const fields = ['inp-name', 'inp-phone', 'inp-email', 'inp-location', 'inp-linkedin', 'inp-website'];
  const keys = ['name', 'phone', 'email', 'location', 'linkedin', 'website'];
  fields.forEach((id, i) => {
    document.getElementById(id)?.addEventListener('input', (e) => {
      state.profile[keys[i]] = e.target.value;
      renderResumePreview('resume-preview-container');
    });
  });

  // Nav
  document.getElementById('btn-profile-back').addEventListener('click', () => {
    import('./LandingPage.js').then(m => m.renderLanding());
  });

  document.getElementById('btn-profile-next').addEventListener('click', () => {
    if (!state.profile.name.trim()) {
      showToast('Please enter your name to continue.');
      return;
    }
    saveToStorage();
    import('./EducationPage.js').then(m => m.renderEducationPage());
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

function esc(str) {
  if (!str) return '';
  return String(str).replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
