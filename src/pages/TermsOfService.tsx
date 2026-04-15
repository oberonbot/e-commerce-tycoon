import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10 first:mt-0">
      <h2 className="text-xl font-semibold text-slate-900">{title}</h2>
      <div className="mt-3 space-y-3 text-sm leading-relaxed text-slate-600">{children}</div>
    </section>
  );
}

export function TermsOfService() {
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-3xl px-4 py-16 md:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
          {t('terms.title')}
        </h1>
        <p className="mt-2 text-sm text-slate-500">{t('terms.lastUpdated')}</p>

        <div className="mt-10 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm md:p-8">
          <Section title={t('terms.s1Title')}>
            <p>{t('terms.s1Description')}</p>
          </Section>

          <Section title={t('terms.s2Title')}>
            <p>{t('terms.s2Description')}</p>
          </Section>

          <Section title={t('terms.s3Title')}>
            <p>{t('terms.s3Description')}</p>
          </Section>

          <Section title={t('terms.s4Title')}>
            <p>{t('terms.s4Description')}</p>
          </Section>

          <Section title={t('terms.s5Title')}>
            <p>{t('terms.s5Description')}</p>
          </Section>

          <Section title={t('terms.s6Title')}>
            <p>
              {t('terms.s6Description')}{' '}
              <Link to="/returns" className="text-brand-600 hover:underline">
                {t('terms.returnPolicy')}
              </Link>
              . {t('terms.s6Description2')}
            </p>
          </Section>

          <Section title={t('terms.s7Title')}>
            <p>{t('terms.s7Description')}</p>
          </Section>

          <Section title={t('terms.s8Title')}>
            <p>{t('terms.s8Description')}</p>
          </Section>

          <Section title={t('terms.s9Title')}>
            <p>{t('terms.s9Description')}</p>
          </Section>

          <Section title={t('terms.s10Title')}>
            <p>{t('terms.s10Description')}</p>
            <ul className="space-y-1">
              <li>
                {t('terms.contactEmail')}{' '}
                <a href="mailto:legal@techshell.com" className="text-brand-600 hover:underline">
                  legal@techshell.com
                </a>
              </li>
              <li>{t('terms.contactPhone')}</li>
              <li>{t('terms.contactAddress')}</li>
            </ul>
            <p className="pt-2">
              {t('terms.orVisit')}{' '}
              <Link to="/contact" className="text-brand-600 hover:underline">
                {t('terms.contactPage')}
              </Link>
              .
            </p>
          </Section>
        </div>
      </div>
    </div>
  );
}
