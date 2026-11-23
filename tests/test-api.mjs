import http from "node:http";

const BASE_URL = "http://localhost:3000";

async function runTests() {
  console.log("=================================================");
  console.log("🚀 Starting Aetheris Automated Integration Tests");
  console.log("=================================================\n");

  let passed = 0;
  let failed = 0;

  async function test(name, fn) {
    try {
      process.stdout.write(`⏳ Testing: ${name}... `);
      await fn();
      console.log("✅ PASSED");
      passed++;
    } catch (err) {
      console.log(`❌ FAILED: ${err.message}`);
      failed++;
    }
  }

  // 1. Landing Page Test
  await test("GET / (Landing Page)", async () => {
    const res = await fetch(`${BASE_URL}/`);
    if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);
    const text = await res.text();
    if (!text.includes("Aetheris") && !text.includes("Palash")) {
      throw new Error("Landing page content missing expected brand strings");
    }
  });

  // 2. Dashboard Route
  await test("GET /dashboard (SaaS Dashboard)", async () => {
    const res = await fetch(`${BASE_URL}/dashboard`);
    if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);
  });

  // 3. AI Text Generation API
  await test("POST /api/generate (LLM Text Inference)", async () => {
    const res = await fetch(`${BASE_URL}/api/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        templateId: "blog-article",
        fields: {
          topic: "Next.js 14 and Cloudinary Media Architecture",
          keywords: "SaaS, Cloud, AI",
          tone: "Informative & Authoritative",
        },
      }),
    });
    if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);
    const data = await res.json();
    if (!data.success || !data.text || typeof data.text !== "string") {
      throw new Error("Invalid response payload from /api/generate");
    }
  });

  // 4. Multi-Turn AI Chat API
  await test("POST /api/chat (Assistant Inference)", async () => {
    const res = await fetch(`${BASE_URL}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: [{ role: "user", content: "Explain Cloudinary URL transformations" }],
        role: "Principal Architect",
      }),
    });
    if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);
    const data = await res.json();
    if (!data.success || !data.message?.content) {
      throw new Error("Invalid chat response payload");
    }
  });

  // 5. Cloudinary Upload API (Remote URL Ingestion)
  await test("POST /api/cloudinary/upload (Media Ingestion)", async () => {
    const res = await fetch(`${BASE_URL}/api/cloudinary/upload`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        url: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=600",
      }),
    });
    if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);
    const data = await res.json();
    if (!data.success || !data.asset?.secureUrl) {
      throw new Error("Failed to return Cloudinary asset structure");
    }
  });

  // 6. Cloudinary Dynamic Transformation API
  await test("POST /api/cloudinary/transform (URL Generator)", async () => {
    const res = await fetch(`${BASE_URL}/api/cloudinary/transform`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        publicId: "samples/balloons",
        options: {
          crop: "fill",
          aspectRatio: "16:9",
          format: "webp",
          quality: "auto",
          gravity: "auto",
        },
      }),
    });
    if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);
    const data = await res.json();
    if (!data.success || !data.transformedUrl.includes("res.cloudinary.com")) {
      throw new Error("Failed to generate transformed Cloudinary URL");
    }
  });

  // 7. Gemini Multimodal Vision API
  await test("POST /api/vision (Image Analysis)", async () => {
    const res = await fetch(`${BASE_URL}/api/vision`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        imageUrl: "https://res.cloudinary.com/demo/image/upload/sample.jpg",
      }),
    });
    if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);
    const data = await res.json();
    if (!data.success || !data.analysis?.caption || !Array.isArray(data.analysis?.tags)) {
      throw new Error("Failed to receive image analysis structure");
    }
  });

  // 8. User Credits & Plan Management API
  await test("GET & POST /api/user/credits (Credit System)", async () => {
    const getRes = await fetch(`${BASE_URL}/api/user/credits`);
    if (getRes.status !== 200) throw new Error(`GET failed with ${getRes.status}`);
    const getData = await getRes.json();
    if (!getData.subscription?.creditsRemaining) {
      throw new Error("Credit structure missing in GET");
    }

    const postRes = await fetch(`${BASE_URL}/api/user/credits`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "refill", amount: 500 }),
    });
    if (postRes.status !== 200) throw new Error(`POST refill failed with ${postRes.status}`);
  });

  console.log("\n=================================================");
  console.log(`📊 Test Results: ${passed} Passed, ${failed} Failed`);
  console.log("=================================================\n");

  if (failed > 0) process.exit(1);
}

runTests().catch((err) => {
  console.error("Fatal test runner error:", err);
  process.exit(1);
});
