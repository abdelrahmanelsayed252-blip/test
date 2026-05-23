import { setRequestLocale } from 'next-intl/server';
import { CheckoutClient } from '@/components/CheckoutClient';

export default async function CheckoutPage({
  params
}: {
  params: { locale: string };
}) {
  const { locale } = params;
  setRequestLocale(locale);
  return <CheckoutClient />;
}
