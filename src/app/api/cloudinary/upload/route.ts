import { NextRequest, NextResponse } from "next/server";
import { cloudinary, isCloudinaryConfigured, getServerCloudName } from "@/lib/cloudinary-server";
import { CloudinaryAsset } from "@/types";

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get("content-type") || "";
    let fileBuffer: Buffer | null = null;
    let fileName = `asset-${Date.now()}`;
    let remoteUrl: string | null = null;

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      const file = formData.get("file") as File;
      if (!file) {
        return NextResponse.json({ error: "No file provided" }, { status: 400 });
      }
      fileName = file.name || fileName;
      const arrayBuffer = await file.arrayBuffer();
      fileBuffer = Buffer.from(arrayBuffer);
    } else {
      const body = await req.json();
      remoteUrl = body.url;
      if (!remoteUrl) {
        return NextResponse.json({ error: "File or image URL is required" }, { status: 400 });
      }
    }

    // If Cloudinary is fully configured with credentials, upload to real cloud
    if (isCloudinaryConfigured()) {
      let uploadResult: any;

      if (fileBuffer) {
        uploadResult = await new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            {
              folder: "aetheris-saas",
              resource_type: "image",
            },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          );
          uploadStream.end(fileBuffer);
        });
      } else if (remoteUrl) {
        uploadResult = await cloudinary.uploader.upload(remoteUrl, {
          folder: "nexus-ai-saas",
          resource_type: "image",
        });
      }

      const asset: CloudinaryAsset = {
        id: uploadResult.asset_id || `asset-${Date.now()}`,
        publicId: uploadResult.public_id,
        secureUrl: uploadResult.secure_url,
        thumbnailUrl: uploadResult.secure_url.replace(
          "/upload/",
          "/upload/c_thumb,w_300,h_200,g_auto/"
        ),
        format: uploadResult.format || "jpg",
        width: uploadResult.width,
        height: uploadResult.height,
        bytes: uploadResult.bytes,
        createdAt: uploadResult.created_at || new Date().toISOString(),
        tags: uploadResult.tags || ["uploaded", "cloudinary-cdn"],
        appliedTransformations: ["f_auto", "q_auto"],
      };

      return NextResponse.json({
        success: true,
        asset,
        isSimulated: false,
      });
    }

    // Cloudinary demo / preview simulation mode
    // Provides high fidelity demo assets with authentic Cloudinary URLs
    const samplePublicIds = [
      "sample",
      "fashion",
      "dessert",
      "basketball",
      "corgi",
      "kitten",
    ];
    const chosenSample = samplePublicIds[Math.floor(Math.random() * samplePublicIds.length)];
    const cloud = getServerCloudName() || "demo";
    const demoPublicId = `samples/${chosenSample}`;
    const secureUrl = `https://res.cloudinary.com/${cloud}/image/upload/v1312461204/${chosenSample}.jpg`;

    const simulatedAsset: CloudinaryAsset = {
      id: `sim-${Date.now()}`,
      publicId: demoPublicId,
      secureUrl,
      thumbnailUrl: `https://res.cloudinary.com/${cloud}/image/upload/c_thumb,w_300,h_200/${chosenSample}.jpg`,
      format: "jpg",
      width: 800,
      height: 600,
      bytes: fileBuffer ? fileBuffer.length : 124500,
      createdAt: new Date().toISOString(),
      caption: `Uploaded asset: ${fileName}`,
      tags: ["cloudinary-demo", "ai-ready", "cdn-optimized"],
      appliedTransformations: ["f_auto", "q_auto"],
      aiDescription: "Asset ingested into Cloudinary pipeline with auto-format (f_auto) and auto-quality (q_auto) parameters applied.",
    };

    return NextResponse.json({
      success: true,
      asset: simulatedAsset,
      isSimulated: true,
      message: "Asset processed via Cloudinary edge delivery (demo mode). Set CLOUDINARY_API_KEY in .env.local for production bucket uploads.",
    });
  } catch (error: any) {
    console.error("API /api/cloudinary/upload error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to upload to Cloudinary" },
      { status: 500 }
    );
  }
}
