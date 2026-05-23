'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Wordmark } from './Logo';
import { Instagram } from 'lucide-react';

export function Footer() {
  const t = useTranslations('footer');
  const tNav = useTranslations('nav');

  return (
    <footer className="mt-32 border-t border-[var(--border)]">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10 pt-20 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          <div className="md:col-span-5 flex flex-col gap-6">
            <Wordmark className="text-[72px] md:text-[96px] leading-none" />
            <p className="text-sm max-w-sm opacity-70 leading-relaxed">
              {t('tagline')} · EST. 2021
            </p>
            <a
              href="https://instagram.com/raw_eg_"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase hover:opacity-60 transition-opacity w-fit"
            >
              <Instagram size={16} strokeWidth={1.5} />
              @raw_eg_
            </a>
          </div>

          <div className="md:col-span-2">
            <div className="section-label opacity-50 mb-4">{t('shop')}</div>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/shop" className="hover:opacity-60 transition-opacity">
                  {tNav('shop')}
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:opacity-60 transition-opacity">
                  {tNav('about')}
                </Link>
              </li>
              <li>
                <Link href="/cart" className="hover:opacity-60 transition-opacity">
                  {tNav('cart')}
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <div className="section-label opacity-50 mb-4">
              {t('shippingPartners')}
            </div>
            <ul className="space-y-2 text-sm opacity-80">
              <li>Bosta</li>
              <li>Egyptian Post</li>
              <li>Aramex</li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <div className="section-label opacity-50 mb-4">{t('payment')}</div>
            <ul className="space-y-2 text-sm opacity-80">
              <li>Cash on Delivery</li>
              <li>InstaPay</li>
              <li>Vodafone Cash</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-6 border-t border-[var(--border)] flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-[11px] tracking-[0.25em] uppercase opacity-50">
          <div>© {new Date().getFullYear()} RAW. {t('rights')}</div>
          <div>{t('madeIn')} · EST. 2021</div>
        </div>
      </div>
    </footer>
  );
}
