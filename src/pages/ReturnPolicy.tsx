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

export function ReturnPolicy() {
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-3xl px-4 py-16 md:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
          {t('returns.title')}
        </h1>
        <p className="mt-2 text-sm text-slate-500">{t('returns.lastUpdated')}</p>

        <div className="mt-10 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm md:p-8">
          <Section title={t('returns.section1Title')}>
            <p>{t('returns.section1Description')}</p>
          </Section>

          <Section title={t('returns.section2Title')}>
            <p>{t('returns.section2Description')}</p>
            <ul className="list-disc space-y-1 pl-5">
              {(t('returns.section2Items', { returnObjects: true }) as string[]).map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </Section>

          <Section title={t('returns.section3Title')}>
            <ol className="list-decimal space-y-2 pl-5">
              {(t('returns.section3Steps', { returnObjects: true }) as string[]).map((step, i) => (
                <li key={i} dangerouslySetInnerHTML={{ __html: step }} />
              ))}
            </ol>
          </Section>

          <Section title={t('returns.section4Title')}>
            <p>{t('returns.section4Description')}</p>
          </Section>

          <Section title={t('returns.section5Title')}>
            <p>{t('returns.section5Description')}</p>
          </Section>

          <Section title={t('returns.section6Title')}>
            <p>{t('returns.section6Description')}</p>
          </Section>

          <Section title={t('returns.section7Title')}>
            <p>{t('returns.section7Description')}</p>
            <ul className="list-disc space-y-1 pl-5">
              {(t('returns.section7Items', { returnObjects: true }) as string[]).map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </Section>

          <Section title={t('returns.section8Title')}>
            <p>{t('returns.section8Description')}</p>
            <ul className="space-y-1">
              <li>
                {t('returns.contactEmail')}{' '}
                <a href="mailto:returns@techshell.com" className="text-brand-600 hover:underline">
                  returns@techshell.com
                </a>
              </li>
              <li>{t('returns.contactPhone')}</li>
              <li>{t('returns.contactHours')}</li>
            </ul>
            <p className="pt-2">
              {t('returns.orVisit')}{' '}
              <Link to="/contact" className="text-brand-600 hover:underline">
                {t('returns.contactPage')}
              </Link>{' '}
              {t('returns.toSendMessage')}
            </p>
          </Section>
        </div>
      </div>
    </div>
  );
}
