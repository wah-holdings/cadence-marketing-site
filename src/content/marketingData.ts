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
  "Roadmap previews labeled",
  "Humans own decisions",
];

export const proofScreenshots = [
  {
    title: "1:1 calendar rhythm",
    image: "/screenshots/cadence-calendar-meetings-rendered-2026-07-10.webp",
    text: "Rendered workspace view showing scheduled manager-report 1:1s with recurrence and status context.",
  },
  {
    title: "Goals in the operating plane",
    image: "/screenshots/cadence-goals-rendered-2026-07-10.webp",
    text: "Rendered goals surface showing company, team, and individual goals with progress and risk status.",
  },
  {
    title: "Personality with consent boundaries",
    image: "/screenshots/cadence-personality-rendered-2026-07-10.webp",
    text: "Rendered Personality surface showing working-style context as coaching support, not scoring.",
  },
  {
    title: "9-Box calibration matrix",
    image: "/screenshots/cadence-9box-calibration-matrix-view-2026-05-14.png",
    text: "Rendered 9-box calibration matrix with dual-rating context and roadmap-adjacent claims kept separate.",
  },
];

export const marketingSyncPhrases = [
  heroMessaging.eyebrow,
  heroMessaging.headline,
  heroMessaging.secondaryCta.label,
  ...trustChips,
];
