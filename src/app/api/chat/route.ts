import { NextRequest, NextResponse } from "next/server";
import { generateAIText } from "@/lib/gemini";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { messages, customApiKey, role } = body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Valid messages array is required" },
        { status: 400 }
      );
    }

    const lastMessage = messages[messages.length - 1];
    const conversationHistory = messages
      .slice(-6)
      .map((m) => `${m.role.toUpperCase()}: ${m.content}`)
      .join("\n\n");

    const systemRole = role || "Senior AI Solutions Architect and Full-Stack Consultant";
    const prompt = `Conversation History:\n${conversationHistory}\n\nPlease respond to the user's latest query thoughtfully and concisely.`;

    const result = await generateAIText({
      prompt,
      systemInstruction: `You are Aetheris Assistant, created by Palash Tripathi and acting as a ${systemRole}. Provide crisp, practical, and highly engaging advice. Use markdown for formatting, bullet points, and code snippets where helpful.`,
      customApiKey,
    });

    return NextResponse.json({
      success: true,
      message: {
        id: `msg-${Date.now()}`,
        role: "model",
        content: result.text,
        timestamp: new Date().toISOString(),
      },
      simulated: result.simulated,
      model: result.model,
      creditsCost: 1,
    });
  } catch (error: any) {
    console.error("API /api/chat error:", error);
    return NextResponse.json(
      { error: error?.message || "Chat processing failed" },
      { status: 500 }
    );
  }
}
