const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./SkillsPage-pT4_QlGT.js","./index-Bs77OPHX.js","./index-DXbNnUvX.css","./ResumePreview-JMVP9Rpr.js","./ProfilePage-BDNJ6mJv.js","./EducationPage-MQYMx5EL.js","./ExperiencePage-CA-iFkxP.js","./ProjectsPage-TxNwzFW2.js"])))=>i.map(i=>d[i]);
import{c as t,e as c,r as p,s as m,_ as o,a as d}from"./index-Bs77OPHX.js";import{b as u}from"./ResumePreview-JMVP9Rpr.js";function v(){t.currentStep=5;const r=document.getElementById("app");r.innerHTML="";const n=document.createElement("div");n.id="page-preview",n.className="page active",n.innerHTML=`
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
          <input type="text" id="resume-save-name" placeholder='e.g. "Software Engineer 2025"' value="${c(t.profile.name?t.profile.name+" — Résumé":"")}" />
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
  `,r.appendChild(n),p(document.getElementById("topbar-preview"),5,h),g(),b(),E(),document.getElementById("btn-preview-back").addEventListener("click",()=>{m(),o(()=>import("./SkillsPage-pT4_QlGT.js"),__vite__mapDeps([0,1,2,3]),import.meta.url).then(e=>e.renderSkillsPage())}),document.getElementById("btn-start-over").addEventListener("click",()=>{confirm("Start a fresh résumé? Your saved library entries will remain.")&&o(()=>import("./index-Bs77OPHX.js").then(e=>e.L),__vite__mapDeps([1,2]),import.meta.url).then(e=>e.renderLanding())}),document.getElementById("btn-save-resume").addEventListener("click",()=>{const e=document.getElementById("resume-save-name").value.trim()||"My Résumé",i={name:e,savedAt:new Date().toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"}),profile:{...t.profile},education:[...t.education],selectedEducation:[...t.selectedEducation],experiences:[...t.experiences],selectedExperiences:[...t.selectedExperiences],projects:[...t.projects],selectedProjects:[...t.selectedProjects],skills:[...t.skills],selectedSkills:[...t.selectedSkills]},l=t.savedResumes.findIndex(s=>s.name===e);l!==-1?t.savedResumes[l]=i:t.savedResumes.push(i),m(),d(`"${e}" saved to library!`);const a=document.getElementById("btn-save-resume");a.textContent="✓ Saved!",a.style.background="var(--brown-dark)",setTimeout(()=>{a.textContent="✦ Save Résumé to Library",a.style.background=""},2e3)}),document.getElementById("btn-print-resume").addEventListener("click",()=>{f()})}function g(){const r=document.getElementById("resume-summary"),n=t.education.filter(s=>t.selectedEducation.has(s.id)),e=t.experiences.filter(s=>t.selectedExperiences.has(s.id)),i=t.projects.filter(s=>t.selectedProjects.has(s.id)),l=t.skills.filter(s=>t.selectedSkills.has(s.id)),a=[{label:"Name",value:t.profile.name||"—"},{label:"Education entries",value:n.length},{label:"Experience entries",value:e.length},{label:"Projects",value:i.length},{label:"Skills & Interests",value:l.length}];r.innerHTML=a.map(s=>`
    <div style="display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid var(--cream-darker)">
      <span style="font-size:0.82rem;color:var(--ink-muted)">${c(s.label)}</span>
      <span style="font-size:0.82rem;font-weight:700;color:var(--ink)">${c(String(s.value))}</span>
    </div>
  `).join("")}function b(){const r=document.getElementById("resume-preview-container");if(!r)return;r.innerHTML=u();const n=r.querySelector(".resume-sheet");n&&(n.style.fontSize="10px");const e=r.querySelector(".resume-preview-wrap");e&&(e.style.maxWidth="520px")}async function f(){const r=document.getElementById("resume-sheet-content");if(!r){d("Nothing to export yet.");return}const n=document.getElementById("btn-print-resume");n.textContent="⏳ Generating PDF...",n.disabled=!0;try{window.html2pdf||await y("https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js");const e=(t.profile.name||"Resume").replace(/[^a-z0-9]/gi,"_")+"_Resume.pdf",i=r.cloneNode(!0);i.style.cssText=`
      background: #fff;
      width: 775px;
      padding: 24px 24px;
      font-family: Georgia, serif;
      font-size: 11px;
      line-height: 1.55;
      color: #1a1410;
      box-shadow: none;
    `,i.querySelectorAll(".resume-empty-hint, .resume-name.placeholder").forEach(a=>{a.style.display="none"});const l={margin:[.25,.25,.25,.25],filename:e,image:{type:"jpeg",quality:.98},html2canvas:{scale:2,useCORS:!0,letterRendering:!0},jsPDF:{unit:"in",format:"letter",orientation:"portrait"}};await html2pdf().set(l).from(i).save(),d("PDF exported successfully!")}catch(e){console.error("PDF export failed:",e),d("Export failed — please try again.")}finally{n.textContent="↓ Export Clean PDF",n.disabled=!1}}function y(r){return new Promise((n,e)=>{const i=document.createElement("script");i.src=r,i.onload=n,i.onerror=e,document.head.appendChild(i)})}function h(r){m();const n=[()=>o(()=>import("./ProfilePage-BDNJ6mJv.js"),__vite__mapDeps([4,1,2,3]),import.meta.url).then(e=>e.renderProfilePage()),()=>o(()=>import("./EducationPage-MQYMx5EL.js"),__vite__mapDeps([5,1,2,3]),import.meta.url).then(e=>e.renderEducationPage()),()=>o(()=>import("./ExperiencePage-CA-iFkxP.js"),__vite__mapDeps([6,1,2,3]),import.meta.url).then(e=>e.renderExperiencePage()),()=>o(()=>import("./ProjectsPage-TxNwzFW2.js"),__vite__mapDeps([7,1,2,3]),import.meta.url).then(e=>e.renderProjectsPage()),()=>o(()=>import("./SkillsPage-pT4_QlGT.js"),__vite__mapDeps([0,1,2,3]),import.meta.url).then(e=>e.renderSkillsPage()),()=>o(()=>Promise.resolve().then(()=>x),void 0,import.meta.url).then(e=>e.renderPreviewPage())];n[r]&&n[r]()}function E(){if(document.getElementById("preview-page-styles"))return;const r=document.createElement("style");r.id="preview-page-styles",r.textContent=`
    #page-preview .split-right { background: #ccc9c0; }
  `,document.head.appendChild(r)}const x=Object.freeze(Object.defineProperty({__proto__:null,renderPreviewPage:v},Symbol.toStringTag,{value:"Module"}));export{v as renderPreviewPage};
