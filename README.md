# Aetheris — Next-Gen Multimodal AI & Edge Media Platform

> **Architected & Engineered by Palash Tripathi**
> **Live Demo**: [https://aetheris-suite.vercel.app](https://aetheris-suite.vercel.app)
> **Creator Portfolio**: [https://aetheris-suite.vercel.app/creator](https://aetheris-suite.vercel.app/creator)
> **Integrated Stack: Google Gemini LLM APIs, Next.js 14 (App Router), React 18, Node.js API Routes, and Cloudinary Edge Media Processing.**

[![Next.js](https://img.shields.io/badge/Next.js-14.2-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18.3-blue?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Cloudinary](https://img.shields.io/badge/Cloudinary-Media_CDN-3448C5?logo=cloudinary)](https://cloudinary.com/)
[![Gemini](https://img.shields.io/badge/Google-Gemini_LLM-4285F4?logo=google)](https://aistudio.google.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)

---

## 🌟 Overview

**Aetheris** is an enterprise-grade, full-stack AI SaaS platform that unites high-speed generative text models with dynamic cloud media optimization. Designed to solve real-world problems in digital content creation, e-commerce, and developer tooling, the platform demonstrates seamless integration between modern cloud primitives.

---

## 🏗️ Architectural Overview

```
                                  ┌───────────────────────────────┐
                                  │      Client Web Browser       │
                                  │   (Next.js React 18 UI)       │
                                  └───────────────┬───────────────┘
                                                  │
                                                  ▼
                                  ┌───────────────────────────────┐
                                  │    Next.js 14 App Router      │
                                  │   Node.js Serverless APIs     │
                                  └───────┬───────────────┬───────┘
                                          │               │
                     ┌────────────────────┴──┐         ┌──┴────────────────────┐
                     ▼                       ▼         ▼                       ▼
          ┌─────────────────────┐ ┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐
          │  /api/generate      │ │  /api/chat       │ │  /api/cloudinary │ │  /api/user       │
          │  Text Inference     │ │  Multi-Turn LLM  │ │  Upload & Transf │ │  Credit Metering │
          └──────────┬──────────┘ └────────┬─────────┘ └────────┬─────────┘ └────────┬─────────┘
                     │                     │                    │                    │
                     ▼                     ▼                    ▼                    ▼
          ┌──────────────────────────────────────────┐ ┌────────────────────────────────────────┐
          │      Google Gemini LLM & Vision APIs     │ │       Cloudinary Edge Global CDN       │
          │  (gemini-1.5-flash / gemini-2.0-flash)   │ │  (Smart Saliency Crop, WebP/AVIF, BG)  │
          └──────────────────────────────────────────┘ └────────────────────────────────────────┘
```

---

## 🚀 Key Features

### 1. AI Content & Copywriting Studio (`/dashboard/text-studio`)
- **6+ Specialized Templates**:
  - Full SEO Blog Articles
  - Viral Social Hooks (LinkedIn / X)
  - E-Commerce Product Descriptions
  - Code Architecture & Reviewer
  - High-Converting Cold Email Campaigns
  - SEO Meta Tag & Schema Generator
- **Flexible Controls**: Select tone, target audience, keywords, or programming language.
- **Credit Metering**: Transactional credit checks prevent quota exhaustion.
- **Export & Recall**: One-click clipboard copy, markdown file download, and persistent history.

### 2. Cloudinary Media & Vision Studio (`/dashboard/media-studio`)
- **Direct Cloud Ingestion**: Upload local files or paste remote URLs.
- **Dynamic URL Transformations (Zero Server Compute)**:
  - Smart Aspect Ratios (`1:1`, `16:9`, `4:5`, `9:16`)
  - AI Saliency Focus (`g_auto`, `g_face`, `g_center`)
  - Creative Filters (`enhance`, `grayscale`, `sepia`, `blur`, `vignette`)
  - Modern Format Delivery (`f_auto` delivering AVIF/WebP automatically)
  - Quality Compression (`q_auto` adaptive visual optimization)
  - AI Background Removal (`e_background_removal`)
- **Gemini Multimodal Vision AI**: Analyze images in Cloudinary to extract AI captions, SEO alt-text, tags, and scene descriptions.

### 3. AI Smart Assistant (`/dashboard/chat`)
- Multi-turn conversation with persona switcher (Principal Architect, Copy Strategist, Cloudinary Specialist, Code Auditor).
- Suggested kickoff prompts and markdown code formatting.

### 4. Subscription & Credit Metering (`/dashboard/billing`)
- Tiered subscriptions: **Starter Free** ($0/mo), **Pro Creator** ($29/mo), and **Scale Enterprise** ($99/mo).
- On-demand credit refill packs (+100, +500, +2,000 credits) with celebratory confetti.
- Simulated billing invoices with downloadable receipts.

### 5. API Keys & Local Settings (`/dashboard/settings`)
- Dedicated controls for Gemini API Key and Cloudinary credentials.
- Instant connection test tool.
- Zero-config built-in simulator mode that allows full exploration without mandatory payment keys!

---

## 🛠️ Tech Stack & Libraries

| Technology | Role |
| :--- | :--- |
| **Next.js 14.2** | Full-stack framework with App Router, Server Actions, & Route Handlers |
| **React 18.3** | Component UI library with hooks, context, and client-side transitions |
| **TypeScript 5** | Strict end-to-end typing across models, API contracts, and components |
| **Cloudinary Node SDK** | Image hosting, upload stream processing, and URL transformation generator |
| **@google/generative-ai** | Official Google SDK for Gemini 1.5 Flash text and vision models |
| **Tailwind CSS 3.4** | Utility-first styling with modern dark theme and custom glassmorphism |
| **Lucide React** | Clean, accessible iconography |
| **Canvas Confetti** | Micro-interactions and celebratory UX upon purchases and generations |

---

## 📦 Installation & Setup

### Prerequisites
- Node.js `v18.17+` or `v20+` or `v24+`
- npm

### 1. Navigate to Project
```bash
cd nexus-ai-platform
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Edit `.env.local`:
```env
# Optional: Google Gemini API Key (https://aistudio.google.com/)
GEMINI_API_KEY=your_gemini_api_key

# Optional: Cloudinary Credentials (https://cloudinary.com/)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
```
*(Note: If left blank, NexusAI automatically runs in high-fidelity simulator mode using Cloudinary's public demo cloud, so everything works out of the box!)*

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build for Production
```bash
npm run build
npm run start
```

---

## 📂 Project Structure

```
nexus-ai-platform/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── chat/route.ts              # Gemini multi-turn chat endpoint
│   │   │   ├── cloudinary/
│   │   │   │   ├── transform/route.ts     # URL transformation builder
│   │   │   │   └── upload/route.ts        # Multipart & remote media ingestion
│   │   │   ├── generate/route.ts          # Template-based LLM synthesis
│   │   │   ├── user/credits/route.ts      # Credit refill & subscriptions
│   │   │   └── vision/route.ts            # Multimodal Gemini image analysis
│   │   ├── dashboard/
│   │   │   ├── billing/page.tsx           # Plans & credit checkout
│   │   │   ├── chat/page.tsx              # Interactive conversational assistant
│   │   │   ├── layout.tsx                 # Dashboard shell with sidebar
│   │   │   ├── media-studio/page.tsx      # Cloudinary CDN & Vision studio
│   │   │   ├── page.tsx                   # Overview & architecture metrics
│   │   │   ├── settings/page.tsx          # API keys & preferences
│   │   │   └── text-studio/page.tsx       # AI copywriting & code generator
│   │   ├── globals.css                    # Tailwind & glassmorphism theme
│   │   ├── layout.tsx                     # App root layout with AppProvider
│   │   └── page.tsx                       # High-converting SaaS landing page
│   ├── components/
│   │   ├── Footer.tsx                     # Platform footer
│   │   ├── Header.tsx                     # Dashboard section header
│   │   ├── Navbar.tsx                     # Sticky top navigation with credit pill
│   │   └── Sidebar.tsx                    # Collapsible dashboard sidebar
│   ├── context/
│   │   └── AppContext.tsx                 # Centralized state & localStorage sync
│   ├── lib/
│   │   ├── cloudinary.ts                  # Cloudinary SDK & URL builder
│   │   ├── gemini.ts                      # Gemini SDK & simulation fallbacks
│   │   ├── mockData.ts                    # Templates, presets & initial assets
│   │   └── utils.ts                       # Classnames & formatting helpers
│   └── types/
│       └── index.ts                       # TypeScript interfaces
├── .env.example
├── .env.local
├── next.config.mjs
├── package.json
├── postcss.config.mjs
├── tailwind.config.ts
└── tsconfig.json
```

---

## 🔒 Security & Performance Best Practices

- **Zero API Key Leakage**: LLM and Cloudinary API secrets are isolated in Node.js server Route Handlers and never sent to client bundles.
- **Edge Media Offloading**: Heavy image manipulations (cropping, format conversion, background removal) run on Cloudinary's edge infrastructure rather than clogging server memory.
- **Type Safety**: Full TypeScript strict typing across all API payloads and application state.
- **Atomic Credit Enforcement**: Checks credit balance before dispatching inference requests to protect compute budgets.

---

## 📄 License
MIT License. Created as an enterprise-grade AI SaaS platform.
