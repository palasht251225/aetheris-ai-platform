"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Image as ImageIcon,
  MessageSquare,
  CreditCard,
  Settings,
  Sparkles,
  Zap,
  ChevronRight,
  User,
  Github,
  Linkedin,
} from "lucide-react";
import { useApp } from "@/context/AppContext";
import { CREATOR_INFO } from "@/data/creator";

const navigationItems = [
  {
    name: "Overview",
    href: "/dashboard",
    icon: LayoutDashboard,
    badge: null,
  },
  {
    name: "AI Content Studio",
    href: "/dashboard/text-studio",
    icon: FileText,
    badge: "LLM",
  },
  {
    name: "Cloudinary Media",
    href: "/dashboard/media-studio",
    icon: ImageIcon,
    badge: "CDN",
  },
  {
    name: "AI Smart Assistant",
    href: "/dashboard/chat",
    icon: MessageSquare,
    badge: null,
  },
  {
    name: "Meet the Developer",
    href: "/dashboard/creator",
    icon: User,
    badge: "Palash",
  },
  {
    name: "Billing & Credits",
    href: "/dashboard/billing",
    icon: CreditCard,
    badge: "Refill",
  },
  {
    name: "API & Settings",
    href: "/dashboard/settings",
    icon: Settings,
    badge: null,
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { subscription } = useApp();

  const creditPercentage = Math.min(
    100,
    Math.round((subscription.creditsRemaining / subscription.creditsTotal) * 100)
  );

  return (
    <aside className="w-64 border-r border-zinc-800 bg-zinc-950 flex flex-col justify-between h-[calc(100vh-61px)] sticky top-[61px] font-sans">
      <div className="p-4 space-y-6">
        {/* Navigation list */}
        <div className="space-y-1">
          <p className="px-3 text-[10px] font-semibold uppercase tracking-wider text-zinc-400 mb-2">
            Navigation
          </p>
          {navigationItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group flex items-center justify-between rounded-xl px-3 py-2 text-xs font-medium transition-all ${
                  isActive
                    ? "bg-zinc-800 text-white font-semibold shadow-sm"
                    : "text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon
                    className={`h-4 w-4 transition-colors ${
                      isActive ? "text-blue-400" : "text-zinc-400 group-hover:text-zinc-200"
                    }`}
                  />
                  <span>{item.name}</span>
                </div>
                {item.badge && (
                  <span
                    className={`rounded-full px-2 py-0.5 text-[9px] font-semibold ${
                      item.badge === "Palash"
                        ? "bg-emerald-500/20 text-emerald-300"
                        : isActive
                        ? "bg-zinc-700 text-zinc-200"
                        : "bg-zinc-900 text-zinc-400"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        {/* Live Credit Meter Widget */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-4 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-medium text-zinc-300 flex items-center gap-1.5">
              <Zap className="h-3.5 w-3.5 text-amber-400" /> Balance
            </span>
            <span className="font-bold text-white">
              {subscription.creditsRemaining}{" "}
              <span className="text-zinc-400 font-normal">/ {subscription.creditsTotal}</span>
            </span>
          </div>

          <div className="h-1.5 w-full overflow-hidden rounded-full bg-zinc-800">
            <div
              className="h-full bg-blue-500 rounded-full transition-all duration-500"
              style={{ width: `${creditPercentage}%` }}
            />
          </div>

          <Link
            href="/dashboard/billing"
            className="flex items-center justify-between text-[11px] font-medium text-blue-400 hover:text-blue-300 transition-colors"
          >
            <span>Top up balance</span>
            <ChevronRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>

      {/* Developer Byline Footer Card */}
      <div className="p-4 border-t border-zinc-800/80">
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-3 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-md bg-blue-600/20 text-blue-400 font-bold text-[10px] flex items-center justify-center">
                PT
              </div>
              <div>
                <p className="text-xs font-bold text-white">{CREATOR_INFO.name}</p>
                <p className="text-[10px] text-zinc-400">Creator &amp; Lead</p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-zinc-400">
              <a
                href={CREATOR_INFO.github}
                target="_blank"
                rel="noreferrer"
                className="hover:text-white"
                title="GitHub"
              >
                <Github className="h-3.5 w-3.5" />
              </a>
              <a
                href={CREATOR_INFO.linkedin}
                target="_blank"
                rel="noreferrer"
                className="hover:text-blue-400"
                title="LinkedIn"
              >
                <Linkedin className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
          <Link
            href="/creator"
            className="block text-center text-[10px] text-blue-400 hover:text-blue-300 font-medium"
          >
            View Full Developer Portfolio →
          </Link>
        </div>
      </div>
    </aside>
  );
}
