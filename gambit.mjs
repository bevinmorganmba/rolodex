// netlify/functions/gambit.mjs
// This runs server-side on Netlify so your API key stays secret.
// Set ANTHROPIC_API_KEY in Netlify dashboard → Site settings → Environment variables

export default async (req) => {
  // Only accept POST
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return new Response(
      JSON.stringify({ error: 'API key not configured', gambit: null }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    const { contact } = await req.json();

    const context = [
      `Name: ${contact.firstName} ${contact.lastName || ''}`,
      contact.nickname && `Goes by: ${contact.nickname}`,
      contact.category && `Relationship: ${contact.category}`,
      contact.locationMet && `Met at: ${contact.locationMet}`,
      contact.mutualAssociates && `Mutual connections: ${contact.mutualAssociates}`,
      contact.notes && `Notes/context: ${contact.notes}`,
      contact.tags?.length && `Tags: ${contact.tags.join(', ')}`,
      contact.customFields &&
        Object.entries(contact.customFields)
          .filter(([, v]) => v)
          .map(([k, v]) => `${k}: ${v}`)
          .join(', '),
      contact.lastContact && `Last contacted: ${contact.lastContact}`,
    ]
      .filter(Boolean)
      .join('\n');

    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 300,
        messages: [
          {
            role: 'user',
            content: `You are helping someone maintain their personal network using Jordan Harbinger's networking philosophy: "dig the well before you're thirsty," always be giving (ABG), and keep touchpoints low-pressure. Generate a warm, natural re-engagement message for this contact.

CONTACT INFO:
${context}

RULES:
- Write ONE short, casual message (1-3 sentences max)
- Reference something specific from their notes/context if available
- Feel genuine and personal, not templated
- Include "(NNTR)" or "No need to respond" occasionally to keep it low-pressure
- If you know their interests/work, reference it naturally
- Don't be sycophantic or over-the-top
- Match the tone to the relationship type
- Output ONLY the message text, nothing else`,
          },
        ],
      }),
    });

    const data = await res.json();
    const gambit = data.content?.find((b) => b.type === 'text')?.text?.trim();

    return new Response(JSON.stringify({ gambit: gambit || null }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (e) {
    return new Response(
      JSON.stringify({ error: e.message, gambit: null }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

export const config = {
  path: '/api/gambit',
};
