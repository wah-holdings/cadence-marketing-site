import { proxyAppPath } from "./_seoProxy";

// /product -> app.cadencehr.ai/product so apex/www expose promoted cadence-web JSON-LD.
export const onRequestGet = proxyAppPath("/product");
