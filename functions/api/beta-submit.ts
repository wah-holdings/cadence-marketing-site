interface BetaSubmission {
  first_name: string;
  last_name: string;
  work_email: string;
  company: string;
  role: string;
  team_size: string;
  work_model?: string;
  current_pain?: string;
  current_tools?: string;
}

export const onRequestPost: PagesFunction = async ({ request }) => {
  // CORS preflight handled by Cloudflare Pages automatically
  let body: BetaSubmission;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Basic validation
  const required: (keyof BetaSubmission)[] = ['first_name', 'last_name', 'work_email', 'company', 'role', 'team_size'];
  for (const field of required) {
    if (!body[field]?.toString().trim()) {
      return new Response(JSON.stringify({ error: `Missing required field: ${field}` }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  }

  // Sanitize: strip angle brackets to prevent header injection
  const safe = (s: string | undefined) => (s ?? '').replace(/[<>]/g, '');

  const emailText = `
Beta Access Request
===================
Name: ${safe(body.first_name)} ${safe(body.last_name)}
Email: ${safe(body.work_email)}
Company: ${safe(body.company)}
Role: ${safe(body.role)}
Company size: ${safe(body.team_size)}
Work model: ${safe(body.work_model)}
Current tools: ${safe(body.current_tools)}

Current challenge:
${safe(body.current_pain)}

Submitted: ${new Date().toISOString()}
  `.trim();

  const emailHtml = `
<h2>Beta Access Request</h2>
<table style="border-collapse:collapse;font-family:sans-serif;font-size:14px;">
  <tr><td style="padding:6px 16px 6px 0;font-weight:600;color:#1E3A5F;">Name</td><td>${safe(body.first_name)} ${safe(body.last_name)}</td></tr>
  <tr><td style="padding:6px 16px 6px 0;font-weight:600;color:#1E3A5F;">Email</td><td><a href="mailto:${safe(body.work_email)}">${safe(body.work_email)}</a></td></tr>
  <tr><td style="padding:6px 16px 6px 0;font-weight:600;color:#1E3A5F;">Company</td><td>${safe(body.company)}</td></tr>
  <tr><td style="padding:6px 16px 6px 0;font-weight:600;color:#1E3A5F;">Role</td><td>${safe(body.role)}</td></tr>
  <tr><td style="padding:6px 16px 6px 0;font-weight:600;color:#1E3A5F;">Company size</td><td>${safe(body.team_size)}</td></tr>
  <tr><td style="padding:6px 16px 6px 0;font-weight:600;color:#1E3A5F;">Work model</td><td>${safe(body.work_model) || '—'}</td></tr>
  <tr><td style="padding:6px 16px 6px 0;font-weight:600;color:#1E3A5F;">Current tools</td><td>${safe(body.current_tools) || '—'}</td></tr>
</table>
${body.current_pain ? `<h3 style="color:#1E3A5F;margin-top:20px;">Current challenge</h3><p style="font-size:14px;color:#475569;">${safe(body.current_pain).replace(/\n/g, '<br>')}</p>` : ''}
<p style="font-size:12px;color:#94A3B8;margin-top:24px;">Submitted: ${new Date().toISOString()}</p>
  `.trim();

  // Send via MailChannels (free, native to Cloudflare Workers)
  const mailChannelsPayload = {
    personalizations: [
      {
        to: [{ email: 'hello@cadencehr.ai', name: 'Cadence Team' }],
        reply_to: { email: safe(body.work_email), name: `${safe(body.first_name)} ${safe(body.last_name)}` },
      },
    ],
    from: { email: 'beta@cadencehr.ai', name: 'Cadence Beta Applications' },
    subject: `Beta access request: ${safe(body.first_name)} ${safe(body.last_name)} @ ${safe(body.company)}`,
    content: [
      { type: 'text/plain', value: emailText },
      { type: 'text/html', value: emailHtml },
    ],
  };

  const mailRes = await fetch('https://api.mailchannels.net/tx/v1/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(mailChannelsPayload),
  });

  if (!mailRes.ok && mailRes.status !== 202) {
    // Log but don't leak internal details to client
    console.error('MailChannels error:', mailRes.status, await mailRes.text());
    return new Response(JSON.stringify({ error: 'Failed to send' }), {
      status: 502,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};

// Handle OPTIONS preflight
export const onRequestOptions: PagesFunction = async () => {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': 'https://cadencehr.ai',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
};
