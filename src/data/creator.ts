export interface ProjectItem {
  title: string;
  category: string;
  year: string;
  objective: string;
  approach: string[];
  results: string[];
  tags: string[];
  highlight?: boolean;
}

export const CREATOR_INFO = {
  name: "Palash Tripathi",
  shortName: "Palash",
  role: "Full-Stack AI/ML Engineer & Systems Developer",
  status: "Open to Opportunities & Collaborations",
  email: "Palashtripathi25@gmail.com",
  phone: "+91-8601167483",
  location: "India",
  github: "https://github.com/palasht251225",
  githubHandle: "palasht251225",
  linkedin: "https://www.linkedin.com/in/palash-tripathi-b4305627a",
  portfolio: "https://nimble-opal-8vmlgd6.tmp.now/",
  avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
  bio: `I am a Computer Science & Engineering (AIML) undergraduate and software engineer passionate about building high-performance full-stack applications. I bridge the gap between machine learning models and production web architectures, orchestrating Large Language Model (LLM) pipelines, training deep learning computer vision systems, and building zero-compute media workflows with Cloudinary.`,
  engineeringPhilosophy: [
    {
      title: "Zero-Compute Edge Offloading",
      description: "Never clog application servers with compute-heavy image transcoding. Offload heavy media processing to specialized CDNs like Cloudinary.",
    },
    {
      title: "Streaming-First LLM UX",
      description: "Users shouldn't stare at spinners. Deliver tokens progressively with server-sent events or streaming route handlers.",
    },
    {
      title: "Defensive Credit Metering",
      description: "Protect compute margins with atomic credit validation before triggering model inference.",
    },
    {
      title: "Real Usability Over AI Hype",
      description: "An AI product is only as good as the problem it solves. Fast, intuitive interfaces always beat complex jargon.",
    },
  ],
  education: [
    {
      degree: "B.Tech in Computer Science & Engineering (AI/ML)",
      institution: "Galgotias College of Engineering & Technology",
      period: "2023 — Present",
      details: "Specializing in Machine Learning, Deep Neural Networks, Natural Language Processing, and Cloud Architecture.",
    },
    {
      degree: "CBSE Class XII (Senior Secondary)",
      institution: "Kendriya Vidyalaya IIT Kanpur",
      period: "Completed 2022",
      details: "Strong foundational coursework in Mathematics, Physics, and Computer Science.",
    },
    {
      degree: "CBSE Class X (Secondary)",
      institution: "Kendriya Vidyalaya IIT Kanpur",
      period: "Completed 2020",
      details: "Academic distinction in Science and Mathematics.",
    },
  ],
  skills: {
    ai_ml: [
      "PyTorch",
      "TensorFlow",
      "Scikit-learn",
      "OpenCV",
      "Hugging Face",
      "LLM APIs (Gemini / OpenAI)",
      "Pandas",
      "NumPy",
      "Computer Vision (CNNs)",
    ],
    fullstack_cloud: [
      "Next.js 14 (App Router)",
      "React.js",
      "Node.js",
      "TypeScript",
      "Express.js",
      "Cloudinary CDN",
      "REST APIs",
      "MongoDB / PostgreSQL",
      "Tailwind CSS",
      "Git / GitHub",
    ],
    languages: ["Python", "TypeScript", "JavaScript", "SQL", "C++", "HTML5/CSS3"],
  },
  projects: [
    {
      title: "AI-Powered SaaS Platform",
      category: "Personal Flagship Project",
      year: "2024",
      highlight: true,
      objective: "Architect a full-stack AI SaaS platform integrating Large Language Models and intelligent media pipelines.",
      approach: [
        "Integrated Google Gemini LLM & Vision APIs for streaming generation and structured JSON extraction.",
        "Built responsive web components in Next.js 14 and React.js with serverless Node.js Route Handlers.",
        "Leveraged Cloudinary for dynamic image transformations (g_auto, f_auto, background removal) without server load.",
      ],
      results: [
        "Cut media load times by 40% via edge CDN compression and auto-format delivery (AVIF/WebP).",
        "Sub-second AI inference handling with full cross-device responsiveness and atomic credit verification.",
      ],
      tags: ["Next.js", "React", "Node.js", "Cloudinary", "Gemini LLM", "TypeScript", "Tailwind CSS"],
    },
    {
      title: "AI-Based Centralized Voting System",
      category: "Academic Research Project",
      year: "2024",
      highlight: false,
      objective: "Develop a secure, centralized voting platform utilizing AI monitoring algorithms for tamper-evident election governance.",
      approach: [
        "Designed centralized architecture for voter registration and structured election lifecycle workflows.",
        "Implemented granular Role-Based Access Control (RBAC) across admin and voter ballot modules.",
        "Integrated unsupervised anomaly detection models (Isolation Forests & clustering) to flag irregular voter velocity.",
      ],
      results: [
        "Built a working prototype supporting 100+ test users with encrypted auth flows.",
        "Achieved ~95% accuracy in detecting simulated ballot anomalies.",
      ],
      tags: ["Python", "Machine Learning", "Isolation Forest", "RBAC", "Security"],
    },
    {
      title: "Automatic Plant Disease Recognition System",
      category: "Computer Vision Project",
      year: "2024",
      highlight: false,
      objective: "Engineer an AI computer vision system to identify and classify plant diseases from leaf imagery using Deep Learning.",
      approach: [
        "Preprocessed visual datasets using OpenCV, applying image normalization and tensor transformations.",
        "Trained multiclass Convolutional Neural Networks (CNNs) and transfer learning backbones (ResNet/MobileNet).",
        "Benchmarked precision, recall, and ROC-AUC curves in PyTorch.",
      ],
      results: [
        "Achieved 92% classification accuracy across 1000+ plant leaf images.",
        "Reduced manual diagnosis turnaround to near real-time prediction (~2-3 seconds per leaf image).",
      ],
      tags: ["PyTorch", "OpenCV", "CNN", "ResNet", "Deep Learning"],
    },
    {
      title: "Blockchain-Based Geo-Tagging Platform",
      category: "Systems & Security Project",
      year: "2024",
      highlight: false,
      objective: "Design a decentralized system for immutable, verifiable, and secure geo-tagged digital record storage.",
      approach: [
        "Architected a blockchain-inspired distributed ledger ensuring cryptographic tamper-resistance.",
        "Implemented geolocation tagging pipelines with AI-assisted spatial coordinate validation and SHA-256 hashing.",
      ],
      results: [
        "Simulated tamper-proof storage for 500+ geo-tagged records with sub-second spatial queries.",
      ],
      tags: ["Distributed Systems", "Cryptography", "SHA-256", "Geo-Spatial"],
    },
  ],
  leadership: {
    role: "Chief Secretary — Sponsorship",
    organization: "College Sponsorship Club",
    period: "2023 — Present",
    highlights: [
      "Coordinated corporate sponsorship outreach pipelines and formal communications with brand stakeholders.",
      "Structured multi-tiered sponsorship packages, significantly increasing contact and conversion efficiency.",
      "Secured critical partner support for major college festivals and tech events.",
    ],
  },
};
