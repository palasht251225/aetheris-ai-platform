"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  CloudinaryAsset,
  GenerationHistoryItem,
  UserSubscription,
} from "@/types";
import {
  INITIAL_CLOUDINARY_ASSETS,
  INITIAL_GENERATIONS,
  INITIAL_USER_SUBSCRIPTION,
} from "@/lib/mockData";

interface AppContextType {
  subscription: UserSubscription;
  history: GenerationHistoryItem[];
  assets: CloudinaryAsset[];
  customApiKey: string;
  customCloudName: string;
  setCustomApiKey: (key: string) => void;
  setCustomCloudName: (name: string) => void;
  spendCredits: (amount: number) => boolean;
  addCredits: (amount: number) => void;
  upgradePlan: (plan: "Free" | "Pro" | "Enterprise") => void;
  addGeneration: (item: Omit<GenerationHistoryItem, "id" | "createdAt">) => GenerationHistoryItem;
  deleteGeneration: (id: string) => void;
  addAsset: (asset: CloudinaryAsset) => void;
  deleteAsset: (id: string) => void;
  updateAsset: (id: string, updates: Partial<CloudinaryAsset>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [subscription, setSubscription] = useState<UserSubscription>(
    INITIAL_USER_SUBSCRIPTION
  );
  const [history, setHistory] = useState<GenerationHistoryItem[]>(
    INITIAL_GENERATIONS
  );
  const [assets, setAssets] = useState<CloudinaryAsset[]>(
    INITIAL_CLOUDINARY_ASSETS
  );
  const [customApiKey, setCustomApiKeyState] = useState<string>("");
  const [customCloudName, setCustomCloudNameState] = useState<string>("");
  const [isLoaded, setIsLoaded] = useState(false);

  // Load persisted state from localStorage
  useEffect(() => {
    try {
      const savedSub = localStorage.getItem("aetheris_subscription") || localStorage.getItem("palash_ai_subscription") || localStorage.getItem("nexus_subscription");
      if (savedSub) setSubscription(JSON.parse(savedSub));

      const savedHist = localStorage.getItem("aetheris_history") || localStorage.getItem("palash_ai_history") || localStorage.getItem("nexus_history");
      if (savedHist) setHistory(JSON.parse(savedHist));

      const savedAssets = localStorage.getItem("aetheris_assets") || localStorage.getItem("palash_ai_assets") || localStorage.getItem("nexus_assets");
      if (savedAssets) setAssets(JSON.parse(savedAssets));

      const savedKey = localStorage.getItem("aetheris_custom_api_key") || localStorage.getItem("palash_ai_custom_api_key") || localStorage.getItem("nexus_custom_api_key");
      if (savedKey) setCustomApiKeyState(savedKey);

      const savedCloud = localStorage.getItem("aetheris_custom_cloud_name") || localStorage.getItem("palash_ai_custom_cloud_name") || localStorage.getItem("nexus_custom_cloud_name");
      if (savedCloud) setCustomCloudNameState(savedCloud);
    } catch (e) {
      console.warn("Could not load from localStorage:", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Sync state changes to localStorage
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem("aetheris_subscription", JSON.stringify(subscription));
      localStorage.setItem("aetheris_history", JSON.stringify(history));
      localStorage.setItem("aetheris_assets", JSON.stringify(assets));
      localStorage.setItem("aetheris_custom_api_key", customApiKey);
      localStorage.setItem("aetheris_custom_cloud_name", customCloudName);
    } catch (e) {
      console.warn("Could not save to localStorage:", e);
    }
  }, [subscription, history, assets, customApiKey, customCloudName, isLoaded]);

  const spendCredits = (amount: number): boolean => {
    if (subscription.creditsRemaining < amount) {
      return false;
    }
    setSubscription((prev) => ({
      ...prev,
      creditsRemaining: Math.max(0, prev.creditsRemaining - amount),
    }));
    return true;
  };

  const addCredits = (amount: number) => {
    setSubscription((prev) => ({
      ...prev,
      creditsRemaining: prev.creditsRemaining + amount,
      creditsTotal: prev.creditsTotal + amount,
    }));
  };

  const upgradePlan = (plan: "Free" | "Pro" | "Enterprise") => {
    const creditsBonus = plan === "Pro" ? 1000 : plan === "Enterprise" ? 5000 : 100;
    setSubscription((prev) => ({
      ...prev,
      plan,
      creditsRemaining: prev.creditsRemaining + creditsBonus,
      creditsTotal: prev.creditsTotal + creditsBonus,
      activeFeatures: [
        "Unlimited Priority LLM Invocations",
        "Full Cloudinary AI Edge Media Engine",
        "Smart Cropping & Background Removal",
        "Team Collaboration & API Access",
        "24/7 Dedicated Support",
      ],
    }));
  };

  const addGeneration = (
    item: Omit<GenerationHistoryItem, "id" | "createdAt">
  ): GenerationHistoryItem => {
    const newItem: GenerationHistoryItem = {
      ...item,
      id: `gen-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      createdAt: new Date().toISOString(),
    };
    setHistory((prev) => [newItem, ...prev]);
    return newItem;
  };

  const deleteGeneration = (id: string) => {
    setHistory((prev) => prev.filter((item) => item.id !== id));
  };

  const addAsset = (asset: CloudinaryAsset) => {
    setAssets((prev) => [asset, ...prev]);
  };

  const deleteAsset = (id: string) => {
    setAssets((prev) => prev.filter((item) => item.id !== id));
  };

  const updateAsset = (id: string, updates: Partial<CloudinaryAsset>) => {
    setAssets((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updates } : item))
    );
  };

  const setCustomApiKey = (key: string) => {
    setCustomApiKeyState(key);
  };

  const setCustomCloudName = (name: string) => {
    setCustomCloudNameState(name);
  };

  return (
    <AppContext.Provider
      value={{
        subscription,
        history,
        assets,
        customApiKey,
        customCloudName,
        setCustomApiKey,
        setCustomCloudName,
        spendCredits,
        addCredits,
        upgradePlan,
        addGeneration,
        deleteGeneration,
        addAsset,
        deleteAsset,
        updateAsset,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
