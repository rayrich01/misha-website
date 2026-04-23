// src/lib/ghl-client.ts
// GHL-FUNNEL-001: GoHighLevel API v2 client (PIT token auth)
// All calls are server-side only. Never import this in client components.

const GHL_BASE = 'https://services.leadconnectorhq.com';

const headers = () => ({
  'Authorization': `Bearer ${process.env.GHL_API_KEY}`,
  'Content-Type': 'application/json',
  'Version': '2021-07-28',
});

// ─── Types ────────────────────────────────────────────────────────────────────

export interface GHLContactPayload {
  firstName: string;
  lastName?: string;
  email: string;
  phone?: string;
  city?: string;
  state?: string;
  source?: string;
  tags?: string[];
  customField?: Record<string, string>;
}

export interface GHLOpportunityPayload {
  pipelineId: string;
  pipelineStageId: string;
  title: string;
  contactId: string;
  status?: 'open' | 'won' | 'lost' | 'abandoned';
  monetaryValue?: number;
}

export interface GHLContact {
  id: string;
  email: string;
  firstName: string;
  lastName?: string;
  [key: string]: unknown;
}

// ─── Custom field key → ID map (v2 requires IDs, not string keys) ────────────

const CUSTOM_FIELD_IDS: Record<string, string> = {
  inquiry_type:        '74JDN7C9OMAc1vOi5OzO',
  project_timeline:    'R1wwXXREOmuFApkLyMYD',
  budget:              'nnOvqSf4GzK6dHtKXJAQ',
  neighborhood:        'OEMsrFvGrIs9vfqQa39P',
  finish_category:     'T2nJVf2TBK4LzAmHx9GT',
  preferred_technique: 'KQDiCooKC9qnVxIk7JEt',
  color_direction:     'DzGnkDtxB8NlNvcRIyIi',
  surface_description: 'moBTxrATHsVdVHtGRfGL',
  lead_source_form:    'bfr7tamMdOliCrysZFoS',
  source_site:         'c8Mw9v6MnLldkaQxMbQ6',
  has_designer:        'jmylILJ47N1PYQqpHuIb',
  loss_reason:         'qdsmlkaMTJWGArZczI9D',
};

function toV2CustomFields(v1: Record<string, string>): Array<{ id: string; field_value: string }> {
  return Object.entries(v1)
    .filter(([key, val]) => val && CUSTOM_FIELD_IDS[key])
    .map(([key, val]) => ({ id: CUSTOM_FIELD_IDS[key], field_value: val }));
}

// ─── Contact operations ───────────────────────────────────────────────────────

export async function upsertContact(payload: GHLContactPayload): Promise<GHLContact> {
  const locationId = process.env.GHL_LOCATION_ID;
  if (!locationId) throw new Error('GHL_LOCATION_ID not configured');

  const { customField, ...rest } = payload;
  const customFields = customField ? toV2CustomFields(customField) : [];

  const body = {
    ...rest,
    locationId,
    tags: payload.tags || [],
    ...(customFields.length > 0 ? { customFields } : {}),
  };

  const res = await fetch(`${GHL_BASE}/contacts/`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify(body),
  });

  // Happy path — new contact created
  if (res.ok) {
    const data = await res.json();
    return data.contact as GHLContact;
  }

  // Duplicate contact — some GHL locations reject POST on existing email
  // and return 400 with the existing contactId in meta. Update tags +
  // custom fields on the existing contact so the inquiry still lands.
  if (res.status === 400) {
    const errBody = await res.json().catch(() => null);
    const existingId: string | undefined = errBody?.meta?.contactId;
    const isDuplicate = /duplicat/i.test(errBody?.message || '');

    if (existingId && isDuplicate) {
      // Fire in parallel — tag application + custom-field update
      await Promise.all([
        payload.tags?.length ? addTags(existingId, payload.tags) : Promise.resolve(),
        customFields.length > 0 ? updateContactCustomFields(existingId, customFields) : Promise.resolve(),
      ]);

      return {
        id: existingId,
        email: payload.email,
        firstName: payload.firstName,
        lastName: payload.lastName,
      } as GHLContact;
    }

    throw new Error(`GHL upsertContact failed (400): ${JSON.stringify(errBody)}`);
  }

  const errText = await res.text();
  throw new Error(`GHL upsertContact failed (${res.status}): ${errText}`);
}

// Update only custom fields on an existing contact (non-destructive — does
// not touch name, email, phone, etc. which may have cleaner data than what
// the form captured).
async function updateContactCustomFields(
  contactId: string,
  customFields: Array<{ id: string; field_value: string }>
): Promise<void> {
  const res = await fetch(`${GHL_BASE}/contacts/${contactId}`, {
    method: 'PUT',
    headers: headers(),
    body: JSON.stringify({ customFields }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`GHL updateContactCustomFields failed (${res.status}): ${err}`);
  }
}

export async function addTags(contactId: string, tags: string[]): Promise<void> {
  const res = await fetch(`${GHL_BASE}/contacts/${contactId}/tags`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({ tags }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`GHL addTags failed (${res.status}): ${err}`);
  }
}

export async function createOpportunity(payload: GHLOpportunityPayload): Promise<string> {
  const locationId = process.env.GHL_LOCATION_ID;

  const res = await fetch(`${GHL_BASE}/opportunities/`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({
      pipelineId: payload.pipelineId,
      pipelineStageId: payload.pipelineStageId,
      name: payload.title,
      contactId: payload.contactId,
      status: payload.status || 'open',
      monetaryValue: payload.monetaryValue,
      locationId,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`GHL createOpportunity failed (${res.status}): ${err}`);
  }

  const data = await res.json();
  return data.opportunity?.id as string;
}
