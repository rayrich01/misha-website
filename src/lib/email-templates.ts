// src/lib/email-templates.ts
// CRM-001-C: Branded HTML email templates for Misha Creations

const CREAM   = '#F5F3EF';
const GOLD    = '#C9A96E';
const DARK    = '#2D2D2D';
const GRAY    = '#6B6B6B';
const BORDER  = '#E8E6DD';
const STUDIO_URL = 'https://studio.mishacreations.com';

function wrap(body: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Misha Creations</title>
</head>
<body style="margin:0;padding:0;background:#EEECE8;font-family:Georgia,serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#EEECE8;padding:32px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:${CREAM};border:1px solid ${BORDER};border-radius:4px;overflow:hidden;">

        <!-- Header -->
        <tr>
          <td style="background:${DARK};padding:28px 40px;text-align:center;">
            <p style="margin:0;font-family:Georgia,serif;font-size:22px;font-weight:normal;color:${GOLD};letter-spacing:0.12em;text-transform:uppercase;">Misha Creations</p>
            <p style="margin:6px 0 0;font-size:11px;color:#888;letter-spacing:0.08em;text-transform:uppercase;font-family:Arial,sans-serif;">Decorative Finishes · Houston</p>
          </td>
        </tr>

        <!-- Body -->
        ${body}

        <!-- Footer -->
        <tr>
          <td style="background:${DARK};padding:20px 40px;text-align:center;border-top:1px solid #444;">
            <p style="margin:0;font-size:11px;color:#888;font-family:Arial,sans-serif;letter-spacing:0.05em;">
              Misha Creations &nbsp;·&nbsp; Houston, Texas<br>
              <a href="${STUDIO_URL}" style="color:${GOLD};text-decoration:none;">studio.mishacreations.com</a>
              &nbsp;·&nbsp;
              <a href="https://mishacreations.com" style="color:${GOLD};text-decoration:none;">mishacreations.com</a>
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

// ─── Template: Inquiry Notification (to Misha) ────────────────────────────────

export interface InquiryFormData {
  firstName: string;
  lastName?: string;
  email: string;
  phone?: string;
  neighborhood?: string;
  inquiryType?: string;
  roomType?: string;
  projectTimeline?: string;
  budget?: string;
  message?: string;
  sourceSite?: string;
  submittedAt?: string;
}

export function inquiryNotificationEmail(data: InquiryFormData): { subject: string; html: string; text: string } {
  const name = [data.firstName, data.lastName].filter(Boolean).join(' ');
  const ts = data.submittedAt || new Date().toLocaleString('en-US', { timeZone: 'America/Chicago', dateStyle: 'full', timeStyle: 'short' });

  const subject = `New Inquiry — ${name} — ${data.neighborhood || 'Houston'}`;

  const rows = [
    ['Name', name],
    ['Email', data.email],
    ['Phone', data.phone || '—'],
    ['Neighborhood', data.neighborhood || '—'],
    ['Inquiry Type', data.inquiryType || '—'],
    ['Room Type', data.roomType || '—'],
    ['Timeline', data.projectTimeline || '—'],
    ['Budget', data.budget || '—'],
    ['Source', data.sourceSite || 'Website'],
    ['Submitted', ts],
  ].filter(([, v]) => v !== '—');

  const tableRows = rows.map(([label, value]) => `
    <tr>
      <td style="padding:8px 12px;background:#F0EDE8;border-bottom:1px solid ${BORDER};font-family:Arial,sans-serif;font-size:12px;font-weight:bold;color:${GRAY};width:140px;vertical-align:top;">${label}</td>
      <td style="padding:8px 12px;border-bottom:1px solid ${BORDER};font-family:Arial,sans-serif;font-size:13px;color:${DARK};">${value}</td>
    </tr>`).join('');

  const messageBlock = data.message ? `
    <tr>
      <td colspan="2" style="padding:12px;background:#FDFAF5;border-bottom:1px solid ${BORDER};">
        <p style="margin:0 0 6px;font-family:Arial,sans-serif;font-size:11px;font-weight:bold;color:${GRAY};text-transform:uppercase;letter-spacing:0.05em;">Message</p>
        <p style="margin:0;font-family:Georgia,serif;font-size:13px;color:${DARK};line-height:1.6;">${data.message.replace(/\n/g, '<br>')}</p>
      </td>
    </tr>` : '';

  const html = wrap(`
    <tr><td style="padding:32px 40px 12px;">
      <p style="margin:0 0 4px;font-family:Arial,sans-serif;font-size:11px;font-weight:bold;color:${GOLD};text-transform:uppercase;letter-spacing:0.1em;">New Inquiry Received</p>
      <h2 style="margin:0 0 20px;font-family:Georgia,serif;font-size:22px;font-weight:normal;color:${DARK};">${name}</h2>
    </td></tr>
    <tr><td style="padding:0 40px 32px;">
      <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid ${BORDER};border-radius:4px;overflow:hidden;">
        ${tableRows}
        ${messageBlock}
      </table>
      <p style="margin:20px 0 0;font-family:Arial,sans-serif;font-size:12px;color:${GRAY};">
        Reply directly to this email to respond to ${data.firstName} — reply-to is set to their address.
      </p>
    </td></tr>
  `);

  const text = `NEW INQUIRY — MISHA CREATIONS\n\nName: ${name}\nEmail: ${data.email}\nPhone: ${data.phone || '—'}\nNeighborhood: ${data.neighborhood || '—'}\nType: ${data.inquiryType || '—'}\nRoom Type: ${data.roomType || '—'}\nTimeline: ${data.projectTimeline || '—'}\nBudget: ${data.budget || '—'}\n\nMessage:\n${data.message || '—'}\n\nSubmitted: ${ts}`;

  return { subject, html, text };
}

// ─── Template: Inquiry Confirmation (to submitter) ────────────────────────────

export function inquiryConfirmationEmail(data: InquiryFormData): { subject: string; html: string; text: string } {
  const subject = `Thank you, ${data.firstName} — I'll be in touch soon`;

  const html = wrap(`
    <tr><td style="padding:40px 40px 24px;">
      <p style="margin:0 0 6px;font-family:Arial,sans-serif;font-size:11px;font-weight:bold;color:${GOLD};text-transform:uppercase;letter-spacing:0.1em;">Thank You</p>
      <h2 style="margin:0 0 24px;font-family:Georgia,serif;font-size:24px;font-weight:normal;color:${DARK};">Your inquiry has been received, ${data.firstName}.</h2>

      <p style="margin:0 0 16px;font-family:Georgia,serif;font-size:15px;color:${DARK};line-height:1.7;">
        I appreciate you reaching out about your project. Every space I work in is unique, and I'd love to learn more about yours.
      </p>
      <p style="margin:0 0 16px;font-family:Georgia,serif;font-size:15px;color:${DARK};line-height:1.7;">
        I'll be in touch within <strong>24 hours</strong> to discuss your vision and how we might bring it to life.
      </p>

      <table width="100%" cellpadding="0" cellspacing="0" style="background:#F0EDE8;border-left:3px solid ${GOLD};margin:24px 0;padding:0;">
        <tr><td style="padding:16px 20px;">
          <p style="margin:0 0 8px;font-family:Arial,sans-serif;font-size:11px;font-weight:bold;color:${GRAY};text-transform:uppercase;letter-spacing:0.08em;">What happens next</p>
          <p style="margin:0 0 6px;font-family:Georgia,serif;font-size:13px;color:${DARK};line-height:1.6;">1. I'll review the details of your inquiry</p>
          <p style="margin:0 0 6px;font-family:Georgia,serif;font-size:13px;color:${DARK};line-height:1.6;">2. I'll reach out personally to discuss your project and space</p>
          <p style="margin:0;font-family:Georgia,serif;font-size:13px;color:${DARK};line-height:1.6;">3. We'll schedule a consultation at your convenience</p>
        </td></tr>
      </table>

      <p style="margin:0 0 24px;font-family:Georgia,serif;font-size:15px;color:${DARK};line-height:1.7;">
        In the meantime, you're welcome to explore the full portfolio at <a href="${STUDIO_URL}" style="color:${GOLD};">studio.mishacreations.com</a>.
      </p>

      <p style="margin:0;font-family:Georgia,serif;font-size:15px;color:${DARK};line-height:1.7;">
        With warmth,<br>
        <em style="font-size:17px;">Misha</em><br>
        <span style="font-family:Arial,sans-serif;font-size:12px;color:${GRAY};">Misha Creations · Houston, Texas</span>
      </p>
    </td></tr>
  `);

  const text = `Thank you, ${data.firstName}.\n\nYour inquiry has been received. I'll be in touch within 24 hours to discuss your vision.\n\nWhat happens next:\n1. I'll review the details of your inquiry\n2. I'll reach out personally to discuss your project\n3. We'll schedule a consultation\n\nIn the meantime, explore the portfolio: ${STUDIO_URL}\n\nWith warmth,\nMisha\nMisha Creations · Houston, Texas`;

  return { subject, html, text };
}
