// ===== MAIN ENTRY POINT =====
import './styles/resume.css';
import { state, loadFromStorage } from './utils/store.js';
import { renderLanding } from './pages/LandingPage.js';
import * as store from './utils/store.js';

// Expose store to helpers (avoid circular imports)
window.__store__ = store;

// Load any saved data from localStorage
loadFromStorage();

// Boot the app
renderLanding();