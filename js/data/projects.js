/**
 * PROJECTS DATA REPOSITORY
 * Single source of truth for all projects, case studies, and architecture workflows.
 * Each project uses its dedicated repository URL. If no dedicated repo exists, github is null.
 */

const projectsData = [
  // ==========================================
  // 1. AI PROJECTS (PRIMARY FOCUS)
  // ==========================================
  {
    id: "rbg-ocr",
    title: "RBG AI - OCR Preprocessing",
    type: "ai",
    category: "Computer Vision & AI Preprocessing",
    tagType: "cv",
    description: "An AI computer vision module that cleans and enhances bank cheque images and document scans, eliminating background artifacts to optimize downstream OCR character recognition.",
    technologies: ["Python", "OpenCV", "NumPy", "Computer Vision", "Adaptive Thresholding"],
    thumbnail: null,
    video: null,
    screenshots: [],
    github: "https://github.com/KESHAVAPANDI/Internship",
    demo: null,
    overview: "Document processing pipelines frequently fail when processing real-world financial documents, receipts, and bank cheques due to varying lighting, security background patterns, watermarks, and noise. RBG AI provides an automated computer vision preprocessing pipeline specifically engineered to strip noise and isolate critical text contours before passing images to OCR engines.",
    problem: "Raw bank cheques contain complex security background patterns, stamps, and signatures that create heavy OCR character misinterpretation and low recognition confidence scores.",
    solution: "Engineered a robust multi-stage OpenCV preprocessing filter combining adaptive Gaussian thresholding, morphological noise removal, contrast normalization, and contour segmentation to output clean binarized text masks.",
    howItWorks: "The pipeline ingests raw image feeds, converts color space to grayscale, applies median blur to suppress high-frequency speckle noise, executes Otsu and adaptive thresholding to separate foreground text from textured backgrounds, and aligns detected text bounding boxes.",
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
    description: "An optimized, localized text-to-image synthesis system leveraging Latent Consistency Models (LCM-LoRA) for high-speed, high-fidelity neural image synthesis.",
    technologies: ["Stable Diffusion", "LCM-LoRA", "PyTorch", "Diffusers", "Python", "CUDA"],
    thumbnail: null,
    video: null,
    screenshots: [],
    github: null, // No dedicated repository
    demo: null,
    overview: "Standard diffusion models require 25 to 50 denoising iterations, demanding significant compute time. This project implements an accelerated local inference pipeline using Latent Consistency Models and Low-Rank Adaptation (LCM-LoRA) to generate high-resolution visual assets in as few as 4-8 inference steps.",
    problem: "Standard text-to-image diffusion models exhibit high compute latency on local hardware, making interactive creative prototyping sluggish.",
    solution: "Integrated LCM-LoRA adapters into a PyTorch Stable Diffusion pipeline, enabling single-step to few-step latent trajectory prediction without sacrificing aesthetic coherence.",
    howItWorks: "Text prompts are tokenized and encoded via the CLIP text model. The latent space is seeded with Gaussian noise, and the LCM-LoRA UNet model predicts the final latent representation in 4–8 steps before the VAE decoder renders the RGB canvas.",
    features: [
      "Sub-second to few-step high-resolution image synthesis",
      "LoRA adapter integration for modular style tuning",
      "Prompt weighting and negative prompt guidance controls",
      "Memory-efficient cross-attention optimizations for local GPU execution"
    ],
    workflow: [
      { step: "01", title: "Prompt Tokenization", desc: "CLIP text encoder extracts contextual embeddings" },
      { step: "02", title: "Latent Seeding", desc: "Random Gaussian noise initialized in latent space" },
      { step: "03", title: "LCM-LoRA Denoising", desc: "4 to 8 accelerated consistency model sampling steps" },
      { step: "04", title: "VAE Decoding", desc: "Latent tensor decoded into high-resolution RGB image" },
      { step: "05", title: "Output Rendering", desc: "Final synthesized image rendered with metadata tags" }
    ],
    outcome: "Achieved substantial reduction in inference computation time while maintaining sharp visual quality."
  },
  {
    id: "speaker-id",
    title: "Speaker Identification System",
    type: "ai",
    category: "Audio AI & Biometric Recognition",
    tagType: "ai",
    description: "A machine learning voice biometric system that extracts acoustic Mel-frequency spectral signatures to authenticate and classify speaker identity.",
    technologies: ["Python", "Librosa", "Scikit-learn", "Audio DSP", "NumPy", "MFCC"],
    thumbnail: null,
    video: null,
    screenshots: [],
    github: "https://github.com/KESHAVAPANDI/Speaker-Identification-System",
    demo: null,
    overview: "Voice biometrics provide a non-intrusive, natural modality for user authentication. This system implements digital audio signal processing routines to extract vocal tract characteristics (MFCCs, spectral roll-off, chroma) and trains classification models to identify registered individuals from short audio samples.",
    problem: "Accurately identifying individuals from voice recordings across varying microphone qualities and background acoustic environments.",
    solution: "Constructed an end-to-end signal processing pipeline utilizing Mel-Frequency Cepstral Coefficients (MFCCs) and statistical distance metrics to generate speaker identity embeddings.",
    howItWorks: "Raw audio wave streams undergo pre-emphasis, framing, Hamming windowing, and Fast Fourier Transform (FFT) before being mapped onto the Mel filter bank. Statistical feature vectors are compared against enrolled speaker profiles via classification algorithms.",
    features: [
      "Acoustic feature extraction (13-40 MFCC coefficients, delta, and delta-delta)",
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
    outcome: "Established reliable biometric voice authentication and speaker classification on multi-speaker audio datasets."
  },
  {
    id: "bioactivity-ai",
    title: "Bioactivity Intelligence Knowledge Graph",
    type: "ai",
    category: "AI Knowledge Graphs & Bioinformatics",
    tagType: "ai",
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
  {
    id: "transformo-docs",
    title: "Transformo Docs",
    type: "ai",
    category: "Document AI & Automation Suite",
    tagType: "ai",
    description: "An intelligent document transformation system integrating OCR text extraction, document merging, conversion, and splitting capabilities.",
    technologies: ["Python", "Flask", "Tesseract OCR", "Tkinter", "PDF Processing"],
    thumbnail: null,
    video: null,
    screenshots: [],
    github: null, // No dedicated repository
    demo: null,
    overview: "Transformo Docs is a dual-interface (Web API + GUI) document processing utility designed to streamline document workflows. It combines optical character recognition for digitizing scanned documents with robust document manipulation utilities.",
    problem: "Handling diverse document formats, extracting text from unsearchable PDFs, and batch document manipulation often requires disjointed tools.",
    solution: "Created an integrated document processing hub combining OCR text recognition with automated conversion, splitting, and merging routines.",
    howItWorks: "Uploaded documents are routed through format handlers. For scanned PDFs and images, the OCR module detects text regions and generates searchable text streams, while the document engine performs file operations.",
    features: [
      "OCR-driven optical text extraction from images and scanned documents",
      "Batch PDF merging, splitting, and page-level reorganization",
      "Format conversion between images, PDFs, and editable text files",
      "Lightweight Flask backend with desktop GUI support"
    ],
    workflow: [
      { step: "01", title: "Document Upload", desc: "Ingestion of PDFs, images, or scanned document files" },
      { step: "02", title: "Format Analysis", desc: "Determining whether file is digital text or raster scan" },
      { step: "03", title: "OCR Processing", desc: "Character recognition and spatial text extraction" },
      { step: "04", title: "Transformation Engine", desc: "Executing merge, split, or format conversion routines" },
      { step: "05", title: "Export Result", desc: "Delivering searchable, transformed document artifact" }
    ],
    outcome: "Provided a unified document transformation tool eliminating repetitive manual document reformatting."
  },

  // ==========================================
  // 2. OTHER PROJECTS (SOFTWARE & WEB DEVELOPMENT)
  // ==========================================
  {
    id: "oxyher-ecommerce",
    title: "OXYHER E-Commerce",
    type: "other",
    category: "Full-Stack Web & E-Commerce",
    tagType: "web",
    description: "A full-stack e-commerce web platform for women's intimate hygiene and wellness products, built with privacy-first user workflows and dynamic catalog management.",
    technologies: ["Node.js", "Express", "MongoDB", "JavaScript", "HTML5", "CSS3"],
    thumbnail: null,
    video: null,
    screenshots: [],
    github: "https://github.com/KESHAVAPANDI/product",
    demo: null,
    overview: "OXYHER is a full-stack digital storefront created to provide a comfortable, discreet, and reliable purchasing experience for women's personal hygiene products. Built on a Node.js and MongoDB foundation, it manages product inventories, categories, user carts, and checkout flows.",
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
    description: "A comprehensive hostel administration web portal automating room allocations, digital gate pass issuance, meal token reservations, and student grievance tracking.",
    technologies: ["PHP", "MySQL", "JavaScript", "HTML5", "CSS3"],
    thumbnail: null,
    video: null,
    screenshots: [],
    github: null, // No dedicated repository
    demo: null,
    overview: "Institutional hostels encounter operational overhead managing physical logbooks for gate passes, room occupancy, meal tokens, and complaints. This system replaces paper records with a unified, role-based web application.",
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
    description: "A responsive pet matching and adoption web platform connecting prospective pet owners with animal shelters and pet listings.",
    technologies: ["TypeScript", "Next.js", "React", "CSS3", "Vercel"],
    thumbnail: null,
    video: null,
    screenshots: [],
    github: "https://github.com/KESHAVAPANDI/petpair",
    demo: "https://petpair-eight.vercel.app",
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
  },
  {
    id: "fastapi-app",
    title: "FastAPI Backend Service",
    type: "other",
    category: "High-Performance Backend & APIs",
    tagType: "web",
    description: "An asynchronous, high-throughput backend API service built with Python and FastAPI, featuring automatic OpenAPI documentation and Pydantic validation.",
    technologies: ["Python", "FastAPI", "Pydantic", "Uvicorn", "RESTful APIs"],
    thumbnail: null,
    video: null,
    screenshots: [],
    github: "https://github.com/KESHAVAPANDI/FastAPIApp",
    demo: null,
    overview: "FastAPI is known for its speed and asynchronous capabilities. This project implements a clean modular backend architecture utilizing asynchronous route handlers, strict data validation with Pydantic models, and auto-generated Swagger documentation.",
    problem: "Building reliable, self-documenting, and type-safe REST APIs for microservices and frontend clients.",
    solution: "Constructed an extensible FastAPI service leveraging Python type annotations for automatic request validation and serialization.",
    howItWorks: "Incoming HTTP requests pass through Pydantic model validators. Asynchronous endpoints execute business logic and return structured JSON responses with appropriate HTTP status codes.",
    features: [
      "Asynchronous request handling with Uvicorn ASGI server",
      "Strict data contract validation using Pydantic schemas",
      "Automatic interactive documentation (Swagger UI & ReDoc)",
      "Modular routing hierarchy and error handling middleware"
    ],
    workflow: [
      { step: "01", title: "HTTP Request", desc: "Client sends REST payload to API endpoint" },
      { step: "02", title: "Pydantic Validation", desc: "Schema parser checks types, constraints, and data integrity" },
      { step: "03", title: "Async Route Execution", desc: "Asynchronous controller processes business logic" },
      { step: "04", title: "JSON Serialization", desc: "Response model serializes structured JSON payload" },
      { step: "05", title: "Client Response", desc: "Status code and validated response returned to client" }
    ],
    outcome: "Established a robust, type-safe API foundation ready for production integration."
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = projectsData;
}
