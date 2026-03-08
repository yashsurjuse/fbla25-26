import { NextRequest, NextResponse } from "next/server";

const ALLOWED_HOSTS = new Set(["images.metmuseum.org"]);

export async function GET(request: NextRequest) {
  const src = request.nextUrl.searchParams.get("src");
  if (!src) {
    return NextResponse.json({ error: "Missing src parameter" }, { status: 400 });
  }

  let targetUrl: URL;
  try {
    targetUrl = new URL(src);
  } catch {
    return NextResponse.json({ error: "Invalid src parameter" }, { status: 400 });
  }

  if (!ALLOWED_HOSTS.has(targetUrl.hostname)) {
    return NextResponse.json({ error: "Host not permitted" }, { status: 403 });
  }

  const upstreamResponse = await fetch(targetUrl.toString(), {
    cache: "force-cache",
    headers: {
      Accept: "image/avif,image/webp,image/jpeg,image/png,image/*;q=0.8",
    },
  });

  if (!upstreamResponse.ok || !upstreamResponse.body) {
    return NextResponse.json({ error: "Unable to fetch source image" }, { status: upstreamResponse.status || 502 });
  }

  const contentType = upstreamResponse.headers.get("content-type") ?? "image/jpeg";

  return new NextResponse(upstreamResponse.body, {
    status: upstreamResponse.status,
    headers: {
      "Content-Type": contentType,
      "Cache-Control": "public, max-age=86400",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
