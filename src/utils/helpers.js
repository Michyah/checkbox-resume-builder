// ===== HELPERS =====

// Show a toast notification
export function showToast(message, duration = 2500) {
  let toast = document.getElementById('global-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'global-toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), duration);
}

// Navigate between pages
export function navigateTo(pageId) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const target = document.getElementById(pageId);
  if (target) {
    target.classList.add('active');
    target.scrollTop = 0;
  }
}

// Render a top bar with progress steps
export function renderTopBar(container, currentStep, onStepClick) {
  const { STEPS } = window.__store__;
  const stepsHTML = STEPS.map((step, i) => {
    const isDone = i < currentStep;
    const isActive = i === currentStep;
    const dotClass = isDone ? 'done' : isActive ? 'active' : '';
    const labelClass = isDone ? 'done' : isActive ? 'active' : '';
    const connector = i < STEPS.length - 1 ? '<div class="step-connector"></div>' : '';
    return `
      <div class="step-item" data-step="${i}">
        <div class="step-dot ${dotClass}">${isDone ? '✓' : i + 1}</div>
        <span class="step-label ${labelClass}">${step.label}</span>
      </div>
      ${connector}
    `;
  }).join('');

  container.innerHTML = `
    <div class="top-bar">
      <span class="logo">Résumé Builder</span>
      <div class="progress-steps">${stepsHTML}</div>
      <div></div>
    </div>
  `;

  container.querySelectorAll('.step-item').forEach(item => {
    item.addEventListener('click', () => {
      const step = parseInt(item.dataset.step);
      if (step < currentStep && onStepClick) onStepClick(step);
    });
  });
}

// Escape HTML to prevent XSS
export function esc(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// Format date range
export function formatDateRange(start, end) {
  const fmt = (d) => {
    if (!d) return '';
    const [y, m] = d.split('-');
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    return `${months[parseInt(m) - 1] || ''} ${y}`;
  };
  const s = fmt(start);
  const e = end === 'present' ? 'Present' : fmt(end);
  if (s && e) return `${s} – ${e}`;
  if (s) return s;
  return '';
}

// Sort alphabetically by a key
export function sortAlpha(arr, key) {
  return [...arr].sort((a, b) => (a[key] || '').localeCompare(b[key] || ''));
}
