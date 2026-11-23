"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  MessageSquare,
  Sparkles,
  Send,
  User,
  Bot,
  RotateCcw,
  Zap,
  Copy,
  CheckCircle2,
  Cpu,
} from "lucide-react";
import Header from "@/components/Header";
import { useApp } from "@/context/AppContext";
import { ChatMessage } from "@/types";
import { CREATOR_INFO } from "@/data/creator";

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: "init-1",
    role: "model",
    content: `Hey! I am the **Aetheris Copilot**, designed and trained on the architectural decisions built by **${CREATOR_INFO.name}**.

I can assist you with:
- Optimizing Cloudinary edge CDN parameters (e.g. \`f_auto,q_auto,g_auto\`)
- Reviewing Next.js 14 App Router API patterns and streaming routes
- Refining generative prompt engineering for copywriting and code refactoring
- Discussing Palash's other systems projects (AI Voting, Plant Disease CNN, Blockchain Geo-tagging)

What are you working on today?`,
    timestamp: new Date().toISOString(),
  },
];

const SUGGESTED_PROMPTS = [
  "How does Cloudinary dynamic cropping save bandwidth compared to server FFmpeg?",
  "Explain the architecture of Palash's AI-Powered SaaS Platform.",
  "Write a Next.js App Router handler for streaming LLM responses.",
  "What is the difference between g_auto and g_face saliency in Cloudinary?",
];

export default function ChatAssistantPage() {
  const { subscription, spendCredits, customApiKey } = useApp();
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [persona, setPersona] = useState("Principal Full-Stack Architect");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (customText?: string) => {
    const textToSend = customText || inputMessage;
    if (!textToSend.trim() || isLoading) return;

    if (subscription.creditsRemaining < 1) {
      alert("You need at least 1 credit to send a message. Please refill your balance in Billing.");
      return;
    }

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: "user",
      content: textToSend.trim(),
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMsg],
          role: persona,
          customApiKey: customApiKey || undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Chat request failed");

      spendCredits(1);
      setMessages((prev) => [...prev, data.message]);
    } catch (err: any) {
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        role: "model",
        content: `Error: ${err.message || "Unable to reach Gemini inference engine."}`,
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (content: string, id: string) => {
    navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleClearChat = () => {
    setMessages(INITIAL_MESSAGES);
  };

  return (
    <div className="space-y-6 font-sans">
      <Header
        title="AI Architecture & Strategy Copilot"
        description="Interactive multi-turn assistant trained on Cloudinary edge media pipelines and Next.js full-stack systems."
      />

      {/* Main Chat Interface */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 overflow-hidden flex flex-col h-[680px]">
        {/* Chat Header Bar */}
        <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-950 px-5 py-3">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600/20 text-blue-400">
              <Bot className="h-4 w-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-white">Aetheris Copilot</span>
                <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </div>
              <p className="text-[10px] text-zinc-400">by Palash Tripathi · 1 credit per message</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={persona}
              onChange={(e) => setPersona(e.target.value)}
              className="rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-xs text-zinc-200 focus:outline-none focus:border-blue-500"
            >
              <option value="Principal Full-Stack Architect">Principal Architect</option>
              <option value="Cloudinary & Media Edge Expert">Cloudinary Specialist</option>
              <option value="Security & Code Auditor">Code Auditor</option>
            </select>

            <button
              onClick={handleClearChat}
              title="Reset conversation"
              className="rounded-lg border border-zinc-800 bg-zinc-900 p-1.5 text-zinc-400 hover:text-white transition-colors"
            >
              <RotateCcw className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Message Feed */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-zinc-950/60">
          {messages.map((msg) => {
            const isUser = msg.role === "user";
            return (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-3xl ${isUser ? "ml-auto flex-row-reverse" : "mr-auto"}`}
              >
                <div
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-semibold ${
                    isUser
                      ? "bg-blue-600 text-white"
                      : "bg-zinc-800 text-zinc-300 border border-zinc-700"
                  }`}
                >
                  {isUser ? <User className="h-3.5 w-3.5" /> : <Bot className="h-3.5 w-3.5 text-blue-400" />}
                </div>

                <div
                  className={`rounded-2xl px-4 py-3 text-xs sm:text-sm leading-relaxed ${
                    isUser
                      ? "bg-blue-600 text-white shadow-sm"
                      : "bg-zinc-900 text-zinc-200 border border-zinc-800"
                  }`}
                >
                  <div className="whitespace-pre-wrap font-sans space-y-2">{msg.content}</div>

                  {!isUser && (
                    <div className="mt-2 pt-2 border-t border-zinc-800 flex items-center justify-between text-[10px] text-zinc-400">
                      <span>Gemini 1.5 Inference</span>
                      <button
                        onClick={() => handleCopy(msg.content, msg.id)}
                        className="hover:text-white flex items-center gap-1"
                      >
                        {copiedId === msg.id ? (
                          <>
                            <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                            <span className="text-emerald-400 font-medium">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="h-3 w-3" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {isLoading && (
            <div className="flex gap-3 mr-auto max-w-xl items-center">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-zinc-800 text-zinc-300">
                <Bot className="h-3.5 w-3.5 text-blue-400" />
              </div>
              <div className="rounded-2xl bg-zinc-900 border border-zinc-800 px-4 py-2.5 text-xs text-zinc-400 flex items-center gap-2">
                <Sparkles className="h-3.5 w-3.5 animate-spin text-blue-400" />
                <span>Formulating response with Gemini...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Prompts */}
        {messages.length <= 2 && (
          <div className="border-t border-zinc-800 bg-zinc-950 p-3">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400 mb-1.5 block">
              Quick Suggestions
            </span>
            <div className="flex flex-wrap gap-1.5">
              {SUGGESTED_PROMPTS.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(prompt)}
                  className="rounded-lg border border-zinc-800 bg-zinc-900 px-2.5 py-1 text-xs text-zinc-300 hover:border-zinc-700 hover:text-white transition-colors"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Message Input Box */}
        <div className="border-t border-zinc-800 bg-zinc-950 p-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask anything about Next.js, Cloudinary, Gemini LLMs, or Palash's architecture..."
              disabled={isLoading}
              className="flex-1 rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-xs sm:text-sm text-zinc-100 placeholder:text-zinc-600 focus:border-blue-500 focus:outline-none"
            />
            <button
              type="submit"
              disabled={isLoading || !inputMessage.trim()}
              className="rounded-xl bg-blue-600 px-4 py-2.5 text-white shadow-sm hover:bg-blue-500 transition-all disabled:opacity-50 flex items-center gap-1.5"
            >
              <Send className="h-3.5 w-3.5" />
              <span className="text-xs font-semibold hidden sm:inline">Send</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
