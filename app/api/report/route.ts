import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { 
      name, 
      email, 
      itemName, 
      incorrectDetail, 
      correction, 
      sources,
      sheetUrl,
      token,
      site 
    } = body;

    // Basic Validation
    if (!name || typeof name !== "string" || name.trim() === "") {
      return NextResponse.json({ error: "Your Name is required." }, { status: 400 });
    }
    if (!email || typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "A valid email address is required." }, { status: 400 });
    }
    if (!itemName || typeof itemName !== "string" || itemName.trim() === "") {
      return NextResponse.json({ error: "Species or Equipment Name is required." }, { status: 400 });
    }
    if (!incorrectDetail || typeof incorrectDetail !== "string" || incorrectDetail.trim() === "") {
      return NextResponse.json({ error: "Detail of inaccuracy is required." }, { status: 400 });
    }
    if (!correction || typeof correction !== "string" || correction.trim() === "") {
      return NextResponse.json({ error: "Suggested correction is required." }, { status: 400 });
    }

    // Resolve Sheets endpoint
    const resolvedUrl = sheetUrl || process.env.GOOGLE_SHEET_WEBAPP_URL || process.env.NEXT_PUBLIC_GOOGLE_SHEET_WEBAPP_URL;

    if (!resolvedUrl) {
      return NextResponse.json(
        { error: "Google Spreadsheet Web App URL is not configured. Please paste your deployment URL in the settings panel." },
        { status: 400 }
      );
    }

    // Send payload server-to-server to Apps Script
    const response = await fetch(resolvedUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        itemName,
        incorrectDetail,
        correction,
        sources: sources || "None",
        token: token || "2d7e12ea-1240-4d9f-acbe-db75c3fbbae2",
        site: site || "https://aquaversa.vercel.app/"
      }),
    });

    // Google Apps Script redirects might return 302 or succeed with text
    if (!response.ok) {
      const errBody = await response.text();
      console.error("Apps Script Error Response:", errBody);
      return NextResponse.json({ error: "Failed to submit to Google Spreadsheet endpoint." }, { status: 500 });
    }

    const data = await response.json();
    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error("Error in inaccuracy report backend handler:", error);
    return NextResponse.json({ error: error.message || "An unexpected error occurred." }, { status: 500 });
  }
}
