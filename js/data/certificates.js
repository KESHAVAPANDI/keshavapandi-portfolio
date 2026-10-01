/**
 * CERTIFICATIONS DATA REPOSITORY
 * Single source of truth for all certifications.
 * To add a new certificate in the future, simply append a new object to this array.
 */

const certificatesData = [
  {
    id: "nvidia-deep-learning",
    title: "Fundamentals of Deep Learning",
    issuer: "NVIDIA Deep Learning Institute",
    badgeType: "nvidia",
    date: "Issued October 18, 2024",
    credentialUrl: "https://learn.nvidia.com/certificates?id=4PsPOWG8CTbLFcYn2d_Q",
    image: "assets/certifications/nvidia-fundamentals-of-deep-learning-thumb.jpg",
    pdf: "assets/certifications/nvidia-fundamentals-of-deep-learning.pdf",
    skills: ["Deep Neural Networks", "Computer Vision", "PyTorch", "Model Training", "Optimization"],
    description: "Hands-on competency in designing, training, and deploying deep learning neural networks for computer vision and perception tasks."
  },
  {
    id: "nvidia-video-ai",
    title: "Building Real-Time Video AI Applications",
    issuer: "NVIDIA Deep Learning Institute",
    badgeType: "nvidia",
    date: "Issued February 8, 2025",
    credentialUrl: "https://learn.nvidia.com/certificates?id=9eG5Ye2OuRe6V75_kQ",
    image: "assets/certifications/nvidia-building-real-time-video-ai-thumb.jpg",
    pdf: "assets/certifications/nvidia-building-real-time-video-ai.pdf",
    skills: ["DeepStream SDK", "Real-Time Video Analytics", "TensorRT", "Multi-Stream AI"],
    description: "Specialized training in building high-throughput, low-latency intelligent video analytics pipelines and hardware-accelerated AI deployment."
  },
  {
    id: "nvidia-transformers-nlp",
    title: "Introduction to Transformer-Based Natural Language Processing",
    issuer: "NVIDIA Deep Learning Institute",
    badgeType: "nvidia",
    date: "Issued February 15, 2025",
    credentialUrl: "https://learn.nvidia.com/certificates?id=9PPE6b1TRX0K0BELrJ5ZHw",
    image: "assets/certifications/nvidia-transformer-based-nlp-thumb.jpg",
    pdf: "assets/certifications/nvidia-transformer-based-nlp.pdf",
    skills: ["Transformers", "Attention Mechanisms", "BERT", "Text Classification", "NLP Pipelines"],
    description: "Comprehensive foundation in transformer architectures, self-attention mechanisms, and fine-tuning language models for natural language tasks."
  },
  {
    id: "ebox-coded-conundrums-c",
    title: "Coded Conundrums: Mastering Problem Solving with C",
    issuer: "E-Box",
    badgeType: "ebox",
    date: "Jul 2024 – Sep 2024",
    credentialUrl: null,
    image: "assets/certifications/ebox-coded-conundrums-c-thumb.jpg",
    pdf: "assets/certifications/ebox-coded-conundrums-c.pdf",
    skills: ["C Programming", "Problem Solving", "Algorithms", "Data Structures"],
    description: "Online certification course on mastering problem solving with C, completed Jul 2024 – Sep 2024."
  },
  {
    id: "google-cybersecurity",
    title: "Foundations of Cybersecurity",
    issuer: "Google · Coursera",
    badgeType: "google",
    date: "Issued March 4, 2024",
    credentialUrl: "https://coursera.org/verify/64V2JALKG857",
    image: "assets/certifications/google-foundations-of-cybersecurity-thumb.jpg",
    pdf: "assets/certifications/google-foundations-of-cybersecurity.pdf",
    skills: ["Security Principles", "Threat Mitigation", "Network Security", "Asset Protection"],
    description: "Core cybersecurity principles, threat modeling, vulnerability assessment, and defense-in-depth architectural security practices."
  },
  {
    id: "google-automate-cybersecurity-python",
    title: "Automate Cybersecurity Tasks with Python",
    issuer: "Google · Coursera",
    badgeType: "google",
    date: "Issued March 18, 2024",
    credentialUrl: "https://coursera.org/verify/4RQ7J83WLGCS",
    image: "assets/certifications/google-automate-cybersecurity-tasks-python-thumb.jpg",
    pdf: "assets/certifications/google-automate-cybersecurity-tasks-python.pdf",
    skills: ["Python", "Security Automation", "Scripting", "Log Parsing"],
    description: "Hands-on training in writing Python scripts to automate routine cybersecurity workflows, parse logs, and respond to threats faster."
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = certificatesData;
}
