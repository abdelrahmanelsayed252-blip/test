import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { Hero } from '@/components/Hero';
import { Marquee } from '@/components/Marquee';
import { ProductCard } from '@/components/ProductCard';
import { SectionLabel } from '@/components/SectionLabel';
import { getFeaturedProducts, getNewDropProducts } from '@/lib/products';
import { ArrowRight, Instagram } from 'lucide-react';

export default async function HomePage({
  params
}: {
  params: { locale: string };
}) {
  const { locale } = params;
  setRequestLocale(locale);

  const t = await getTranslations('home');
  const featured = getFeaturedProducts(3);
  const newDrop = getNewDropProducts();
  const instaImages = Array.from({ length: 8 }).map(
    (_, i) => `/images/instagram/insta-${i + 1}.jpg`
  );

  return (
    <div>
      <Hero />

      <Marquee />

      {/* FEATURED */}
      <section className="px-5 md:px-10 pt-24 md:pt-32">
        <div className="flex items-end justify-between mb-10 md:mb-14">
          <div className="space-y-3">
            <SectionLabel index="01 /" label={t('featured')} />
            <h2 className="text-4xl md:text-6xl font-extrabold editorial">
              {t('featured')}.
            </h2>
          </div>
          <Link
            href="/shop"
            className="hidden md:inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase hover:opacity-60"
          >
            {t('viewAll')}
            <ArrowRight size={16} strokeWidth={1.5} className="rtl:rotate-180" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {featured.map((p, i) => (
            <ProductCard
              key={p.id}
              product={p}
              priority={i === 0}
              size="lg"
            />
          ))}
        </div>
      </section>

      {/* NEW DROP */}
      <section className="px-5 md:px-10 pt-24 md:pt-32">
        <div className="grid md:grid-cols-12 gap-6 md:gap-10 items-center">
          <div className="md:col-span-5 space-y-6">
            <SectionLabel index="02 /" label={t('newDrop')} />
            <h2 className="text-4xl md:text-6xl font-extrabold editorial">
              {t('newDrop')}.
            </h2>
            <p className="text-base opacity-70 max-w-md">
              {t('newDropDesc')}
            </p>
            <Link href="/shop" className="btn-primary mt-4">
              {t('shopNow')}
            </Link>
          </div>
          <div className="md:col-span-7 grid grid-cols-2 gap-4 md:gap-6">
            {newDrop.slice(0, 4).map((p) => (
              <ProductCard key={p.id} product={p} size="sm" />
            ))}
          </div>
        </div>
      </section>

      {/* STORY STRIP */}
      <section className="mt-24 md:mt-32 px-5 md:px-10">
        <div className="bg-brand-blue text-white py-16 md:py-28 px-6 md:px-16 text-center">
          <SectionLabel
            index="03 /"
            label="Story"
            className="justify-center !opacity-80 text-white"
          />
          <h2 className="mt-6 text-3xl md:text-6xl font-extrabold editorial max-w-4xl mx-auto">
            {t('storyTitle')}
          </h2>
          <Link
            href="/about"
            className="mt-10 inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase border-b border-white/40 pb-1 hover:border-white"
          >
            {t('shopNow') === 'Shop Now' ? 'Read More' : 'اقرأ المزيد'}
            <ArrowRight size={14} strokeWidth={1.5} className="rtl:rotate-180" />
          </Link>
        </div>
      </section>

      {/* INSTAGRAM */}
      <section className="px-5 md:px-10 pt-24 md:pt-32">
        <div className="flex items-end justify-between mb-10 md:mb-14">
          <div className="space-y-3">
            <SectionLabel index="04 /" label="Instagram" />
            <h2 className="text-4xl md:text-6xl font-extrabold editorial">
              @raw_eg_
            </h2>
          </div>
          <a
            href="https://instagram.com/raw_eg_"
            target="_blank"
            rel="noreferrer"
            className="hidden md:inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase hover:opacity-60"
          >
            <Instagram size={16} strokeWidth={1.5} />
            {t('instagram')}
          </a>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-1.5 md:gap-2">
          {instaImages.map((src, i) => (
            <a
              key={i}
              href="https://instagram.com/raw_eg_"
              target="_blank"
              rel="noreferrer"
              className="relative aspect-square overflow-hidden bg-[var(--border)] group"
            >
              <Image
                src={src}
                alt=""
                fill
                sizes="(min-width: 768px) 25vw, 50vw"
                className="object-cover transition-transform duration-700 ease-editorial group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/40 transition-colors">
                <Instagram
                  size={22}
                  strokeWidth={1.5}
                  className="text-white opacity-0 group-hover:opacity-100 transition-opacity"
                />
              </div>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
