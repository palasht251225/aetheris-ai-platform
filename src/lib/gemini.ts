import { GoogleGenerativeAI } from "@google/generative-ai";

export function getGeminiApiKey(customKey?: string): string | null {
  return customKey || process.env.GEMINI_API_KEY || null;
}

export function isGeminiConfigured(customKey?: string): boolean {
  return Boolean(getGeminiApiKey(customKey));
}

/**
 * Text Generation via Gemini API or intelligent context fallback
 */
export async function generateAIText(params: {
  prompt: string;
  systemInstruction?: string;
  customApiKey?: string;
  temperature?: number;
}): Promise<{ text: string; simulated: boolean; model: string }> {
  const apiKey = getGeminiApiKey(params.customApiKey);

  if (apiKey) {
    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        systemInstruction: params.systemInstruction,
        generationConfig: {
          temperature: params.temperature ?? 0.7,
        },
      });

      const result = await model.generateContent(params.prompt);
      const response = await result.response;
      return {
        text: response.text(),
        simulated: false,
        model: "gemini-1.5-flash",
      };
    } catch (error: any) {
      console.warn("Gemini API call failed, falling back to simulated output:", error?.message);
      // Fall through to simulated response
    }
  }

  // Simulated AI response for instant evaluation without requiring a paid key
  const simulatedOutput = generateSimulatedResponse(params.prompt, params.systemInstruction);
  return {
    text: simulatedOutput,
    simulated: true,
    model: "gemini-simulator-v1",
  };
}

/**
 * Multimodal image analysis using Gemini Vision
 */
export async function analyzeImageWithAI(params: {
  imageUrl: string;
  customApiKey?: string;
  prompt?: string;
}): Promise<{ description: string; tags: string[]; caption: string; simulated: boolean }> {
  const apiKey = getGeminiApiKey(params.customApiKey);

  if (apiKey) {
    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      // Fetch image bytes
      const response = await fetch(params.imageUrl);
      const buffer = await response.arrayBuffer();
      const base64 = Buffer.from(buffer).toString("base64");
      const mimeType = response.headers.get("content-type") || "image/jpeg";

      const prompt = params.prompt || 
        "Analyze this image in detail. Return a concise JSON with keys: 'caption' (one catchy sentence), 'tags' (array of 5-8 relevant single-word keywords), and 'description' (a rich 2-3 sentence visual description). Return ONLY raw JSON without markdown formatting.";

      const result = await model.generateContent([
        prompt,
        {
          inlineData: {
            data: base64,
            mimeType,
          },
        },
      ]);

      const text = result.response.text();
      try {
        const cleaned = text.replace(/```json/g, "").replace(/```/g, "").trim();
        const parsed = JSON.parse(cleaned);
        return {
          caption: parsed.caption || "High quality image asset",
          tags: parsed.tags || ["visual", "photography", "digital"],
          description: parsed.description || text,
          simulated: false,
        };
      } catch (parseErr) {
        return {
          caption: text.substring(0, 80) + "...",
          tags: ["image", "media", "ai-vision"],
          description: text,
          simulated: false,
        };
      }
    } catch (err: any) {
      console.warn("Gemini Vision API error, falling back to smart simulation:", err?.message);
    }
  }

  return {
    caption: "High-resolution media asset optimized for web and mobile delivery.",
    tags: ["creative", "visual", "digital-asset", "responsive", "cloudinary", "ai-optimized"],
    description: `Detailed visual breakdown: The uploaded asset exhibits balanced exposure, clear subject framing, and high dynamic range. Perfect for e-commerce, portfolio showcasing, and responsive CDN distribution.`,
    simulated: true,
  };
}

