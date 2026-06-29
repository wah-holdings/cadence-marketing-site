import { proxySeoAsset } from "./_seoProxy";

// /llms.txt -> app.cadencehr.ai/llms.txt (CAD-8204)
export const onRequestGet = proxySeoAsset("/llms.txt");
