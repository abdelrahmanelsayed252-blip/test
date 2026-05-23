'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { ArrowDown } from 'lucide-react';

export function Hero() {
  const t = useTranslations('home');
  const tc = useTranslations('common');

  return (
    <section className="relative min-h-[92vh] flex flex-col">
      <div className="flex-1 flex flex-col justify-center items-center px-5 text-center">
        <motion.div
          initial={{ opacity: 0, letterSpacing: '0.2em' }}
          animate={{ opacity: 0.6, letterSpacing: '0.32em' }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-[10px] md:text-[11px] tracking-[0.32em] uppercase mb-8 opacity-60"
        >
          {tc('established')} — Egypt
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="raw-mark text-[34vw] md:text-[28vw] leading-[0.78] text-[var(--fg)]"
        >
          RAW
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            delay: 0.3,
            ease: [0.22, 1, 0.36, 1]
          }}
          className="mt-10 max-w-xl mx-auto"
        >
          <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight uppercase editorial">
            {tc('tagline')}
          </h2>
          <p className="mt-4 text-sm md:text-base opacity-60 max-w-sm mx-auto">
            {t('heroSub')}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-12 flex items-center gap-4"
        >
          <Link href="/shop" className="btn-primary">
            {t('shopNow')}
          </Link>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1 }}
        className="pb-8 flex justify-center"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2 text-[10px] tracking-[0.32em] uppercase opacity-60"
        >
          {t('scroll')}
          <ArrowDown size={14} strokeWidth={1.5} />
        </motion.div>
      </motion.div>
    </section>
  );
}
