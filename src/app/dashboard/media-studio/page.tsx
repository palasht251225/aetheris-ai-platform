"use client";

import React, { useState } from "react";
import {
  Image as ImageIcon,
  Upload,
  Sparkles,
  Zap,
  Sliders,
  Copy,
  CheckCircle2,
  Download,
  Wand2,
  ExternalLink,
  Tag,
  RefreshCw,
  Eye,
  Columns,
  Layers,
  ArrowRight,
} from "lucide-react";
import Header from "@/components/Header";
import { useApp } from "@/context/AppContext";
import { CloudinaryAsset, ImageTransformationOptions } from "@/types";
import { buildTransformedUrl } from "@/lib/cloudinary-url";
import { formatBytes, formatDate } from "@/lib/utils";

const SAMPLE_PRESETS = [
  {
    name: "Travel Balloons",
    url: "https://res.cloudinary.com/demo/image/upload/sample.jpg",
    category: "Landscape",
  },
  {
    name: "Urban Fashion",
    url: "https://res.cloudinary.com/demo/image/upload/fashion.jpg",
    category: "Portrait",
  },
  {
    name: "Gourmet Plating",
    url: "https://res.cloudinary.com/demo/image/upload/dessert.jpg",
    category: "Food",
  },
  {
    name: "Golden Retriever",
    url: "https://res.cloudinary.com/demo/image/upload/dog.jpg",
    category: "Animals",
  },
];

