'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { X, Minus, Plus, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useEffect } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { useCart } from '@/context/CartContext';
import { Link } from '@/i18n/routing';
import { formatPrice } from '@/lib/utils';

export function CartDrawer() {
  const t = useTranslations('cart');
  const tc = useTranslations('common');
  const locale = useLocale() as 'en' | 'ar';
  const isRtl = locale === 'ar';
  const { items, isOpen, closeCart, removeItem, updateQuantity, subtotal } =
    useCart();

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeCart}
            className="fixed inset-0 z-[70] bg-black/50 backdrop-blur-sm"
          />
          <motion.aside
            key="drawer"
            initial={{ x: isRtl ? '-100%' : '100%' }}
            animate={{ x: 0 }}
            exit={{ x: isRtl ? '-100%' : '100%' }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className={`fixed top-0 ${
              isRtl ? 'left-0' : 'right-0'
            } z-[80] h-full w-full max-w-md bg-[var(--bg)] flex flex-col border-[var(--border)] ${
              isRtl ? 'border-r' : 'border-l'
            }`}
          >
            <div className="h-16 md:h-20 px-6 flex items-center justify-between border-b border-[var(--border)]">
              <div className="section-label">{t('title')}</div>
              <button
                type="button"
                onClick={closeCart}
                aria-label="Close"
                className="w-9 h-9 flex items-center justify-center -mr-2 hover:opacity-60"
              >
                <X size={20} strokeWidth={1.5} />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center px-8 text-center gap-3">
                <div className="text-3xl font-extrabold editorial">
                  {t('empty')}
                </div>
                <p className="text-sm opacity-60">{t('emptyDesc')}</p>
                <Link
                  href="/shop"
                  onClick={closeCart}
                  className="btn-primary mt-6"
                >
                  {t('continue')}
                </Link>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
                  {items.map((item) => (
                    <div
                      key={`${item.productId}-${item.size}`}
                      className="flex gap-4"
                    >
                      <Link
                        href={`/shop/${item.slug}`}
                        onClick={closeCart}
                        className="relative w-24 h-32 flex-shrink-0 bg-[var(--border)] overflow-hidden"
                      >
                        <Image
                          src={item.image}
                          alt=""
                          fill
                          sizes="96px"
                          className="object-cover"
                        />
                      </Link>
                      <div className="flex-1 flex flex-col">
                        <div className="flex justify-between items-start gap-2">
                          <div>
                            <div className="text-sm font-bold leading-tight">
                              {item.name[locale]}
                            </div>
                            <div className="text-xs opacity-60 mt-0.5">
                              {item.subtitle[locale]} · {item.size}
                            </div>
                          </div>
                          <div className="text-sm font-bold whitespace-nowrap">
                            {formatPrice(item.price * item.quantity)}{' '}
                            <span className="text-[10px] opacity-60">
                              {tc('currency')}
                            </span>
                          </div>
                        </div>
                        <div className="mt-auto flex items-center justify-between pt-3">
                          <div className="flex items-center border border-[var(--border)]">
                            <button
                              type="button"
                              aria-label="Decrease"
                              onClick={() =>
                                updateQuantity(
                                  item.productId,
                                  item.size,
                                  item.quantity - 1
                                )
                              }
                              className="w-8 h-8 flex items-center justify-center hover:opacity-60"
                            >
                              <Minus size={14} strokeWidth={1.5} />
                            </button>
                            <span className="w-8 text-center text-sm tabular-nums">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              aria-label="Increase"
                              onClick={() =>
                                updateQuantity(
                                  item.productId,
                                  item.size,
                                  item.quantity + 1
                                )
                              }
                              className="w-8 h-8 flex items-center justify-center hover:opacity-60"
                            >
                              <Plus size={14} strokeWidth={1.5} />
                            </button>
                          </div>
                          <button
                            type="button"
                            aria-label={t('remove')}
                            onClick={() =>
                              removeItem(item.productId, item.size)
                            }
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

                <div className="border-t border-[var(--border)] px-6 py-6 space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="opacity-60">{t('subtotal')}</span>
                    <span className="font-bold">
                      {formatPrice(subtotal)}{' '}
                      <span className="text-[10px] opacity-60">
                        {tc('currency')}
                      </span>
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs opacity-60">
                    <span>{t('shipping')}</span>
                    <span>{t('shippingCalc')}</span>
                  </div>
                  <Link
                    href="/checkout"
                    onClick={closeCart}
                    className="btn-primary w-full"
                  >
                    {t('checkout')}
                  </Link>
                  <Link
                    href="/cart"
                    onClick={closeCart}
                    className="block text-center text-xs font-bold tracking-[0.2em] uppercase hover:opacity-60"
                  >
                    {t('title')}
                  </Link>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
