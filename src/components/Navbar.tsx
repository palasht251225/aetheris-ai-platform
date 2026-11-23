"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sparkles, Image as ImageIcon, Zap, Menu, X, ArrowRight, User } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { CREATOR_INFO } from "@/data/creator";

export default function Navbar() {
  const { subscription } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-zinc-800/80 bg-zinc-950/85 backdrop-blur-xl font-sans">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Brand Logo & Creator Byline */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 via-sky-500 to-emerald-400 text-white font-black text-sm shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
            Æ
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-base tracking-tight text-white">Aetheris<span className="text-blue-400">.ai</span></span>
              <span className="rounded-full bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 text-[9px] font-semibold text-blue-400">
                FRONTIER
              </span>
            </div>
            <p className="text-[10px] text-zinc-400">Engineered by {CREATOR_INFO.name}</p>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-6 text-xs font-medium text-zinc-300">
          <Link href="/dashboard" className="hover:text-white transition-colors">
            Dashboard
          </Link>
          <Link href="/dashboard/text-studio" className="hover:text-white transition-colors flex items-center gap-1.5">
            <Zap className="h-3.5 w-3.5 text-amber-400" />
            AI Writer
          </Link>
          <Link href="/dashboard/media-studio" className="hover:text-white transition-colors flex items-center gap-1.5">
            <ImageIcon className="h-3.5 w-3.5 text-sky-400" />
            Cloudinary Studio
          </Link>
          <Link href="/dashboard/chat" className="hover:text-white transition-colors">
            Assistant
          </Link>
          <Link href="/dashboard/billing" className="hover:text-white transition-colors">
            Pricing
          </Link>
          <Link
            href="/creator"
            className="flex items-center gap-1.5 rounded-full border border-zinc-800 bg-zinc-900 px-3 py-1 text-zinc-200 hover:border-zinc-700 hover:text-white transition-all"
          >
            <User className="h-3.5 w-3.5 text-emerald-400" />
            <span>About Palash</span>
          </Link>
        </div>

        {/* Right Actions */}
        <div className="hidden md:flex items-center gap-3">
          <div className="flex items-center gap-1.5 rounded-full bg-zinc-900 border border-zinc-800 px-3 py-1 text-xs text-zinc-300">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400" />
            <span className="font-semibold text-white">{subscription.creditsRemaining}</span>
            <span className="text-zinc-500">credits</span>
          </div>

          <Link
            href="/dashboard"
            className="group relative inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-md shadow-blue-600/20 hover:bg-blue-500 transition-all active:scale-95"
          >
            <span>Launch Studio</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden rounded-lg p-2 text-zinc-400 hover:bg-zinc-900 hover:text-white"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-zinc-800 bg-zinc-950/95 px-4 pt-3 pb-5 space-y-2 text-xs">
          <Link
            href="/dashboard"
            onClick={() => setMobileMenuOpen(false)}
            className="block rounded-lg px-3 py-2 font-medium text-zinc-200 hover:bg-zinc-900"
          >
            Dashboard Overview
          </Link>
          <Link
            href="/dashboard/text-studio"
            onClick={() => setMobileMenuOpen(false)}
            className="block rounded-lg px-3 py-2 font-medium text-zinc-200 hover:bg-zinc-900"
          >
            AI Content Studio
          </Link>
          <Link
            href="/dashboard/media-studio"
            onClick={() => setMobileMenuOpen(false)}
            className="block rounded-lg px-3 py-2 font-medium text-zinc-200 hover:bg-zinc-900"
          >
            Cloudinary Media Studio
          </Link>
          <Link
            href="/dashboard/chat"
            onClick={() => setMobileMenuOpen(false)}
            className="block rounded-lg px-3 py-2 font-medium text-zinc-200 hover:bg-zinc-900"
          >
            AI Assistant Chat
          </Link>
          <Link
            href="/creator"
            onClick={() => setMobileMenuOpen(false)}
            className="block rounded-lg px-3 py-2 font-medium text-emerald-400 hover:bg-zinc-900"
          >
            About Palash Tripathi (Creator)
          </Link>
          <Link
            href="/dashboard/billing"
            onClick={() => setMobileMenuOpen(false)}
            className="block rounded-lg px-3 py-2 font-medium text-zinc-200 hover:bg-zinc-900"
          >
            Pricing &amp; Credits
          </Link>
        </div>
      )}
    </nav>
  );
}
