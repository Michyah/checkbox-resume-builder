const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./EducationPage-MQYMx5EL.js","./index-Bs77OPHX.js","./index-DXbNnUvX.css","./ResumePreview-JMVP9Rpr.js","./ProjectsPage-TxNwzFW2.js","./ProfilePage-BDNJ6mJv.js","./SkillsPage-pT4_QlGT.js","./PreviewPage-BDYSSEhf.js"])))=>i.map(i=>d[i]);
import{c as d,r as b,s as m,_ as a,b as f,f as g,e as c,a as u,g as h}from"./index-Bs77OPHX.js";import{r as p}from"./ResumePreview-JMVP9Rpr.js";let s=null;function _(){d.currentStep=2;const t=document.getElementById("app");t.innerHTML="";const n=document.createElement("div");n.id="page-experience",n.className="page active",n.innerHTML=`
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
  `,t.appendChild(n),b(document.getElementById("topbar-exp"),2,B),x(),p("resume-preview-container"),document.getElementById("btn-add-exp").addEventListener("click",()=>E()),document.getElementById("btn-exp-back").addEventListener("click",()=>{m(),a(()=>import("./EducationPage-MQYMx5EL.js"),__vite__mapDeps([0,1,2,3]),import.meta.url).then(e=>e.renderEducationPage())}),document.getElementById("btn-exp-next").addEventListener("click",()=>{m(),a(()=>import("./ProjectsPage-TxNwzFW2.js"),__vite__mapDeps([4,1,2,3]),import.meta.url).then(e=>e.renderProjectsPage())}),document.getElementById("exp-modal-cancel").addEventListener("click",v),document.getElementById("exp-modal").addEventListener("click",e=>{e.target===e.currentTarget&&v()}),document.getElementById("exp-modal-save").addEventListener("click",I),document.getElementById("exp-present").addEventListener("change",e=>{document.getElementById("exp-end").disabled=e.target.checked,e.target.checked&&(document.getElementById("exp-end").value="")})}function x(){const t=document.getElementById("experience-tiles");if(!t)return;const n=f(d.experiences,"company");if(n.length===0){t.innerHTML='<p class="text-muted" style="margin-bottom:16px">No experience added yet.</p>';return}t.innerHTML=n.map(e=>{var o;const i=d.selectedExperiences.has(e.id),l=e.endDate==="present"?`${g(e.startDate,null)} – Present`:g(e.startDate,e.endDate),r=((o=e.bullets)==null?void 0:o.filter(Boolean)[0])||e.description||"";return`
      <div class="tile ${i?"selected":""}" data-id="${e.id}">
        <div class="tile-checkbox"></div>
        <div class="tile-title">${c(e.title)}</div>
        <div class="tile-subtitle">${c(e.company)}${e.location?` · ${c(e.location)}`:""}</div>
        <div class="tile-meta">${c(l)}</div>
        ${r?`<div class="tile-meta" style="margin-top:4px;font-style:italic">${c(r.substring(0,80))}${r.length>80?"...":""}</div>`:""}
        <div class="tile-actions">
          <button class="btn btn-ghost btn-sm tile-edit-btn" data-id="${e.id}">Edit</button>
          <button class="btn btn-ghost btn-sm tile-delete-btn" data-id="${e.id}" style="color:#c0392b">Delete</button>
        </div>
      </div>
    `}).join(""),t.querySelectorAll(".tile").forEach(e=>{e.addEventListener("click",i=>{if(i.target.closest(".tile-actions"))return;const l=e.dataset.id;d.selectedExperiences.has(l)?d.selectedExperiences.delete(l):d.selectedExperiences.add(l),e.classList.toggle("selected"),p("resume-preview-container")})}),t.querySelectorAll(".tile-edit-btn").forEach(e=>{e.addEventListener("click",i=>{i.stopPropagation(),E(e.dataset.id)})}),t.querySelectorAll(".tile-delete-btn").forEach(e=>{e.addEventListener("click",i=>{i.stopPropagation(),d.experiences=d.experiences.filter(l=>l.id!==e.dataset.id),d.selectedExperiences.delete(e.dataset.id),x(),p("resume-preview-container"),u("Entry removed.")})})}function E(t=null){s=t;const n=document.getElementById("exp-modal-title");if(t){const e=d.experiences.find(l=>l.id===t);if(!e)return;n.textContent="Edit Experience",document.getElementById("exp-title").value=e.title||"",document.getElementById("exp-company").value=e.company||"",document.getElementById("exp-location").value=e.location||"",document.getElementById("exp-start").value=e.startDate||"";const i=e.endDate==="present";document.getElementById("exp-present").checked=i,document.getElementById("exp-end").value=i?"":e.endDate||"",document.getElementById("exp-end").disabled=i,document.getElementById("exp-bullets").value=(e.bullets||[]).join(`
`)}else n.textContent="Add Experience",["exp-title","exp-company","exp-location","exp-start","exp-end","exp-bullets"].forEach(e=>{document.getElementById(e).value=""}),document.getElementById("exp-present").checked=!1,document.getElementById("exp-end").disabled=!1;document.getElementById("exp-modal").classList.add("open"),document.getElementById("exp-title").focus()}function v(){document.getElementById("exp-modal").classList.remove("open"),s=null}function I(){const t=document.getElementById("exp-title").value.trim(),n=document.getElementById("exp-company").value.trim();if(!t||!n){u("Title and company are required.");return}const e=document.getElementById("exp-present").checked,l=document.getElementById("exp-bullets").value.split(`
`).map(o=>o.replace(/^[•\-–]\s*/,"").trim()).filter(Boolean),r={id:s||h(),title:t,company:n,location:document.getElementById("exp-location").value.trim(),startDate:document.getElementById("exp-start").value,endDate:e?"present":document.getElementById("exp-end").value,bullets:l};if(s){const o=d.experiences.findIndex(y=>y.id===s);o!==-1&&(d.experiences[o]=r)}else d.experiences.push(r),d.selectedExperiences.add(r.id);v(),x(),p("resume-preview-container"),u(s?"Experience updated.":"Experience added.")}function B(t){m();const n=[()=>a(()=>import("./ProfilePage-BDNJ6mJv.js"),__vite__mapDeps([5,1,2,3]),import.meta.url).then(e=>e.renderProfilePage()),()=>a(()=>import("./EducationPage-MQYMx5EL.js"),__vite__mapDeps([0,1,2,3]),import.meta.url).then(e=>e.renderEducationPage()),()=>a(()=>Promise.resolve().then(()=>P),void 0,import.meta.url).then(e=>e.renderExperiencePage()),()=>a(()=>import("./ProjectsPage-TxNwzFW2.js"),__vite__mapDeps([4,1,2,3]),import.meta.url).then(e=>e.renderProjectsPage()),()=>a(()=>import("./SkillsPage-pT4_QlGT.js"),__vite__mapDeps([6,1,2,3]),import.meta.url).then(e=>e.renderSkillsPage()),()=>a(()=>import("./PreviewPage-BDYSSEhf.js"),__vite__mapDeps([7,1,2,3]),import.meta.url).then(e=>e.renderPreviewPage())];n[t]&&n[t]()}const P=Object.freeze(Object.defineProperty({__proto__:null,renderExperiencePage:_},Symbol.toStringTag,{value:"Module"}));export{_ as renderExperiencePage};
