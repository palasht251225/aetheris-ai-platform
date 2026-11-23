"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  User,
  Github,
  Linkedin,
  Mail,
  Phone,
  ExternalLink,
  GraduationCap,
  Briefcase,
  Code2,
  Cpu,
  Layers,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Send,
  Download,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CREATOR_INFO } from "@/data/creator";

export default function CreatorPage() {
  const [activeTab, setActiveTab] = useState<"projects" | "skills" | "philosophy" | "education">("projects");
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactName, setContactName] = useState("");
  const [contactMessage, setContactMessage] = useState("");

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSubmitted(true);
    setTimeout(() => {
      setContactSubmitted(false);
      setContactName("");
      setContactMessage("");
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans">
      <Navbar />

      {/* Top Background Glow */}
      <div className="relative pt-16 pb-20 overflow-hidden border-b border-zinc-800/80 bg-radial-vignette">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            {/* Left: Bio & Header */}
            <div className="space-y-4 max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold text-emerald-300">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>{CREATOR_INFO.status}</span>
              </div>

              <div className="space-y-1">
                <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
                  {CREATOR_INFO.name}
                </h1>
                <p className="text-base sm:text-lg font-medium text-blue-400">
                  {CREATOR_INFO.role}
                </p>
              </div>

              <p className="text-sm text-zinc-400 leading-relaxed">
                {CREATOR_INFO.bio}
              </p>

              {/* Contact & Social Links */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href={CREATOR_INFO.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900 px-3.5 py-2 text-xs font-semibold text-zinc-200 hover:border-zinc-700 hover:bg-zinc-800 transition-colors"
                >
                  <Github className="h-4 w-4" />
                  <span>GitHub</span>
                </a>

                <a
                  href={CREATOR_INFO.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900 px-3.5 py-2 text-xs font-semibold text-zinc-200 hover:border-zinc-700 hover:bg-zinc-800 transition-colors"
                >
                  <Linkedin className="h-4 w-4 text-blue-400" />
                  <span>LinkedIn</span>
                </a>

                <a
                  href={`mailto:${CREATOR_INFO.email}`}
                  className="inline-flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900 px-3.5 py-2 text-xs font-semibold text-zinc-200 hover:border-zinc-700 hover:bg-zinc-800 transition-colors"
                >
                  <Mail className="h-4 w-4 text-emerald-400" />
                  <span>{CREATOR_INFO.email}</span>
                </a>

                <span className="inline-flex items-center gap-1.5 rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-2 text-xs text-zinc-400">
                  <Phone className="h-3.5 w-3.5" />
                  <span>{CREATOR_INFO.phone}</span>
                </span>
              </div>
            </div>

            {/* Right: Quick Highlights Card */}
            <div className="w-full md:w-80 rounded-2xl border border-zinc-800/80 bg-zinc-900/60 p-5 space-y-4">
              <div className="flex items-center gap-2 border-b border-zinc-800 pb-3">
                <div className="h-8 w-8 rounded-lg bg-blue-600/20 text-blue-400 flex items-center justify-center font-bold text-sm">
                  PT
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Palash Tripathi</h3>
                  <p className="text-[11px] text-zinc-400">B.Tech (CSE - AIML)</p>
                </div>
              </div>

              <div className="space-y-2.5 text-xs text-zinc-300">
                <div className="flex items-center justify-between">
                  <span className="text-zinc-500">Institution:</span>
                  <span className="font-medium text-right text-zinc-200">Galgotias College (GCET)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-zinc-500">Schooling:</span>
                  <span className="font-medium text-zinc-200">KV IIT Kanpur</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-zinc-500">Flagship Project:</span>
                  <span className="font-medium text-emerald-400">Aetheris AI Platform</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-zinc-500">Focus Areas:</span>
                  <span className="font-medium text-zinc-200">LLM APIs · Edge CDN · CNNs</span>
                </div>
              </div>

              <div className="pt-2 border-t border-zinc-800">
                <Link
                  href="/dashboard"
                  className="w-full rounded-xl bg-blue-600 hover:bg-blue-500 py-2.5 text-xs font-semibold text-white transition-colors flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20"
                >
                  <span>Launch Palash&apos;s AI Studio</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Body Section */}
      <main className="flex-1 py-12 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-10">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-zinc-800 pb-3 overflow-x-auto text-xs font-medium">
          <button
            onClick={() => setActiveTab("projects")}
            className={`rounded-xl px-4 py-2 transition-all ${
              activeTab === "projects"
                ? "bg-zinc-800 text-white font-semibold shadow-sm"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            Featured Engineering Projects
          </button>
          <button
            onClick={() => setActiveTab("skills")}
            className={`rounded-xl px-4 py-2 transition-all ${
              activeTab === "skills"
                ? "bg-zinc-800 text-white font-semibold shadow-sm"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            Technical Stack & Tools
          </button>
          <button
            onClick={() => setActiveTab("philosophy")}
            className={`rounded-xl px-4 py-2 transition-all ${
              activeTab === "philosophy"
                ? "bg-zinc-800 text-white font-semibold shadow-sm"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            Engineering Philosophy
          </button>
          <button
            onClick={() => setActiveTab("education")}
            className={`rounded-xl px-4 py-2 transition-all ${
              activeTab === "education"
                ? "bg-zinc-800 text-white font-semibold shadow-sm"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            Education & Leadership
          </button>
        </div>

        {/* Tab 1: Featured Projects */}
        {activeTab === "projects" && (
          <div className="space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-white">Selected Engineering Projects</h2>
              <p className="text-xs text-zinc-400">
                End-to-end applications designed, built, and evaluated by Palash Tripathi.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {CREATOR_INFO.projects.map((proj, idx) => (
                <div
                  key={idx}
                  className={`rounded-2xl border p-6 flex flex-col justify-between space-y-5 transition-all ${
                    proj.highlight
                      ? "border-blue-500/40 bg-zinc-900/80 shadow-lg shadow-blue-500/5 ring-1 ring-blue-500/20"
                      : "border-zinc-800 bg-zinc-900/40 hover:border-zinc-700"
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-semibold text-blue-400 uppercase tracking-wider">
                        {proj.category}
                      </span>
                      <span className="rounded-md bg-zinc-800 px-2 py-0.5 text-[10px] text-zinc-400 font-mono">
                        {proj.year}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-white">{proj.title}</h3>

                    <p className="text-xs text-zinc-300 leading-relaxed font-medium">
                      {proj.objective}
                    </p>

                    <div className="space-y-1.5 pt-2 border-t border-zinc-800/80">
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
                        Technical Approach:
                      </span>
                      <ul className="space-y-1 text-xs text-zinc-400">
                        {proj.approach.map((item, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="text-blue-400 shrink-0 mt-0.5">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-1.5 pt-2 border-t border-zinc-800/80">
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-emerald-400">
                        Measurable Results:
                      </span>
                      <ul className="space-y-1 text-xs text-zinc-300">
                        {proj.results.map((res, i) => (
                          <li key={i} className="flex items-start gap-1.5 font-medium">
                            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                            <span>{res}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-zinc-800/80">
                    {proj.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md bg-zinc-800/80 px-2 py-0.5 text-[10px] text-zinc-300 font-mono"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Skills & Tooling */}
        {activeTab === "skills" && (
          <div className="space-y-8">
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-white">Technical Arsenal</h2>
              <p className="text-xs text-zinc-400">
                Core competencies developed across rigorous academic coursework and hands-on system building.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* AI & ML */}
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 space-y-4">
                <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
                  <Sparkles className="h-4 w-4" />
                  <span>AI, ML & Computer Vision</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {CREATOR_INFO.skills.ai_ml.map((s) => (
                    <span
                      key={s}
                      className="rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-1.5 text-xs text-zinc-200"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Full-Stack & Cloud */}
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 space-y-4">
                <div className="flex items-center gap-2 text-blue-400 font-semibold text-sm">
                  <Layers className="h-4 w-4" />
                  <span>Full-Stack & Cloud Media</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {CREATOR_INFO.skills.fullstack_cloud.map((s) => (
                    <span
                      key={s}
                      className="rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-1.5 text-xs text-zinc-200"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Programming Languages */}
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 space-y-4">
                <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm">
                  <Code2 className="h-4 w-4" />
                  <span>Languages & Databases</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {CREATOR_INFO.skills.languages.map((s) => (
                    <span
                      key={s}
                      className="rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-1.5 text-xs text-zinc-200 font-mono"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Philosophy */}
        {activeTab === "philosophy" && (
          <div className="space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-white">How Palash Builds Systems</h2>
              <p className="text-xs text-zinc-400">
                Core principles guiding architecture, tool selection, and performance optimization.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {CREATOR_INFO.engineeringPhilosophy.map((phil, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 space-y-2 hover:border-zinc-700 transition-colors"
                >
                  <h3 className="font-bold text-white text-base flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400 text-xs">
                      {idx + 1}
                    </span>
                    <span>{phil.title}</span>
                  </h3>
                  <p className="text-xs text-zinc-400 leading-relaxed pl-8">
                    {phil.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Education & Leadership */}
        {activeTab === "education" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Education */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-blue-400" />
                <span>Academic Journey</span>
              </h2>

              <div className="space-y-4">
                {CREATOR_INFO.education.map((edu, idx) => (
                  <div
                    key={idx}
                    className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4 space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-white text-sm">{edu.degree}</h4>
                      <span className="text-[10px] text-zinc-500 font-mono">{edu.period}</span>
                    </div>
                    <p className="text-xs text-blue-400">{edu.institution}</p>
                    <p className="text-xs text-zinc-400 mt-1">{edu.details}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Leadership */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-emerald-400" />
                <span>Leadership & Initiatives</span>
              </h2>

              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-white text-sm">{CREATOR_INFO.leadership.role}</h4>
                  <span className="text-[10px] text-zinc-500 font-mono">
                    {CREATOR_INFO.leadership.period}
                  </span>
                </div>
                <p className="text-xs text-emerald-400">{CREATOR_INFO.leadership.organization}</p>
                <ul className="space-y-2 text-xs text-zinc-400 pt-2 border-t border-zinc-800">
                  {CREATOR_INFO.leadership.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-emerald-400 shrink-0 mt-0.5">•</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Direct message card */}
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-5 space-y-3">
                <h4 className="font-bold text-white text-sm">Send a Message to Palash</h4>
                <p className="text-xs text-zinc-400">
                  Interested in collaborating, recruiting, or reviewing the platform architecture?
                </p>

                {contactSubmitted ? (
                  <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-xs text-emerald-300 flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Message received! Palash will get back to you shortly.</span>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-2.5">
                    <input
                      type="text"
                      required
                      placeholder="Your Name / Organization"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-blue-500"
                    />
                    <textarea
                      required
                      rows={2}
                      placeholder="Your message or project scope..."
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-blue-500 resize-none"
                    />
                    <button
                      type="submit"
                      className="w-full rounded-xl bg-blue-600 hover:bg-blue-500 py-2 text-xs font-semibold text-white transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Send className="h-3 w-3" />
                      <span>Send Message</span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
