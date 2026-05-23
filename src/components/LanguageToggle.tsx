'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import { useTransition } from 'react';

export function LanguageToggle() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [, startTransition] = useTransition();

  const next = locale === 'en' ? 'ar' : 'en';

  function toggle() {
    try {
      localStorage.setItem('raw-locale', next);
    } catch {}
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Language"
      className="h-9 px-3 flex items-center text-xs font-bold tracking-[0.2em] uppercase transition-opacity hover:opacity-60"
    >
      {locale === 'en' ? 'ع' : 'EN'}
    </button>
  );
}
