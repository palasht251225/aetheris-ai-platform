import { AIContentTemplate, CloudinaryAsset, GenerationHistoryItem, UserSubscription } from "@/types";

export const CONTENT_TEMPLATES: AIContentTemplate[] = [
  {
    id: "blog-article",
    name: "Full Blog Post Writer",
    description: "Generate structured, SEO-optimized articles with engaging intros, H2/H3 headings, and key takeaways.",
    category: "text",
    iconName: "FileText",
    costCredits: 5,
    systemPrompt: "You are a world-class technical and marketing writer. Create an in-depth, insightful, and readable blog article.",
    fields: [
      {
        name: "topic",
        label: "Article Topic or Title",
        placeholder: "e.g. How Edge Computing and AI Are Transforming Web Development",
        type: "text",
        required: true,
      },
      {
        name: "keywords",
        label: "Primary SEO Keywords",
        placeholder: "e.g. Next.js, Cloudinary, Edge functions, AI SaaS",
        type: "text",
        required: false,
      },
      {
        name: "tone",
        label: "Writing Tone",
        placeholder: "Informative & Engaging",
        type: "select",
        options: ["Informative & Authoritative", "Conversational & Friendly", "Bold & Visionary", "Executive & Professional"],
        defaultValue: "Informative & Authoritative",
      },
      {
        name: "targetAudience",
        label: "Target Audience",
        placeholder: "e.g. Software engineers, Tech Founders, Product Managers",
        type: "text",
        required: false,
        defaultValue: "Tech professionals and entrepreneurs",
      },
    ],
  },
  {
    id: "linkedin-post",
    name: "Viral Social & LinkedIn Post",
    description: "Transform ideas into high-engagement hooks, bullet-point storytelling, and clear call-to-actions.",
    category: "marketing",
    iconName: "Share2",
    costCredits: 2,
    systemPrompt: "You are a master of personal branding and viral LinkedIn / X copywriting. Craft hooks that stop the scroll and build trust.",
    fields: [
      {
        name: "topic",
        label: "What milestone, lesson, or opinion are you sharing?",
        placeholder: "e.g. Shipped our AI platform in 48 hours using Next.js and Cloudinary",
        type: "textarea",
        required: true,
      },
      {
        name: "style",
        label: "Format & Structure",
        placeholder: "Story + Lessons",
        type: "select",
        options: ["Story + 3 Key Lessons", "Contrarian Tech Opinion", "How-To Step by Step", "Celebration / Milestone"],
        defaultValue: "Story + 3 Key Lessons",
      },
      {
        name: "callToAction",
        label: "Call to Action (CTA)",
        placeholder: "e.g. Comment 'AI' below for the architectural breakdown",
        type: "text",
        required: false,
      },
    ],
  },
  {
    id: "product-description",
    name: "E-Commerce Product Copy",
    description: "Benefit-driven, sensory descriptions that overcome objections and drive conversions.",
    category: "marketing",
    iconName: "ShoppingBag",
    costCredits: 3,
    systemPrompt: "You are an elite direct-response e-commerce copywriter. Emphasize emotional benefits, technical specs, and FOMO.",
    fields: [
      {
        name: "productName",
        label: "Product Name",
        placeholder: "e.g. Lumina Cloud Noise-Cancelling Headphones",
        type: "text",
        required: true,
      },
      {
        name: "features",
        label: "Key Features & Specs",
        placeholder: "40hr battery, active noise cancellation, lightweight titanium frame, bluetooth 5.3",
        type: "textarea",
        required: true,
      },
      {
        name: "targetCustomer",
        label: "Ideal Customer Profile",
        placeholder: "Remote workers, audiophiles, frequent flyers",
        type: "text",
        required: false,
      },
    ],
  },
  {
    id: "code-assistant",
    name: "Code Architect & Explainer",
    description: "Explain complex algorithms, review code for security/performance, and refactor code cleanly.",
    category: "code",
    iconName: "Code2",
    costCredits: 4,
    systemPrompt: "You are a Principal Software Engineer. Provide clean, idiomatic code, explain architectural decisions, and highlight edge cases.",
    fields: [
      {
        name: "language",
        label: "Programming Language / Framework",
        placeholder: "TypeScript / Next.js",
        type: "select",
        options: ["TypeScript / Next.js", "Python", "React", "Node.js / Express", "Go", "SQL"],
        defaultValue: "TypeScript / Next.js",
      },
      {
        name: "task",
        label: "Goal or Problem to Solve",
        placeholder: "e.g. Implement a rate-limited Cloudinary upload endpoint in Next.js App Router with retry logic",
        type: "textarea",
        required: true,
      },
      {
        name: "existingCode",
        label: "Existing Code (Optional)",
        placeholder: "Paste code snippet to refactor or review...",
        type: "textarea",
        required: false,
      },
    ],
  },
  {
    id: "cold-email",
    name: "High-Response Cold Email",
    description: "Personalized B2B outreach with crisp subject lines, relevant value props, and frictionless asks.",
    category: "marketing",
    iconName: "Mail",
    costCredits: 2,
    systemPrompt: "You are an expert sales strategist. Write short, punchy cold emails (< 120 words) that feel genuinely 1-on-1.",
    fields: [
      {
        name: "recipientRole",
        label: "Prospect Title / Company Type",
        placeholder: "VP of Engineering at mid-stage SaaS companies",
        type: "text",
        required: true,
      },
      {
        name: "valueProp",
        label: "Core Value Proposition",
        placeholder: "Reduce image CDN costs and accelerate web rendering by 40% with automated AI optimization",
        type: "textarea",
        required: true,
      },
      {
        name: "offer",
        label: "No-Risk Next Step",
        placeholder: "10-minute audit or quick Loom video preview",
        type: "text",
        defaultValue: "Quick 10-minute preview call",
      },
    ],
  },
  {
    id: "seo-metadata",
    name: "SEO Meta Tags & Schema Generator",
    description: "Generate click-worthy title tags, meta descriptions, and OpenGraph social preview tags.",
    category: "text",
    iconName: "Search",
    costCredits: 2,
    systemPrompt: "You are an SEO specialist. Optimize strictly for character limits (Title < 60 chars, Description < 160 chars) and high CTR.",
    fields: [
      {
        name: "pageTopic",
        label: "Page Content / Product Summary",
        placeholder: "Next-gen AI Image optimization and SaaS content suite",
        type: "textarea",
        required: true,
      },
      {
        name: "targetKeyword",
        label: "Primary Keyword",
        placeholder: "AI SaaS platform Next.js",
        type: "text",
        required: true,
      },
    ],
  },
];

