'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import { Check } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { formatPrice } from '@/lib/utils';
import { SectionLabel } from './SectionLabel';

type Order = {
  orderNumber: string;
  total: number;
  subtotal: number;
  shippingFee: number;
  items: {
    productId: string;
    name: { en: string; ar: string };
    subtitle: { en: string; ar: string };
    size: string;
    quantity: number;
    price: number;
  }[];
};

export function OrderConfirmedClient() {
  const locale = useLocale() as 'en' | 'ar';
  const t = useTranslations('confirmed');
  const tc = useTranslations('common');
  const tco = useTranslations('checkout');
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem('raw-last-order');
      if (raw) setOrder(JSON.parse(raw));
    } catch {}
  }, []);

  return (
    <div className="px-5 md:px-10 pt-16 md:pt-24 pb-32 max-w-2xl mx-auto">
      <motion.div
        initial={{ scale: 0, rotate: -10 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{
          delay: 0.1,
          duration: 0.7,
          ease: [0.22, 1, 0.36, 1]
        }}
        className="w-16 h-16 mx-auto rounded-full bg-brand-blue text-white flex items-center justify-center mb-8"
      >
        <Check size={28} strokeWidth={2.5} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.7 }}
        className="text-center space-y-4"
      >
        <SectionLabel
          label={tc('established')}
          className="justify-center"
        />
        <h1 className="text-4xl md:text-6xl font-extrabold editorial">
          {t('title')}
        </h1>
        <p className="opacity-70 max-w-md mx-auto">{t('subtitle')}</p>
      </motion.div>

      {order && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="mt-12 border border-[var(--border)] p-6 md:p-8 space-y-6"
        >
          <div className="flex items-center justify-between border-b border-[var(--border)] pb-4">
            <div>
              <div className="section-label opacity-60 mb-1">
                {t('orderNumber')}
              </div>
              <div className="text-base font-bold tabular-nums">
                {order.orderNumber}
              </div>
            </div>
            <div className="text-right rtl:text-left">
              <div className="section-label opacity-60 mb-1">
                {tco('orderTotal')}
              </div>
              <div className="text-base font-bold tabular-nums">
                {formatPrice(order.total)} {tc('currency')}
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {order.items.map((item, i) => (
              <div
                key={`${item.productId}-${item.size}-${i}`}
                className="flex justify-between text-sm"
              >
                <div className="flex-1 min-w-0">
                  <div className="font-bold truncate">{item.name[locale]}</div>
                  <div className="opacity-60 text-xs mt-0.5">
                    {item.subtitle[locale]} · {item.size} × {item.quantity}
                  </div>
                </div>
                <div className="font-bold tabular-nums">
                  {formatPrice(item.price * item.quantity)}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-[var(--border)] pt-4 space-y-2 text-sm">
            <div className="flex justify-between opacity-70">
              <span>{tco('orderSubtotal')}</span>
              <span className="tabular-nums">
                {formatPrice(order.subtotal)} {tc('currency')}
              </span>
            </div>
            <div className="flex justify-between opacity-70">
              <span>{tco('orderShipping')}</span>
              <span className="tabular-nums">
                {formatPrice(order.shippingFee)} {tc('currency')}
              </span>
            </div>
          </div>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.7 }}
        className="mt-10 flex flex-col items-center gap-4"
      >
        <Link href="/shop" className="btn-primary">
          {t('backToShop')}
        </Link>
        <p className="text-xs opacity-60">{t('questions')}</p>
      </motion.div>
    </div>
  );
}
