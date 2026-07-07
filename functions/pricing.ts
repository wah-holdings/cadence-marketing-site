import { proxyAppPath } from "./_seoProxy";

// /pricing -> app.cadencehr.ai/pricing so apex/www expose promoted cadence-web JSON-LD.
export const onRequestGet = proxyAppPath("/pricing");
