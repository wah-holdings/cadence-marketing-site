import { proxyAppPath } from "./_seoProxy";

// /compare -> app.cadencehr.ai/compare so apex/www expose promoted cadence-web FAQPage JSON-LD.
export const onRequestGet = proxyAppPath("/compare");
