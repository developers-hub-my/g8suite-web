export type ProductStatus = 'live' | 'in-development' | 'planned';

export interface Stage1Product {
  category: string;
  name: string;
  focus: string;
  status: ProductStatus;
}

export interface Stage2Product {
  name: string;
  description: string;
  status: ProductStatus;
  note?: string;
}

export interface Stage2Wave {
  label: string;
  timeframe: string;
  products: Stage2Product[];
}

export const stage1Products: Stage1Product[] = [
  {
    category: 'Identity & Access',
    name: 'G8ID',
    focus: 'Identity governance, joiner-mover-leaver, access certification',
    status: 'live',
  },
  {
    category: 'API & Integration',
    name: 'g8stack',
    focus: 'API gateway and lifecycle management',
    status: 'live',
  },
  {
    category: 'Data Integration',
    name: 'g8connect',
    focus: 'No-code data-to-API pipelines',
    status: 'in-development',
  },
  {
    category: 'Infrastructure',
    name: 'g8deck',
    focus: 'Provisioning and platform operations',
    status: 'in-development',
  },
  {
    category: 'Security',
    name: 'g8shield',
    focus: 'Posture management, vulnerability scanning, CSPM',
    status: 'planned',
  },
  {
    category: 'Observability',
    name: 'g8scope',
    focus: 'Metrics, logs, distributed traces, application observability',
    status: 'live',
  },
  {
    category: 'Automation',
    name: 'g8flow',
    focus: 'Workflow orchestration and automation',
    status: 'planned',
  },
  {
    category: 'Compliance',
    name: 'g8audit',
    focus: 'Unified audit trail and evidence collection',
    status: 'planned',
  },
  {
    category: 'Identity Secrets',
    name: 'g8vault',
    focus: 'Secrets management and key lifecycle',
    status: 'planned',
  },
];

export const stage2Waves: Stage2Wave[] = [
  {
    label: 'Wave 1',
    timeframe: 'First',
    products: [
      {
        name: 'g8hr',
        description: 'Workforce records, onboarding, and lifecycle — wired to G8ID for joiner-mover-leaver.',
        status: 'planned',
      },
      {
        name: 'g8docs',
        description: 'Document and record management with first-class audit and retention controls.',
        status: 'planned',
      },
    ],
  },
  {
    label: 'Wave 2',
    timeframe: 'Next',
    products: [
      {
        name: 'g8procure',
        description: 'Procurement, vendor management, and approvals — orchestrated through g8flow.',
        status: 'planned',
      },
      {
        name: 'g8crm',
        description: 'Customer and stakeholder relationship management on the shared identity spine.',
        status: 'planned',
      },
      {
        name: 'g8desk',
        description: 'Service desk and ticketing across the organisation.',
        status: 'live',
        note: 'Already live ahead of Stage 2 sequencing.',
      },
    ],
  },
  {
    label: 'Wave 3',
    timeframe: 'Later',
    products: [
      {
        name: 'g8finance',
        description: 'Financial operations — ledgers, payables, receivables — with full audit through g8audit.',
        status: 'planned',
      },
    ],
  },
];

export const statusLabel: Record<ProductStatus, string> = {
  live: 'Live',
  'in-development': 'In development',
  planned: 'Planned',
};
