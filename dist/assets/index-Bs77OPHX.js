const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./ProfilePage-BDNJ6mJv.js","./ResumePreview-JMVP9Rpr.js","./PreviewPage-BDYSSEhf.js"])))=>i.map(i=>d[i]);
(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const a of r)if(a.type==="childList")for(const t of a.addedNodes)t.tagName==="LINK"&&t.rel==="modulepreload"&&o(t)}).observe(document,{childList:!0,subtree:!0});function l(r){const a={};return r.integrity&&(a.integrity=r.integrity),r.referrerPolicy&&(a.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?a.credentials="include":r.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function o(r){if(r.ep)return;r.ep=!0;const a=l(r);fetch(r.href,a)}})();const x="resumeBuilderData",e={currentPage:"landing",currentStep:0,profile:{name:"",phone:"",email:"",location:"",linkedin:"",website:""},education:[],selectedEducation:new Set,experiences:[],selectedExperiences:new Set,projects:[],selectedProjects:new Set,skills:[],selectedSkills:new Set,savedResumes:[]};function h(){const s={profile:e.profile,education:e.education,selectedEducation:[...e.selectedEducation],experiences:e.experiences,selectedExperiences:[...e.selectedExperiences],projects:e.projects,selectedProjects:[...e.selectedProjects],skills:e.skills,selectedSkills:[...e.selectedSkills],savedResumes:e.savedResumes};localStorage.setItem(x,JSON.stringify(s))}function y(){try{const s=localStorage.getItem(x);if(!s)return!1;const n=JSON.parse(s);return e.profile=n.profile||e.profile,e.education=n.education||[],e.selectedEducation=new Set(n.selectedEducation||[]),e.experiences=n.experiences||[],e.selectedExperiences=new Set(n.selectedExperiences||[]),e.projects=n.projects||[],e.selectedProjects=new Set(n.selectedProjects||[]),e.skills=n.skills||[],e.selectedSkills=new Set(n.selectedSkills||[]),e.savedResumes=n.savedResumes||[],!0}catch(s){return console.error("Failed to load from storage:",s),!1}}function S(){e.profile={name:"",phone:"",email:"",location:"",linkedin:"",website:""},e.education=[],e.selectedEducation=new Set,e.experiences=[],e.selectedExperiences=new Set,e.projects=[],e.selectedProjects=new Set,e.skills=[],e.selectedSkills=new Set}function E(){return Date.now().toString(36)+Math.random().toString(36).substr(2)}const k=[{label:"Profile",key:"profile"},{label:"Education",key:"education"},{label:"Experience",key:"experience"},{label:"Projects",key:"projects"},{label:"Skills",key:"skills"},{label:"Preview",key:"preview"}],P=Object.freeze(Object.defineProperty({__proto__:null,STEPS:k,clearAll:S,generateId:E,loadFromStorage:y,saveToStorage:h,state:e},Symbol.toStringTag,{value:"Module"})),_="modulepreload",j=function(s,n){return new URL(s,n).href},w={},f=function(n,l,o){let r=Promise.resolve();if(l&&l.length>0){const t=document.getElementsByTagName("link"),i=document.querySelector("meta[property=csp-nonce]"),d=(i==null?void 0:i.nonce)||(i==null?void 0:i.getAttribute("nonce"));r=Promise.allSettled(l.map(c=>{if(c=j(c,o),c in w)return;w[c]=!0;const p=c.endsWith(".css"),v=p?'[rel="stylesheet"]':"";if(!!o)for(let m=t.length-1;m>=0;m--){const g=t[m];if(g.href===c&&(!p||g.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${c}"]${v}`))return;const u=document.createElement("link");if(u.rel=p?"stylesheet":_,p||(u.as="script"),u.crossOrigin="",u.href=c,d&&u.setAttribute("nonce",d),document.head.appendChild(u),p)return new Promise((m,g)=>{u.addEventListener("load",m),u.addEventListener("error",()=>g(new Error(`Unable to preload CSS for ${c}`)))})}))}function a(t){const i=new Event("vite:preloadError",{cancelable:!0});if(i.payload=t,window.dispatchEvent(i),!i.defaultPrevented)throw t}return r.then(t=>{for(const i of t||[])i.status==="rejected"&&a(i.reason);return n().catch(a)})};function L(s,n=2500){let l=document.getElementById("global-toast");l||(l=document.createElement("div"),l.id="global-toast",l.className="toast",document.body.appendChild(l)),l.textContent=s,l.classList.add("show"),setTimeout(()=>l.classList.remove("show"),n)}function O(s,n,l){const{STEPS:o}=window.__store__,r=o.map((a,t)=>{const i=t<n,d=t===n,c=i?"done":d?"active":"",p=i?"done":d?"active":"",v=t<o.length-1?'<div class="step-connector"></div>':"";return`
      <div class="step-item" data-step="${t}">
        <div class="step-dot ${c}">${i?"✓":t+1}</div>
        <span class="step-label ${p}">${a.label}</span>
      </div>
      ${v}
    `}).join("");s.innerHTML=`
    <div class="top-bar">
      <span class="logo">Résumé Builder</span>
      <div class="progress-steps">${r}</div>
      <div></div>
    </div>
  `,s.querySelectorAll(".step-item").forEach(a=>{a.addEventListener("click",()=>{const t=parseInt(a.dataset.step);t<n&&l&&l(t)})})}function I(s){return s?String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"):""}function T(s,n){const l=a=>{if(!a)return"";const[t,i]=a.split("-");return`${["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][parseInt(i)-1]||""} ${t}`},o=l(s),r=n==="present"?"Present":l(n);return o&&r?`${o} – ${r}`:o||""}function A(s,n){return[...s].sort((l,o)=>(l[n]||"").localeCompare(o[n]||""))}function b(){var r,a;const s=document.getElementById("app"),n=(()=>{try{return!!localStorage.getItem("resumeBuilderData")}catch{return!1}})(),l=e.savedResumes.length>0?`
      <div class="saved-resumes-section">
        <div class="divider"></div>
        <h3 style="font-family:var(--font-display);font-size:0.9rem;color:var(--ink-soft);margin-bottom:12px;">Saved Résumés</h3>
        ${e.savedResumes.map((t,i)=>`
          <div class="saved-resume-item" data-index="${i}">
            <div>
              <div style="font-weight:700;font-size:0.88rem;color:var(--ink)">${t.name||"Untitled Résumé"}</div>
              <div style="font-size:0.78rem;color:var(--ink-muted)">${t.savedAt||""}</div>
            </div>
            <div class="flex gap-8">
              <button class="btn btn-ghost btn-sm load-resume-btn" data-index="${i}">Open</button>
              <button class="btn btn-ghost btn-sm delete-resume-btn" data-index="${i}" style="color:#c0392b">Delete</button>
            </div>
          </div>
        `).join("")}
      </div>
    `:"",o=document.createElement("div");o.id="page-landing",o.className="page active",o.innerHTML=`
    <div class="landing-container">
      <div class="landing-inner">
        <div class="landing-eyebrow">Professional</div>
        <h1 class="landing-title">Résumé<br>Builder</h1>
        <p class="landing-desc">Create a clean, professional résumé in minutes. Your information is saved locally — private and yours.</p>

        <div class="landing-actions">
          <button class="btn btn-primary landing-btn" id="btn-new-resume">
            <span>✦</span> Start New Résumé
          </button>
          ${n?`
            <button class="btn btn-secondary landing-btn" id="btn-continue-resume">
              ↩ Continue Where I Left Off
            </button>
          `:""}
        </div>

        ${l}
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
  `,s.innerHTML="",s.appendChild(o),R(),(r=document.getElementById("btn-new-resume"))==null||r.addEventListener("click",()=>{S(),h(),e.currentStep=0,f(()=>import("./ProfilePage-BDNJ6mJv.js"),__vite__mapDeps([0,1]),import.meta.url).then(t=>t.renderProfilePage())}),(a=document.getElementById("btn-continue-resume"))==null||a.addEventListener("click",()=>{e.currentStep=0,f(()=>import("./ProfilePage-BDNJ6mJv.js"),__vite__mapDeps([0,1]),import.meta.url).then(t=>t.renderProfilePage())}),document.querySelectorAll(".load-resume-btn").forEach(t=>{t.addEventListener("click",()=>{const i=parseInt(t.dataset.index),d=e.savedResumes[i];d&&(e.profile=d.profile||{},e.education=d.education||[],e.selectedEducation=new Set(d.selectedEducation||[]),e.experiences=d.experiences||[],e.selectedExperiences=new Set(d.selectedExperiences||[]),e.projects=d.projects||[],e.selectedProjects=new Set(d.selectedProjects||[]),e.skills=d.skills||[],e.selectedSkills=new Set(d.selectedSkills||[]),e.currentStep=5,f(()=>import("./PreviewPage-BDYSSEhf.js"),__vite__mapDeps([2,1]),import.meta.url).then(c=>c.renderPreviewPage()))})}),document.querySelectorAll(".delete-resume-btn").forEach(t=>{t.addEventListener("click",()=>{const i=parseInt(t.dataset.index);e.savedResumes.splice(i,1),h(),L("Résumé deleted."),b()})})}function R(){if(document.getElementById("landing-styles"))return;const s=document.createElement("style");s.id="landing-styles",s.textContent=`
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
  `,document.head.appendChild(s)}const B=Object.freeze(Object.defineProperty({__proto__:null,renderLanding:b},Symbol.toStringTag,{value:"Module"}));window.__store__=P;y();b();export{B as L,f as _,L as a,A as b,e as c,I as e,T as f,E as g,O as r,h as s};
