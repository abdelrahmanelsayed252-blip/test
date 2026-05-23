import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { SectionLabel } from '@/components/SectionLabel';
import { Wordmark } from '@/components/Logo';

export default async function AboutPage({
  params
}: {
  params: { locale: string };
}) {
  const { locale } = params;
  setRequestLocale(locale);
  const t = await getTranslations('about');
  const tc = await getTranslations('common');
  const th = await getTranslations('home');

  return (
    <div className="px-5 md:px-10 pt-10 md:pt-16">
      <div className="space-y-3 max-w-4xl">
        <SectionLabel label={tc('established')} />
        <h1 className="text-5xl md:text-8xl font-extrabold editorial">
          {t('title')}.
        </h1>
      </div>

      <div className="mt-16 md:mt-24 grid lg:grid-cols-12 gap-10 lg:gap-16">
        <div className="lg:col-span-7 space-y-6 text-base md:text-lg leading-relaxed max-w-2xl">
          {t('body')
            .split('\n\n')
            .map((para, i) => (
              <p key={i} className={i === 0 ? 'text-xl md:text-2xl' : ''}>
                {para}
              </p>
            ))}
          <div className="pt-6">
            <Link href="/shop" className="btn-primary">
              {th('shopNow')}
            </Link>
          </div>
        </div>
        <div className="lg:col-span-5 space-y-4">
          <div className="relative aspect-[4/5] overflow-hidden bg-[var(--border)]">
            <Image
              src="/images/instagram/insta-1.jpg"
              alt=""
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="relative aspect-square overflow-hidden bg-[var(--border)]">
              <Image
                src="/images/instagram/insta-2.jpg"
                alt=""
                fill
                sizes="(min-width: 1024px) 20vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="relative aspect-square overflow-hidden bg-[var(--border)]">
              <Image
                src="/images/instagram/insta-3.jpg"
                alt=""
                fill
                sizes="(min-width: 1024px) 20vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-32 mb-10 bg-brand-blue text-white py-20 px-6 md:px-16 text-center">
        <Wordmark className="text-[120px] md:text-[200px] leading-none" />
        <div className="mt-6 section-label opacity-90">{tc('tagline')}</div>
      </div>
    </div>
  );
}
