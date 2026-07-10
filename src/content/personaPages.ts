import { g1SignupHref } from '../lib/g1CampaignLinks';

export type PersonaPage = {
  slug: string;
  aliases: string[];
  title: string;
  shortTitle: string;
  eyebrow: string;
  headline: string;
  description: string;
  trustLine: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  quote: string;
  quoteBy: string;
  currentState: string;
  cards: Array<{ label: string; headline: string; detail: string; status?: 'Live' | 'Preview' | 'Coming' }>;
};

export const personaPages: PersonaPage[] = [
  {
    slug: 'employees',
    aliases: ['individual-contributors', 'ics'],
    title: 'Cadence for Employees - Growth that actually happens',
    shortTitle: 'Employees',
    eyebrow: 'For Employees',
    headline: 'Your growth gets a plan, not just a conversation.',
    description:
      'Cadence turns every 1:1 into a growth moment. Your manager shows up with an agenda, your progress stays on record, and your development actually moves.',
    trustLine: "You are not being managed by AI. AI gives your manager better tools to develop you.",
    primaryCta: { label: 'Bring Cadence to my team', href: '/bring-to-team?persona=employee' },
    secondaryCta: { label: 'Start a trial workspace', href: g1SignupHref('employee', 'persona_cta') },
    quote:
      'I spent 18 months at my last company not knowing if I was on track for a promotion or heading toward a PIP. Cadence makes the record visible.',
    quoteBy: 'Software Engineer, L3',
    currentState:
      'Management quality should not be luck of the draw. Cadence creates a system where 1:1s, goals, recognition, and coaching become visible operating records instead of private memory.',
    cards: [
      {
        label: '1:1 Engine',
        headline: 'Your 1:1 has a real agenda, one you helped build.',
        detail:
          "Both you and your manager contribute before the meeting. Your scratchpad holds ideas until you are ready to share them, so the conversation starts from a shared point instead of a blank page.",
        status: 'Live',
      },
      {
        label: 'Goals Visibility',
        headline: 'Know where you stand, not just at review time.',
        detail:
          'Goal creation, updates, and progress workflows are live. Goal context inside the 1:1 remains preview until current tenant proof is attached.',
        status: 'Live',
      },
      {
        label: 'Recognition Log',
        headline: 'Your recognition does not get forgotten.',
        detail:
          'Give and receive recognition tied to values. Recognition history becomes part of the operating record, not a shoutout that disappears after the next reorg.',
        status: 'Live',
      },
      {
        label: 'Private Coaching',
        headline: 'Coaching on how you showed up, just for you.',
        detail:
          'Private coaching helps each participant prepare for better management conversations. Employee-lane coaching is available in Professional access.',
        status: 'Live',
      },
    ],
  },
  {
    slug: 'managers',
    aliases: ['manager'],
    title: 'Cadence for Managers - The 1:1 that actually prepares itself',
    shortTitle: 'Managers',
    eyebrow: 'For Managers',
    headline: 'The workspace you actually run your team in.',
    description:
      'Cadence prompts managers with the agenda, goals, recognition, and follow-through context they need before a conversation becomes a crisis.',
    trustLine: 'AI does the prep. You do the managing.',
    primaryCta: { label: 'Start a team trial', href: g1SignupHref('manager', 'persona_cta') },
    secondaryCta: { label: 'Bring Cadence to my team', href: '/bring-to-team?persona=manager' },
    quote:
      'The first month with Cadence showed me three relationships I was managing on autopilot that needed real attention.',
    quoteBy: 'VP Engineering',
    currentState:
      'Good management is hard because managers are expected to coach, recognize, document, and intervene consistently without a system. Cadence makes those behaviors the default workflow.',
    cards: [
      {
        label: '1:1 Workspace',
        headline: 'Your 1:1 agenda is ready when you open the invite.',
        detail:
          'Structured agendas, shared preparation, action items, decisions, and AI summaries are live workflows managers can run today.',
        status: 'Live',
      },
      {
        label: 'Private Coaching',
        headline: 'After every 1:1, coaching on how you showed up.',
        detail:
          'Manager-lane coaching helps managers improve without turning feedback into evaluation theater.',
        status: 'Live',
      },
      {
        label: 'Calibration Context',
        headline: 'Know where performance conversations need more rigor.',
        detail:
          'Core 9-box calibration with blind L1/L2 inputs and divergence review is live in Professional and Enterprise.',
        status: 'Live',
      },
      {
        label: 'Recognition Ratio',
        headline: 'The 5:1 ratio becomes visible.',
        detail:
          'Recognition posting is live. 5:1 ratio analysis and enforcement remain preview until verified as GA.',
        status: 'Preview',
      },
    ],
  },
  {
    slug: 'senior-leaders',
    aliases: ['leaders', 'l2'],
    title: 'Cadence for Senior Leaders - Signal across the management chain',
    shortTitle: 'Senior Leaders',
    eyebrow: 'For L2 and Senior Leaders',
    headline: 'Complete signal across your entire management chain.',
    description:
      'Senior leaders see management behavior patterns across 1:1s, goals, recognition, ER context, surveys, and calibration without micromanaging.',
    trustLine: 'Pattern detection for trained human review, not automated people decisions.',
    primaryCta: { label: 'Start an org trial', href: g1SignupHref('leader', 'persona_cta') },
    secondaryCta: { label: 'Explore Culture Scorecard', href: '/product#culture-scorecard' },
    quote:
      'I used to find out about management problems through resignations. Now I see the pattern earlier.',
    quoteBy: 'Chief Product Officer',
    currentState:
      'Senior leaders are accountable for outcomes produced by people they do not directly manage. They need signal early enough to coach the managers who own the relationships.',
    cards: [
      {
        label: 'Manager Scorecards',
        headline: 'See manager behavior patterns without reading every note.',
        detail:
          'Manager scorecard and org-health heatmap views are live. Full chain dashboards remain preview until tenant proof is attached.',
        status: 'Live',
      },
      {
        label: 'Calibration',
        headline: 'Track calibration participation and divergence.',
        detail: 'Independent 9-box ratings and convergence views are live.',
        status: 'Live',
      },
      {
        label: 'Survey Signal',
        headline: 'Use aggregate voice-of-employee signal responsibly.',
        detail:
          'Pulse responses and aggregate analytics are live. Manager-level breakdowns remain preview and must respect anonymity thresholds.',
        status: 'Preview',
      },
      {
        label: 'Top Talent',
        headline: 'KVD and retention-risk views stay roadmap-labeled.',
        detail:
          'Key Value Driver workflows, predictive retention, and advanced movement analysis are roadmap items, not current self-serve access.',
        status: 'Coming',
      },
    ],
  },
  {
    slug: 'chro',
    aliases: ['people-leaders'],
    title: 'Cadence for CHROs - Operational command, not just reporting',
    shortTitle: 'CHRO',
    eyebrow: 'For CHROs and People Leaders',
    headline: 'Operational command, not just reporting.',
    description:
      'Cadence gives People leaders a management operating view across live 1:1, ER, recognition, survey, goal, org-health, and 9-box calibration signals.',
    trustLine: 'A command center for accountable human leaders, not an automated employment-decision engine.',
    primaryCta: { label: 'Start a People team trial', href: g1SignupHref('chro', 'persona_cta') },
    secondaryCta: { label: 'Review pricing', href: '/pricing?persona=chro' },
    quote:
      'The ROI conversation starts with replacing fragmented management workflows. Roadmap previews show where Cadence is going next.',
    quoteBy: 'CHRO, mid-market technology company',
    currentState:
      'The traditional CHRO view is backwards-looking: turnover reports, ER case counts, and survey summaries published weeks after the moment to intervene has passed.',
    cards: [
      {
        label: 'Culture Scorecard',
        headline: 'Manager scorecard and org-health heatmap views are live.',
        detail: 'Board-ready reporting remains preview until verified as current customer access.',
        status: 'Live',
      },
      {
        label: 'ER Pipeline',
        headline: 'Formal people-process documentation lives with the management record.',
        detail: 'ER Command Center covers full case lifecycle in Professional and Enterprise.',
        status: 'Live',
      },
      {
        label: 'Calibration Command',
        headline: 'See 9-box cycle progress and divergence.',
        detail:
          '9-box calibration is live. KVD nominations and predictive intervention workflows remain roadmap previews.',
        status: 'Live',
      },
      {
        label: 'Retention Risk',
        headline: 'Predictive retention stays clearly labeled.',
        detail: 'Predictive retention warnings are planned, not currently available in production.',
        status: 'Coming',
      },
    ],
  },
  {
    slug: 'ceo',
    aliases: [],
    title: 'Cadence for CEOs - Is the organization healthy enough to execute?',
    shortTitle: 'CEO',
    eyebrow: 'For CEOs',
    headline: 'A strategic altitude view of whether the org is healthy.',
    description:
      'Cadence gives CEOs high-level Culture Scorecard metrics, manager-effectiveness hotspots, live 9-box calibration context, and focused drill-down.',
    trustLine: 'Signal, not noise. Drill down only when leadership action is needed.',
    primaryCta: { label: 'Start an executive trial', href: g1SignupHref('ceo', 'persona_cta') },
    secondaryCta: { label: 'Explore executive signal', href: '/solutions#ceo' },
    quote: 'The CEO view should answer one question quickly: is the organization healthy enough to execute?',
    quoteBy: 'Cadence product DNA',
    currentState:
      'The CEO does not need another daily workflow. The CEO needs a fast answer to whether management quality is strong enough for the company to execute.',
    cards: [
      {
        label: 'Culture Scorecard',
        headline: 'Understand org health without joining every people workflow.',
        detail: 'High-level scorecard and manager-effectiveness hotspots summarize where leadership attention is needed.',
        status: 'Live',
      },
      {
        label: 'Intervention Coverage',
        headline: 'Know whether at-risk situations have accountable follow-through.',
        detail: 'Live ER, goals, and calibration context make leadership follow-up visible.',
        status: 'Live',
      },
      {
        label: 'KVD Roster',
        headline: 'Top-talent designation stays roadmap-labeled.',
        detail: 'KVD roster, movement, and retention strategy workflows are roadmap views.',
        status: 'Coming',
      },
      {
        label: 'Drill-down',
        headline: 'Move from board-level signal to the specific area that needs a conversation.',
        detail: 'Use the executive rollup to find the manager, department, or rhythm that needs leadership attention.',
        status: 'Preview',
      },
    ],
  },
];

export const personaByPath = new Map<string, PersonaPage>(
  personaPages.flatMap((persona) => [[persona.slug, persona], ...persona.aliases.map((alias) => [alias, persona] as const)]),
);
