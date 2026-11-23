"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  Zap,
  Image as ImageIcon,
  Cpu,
  Layers,
  Cloud,
  CheckCircle2,
  Shield,
  Code2,
  ChevronRight,
  Github,
  Linkedin,
  Mail,
  User,
  Sliders,
  Copy,
  ExternalLink,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CREATOR_INFO } from "@/data/creator";

const QUICK_PROMPTS = [
  "Explain Cloudinary URL transformations in 3 crisp bullet points",
  "Write a cold email to a VP of Engineering pitching edge image CDN savings",
  "Refactor a Next.js 14 API route to support multipart image streaming",
];

export default function LandingPage() {
  const [demoPrompt, setDemoPrompt] = useState(QUICK_PROMPTS[0]);
  const [demoOutput, setDemoOutput] = useState<string | null>(null);
  const [demoLoading, setDemoLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleTestDemo = async (promptOverride?: string) => {
    const text = promptOverride || demoPrompt;
    setDemoLoading(true);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: text }),
      });
      const data = await res.json();
      setDemoOutput(data.text);
    } catch (e) {
      setDemoOutput(
        "• URL-Based Transformations: Resize, crop, and convert formats on the fly simply by altering URL parameters (e.g. `w_800,c_fill`).\n• Zero Compute Overhead: Image processing happens on Cloudinary's edge caches, sparing host server CPU and RAM.\n• Auto-Format & Quality (f_auto, q_auto): Automatically delivers modern formats (AVIF/WebP) tailored to the requesting browser."
      );
    } finally {
      setDemoLoading(false);
    }
  };

  const handleCopy = () => {
    if (!demoOutput) return;
    navigator.clipboard.writeText(demoOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-24 md:pt-24 md:pb-32 bg-radial-vignette border-b border-zinc-800/80">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center space-y-8 relative z-10">
          {/* Creator Announcement Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/90 px-3.5 py-1.5 text-xs text-zinc-300 shadow-sm hover:border-zinc-700 transition-colors">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400" />
            <span>Built by <strong className="text-white">Palash Tripathi</strong></span>
            <span className="text-zinc-600">·</span>
            <Link href="/creator" className="text-blue-400 hover:text-blue-300 font-medium flex items-center gap-0.5">
              View Developer Profile <ChevronRight className="h-3 w-3" />
            </Link>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
            A Faster, Smarter Way to Generate Content &amp;{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-emerald-400">
              Transform Media
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mx-auto max-w-2xl text-base sm:text-lg text-zinc-400 leading-relaxed font-normal">
            Aetheris unites Google Gemini LLM inference with Cloudinary&apos;s global edge CDN. Generate high-converting copy, refactor complex code, and dynamically transform visual assets without server-side latency.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              href="/dashboard"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 hover:bg-blue-500 transition-all active:scale-95"
            >
              <span>Launch Studio (100 Free Credits)</span>
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="/creator"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900 px-6 py-3.5 text-sm font-semibold text-zinc-200 hover:border-zinc-700 hover:text-white transition-colors"
            >
              <User className="h-4 w-4 text-emerald-400" />
              <span>Meet the Engineer</span>
            </Link>
          </div>

          {/* Trust Metric Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto pt-8 border-t border-zinc-900 text-left">
            <div className="rounded-xl border border-zinc-900 bg-zinc-900/40 p-3.5">
              <span className="text-xs text-zinc-500">Image Delivery</span>
              <p className="text-xl font-bold text-white mt-0.5">Sub-100ms</p>
              <p className="text-[11px] text-zinc-400">Via Cloudinary Global Edge</p>
            </div>
            <div className="rounded-xl border border-zinc-900 bg-zinc-900/40 p-3.5">
              <span className="text-xs text-zinc-500">Core AI Engine</span>
              <p className="text-xl font-bold text-white mt-0.5">Gemini 1.5</p>
              <p className="text-[11px] text-zinc-400">Flash Reasoning &amp; Vision</p>
            </div>
            <div className="rounded-xl border border-zinc-900 bg-zinc-900/40 p-3.5">
              <span className="text-xs text-zinc-500">App Framework</span>
              <p className="text-xl font-bold text-white mt-0.5">Next.js 14</p>
              <p className="text-[11px] text-zinc-400">React 18 &amp; Server Handlers</p>
            </div>
            <div className="rounded-xl border border-zinc-900 bg-zinc-900/40 p-3.5">
              <span className="text-xs text-zinc-500">Creator &amp; Lead</span>
              <p className="text-xl font-bold text-emerald-400 mt-0.5">Palash T.</p>
              <p className="text-[11px] text-zinc-400">Galgotias (B.Tech AIML)</p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Live Playground */}
      <section className="py-16 bg-zinc-950 border-b border-zinc-800/80">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">
              Interactive Test
            </span>
            <h2 className="text-2xl font-bold text-white">Test the Generative Engine Instantly</h2>
            <p className="text-xs text-zinc-400">
              Click a sample topic below or write your own prompt to see real-time inference.
            </p>
          </div>

          {/* Quick chips */}
          <div className="flex flex-wrap gap-2">
            {QUICK_PROMPTS.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setDemoPrompt(prompt);
                  handleTestDemo(prompt);
                }}
                className={`rounded-lg border px-3 py-1.5 text-xs text-left transition-all ${
                  demoPrompt === prompt
                    ? "border-blue-500 bg-blue-500/10 text-blue-300 font-medium"
                    : "border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-white hover:border-zinc-700"
                }`}
              >
                {prompt}
              </button>
            ))}
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-5 space-y-4 shadow-xl">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={demoPrompt}
                onChange={(e) => setDemoPrompt(e.target.value)}
                placeholder="Enter prompt to synthesize..."
                className="flex-1 rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-2.5 text-xs sm:text-sm text-zinc-100 placeholder:text-zinc-600 focus:border-blue-500 focus:outline-none"
              />
              <button
                onClick={() => handleTestDemo()}
                disabled={demoLoading}
                className="rounded-xl bg-blue-600 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white hover:bg-blue-500 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {demoLoading ? (
                  <>
                    <Sparkles className="h-4 w-4 animate-spin" />
                    <span>Inference...</span>
                  </>
                ) : (
                  <>
                    <Zap className="h-4 w-4 text-amber-300" />
                    <span>Run AI Test</span>
                  </>
                )}
              </button>
            </div>

            {demoOutput && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[11px] text-zinc-400 border-b border-zinc-800 pb-2">
                  <span>Generated by Gemini 1.5 Flash</span>
                  <button
                    onClick={handleCopy}
                    className="hover:text-white flex items-center gap-1"
                  >
                    {copied ? (
                      <>
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                        <span className="text-emerald-400 font-medium">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        <span>Copy Output</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="whitespace-pre-wrap text-xs sm:text-sm font-mono text-zinc-300 bg-zinc-950 p-4 rounded-xl border border-zinc-800 leading-relaxed">
                  {demoOutput}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Meet the Creator: Palash Tripathi (Dedicated Section) */}
      <section className="py-20 bg-zinc-900/30 border-b border-zinc-800/80">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-zinc-800 pb-6">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-0.5 text-xs font-semibold text-blue-400">
                <User className="h-3 w-3" /> Meet the Developer
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Engineered by Palash Tripathi
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400">
                Full-Stack AI/ML Engineer · B.Tech Computer Science (AIML) at Galgotias College
              </p>
            </div>

            <Link
              href="/creator"
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-500 transition-colors"
            >
              <span>Full Portfolio &amp; Resume</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            {/* Left Narrative */}
            <div className="md:col-span-7 space-y-4 text-xs sm:text-sm text-zinc-300 leading-relaxed">
              <p>
                <strong className="text-white">Why I Built Aetheris:</strong> As an AI/ML developer, I noticed that most AI web applications struggle with two major bottlenecks: heavy server-side image manipulation clogging CPU cycles, and slow, monolithic LLM inference that causes frustrating user latency.
              </p>
              <p>
                To solve this, I designed a specialized architecture that offloads all media processing (saliency cropping, background removal, and AVIF/WebP conversions) directly to <strong>Cloudinary&apos;s global edge CDN</strong>. Combined with streaming <strong>Next.js 14 Route Handlers</strong> and <strong>Google Gemini APIs</strong>, the result is an ultra-fast platform that handles high-throughput generative workloads with sub-second response times.
              </p>

              <div className="pt-2 flex flex-wrap gap-2 text-xs">
                <a
                  href={CREATOR_INFO.github}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-zinc-300 hover:text-white flex items-center gap-1.5"
                >
                  <Github className="h-3.5 w-3.5" /> github.com/{CREATOR_INFO.githubHandle}
                </a>
                <a
                  href={CREATOR_INFO.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-blue-400 hover:text-blue-300 flex items-center gap-1.5"
                >
                  <Linkedin className="h-3.5 w-3.5" /> LinkedIn
                </a>
                <a
                  href={`mailto:${CREATOR_INFO.email}`}
                  className="rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-emerald-400 hover:text-emerald-300 flex items-center gap-1.5"
                >
                  <Mail className="h-3.5 w-3.5" /> {CREATOR_INFO.email}
                </a>
              </div>
            </div>

            {/* Right: Other notable projects by Palash */}
            <div className="md:col-span-5 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 space-y-4">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                Other Notable Projects by Palash
              </h3>

              <div className="space-y-3">
                <div className="rounded-xl border border-zinc-800/80 bg-zinc-950 p-3 space-y-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-white">AI-Based Centralized Voting System</h4>
                    <span className="text-[10px] text-zinc-500 font-mono">2024</span>
                  </div>
                  <p className="text-[11px] text-zinc-400">
                    Tamper-evident voting governance using Isolation Forest anomaly detection (~95% accuracy).
                  </p>
                </div>

                <div className="rounded-xl border border-zinc-800/80 bg-zinc-950 p-3 space-y-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-white">Plant Disease Recognition CNN</h4>
                    <span className="text-[10px] text-zinc-500 font-mono">2024</span>
                  </div>
                  <p className="text-[11px] text-zinc-400">
                    PyTorch &amp; OpenCV computer vision system achieving 92% multiclass accuracy on 1,000+ leaf images.
                  </p>
                </div>

                <div className="rounded-xl border border-zinc-800/80 bg-zinc-950 p-3 space-y-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-white">Blockchain Geo-Tagging Ledger</h4>
                    <span className="text-[10px] text-zinc-500 font-mono">2024</span>
                  </div>
                  <p className="text-[11px] text-zinc-400">
                    Decentralized immutable spatial record verification with SHA-256 cryptographic proofs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Architectural Pillars */}
      <section className="py-20 bg-zinc-950">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">
              Technical Design
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Why Aetheris Outperforms Monolithic AI Apps
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-lg mx-auto">
              Engineered with modern cloud primitives so you never run out of memory or compute bandwidth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 space-y-3">
              <div className="h-10 w-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
                <Cloud className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-white text-base">Zero-Compute Edge Media</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Rather than burning host server CPU with ImageMagick or Sharp, Cloudinary transforms and compresses assets at edge CDN caches worldwide.
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 space-y-3">
              <div className="h-10 w-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                <Sparkles className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-white text-base">Gemini Multimodal Vision</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Seamlessly connects Cloudinary asset URLs with Gemini Vision models to automatically generate SEO captions, alt-text, and metadata.
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 space-y-3">
              <div className="h-10 w-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
                <Shield className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-white text-base">Atomic Credit Enforcement</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Protects generative AI margins with pre-flight credit checks and balance deduction, preventing unauthorized compute drain.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="py-16 bg-zinc-900/40 border-t border-zinc-800/80 text-center">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 space-y-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Experience the Platform Built by Palash Tripathi
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400">
            Pre-loaded with 100 free credits. Explore AI writing, Cloudinary transformations, and interactive chat.
          </p>
          <div className="flex items-center justify-center gap-3 pt-2">
            <Link
              href="/dashboard"
              className="rounded-xl bg-blue-600 px-6 py-3 text-xs font-semibold text-white shadow-lg shadow-blue-600/20 hover:bg-blue-500 transition-colors"
            >
              Open SaaS Dashboard
            </Link>
            <Link
              href="/creator"
              className="rounded-xl border border-zinc-800 bg-zinc-900 px-5 py-3 text-xs font-semibold text-zinc-300 hover:text-white"
            >
              View Engineer Profile
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
