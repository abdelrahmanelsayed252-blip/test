'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Link, usePathname } from '@/i18n/routing';
import { Wordmark } from './Logo';
import { ThemeToggle } from './ThemeToggle';
import { LanguageToggle } from './LanguageToggle';
import { CartButton } from './CartButton';
import { cn } from '@/lib/utils';

export function Header() {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          'fixed top-0 inset-x-0 z-50 transition-all duration-500 ease-editorial',
          scrolled
            ? 'backdrop-blur-md bg-[var(--bg)]/80 border-b border-[var(--border)]'
            : 'bg-transparent border-b border-transparent'
        )}
      >
        <div className="mx-auto max-w-[1600px] px-5 md:px-10 h-16 md:h-20 flex items-center justify-between">
          <div className="flex-1 flex items-center gap-6">
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label={t('menu')}
              className="md:hidden w-9 h-9 -ml-2 flex items-center justify-center"
            >
              <Menu size={20} strokeWidth={1.5} />
            </button>

            <nav className="hidden md:flex items-center gap-8 text-xs font-bold tracking-[0.2em] uppercase">
              <Link
                href="/shop"
                className="hover:opacity-60 transition-opacity"
              >
                {t('shop')}
              </Link>
              <Link
                href="/about"
                className="hover:opacity-60 transition-opacity"
              >
                {t('about')}
              </Link>
            </nav>
          </div>

          <Link
            href="/"
            aria-label="RAW Home"
            className="absolute left-1/2 -translate-x-1/2 flex items-center"
          >
            <Wordmark className="text-[28px] md:text-[34px]" />
          </Link>

          <div className="flex-1 flex items-center justify-end gap-1">
            <ThemeToggle />
            <LanguageToggle />
            <CartButton />
          </div>
        </div>
      </header>

      {/* Spacer so content isn't hidden under fixed header */}
      <div className="h-16 md:h-20" aria-hidden />

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-[var(--bg)] md:hidden flex flex-col"
          >
            <div className="h-16 px-5 flex items-center justify-between">
              <Wordmark className="text-[28px]" />
              <button
                type="button"
                aria-label={t('close')}
                onClick={() => setOpen(false)}
                className="w-9 h-9 -mr-2 flex items-center justify-center"
              >
                <X size={20} strokeWidth={1.5} />
              </button>
            </div>
            <nav className="flex-1 flex flex-col justify-center items-center gap-8 text-3xl font-extrabold tracking-tight">
              {[
                { href: '/shop', label: t('shop') },
                { href: '/about', label: t('about') }
              ].map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.08 }}
                >
                  <Link
                    href={item.href}
                    className="block py-2"
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="pb-10 text-center section-label opacity-60">
              EST. 2021 · @raw_eg_
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
