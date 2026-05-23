'use client';

import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { ChevronDown, SlidersHorizontal, X } from 'lucide-react';
import { ProductCard } from './ProductCard';
import { SectionLabel } from './SectionLabel';
import type { Product } from '@/lib/types';
import { cn } from '@/lib/utils';

type SortOption = 'newest' | 'price-asc' | 'price-desc';

export function ShopClient({ products }: { products: Product[] }) {
  const t = useTranslations('shop');
  const [sort, setSort] = useState<SortOption>('newest');
  const [colors, setColors] = useState<string[]>([]);
  const [sizes, setSizes] = useState<string[]>([]);
  const [priceMax, setPriceMax] = useState<number>(400);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const allColors = useMemo(() => {
    const seen = new Map<string, string>();
    for (const p of products) if (!seen.has(p.color)) seen.set(p.color, p.colorHex);
    return Array.from(seen, ([name, hex]) => ({ name, hex }));
  }, [products]);

  const allSizes = ['S', 'M', 'L', 'XL', 'XXL'];

  const filtered = useMemo(() => {
    let list = products.filter((p) => {
      if (colors.length > 0 && !colors.includes(p.color)) return false;
      if (
        sizes.length > 0 &&
        !p.sizes.some((s) => sizes.includes(s.size) && s.stock > 0)
      )
        return false;
      if (p.price > priceMax) return false;
      return true;
    });
    if (sort === 'price-asc') list = [...list].sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') list = [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [products, colors, sizes, priceMax, sort]);

  const toggleColor = (c: string) =>
    setColors((prev) => (prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]));
  const toggleSize = (s: string) =>
    setSizes((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));

  const clear = () => {
    setColors([]);
    setSizes([]);
    setPriceMax(400);
  };

  const activeFilters = colors.length + sizes.length + (priceMax < 400 ? 1 : 0);

  return (
    <div className="px-5 md:px-10 pt-10 md:pt-16">
      <div className="space-y-4">
        <SectionLabel label={t('subtitle')} />
        <h1 className="text-5xl md:text-7xl font-extrabold editorial">
          {t('title')}.
        </h1>
      </div>

      <div className="mt-10 md:mt-14 flex items-center justify-between border-y border-[var(--border)] py-4">
        <button
          type="button"
          onClick={() => setFiltersOpen((v) => !v)}
          className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase hover:opacity-60"
        >
          <SlidersHorizontal size={14} strokeWidth={1.5} />
          {t('filters')}
          {activeFilters > 0 && (
            <span className="ml-1 bg-brand-blue text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px]">
              {activeFilters}
            </span>
          )}
        </button>

        <div className="text-[11px] tracking-[0.2em] uppercase opacity-60">
          {t('results', { count: filtered.length })}
        </div>

        <div className="relative">
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortOption)}
            className="appearance-none bg-transparent border-0 pl-3 pr-7 py-1 text-xs font-bold tracking-[0.2em] uppercase cursor-pointer focus:outline-none"
          >
            <option value="newest">{t('sortNewest')}</option>
            <option value="price-asc">{t('sortPriceLow')}</option>
            <option value="price-desc">{t('sortPriceHigh')}</option>
          </select>
          <ChevronDown
            size={14}
            strokeWidth={1.5}
            className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none rtl:left-0 rtl:right-auto"
          />
        </div>
      </div>

      <AnimatePresence>
        {filtersOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-b border-[var(--border)]"
          >
            <div className="py-8 grid md:grid-cols-3 gap-8">
              <div>
                <div className="section-label opacity-60 mb-3">{t('color')}</div>
                <div className="flex flex-wrap gap-2">
                  {allColors.map((c) => (
                    <button
                      key={c.name}
                      type="button"
                      onClick={() => toggleColor(c.name)}
                      className={cn(
                        'flex items-center gap-2 border px-3 py-2 text-xs transition-colors',
                        colors.includes(c.name)
                          ? 'border-brand-blue text-brand-blue'
                          : 'border-[var(--border)]'
                      )}
                    >
                      <span
                        className="w-3 h-3 rounded-full border border-[var(--border)]"
                        style={{ backgroundColor: c.hex }}
                      />
                      {c.name}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <div className="section-label opacity-60 mb-3">{t('size')}</div>
                <div className="flex flex-wrap gap-2">
                  {allSizes.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => toggleSize(s)}
                      className={cn(
                        'w-11 h-11 border text-xs font-bold transition-colors',
                        sizes.includes(s)
                          ? 'border-brand-blue text-brand-blue'
                          : 'border-[var(--border)]'
                      )}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <div className="section-label opacity-60 mb-3">
                  {t('price')} (≤ {priceMax} EGP)
                </div>
                <input
                  type="range"
                  min={200}
                  max={400}
                  step={10}
                  value={priceMax}
                  onChange={(e) => setPriceMax(Number(e.target.value))}
                  className="w-full !p-0 !border-0 accent-brand-blue"
                />
                <div className="flex justify-between text-[10px] opacity-60 mt-2">
                  <span>200</span>
                  <span>400</span>
                </div>
              </div>
            </div>
            {activeFilters > 0 && (
              <div className="pb-6">
                <button
                  type="button"
                  onClick={clear}
                  className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase opacity-60 hover:opacity-100"
                >
                  <X size={14} strokeWidth={1.5} />
                  {t('clear')}
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-10 md:mt-14">
        {filtered.length === 0 ? (
          <div className="py-32 text-center opacity-60 text-lg">
            {t('noResults')}
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8">
            {filtered.map((p, i) => (
              <ProductCard key={p.id} product={p} priority={i < 2} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
