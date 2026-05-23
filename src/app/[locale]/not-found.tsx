import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';

export default async function NotFound() {
  const t = await getTranslations('home');
  return (
    <div className="px-5 md:px-10 min-h-[70vh] flex flex-col items-center justify-center text-center gap-6">
      <div className="raw-mark text-[28vw] md:text-[14vw] leading-[0.78]">
        404
      </div>
      <p className="opacity-60 max-w-sm">Page not found.</p>
      <Link href="/" className="btn-primary">
        {t('shopNow')}
      </Link>
    </div>
  );
}
