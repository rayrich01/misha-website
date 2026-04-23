// src/app/api/inquiry/route.ts
// GHL-FUNNEL-001: Inquiry Form Handler
//
// Handles POST from the Inquiry form on mishacreations.com
// Sequence:
//   1. Validate input
//   2. Send notification email → misha@mishacreations.com
//   3. Send confirmation email → submitter
//   4. Create/update GHL contact
//   5. Create GHL opportunity in Homeowner pipeline
//   6. Return 200

import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { upsertContact, createOpportunity } from '@/lib/ghl-client';
import {
  inquiryNotificationEmail,
  inquiryConfirmationEmail,
  InquiryFormData,
} from '@/lib/email-templates';

let _resend: Resend | null = null;
function getResend() {
  if (!_resend) _resend = new Resend(process.env.RESEND_API_KEY);
  return _resend;
}

// ─── Handler ──────────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  let body: Record<string, string>;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  // The form sends "name" as a single field — split into firstName / lastName
  const fullName = (body.name || '').trim();
  const nameParts = fullName.split(/\s+/);
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ') || '';

  if (!firstName) {
    return NextResponse.json({ error: 'Missing required field: name' }, { status: 400 });
  }

  const email = (body.email || '').trim().toLowerCase();
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Invalid or missing email address' }, { status: 400 });
  }

  // Sanitize — strip HTML from all string values
  const clean = (s: string) => (s || '').trim().replace(/<[^>]*>/g, '');

  const data: InquiryFormData = {
    firstName: clean(firstName),
    lastName: clean(lastName),
    email,
    phone: clean(body.phone),
    inquiryType: clean(body.projectType),
    roomType: clean(body.roomType),
    projectTimeline: clean(body.timeframe),
    message: clean(body.message),
    sourceSite: 'mishacreations.com',
    submittedAt: new Date().toLocaleString('en-US', {
      timeZone: 'America/Chicago',
      dateStyle: 'full',
      timeStyle: 'short',
    }),
  };

  const errors: string[] = [];

  // ── Step 1: Notification email to Misha ─────────────────────────────────────

  try {
    const notif = inquiryNotificationEmail(data);
    const { error } = await getResend().emails.send({
      from: process.env.FROM_EMAIL || 'hello@mishacreations.com',
      to: process.env.NOTIFICATION_EMAIL || 'misha@mishacreations.com',
      replyTo: data.email,
      subject: notif.subject,
      html: notif.html,
      text: notif.text,
    });
    if (error) throw new Error(error.message);
  } catch (e) {
    console.error('[GHL-FUNNEL-001] Notification email failed:', e);
    errors.push(`notification_email: ${e}`);
  }

  // ── Step 2: Confirmation email to submitter ──────────────────────────────────

  try {
    const confirm = inquiryConfirmationEmail(data);
    const { error } = await getResend().emails.send({
      from: process.env.FROM_EMAIL || 'hello@mishacreations.com',
      to: data.email,
      subject: confirm.subject,
      html: confirm.html,
      text: confirm.text,
    });
    if (error) throw new Error(error.message);
  } catch (e) {
    console.error('[GHL-FUNNEL-001] Confirmation email failed:', e);
    errors.push(`confirmation_email: ${e}`);
  }

  // ── Step 3: GHL contact upsert ───────────────────────────────────────────────

  let contactId: string | null = null;

  try {
    const contact = await upsertContact({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      city: 'Houston',
      state: 'TX',
      source: 'Inquiry Form — mishacreations.com',
      tags: ['SRC_WEBSITE_INQUIRE', 'INTENT_INQUIRED', 'PERS_HOMEOWNER'],
      customField: {
        inquiry_type: data.inquiryType || '',
        project_timeline: data.projectTimeline || '',
        neighborhood: data.neighborhood || '',
        lead_source_form: 'Inquiry Form',
        source_site: 'Main Site',
      },
    });
    contactId = contact.id;
  } catch (e) {
    console.error('[GHL-FUNNEL-001] GHL contact upsert failed:', e);
    errors.push(`ghl_contact: ${e}`);
  }

  // ── Step 4: GHL opportunity ──────────────────────────────────────────────────

  if (contactId && process.env.GHL_HOMEOWNER_PIPELINE_ID && process.env.GHL_HOMEOWNER_NEW_LEAD_STAGE_ID) {
    try {
      await createOpportunity({
        pipelineId: process.env.GHL_HOMEOWNER_PIPELINE_ID,
        pipelineStageId: process.env.GHL_HOMEOWNER_NEW_LEAD_STAGE_ID,
        title: `${data.firstName} ${data.lastName || ''} — ${data.inquiryType || 'Inquiry'} — Houston`.trim(),
        contactId,
        status: 'open',
      });
    } catch (e) {
      console.error('[GHL-FUNNEL-001] GHL opportunity creation failed:', e);
      errors.push(`ghl_opportunity: ${e}`);
    }
  }

  // ── Response ─────────────────────────────────────────────────────────────────

  // Fail the submission only if the notification email to Misha also failed —
  // the email is our lead-capture source of truth. GHL CRM upsert is secondary
  // tracking; log failures but do not block the user's success response when
  // Misha has already received the inquiry by email.
  if (errors.some(e => e.startsWith('notification_email'))) {
    return NextResponse.json(
      {
        error:
          'Form submission could not be processed. Please try again, e-mail us directly at misha@mishacreations.com or call/text Misha at 281-650-0500. We are sorry for the inconvenience.',
        errors,
      },
      { status: 500 }
    );
  }

  if (errors.length > 0) {
    console.error('[GHL-FUNNEL-001] Non-fatal errors on inquiry submission:', errors);
  }

  return NextResponse.json({
    success: true,
    message: 'Thank you for your inquiry. We will be in touch shortly.',
  });
}
