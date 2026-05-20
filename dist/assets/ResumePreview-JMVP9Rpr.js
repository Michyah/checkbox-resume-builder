import{c as a,e as s,f as o}from"./index-Bs77OPHX.js";function $(t){const i=document.getElementById(t);i&&(i.innerHTML=u())}function u(){const t=a.profile,i=t.name&&t.name.trim(),l=[t.phone,t.email,t.location,t.linkedin,t.website].filter(Boolean),n=a.education.filter(e=>a.selectedEducation.has(e.id)),r=a.experiences.filter(e=>a.selectedExperiences.has(e.id)),c=a.projects.filter(e=>a.selectedProjects.has(e.id)),d=a.skills.filter(e=>a.selectedSkills.has(e.id));return`
    <div class="resume-preview-wrap">
      <div class="resume-preview-label">Live Preview</div>
      <div class="resume-sheet" id="resume-sheet-content">
        <!-- HEADER -->
        <div class="resume-header">
          ${i?`<div class="resume-name">${s(t.name)}</div>`:'<div class="resume-name placeholder">Your Name</div>'}
          ${l.length>0?`<div class="resume-contact">${l.map(e=>`<span>${s(e)}</span>`).join("")}</div>`:'<div class="resume-contact"><span class="resume-empty-hint">phone · email · location</span></div>'}
        </div>

        <!-- EDUCATION -->
        ${n.length>0?`
        <div class="resume-section">
          <div class="resume-section-title">Education</div>
          ${n.map(e=>`
            <div class="resume-entry">
              <div class="resume-entry-header">
                <span class="resume-entry-title">${s(e.institution)}</span>
                <span class="resume-entry-date">${s(o(e.startDate,e.endDate))}</span>
              </div>
              <div class="resume-entry-sub">${[s(e.degree),s(e.major)].filter(Boolean).join(", ")}</div>
              ${e.gpa?`<div class="resume-entry-desc">GPA: ${s(e.gpa)}</div>`:""}
              ${e.notes?`<div class="resume-entry-desc">${s(e.notes)}</div>`:""}
            </div>
          `).join("")}
        </div>`:""}

        <!-- EXPERIENCE -->
        ${r.length>0?`
        <div class="resume-section">
          <div class="resume-section-title">Experience</div>
          ${r.map(e=>`
            <div class="resume-entry">
              <div class="resume-entry-header">
                <span class="resume-entry-title">${s(e.title)}</span>
                <span class="resume-entry-date">${s(o(e.startDate,e.endDate))}</span>
              </div>
              <div class="resume-entry-sub">${s(e.company)}${e.location?`, ${s(e.location)}`:""}</div>
              ${e.bullets&&e.bullets.filter(Boolean).length>0?e.bullets.filter(Boolean).map(m=>`<div class="resume-bullet">${s(m)}</div>`).join(""):e.description?`<div class="resume-entry-desc">${s(e.description)}</div>`:""}
            </div>
          `).join("")}
        </div>`:""}

        <!-- PROJECTS -->
        ${c.length>0?`
        <div class="resume-section">
          <div class="resume-section-title">Projects</div>
          ${c.map(e=>`
            <div class="resume-entry">
              <div class="resume-entry-header">
                <span class="resume-entry-title">${s(e.name)}${e.link?` <span style="font-weight:400;font-style:italic;font-size:7.5px;color:#666">— ${s(e.link)}</span>`:""}</span>
                ${e.date?`<span class="resume-entry-date">${s(e.date)}</span>`:""}
              </div>
              ${e.tech?`<div class="resume-entry-sub">${s(e.tech)}</div>`:""}
              ${e.description?`<div class="resume-entry-desc">${s(e.description)}</div>`:""}
            </div>
          `).join("")}
        </div>`:""}

        <!-- SKILLS -->
        ${d.length>0?`
        <div class="resume-section">
          <div class="resume-section-title">Skills &amp; Interests</div>
          ${v(d)}
        </div>`:""}

        ${n.length===0&&r.length===0&&c.length===0&&d.length===0&&!i?`<div style="margin-top:40px;text-align:center;color:#ddd;font-style:italic;font-size:9px;font-family:'Lato',sans-serif;">Your resume will appear here as you fill in your details.</div>`:""}
      </div>
    </div>
  `}function v(t){const i={};return t.forEach(l=>{const n=l.category||"Other";i[n]||(i[n]=[]),i[n].push(l.name)}),Object.entries(i).map(([l,n])=>`
    <div class="resume-entry">
      <span class="resume-entry-title">${s(l)}: </span>
      <span class="resume-entry-sub" style="font-style:normal;color:#444">${n.map(s).join(", ")}</span>
    </div>
  `).join("")}export{u as b,$ as r};
