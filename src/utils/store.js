// ===== STATE STORE =====
// Central state for the entire resume builder application

const STORAGE_KEY = 'resumeBuilderData';

export const state = {
  currentPage: 'landing',
  currentStep: 0, // 0=profile, 1=education, 2=experience, 3=projects, 4=skills, 5=preview

  // Profile / personal info
  profile: {
    name: '',
    phone: '',
    email: '',
    location: '',
    linkedin: '',
    website: '',
  },

  // Education entries
  education: [],
  selectedEducation: new Set(),

  // Experience entries
  experiences: [],
  selectedExperiences: new Set(),

  // Projects entries
  projects: [],
  selectedProjects: new Set(),

  // Skills & Interests
  skills: [],
  selectedSkills: new Set(),

  // Saved resumes
  savedResumes: [],
};

// ===== PERSISTENCE =====
export function saveToStorage() {
  const data = {
    profile: state.profile,
    education: state.education,
    selectedEducation: [...state.selectedEducation],
    experiences: state.experiences,
    selectedExperiences: [...state.selectedExperiences],
    projects: state.projects,
    selectedProjects: [...state.selectedProjects],
    skills: state.skills,
    selectedSkills: [...state.selectedSkills],
    savedResumes: state.savedResumes,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return false;
    const data = JSON.parse(raw);

    state.profile = data.profile || state.profile;
    state.education = data.education || [];
    state.selectedEducation = new Set(data.selectedEducation || []);
    state.experiences = data.experiences || [];
    state.selectedExperiences = new Set(data.selectedExperiences || []);
    state.projects = data.projects || [];
    state.selectedProjects = new Set(data.selectedProjects || []);
    state.skills = data.skills || [];
    state.selectedSkills = new Set(data.selectedSkills || []);
    state.savedResumes = data.savedResumes || [];
    return true;
  } catch (e) {
    console.error('Failed to load from storage:', e);
    return false;
  }
}

export function clearAll() {
  state.profile = { name: '', phone: '', email: '', location: '', linkedin: '', website: '' };
  state.education = [];
  state.selectedEducation = new Set();
  state.experiences = [];
  state.selectedExperiences = new Set();
  state.projects = [];
  state.selectedProjects = new Set();
  state.skills = [];
  state.selectedSkills = new Set();
}

// ===== ID GENERATOR =====
export function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// ===== STEP CONFIG =====
export const STEPS = [
  { label: 'Profile', key: 'profile' },
  { label: 'Education', key: 'education' },
  { label: 'Experience', key: 'experience' },
  { label: 'Projects', key: 'projects' },
  { label: 'Skills', key: 'skills' },
  { label: 'Preview', key: 'preview' },
];
