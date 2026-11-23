"use client";

import React, { useState } from "react";
import {
  Sparkles,
  Zap,
  Copy,
  CheckCircle2,
  Download,
  RotateCcw,
  Sliders,
  FileText,
  Share2,
  ShoppingBag,
  Code2,
  Mail,
  Search,
  AlertCircle,
  Cpu,
  Edit3,
  Eye,
  Trash2,
  Clock,
  Type,
  Lightbulb,
} from "lucide-react";
import Header from "@/components/Header";
import { CONTENT_TEMPLATES } from "@/lib/mockData";
import { AIContentTemplate, ToolCategory } from "@/types";
import { useApp } from "@/context/AppContext";

export default function TextStudioPage() {
  const { subscription, spendCredits, addGeneration, customApiKey } = useApp();

  const [selectedTemplate, setSelectedTemplate] = useState<AIContentTemplate>(
    CONTENT_TEMPLATES[0]
  );
  const [activeCategory, setActiveCategory] = useState<ToolCategory | "all">("all");
  const [formData, setFormData] = useState<Record<string, string>>({
    topic: "How Edge Computing and AI Are Transforming Web Development",
    keywords: "Next.js, Cloudinary, Edge functions, AI SaaS",
    tone: "Informative & Authoritative",
    targetAudience: "Tech professionals and entrepreneurs",
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedOutput, setGeneratedOutput] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editableText, setEditableText] = useState("");
  const [modelUsed, setModelUsed] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const filteredTemplates = CONTENT_TEMPLATES.filter(
    (t) => activeCategory === "all" || t.category === activeCategory
  );

  const handleTemplateChange = (template: AIContentTemplate) => {
    setSelectedTemplate(template);
    const initialValues: Record<string, string> = {};
    template.fields.forEach((f) => {
      initialValues[f.name] = f.defaultValue || "";
    });
    setFormData(initialValues);
    setErrorMessage(null);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleLoadSample = () => {
    if (selectedTemplate.id === "blog-article") {
      setFormData({
        topic: "Building Resilient AI SaaS Platforms with Next.js 14 and Cloudinary",
        keywords: "Next.js 14, Cloudinary CDN, Gemini LLM, Full-Stack SaaS",
        tone: "Informative & Authoritative",
        targetAudience: "Full-Stack Software Engineers & Tech Founders",
      });
    } else if (selectedTemplate.id === "linkedin-post") {
      setFormData({
        topic: "Why offloading image processing to Cloudinary edge beats server FFmpeg by 40%",
        style: "Story + 3 Key Lessons",
        callToAction: "What's your biggest edge compute challenge? Drop your thoughts below!",
      });
    } else if (selectedTemplate.id === "code-assistant") {
      setFormData({
        language: "TypeScript / Next.js",
        task: "Implement a rate-limited Cloudinary upload endpoint in Next.js App Router with retry logic",
        existingCode: "",
      });
    } else if (selectedTemplate.id === "cold-email") {
      setFormData({
        recipientRole: "Head of Product / VP of Engineering at Scale-Up SaaS",
        valueProp: "Cut image delivery latency by 40% and automate social assets via edge CDN",
        offer: "Quick 10-minute preview call",
      });
    } else {
      setFormData({
        pageTopic: "Automated AI Content and Edge Media Suite",
        targetKeyword: "Next.js AI SaaS Platform",
      });
    }
    showToast("Sample prompt loaded!");
  };

  const handleGenerate = async () => {
    setErrorMessage(null);

    if (subscription.creditsRemaining < selectedTemplate.costCredits) {
      setErrorMessage(
        `Insufficient credits. This generation requires ${selectedTemplate.costCredits} credits, but you have ${subscription.creditsRemaining}. Please refill your balance in Billing.`
      );
      return;
    }

    setIsGenerating(true);
    setGeneratedOutput(null);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          templateId: selectedTemplate.id,
          fields: formData,
          customApiKey: customApiKey || undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Generation request failed");
      }

      spendCredits(selectedTemplate.costCredits);

      addGeneration({
        title: formData.topic || formData.productName || formData.task || selectedTemplate.name,
        templateId: selectedTemplate.id,
        category: selectedTemplate.category,
        prompt: JSON.stringify(formData),
        content: data.text,
        creditsCost: selectedTemplate.costCredits,
      });

      setGeneratedOutput(data.text);
      setEditableText(data.text);
      setModelUsed(data.model);
      setIsEditing(false);
      showToast(`Generated successfully! (-${selectedTemplate.costCredits} credits)`);
    } catch (err: any) {
      setErrorMessage(err.message || "An unexpected error occurred while generating.");
    } finally {
      setIsGenerating(false);
    }
  };

  const currentContent = isEditing ? editableText : generatedOutput || "";
  const wordCount = currentContent.trim() ? currentContent.trim().split(/\s+/).length : 0;
  const charCount = currentContent.length;
  const readTimeMin = Math.max(1, Math.ceil(wordCount / 200));

  const handleCopy = () => {
    if (!currentContent) return;
    navigator.clipboard.writeText(currentContent);
    setCopied(true);
    showToast("Copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = (format: "md" | "txt") => {
    if (!currentContent) return;
    const mime = format === "md" ? "text/markdown" : "text/plain";
    const blob = new Blob([currentContent], { type: `${mime};charset=utf-8` });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${selectedTemplate.id}-${Date.now()}.${format}`;
    a.click();
    URL.revokeObjectURL(url);
    showToast(`Downloaded as .${format}!`);
  };

  return (
    <div className="space-y-6 font-sans">
      <Header
        title="AI Content & Code Studio"
        description="Synthesize high-impact articles, social copy, and code refactors powered by Google Gemini LLMs."
      />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-2.5 text-xs text-white shadow-2xl flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        {[
          { id: "all", label: "All Templates" },
          { id: "text", label: "Blog & Editorial" },
          { id: "marketing", label: "Social & Growth" },
          { id: "code", label: "Code & Architecture" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveCategory(tab.id as any)}
            className={`rounded-xl px-3.5 py-1.5 font-medium transition-all ${
              activeCategory === tab.id
                ? "bg-zinc-800 text-white font-semibold shadow-sm"
                : "border border-zinc-800/80 bg-zinc-900/60 text-zinc-400 hover:text-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Config Panel (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          {/* Template Grid */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-4 space-y-3">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
              Select Output Mode
            </span>
            <div className="grid grid-cols-2 gap-2">
              {filteredTemplates.map((template) => {
                const isSelected = selectedTemplate.id === template.id;
                return (
                  <button
                    key={template.id}
                    onClick={() => handleTemplateChange(template)}
                    className={`rounded-xl p-3 text-left transition-all border ${
                      isSelected
                        ? "border-blue-500/60 bg-blue-500/10 text-white"
                        : "border-zinc-800 bg-zinc-950/60 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold truncate">{template.name}</span>
                      <span className="text-[10px] text-zinc-400 font-mono">
                        {template.costCredits} cr
                      </span>
                    </div>
                    <p className="text-[10px] text-zinc-500 line-clamp-2 leading-tight">
                      {template.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Form Fields */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <div>
                <h3 className="text-sm font-semibold text-white">{selectedTemplate.name}</h3>
                <p className="text-[11px] text-zinc-400">Configure parameters for Gemini inference</p>
              </div>
              <button
                type="button"
                onClick={handleLoadSample}
                className="text-[11px] text-blue-400 hover:text-blue-300 font-medium flex items-center gap-1"
                title="Fill with high-quality demo prompt"
              >
                <Lightbulb className="h-3 w-3" />
                <span>Fill Sample</span>
              </button>
            </div>

            {selectedTemplate.fields.map((field) => (
              <div key={field.name} className="space-y-1.5">
                <label className="text-xs font-medium text-zinc-300">
                  {field.label}{" "}
                  {field.required && <span className="text-rose-400">*</span>}
                </label>

                {field.type === "textarea" ? (
                  <textarea
                    rows={4}
                    value={formData[field.name] || ""}
                    onChange={(e) => handleInputChange(field.name, e.target.value)}
                    placeholder={field.placeholder}
                    className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3.5 py-2.5 text-xs text-zinc-100 placeholder:text-zinc-600 focus:border-blue-500 focus:outline-none resize-none font-sans"
                  />
                ) : field.type === "select" ? (
                  <select
                    value={formData[field.name] || ""}
                    onChange={(e) => handleInputChange(field.name, e.target.value)}
                    className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3.5 py-2.5 text-xs text-zinc-100 focus:border-blue-500 focus:outline-none"
                  >
                    {field.options?.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="text"
                    value={formData[field.name] || ""}
                    onChange={(e) => handleInputChange(field.name, e.target.value)}
                    placeholder={field.placeholder}
                    className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3.5 py-2.5 text-xs text-zinc-100 placeholder:text-zinc-600 focus:border-blue-500 focus:outline-none"
                  />
                )}
              </div>
            ))}

            {errorMessage && (
              <div className="rounded-xl border border-rose-500/20 bg-rose-500/10 p-3 text-xs text-rose-300 flex items-start gap-2">
                <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full rounded-xl bg-blue-600 hover:bg-blue-500 py-3 text-xs font-semibold text-white shadow-lg shadow-blue-600/20 transition-all disabled:opacity-50 flex items-center justify-center gap-2 active:scale-[0.99]"
            >
              {isGenerating ? (
                <>
                  <Sparkles className="h-4 w-4 animate-spin" />
                  <span>Synthesizing with Gemini...</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  <span>Generate Content ({selectedTemplate.costCredits} credits)</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Output Panel & Live Editor (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 space-y-4 min-h-[580px] flex flex-col justify-between">
            {/* Action Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-white">Output Studio</span>
                {modelUsed && (
                  <span className="rounded-md bg-zinc-800 border border-zinc-700/60 px-2 py-0.5 text-[10px] text-zinc-300 font-mono">
                    {modelUsed}
                  </span>
                )}
              </div>

              {generatedOutput && (
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className={`rounded-lg border px-2.5 py-1 text-xs font-medium flex items-center gap-1 transition-colors ${
                      isEditing
                        ? "border-blue-500 bg-blue-500/10 text-blue-300"
                        : "border-zinc-800 bg-zinc-950 text-zinc-300 hover:text-white"
                    }`}
                  >
                    {isEditing ? <Eye className="h-3 w-3" /> : <Edit3 className="h-3 w-3" />}
                    <span>{isEditing ? "View Markdown" : "Edit Text"}</span>
                  </button>

                  <button
                    onClick={handleCopy}
                    className="rounded-lg border border-zinc-800 bg-zinc-950 px-2.5 py-1 text-xs text-zinc-300 hover:text-white flex items-center gap-1 transition-colors"
                  >
                    {copied ? (
                      <>
                        <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                        <span className="text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3 w-3" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => handleDownload("md")}
                    className="rounded-lg border border-zinc-800 bg-zinc-950 px-2.5 py-1 text-xs text-zinc-300 hover:text-white flex items-center gap-1"
                    title="Download as Markdown file"
                  >
                    <Download className="h-3 w-3" />
                    <span>.md</span>
                  </button>
                </div>
              )}
            </div>

            {/* Content Body */}
            <div className="flex-1 overflow-y-auto rounded-xl bg-zinc-950 border border-zinc-800/80 p-5">
              {isGenerating ? (
                <div className="h-full flex flex-col items-center justify-center space-y-3 py-24 text-center">
                  <div className="h-10 w-10 rounded-full border-2 border-blue-500/20 border-t-blue-500 animate-spin" />
                  <p className="text-sm font-semibold text-white">Synthesizing Response</p>
                  <p className="text-xs text-zinc-400">Streaming tokens via Next.js Route Handler...</p>
                </div>
              ) : generatedOutput ? (
                isEditing ? (
                  <textarea
                    rows={18}
                    value={editableText}
                    onChange={(e) => setEditableText(e.target.value)}
                    className="w-full h-full bg-transparent text-xs sm:text-sm font-mono text-zinc-200 leading-relaxed focus:outline-none resize-none"
                    placeholder="Edit your output text here..."
                  />
                ) : (
                  <div className="text-xs sm:text-sm font-mono leading-relaxed whitespace-pre-wrap text-zinc-200">
                    {editableText || generatedOutput}
                  </div>
                )
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-3 py-24 text-zinc-500">
                  <FileText className="h-10 w-10 stroke-[1.2] opacity-40 mx-auto" />
                  <p className="text-sm font-semibold text-zinc-300">No output generated yet</p>
                  <p className="text-xs text-zinc-500 max-w-sm">
                    Select a template on the left, click &quot;Fill Sample&quot; or enter your own topic, and generate.
                  </p>
                </div>
              )}
            </div>

            {/* Bottom Stats Footer */}
            {generatedOutput && (
              <div className="border-t border-zinc-800 pt-3 flex flex-wrap items-center justify-between text-[11px] text-zinc-400">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <Type className="h-3 w-3 text-zinc-500" />
                    <strong>{wordCount}</strong> words ({charCount} chars)
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3 text-zinc-500" />
                    ~{readTimeMin} min read
                  </span>
                </div>
                <span className="text-zinc-500">Saved automatically in session history</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
