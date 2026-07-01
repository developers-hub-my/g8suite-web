import { defineCollection, z } from 'astro:content';

const stage = z.union([z.literal(1), z.literal(2), z.literal(3)]);

const status = z.enum([
  'live', // in production, sellable today
  'upcoming', // dated near-term launch (this quarter / a named month)
  'in_progress', // actively building, no firm date
  'roadmap', // committed, not started
  'brd', // requirements drafted, pre-build
]);

const deployment = z.enum(['on-prem', 'saas', 'hybrid', 'oss']);

const revenueEngine = z.enum([
  'enterprise-licence', // perpetual + support (B2G)
  'managed-saas', // recurring subscription / usage
  'open-core', // free core, paid platform/support
  'dual-licence', // OSS + commercial
  'consulting', // service, not product
]);

const products = defineCollection({
  type: 'content',
  schema: z.object({
    // identity
    code: z.string(), // 'g8stack' — also the slug
    title: z.string(), // 'API platform & gateway'
    tagline: z.string(), // one-liner, <= ~80 chars
    alias: z.string().optional(), // external brand, e.g. 'gatherhub'
    domain: z.string().url().optional(), // standalone domain, if any

    // taxonomy
    stage, // 1 | 2 | 3
    category: z.string(), // 'API & Integration'
    status,
    statusDate: z.string().optional(), // 'Aug 2026' | 'This quarter'

    // commercial
    deployment: z.array(deployment).min(1),
    revenueEngine,
    // Pricing is retained for internal record only. Per current direction it is
    // NOT rendered anywhere — every price surface reads "Contact us for more details".
    pricing: z.string(), // 'From RM 65k + support' | 'Free' | 'Talk to us' | 'TBC'
    sellable: z.boolean().default(true), // false = internal-only capability

    // detail-page content
    capabilities: z.array(z.string()).default([]),
    spine: z.array(z.string()).default([]), // spine services consumed/emitted: g8id, g8audit, g8flow, g8scope
    note: z.string().optional(), // sovereignty / architecture caveat

    // presentation control
    featured: z.boolean().default(false), // surface on homepage lineup
    order: z.number().default(99), // sort within category
    draft: z.boolean().default(false), // hide from build if true
  }),
});

export const collections = { products };
