'use client';

import { useCart } from '@/context/CartContext';
import { useTranslations } from 'next-intl';
import { ShoppingBag } from 'lucide-react';

export function CartButton() {
  const t = useTranslations('nav');
  const { count, openCart } = useCart();

  return (
    <button
      type="button"
      aria-label={t('cart')}
      onClick={openCart}
      className="relative w-9 h-9 flex items-center justify-center transition-opacity hover:opacity-60"
    >
      <ShoppingBag size={18} strokeWidth={1.5} />
      {count > 0 && (
        <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] rounded-full bg-brand-blue text-white text-[10px] font-bold flex items-center justify-center px-1">
          {count}
        </span>
      )}
    </button>
  );
}
