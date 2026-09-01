/**
 * SKILLS DATA REPOSITORY
 * Grouped core competencies and technical proficiencies.
 * No fake percentages — focused on verified technologies.
 */

const skillsData = [
  {
    category: "Languages",
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>`,
    items: [
      { name: "Python", type: "primary" },
      { name: "Java", type: "primary" },
      { name: "C Programming", type: "primary" },
      { name: "TypeScript", type: "secondary" },
      { name: "JavaScript (ES6+)", type: "primary" },
      { name: "SQL", type: "primary" },
      { name: "PHP", type: "secondary" },
      { name: "HTML5 & CSS3", type: "primary" }
    ]
  },
  {
    category: "AI & Machine Learning",
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"></circle><path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83"></path></svg>`,
    items: [
      { name: "Deep Learning", type: "primary" },
      { name: "Transformers & Attention", type: "primary" },
      { name: "Stable Diffusion & LoRA", type: "primary" },
      { name: "PyTorch", type: "primary" },
      { name: "Scikit-Learn", type: "primary" },
      { name: "Model Deployment", type: "primary" },
      { name: "Audio Signal DSP (MFCC)", type: "primary" },
      { name: "Knowledge Graphs", type: "secondary" }
    ]
  },
  {
    category: "Computer Vision & OCR",
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>`,
    items: [
      { name: "OpenCV", type: "primary" },
      { name: "Image Preprocessing & Filtering", type: "primary" },
      { name: "Adaptive Thresholding", type: "primary" },
      { name: "Contour Detection & Segmentation", type: "primary" },
      { name: "Tesseract OCR", type: "primary" },
      { name: "Real-Time Video AI Pipelines", type: "secondary" }
    ]
  },
  {
    category: "Backend & Systems",
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect><rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect><line x1="6" y1="6" x2="6.01" y2="6"></line><line x1="6" y1="18" x2="6.01" y2="18"></line></svg>`,
    items: [
      { name: "FastAPI", type: "primary" },
      { name: "Flask", type: "primary" },
      { name: "Node.js & Express", type: "primary" },
      { name: "RESTful API Architecture", type: "primary" },
      { name: "MongoDB", type: "primary" },
      { name: "MySQL", type: "primary" },
      { name: "Pydantic", type: "primary" }
    ]
  },
  {
    category: "Core Fundamentals & Tools",
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>`,
    items: [
      { name: "Data Structures & Algorithms", type: "primary" },
      { name: "Problem Solving", type: "primary" },
      { name: "Git & GitHub Version Control", type: "primary" },
      { name: "Netlify & Vercel Deployment", type: "primary" },
      { name: "UI/UX Wireframing", type: "primary" },
      { name: "Tkinter GUI", type: "secondary" }
    ]
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = skillsData;
}
