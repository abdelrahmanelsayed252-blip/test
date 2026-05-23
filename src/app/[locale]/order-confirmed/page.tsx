import { setRequestLocale } from 'next-intl/server';
import { OrderConfirmedClient } from '@/components/OrderConfirmedClient';

export default async function OrderConfirmedPage({
  params
}: {
  params: { locale: string };
}) {
  const { locale } = params;
  setRequestLocale(locale);
  return <OrderConfirmedClient />;
}
