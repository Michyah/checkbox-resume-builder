const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./ProjectsPage-TxNwzFW2.js","./index-Bs77OPHX.js","./index-DXbNnUvX.css","./ResumePreview-JMVP9Rpr.js","./PreviewPage-BDYSSEhf.js","./ProfilePage-BDNJ6mJv.js","./EducationPage-MQYMx5EL.js","./ExperiencePage-CA-iFkxP.js"])))=>i.map(i=>d[i]);
import{c as s,e as r,r as y,s as m,_ as o,b as E,a as v,g as b}from"./index-Bs77OPHX.js";import{r as c}from"./ResumePreview-JMVP9Rpr.js";let a=null;const u=["Programming Languages","Frameworks & Libraries","Tools & Platforms","Languages","Soft Skills","Interests & Hobbies","Certifications","Other"];function _(){s.currentStep=4;const l=document.getElementById("app");l.innerHTML="";const i=document.createElement("div");i.id="page-skills",i.className="page active",i.innerHTML=`
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
            ${u.map(e=>`<option value="${r(e)}">${r(e)}</option>`).join("")}
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
  `,l.appendChild(i),y(document.getElementById("topbar-skills"),4,h),g(),c("resume-preview-container"),document.getElementById("btn-add-skill").addEventListener("click",()=>k()),document.getElementById("btn-skills-back").addEventListener("click",()=>{m(),o(()=>import("./ProjectsPage-TxNwzFW2.js"),__vite__mapDeps([0,1,2,3]),import.meta.url).then(e=>e.renderProjectsPage())}),document.getElementById("btn-skills-next").addEventListener("click",()=>{m(),o(()=>import("./PreviewPage-BDYSSEhf.js"),__vite__mapDeps([4,1,2,3]),import.meta.url).then(e=>e.renderPreviewPage())}),document.getElementById("skill-modal-cancel").addEventListener("click",p),document.getElementById("skill-modal").addEventListener("click",e=>{e.target===e.currentTarget&&p()}),document.getElementById("skill-modal-save").addEventListener("click",f),document.getElementById("skill-category").addEventListener("change",e=>{document.getElementById("custom-cat-group").style.display=e.target.value==="__custom__"?"block":"none"})}function g(){const l=document.getElementById("skills-tiles");if(!l)return;if(s.skills.length===0){l.innerHTML='<p class="text-muted" style="margin-bottom:16px">No skills added yet. Add languages, tools, frameworks, and interests.</p>';return}const i={};if(E(s.skills,"name").forEach(t=>{const n=t.category||"Other";i[n]||(i[n]=[]),i[n].push(t)}),l.innerHTML=Object.entries(i).map(([t,n])=>`
    <div style="margin-bottom:20px">
      <div style="font-size:0.72rem;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:var(--brown);margin-bottom:8px">${r(t)}</div>
      <div class="skills-grid">
        ${n.map(d=>`
            <div class="skill-tile tile ${s.selectedSkills.has(d.id)?"selected":""}" data-id="${d.id}" style="display:inline-flex;flex-direction:column;padding:10px 14px;cursor:pointer">
              <div style="display:flex;align-items:center;justify-content:space-between;gap:12px">
                <span class="tile-title" style="font-size:0.85rem;padding:0">${r(d.name)}</span>
                <div class="tile-checkbox" style="position:relative;top:auto;right:auto;flex-shrink:0"></div>
              </div>
              <div class="tile-actions" style="margin-top:6px">
                <button class="btn btn-ghost btn-sm tile-edit-btn" data-id="${d.id}" style="padding:2px 8px;font-size:0.7rem">Edit</button>
                <button class="btn btn-ghost btn-sm tile-delete-btn" data-id="${d.id}" style="padding:2px 8px;font-size:0.7rem;color:#c0392b">✕</button>
              </div>
            </div>
          `).join("")}
      </div>
    </div>
  `).join(""),!document.getElementById("skills-grid-style")){const t=document.createElement("style");t.id="skills-grid-style",t.textContent=`.skills-grid { display: flex; flex-wrap: wrap; gap: 8px; }
    .skill-tile { min-width: 120px; }`,document.head.appendChild(t)}l.querySelectorAll(".skill-tile").forEach(t=>{t.addEventListener("click",n=>{if(n.target.closest(".tile-actions"))return;const d=t.dataset.id;s.selectedSkills.has(d)?s.selectedSkills.delete(d):s.selectedSkills.add(d),t.classList.toggle("selected"),c("resume-preview-container")})}),l.querySelectorAll(".tile-edit-btn").forEach(t=>{t.addEventListener("click",n=>{n.stopPropagation(),k(t.dataset.id)})}),l.querySelectorAll(".tile-delete-btn").forEach(t=>{t.addEventListener("click",n=>{n.stopPropagation(),s.skills=s.skills.filter(d=>d.id!==t.dataset.id),s.selectedSkills.delete(t.dataset.id),g(),c("resume-preview-container")})})}function k(l=null){a=l;const i=document.getElementById("skill-modal-title");if(document.getElementById("custom-cat-group").style.display="none",l){const e=s.skills.find(d=>d.id===l);if(!e)return;i.textContent="Edit Skill",document.getElementById("skill-name").value=e.name||"";const t=document.getElementById("skill-category");u.includes(e.category)?t.value=e.category:(t.value="__custom__",document.getElementById("custom-cat-group").style.display="block",document.getElementById("skill-custom-cat").value=e.category||"")}else i.textContent="Add Skill",document.getElementById("skill-name").value="",document.getElementById("skill-category").value=u[0],document.getElementById("skill-custom-cat").value="";document.getElementById("skill-modal").classList.add("open"),document.getElementById("skill-name").focus()}function p(){document.getElementById("skill-modal").classList.remove("open"),a=null}function f(){const l=document.getElementById("skill-name").value.trim();if(!l){v("Please enter a skill or item.");return}let i=document.getElementById("skill-category").value;i==="__custom__"&&(i=document.getElementById("skill-custom-cat").value.trim()||"Other");const e={id:a||b(),name:l,category:i};if(a){const t=s.skills.findIndex(n=>n.id===a);t!==-1&&(s.skills[t]=e)}else s.skills.push(e),s.selectedSkills.add(e.id);p(),g(),c("resume-preview-container"),v(a?"Updated.":"Added.")}function h(l){m();const i=[()=>o(()=>import("./ProfilePage-BDNJ6mJv.js"),__vite__mapDeps([5,1,2,3]),import.meta.url).then(e=>e.renderProfilePage()),()=>o(()=>import("./EducationPage-MQYMx5EL.js"),__vite__mapDeps([6,1,2,3]),import.meta.url).then(e=>e.renderEducationPage()),()=>o(()=>import("./ExperiencePage-CA-iFkxP.js"),__vite__mapDeps([7,1,2,3]),import.meta.url).then(e=>e.renderExperiencePage()),()=>o(()=>import("./ProjectsPage-TxNwzFW2.js"),__vite__mapDeps([0,1,2,3]),import.meta.url).then(e=>e.renderProjectsPage()),()=>o(()=>Promise.resolve().then(()=>I),void 0,import.meta.url).then(e=>e.renderSkillsPage()),()=>o(()=>import("./PreviewPage-BDYSSEhf.js"),__vite__mapDeps([4,1,2,3]),import.meta.url).then(e=>e.renderPreviewPage())];i[l]&&i[l]()}const I=Object.freeze(Object.defineProperty({__proto__:null,renderSkillsPage:_},Symbol.toStringTag,{value:"Module"}));export{_ as renderSkillsPage};
