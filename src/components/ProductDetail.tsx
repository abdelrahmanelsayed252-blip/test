'use client';

import Image from 'next/image';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import { Check, Minus, Plus } from 'lucide-react';
import type { Product } from '@/lib/types';
import { useCart } from '@/context/CartContext';
import { cn, formatPrice } from '@/lib/utils';
import { ProductCard } from './ProductCard';
import { SectionLabel } from './SectionLabel';

type Tab = 'details' | 'sizeGuide' | 'shipping';

export function ProductDetail({
  product,
  related
}: {
  product: Product;
  related: Product[];
}) {
  const locale = useLocale() as 'en' | 'ar';
  const t = useTranslations('product');
  const tc = useTranslations('common');
  const { addItem } = useCart();

  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [tab, setTab] = useState<Tab>('details');
  const [added, setAdded] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  const selected = selectedSize
    ? product.sizes.find((s) => s.size === selectedSize)
    : null;
  const totalStock = product.sizes.reduce((acc, s) => acc + s.stock, 0);
  const soldOut = totalStock === 0;

  function handleAdd() {
    if (!selectedSize || soldOut) return;
    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      subtitle: product.subtitle,
      image: product.images[0],
      color: product.color,
      size: selectedSize,
      price: product.price,
      quantity
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  const tabs: { id: Tab; label: string; body: string }[] = [
    {
      id: 'details',
      label: t('details'),
      body: product.description[locale]
    },
    { id: 'sizeGuide', label: t('sizeGuide'), body: t('sizeGuideText') },
    { id: 'shipping', label: t('shipping'), body: t('shippingText') }
  ];

  return (
    <div className="px-5 md:px-10 pt-6 md:pt-10">
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
        {/* GALLERY */}
        <div className="flex gap-4">
          <div className="hidden md:flex flex-col gap-3 w-20">
            {product.images.map((src, i) => (
              <button
                key={src}
                type="button"
                onClick={() => setActiveImage(i)}
                className={cn(
                  'relative aspect-[4/5] w-full overflow-hidden border-2 transition-colors bg-[var(--border)]',
                  activeImage === i
                    ? 'border-brand-blue'
                    : 'border-transparent'
                )}
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
          <div className="flex-1 space-y-3">
            <div className="relative w-full aspect-[4/5] overflow-hidden bg-[var(--border)]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={product.images[activeImage]}
                    alt={product.name[locale]}
                    fill
                    priority
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="md:hidden grid grid-cols-3 gap-2">
              {product.images.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => setActiveImage(i)}
                  className={cn(
                    'relative aspect-square overflow-hidden border-2 bg-[var(--border)]',
                    activeImage === i
                      ? 'border-brand-blue'
                      : 'border-transparent'
                  )}
                >
                  <Image src={src} alt="" fill sizes="33vw" className="object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* INFO */}
        <div className="lg:sticky lg:top-28 self-start">
          <div className="space-y-3">
            <SectionLabel label={product.subtitle[locale]} />
            <h1 className="text-3xl md:text-5xl font-extrabold editorial">
              {product.name[locale]}
            </h1>
            <div className="flex items-center gap-4 pt-2">
              <div className="text-2xl font-bold tabular-nums">
                {formatPrice(product.price)}{' '}
                <span className="text-xs opacity-60 font-medium">
                  {tc('currency')}
                </span>
              </div>
              {soldOut && (
                <span className="bg-[var(--fg)] text-[var(--bg)] text-[10px] font-bold tracking-[0.2em] uppercase px-2 py-1">
                  {t('soldOut')}
                </span>
              )}
              {!soldOut && selected && selected.stock < 3 && (
                <span className="bg-brand-blue text-white text-[10px] font-bold tracking-[0.2em] uppercase px-2 py-1">
                  {t('onlyLeft', { count: selected.stock })}
                </span>
              )}
            </div>
          </div>

          <p className="mt-6 text-sm opacity-70 leading-relaxed max-w-md">
            {product.description[locale]}
          </p>

          {/* Color */}
          <div className="mt-8">
            <div className="flex items-center justify-between mb-3">
              <div className="section-label opacity-60">{t('color')}</div>
              <div className="text-xs">{product.subtitle[locale]}</div>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                aria-label={product.color}
                className="relative w-10 h-10 rounded-full border-2 border-brand-blue p-0.5"
              >
                <span
                  className="block w-full h-full rounded-full border border-[var(--border)]"
                  style={{ backgroundColor: product.colorHex }}
                />
              </button>
            </div>
          </div>

          {/* Size */}
          <div className="mt-8">
            <div className="flex items-center justify-between mb-3">
              <div className="section-label opacity-60">{t('size')}</div>
              {!selectedSize && (
                <div className="text-[11px] opacity-60">{t('selectSize')}</div>
              )}
            </div>
            <div className="grid grid-cols-5 gap-2">
              {product.sizes.map((s) => {
                const isSelected = selectedSize === s.size;
                const isOut = s.stock === 0;
                return (
                  <button
                    key={s.size}
                    type="button"
                    disabled={isOut}
                    onClick={() => setSelectedSize(s.size)}
                    className={cn(
                      'h-12 border text-sm font-bold transition-all relative',
                      isSelected
                        ? 'border-brand-blue text-brand-blue'
                        : 'border-[var(--border)]',
                      isOut &&
                        'opacity-30 cursor-not-allowed line-through'
                    )}
                  >
                    {s.size}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Qty + Add */}
          <div className="mt-8 flex gap-3">
            <div className="flex items-center border border-[var(--border)] h-14">
              <button
                type="button"
                aria-label="Decrease"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-12 h-full flex items-center justify-center hover:opacity-60"
              >
                <Minus size={14} strokeWidth={1.5} />
              </button>
              <span className="w-10 text-center text-sm font-bold tabular-nums">
                {quantity}
              </span>
              <button
                type="button"
                aria-label="Increase"
                onClick={() => setQuantity((q) => q + 1)}
                className="w-12 h-full flex items-center justify-center hover:opacity-60"
              >
                <Plus size={14} strokeWidth={1.5} />
              </button>
            </div>
            <button
              type="button"
              onClick={handleAdd}
              disabled={!selectedSize || soldOut}
              className={cn(
                'flex-1 h-14 bg-brand-blue text-white text-xs font-bold tracking-[0.2em] uppercase transition-all flex items-center justify-center gap-2 relative overflow-hidden',
                (!selectedSize || soldOut) && 'opacity-40 cursor-not-allowed',
                !soldOut && selectedSize && 'hover:bg-[#003a8a]'
              )}
            >
              <AnimatePresence mode="wait">
                {added ? (
                  <motion.span
                    key="added"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    className="flex items-center gap-2"
                  >
                    <Check size={16} strokeWidth={2} />
                    {t('added')}
                  </motion.span>
                ) : (
                  <motion.span
                    key="add"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                  >
                    {soldOut ? t('soldOut') : t('addToCart')}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>

          {/* Tabs */}
          <div className="mt-12 border-t border-[var(--border)]">
            <div className="flex gap-6 pt-6">
              {tabs.map((tb) => (
                <button
                  key={tb.id}
                  type="button"
                  onClick={() => setTab(tb.id)}
                  className={cn(
                    'text-xs font-bold tracking-[0.2em] uppercase pb-2 border-b-2 transition-colors',
                    tab === tb.id
                      ? 'border-brand-blue text-brand-blue'
                      : 'border-transparent opacity-60 hover:opacity-100'
                  )}
                >
                  {tb.label}
                </button>
              ))}
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={tab}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="mt-4 text-sm opacity-70 leading-relaxed max-w-md whitespace-pre-line"
              >
                {tabs.find((tb) => tb.id === tab)?.body}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* RELATED */}
      <section className="mt-32">
        <div className="space-y-3 mb-10">
          <SectionLabel label={t('youMayLike')} />
          <h2 className="text-3xl md:text-5xl font-extrabold editorial">
            {t('youMayLike')}.
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {related.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
