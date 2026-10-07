/**
 * PROJECTS DATA REPOSITORY
 * Authoritative source of truth for all projects, case studies, and architecture workflows.
 * Exactly 11 projects (7 AI Projects, 4 Software & Web Projects).
 */

const projectsData = [
  // ==========================================
  // 1. AI & MACHINE LEARNING PROJECTS (PRIMARY FOCUS)
  // ==========================================
  {
    id: "ai-quality-inspection",
    title: "AI-Based Quality Inspection & Defect Identification",
    type: "ai",
    category: "Computer Vision & Quality Automation",
    tagType: "cv",
    isInternship: true,
    organization: "Orange Automation and AI Solutions",
    certificate: { pdf: "assets/certifications/internship-certificate-orange-automation.pdf" },
    period: "2025 – 2026",
    description: "An AI-based industrial inspection system that verifies terminal block assemblies by detecting components against expected BOMs, featuring automated rail measurement and a unified QML interface.",
    technologies: ["Python", "OpenCV", "YOLO / PyTorch", "QML", "Computer Vision", "Industrial AI"],
    thumbnail: null,
    video: null,
    screenshots: [],
    github: null,
    demo: null,
    overview: "Developed at Orange Automation and AI Solutions, this automated quality inspection system verifies terminal block assemblies in manufacturing environments. It detects assembled components, cross-references them against the expected Bill of Materials (BOM), and performs precise rail dimensional measurements to identify defects before shipment.",
    problem: "Manual inspection of complex terminal block assemblies on high-speed industrial lines is prone to human error, missed component mismatches, and inconsistent dimensional checks.",
    solution: "Engineered an automated multi-stage computer vision inspection pipeline combined with calibrated rail dimensional measurement, all integrated into a unified operator dashboard in QML.",
    howItWorks: "High-resolution camera sensors capture assembly images, object detection models locate and classify terminal blocks against BOM specifications, dimensional measurement modules verify rail alignment, and pass/fail verdicts are rendered in real-time.",
    features: [
      "Automated BOM component verification and mismatch detection",
      "Calibrated rail measurement module for dimensional precision checks",
      "Unified operator dashboard interface built with QML",
      "Real-time assembly defect classification and alerting pipeline"
    ],
    workflow: [
      { step: "01", title: "Assembly Ingestion", desc: "High-resolution camera capture of terminal block assembly" },
      { step: "02", title: "Component Detection", desc: "Neural vision models isolate blocks, terminals, and markers" },
      { step: "03", title: "BOM Matching", desc: "Cross-referencing detected parts against expected BOM specs" },
      { step: "04", title: "Rail Measurement", desc: "Dimensional verification via calibrated optical measurement" },
      { step: "05", title: "Quality Verdict", desc: "Real-time Pass/Fail metrics displayed on QML interface" }
    ],
    outcome: "Streamlined industrial assembly inspection and eliminated manual verification errors on high-throughput assembly lines."
  },
  {
    id: "rbg-ocr",
    title: "OCR Processing System",
    type: "ai",
    category: "Computer Vision & OCR Preprocessing",
    tagType: "cv",
    isInternship: true,
    organization: "RBG AI",
    certificate: { pdf: "assets/certifications/internship-certificate-rbg-ai.pdf" },
    period: "2024 – 2025",
    description: "An AI computer vision module that cleans and enhances bank cheque images by removing grid lines, symbols, and noise, preserving only meaningful text to improve OCR accuracy.",
    technologies: ["Python", "OpenCV", "NumPy", "Computer Vision", "Adaptive Thresholding"],
    thumbnail: "assets/projects/rbg-ocr/pipeline-overview.jpg",
    video: null,
    screenshots: ["assets/projects/rbg-ocr/pipeline-overview.jpg", "assets/projects/rbg-ocr/field-detection.jpg", "assets/projects/rbg-ocr/cleaned-output.jpg"],
    github: "https://github.com/KESHAVAPANDI/RBG-AI-Internship",
    demo: null,
    overview: "Developed during an internship at RBG AI, this module preprocesses financial documents and bank cheques by stripping noise, grid lines, security background patterns, and stamps to preserve crisp text contours for downstream OCR engines.",
    problem: "Raw cheques contain complex security background patterns, watermarks, stamps, and noise that severely degrade OCR character recognition accuracy and confidence scores.",
    solution: "Engineered an automated OpenCV preprocessing filter combining adaptive Gaussian thresholding, morphological noise removal, contrast normalization, and contour segmentation to output clean binarized text masks.",
    howItWorks: "The pipeline ingests raw image feeds, converts color space to grayscale, applies median blur to suppress high-frequency noise, executes Otsu and adaptive thresholding to separate foreground text from textured backgrounds, and aligns detected text bounding boxes.",
    features: [
      "Automated background pattern stripping and watermark suppression",
      "Adaptive Gaussian thresholding for handling non-uniform illumination",
      "Morphological kernel operations for text character sharpening",
      "Contour-based text bounding region isolation",
      "Modular Python API ready for integration with Tesseract or PyTorch OCR models"
    ],
    workflow: [
      { step: "01", title: "Image Ingestion", desc: "Raw cheque image capture and resolution normalization" },
      { step: "02", title: "Grayscale & Noise Reduction", desc: "Median blur filter to eliminate camera speckle noise" },
      { step: "03", title: "Adaptive Binarization", desc: "Dynamic thresholding separating text from textured background" },
      { step: "04", title: "Morphological Cleaning", desc: "Dilation and erosion to strengthen broken character strokes" },
      { step: "05", title: "Clean OCR Output", desc: "High-contrast binarized text mask delivered to OCR engine" }
    ],
    outcome: "Significantly improved text extraction clarity and eliminated background interference on complex cheque textures."
  },
  {
    id: "text-to-image",
    title: "Text to Image Generation",
    type: "ai",
    category: "Generative AI & Latent Diffusion",
    tagType: "ai",
    isInternship: false,
    period: "2024 – 2025",
    description: "An optimized text-to-image generation system built with Stable Diffusion and LCM-LoRA, designed for low-latency neural image synthesis on limited GPU resources.",
    technologies: ["Stable Diffusion", "LCM-LoRA", "PyTorch", "Diffusers", "Python", "CUDA"],
    thumbnail: "assets/projects/text-to-image/output-1.jpg",
    video: null,
    screenshots: ["assets/projects/text-to-image/output-1.jpg", "assets/projects/text-to-image/output-2.jpg", "assets/projects/text-to-image/output-3.jpg", "assets/projects/text-to-image/output-4.jpg"],
    github: "https://github.com/KESHAVAPANDI/text-to-image-generation",
    demo: null,
    overview: "Standard diffusion models require 25 to 50 denoising iterations, demanding significant compute time. This project implements an accelerated local inference pipeline using Latent Consistency Models and Low-Rank Adaptation (LCM-LoRA) to generate high-resolution visual assets in as few as 4-8 inference steps.",
    problem: "Standard text-to-image diffusion models exhibit high compute latency on local hardware, making interactive creative prototyping sluggish.",
    solution: "Integrated LCM-LoRA adapters into a PyTorch Stable Diffusion pipeline, enabling few-step latent trajectory prediction with high memory efficiency.",
    howItWorks: "Text prompts are tokenized and encoded via the CLIP text model. The latent space is seeded with Gaussian noise, and the LCM-LoRA UNet model predicts the final latent representation in 4–8 steps before the VAE decoder renders the RGB canvas.",
    features: [
      "Sub-second to few-step high-resolution image synthesis",
      "LoRA adapter integration for modular style tuning",
      "Memory-efficient cross-attention optimizations for limited GPU resources",
      "Prompt weighting and negative prompt guidance controls"
    ],
    workflow: [
      { step: "01", title: "Prompt Tokenization", desc: "CLIP text encoder extracts contextual embeddings" },
      { step: "02", title: "Latent Seeding", desc: "Random Gaussian noise initialized in latent space" },
      { step: "03", title: "LCM-LoRA Denoising", desc: "4 to 8 accelerated consistency model sampling steps" },
      { step: "04", title: "VAE Decoding", desc: "Latent tensor decoded into high-resolution RGB image" },
      { step: "05", title: "Output Rendering", desc: "Final synthesized image rendered with metadata tags" }
    ],
    outcome: "Achieved substantial reduction in inference computation time while maintaining sharp visual quality on consumer hardware."
  },
  {
    id: "sera-desktop-assistant",
    title: "SERA — Desktop AI Assistant",
    type: "ai",
    category: "Agentic AI & Voice Interfaces",
    tagType: "ai",
    isInternship: false,
    period: "2025 – 2026",
    description: "A voice-first desktop AI assistant powered by LLMs, speech recognition, and text-to-speech, with vision, persistent memory, and tool use for task automation.",
    technologies: ["Python", "LLMs", "Speech-to-Text", "Text-to-Speech", "WebSockets", "Event-Driven Architecture"],
    thumbnail: "assets/projects/sera-desktop-assistant/state-idle.jpg",
    video: null,
    screenshots: ["assets/projects/sera-desktop-assistant/state-idle.jpg", "assets/projects/sera-desktop-assistant/state-listening.jpg", "assets/projects/sera-desktop-assistant/state-thinking.jpg", "assets/projects/sera-desktop-assistant/state-planning.jpg", "assets/projects/sera-desktop-assistant/state-speaking.jpg", "assets/projects/sera-desktop-assistant/state-completed.jpg"],
    github: "https://github.com/KESHAVAPANDI/SERA-Desktop-Agent",
    demo: null,
    overview: "SERA (Semantic Execution & Runtime Assistant) is an agentic desktop assistant powered by LLMs, STT, TTS, vision, memory, and tools. It supports voice and hotkey activation with intelligent fallback across processing systems, enabling conversations, contextual understanding, task automation, and information retrieval.",
    problem: "Most desktop assistants are cloud-bound, single-turn, and disconnected from the local machine, so they cannot act on the user's actual environment or hold context across interactions.",
    solution: "Built SERA as a local-first agent: an LLM core with speech input and output, vision, and persistent memory, plus a tool layer for acting on the desktop, all coordinated through an event bus with explicit runtime states.",
    howItWorks: "Voice or hotkey activation wakes the assistant. Speech is transcribed and reasoned over by the LLM with memory context, actions run through the tool layer, and responses are spoken back via TTS. A WebSocket gateway streams live state to the interface, where a single persistent 2.5D core character reflects every state of the assistant.",
    features: [
      "Voice and hotkey activation with intelligent fallback across processing systems",
      "Conversational task automation and information retrieval",
      "Persistent memory for personalized, contextual interactions",
      "A single persistent 2.5D core character visualizing the assistant's live state"
    ],
    workflow: [
      { step: "01", title: "Wake & Listen", desc: "Voice or hotkey activation starts the interaction loop" },
      { step: "02", title: "Transcribe", desc: "Speech-to-text converts the request into structured input" },
      { step: "03", title: "Reason & Plan", desc: "LLM reasons over the request with memory context" },
      { step: "04", title: "Execute", desc: "Tool layer carries out the planned actions on the desktop" },
      { step: "05", title: "Respond", desc: "Spoken reply via TTS, synced with the core character's state" }
    ],
    outcome: "A working local-first desktop agent that converses, remembers, and acts on the machine, with a living visual presence instead of a static chat window."
  },
  {
    id: "transformo-docs",
    title: "Transformo Docs - Document Processing Pipeline",
    type: "ai",
    category: "Document AI & Automation",
    tagType: "ai",
    isInternship: false,
    period: "2023 – 2024",
    description: "A modular document processing system with OCR integration, automated preprocessing (noise removal, filtering, enhancement), and document conversion, merging, and splitting workflows.",
    technologies: ["Python", "Flask", "Tesseract OCR", "OpenCV", "PDF Processing"],
    thumbnail: null,
    video: null,
    screenshots: [],
    github: "https://github.com/KESHAVAPANDI/transformoDocs",
    demo: null,
    overview: "Transformo Docs is a modular document processing and transformation system designed to automate end-to-end document workflows. It combines optical character recognition with pre-processing enhancement filters and multi-format document manipulation tools.",
    problem: "Handling diverse scanned document formats, unsearchable PDFs, and batch operations often requires multiple disconnected tools.",
    solution: "Developed an extensible pipeline integrating OCR text recognition with automated conversion, splitting, and merging routines.",
    howItWorks: "Uploaded files are routed through format analyzers. Scanned documents undergo noise removal and contrast enhancement before OCR character recognition extracts editable text streams.",
    features: [
      "OCR-driven optical text extraction from images and scanned documents",
      "Automated document preprocessing pipeline (noise filtering, enhancement)",
      "Batch PDF merging, splitting, and format conversion workflows",
      "Modular Python architecture structured for extensibility"
    ],
    workflow: [
      { step: "01", title: "Document Upload", desc: "Ingestion of PDFs, images, or scanned document files" },
      { step: "02", title: "Format Analysis", desc: "Determining document structure and raster scan characteristics" },
      { step: "03", title: "Preprocessing & OCR", desc: "Noise filtering, contrast enhancement, and OCR extraction" },
      { step: "04", title: "Transformation Engine", desc: "Executing merge, split, or format conversion routines" },
      { step: "05", title: "Export Result", desc: "Delivering searchable, transformed document artifact" }
    ],
    outcome: "Eliminated repetitive manual document conversion and accelerated digitized text extraction."
  },
  {
    id: "speaker-id",
    title: "Speaker Identification System",
    type: "ai",
    category: "Audio AI & Biometric Recognition",
    tagType: "ai",
    isInternship: false,
    description: "A machine learning voice biometric system that extracts acoustic Mel-frequency spectral signatures (MFCCs) to authenticate and classify speaker identity.",
    technologies: ["Python", "Librosa", "Scikit-learn", "Audio DSP", "NumPy", "MFCC"],
    thumbnail: null,
    video: null,
    screenshots: [],
    github: "https://github.com/KESHAVAPANDI/Speaker-Identification-System",
    demo: null,
    overview: "Voice biometrics provide a non-intrusive modality for user authentication. This system implements digital audio signal processing routines to extract vocal tract characteristics (MFCCs, spectral roll-off, chroma) and trains classification models to identify registered individuals from short audio samples.",
    problem: "Accurately identifying individuals from voice recordings across varying microphone qualities and background acoustic environments.",
    solution: "Constructed an end-to-end signal processing pipeline utilizing Mel-Frequency Cepstral Coefficients (MFCCs) and statistical distance metrics to generate speaker identity embeddings.",
    howItWorks: "Raw audio wave streams undergo pre-emphasis, framing, Hamming windowing, and Fast Fourier Transform (FFT) before being mapped onto the Mel filter bank. Feature vectors are compared against enrolled profiles via classification algorithms.",
    features: [
      "Acoustic feature extraction (MFCC coefficients, delta, and delta-delta)",
      "Audio preprocessing including silence trimming and amplitude normalization",
      "Enrolled speaker profile database with biometric distance scoring",
      "Real-time sample classification and identity verification"
    ],
    workflow: [
      { step: "01", title: "Audio Ingestion", desc: "Raw WAV audio input and sampling rate standardization" },
      { step: "02", title: "Signal Pre-emphasis", desc: "High-frequency boost and silence threshold trimming" },
      { step: "03", title: "MFCC Extraction", desc: "FFT, Mel filter bank, and DCT coefficient generation" },
      { step: "04", title: "Embedding Match", desc: "Statistical classifier compares vector against enrolled profiles" },
      { step: "05", title: "Identity Verdict", desc: "Authentication verdict and confidence score output" }
    ],
    outcome: "Established reliable biometric voice authentication and speaker classification on multi-speaker datasets."
  },
  {
    id: "bioactivity-ai",
    title: "Bioactivity Intelligence Knowledge Graph",
    type: "ai",
    category: "AI Knowledge Graphs & Bioinformatics",
    tagType: "ai",
    isInternship: false,
    description: "An intelligent biomedical knowledge network mapping chemical compound bioactivities, molecular structures, and biological target interactions.",
    technologies: ["TypeScript", "Python", "Knowledge Graphs", "REST APIs", "Data Modeling"],
    thumbnail: null,
    video: null,
    screenshots: [],
    github: "https://github.com/KESHAVAPANDI/bioactivity-intelligence",
    demo: null,
    overview: "Understanding the complex relationships between chemical compounds, assays, and biological target proteins is vital for biomedical discovery. This project structures bioactivity datasets into a navigable, queryable graph network with entity-relation bindings.",
    problem: "Biomedical datasets are often siloed in flat tabular formats, obscuring multi-hop relationships between drug candidates and biological receptors.",
    solution: "Engineered a graph-relational intelligence platform connecting chemical compound properties, bioactivity assays (IC50, Ki), and protein targets into an interactive knowledge model.",
    howItWorks: "Data ingestion scripts parse compound identifiers and assay metrics, map ontologies into node/edge graph schemas, and provide query endpoints for discovering multi-target affinities.",
    features: [
      "Entity-relation modeling for chemical compounds, targets, and assays",
      "Multi-dimensional bioactivity query and relationship traversal",
      "Interactive data visualization interface for pathway exploration",
      "Clean TypeScript architecture with structured type definitions"
    ],
    workflow: [
      { step: "01", title: "Bioactivity Data Ingestion", desc: "Parsing chemical entities, SMILES, and target assays" },
      { step: "02", title: "Entity-Relation Mapping", desc: "Structuring nodes (compounds/proteins) and edges (affinities)" },
      { step: "03", title: "Graph Construction", desc: "Building the connected knowledge representation model" },
      { step: "04", title: "Query & Traversal Engine", desc: "Executing relational queries for target interaction discovery" },
      { step: "05", title: "Intelligence UI", desc: "Visual display of compound-target interaction pathways" }
    ],
    outcome: "Structured complex bio-molecular relationship data into an intuitive, queryable intelligence platform."
  },

  // ==========================================
  // 2. OTHER PROJECTS (SOFTWARE & WEB DEVELOPMENT)
  // ==========================================
  {
    id: "scrapeflow",
    title: "ScrapeFlow — Web Data Synchronization Platform",
    type: "other",
    category: "Full-Stack Platform & Web Intelligence",
    tagType: "web",
    isInternship: false,
    period: "2026",
    description: "Enterprise-grade web data synchronization and monitoring platform that turns raw scrapes into continuous relational intelligence — SSRF-safe ingestion, hierarchical extraction with Playwright fallback, field-level change classification, canonical entity resolution, and HMAC-signed webhook alerts.",
    technologies: ["Python", "FastAPI", "Next.js", "TypeScript", "PostgreSQL", "Playwright"],
    thumbnail: null,
    video: null,
    screenshots: [],
    github: "https://github.com/KESHAVAPANDI/ScrapeFlow",
    demo: null,
    overview: "ScrapeFlow is an enterprise-grade web data synchronization and monitoring platform. It bridges raw scrapes with continuous relational intelligence: SSRF-protected safe ingestion that resolves and pins IPs before connecting (filtering private, cloud metadata, and loopback ranges), hierarchical extraction with automatic schema discovery from JSON-LD, OpenGraph, HTML tables, and CSS/XPath (with a Playwright browser fallback), continuous historical lineage with gzip-compressed raw snapshots, and non-destructive reprocessing of historical scrapes against improved extraction schemas.",
    problem: "Traditional web scrapers treat pages as one-off data dumps. When a target page alters its prices, stock levels, or layout, teams are left with broken scripts, silent data corruption, or duplicate unlinked records.",
    solution: "Built a Dockerized full-stack platform (FastAPI backend, Next.js frontend, PostgreSQL, Redis) that ingests safely, extracts hierarchically with schema auto-discovery, versions every observation, classifies field-level changes, resolves multi-source observations into canonical entities, and dispatches proactive alerts.",
    howItWorks: "Targets are fetched through an SSRF guard that resolves and pins IPs before connecting. The extraction engine auto-discovers schemas from JSON-LD, OpenGraph, tables, or CSS/XPath selectors, falling back to a Playwright browser for dynamic pages. Observations are validated, normalized, and versioned; incoming data is classified field-by-field as ADDED, UPDATED, UNCHANGED, REMOVED, or CONFLICT with precise percentage and absolute deltas. Multi-source observations aggregate into canonical entities (e.g. comparing product prices across Amazon, Flipkart, and brand stores), and threshold, stock, or health-score triggers dispatch HMAC-SHA256 signed webhooks.",
    features: [
      "SSRF-protected safe ingestion with IP pinning and private/cloud-metadata range filtering",
      "Hierarchical extraction auto-discovery (JSON-LD, OpenGraph, tables, CSS/XPath) with Playwright fallback",
      "Field-level synchronization classification (ADDED / UPDATED / UNCHANGED / REMOVED / CONFLICT) with precise deltas",
      "Multi-source canonical entities, e.g. unified cross-store product price comparison",
      "Proactive alerts with HMAC-SHA256 signed webhook dispatch",
      "Non-destructive historical reprocessing against improved extraction schemas",
      "Dockerized FastAPI + Next.js 15 stack with PostgreSQL, Redis, and CI"
    ],
    workflow: [
      { step: "01", title: "Safe Ingestion", desc: "SSRF guard resolves and pins IPs, filtering unsafe ranges" },
      { step: "02", title: "Extraction & Auto-Discovery", desc: "Schema discovery from JSON-LD, OpenGraph, tables, or selectors" },
      { step: "03", title: "Validation & Versioning", desc: "Normalization with explicit schema and extractor versions" },
      { step: "04", title: "Sync Classification", desc: "Field-level diffing into ADDED, UPDATED, UNCHANGED, REMOVED, CONFLICT" },
      { step: "05", title: "Canonical Entities & Alerts", desc: "Multi-source entity resolution with signed webhook notifications" }
    ],
    outcome: "Turned fragile one-off scrapers into a continuously synchronized, auditable web intelligence platform with full historical lineage."
  },
  {
    id: "oxyher-ecommerce",
    title: "Oxyher",
    type: "other",
    category: "Full-Stack Web & E-Commerce",
    tagType: "web",
    isInternship: true,
    organization: "Oxyher",
    certificate: { pdf: "assets/certifications/internship-certificate-oxyher.pdf" },
    period: "2024 – 2025",
    description: "A full-stack e-commerce platform offering intimate hygiene products tailored for women, built with privacy-first user workflows and dynamic catalog management.",
    technologies: ["Node.js", "Express", "MongoDB", "JavaScript", "HTML5", "CSS3"],
    thumbnail: null,
    video: null,
    screenshots: [],
    github: null,
    sourceUrl: null,
    demo: "https://oxyher.com/",
    overview: "Oxyher is a full-stack digital storefront created to provide a comfortable, discreet, and reliable purchasing experience for women's personal hygiene products. Built on a Node.js and MongoDB foundation, it manages product inventories, categories, user carts, and checkout flows.",
    problem: "Creating an accessible, discreet, and high-performance shopping interface tailored specifically for personal hygiene essentials.",
    solution: "Developed a full-stack architecture featuring a responsive web frontend, secure REST API endpoints, and a flexible MongoDB document store.",
    howItWorks: "The client frontend communicates with Express route handlers to fetch categorized product catalogs, manage session carts in state, and store order documents in MongoDB.",
    features: [
      "Dynamic product catalog with category and price filtering",
      "Real-time shopping cart state management",
      "Discreet and streamlined checkout flow",
      "RESTful API backend with MongoDB database integration"
    ],
    workflow: [
      { step: "01", title: "Catalog Browsing", desc: "User explores filtered categories and product details" },
      { step: "02", title: "Cart State", desc: "Items added to dynamic local/session cart" },
      { step: "03", title: "API Order Request", desc: "Express REST controller validates cart payloads" },
      { step: "04", title: "Database Persistence", desc: "MongoDB records order transaction details" },
      { step: "05", title: "Confirmation", desc: "Order confirmation and summary presented to user" }
    ],
    outcome: "Built a fully functional, user-centric e-commerce storefront tailored for intimate wellness products."
  },
  {
    id: "hostel-management",
    title: "Hostel Management System",
    type: "other",
    category: "Management Systems & Web Automation",
    tagType: "web",
    isInternship: false,
    period: "2023 – 2024",
    description: "A comprehensive hostel administration system automating room allocations, digital gatepass issuance, meal token reservations, and student grievance tracking.",
    technologies: ["PHP", "MySQL", "JavaScript", "HTML5", "CSS3"],
    thumbnail: null,
    video: null,
    screenshots: [],
    github: null,
    demo: null,
    overview: "Built as a Hackathon Project (2023 - 2024), this system replaces manual paper logbooks for gatepasses, room occupancy, meal tokens, and complaints with a unified web application.",
    problem: "Manual paper-based hostel logs lead to misplaced gate passes, inefficient complaint resolution, and uncoordinated room tracking.",
    solution: "Designed a centralized relational database and PHP web application with separate student and administrator role interfaces.",
    howItWorks: "Students submit gate pass requests or meal token bookings through their dashboard. Administrators approve or monitor passes in real-time, with all records tracked in MySQL.",
    features: [
      "Digital student gate pass request and warden approval workflow",
      "Meal token booking and daily mess reservation tracking",
      "Room allocation management and vacancy monitoring",
      "Grievance and maintenance request submission and tracking"
    ],
    workflow: [
      { step: "01", title: "Role Login", desc: "Secure role-based authentication (Student / Warden / Admin)" },
      { step: "02", title: "Request Submission", desc: "Student applies for digital gate pass or meal token" },
      { step: "03", title: "Warden Review", desc: "Administrator validates request on real-time management board" },
      { step: "04", title: "MySQL Transaction", desc: "Database updates pass status, timestamp, and room logs" },
      { step: "05", title: "Digital Pass Generation", desc: "Digital verification pass generated with valid status" }
    ],
    outcome: "Eliminated paper logs and streamlined daily administrative tasks for hostel management."
  },
  {
    id: "petpair",
    title: "PetPair",
    type: "other",
    category: "Modern Web Application",
    tagType: "web",
    isInternship: false,
    description: "A responsive pet matching and adoption web platform connecting prospective pet owners with animal shelters and pet listings.",
    technologies: ["TypeScript", "Next.js", "React", "CSS3", "Vercel"],
    thumbnail: null,
    video: null,
    screenshots: [],
    github: null,
    demo: "https://peto-alpha.vercel.app/",
    overview: "PetPair is a modern frontend application designed to simplify the pet adoption process. It offers intuitive filtering based on animal temperament, age, breed, and location, providing an engaging browsing experience.",
    problem: "Finding suitable pets for adoption is often cumbersome across outdated, unorganized rescue websites.",
    solution: "Built a responsive, modern web interface with reactive filtering and clean card components for pet profiles.",
    howItWorks: "The application renders responsive pet profile cards with detailed traits, health status, and adoption contact links, deployed globally on Vercel.",
    features: [
      "Interactive pet profile discovery cards",
      "Dynamic filtering by species, age, size, and personality traits",
      "Clean responsive design optimized for mobile and desktop screens",
      "Live production deployment on Vercel"
    ],
    workflow: [
      { step: "01", title: "User Search", desc: "User specifies pet preference filters (breed, age, energy level)" },
      { step: "02", title: "Reactive Filter Engine", desc: "Client-side state filters matching candidate profiles" },
      { step: "03", title: "Profile Card Render", desc: "Displays visual badges, temperament tags, and bio details" },
      { step: "04", title: "Inquiry Connection", desc: "Direct adoption inquiry connection with rescue contact" }
    ],
    outcome: "Launched live adoption platform offering an intuitive, modern pet discovery interface."
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = projectsData;
}
