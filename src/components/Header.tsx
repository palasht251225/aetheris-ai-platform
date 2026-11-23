"use client";

import React from "react";
import Link from "next/link";
import { Zap, Sparkles, Key, CheckCircle2, User } from "lucide-react";
import { useApp } from "@/context/AppContext";

interface HeaderProps {
  title: string;
  description: string;
  actionText?: string;
  actionHref?: string;
  actionIcon?: React.ReactNode;
}

export default function Header({
  title,
  description,
  actionText,
  actionHref,
  actionIcon,
}: HeaderProps) {
  const { customApiKey } = useApp();

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-zinc-800 pb-5 mb-6 font-sans">
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">{title}</h1>
        </div>
        <p className="mt-1 text-xs text-zinc-400">{description}</p>
      </div>

      <div className="flex items-center gap-2.5">
        {/* API Status badge */}
        <Link
          href="/dashboard/settings"
          className="flex items-center gap-1.5 rounded-xl border border-zinc-800 bg-zinc-900/60 px-3 py-1.5 text-xs text-zinc-300 hover:border-zinc-700 transition-colors"
          title="Click to manage Gemini & Cloudinary API Keys"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          <span>{customApiKey ? "Custom Key Active" : "Gemini Engine Ready"}</span>
        </Link>

        {/* Action Button if specified */}
        {actionText && actionHref && (
          <Link
            href={actionHref}
            className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-blue-500 transition-all active:scale-95"
          >
            {actionIcon}
            <span>{actionText}</span>
          </Link>
        )}
      </div>
    </div>
  );
}
