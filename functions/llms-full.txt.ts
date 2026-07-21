import { proxySeoAsset } from "./_seoProxy";

// /llms-full.txt -> app.cadencehr.ai/llms-full.txt (CAD-11172)
// Full-reference companion to /llms.txt; same single-source-of-truth proxy
// pattern as CAD-8204 so the app host stays canonical and content cannot drift.
export const onRequestGet = proxySeoAsset("/llms-full.txt");
