const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./index-Bs77OPHX.js","./index-DXbNnUvX.css","./EducationPage-MQYMx5EL.js","./ResumePreview-JMVP9Rpr.js","./ExperiencePage-CA-iFkxP.js","./ProjectsPage-TxNwzFW2.js","./SkillsPage-pT4_QlGT.js","./PreviewPage-BDYSSEhf.js"])))=>i.map(i=>d[i]);
import{c as i,r as u,_ as r,a as v,s as d}from"./index-Bs77OPHX.js";import{r as p}from"./ResumePreview-JMVP9Rpr.js";function f(){i.currentStep=0;const t=document.getElementById("app");t.innerHTML="";const o=document.createElement("div");o.id="page-profile",o.className="page active",o.innerHTML=`
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
            <input type="text" id="inp-name" placeholder="e.g. Alexandra Chen" value="${l(i.profile.name)}" />
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">
            <div class="form-group">
              <label>Phone Number</label>
              <input type="tel" id="inp-phone" placeholder="(555) 000-0000" value="${l(i.profile.phone)}" />
            </div>
            <div class="form-group">
              <label>Email Address</label>
              <input type="email" id="inp-email" placeholder="you@email.com" value="${l(i.profile.email)}" />
            </div>
          </div>
          <div class="form-group">
            <label>Location</label>
            <input type="text" id="inp-location" placeholder="e.g. San Francisco, CA" value="${l(i.profile.location)}" />
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">
            <div class="form-group">
              <label>LinkedIn (optional)</label>
              <input type="text" id="inp-linkedin" placeholder="linkedin.com/in/..." value="${l(i.profile.linkedin)}" />
            </div>
            <div class="form-group">
              <label>Website (optional)</label>
              <input type="text" id="inp-website" placeholder="yoursite.com" value="${l(i.profile.website)}" />
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
  `,t.appendChild(o),u(document.getElementById("topbar-profile"),0,_),p("resume-preview-container");const e=["inp-name","inp-phone","inp-email","inp-location","inp-linkedin","inp-website"],s=["name","phone","email","location","linkedin","website"];e.forEach((n,c)=>{var a;(a=document.getElementById(n))==null||a.addEventListener("input",m=>{i.profile[s[c]]=m.target.value,p("resume-preview-container")})}),document.getElementById("btn-profile-back").addEventListener("click",()=>{r(()=>import("./index-Bs77OPHX.js").then(n=>n.L),__vite__mapDeps([0,1]),import.meta.url).then(n=>n.renderLanding())}),document.getElementById("btn-profile-next").addEventListener("click",()=>{if(!i.profile.name.trim()){v("Please enter your name to continue.");return}d(),r(()=>import("./EducationPage-MQYMx5EL.js"),__vite__mapDeps([2,0,1,3]),import.meta.url).then(n=>n.renderEducationPage())})}function _(t){d();const o=[()=>r(()=>Promise.resolve().then(()=>g),void 0,import.meta.url).then(e=>e.renderProfilePage()),()=>r(()=>import("./EducationPage-MQYMx5EL.js"),__vite__mapDeps([2,0,1,3]),import.meta.url).then(e=>e.renderEducationPage()),()=>r(()=>import("./ExperiencePage-CA-iFkxP.js"),__vite__mapDeps([4,0,1,3]),import.meta.url).then(e=>e.renderExperiencePage()),()=>r(()=>import("./ProjectsPage-TxNwzFW2.js"),__vite__mapDeps([5,0,1,3]),import.meta.url).then(e=>e.renderProjectsPage()),()=>r(()=>import("./SkillsPage-pT4_QlGT.js"),__vite__mapDeps([6,0,1,3]),import.meta.url).then(e=>e.renderSkillsPage()),()=>r(()=>import("./PreviewPage-BDYSSEhf.js"),__vite__mapDeps([7,0,1,3]),import.meta.url).then(e=>e.renderPreviewPage())];o[t]&&o[t]()}function l(t){return t?String(t).replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;"):""}const g=Object.freeze(Object.defineProperty({__proto__:null,renderProfilePage:f},Symbol.toStringTag,{value:"Module"}));export{f as renderProfilePage};
