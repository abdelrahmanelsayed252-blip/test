'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import type { Product } from '@/lib/types';
import { formatPrice } from '@/lib/utils';

type ProductCardProps = {
  product: Product;
  priority?: boolean;
  size?: 'sm' | 'md' | 'lg';
};

export function ProductCard({
  product,
  priority = false,
  size = 'md'
}: ProductCardProps) {
  const locale = useLocale() as 'en' | 'ar';
  const t = useTranslations('product');
  const tc = useTranslations('common');
  const [hover, setHover] = useState(false);

  const totalStock = product.sizes.reduce((acc, s) => acc + s.stock, 0);
  const isNew = product.tags.includes('new');
  const isLimited = product.tags.includes('limited');

  const aspect =
    size === 'lg'
      ? 'aspect-[3/4]'
      : size === 'sm'
        ? 'aspect-[4/5]'
        : 'aspect-[4/5]';

  return (
    <Link
      href={`/shop/${product.slug}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="group block"
    >
      <div
        className={`relative ${aspect} overflow-hidden bg-[var(--border)]`}
      >
        <Image
          src={product.images[0]}
          alt={product.name[locale]}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className={`object-cover transition-all duration-[900ms] ease-editorial ${
            hover && product.images[1] ? 'opacity-0' : 'opacity-100'
          } group-hover:scale-[1.03]`}
        />
        {product.images[1] && (
          <Image
            src={product.images[1]}
            alt=""
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className={`object-cover transition-all duration-[900ms] ease-editorial ${
              hover ? 'opacity-100 scale-[1.03]' : 'opacity-0'
            }`}
          />
        )}

        <div className="absolute top-3 left-3 right-3 flex justify-between items-start gap-2 pointer-events-none">
          <div className="flex gap-1.5 flex-wrap">
            {isNew && (
              <span className="bg-brand-blue text-white text-[10px] font-bold tracking-[0.2em] uppercase px-2 py-1">
                {t('details') === 'Details' ? 'New' : 'جديد'}
              </span>
            )}
            {isLimited && (
              <span className="bg-[var(--fg)] text-[var(--bg)] text-[10px] font-bold tracking-[0.2em] uppercase px-2 py-1">
                {locale === 'ar' ? 'محدود' : 'Limited'}
              </span>
            )}
          </div>
          {totalStock === 0 && (
            <span className="bg-[var(--fg)] text-[var(--bg)] text-[10px] font-bold tracking-[0.2em] uppercase px-2 py-1">
              {t('soldOut')}
            </span>
          )}
        </div>
      </div>

      <div className="mt-4 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="text-sm font-bold leading-tight truncate">
            {product.name[locale]}
          </h3>
          <div className="mt-1 text-xs opacity-60 flex items-center gap-2">
            <span
              className="inline-block w-2.5 h-2.5 rounded-full border border-[var(--border)]"
              style={{ backgroundColor: product.colorHex }}
              aria-hidden
            />
            {product.subtitle[locale]}
          </div>
        </div>
        <div className="text-sm font-bold whitespace-nowrap tabular-nums">
          {formatPrice(product.price)}{' '}
          <span className="text-[10px] opacity-60">{tc('currency')}</span>
        </div>
      </div>
    </Link>
  );
}