export const INITIAL_USER_SUBSCRIPTION: UserSubscription = {
  plan: "Free",
  creditsRemaining: 85,
  creditsTotal: 100,
  monthlyRenewalDate: "Dec 24, 2026",
  activeFeatures: [
    "Gemini LLM Text Generation",
    "Cloudinary Cloud Image CDN",
    "Smart Image Transformations",
    "Up to 100 Monthly Generations",
    "Standard Support",
  ],
};

export const INITIAL_CLOUDINARY_ASSETS: CloudinaryAsset[] = [
  {
    id: "asset-1",
    publicId: "samples/balloons",
    secureUrl: "https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg",
    thumbnailUrl: "https://res.cloudinary.com/demo/image/upload/c_thumb,w_300,h_200/sample.jpg",
    format: "jpg",
    width: 864,
    height: 576,
    bytes: 147820,
    createdAt: "2026-11-20T10:30:00Z",
    caption: "Vibrant hot air balloons soaring over desert landscape at sunrise.",
    tags: ["travel", "balloons", "landscape", "adventure"],
    aiDescription: "A scenic morning shot featuring multiple colorful hot air balloons ascending over rolling hills and golden morning light.",
    appliedTransformations: ["f_auto", "q_auto"],
  },
  {
    id: "asset-2",
    publicId: "samples/fashion",
    secureUrl: "https://res.cloudinary.com/demo/image/upload/v1312461204/fashion.jpg",
    thumbnailUrl: "https://res.cloudinary.com/demo/image/upload/c_thumb,w_300,h_200/fashion.jpg",
    format: "jpg",
    width: 600,
    height: 400,
    bytes: 92450,
    createdAt: "2026-11-22T14:15:00Z",
    caption: "Modern urban streetwear editorial model shot.",
    tags: ["fashion", "editorial", "urban", "lifestyle"],
    aiDescription: "Portrait photography demonstrating shallow depth of field, sharp subject contrast, and contemporary streetwear apparel.",
    appliedTransformations: ["c_fill,g_face,w_600,h_400", "f_auto"],
  },
  {
    id: "asset-3",
    publicId: "samples/food/dessert",
    secureUrl: "https://res.cloudinary.com/demo/image/upload/v1312461204/dessert.jpg",
    thumbnailUrl: "https://res.cloudinary.com/demo/image/upload/c_thumb,w_300,h_200/dessert.jpg",
    format: "jpg",
    width: 720,
    height: 480,
    bytes: 118400,
    createdAt: "2026-11-23T09:45:00Z",
    caption: "Artisanal strawberry dessert plating with fresh mint garnish.",
    tags: ["food", "dessert", "culinary", "restaurant"],
    aiDescription: "Macro gastronomic photography highlighting rich texture, glossy glaze, and balanced food styling for fine dining marketing.",
    appliedTransformations: ["e_enhance", "f_auto,q_auto"],
  },
];

