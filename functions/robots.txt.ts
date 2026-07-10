import { robotsTxt } from "./_canonicalSeoAssets";

// /robots.txt points crawlers at the canonical Astro marketing-site sitemap.
export const onRequestGet = robotsTxt;
