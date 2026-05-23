import productsData from '../../data/products.json';
import type { Product } from './types';

export const products: Product[] = productsData as Product[];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getFeaturedProducts(count = 3): Product[] {
  return products.slice(0, count);
}

export function getNewDropProducts(): Product[] {
  return products.filter((p) => p.tags.includes('new'));
}

export function getRelatedProducts(slug: string, count = 4): Product[] {
  return products.filter((p) => p.slug !== slug).slice(0, count);
}

export function getAllColors(): { name: string; hex: string }[] {
  const seen = new Set<string>();
  const colors: { name: string; hex: string }[] = [];
  for (const p of products) {
    if (!seen.has(p.color)) {
      seen.add(p.color);
      colors.push({ name: p.color, hex: p.colorHex });
    }
  }
  return colors;
}

export function getAllSizes(): string[] {
  return ['S', 'M', 'L', 'XL', 'XXL'];
}

export function getPriceRange(): { min: number; max: number } {
  const prices = products.map((p) => p.price);
  return { min: Math.min(...prices), max: Math.max(...prices) };
}