export const INITIAL_GENERATIONS: GenerationHistoryItem[] = [
  {
    id: "gen-1",
    title: "Mastering Next.js 14 and Cloudinary Architecture",
    templateId: "blog-article",
    category: "text",
    prompt: "How Edge Computing and AI Are Transforming Web Development",
    content: `# The Next Frontier: Edge Computing, AI, and Cloudinary Media Pipelines

Web application architecture is undergoing its most radical transformation since the transition from static hosting to serverless. Today, applications are not merely passive responders; they are dynamic, intelligent agents capable of synthesizing content, tailoring assets in real time, and delivering sub-100ms experiences worldwide.

## 1. The Death of Monolithic Media Processing
Traditionally, uploading user media involved spinning up compute-heavy worker nodes (e.g. FFmpeg or Sharp instances) that clogged internal backends. By offloading media ingestion, compression, and dynamic transformations to Cloudinary's global CDN:
- **Instant Latency Gains**: Images and videos are resized, cropped via AI saliency, and converted to modern formats (AVIF, WebP) on the fly.
- **Predictable Serverless Costs**: Compute moves to the edge without server maintenance overhead.

## 2. Integrating LLM Orchestration in Next.js App Router
With Next.js App Router, combining streaming Route Handlers with Gemini LLM APIs creates fluid conversational and generative user experiences. Users no longer wait 8 seconds for static HTTP timeouts—responses stream tokens instantly to the client.

## Key Takeaways
1. Offload media transformation to specialized edge pipelines like Cloudinary.
2. Stream LLM tokens to maintain responsiveness.
3. Protect credit balances with atomic transactional checks.`,
    createdAt: "2026-11-23T16:20:00Z",
    creditsCost: 5,
  },
  {
    id: "gen-2",
    title: "Viral Launch Post: Full-Stack AI Platform",
    templateId: "linkedin-post",
    category: "marketing",
    prompt: "Shipped our AI platform in 48 hours using Next.js and Cloudinary",
    content: `Most SaaS apps spend 6 months building infrastructure before talking to a single customer.

We took a different approach:
We shipped a full-stack AI platform in 48 hours.

Here is the exact tech stack:
• Next.js App Router (React Server Components + Streaming API routes)
• Gemini LLM APIs for contextual copy and vision intelligence
• Cloudinary for zero-compute edge image hosting & smart transformations
• Tailwind CSS for responsive dark-mode UI

The secret? Don't reinvent pipelines. Combine the best cloud primitives.

What's your biggest bottleneck when shipping AI products? Drop your thoughts below! 👇`,
    createdAt: "2026-11-23T18:40:00Z",
    creditsCost: 2,
  },
];
