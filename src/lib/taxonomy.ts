// Single source of truth for product taxonomy → display mapping.
// Derives labels, badge classes and page tier from the collection's typed fields
// so nothing about status/stage is duplicated across components.

export type Stage = 1 | 2 | 3;
export type ProductStatus = 'live' | 'upcoming' | 'in_progress' | 'roadmap' | 'brd';
export type Deployment = 'on-prem' | 'saas' | 'hybrid' | 'oss';
export type RevenueEngine =
  | 'enterprise-licence'
  | 'managed-saas'
  | 'open-core'
  | 'dual-licence'
  | 'consulting';

export const stageLabel: Record<Stage, string> = {
  1: 'Stage 1 · IT Operations',
  2: 'Stage 2 · Business Operations',
  3: 'Stage 3 · Industry Applications',
};

export const stageBlurb: Record<Stage, string> = {
  1: 'The run-side of the ecosystem — infrastructure and IT operations.',
  2: 'Business operations, built as part of the same suite.',
  3: 'Industry-oriented apps built in the suite, sold standalone.',
};

export const statusLabel: Record<ProductStatus, string> = {
  live: 'Live',
  upcoming: 'Upcoming',
  in_progress: 'In progress',
  roadmap: 'Roadmap',
  brd: 'BRD drafted',
};

// The upcoming badge shows its date ("Aug 2026") when one is set, else "Upcoming".
export function statusBadge(status: ProductStatus, statusDate?: string): string {
  if (status === 'upcoming' && statusDate) return statusDate;
  return statusLabel[status];
}

// Pill classes defined in src/styles/global.css (@layer components).
export const statusPill: Record<ProductStatus, string> = {
  live: 'pill-live',
  upcoming: 'pill-upcoming',
  in_progress: 'pill-progress',
  roadmap: 'pill-roadmap',
  brd: 'pill-brd',
};

// Public-facing status is collapsed to 3 buckets for display — the schema keeps
// the finer 5 statuses (they drive the detail-page tier), but visitors only see
// Live / In development / Planned.
export type DisplayStatus = 'live' | 'in-dev' | 'planned';

export function displayStatus(status: ProductStatus): DisplayStatus {
  if (status === 'live') return 'live';
  if (status === 'upcoming' || status === 'in_progress') return 'in-dev';
  return 'planned'; // roadmap | brd
}

export const displayStatusLabel: Record<DisplayStatus, string> = {
  live: 'Live',
  'in-dev': 'In development',
  planned: 'Planned',
};

export const displayStatusPill: Record<DisplayStatus, string> = {
  live: 'pill-live',
  'in-dev': 'pill-dev',
  planned: 'pill-planned',
};

// Detail-page tier is DERIVED from status — never stored (see spec §6.2).
export type Tier = 'full' | 'preview' | 'interest';

export const tierForStatus: Record<ProductStatus, Tier> = {
  live: 'full',
  upcoming: 'preview',
  in_progress: 'preview',
  roadmap: 'interest',
  brd: 'interest',
};

export const tierCta: Record<Tier, string> = {
  full: 'Request a demo',
  preview: 'Register interest',
  interest: 'Register interest',
};

export const deploymentLabel: Record<Deployment, string> = {
  'on-prem': 'On-premise',
  saas: 'SaaS',
  hybrid: 'Hybrid',
  oss: 'Open source',
};

export const revenueEngineLabel: Record<RevenueEngine, string> = {
  'enterprise-licence': 'Enterprise licence',
  'managed-saas': 'Managed SaaS',
  'open-core': 'Open core',
  'dual-licence': 'Dual licence',
  consulting: 'Consulting',
};

// Pricing is deliberately never shown — always route buyers to contact.
export const CONTACT_LINE = 'Contact us for more details.';
