"use client";

import React, { useState } from "react";
import {
  Key,
  Cloud,
  Sparkles,
  CheckCircle2,
  ExternalLink,
  ShieldAlert,
  Save,
  RefreshCw,
  Sliders,
} from "lucide-react";
import Header from "@/components/Header";
import { useApp } from "@/context/AppContext";

export default function SettingsPage() {
  const {
    customApiKey,
    setCustomApiKey,
    customCloudName,
    setCustomCloudName,
  } = useApp();

  const [geminiKeyInput, setGeminiKeyInput] = useState(customApiKey || "");
  const [cloudNameInput, setCloudNameInput] = useState(customCloudName || "demo");
  const [cloudinaryApiKey, setCloudinaryApiKey] = useState("");
  const [cloudinarySecret, setCloudinarySecret] = useState("");
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<string | null>(null);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setCustomApiKey(geminiKeyInput.trim());
    setCustomCloudName(cloudNameInput.trim() || "demo");
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleTestGeminiConnection = async () => {
    setIsTesting(true);
    setTestResult(null);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: "Say 'Gemini API connection is active and operational!' in one sentence.",
          customApiKey: geminiKeyInput.trim() || undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Connection failed");

      setTestResult(
        data.simulated
          ? "Built-in AI Simulator responded successfully (no custom key needed)."
          : "Gemini API authenticated and responded live!"
      );
    } catch (err: any) {
      setTestResult(`Test failed: ${err.message}`);
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <div className="space-y-8">
      <Header
        title="API Configuration & Settings"
        description="Connect your Google Gemini LLM API keys and Cloudinary Cloud details for production workloads."
      />

      {savedSuccess && (
        <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-xs font-semibold text-emerald-300 flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          <span>Settings successfully saved and persisted!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-8">
        {/* Gemini API Key Section */}
        <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-pink-500/10 text-pink-400 border border-pink-500/20">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">Google Gemini LLM API</h3>
                <p className="text-xs text-slate-400">Power text generation, code architecting & vision</p>
              </div>
            </div>

            <a
              href="https://aistudio.google.com/app/apikey"
              target="_blank"
              rel="noreferrer"
              className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1 font-medium"
            >
              Get Free Gemini Key <ExternalLink className="h-3 w-3" />
            </a>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-medium text-slate-300">Gemini API Key</label>
            <input
              type="password"
              value={geminiKeyInput}
              onChange={(e) => setGeminiKeyInput(e.target.value)}
              placeholder="AIzaSy..."
              className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2.5 text-xs text-slate-100 placeholder:text-slate-600 focus:border-indigo-500 focus:outline-none"
            />
            <p className="text-[11px] text-slate-500">
              Leave blank to use the high-fidelity built-in simulator mode, or provide a key for live Gemini 1.5/2.0 API responses.
            </p>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={handleTestGeminiConnection}
              disabled={isTesting}
              className="rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-800 transition-colors flex items-center gap-1.5"
            >
              {isTesting ? (
                <>
                  <RefreshCw className="h-3.5 w-3.5 animate-spin" /> Testing...
                </>
              ) : (
                <>
                  <Sparkles className="h-3.5 w-3.5 text-indigo-400" /> Test Connection
                </>
              )}
            </button>

            {testResult && (
              <span className="text-xs text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5" /> {testResult}
              </span>
            )}
          </div>
        </div>

        {/* Cloudinary Integration Section */}
        <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20">
                <Cloud className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">Cloudinary Media CDN Engine</h3>
                <p className="text-xs text-slate-400">Transformations, edge delivery, and automatic compression</p>
              </div>
            </div>

            <a
              href="https://cloudinary.com/console"
              target="_blank"
              rel="noreferrer"
              className="text-xs text-sky-400 hover:text-sky-300 flex items-center gap-1 font-medium"
            >
              Open Cloudinary Console <ExternalLink className="h-3 w-3" />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">Cloud Name</label>
              <input
                type="text"
                value={cloudNameInput}
                onChange={(e) => setCloudNameInput(e.target.value)}
                placeholder="demo"
                className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2 text-xs text-slate-100 placeholder:text-slate-600 focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">API Key (Optional for uploads)</label>
              <input
                type="text"
                value={cloudinaryApiKey}
                onChange={(e) => setCloudinaryApiKey(e.target.value)}
                placeholder="1234567890..."
                className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2 text-xs text-slate-100 placeholder:text-slate-600 focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">API Secret (Optional)</label>
              <input
                type="password"
                value={cloudinarySecret}
                onChange={(e) => setCloudinarySecret(e.target.value)}
                placeholder="••••••••••••"
                className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2 text-xs text-slate-100 placeholder:text-slate-600 focus:border-indigo-500 focus:outline-none"
              />
            </div>
          </div>
          <p className="text-[11px] text-slate-500">
            Default is set to &apos;demo&apos; cloud, which allows instant zero-config testing of URL transformations, smart cropping, and modern format conversions!
          </p>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="rounded-xl bg-indigo-600 px-6 py-2.5 text-xs font-semibold text-white shadow-lg shadow-indigo-600/25 hover:bg-indigo-500 transition-all flex items-center gap-2"
          >
            <Save className="h-4 w-4" /> Save Configuration
          </button>
        </div>
      </form>
    </div>
  );
}
