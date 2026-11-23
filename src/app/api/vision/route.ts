import { NextRequest, NextResponse } from "next/server";
import { analyzeImageWithAI } from "@/lib/gemini";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { imageUrl, prompt, customApiKey } = body;

    if (!imageUrl) {
      return NextResponse.json(
        { error: "Image URL is required" },
        { status: 400 }
      );
    }

    const result = await analyzeImageWithAI({
      imageUrl,
      prompt,
      customApiKey,
    });

    return NextResponse.json({
      success: true,
      analysis: result,
      creditsCost: 3,
    });
  } catch (error: any) {
    console.error("API /api/vision error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to analyze image" },
      { status: 500 }
    );
  }
}
