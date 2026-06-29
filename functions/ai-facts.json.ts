import { proxySeoAsset } from "./_seoProxy";

// /ai-facts.json -> app.cadencehr.ai/ai-facts.json (CAD-8204)
export const onRequestGet = proxySeoAsset("/ai-facts.json");
