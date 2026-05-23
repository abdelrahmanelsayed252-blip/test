'use client';

import { useTranslations } from 'next-intl';

export function Marquee() {
  const t = useTranslations('home');
  const items = [
    t('storyTitle'),
    '✦',
    'WEAR THE UNCOMMON',
    '✦',
    'EST. 2021',
    '✦',
    '@RAW_EG_',
    '✦'
  ];
  const repeated = Array.from({ length: 3 }).flatMap(() => items);

  return (
    <section className="py-10 md:py-14 border-y border-[var(--border)] overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap will-change-transform">
        {[...repeated, ...repeated].map((text, i) => (
          <span
            key={i}
            className="mx-6 text-xl md:text-3xl font-extrabold tracking-tight editorial uppercase opacity-90"
          >
            {text}
          </span>
        ))}
      </div>
    </section>
  );
}
