import { NextRequest, NextResponse } from "next/server";
import { buildTransformedUrl } from "@/lib/cloudinary-url";
import { ImageTransformationOptions } from "@/types";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { publicId, url, options } = body as {
      publicId?: string;
      url?: string;
      options: ImageTransformationOptions;
    };

    const target = publicId || url;
    if (!target) {
      return NextResponse.json(
        { error: "Public ID or Image URL is required" },
        { status: 400 }
      );
    }

    const transformedUrl = buildTransformedUrl(target, options || {});

    return NextResponse.json({
      success: true,
      transformedUrl,
      options,
    });
  } catch (error: any) {
    console.error("API /api/cloudinary/transform error:", error);
    return NextResponse.json(
      { error: error?.message || "Transformation failed" },
      { status: 500 }
    );
  }
}
