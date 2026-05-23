import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { ProductDetail } from '@/components/ProductDetail';
import { getProductBySlug, getRelatedProducts, products } from '@/lib/products';

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export default async function ProductPage({
  params
}: {
  params: { locale: string; slug: string };
}) {
  const { locale, slug } = params;
  setRequestLocale(locale);
  const product = getProductBySlug(slug);
  if (!product) notFound();
  const related = getRelatedProducts(slug, 4);
  return <ProductDetail product={product} related={related} />;
}
