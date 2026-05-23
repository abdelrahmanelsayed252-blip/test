'use client';

import Image from 'next/image';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { useCart } from '@/context/CartContext';
import { Link } from '@/i18n/routing';
import { formatPrice } from '@/lib/utils';
import { SectionLabel } from './SectionLabel';

export function CartPageClient() {
  const locale = useLocale() as 'en' | 'ar';
  const t = useTranslations('cart');
  const tc = useTranslations('common');
  const { items, removeItem, updateQuantity, subtotal } = useCart();

  return (
    <div className="px-5 md:px-10 pt-10 md:pt-16 pb-24">
      <div className="space-y-3 mb-10 md:mb-14">
        <SectionLabel label={t('title')} />
        <h1 className="text-5xl md:text-7xl font-extrabold editorial">
          {t('title')}.
        </h1>
      </div>

      {items.length === 0 ? (
        <div className="py-32 text-center max-w-md mx-auto space-y-6">
          <div className="text-3xl md:text-5xl font-extrabold editorial">
            {t('empty')}
          </div>
          <p className="opacity-60">{t('emptyDesc')}</p>
          <Link href="/shop" className="btn-primary inline-flex">
            {t('continue')}
          </Link>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-10 lg:gap-16">
          <div className="lg:col-span-2 divide-y divide-[var(--border)] border-y border-[var(--border)]">
            {items.map((item) => (
              <div
                key={`${item.productId}-${item.size}`}
                className="py-6 flex gap-4 md:gap-6"
              >
                <Link
                  href={`/shop/${item.slug}`}
                  className="relative w-28 h-36 md:w-36 md:h-44 flex-shrink-0 bg-[var(--border)] overflow-hidden"
                >
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    sizes="144px"
                    className="object-cover"
                  />
                </Link>
                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <Link
                        href={`/shop/${item.slug}`}
                        className="text-base md:text-lg font-bold leading-tight hover:opacity-60"
                      >
                        {item.name[locale]}
                      </Link>
                      <div className="text-xs opacity-60 mt-1">
                        {item.subtitle[locale]} · {t('size')}: {item.size}
                      </div>
                    </div>
                    <div className="text-base font-bold whitespace-nowrap tabular-nums">
                      {formatPrice(item.price * item.quantity)}{' '}
                      <span className="text-[10px] opacity-60 font-medium">
                        {tc('currency')}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center border border-[var(--border)]">
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(
                            item.productId,
                            item.size,
                            item.quantity - 1
                          )
                        }
                        className="w-10 h-10 flex items-center justify-center hover:opacity-60"
                      >
                        <Minus size={14} strokeWidth={1.5} />
                      </button>
                      <span className="w-10 text-center text-sm tabular-nums">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(
                            item.productId,
                            item.size,
                            item.quantity + 1
                          )
                        }
                        className="w-10 h-10 flex items-center justify-center hover:opacity-60"
                      >
                        <Plus size={14} strokeWidth={1.5} />
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(item.productId, item.size)}
                      className="text-xs opacity-60 hover:opacity-100 flex items-center gap-1.5"
                    >
                      <Trash2 size={14} strokeWidth={1.5} />
                      {t('remove')}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <aside className="lg:sticky lg:top-28 self-start border border-[var(--border)] p-6 md:p-8 space-y-5">
            <div className="section-label opacity-60">{t('title')}</div>
            <div className="flex justify-between text-sm">
              <span className="opacity-60">{t('subtotal')}</span>
              <span className="font-bold tabular-nums">
                {formatPrice(subtotal)} {tc('currency')}
              </span>
            </div>
            <div className="flex justify-between text-xs opacity-60">
              <span>{t('shipping')}</span>
              <span>{t('shippingCalc')}</span>
            </div>
            <div className="border-t border-[var(--border)] pt-4 flex justify-between text-base">
              <span className="font-bold">{t('total')}</span>
              <span className="font-bold tabular-nums">
                {formatPrice(subtotal)} {tc('currency')}
              </span>
            </div>
            <Link href="/checkout" className="btn-primary w-full">
              {t('checkout')}
            </Link>
            <Link
              href="/shop"
              className="block text-center text-xs font-bold tracking-[0.2em] uppercase opacity-60 hover:opacity-100"
            >
              {t('continue')}
            </Link>
          </aside>
        </div>
      )}
    </div>
  );
}
