"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  User,
  Github,
  Linkedin,
  Mail,
  Phone,
  GraduationCap,
  Briefcase,
  Code2,
  CheckCircle2,
  Sparkles,
  ArrowUpRight,
  Send,
  Layers,
  ShieldCheck,
} from "lucide-react";
import Header from "@/components/Header";
import { CREATOR_INFO } from "@/data/creator";

export default function DashboardCreatorPage() {
  const [activeTab, setActiveTab] = useState<"projects" | "skills" | "philosophy">("projects");
  const [sent, setSent] = useState(false);
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setName("");
      setMsg("");
    }, 4000);
  };

  return (
    <div className="space-y-8 font-sans">
      <Header
        title="Meet the Developer — Palash Tripathi"
        description="The engineer behind Aetheris: architecture overview, tech stack, and portfolio projects."
        actionText="Public Profile"
        actionHref="/creator"
        actionIcon={<ArrowUpRight className="h-4 w-4" />}
      />

      {/* Hero Bio Card */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 md:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-600 to-emerald-500 text-white font-extrabold text-2xl shadow-xl shadow-blue-500/10">
              PT
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-bold text-white">{CREATOR_INFO.name}</h2>
                <span className="rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-400">
                  Creator & Architect
                </span>
              </div>
              <p className="text-xs text-blue-400 font-medium">{CREATOR_INFO.role}</p>
              <p className="text-[11px] text-zinc-400">Galgotias College of Engineering & Technology (B.Tech CSE - AIML)</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <a
              href={CREATOR_INFO.github}
              target="_blank"
              rel="noreferrer"
              className="rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-1.5 text-xs text-zinc-300 hover:text-white flex items-center gap-1.5 transition-colors"
            >
              <Github className="h-3.5 w-3.5" /> GitHub
            </a>
            <a
              href={CREATOR_INFO.linkedin}
              target="_blank"
              rel="noreferrer"
              className="rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-1.5 text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1.5 transition-colors"
            >
              <Linkedin className="h-3.5 w-3.5" /> LinkedIn
            </a>
            <a
              href={`mailto:${CREATOR_INFO.email}`}
              className="rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-1.5 text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1.5 transition-colors"
            >
              <Mail className="h-3.5 w-3.5" /> Email
            </a>
          </div>
        </div>

        <p className="text-xs text-zinc-300 leading-relaxed border-t border-zinc-800 pt-4">
          {CREATOR_INFO.bio}
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-zinc-800 pb-2 text-xs">
        <button
          onClick={() => setActiveTab("projects")}
          className={`rounded-xl px-3.5 py-1.5 font-medium transition-all ${
            activeTab === "projects"
              ? "bg-zinc-800 text-white font-semibold"
              : "text-zinc-400 hover:text-white"
          }`}
        >
          All Key Projects ({CREATOR_INFO.projects.length})
        </button>
        <button
          onClick={() => setActiveTab("skills")}
          className={`rounded-xl px-3.5 py-1.5 font-medium transition-all ${
            activeTab === "skills"
              ? "bg-zinc-800 text-white font-semibold"
              : "text-zinc-400 hover:text-white"
          }`}
        >
          Technical Skills & Stack
        </button>
        <button
          onClick={() => setActiveTab("philosophy")}
          className={`rounded-xl px-3.5 py-1.5 font-medium transition-all ${
            activeTab === "philosophy"
              ? "bg-zinc-800 text-white font-semibold"
              : "text-zinc-400 hover:text-white"
          }`}
        >
          Engineering Decisions
        </button>
      </div>

      {/* Projects view */}
      {activeTab === "projects" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {CREATOR_INFO.projects.map((proj, idx) => (
            <div
              key={idx}
              className={`rounded-2xl border p-5 space-y-3.5 ${
                proj.highlight
                  ? "border-blue-500/30 bg-zinc-900/80"
                  : "border-zinc-800 bg-zinc-900/40"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-semibold text-blue-400 uppercase tracking-wider">
                  {proj.category}
                </span>
                <span className="text-[10px] text-zinc-500 font-mono">{proj.year}</span>
              </div>
              <h3 className="font-bold text-white text-base">{proj.title}</h3>
              <p className="text-xs text-zinc-300">{proj.objective}</p>

              <div className="space-y-1 text-xs text-zinc-400">
                <span className="text-[10px] font-semibold text-zinc-500 uppercase">Highlights:</span>
                {proj.results.map((r, i) => (
                  <div key={i} className="flex items-start gap-1.5 text-zinc-300">
                    <CheckCircle2 className="h-3 w-3 text-emerald-400 mt-0.5 shrink-0" />
                    <span>{r}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-1 pt-2">
                {proj.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-md bg-zinc-800 px-2 py-0.5 text-[10px] text-zinc-400 font-mono"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Skills view */}
      {activeTab === "skills" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5 space-y-3">
            <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5" /> AI & Machine Learning
            </span>
            <div className="flex flex-wrap gap-1.5">
              {CREATOR_INFO.skills.ai_ml.map((s) => (
                <span key={s} className="rounded-lg bg-zinc-950 border border-zinc-800 px-2.5 py-1 text-xs text-zinc-200">
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5 space-y-3">
            <span className="text-xs font-semibold text-blue-400 flex items-center gap-1.5">
              <Layers className="h-3.5 w-3.5" /> Full-Stack & Cloud
            </span>
            <div className="flex flex-wrap gap-1.5">
              {CREATOR_INFO.skills.fullstack_cloud.map((s) => (
                <span key={s} className="rounded-lg bg-zinc-950 border border-zinc-800 px-2.5 py-1 text-xs text-zinc-200">
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5 space-y-3">
            <span className="text-xs font-semibold text-amber-400 flex items-center gap-1.5">
              <Code2 className="h-3.5 w-3.5" /> Languages
            </span>
            <div className="flex flex-wrap gap-1.5">
              {CREATOR_INFO.skills.languages.map((s) => (
                <span key={s} className="rounded-lg bg-zinc-950 border border-zinc-800 px-2.5 py-1 text-xs text-zinc-200 font-mono">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Philosophy view */}
      {activeTab === "philosophy" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {CREATOR_INFO.engineeringPhilosophy.map((p, idx) => (
            <div key={idx} className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4 space-y-1.5">
              <h4 className="font-semibold text-white text-sm flex items-center gap-2">
                <span className="text-blue-400 font-mono text-xs">0{idx + 1}.</span>
                {p.title}
              </h4>
              <p className="text-xs text-zinc-400 leading-relaxed pl-5">{p.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* Send message card */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 space-y-3">
        <h3 className="text-sm font-semibold text-white">Get in Touch with Palash</h3>
        <p className="text-xs text-zinc-400">
          Have questions regarding the architecture, code review, or potential collaboration? Send a note directly.
        </p>

        {sent ? (
          <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-xs text-emerald-300 flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4" />
            <span>Thank you! Palash has received your inquiry.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2.5 pt-1">
            <input
              type="text"
              required
              placeholder="Your name or company..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="flex-1 rounded-xl border border-zinc-800 bg-zinc-950 px-3.5 py-2 text-xs text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-blue-500"
            />
            <input
              type="text"
              required
              placeholder="Message or inquiry..."
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              className="flex-1 sm:flex-[2] rounded-xl border border-zinc-800 bg-zinc-950 px-3.5 py-2 text-xs text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-blue-500"
            />
            <button
              type="submit"
              className="rounded-xl bg-blue-600 hover:bg-blue-500 px-5 py-2 text-xs font-semibold text-white transition-colors flex items-center justify-center gap-1.5"
            >
              <Send className="h-3 w-3" /> Send
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
