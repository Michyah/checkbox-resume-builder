const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./ExperiencePage-CA-iFkxP.js","./index-Bs77OPHX.js","./index-DXbNnUvX.css","./ResumePreview-JMVP9Rpr.js","./SkillsPage-pT4_QlGT.js","./ProfilePage-BDNJ6mJv.js","./EducationPage-MQYMx5EL.js","./PreviewPage-BDYSSEhf.js"])))=>i.map(i=>d[i]);
import{c as d,r as g,s as c,_ as i,b as j,e as a,a as m,g as b}from"./index-Bs77OPHX.js";import{r as s}from"./ResumePreview-JMVP9Rpr.js";let n=null;function E(){d.currentStep=3;const t=document.getElementById("app");t.innerHTML="";const o=document.createElement("div");o.id="page-projects",o.className="page active",o.innerHTML=`
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
  `,t.appendChild(o),g(document.getElementById("topbar-proj"),3,y),u(),s("resume-preview-container"),document.getElementById("btn-add-proj").addEventListener("click",()=>v()),document.getElementById("btn-proj-back").addEventListener("click",()=>{c(),i(()=>import("./ExperiencePage-CA-iFkxP.js"),__vite__mapDeps([0,1,2,3]),import.meta.url).then(e=>e.renderExperiencePage())}),document.getElementById("btn-proj-next").addEventListener("click",()=>{c(),i(()=>import("./SkillsPage-pT4_QlGT.js"),__vite__mapDeps([4,1,2,3]),import.meta.url).then(e=>e.renderSkillsPage())}),document.getElementById("proj-modal-cancel").addEventListener("click",p),document.getElementById("proj-modal").addEventListener("click",e=>{e.target===e.currentTarget&&p()}),document.getElementById("proj-modal-save").addEventListener("click",h)}function u(){const t=document.getElementById("project-tiles");if(!t)return;const o=j(d.projects,"name");if(o.length===0){t.innerHTML='<p class="text-muted" style="margin-bottom:16px">No projects added yet.</p>';return}t.innerHTML=o.map(e=>`
      <div class="tile ${d.selectedProjects.has(e.id)?"selected":""}" data-id="${e.id}">
        <div class="tile-checkbox"></div>
        <div class="tile-title">${a(e.name)}</div>
        ${e.tech?`<div class="tile-subtitle">${a(e.tech)}</div>`:""}
        ${e.date?`<div class="tile-meta">${a(e.date)}</div>`:""}
        ${e.description?`<div class="tile-meta" style="margin-top:4px;font-style:italic">${a(e.description.substring(0,80))}${e.description.length>80?"...":""}</div>`:""}
        <div class="tile-actions">
          <button class="btn btn-ghost btn-sm tile-edit-btn" data-id="${e.id}">Edit</button>
          <button class="btn btn-ghost btn-sm tile-delete-btn" data-id="${e.id}" style="color:#c0392b">Delete</button>
        </div>
      </div>
    `).join(""),t.querySelectorAll(".tile").forEach(e=>{e.addEventListener("click",r=>{if(r.target.closest(".tile-actions"))return;const l=e.dataset.id;d.selectedProjects.has(l)?d.selectedProjects.delete(l):d.selectedProjects.add(l),e.classList.toggle("selected"),s("resume-preview-container")})}),t.querySelectorAll(".tile-edit-btn").forEach(e=>{e.addEventListener("click",r=>{r.stopPropagation(),v(e.dataset.id)})}),t.querySelectorAll(".tile-delete-btn").forEach(e=>{e.addEventListener("click",r=>{r.stopPropagation(),d.projects=d.projects.filter(l=>l.id!==e.dataset.id),d.selectedProjects.delete(e.dataset.id),u(),s("resume-preview-container"),m("Project removed.")})})}function v(t=null){n=t;const o=document.getElementById("proj-modal-title");if(t){const e=d.projects.find(r=>r.id===t);if(!e)return;o.textContent="Edit Project",document.getElementById("proj-name").value=e.name||"",document.getElementById("proj-tech").value=e.tech||"",document.getElementById("proj-date").value=e.date||"",document.getElementById("proj-link").value=e.link||"",document.getElementById("proj-desc").value=e.description||""}else o.textContent="Add Project",["proj-name","proj-tech","proj-date","proj-link","proj-desc"].forEach(e=>{document.getElementById(e).value=""});document.getElementById("proj-modal").classList.add("open"),document.getElementById("proj-name").focus()}function p(){document.getElementById("proj-modal").classList.remove("open"),n=null}function h(){const t=document.getElementById("proj-name").value.trim();if(!t){m("Please enter a project name.");return}const o={id:n||b(),name:t,tech:document.getElementById("proj-tech").value.trim(),date:document.getElementById("proj-date").value.trim(),link:document.getElementById("proj-link").value.trim(),description:document.getElementById("proj-desc").value.trim()};if(n){const e=d.projects.findIndex(r=>r.id===n);e!==-1&&(d.projects[e]=o)}else d.projects.push(o),d.selectedProjects.add(o.id);p(),u(),s("resume-preview-container"),m(n?"Project updated.":"Project added.")}function y(t){c();const o=[()=>i(()=>import("./ProfilePage-BDNJ6mJv.js"),__vite__mapDeps([5,1,2,3]),import.meta.url).then(e=>e.renderProfilePage()),()=>i(()=>import("./EducationPage-MQYMx5EL.js"),__vite__mapDeps([6,1,2,3]),import.meta.url).then(e=>e.renderEducationPage()),()=>i(()=>import("./ExperiencePage-CA-iFkxP.js"),__vite__mapDeps([0,1,2,3]),import.meta.url).then(e=>e.renderExperiencePage()),()=>i(()=>Promise.resolve().then(()=>P),void 0,import.meta.url).then(e=>e.renderProjectsPage()),()=>i(()=>import("./SkillsPage-pT4_QlGT.js"),__vite__mapDeps([4,1,2,3]),import.meta.url).then(e=>e.renderSkillsPage()),()=>i(()=>import("./PreviewPage-BDYSSEhf.js"),__vite__mapDeps([7,1,2,3]),import.meta.url).then(e=>e.renderPreviewPage())];o[t]&&o[t]()}const P=Object.freeze(Object.defineProperty({__proto__:null,renderProjectsPage:E},Symbol.toStringTag,{value:"Module"}));export{E as renderProjectsPage};
