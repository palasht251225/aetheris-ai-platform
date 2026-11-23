import { NextRequest, NextResponse } from "next/server";
import { generateAIText } from "@/lib/gemini";
import { CONTENT_TEMPLATES } from "@/lib/mockData";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { templateId, prompt, fields, customApiKey } = body;

    let fullPrompt = prompt || "";
    let systemInstruction = "You are a versatile, high-caliber AI assistant.";
    let costCredits = 3;

    if (templateId) {
      const template = CONTENT_TEMPLATES.find((t) => t.id === templateId);
      if (template) {
        systemInstruction = template.systemPrompt;
        costCredits = template.costCredits;

        if (fields && Object.keys(fields).length > 0) {
          const fieldDescriptions = Object.entries(fields)
            .map(([key, val]) => `${key}: ${val}`)
            .join("\n");
          fullPrompt = `Please fulfill the following task based on these parameters:\n${fieldDescriptions}\n\nTask: ${template.name}`;
        }
      }
    }

    if (!fullPrompt.trim()) {
      return NextResponse.json(
        { error: "Prompt or template fields are required" },
        { status: 400 }
      );
    }

    const result = await generateAIText({
      prompt: fullPrompt,
      systemInstruction,
      customApiKey,
    });

    return NextResponse.json({
      success: true,
      text: result.text,
      simulated: result.simulated,
      model: result.model,
      creditsCost: costCredits,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error("API /api/generate error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to generate content" },
      { status: 500 }
    );
  }
}
