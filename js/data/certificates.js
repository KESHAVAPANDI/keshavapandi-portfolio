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
    date: "Verified Certification",
    credentialUrl: "https://www.nvidia.com/en-us/training/",
    image: null,
    skills: ["Deep Neural Networks", "Computer Vision", "PyTorch", "Model Training", "Optimization"],
    description: "Hands-on competency in designing, training, and deploying deep learning neural networks for computer vision and perception tasks."
  },
  {
    id: "nvidia-video-ai",
    title: "Building Real-Time Video AI Applications",
    issuer: "NVIDIA Deep Learning Institute",
    badgeType: "nvidia",
    date: "Verified Certification",
    credentialUrl: "https://www.nvidia.com/en-us/training/",
    image: null,
    skills: ["DeepStream SDK", "Real-Time Video Analytics", "TensorRT", "Multi-Stream AI"],
    description: "Specialized training in building high-throughput, low-latency intelligent video analytics pipelines and hardware-accelerated AI deployment."
  },
  {
    id: "nvidia-transformers-nlp",
    title: "Introduction to Transformer-Based Natural Language Processing",
    issuer: "NVIDIA Deep Learning Institute",
    badgeType: "nvidia",
    date: "Verified Certification",
    credentialUrl: "https://www.nvidia.com/en-us/training/",
    image: null,
    skills: ["Transformers", "Attention Mechanisms", "BERT", "Text Classification", "NLP Pipelines"],
    description: "Comprehensive foundation in transformer architectures, self-attention mechanisms, and fine-tuning language models for natural language tasks."
  },
  {
    id: "google-cybersecurity",
    title: "Foundations of Cybersecurity",
    issuer: "Google",
    badgeType: "google",
    date: "Verified Certification",
    credentialUrl: "https://grow.google/certificates/cybersecurity/",
    image: null,
    skills: ["Security Principles", "Threat Mitigation", "Network Security", "Asset Protection"],
    description: "Core cybersecurity principles, threat modeling, vulnerability assessment, and defense-in-depth architectural security practices."
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = certificatesData;
}
