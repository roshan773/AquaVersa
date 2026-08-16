import { NextResponse } from "next/server";

// Simple in-memory rate limiting map
const ipRateLimit = new Map<string, { count: number; timestamp: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute window
const MAX_REQUESTS_PER_MINUTE = 3;

export async function POST(request: Request) {
  try {
    // 1. Rate Limiting
    const ip = request.headers.get("x-forwarded-for") || "unknown-ip";
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

    // 2. Parse Body
    const body = await request.json();
    const {
      name,
      email,
      category,
      subject,
      message,
      itemName,
      incorrectInfo,
      correction,
      source,
      honeypot,
    } = body;

    // 3. Honeypot check (anti-spam bot detection)
    if (honeypot) {
      // Silently accept it to fool bots
      return NextResponse.json({ success: true });
    }

    // 4. Basic Field Validations
    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return NextResponse.json({ error: "Name is required." }, { status: 400 });
    }
    if (!email || typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "A valid email address is required." }, { status: 400 });
    }
    if (!category || typeof category !== "string") {
      return NextResponse.json({ error: "Category is required." }, { status: 400 });
    }

    // Ensure values fit max lengths to prevent payload spamming
    if (name.length > 100 || email.length > 150) {
      return NextResponse.json({ error: "Input exceeds allowed character limits." }, { status: 400 });
    }

    let finalSubject = "";
    let finalBody = "";

    // 5. Structure Email Content based on category choice
    if (category === "general") {
      if (!subject || typeof subject !== "string" || subject.trim().length === 0) {
        return NextResponse.json({ error: "Subject is required." }, { status: 400 });
      }
      if (!message || typeof message !== "string" || message.trim().length === 0) {
        return NextResponse.json({ error: "Message is required." }, { status: 400 });
      }
      if (subject.length > 200 || message.length > 5000) {
        return NextResponse.json({ error: "Input exceeds allowed character limits." }, { status: 400 });
      }
      
      finalSubject = subject;
      finalBody = `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #1e293b; max-width: 600px; margin: auto; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px;">
          <h2 style="color: #0ea5e9; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px; margin-top: 0;">New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Category:</strong> General Inquiry</p>
          <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
          <br/>
          <p><strong>Message:</strong></p>
          <div style="white-space: pre-wrap; background-color: #f8fafc; padding: 16px; border-radius: 8px; border: 1px solid #e2e8f0; color: #334155;">${escapeHtml(message)}</div>
        </div>
      `;
    } else {
      // Inaccuracy Report Validation
      if (!itemName || typeof itemName !== "string" || itemName.trim().length === 0) {
        return NextResponse.json({ error: "Item or Species name is required." }, { status: 400 });
      }
      if (!incorrectInfo || typeof incorrectInfo !== "string" || incorrectInfo.trim().length === 0) {
        return NextResponse.json({ error: "Current incorrect info detail is required." }, { status: 400 });
      }
      if (!correction || typeof correction !== "string" || correction.trim().length === 0) {
        return NextResponse.json({ error: "Suggested correction is required." }, { status: 400 });
      }
      if (itemName.length > 200 || incorrectInfo.length > 3000 || correction.length > 3000 || (source && source.length > 500)) {
        return NextResponse.json({ error: "Input exceeds allowed character limits." }, { status: 400 });
      }

      const formattedCategory = category.charAt(0).toUpperCase() + category.slice(1);
      finalSubject = `Inaccuracy Report: ${formattedCategory} - ${itemName}`;
      finalBody = `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #1e293b; max-width: 600px; margin: auto; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px;">
          <h2 style="color: #0ea5e9; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px; margin-top: 0;">New Data Inaccuracy Report</h2>
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Category:</strong> ${escapeHtml(formattedCategory)} Inaccuracy</p>
          <p><strong>Item / Species Name:</strong> ${escapeHtml(itemName)}</p>
          <br/>
          <p><strong>Current Incorrect Info:</strong></p>
          <div style="background-color: #fff5f5; padding: 12px; border-radius: 6px; border: 1px solid #fed7d7; color: #9b2c2c;">${escapeHtml(incorrectInfo)}</div>
          <br/>
          <p><strong>Suggested Correction:</strong></p>
          <div style="background-color: #f0fff4; padding: 12px; border-radius: 6px; border: 1px solid #c6f6d5; color: #22543d;">${escapeHtml(correction)}</div>
          <br/>
          ${source ? `<p><strong>Source / Reference Link:</strong> <a href="${escapeHtml(source)}" style="color: #0ea5e9;">${escapeHtml(source)}</a></p>` : ""}
        </div>
      `;
    }

    // Append standard footer
    finalBody += `
      <br/>
      <div style="max-width: 600px; margin: auto; text-align: center;">
        <hr style="border: 0; border-top: 1px solid #e2e8f0; margin-bottom: 12px;"/>
        <p style="font-size: 11px; color: #64748b; margin: 0;">
          Submitted from: <a href="https://aquaversa.vercel.app/" style="color: #64748b; text-decoration: underline;">https://aquaversa.vercel.app/</a>
        </p>
      </div>
    `;

    // 6. Check for Environment Variables and Send
    const resendApiKey = process.env.RESEND_API_KEY;
    const emailFrom = process.env.EMAIL_FROM || "onboarding@resend.dev";
    
    // Recipient list configuration
    const contactEmail1 = process.env.CONTACT_EMAIL_1 || "aquaversa@gmail.com";
    const contactEmail2 = process.env.CONTACT_EMAIL_2 || "pakhreroshan@gmail.com";

    if (!resendApiKey) {
      console.warn("WARNING: RESEND_API_KEY environment variable is not configured. Email not sent.");
      // In development, let's log the email content so we can verify the output
      console.log("--- DEVELOPMENT EMAIL LOG ---");
      console.log(`To: ${contactEmail1}, ${contactEmail2}`);
      console.log(`From: ${emailFrom}`);
      console.log(`Reply-To: ${email}`);
      console.log(`Subject: [AquaVersa Contact] ${finalSubject}`);
      console.log("Body HTML below:\n", finalBody);
      console.log("-----------------------------");
      
      // Still return success for local testing/development
      return NextResponse.json({ success: true, devMode: true });
    }

    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: emailFrom,
        to: [contactEmail1, contactEmail2],
        reply_to: email,
        subject: `[AquaVersa Contact] ${finalSubject}`,
        html: finalBody,
      }),
    });

    if (!emailResponse.ok) {
      const errText = await emailResponse.text();
      console.error("Resend API failed:", errText);
      return NextResponse.json({ error: "Failed to send email." }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error in contact form handler:", error);
    return NextResponse.json({ error: "An unexpected error occurred." }, { status: 500 });
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
