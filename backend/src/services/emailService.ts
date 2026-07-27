import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import Newsletter from '../models/newsletter';

dotenv.config();

// Create nodemailer transport
const createTransport = () => {
  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT || '587');
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (host && user && pass) {
    return nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass }
    });
  }

  // Fallback to console logger in development mode
  console.log('[EMAIL] No SMTP credentials configured. Emails will be logged to console.');
  return null;
};

const transporter = createTransport();
const fromEmail = process.env.EMAIL_FROM || 'newsletter@aquaguide.com';

// 1. Send Welcome Email
export const sendWelcomeEmail = async (toEmail: string): Promise<void> => {
  const subject = 'Welcome to AquaGuide!';
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
      <h2 style="color: #0ea5e9; text-align: center;">Welcome to AquaGuide!</h2>
      <p>Thank you for subscribing to our newsletter. You'll now receive regular updates, care guides, and expert recommendations directly in your inbox.</p>
      <p style="margin-top: 20px;">Happy Fishkeeping,</p>
      <p><strong>The AquaGuide Team</strong></p>
      <hr style="border: 0; border-top: 1px solid #e2e8f0; margin-top: 30px;" />
      <p style="font-size: 11px; color: #a0aec0; text-align: center;">You are receiving this because you signed up on our website. To unsubscribe, please contact support@aquaguide.com</p>
    </div>
  `;

  if (transporter) {
    try {
      await transporter.sendMail({
        from: fromEmail,
        to: toEmail,
        subject,
        html
      });
      console.log(`[EMAIL] Welcome email successfully sent to: ${toEmail}`);
    } catch (error) {
      console.error(`[EMAIL] Failed to send welcome email to ${toEmail}:`, error);
    }
  } else {
    console.log(`[EMAIL] [DEV MODE] Sending welcome email to: ${toEmail}\nSubject: ${subject}\nBody: ${html}`);
  }
};

// 2. Broadcast to all subscribers
export const broadcastToSubscribers = async (subject: string, htmlContent: string): Promise<void> => {
  try {
    const subscribers = await Newsletter.find({}, 'email');
    if (subscribers.length === 0) {
      console.log('[EMAIL] No newsletter subscribers found to broadcast to.');
      return;
    }

    const emails = subscribers.map(sub => sub.email);
    console.log(`[EMAIL] Broadcasting "${subject}" to ${emails.length} subscribers...`);

    const fullHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
        <h2 style="color: #0ea5e9; text-align: center;">AquaGuide Updates</h2>
        ${htmlContent}
        <hr style="border: 0; border-top: 1px solid #e2e8f0; margin-top: 30px;" />
        <p style="font-size: 11px; color: #a0aec0; text-align: center;">You are receiving this because you subscribed to our newsletter. To unsubscribe, contact support@aquaguide.com</p>
      </div>
    `;

    if (transporter) {
      // Send individually or in small batches to protect user privacy (bcc)
      await transporter.sendMail({
        from: fromEmail,
        bcc: emails,
        subject,
        html: fullHtml
      });
      console.log('[EMAIL] Broadcast sent successfully.');
    } else {
      console.log(`[EMAIL] [DEV MODE] Broadcasting to Bcc: ${emails.join(', ')}\nSubject: ${subject}\nBody: ${fullHtml}`);
    }
  } catch (error) {
    console.error('[EMAIL] Failed to broadcast email:', error);
  }
};
