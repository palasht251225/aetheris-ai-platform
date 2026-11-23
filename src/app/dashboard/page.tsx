"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  Zap,
  Image as ImageIcon,
  MessageSquare,
  FileText,
  ArrowUpRight,
  TrendingUp,
  Cpu,
  Layers,
  Cloud,
  CheckCircle2,
  Copy,
  Trash2,
  Eye,
  User,
  Github,
  Linkedin,
} from "lucide-react";
import Header from "@/components/Header";
import { useApp } from "@/context/AppContext";
import { formatDate, truncateText } from "@/lib/utils";
import { CREATOR_INFO } from "@/data/creator";

export default function DashboardOverview() {
  const { subscription, history, assets, deleteGeneration } = useApp();
  const [selectedGen, setSelectedGen] = useState<any>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6 font-sans">
      <Header
        title="Engineering Overview"
        description="Monitor Gemini LLM inference workloads, Cloudinary CDN asset pipelines, and credit allocations."
        actionText="New Generation"
        actionHref="/dashboard/text-studio"
        actionIcon={<Sparkles className="h-4 w-4" />}
      />

      {/* Creator Spotlight Banner */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600/20 text-blue-400 font-bold text-base">
            PT
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-white">{CREATOR_INFO.name}</span>
              <span className="rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 text-[10px] font-semibold">
                Project Lead
              </span>
            </div>
            <p className="text-xs text-zinc-400">
              Galgotias College of Engg &amp; Tech · Computer Science &amp; Engineering (AIML)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/dashboard/creator"
            className="rounded-xl border border-zinc-800 bg-zinc-950 px-3.5 py-1.5 text-xs font-semibold text-zinc-300 hover:text-white flex items-center gap-1.5 transition-colors"
          >
            <User className="h-3.5 w-3.5 text-emerald-400" />
            <span>Developer Profile</span>
          </Link>
          <a
            href={CREATOR_INFO.github}
            target="_blank"
            rel="noreferrer"
            className="rounded-xl border border-zinc-800 bg-zinc-950 p-2 text-zinc-400 hover:text-white transition-colors"
            title="GitHub"
          >
            <Github className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>

      {/* Top Stat Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-zinc-400 font-medium">Available Credits</span>
            <div className="rounded-lg bg-amber-500/10 p-1.5 text-amber-400">
              <Zap className="h-3.5 w-3.5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white tracking-tight">
              {subscription.creditsRemaining}
            </span>
            <span className="text-xs text-zinc-500">/ {subscription.creditsTotal} Total</span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-zinc-800 overflow-hidden">
            <div
              className="h-full bg-blue-500 rounded-full"
              style={{
                width: `${Math.min(100, (subscription.creditsRemaining / subscription.creditsTotal) * 100)}%`,
              }}
            />
          </div>
        </div>

        {/* Metric 2 */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-zinc-400 font-medium">Generations Created</span>
            <div className="rounded-lg bg-blue-500/10 p-1.5 text-blue-400">
              <FileText className="h-3.5 w-3.5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white tracking-tight">{history.length}</span>
            <span className="text-xs text-emerald-400 font-medium flex items-center gap-0.5">
              <TrendingUp className="h-3 w-3" /> Ready
            </span>
          </div>
          <p className="text-[11px] text-zinc-500">Articles, social copy &amp; code</p>
        </div>

        {/* Metric 3 */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-zinc-400 font-medium">Cloudinary Media</span>
            <div className="rounded-lg bg-sky-500/10 p-1.5 text-sky-400">
              <ImageIcon className="h-3.5 w-3.5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white tracking-tight">{assets.length}</span>
            <span className="text-xs text-sky-400 font-medium">Edge CDN</span>
          </div>
          <p className="text-[11px] text-zinc-500">Sub-100ms global delivery</p>
        </div>

        {/* Metric 4 */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-zinc-400 font-medium">Active Subscription</span>
            <div className="rounded-lg bg-emerald-500/10 p-1.5 text-emerald-400">
              <Sparkles className="h-3.5 w-3.5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white tracking-tight">{subscription.plan}</span>
            <Link
              href="/dashboard/billing"
              className="text-xs text-blue-400 hover:text-blue-300 font-medium"
            >
              Manage
            </Link>
          </div>
          <p className="text-[11px] text-zinc-500">Renews: {subscription.monthlyRenewalDate}</p>
        </div>
      </div>

      {/* Quick Access Tiles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link
          href="/dashboard/text-studio"
          className="group rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 hover:border-zinc-700 transition-all"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="h-9 w-9 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
              <FileText className="h-5 w-5" />
            </div>
            <ArrowUpRight className="h-4 w-4 text-zinc-500 group-hover:text-white transition-colors" />
          </div>
          <h3 className="font-bold text-white text-sm">AI Content &amp; Code Studio</h3>
          <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
            Generate articles, social threads, product copy, and clean code refactors with Gemini LLMs.
          </p>
        </Link>

        <Link
          href="/dashboard/media-studio"
          className="group rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 hover:border-zinc-700 transition-all"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="h-9 w-9 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center">
              <ImageIcon className="h-5 w-5" />
            </div>
            <ArrowUpRight className="h-4 w-4 text-zinc-500 group-hover:text-white transition-colors" />
          </div>
          <h3 className="font-bold text-white text-sm">Cloudinary Media Engine</h3>
          <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
            Edge image transformations (g_auto, f_auto, background removal) + Gemini Vision insights.
          </p>
        </Link>

        <Link
          href="/dashboard/creator"
          className="group rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 hover:border-zinc-700 transition-all"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="h-9 w-9 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <User className="h-5 w-5" />
            </div>
            <ArrowUpRight className="h-4 w-4 text-zinc-500 group-hover:text-white transition-colors" />
          </div>
          <h3 className="font-bold text-white text-sm">Palash&apos;s Engineering Hub</h3>
          <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
            Read Palash Tripathi&apos;s engineering decisions, portfolio projects, and connect directly.
          </p>
        </Link>
      </div>

      {/* Recent Activity */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-white">Recent Generations</h3>
          <Link
            href="/dashboard/text-studio"
            className="text-xs text-blue-400 hover:text-blue-300 font-medium"
          >
            Open Studio →
          </Link>
        </div>

        {history.length === 0 ? (
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-8 text-center text-zinc-500 text-xs">
            No generations produced yet. Start your first generation in the Studio.
          </div>
        ) : (
          <div className="space-y-2.5">
            {history.slice(0, 4).map((item) => (
              <div
                key={item.id}
                className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-4 flex flex-col md:flex-row md:items-center justify-between gap-3 hover:border-zinc-700 transition-colors"
              >
                <div className="space-y-1 max-w-2xl">
                  <div className="flex items-center gap-2">
                    <span className="rounded-md bg-zinc-800 px-2 py-0.5 text-[10px] font-mono text-zinc-300 uppercase">
                      {item.category}
                    </span>
                    <h4 className="text-xs font-bold text-white">{item.title}</h4>
                    <span className="text-[10px] text-zinc-500">· {formatDate(item.createdAt)}</span>
                  </div>
                  <p className="text-xs text-zinc-400">{truncateText(item.content, 120)}</p>
                </div>

                <div className="flex items-center gap-2 self-end md:self-auto">
                  <button
                    onClick={() => handleCopy(item.content, item.id)}
                    className="rounded-lg border border-zinc-800 bg-zinc-950 px-2.5 py-1 text-xs text-zinc-300 hover:text-white flex items-center gap-1"
                  >
                    {copiedId === item.id ? (
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
                    onClick={() => setSelectedGen(item)}
                    className="rounded-lg border border-zinc-800 bg-zinc-950 px-2.5 py-1 text-xs text-zinc-300 hover:text-white flex items-center gap-1"
                  >
                    <Eye className="h-3 w-3" />
                    <span>View</span>
                  </button>

                  <button
                    onClick={() => deleteGeneration(item.id)}
                    className="rounded-lg border border-zinc-800 bg-zinc-950 p-1 text-zinc-500 hover:text-rose-400"
                    title="Delete item"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedGen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-2xl rounded-2xl border border-zinc-800 bg-zinc-900 p-6 space-y-4 max-h-[85vh] flex flex-col shadow-2xl">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-white">{selectedGen.title}</h3>
                <p className="text-[11px] text-zinc-500">Generated: {formatDate(selectedGen.createdAt)}</p>
              </div>
              <button
                onClick={() => setSelectedGen(null)}
                className="text-zinc-400 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto whitespace-pre-wrap text-xs sm:text-sm text-zinc-200 font-mono bg-zinc-950 p-4 rounded-xl border border-zinc-800 leading-relaxed">
              {selectedGen.content}
            </div>

            <div className="flex items-center justify-between border-t border-zinc-800 pt-3">
              <button
                onClick={() => handleCopy(selectedGen.content, selectedGen.id)}
                className="rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-500 flex items-center gap-1.5"
              >
                <Copy className="h-3.5 w-3.5" /> Copy Full Output
              </button>
              <button
                onClick={() => setSelectedGen(null)}
                className="rounded-xl border border-zinc-800 px-4 py-2 text-xs text-zinc-300 hover:bg-zinc-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
