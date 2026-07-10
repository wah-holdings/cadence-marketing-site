import { g1SignupHref } from '../lib/g1CampaignLinks';

export const heroMessaging = {
  eyebrow: "Management Operating Plane for Distributed Teams",
  headline: "Close the remote-contributor management chasm.",
  subhead:
    "Cadence is the management operating plane for remote and hybrid companies that have outgrown proximity-based management.",
  body:
    "It turns 1:1s, goals, recognition, ER context, surveys, and culture signal into a human-owned system where AI develops managers and employees, humans remain accountable, and consented Personality Intelligence profiles support conversations — never scores.",
  primaryCta: {
    label: "Start free trial",
    href: g1SignupHref('home_hero', 'cta'),
  },
  secondaryCta: {
    label: "See product proof",
    href: "#proof",
  },
};

export const trustChips = [
  "Live workspace access",
  "Coming Q3 previews labeled",
  "Humans own decisions",
];

export const proofScreenshots = [
  {
    title: "Manager workspace",
    image: "/screenshots/cadence-homepage-hero-2026-05-16.png",
    text: "Live workspace view connecting manager health, goals, recognition, and culture signal.",
  },
  {
    title: "1:1 operating record",
    image: "/screenshots/cadence-1on1-mid-meeting-workspace-2026-05-14.png",
    text: "The management relationship record stays attached to agendas, decisions, and follow-through.",
  },
  {
    title: "Culture Scorecard",
    image: "/screenshots/cadence-chro-culture-scorecard-full-view-2026-05-14.png",
    text: "CHRO and L2 views connect live management workflows to org-health signal.",
  },
  {
    title: "Live vs. roadmap labeled",
    image: "/screenshots/cadence-9box-calibration-matrix-view-2026-05-14.png",
    text: "Core 9-box calibration is live for Professional and Enterprise; KVD, predictive retention, and advanced movement analysis stay roadmap-labeled.",
  },
];

export const marketingSyncPhrases = [
  heroMessaging.eyebrow,
  heroMessaging.headline,
  heroMessaging.secondaryCta.label,
  ...trustChips,
];