function generateSimulatedResponse(prompt: string, systemInstruction?: string): string {
  const lower = prompt.toLowerCase();

  if (lower.includes("blog") || lower.includes("article")) {
    return `# The Future of Cloud-Native AI Applications

In the rapidly evolving software ecosystem, developers are building more capable systems with less infrastructure. By orchestrating LLM capabilities with modern web frameworks like Next.js and cloud media engines like Cloudinary, teams can deploy resilient, production-ready SaaS platforms in record time.

## 1. Unified Edge Architecture
Instead of managing fragmented worker fleets, modern platforms push computation to edge nodes. Next.js App Router streaming endpoints deliver real-time token feedback, keeping latency under human perceptual thresholds.

## 2. Dynamic Asset Optimization at Scale
High-resolution images and videos are crucial for engagement, but improper compression degrades Core Web Vitals. Cloudinary's intelligent transformations automatically serve modern formats (WebP/AVIF) with adaptive quality algorithms.

## 3. Atomic Credit Management
Sustainable AI SaaS platforms rely on robust credit metering. Each generative invocation deducts credits dynamically, safeguarding margins against runaway usage.

### Key Takeaways
- Decouple AI inference from asset transformation.
- Leverage streaming to minimize perceived latency.
- Protect compute budgets with real-time balance enforcement.`;
  }

  if (lower.includes("linkedin") || lower.includes("post") || lower.includes("social")) {
    return `Most founders spend 6 months building infrastructure before shipping.

We took the opposite path:
Shipped a full-stack AI SaaS platform in 48 hours.

The Architecture Breakdown:
✦ Next.js App Router: Blazing fast server-rendered UI + streaming endpoints
✦ Gemini LLM APIs: Contextual reasoning and generative copy
✦ Cloudinary: Zero-maintenance media CDN and smart AI transformations
✦ Tailwind CSS: Polished dark-mode developer experience

The big insight:
Don't rebuild what world-class cloud platforms have already perfected. Combine them into an intuitive product.

What tech stack are you building your next SaaS with? Drop your thoughts below! 👇`;
  }

  if (lower.includes("product") || lower.includes("ecommerce")) {
    return `### Headline: Engineered for Uncompromising Performance

Experience the ultimate blend of precision engineering and modern aesthetics. Designed from the ground up to solve daily friction, this product delivers exceptional durability, intuitive ergonomic balance, and best-in-class reliability.

**Key Highlights:**
- **Zero-Latency Response:** Instant feedback when you need it most.
- **Premium Build Quality:** Built to withstand demanding everyday workflows.
- **Eco-Efficient Design:** Engineered with modern sustainability standards.

*Elevate your everyday experience. Limited availability—order today.*`;
  }

  if (lower.includes("code") || lower.includes("refactor") || lower.includes("typescript")) {
    return `### Architectural Solution & Code Implementation

Here is the production-ready implementation designed for reliability, type safety, and clean error handling:

\`\`\`typescript
import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

// Initialize Cloudinary with environment credentials
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "Missing required file" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    
    // Upload stream to Cloudinary
    const uploadResult = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "palash-ai-uploads",
          resource_type: "auto",
          transformation: [{ quality: "auto", fetch_format: "auto" }],
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      uploadStream.end(buffer);
    });

    return NextResponse.json({ success: true, asset: uploadResult });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Upload failed" }, { status: 500 });
  }
}
\`\`\`

**Why this approach works:**
1. **Streaming Buffers:** Eliminates temporary disk storage on serverless hosts.
2. **Auto-Transformations:** Cloudinary automatically serves optimized WebP/AVIF formats.
3. **Strict Error Isolation:** Catches network and payload faults gracefully.`;
  }

  return `### AI Generated Insights & Strategy

Based on your prompt, here is a structured analysis and actionable output:

1. **Strategic Overview:**
   Your request was processed using generative reasoning models. Key objectives have been categorized into actionable phases for implementation.

2. **Core Insights:**
   - Optimize for end-user clarity and rapid delivery.
   - Leverage modern cloud primitives to scale without architectural refactoring.
   - Continuously measure performance against defined benchmarks.

3. **Recommended Next Steps:**
   - Review and fine-tune output parameters.
   - Test asset transformations directly via the Media Studio.
   - Export generated assets into your target production environment.`;
}
