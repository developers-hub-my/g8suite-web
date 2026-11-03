import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';
import type { Stage } from '~/lib/taxonomy';

export type Product = CollectionEntry<'products'>['data'];

// Single fetch used by every component that renders products — sorted by
// category, then in-category order, then title. Draft products are excluded.
export async function getProducts(): Promise<Product[]> {
  const entries = await getCollection('products', ({ data }) => !data.draft);
  return entries
    .map((e) => e.data)
    .sort(
      (a, b) =>
        a.category.localeCompare(b.category) ||
        a.order - b.order ||
        a.title.localeCompare(b.title),
    );
}

export async function getStageProducts(stage: Stage): Promise<Product[]> {
  return (await getProducts()).filter((p) => p.stage === stage);
}

// Standalone brands (Bliptrace, Homelor, GatherHub…) show their real name; suite
// modules (g8stack, g8deck…) keep the code. The code stays the URL slug either way.
export const productName = (p: Pick<Product, 'code' | 'alias'>): string => p.alias ?? p.code;
// Codes are data → mono; brand names are names → display face.
export const nameFont = (p: Pick<Product, 'alias'>): string => (p.alias ? 'font-display' : 'font-mono');
