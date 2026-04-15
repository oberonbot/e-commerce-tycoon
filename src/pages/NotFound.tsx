import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export function NotFound() {
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <p className="text-8xl font-extrabold tracking-tight text-brand-600 md:text-9xl">404</p>
      <h1 className="mt-4 text-2xl font-bold text-slate-900 md:text-3xl">{t('notFound.title')}</h1>
      <p className="mt-3 max-w-md text-slate-600">
        {t('notFound.description')}
      </p>
      <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700"
        >
          {t('notFound.goHome')}
        </Link>
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          {t('notFound.contactSupport')}
        </Link>
      </div>
    </div>
  );
}