export default function MediaStudioPage() {
  const { assets, addAsset, updateAsset, spendCredits, subscription, customApiKey } = useApp();

  const [selectedAsset, setSelectedAsset] = useState<CloudinaryAsset>(assets[0] || null);
  const [viewMode, setViewMode] = useState<"transformed" | "original" | "split">("transformed");
  const [isUploading, setIsUploading] = useState(false);
  const [remoteUrlInput, setRemoteUrlInput] = useState("");
  const [isAnalyzingVision, setIsAnalyzingVision] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const [transformOptions, setTransformOptions] = useState<ImageTransformationOptions>({
    crop: "fill",
    aspectRatio: "1:1",
    gravity: "auto",
    effect: "none",
    format: "auto",
    quality: "auto",
    removeBackground: false,
  });

  const livePreviewUrl = selectedAsset
    ? buildTransformedUrl(selectedAsset.secureUrl, transformOptions)
    : "";

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/cloudinary/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");

      addAsset(data.asset);
      setSelectedAsset(data.asset);
      showToast("Uploaded and mapped to Cloudinary pipeline!");
    } catch (err: any) {
      showToast(`Upload error: ${err.message}`);
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoteUrlUpload = async () => {
    if (!remoteUrlInput.trim()) return;

    setIsUploading(true);

    try {
      const res = await fetch("/api/cloudinary/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: remoteUrlInput.trim() }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Remote upload failed");

      addAsset(data.asset);
      setSelectedAsset(data.asset);
      setRemoteUrlInput("");
      showToast("Remote image mapped to Cloudinary!");
    } catch (err: any) {
      showToast(`Upload error: ${err.message}`);
    } finally {
      setIsUploading(false);
    }
  };

  const handleRunVisionAnalysis = async () => {
    if (!selectedAsset) return;

    if (subscription.creditsRemaining < 3) {
      showToast("Insufficient credits (3 credits required).");
      return;
    }

    setIsAnalyzingVision(true);

    try {
      const res = await fetch("/api/vision", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageUrl: selectedAsset.secureUrl,
          customApiKey: customApiKey || undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Vision analysis failed");

      spendCredits(3);
      updateAsset(selectedAsset.id, {
        caption: data.analysis.caption,
        tags: data.analysis.tags,
        aiDescription: data.analysis.description,
      });

      setSelectedAsset((prev) => ({
        ...prev,
        caption: data.analysis.caption,
        tags: data.analysis.tags,
        aiDescription: data.analysis.description,
      }));

      showToast("Gemini Vision metadata extracted successfully!");
    } catch (err: any) {
      showToast(`Vision error: ${err.message}`);
    } finally {
      setIsAnalyzingVision(false);
    }
  };

  const handleCopy = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    showToast("Cloudinary CDN URL copied!");
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  return (
    <div className="space-y-6 font-sans">
      <Header
        title="Cloudinary Edge Media & Vision Studio"
        description="Dynamic Cloudinary transformations, auto-format delivery (f_auto, q_auto), and Gemini Vision multimodal analysis."
      />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-2.5 text-xs text-white shadow-2xl flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Quick Sample Presets Strip */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-3.5 flex flex-wrap items-center justify-between gap-3 text-xs">
        <span className="font-semibold text-zinc-300 flex items-center gap-1.5">
          <ImageIcon className="h-3.5 w-3.5 text-blue-400" />
          Quick Test Images (No upload needed):
        </span>
        <div className="flex flex-wrap gap-2">
          {SAMPLE_PRESETS.map((p, idx) => (
            <button
              key={idx}
              onClick={() => {
                const found = assets.find((a) => a.secureUrl === p.url);
                if (found) {
                  setSelectedAsset(found);
                } else {
                  const demoAsset: CloudinaryAsset = {
                    id: `preset-${Date.now()}-${idx}`,
                    publicId: p.name.toLowerCase().replace(/\s+/g, "_"),
                    secureUrl: p.url,
                    thumbnailUrl: p.url.replace("/upload/", "/upload/c_thumb,w_200,h_200/"),
                    format: "jpg",
                    width: 800,
                    height: 600,
                    bytes: 120000,
                    createdAt: new Date().toISOString(),
                    caption: p.name,
                    tags: [p.category.toLowerCase(), "preset", "cloudinary"],
                  };
                  addAsset(demoAsset);
                  setSelectedAsset(demoAsset);
                }
                showToast(`Loaded ${p.name}`);
              }}
              className="rounded-lg border border-zinc-800 bg-zinc-950 px-2.5 py-1 text-zinc-300 hover:border-blue-500/50 hover:text-white transition-colors"
            >
              {p.name}
            </button>
          ))}
        </div>
      </div>

      {/* Main Workspace (12 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Visual Canvas (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 space-y-4">
            {/* View Mode Switcher */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-800 pb-3 text-xs">
              <div className="flex items-center gap-1.5 bg-zinc-950 p-1 rounded-xl border border-zinc-800">
                <button
                  onClick={() => setViewMode("transformed")}
                  className={`rounded-lg px-3 py-1 font-medium transition-colors ${
                    viewMode === "transformed"
                      ? "bg-blue-600 text-white font-semibold"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  Edge Transformed
                </button>
                <button
                  onClick={() => setViewMode("original")}
                  className={`rounded-lg px-3 py-1 font-medium transition-colors ${
                    viewMode === "original"
                      ? "bg-blue-600 text-white font-semibold"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  Original
                </button>
                <button
                  onClick={() => setViewMode("split")}
                  className={`rounded-lg px-3 py-1 font-medium transition-colors ${
                    viewMode === "split"
                      ? "bg-blue-600 text-white font-semibold"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  Side by Side
                </button>
              </div>

              {livePreviewUrl && (
                <button
                  onClick={() => handleCopy(livePreviewUrl)}
                  className="rounded-lg border border-zinc-800 bg-zinc-950 px-2.5 py-1 text-xs text-zinc-300 hover:text-white flex items-center gap-1 transition-colors"
                >
                  {copiedUrl === livePreviewUrl ? (
                    <>
                      <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3" />
                      <span>Copy CDN URL</span>
                    </>
                  )}
                </button>
              )}
            </div>

            {/* Visual Canvas Area */}
            <div className="relative min-h-[380px] w-full rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-center overflow-hidden p-4">
              {viewMode === "split" && selectedAsset ? (
                <div className="grid grid-cols-2 gap-4 w-full h-full items-center">
                  <div className="text-center space-y-2">
                    <span className="text-[10px] uppercase font-semibold text-zinc-500">Original Asset</span>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={selectedAsset.secureUrl}
                      alt="Original"
                      className="max-h-[300px] w-auto max-w-full mx-auto rounded-lg object-contain shadow-md"
                    />
                  </div>
                  <div className="text-center space-y-2">
                    <span className="text-[10px] uppercase font-semibold text-blue-400">Transformed Edge CDN</span>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={livePreviewUrl}
                      alt="Transformed"
                      className="max-h-[300px] w-auto max-w-full mx-auto rounded-lg object-contain shadow-md"
                    />
                  </div>
                </div>
              ) : selectedAsset ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={viewMode === "original" ? selectedAsset.secureUrl : livePreviewUrl}
                  alt={selectedAsset.caption || "Asset"}
                  className="max-h-[360px] w-auto max-w-full rounded-lg object-contain shadow-xl transition-all duration-300"
                />
              ) : (
                <div className="text-center text-zinc-600 space-y-2">
                  <ImageIcon className="h-10 w-10 mx-auto opacity-30" />
                  <p className="text-xs">No asset selected</p>
                </div>
              )}
            </div>

            {/* Real Cloudinary URL Bar */}
            <div className="rounded-xl bg-zinc-950 border border-zinc-800 p-3 space-y-1">
              <div className="flex items-center justify-between text-[10px] text-zinc-500 uppercase font-semibold">
                <span>Active Edge CDN Endpoint</span>
                <span className="text-emerald-400">~45% Bandwidth Savings</span>
              </div>
              <p className="text-xs font-mono text-blue-400 break-all select-all">
                {livePreviewUrl || "No active asset"}
              </p>
            </div>

            {/* Gemini Vision Panel */}
            <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-white">
                  <Sparkles className="h-3.5 w-3.5 text-pink-400" />
                  <span>Gemini Vision Multimodal Analysis</span>
                </div>
                <button
                  onClick={handleRunVisionAnalysis}
                  disabled={isAnalyzingVision || !selectedAsset}
                  className="rounded-lg bg-pink-600/80 hover:bg-pink-600 px-3 py-1 text-xs font-semibold text-white transition-colors disabled:opacity-50 flex items-center gap-1.5"
                >
                  {isAnalyzingVision ? (
                    <>
                      <RefreshCw className="h-3 w-3 animate-spin" />
                      <span>Analyzing...</span>
                    </>
                  ) : (
                    <>
                      <Wand2 className="h-3 w-3" />
                      <span>Run Vision AI (3 cr)</span>
                    </>
                  )}
                </button>
              </div>

              {selectedAsset?.aiDescription ? (
                <div className="space-y-2 text-xs">
                  <p className="text-zinc-200 font-medium">{selectedAsset.caption}</p>
                  <p className="text-zinc-400 leading-relaxed">{selectedAsset.aiDescription}</p>
                  {selectedAsset.tags && (
                    <div className="flex flex-wrap gap-1 pt-1">
                      {selectedAsset.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-md bg-zinc-900 border border-zinc-800 px-2 py-0.5 text-[10px] text-zinc-300 font-mono"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-xs text-zinc-500">
                  Click &apos;Run Vision AI&apos; to pass this image URL into Gemini 1.5 Vision to generate auto-alt text, accessibility tags, and descriptive visual metadata.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Controls & Upload (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          {/* Controls */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                Transform Parameters
              </span>
              <span className="text-[10px] text-zinc-500 font-mono">Zero Host Compute</span>
            </div>

            {/* Aspect Ratio */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-300">Target Aspect Ratio</label>
              <div className="grid grid-cols-4 gap-2 text-xs">
                {(["1:1", "16:9", "4:5", "9:16"] as const).map((ratio) => (
                  <button
                    key={ratio}
                    onClick={() => setTransformOptions((prev) => ({ ...prev, aspectRatio: ratio }))}
                    className={`rounded-lg py-1.5 font-medium border text-center transition-all ${
                      transformOptions.aspectRatio === ratio
                        ? "border-blue-500 bg-blue-500/10 text-blue-300"
                        : "border-zinc-800 bg-zinc-950 text-zinc-400 hover:text-white"
                    }`}
                  >
                    {ratio}
                  </button>
                ))}
              </div>
            </div>

            {/* Saliency */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-300">
                Saliency / Focus Mode (Cloudinary AI)
              </label>
              <select
                value={transformOptions.gravity}
                onChange={(e) =>
                  setTransformOptions((prev) => ({ ...prev, gravity: e.target.value as any }))
                }
                className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3.5 py-2 text-xs text-zinc-200 focus:border-blue-500 focus:outline-none"
              >
                <option value="auto">Auto AI Saliency (g_auto)</option>
                <option value="face">Facial Recognition (g_face)</option>
                <option value="center">Center (g_center)</option>
              </select>
            </div>

            {/* Filter */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-300">Color Filter</label>
              <select
                value={transformOptions.effect}
                onChange={(e) =>
                  setTransformOptions((prev) => ({ ...prev, effect: e.target.value as any }))
                }
                className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3.5 py-2 text-xs text-zinc-200 focus:border-blue-500 focus:outline-none"
              >
                <option value="none">Original Colors</option>
                <option value="enhance">AI Color Enhance (e_improve)</option>
                <option value="grayscale">Monochrome Grayscale</option>
                <option value="sepia">Vintage Sepia</option>
                <option value="blur">Soft Blur Focus</option>
                <option value="vignette">Cinematic Vignette</option>
              </select>
            </div>

            {/* Format & Quality */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-zinc-300">Delivery Format</label>
                <select
                  value={transformOptions.format}
                  onChange={(e) =>
                    setTransformOptions((prev) => ({ ...prev, format: e.target.value as any }))
                  }
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs text-zinc-200 focus:border-blue-500 focus:outline-none"
                >
                  <option value="auto">Auto (f_auto AVIF/WebP)</option>
                  <option value="webp">WebP</option>
                  <option value="avif">AVIF (Max compression)</option>
                  <option value="png">PNG</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-zinc-300">Quality</label>
                <select
                  value={transformOptions.quality}
                  onChange={(e) =>
                    setTransformOptions((prev) => ({ ...prev, quality: e.target.value as any }))
                  }
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs text-zinc-200 focus:border-blue-500 focus:outline-none"
                >
                  <option value="auto">Auto (q_auto Adaptive)</option>
                  <option value="best">Lossless Best</option>
                  <option value="eco">Eco Mode</option>
                </select>
              </div>
            </div>

            {/* Background removal */}
            <div className="flex items-center justify-between rounded-xl bg-zinc-950 border border-zinc-800 p-3">
              <div className="space-y-0.5">
                <span className="text-xs font-medium text-zinc-200">AI Background Removal</span>
                <p className="text-[10px] text-zinc-500">Cloudinary AI Subject Extraction</p>
              </div>
              <button
                type="button"
                onClick={() =>
                  setTransformOptions((prev) => ({
                    ...prev,
                    removeBackground: !prev.removeBackground,
                  }))
                }
                className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
                  transformOptions.removeBackground ? "bg-blue-600" : "bg-zinc-800"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition duration-200 ease-in-out ${
                    transformOptions.removeBackground ? "translate-x-4" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Upload Box */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
              Ingest Image
            </h3>

            <label className="flex flex-col items-center justify-center rounded-xl border border-dashed border-zinc-800 bg-zinc-950/60 p-5 cursor-pointer hover:border-zinc-700 transition-colors">
              <Upload className="h-6 w-6 text-blue-400 mb-1" />
              <span className="text-xs font-medium text-zinc-200">
                {isUploading ? "Processing..." : "Upload photo from device"}
              </span>
              <span className="text-[10px] text-zinc-500 mt-0.5">PNG, JPG, WebP up to 10MB</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                disabled={isUploading}
                className="hidden"
              />
            </label>

            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Or paste remote image URL..."
                value={remoteUrlInput}
                onChange={(e) => setRemoteUrlInput(e.target.value)}
                className="flex-1 rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs text-zinc-200 placeholder:text-zinc-600 focus:border-blue-500 focus:outline-none"
              />
              <button
                onClick={handleRemoteUrlUpload}
                disabled={isUploading || !remoteUrlInput.trim()}
                className="rounded-xl bg-blue-600 px-3.5 py-2 text-xs font-semibold text-white hover:bg-blue-500 transition-colors disabled:opacity-50"
              >
                Import
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
