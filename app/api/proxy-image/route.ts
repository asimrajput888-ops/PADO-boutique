// app/api/proxy-image/route.ts

import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get("url");
  if (!url) return new NextResponse("Missing URL", { status: 400 });

  try {
    // Server se fetch kar rahe hain, isliye koi hotlink block nahi hoga
    const res = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
        "Accept": "image/*",
      },
    });

    if (!res.ok) throw new Error("Failed to fetch image");

    const buffer = await res.arrayBuffer();
    return new NextResponse(buffer, {
      headers: {
        "Content-Type": res.headers.get("Content-Type") || "image/jpeg",
        "Cache-Control": "public, max-age=86400, immutable", // 1 din ka cache
      },
    });
  } catch (error) {
    // Agar fail ho toh placeholder
    return NextResponse.redirect("https://via.placeholder.com/600x800?text=Image+Not+Available");
  }
}
