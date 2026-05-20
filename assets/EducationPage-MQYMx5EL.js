const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./ProfilePage-BDNJ6mJv.js","./index-Bs77OPHX.js","./index-DXbNnUvX.css","./ResumePreview-JMVP9Rpr.js","./ExperiencePage-CA-iFkxP.js","./ProjectsPage-TxNwzFW2.js","./SkillsPage-pT4_QlGT.js","./PreviewPage-BDYSSEhf.js"])))=>i.map(i=>d[i]);
import{c as i,r as E,s,_ as o,b,f as y,e as r,a as c,g as f}from"./index-Bs77OPHX.js";import{r as u}from"./ResumePreview-JMVP9Rpr.js";let l=null;function _(){i.currentStep=1;const d=document.getElementById("app");d.innerHTML="";const n=document.createElement("div");n.id="page-education",n.className="page active",n.innerHTML=`
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
  `,d.appendChild(n),E(document.getElementById("topbar-edu"),1,h),v(),u("resume-preview-container"),document.getElementById("btn-add-edu").addEventListener("click",()=>p()),document.getElementById("btn-edu-back").addEventListener("click",()=>{s(),o(()=>import("./ProfilePage-BDNJ6mJv.js"),__vite__mapDeps([0,1,2,3]),import.meta.url).then(e=>e.renderProfilePage())}),document.getElementById("btn-edu-next").addEventListener("click",()=>{s(),o(()=>import("./ExperiencePage-CA-iFkxP.js"),__vite__mapDeps([4,1,2,3]),import.meta.url).then(e=>e.renderExperiencePage())}),document.getElementById("edu-modal-cancel").addEventListener("click",m),document.getElementById("edu-modal").addEventListener("click",e=>{e.target===e.currentTarget&&m()}),document.getElementById("edu-modal-save").addEventListener("click",I)}function v(){const d=document.getElementById("education-tiles");if(!d)return;const n=b(i.education,"institution");if(n.length===0){d.innerHTML='<p class="text-muted" style="margin-bottom:16px">No education added yet. Click below to add your first entry.</p>';return}d.innerHTML=n.map(e=>{const t=i.selectedEducation.has(e.id),a=y(e.startDate,e.endDate);return`
      <div class="tile ${t?"selected":""}" data-id="${e.id}">
        <div class="tile-checkbox"></div>
        <div class="tile-title">${r(e.institution)}</div>
        <div class="tile-subtitle">${[r(e.degree),r(e.major)].filter(Boolean).join(" · ")}</div>
        <div class="tile-meta">${r(a)}${e.gpa?` · GPA: ${r(e.gpa)}`:""}</div>
        <div class="tile-actions">
          <button class="btn btn-ghost btn-sm tile-edit-btn" data-id="${e.id}">Edit</button>
          <button class="btn btn-ghost btn-sm tile-delete-btn" data-id="${e.id}" style="color:#c0392b">Delete</button>
        </div>
      </div>
    `}).join(""),d.querySelectorAll(".tile").forEach(e=>{e.addEventListener("click",t=>{if(t.target.closest(".tile-actions"))return;const a=e.dataset.id;i.selectedEducation.has(a)?i.selectedEducation.delete(a):i.selectedEducation.add(a),e.classList.toggle("selected"),u("resume-preview-container")})}),d.querySelectorAll(".tile-edit-btn").forEach(e=>{e.addEventListener("click",t=>{t.stopPropagation(),p(e.dataset.id)})}),d.querySelectorAll(".tile-delete-btn").forEach(e=>{e.addEventListener("click",t=>{t.stopPropagation();const a=e.dataset.id;i.education=i.education.filter(g=>g.id!==a),i.selectedEducation.delete(a),v(),u("resume-preview-container"),c("Entry removed.")})})}function p(d=null){l=d;const n=document.getElementById("edu-modal"),e=document.getElementById("edu-modal-title");if(d){const t=i.education.find(a=>a.id===d);if(!t)return;e.textContent="Edit Education",document.getElementById("edu-institution").value=t.institution||"",document.getElementById("edu-degree").value=t.degree||"",document.getElementById("edu-major").value=t.major||"",document.getElementById("edu-start").value=t.startDate||"",document.getElementById("edu-end").value=t.endDate||"",document.getElementById("edu-gpa").value=t.gpa||"",document.getElementById("edu-notes").value=t.notes||""}else e.textContent="Add Education",["edu-institution","edu-degree","edu-major","edu-start","edu-end","edu-gpa","edu-notes"].forEach(t=>{document.getElementById(t).value=""});n.classList.add("open"),document.getElementById("edu-institution").focus()}function m(){document.getElementById("edu-modal").classList.remove("open"),l=null}function I(){const d=document.getElementById("edu-institution").value.trim();if(!d){c("Please enter an institution name.");return}const n={id:l||f(),institution:d,degree:document.getElementById("edu-degree").value.trim(),major:document.getElementById("edu-major").value.trim(),startDate:document.getElementById("edu-start").value,endDate:document.getElementById("edu-end").value,gpa:document.getElementById("edu-gpa").value.trim(),notes:document.getElementById("edu-notes").value.trim()};if(l){const e=i.education.findIndex(t=>t.id===l);e!==-1&&(i.education[e]=n)}else i.education.push(n),i.selectedEducation.add(n.id);m(),v(),u("resume-preview-container"),c(l?"Education updated.":"Education added.")}function h(d){s();const n=[()=>o(()=>import("./ProfilePage-BDNJ6mJv.js"),__vite__mapDeps([0,1,2,3]),import.meta.url).then(e=>e.renderProfilePage()),()=>o(()=>Promise.resolve().then(()=>B),void 0,import.meta.url).then(e=>e.renderEducationPage()),()=>o(()=>import("./ExperiencePage-CA-iFkxP.js"),__vite__mapDeps([4,1,2,3]),import.meta.url).then(e=>e.renderExperiencePage()),()=>o(()=>import("./ProjectsPage-TxNwzFW2.js"),__vite__mapDeps([5,1,2,3]),import.meta.url).then(e=>e.renderProjectsPage()),()=>o(()=>import("./SkillsPage-pT4_QlGT.js"),__vite__mapDeps([6,1,2,3]),import.meta.url).then(e=>e.renderSkillsPage()),()=>o(()=>import("./PreviewPage-BDYSSEhf.js"),__vite__mapDeps([7,1,2,3]),import.meta.url).then(e=>e.renderPreviewPage())];n[d]&&n[d]()}const B=Object.freeze(Object.defineProperty({__proto__:null,renderEducationPage:_},Symbol.toStringTag,{value:"Module"}));export{_ as renderEducationPage};
