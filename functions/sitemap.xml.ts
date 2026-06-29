import { proxySeoAsset } from "./_seoProxy";

// /sitemap.xml -> app.cadencehr.ai/sitemap.xml (CAD-8204)
export const onRequestGet = proxySeoAsset("/sitemap.xml");
