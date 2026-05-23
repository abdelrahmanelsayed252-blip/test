import { setRequestLocale } from 'next-intl/server';
import { ShopClient } from '@/components/ShopClient';
import { products } from '@/lib/products';

export default async function ShopPage({
  params
}: {
  params: { locale: string };
}) {
  const { locale } = params;
  setRequestLocale(locale);
  return <ShopClient products={products} />;
}
