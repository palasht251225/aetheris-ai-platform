import React from "react";
import Link from "next/link";
import { Github, Linkedin, Mail, Phone, Heart, Code2, Cloud, Sparkles, User } from "lucide-react";
import { CREATOR_INFO } from "@/data/creator";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-zinc-950 py-12 text-zinc-400 font-sans text-xs">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand & Creator Bio */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-tr from-blue-600 to-sky-400 text-white font-black text-xs">
                Æ
              </div>
              <span className="font-bold text-base text-white">Aetheris<span className="text-blue-400">.ai</span></span>
            </div>
            <p className="text-xs leading-relaxed text-zinc-400">
              A frontier AI SaaS platform integrating Google Gemini LLMs, Next.js 14, React 18, Node.js API handlers, and Cloudinary edge media processing.
            </p>
            <p className="text-[11px] text-zinc-400">
              Designed &amp; engineered by <strong className="text-zinc-200">{CREATOR_INFO.name}</strong>.
            </p>
          </div>

          {/* Quick Studio Links */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-200">AI Modules</h4>
            <ul className="space-y-1.5 text-zinc-400">
              <li><Link href="/dashboard/text-studio" className="hover:text-white transition-colors">AI Content Generator</Link></li>
              <li><Link href="/dashboard/chat" className="hover:text-white transition-colors">Strategy Copilot</Link></li>
              <li><Link href="/dashboard/text-studio" className="hover:text-white transition-colors">Code Architect</Link></li>
              <li><Link href="/dashboard/media-studio" className="hover:text-white transition-colors">Gemini Vision AI</Link></li>
            </ul>
          </div>

          {/* Cloudinary Suite */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-200">Cloudinary Edge CDN</h4>
            <ul className="space-y-1.5 text-zinc-400">
              <li><Link href="/dashboard/media-studio" className="hover:text-white transition-colors">Smart Saliency Cropping</Link></li>
              <li><Link href="/dashboard/media-studio" className="hover:text-white transition-colors">Auto AVIF / WebP Delivery</Link></li>
              <li><Link href="/dashboard/media-studio" className="hover:text-white transition-colors">Dynamic URL Transformations</Link></li>
              <li><Link href="/dashboard/media-studio" className="hover:text-white transition-colors">Background Removal</Link></li>
            </ul>
          </div>

          {/* Creator Profile & Contacts */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-200">About the Developer</h4>
            <p className="text-xs text-zinc-400">
              {CREATOR_INFO.name} · B.Tech (AIML)
              <br />Galgotias College of Engg &amp; Tech
            </p>
            <div className="flex items-center gap-3 pt-1">
              <a
                href={CREATOR_INFO.github}
                target="_blank"
                rel="noreferrer"
                className="text-zinc-400 hover:text-white transition-colors"
                title="GitHub"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href={CREATOR_INFO.linkedin}
                target="_blank"
                rel="noreferrer"
                className="text-zinc-400 hover:text-blue-400 transition-colors"
                title="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href={`mailto:${CREATOR_INFO.email}`}
                className="text-zinc-400 hover:text-emerald-400 transition-colors"
                title="Email"
              >
                <Mail className="h-4 w-4" />
              </a>
              <Link
                href="/creator"
                className="text-blue-400 hover:text-blue-300 font-medium ml-1"
              >
                Portfolio →
              </Link>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between border-t border-zinc-900 pt-6 text-[11px] text-zinc-400">
          <p>© 2026 Aetheris. Engineered by Palash Tripathi.</p>
          <div className="flex items-center gap-3 mt-3 sm:mt-0 text-zinc-400">
            <span>Next.js 14</span>
            <span>•</span>
            <span>Gemini LLM</span>
            <span>•</span>
            <span>Cloudinary</span>
            <span>•</span>
            <span>Node.js</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
