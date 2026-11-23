export type ToolCategory = "text" | "media" | "chat" | "code" | "marketing";

export interface AIContentTemplate {
  id: string;
  name: string;
  description: string;
  category: ToolCategory;
  iconName: string;
  costCredits: number;
  systemPrompt: string;
  fields: {
    name: string;
    label: string;
    placeholder: string;
    type: "text" | "textarea" | "select";
    options?: string[];
    required?: boolean;
    defaultValue?: string;
  }[];
}

export interface GenerationHistoryItem {
  id: string;
  title: string;
  templateId: string;
  category: ToolCategory;
  prompt: string;
  content: string;
  metadata?: Record<string, any>;
  createdAt: string;
  creditsCost: number;
}

export interface ChatMessage {
  id: string;
  role: "user" | "model" | "system";
  content: string;
  timestamp: string;
}

export interface CloudinaryAsset {
  id: string;
  publicId: string;
  secureUrl: string;
  thumbnailUrl: string;
  format: string;
  width: number;
  height: number;
  bytes: number;
  createdAt: string;
  caption?: string;
  tags?: string[];
  appliedTransformations?: string[];
  aiDescription?: string;
}

export interface ImageTransformationOptions {
  crop?: "fill" | "thumb" | "fit" | "scale" | "auto";
  aspectRatio?: "1:1" | "16:9" | "4:5" | "9:16" | "none";
  width?: number;
  height?: number;
  effect?: "none" | "grayscale" | "sepia" | "blur" | "vignette" | "enhance";
  gravity?: "auto" | "face" | "center";
  format?: "auto" | "webp" | "png" | "jpg" | "avif";
  quality?: "auto" | "best" | "eco";
  removeBackground?: boolean;
}

export interface UserSubscription {
  plan: "Free" | "Pro" | "Enterprise";
  creditsRemaining: number;
  creditsTotal: number;
  monthlyRenewalDate: string;
  activeFeatures: string[];
}
