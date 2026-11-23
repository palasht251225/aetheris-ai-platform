"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import {
  CreditCard,
  Zap,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Receipt,
  Check,
} from "lucide-react";
import Header from "@/components/Header";
import { useApp } from "@/context/AppContext";

export default function BillingPage() {
  const { subscription, addCredits, upgradePlan } = useApp();
  const [isProcessing, setIsProcessing] = useState(false);
  const [successNotice, setSuccessNotice] = useState<string | null>(null);

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
      });
    } catch (e) {
      // safe fallback if canvas is unavailable
    }
  };

  const handleRefillCredits = (amount: number, price: string) => {
    setIsProcessing(true);
    setSuccessNotice(null);

    setTimeout(() => {
      addCredits(amount);
      setIsProcessing(false);
      setSuccessNotice(`Successfully recharged account with ${amount} credits!`);
      triggerConfetti();
      setTimeout(() => setSuccessNotice(null), 4000);
    }, 600);
  };

  const handleSelectPlan = (plan: "Free" | "Pro" | "Enterprise") => {
    setIsProcessing(true);
    setSuccessNotice(null);

    setTimeout(() => {
      upgradePlan(plan);
      setIsProcessing(false);
      setSuccessNotice(`Successfully upgraded to the ${plan} tier!`);
      triggerConfetti();
      setTimeout(() => setSuccessNotice(null), 4000);
    }, 700);
  };

  return (
    <div className="space-y-8">
      <Header
        title="Subscription Plans & Credit Metering"
        description="Manage your SaaS subscription tier, purchase additional generation credits, and review invoicing."
      />

      {successNotice && (
        <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-xs font-semibold text-emerald-300 flex items-center gap-2 animate-fade-in">
          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          <span>{successNotice}</span>
        </div>
      )}

      {/* Current Subscription Status Card */}
      <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold uppercase tracking-wider text-slate-400">
                Active Tier
              </span>
              <span className="rounded-full bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-0.5 text-xs font-bold text-indigo-400">
                {subscription.plan} Plan
              </span>
            </div>
            <p className="mt-1 text-2xl font-bold text-white">
              {subscription.creditsRemaining}{" "}
              <span className="text-sm font-normal text-slate-400">
                credits available of {subscription.creditsTotal}
              </span>
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span>Next automatic renewal:</span>
            <span className="font-semibold text-white">{subscription.monthlyRenewalDate}</span>
          </div>
        </div>

        {/* Feature inclusions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-2">
          {subscription.activeFeatures.map((feat, idx) => (
            <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
              <Check className="h-3.5 w-3.5 text-indigo-400 shrink-0" />
              <span>{feat}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Subscription Tiers Grid */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-white">Choose Your Growth Plan</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Free Tier */}
          <div
            className={`rounded-2xl border p-6 flex flex-col justify-between space-y-6 transition-all ${
              subscription.plan === "Free"
                ? "border-indigo-500/50 bg-slate-900/80 shadow-lg shadow-indigo-500/5"
                : "border-slate-800 bg-slate-900/40 hover:border-slate-700"
            }`}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-white">Starter Free</h3>
                {subscription.plan === "Free" && (
                  <span className="rounded-full bg-slate-800 px-2.5 py-0.5 text-[10px] font-semibold text-slate-300">
                    Current
                  </span>
                )}
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-extrabold text-white">$0</span>
                <span className="text-xs text-slate-400">/month</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Ideal for testing generative AI tools and exploring Cloudinary transformations.
              </p>

              <ul className="space-y-2.5 text-xs text-slate-300 pt-2 border-t border-slate-800/80">
                <li className="flex items-center gap-2">
                  <Check className="h-3.5 w-3.5 text-indigo-400" />
                  <span>100 Credits per month</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-3.5 w-3.5 text-indigo-400" />
                  <span>Gemini 1.5 Flash text models</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-3.5 w-3.5 text-indigo-400" />
                  <span>Standard Cloudinary image CDN</span>
                </li>
                <li className="flex items-center gap-2 text-slate-500">
                  <span>✕ Priority streaming speed</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => handleSelectPlan("Free")}
              disabled={subscription.plan === "Free" || isProcessing}
              className="w-full rounded-xl border border-slate-700 bg-slate-800/60 py-2.5 text-xs font-semibold text-white hover:bg-slate-800 transition-colors disabled:opacity-40"
            >
              {subscription.plan === "Free" ? "Active Plan" : "Downgrade to Free"}
            </button>
          </div>

          {/* Pro Tier (Featured) */}
          <div
            className={`relative rounded-2xl border p-6 flex flex-col justify-between space-y-6 transition-all ${
              subscription.plan === "Pro"
                ? "border-indigo-500 bg-gradient-to-b from-indigo-950/40 to-slate-900 shadow-xl shadow-indigo-500/20"
                : "border-indigo-500/50 bg-gradient-to-b from-slate-900 to-slate-950 hover:border-indigo-400"
            }`}
          >
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-indigo-500 to-pink-500 px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-md">
              Most Popular
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-white">Pro Creator</h3>
                {subscription.plan === "Pro" && (
                  <span className="rounded-full bg-indigo-500/20 text-indigo-300 px-2.5 py-0.5 text-[10px] font-semibold">
                    Current
                  </span>
                )}
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-extrabold text-white">$29</span>
                <span className="text-xs text-slate-400">/month</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                For power users, content creators, and developers requiring high-volume generation.
              </p>

              <ul className="space-y-2.5 text-xs text-slate-300 pt-2 border-t border-slate-800/80">
                <li className="flex items-center gap-2">
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                  <span className="font-semibold text-white">1,000 Credits per month</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                  <span>Unlimited Gemini LLM & Vision requests</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                  <span>Cloudinary AI Background Removal</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                  <span>Smart Saliency Cropping & AVIF delivery</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                  <span>Priority streaming API latency</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => handleSelectPlan("Pro")}
              disabled={subscription.plan === "Pro" || isProcessing}
              className="w-full rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-600 py-2.5 text-xs font-semibold text-white shadow-lg shadow-indigo-600/30 hover:from-indigo-400 hover:to-indigo-500 transition-all disabled:opacity-40"
            >
              {subscription.plan === "Pro" ? "Active Plan" : "Upgrade to Pro ($29/mo)"}
            </button>
          </div>

          {/* Enterprise Tier */}
          <div
            className={`rounded-2xl border p-6 flex flex-col justify-between space-y-6 transition-all ${
              subscription.plan === "Enterprise"
                ? "border-pink-500/50 bg-slate-900/80 shadow-lg"
                : "border-slate-800 bg-slate-900/40 hover:border-slate-700"
            }`}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-white">Scale Enterprise</h3>
                {subscription.plan === "Enterprise" && (
                  <span className="rounded-full bg-slate-800 px-2.5 py-0.5 text-[10px] font-semibold text-slate-300">
                    Current
                  </span>
                )}
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-extrabold text-white">$99</span>
                <span className="text-xs text-slate-400">/month</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Maximum throughput, dedicated Cloudinary account isolation, and team controls.
              </p>

              <ul className="space-y-2.5 text-xs text-slate-300 pt-2 border-t border-slate-800/80">
                <li className="flex items-center gap-2">
                  <Check className="h-3.5 w-3.5 text-pink-400" />
                  <span className="font-semibold text-white">5,000 Credits per month</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-3.5 w-3.5 text-pink-400" />
                  <span>Custom Cloudinary domain CNAME mapping</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-3.5 w-3.5 text-pink-400" />
                  <span>Fine-tuned LLM system instructions</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-3.5 w-3.5 text-pink-400" />
                  <span>Dedicated Slack & 99.9% uptime SLA</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => handleSelectPlan("Enterprise")}
              disabled={subscription.plan === "Enterprise" || isProcessing}
              className="w-full rounded-xl border border-pink-500/30 bg-pink-500/10 py-2.5 text-xs font-semibold text-pink-300 hover:bg-pink-500/20 transition-colors disabled:opacity-40"
            >
              {subscription.plan === "Enterprise" ? "Active Plan" : "Upgrade to Enterprise ($99/mo)"}
            </button>
          </div>
        </div>
      </div>

      {/* Credit Refill Packs */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-white">Instant Credit Refill Packs</h2>
        <p className="text-xs text-slate-400">
          Need a one-time boost without changing your subscription? Top up immediately.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 flex items-center justify-between">
            <div>
              <span className="text-sm font-bold text-white">+100 Credits</span>
              <p className="text-xs text-slate-400">$5.00 one-time</p>
            </div>
            <button
              onClick={() => handleRefillCredits(100, "$5.00")}
              disabled={isProcessing}
              className="rounded-lg bg-indigo-600 px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-indigo-500 transition-colors"
            >
              Add +100
            </button>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 flex items-center justify-between">
            <div>
              <span className="text-sm font-bold text-white">+500 Credits</span>
              <p className="text-xs text-slate-400">$20.00 one-time (20% off)</p>
            </div>
            <button
              onClick={() => handleRefillCredits(500, "$20.00")}
              disabled={isProcessing}
              className="rounded-lg bg-indigo-600 px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-indigo-500 transition-colors"
            >
              Add +500
            </button>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 flex items-center justify-between">
            <div>
              <span className="text-sm font-bold text-white">+2,000 Credits</span>
              <p className="text-xs text-slate-400">$60.00 one-time (40% off)</p>
            </div>
            <button
              onClick={() => handleRefillCredits(2000, "$60.00")}
              disabled={isProcessing}
              className="rounded-lg bg-indigo-600 px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-indigo-500 transition-colors"
            >
              Add +2,000
            </button>
          </div>
        </div>
      </div>

      {/* Simulated Billing History */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-white">Billing History & Invoices</h2>
        <div className="rounded-2xl border border-slate-800/80 bg-slate-900/40 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-slate-800 bg-slate-950/60 text-slate-400 uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="px-5 py-3 font-semibold">Invoice ID</th>
                  <th className="px-5 py-3 font-semibold">Date</th>
                  <th className="px-5 py-3 font-semibold">Description</th>
                  <th className="px-5 py-3 font-semibold">Amount</th>
                  <th className="px-5 py-3 font-semibold">Status</th>
                  <th className="px-5 py-3 font-semibold text-right">Receipt</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 text-slate-300">
                <tr>
                  <td className="px-5 py-3.5 font-mono text-slate-400">INV-2026-003</td>
                  <td className="px-5 py-3.5">Nov 24, 2026</td>
                  <td className="px-5 py-3.5">Free Starter Allocation (100 credits)</td>
                  <td className="px-5 py-3.5 font-medium text-white">$0.00</td>
                  <td className="px-5 py-3.5">
                    <span className="rounded-full bg-emerald-500/10 text-emerald-400 px-2 py-0.5 text-[10px] font-semibold">
                      Paid
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <button className="text-indigo-400 hover:text-indigo-300 inline-flex items-center gap-1">
                      <Receipt className="h-3 w-3" /> PDF
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
