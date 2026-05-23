import { setRequestLocale } from 'next-intl/server';
import { CartPageClient } from '@/components/CartPageClient';

export default async function CartPage({
  params
}: {
  params: { locale: string };
}) {
  const { locale } = params;
  setRequestLocale(locale);
  return <CartPageClient />;
}
