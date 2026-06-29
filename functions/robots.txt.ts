import { proxySeoAsset } from "./_seoProxy";

// /robots.txt -> app.cadencehr.ai/robots.txt (CAD-8204)
export const onRequestGet = proxySeoAsset("/robots.txt");
