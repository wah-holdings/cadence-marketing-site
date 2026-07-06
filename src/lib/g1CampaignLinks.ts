const signupBase = 'https://app.cadencehr.ai/signup';
const campaign = 'g1_self_serve_july';

type SignupMedium = 'cta' | 'pricing_cta';

export function g1SignupHref(
  content: string,
  medium: SignupMedium,
  params: Record<string, string> = {},
): string {
  const query = new URLSearchParams({
    ...params,
    intent: 'self-serve',
    utm_source: 'owned_site',
    utm_medium: medium,
    utm_campaign: campaign,
    utm_content: content,
  });

  return `${signupBase}?${query.toString()}`;
}

export function g1PricingHref(content: string): string {
  const query = new URLSearchParams({
    utm_source: 'owned_site',
    utm_medium: 'resource_cta',
    utm_campaign: campaign,
    utm_content: content,
  });

  return `/pricing?${query.toString()}`;
}
