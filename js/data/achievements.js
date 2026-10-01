/**
 * ACHIEVEMENTS DATA REPOSITORY
 * Single source of truth for all milestones, hackathons, and technical achievements.
 */

const achievementsData = [
  {
    id: "competitive-coding",
    title: "Algorithmic Problem Solving & Data Structures",
    organization: "LeetCode & Technical Platforms",
    date: "Active",
    description: "Consistent practice and problem solving across data structures, graph traversals, dynamic programming, and algorithmic optimization.",
    link: "https://leetcode.com/u/KESHAVA_PANDI_A_S/",
    images: [],
    highlights: ["Strong foundation in Java, Python, and C", "Graph algorithms & matrix transformations", "Optimized space and time complexity solutions"]
  },
  {
    id: "nvidia-ai-cert-series",
    title: "Triple NVIDIA Deep Learning Institute Accreditations",
    organization: "NVIDIA DLI",
    date: "Certified",
    description: "Completed intensive technical accreditations spanning Deep Learning Fundamentals, Transformer NLP, and Real-Time Video AI Stream Processing.",
    link: null,
    images: [],
    highlights: ["Advanced neural network training & tuning", "Transformer model architectures", "Real-time edge video AI pipelines"]
  },
  {
    id: "full-lifecycle-engineering",
    title: "End-to-End AI & Web System Deliveries",
    organization: "Independent & Academic Projects",
    date: "Ongoing",
    description: "Successfully designed, coded, and deployed end-to-end applications from initial wireframes to model inference endpoints, databases, and responsive client interfaces.",
    link: "https://github.com/KESHAVAPANDI",
    images: [],
    highlights: ["Model deployment and REST API integrations", "Responsive frontend UI/UX engineering", "Relational and document database modeling"]
  },
  {
    id: "ai-engineering-internships",
    title: "AI Engineering Internships",
    organization: "RBG.AI · Oxyher E-Commerce Retail · Orange Automation and AI Solutions",
    date: "2024 – 2025",
    description: "Completed three industry internships spanning AI research, full-stack e-commerce development, and manufacturing automation.",
    link: null,
    images: [],
    pdf: "assets/certifications/internship-certificates.pdf",
    highlights: ["RBG.AI (Jun – Jul 2024): Large OCR models, Gen AI models, image processing and hyperparameter tuning", "Oxyher E-Commerce Retail (Dec 2024 – Jan 2025): Full-stack e-commerce site with Python Flask, HTML, CSS and JavaScript", "Orange Automation and AI Solutions (Jun – Jul 2025): 30-day production department internship"]
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = achievementsData;
}
