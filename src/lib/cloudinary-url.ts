import { ImageTransformationOptions } from "@/types";

export function getCloudName(): string {
  return process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "demo";
}

/**
 * Pure client & server safe Cloudinary URL transformation builder
 */
export function buildTransformedUrl(
  basePublicIdOrUrl: string,
  options: ImageTransformationOptions
): string {
  let cName = getCloudName();
  let publicId = basePublicIdOrUrl;

  if (basePublicIdOrUrl.includes("res.cloudinary.com")) {
    const parts = basePublicIdOrUrl.split("/image/upload/");
    if (parts.length === 2) {
      const urlBeforeUpload = parts[0];
      const nameMatch = urlBeforeUpload.match(/res\.cloudinary\.com\/([^/]+)/);
      if (nameMatch) {
        cName = nameMatch[1];
      }
      const afterUpload = parts[1];
      const segments = afterUpload.split("/");
      const lastSegments = segments.filter(
        (s) =>
          !s.includes(",") &&
          !s.startsWith("w_") &&
          !s.startsWith("c_") &&
          !s.startsWith("e_") &&
          !s.startsWith("ar_") &&
          !s.startsWith("g_") &&
          !s.startsWith("f_") &&
          !s.startsWith("q_")
      );
      publicId = lastSegments.join("/");
    }
  }

  const transParts: string[] = [];

  // Format and quality auto optimizations
  if (options.format && options.format !== "auto") {
    transParts.push(`f_${options.format}`);
  } else {
    transParts.push("f_auto");
  }

  if (options.quality && options.quality !== "auto") {
    transParts.push(`q_${options.quality === "best" ? "100" : "60"}`);
  } else {
    transParts.push("q_auto");
  }

  // Aspect ratio & crop
  if (options.aspectRatio && options.aspectRatio !== "none") {
    transParts.push(`ar_${options.aspectRatio}`);
    transParts.push(`c_${options.crop || "fill"}`);
  } else if (options.crop && options.crop !== "auto") {
    transParts.push(`c_${options.crop}`);
  }

  // Width & height
  if (options.width) {
    transParts.push(`w_${options.width}`);
  }
  if (options.height) {
    transParts.push(`h_${options.height}`);
  }

  // Gravity
  if (options.gravity && options.gravity !== "auto") {
    transParts.push(`g_${options.gravity}`);
  }

  // Effects
  if (options.effect && options.effect !== "none") {
    if (options.effect === "grayscale") transParts.push("e_grayscale");
    else if (options.effect === "sepia") transParts.push("e_sepia");
    else if (options.effect === "blur") transParts.push("e_blur:300");
    else if (options.effect === "vignette") transParts.push("e_vignette");
    else if (options.effect === "enhance") transParts.push("e_improve");
  }

  // Background removal (Cloudinary AI add-on)
  if (options.removeBackground) {
    transParts.push("e_background_removal");
  }

  const transformString = transParts.join(",");
  const cleanId = publicId.replace(/^\/+/, "");

  return `https://res.cloudinary.com/${cName}/image/upload/${transformString}/${cleanId}`;
}
