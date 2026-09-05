import { NextResponse } from "next/server";

// In-memory rate limiting
const ipRateLimit = new Map<string, { count: number; timestamp: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_MINUTE = 5;

export async function POST(request: Request) {
  try {
    // 1. Rate Limiting
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown-ip";
    const now = Date.now();
    const limitData = ipRateLimit.get(ip);
    
    if (limitData) {
      if (now - limitData.timestamp < RATE_LIMIT_WINDOW) {
        if (limitData.count >= MAX_REQUESTS_PER_MINUTE) {
          return NextResponse.json(
            { error: "Too many requests. Please try again in a minute." },
            { status: 429 }
          );
        }
        limitData.count += 1;
      } else {
        ipRateLimit.set(ip, { count: 1, timestamp: now });
      }
    } else {
      ipRateLimit.set(ip, { count: 1, timestamp: now });
    }

    // 2. Parse and validate JSON Body
    const body = await request.json();
    const { 
      name, 
      email, 
      itemName, 
      incorrectDetail, 
      correction, 
      sources,
      honeypot 
    } = body;

    // Honeypot anti-spam check
    if (honeypot) {
      return NextResponse.json({ success: true });
    }

    // Field Validations & Type Checks
    if (!name || typeof name !== "string" || name.trim() === "") {
      return NextResponse.json({ error: "Name is required." }, { status: 400 });
    }
    if (!email || typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "A valid email address is required." }, { status: 400 });
    }
    if (!itemName || typeof itemName !== "string" || itemName.trim() === "") {
      return NextResponse.json({ error: "Item or Species Name is required." }, { status: 400 });
    }
    if (!incorrectDetail || typeof incorrectDetail !== "string" || incorrectDetail.trim() === "") {
      return NextResponse.json({ error: "Detail of inaccuracy is required." }, { status: 400 });
    }
    if (!correction || typeof correction !== "string" || correction.trim() === "") {
      return NextResponse.json({ error: "Suggested correction is required." }, { status: 400 });
    }

    // Length boundaries
    if (
      name.length > 100 ||
      email.length > 150 ||
      itemName.length > 200 ||
      incorrectDetail.length > 3000 ||
      correction.length > 3000 ||
      (sources && typeof sources === "string" && sources.length > 500)
    ) {
      return NextResponse.json({ error: "Input exceeds allowed character limits." }, { status: 400 });
    }

    // Resolve Server-Side Endpoint Only (prevent SSRF)
    const targetUrl = process.env.GOOGLE_SHEET_WEBAPP_URL;

    if (!targetUrl) {
      // In development or when unconfigured, safely accept report and log
      console.warn("GOOGLE_SHEET_WEBAPP_URL is not configured on server.");
      return NextResponse.json({ success: true, message: "Report received." });
    }

    // Validate that the URL points to trusted Google Script domain
    try {
      const parsed = new URL(targetUrl);
      if (parsed.protocol !== "https:" || !parsed.hostname.endsWith("script.google.com")) {
        console.error("Invalid target webhook hostname:", parsed.hostname);
        return NextResponse.json({ error: "Webhook configuration error." }, { status: 500 });
      }
    } catch {
      return NextResponse.json({ error: "Webhook configuration error." }, { status: 500 });
    }

    const response = await fetch(targetUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: escapeHtml(name.trim()),
        email: escapeHtml(email.trim()),
        itemName: escapeHtml(itemName.trim()),
        incorrectDetail: escapeHtml(incorrectDetail.trim()),
        correction: escapeHtml(correction.trim()),
        sources: sources && typeof sources === "string" ? escapeHtml(sources.trim()) : "None",
        site: "https://aquaversa.vercel.app"
      }),
    });

    if (!response.ok) {
      console.error("Endpoint responded with status:", response.status);
      return NextResponse.json({ error: "Failed to submit report. Please try again later." }, { status: 502 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error in inaccuracy report backend handler:", error);
    return NextResponse.json({ error: "An unexpected error occurred. Please try again later." }, { status: 500 });
  }
}

function escapeHtml(unsafe: string) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
