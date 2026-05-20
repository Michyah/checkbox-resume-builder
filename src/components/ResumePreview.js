// ===== RESUME PREVIEW COMPONENT =====
import { state } from '../utils/store.js';
import { esc, formatDateRange } from '../utils/helpers.js';

export function renderResumePreview(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = buildResumeHTML();
}

export function buildResumeHTML() {
  const p = state.profile;
  const hasName = p.name && p.name.trim();
  const contactParts = [p.phone, p.email, p.location, p.linkedin, p.website].filter(Boolean);

  // Education (selected)
  const selEdu = state.education.filter(e => state.selectedEducation.has(e.id));
  // Experience (selected)
  const selExp = state.experiences.filter(e => state.selectedExperiences.has(e.id));
  // Projects (selected)
  const selProj = state.projects.filter(p => state.selectedProjects.has(p.id));
  // Skills (selected)
  const selSkills = state.skills.filter(s => state.selectedSkills.has(s.id));

  return `
    <div class="resume-preview-wrap">
      <div class="resume-preview-label">Live Preview</div>
      <div class="resume-sheet" id="resume-sheet-content">
        <!-- HEADER -->
        <div class="resume-header">
          ${hasName
            ? `<div class="resume-name">${esc(p.name)}</div>`
            : `<div class="resume-name placeholder">Your Name</div>`
          }
          ${contactParts.length > 0
            ? `<div class="resume-contact">${contactParts.map(c => `<span>${esc(c)}</span>`).join('')}</div>`
            : `<div class="resume-contact"><span class="resume-empty-hint">phone · email · location</span></div>`
          }
        </div>

        <!-- EDUCATION -->
        ${selEdu.length > 0 ? `
        <div class="resume-section">
          <div class="resume-section-title">Education</div>
          ${selEdu.map(e => `
            <div class="resume-entry">
              <div class="resume-entry-header">
                <span class="resume-entry-title">${esc(e.institution)}</span>
                <span class="resume-entry-date">${esc(formatDateRange(e.startDate, e.endDate))}</span>
              </div>
              <div class="resume-entry-sub">${[esc(e.degree), esc(e.major)].filter(Boolean).join(', ')}</div>
              ${e.gpa ? `<div class="resume-entry-desc">GPA: ${esc(e.gpa)}</div>` : ''}
              ${e.notes ? `<div class="resume-entry-desc">${esc(e.notes)}</div>` : ''}
            </div>
          `).join('')}
        </div>` : ''}

        <!-- EXPERIENCE -->
        ${selExp.length > 0 ? `
        <div class="resume-section">
          <div class="resume-section-title">Experience</div>
          ${selExp.map(e => `
            <div class="resume-entry">
              <div class="resume-entry-header">
                <span class="resume-entry-title">${esc(e.title)}</span>
                <span class="resume-entry-date">${esc(formatDateRange(e.startDate, e.endDate))}</span>
              </div>
              <div class="resume-entry-sub">${esc(e.company)}${e.location ? `, ${esc(e.location)}` : ''}</div>
              ${e.bullets && e.bullets.filter(Boolean).length > 0
                ? e.bullets.filter(Boolean).map(b => `<div class="resume-bullet">${esc(b)}</div>`).join('')
                : e.description ? `<div class="resume-entry-desc">${esc(e.description)}</div>` : ''
              }
            </div>
          `).join('')}
        </div>` : ''}

        <!-- PROJECTS -->
        ${selProj.length > 0 ? `
        <div class="resume-section">
          <div class="resume-section-title">Projects</div>
          ${selProj.map(pr => `
            <div class="resume-entry">
              <div class="resume-entry-header">
                <span class="resume-entry-title">${esc(pr.name)}${pr.link ? ` <span style="font-weight:400;font-style:italic;font-size:7.5px;color:#666">— ${esc(pr.link)}</span>` : ''}</span>
                ${pr.date ? `<span class="resume-entry-date">${esc(pr.date)}</span>` : ''}
              </div>
              ${pr.tech ? `<div class="resume-entry-sub">${esc(pr.tech)}</div>` : ''}
              ${pr.description ? `<div class="resume-entry-desc">${esc(pr.description)}</div>` : ''}
            </div>
          `).join('')}
        </div>` : ''}

        <!-- SKILLS -->
        ${selSkills.length > 0 ? `
        <div class="resume-section">
          <div class="resume-section-title">Skills &amp; Interests</div>
          ${buildSkillsSection(selSkills)}
        </div>` : ''}

        ${selEdu.length === 0 && selExp.length === 0 && selProj.length === 0 && selSkills.length === 0 && !hasName
          ? `<div style="margin-top:40px;text-align:center;color:#ddd;font-style:italic;font-size:9px;font-family:'Lato',sans-serif;">Your resume will appear here as you fill in your details.</div>`
          : ''}
      </div>
    </div>
  `;
}

function buildSkillsSection(skills) {
  // Group by category
  const grouped = {};
  skills.forEach(s => {
    const cat = s.category || 'Other';
    if (!grouped[cat]) grouped[cat] = [];
    grouped[cat].push(s.name);
  });

  return Object.entries(grouped).map(([cat, items]) => `
    <div class="resume-entry">
      <span class="resume-entry-title">${esc(cat)}: </span>
      <span class="resume-entry-sub" style="font-style:normal;color:#444">${items.map(esc).join(', ')}</span>
    </div>
  `).join('');
}
