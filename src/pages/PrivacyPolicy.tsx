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

export function PrivacyPolicy() {
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-3xl px-4 py-16 md:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
          {t('privacy.title')}
        </h1>
        <p className="mt-2 text-sm text-slate-500">{t('privacy.lastUpdated')}</p>

        <div className="mt-10 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm md:p-8">
          <Section title={t('privacy.s1Title')}>
            <p>{t('privacy.s1DirectDescription')}</p>
            <ul className="list-disc space-y-1 pl-5">
              {(t('privacy.s1Items', { returnObjects: true }) as string[]).map((item, i) => (
                <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
              ))}
            </ul>
            <p>{t('privacy.s1AutoDescription')}</p>
            <ul className="list-disc space-y-1 pl-5">
              {(t('privacy.s1AutoItems', { returnObjects: true }) as string[]).map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </Section>

          <Section title={t('privacy.s2Title')}>
            <p>{t('privacy.s2Description')}</p>
            <ul className="list-disc space-y-1 pl-5">
              {(t('privacy.s2Items', { returnObjects: true }) as string[]).map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </Section>

          <Section title={t('privacy.s3Title')}>
            <p>{t('privacy.s3Description')}</p>
            <ul className="list-disc space-y-1 pl-5">
              {(t('privacy.s3Items', { returnObjects: true }) as string[]).map((item, i) => (
                <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
              ))}
            </ul>
          </Section>

          <Section title={t('privacy.s4Title')}>
            <p>{t('privacy.s4Description')}</p>
            <p>{t('privacy.s4TypesDescription')}</p>
            <ul className="list-disc space-y-1 pl-5">
              {(t('privacy.s4Items', { returnObjects: true }) as string[]).map((item, i) => (
                <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
              ))}
            </ul>
          </Section>

          <Section title={t('privacy.s5Title')}>
            <p>{t('privacy.s5Description')}</p>
          </Section>

          <Section title={t('privacy.s6Title')}>
            <p>{t('privacy.s6Description')}</p>
            <ul className="list-disc space-y-1 pl-5">
              {(t('privacy.s6Items', { returnObjects: true }) as string[]).map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
            <p>
              {t('privacy.s6Contact')}{' '}
              <a href="mailto:privacy@techshell.com" className="text-brand-600 hover:underline">
                privacy@techshell.com
              </a>
              . {t('privacy.s6ResponseTime')}
            </p>
          </Section>

          <Section title={t('privacy.s7Title')}>
            <p>{t('privacy.s7Description')}</p>
          </Section>

          <Section title={t('privacy.s8Title')}>
            <p>{t('privacy.s8Description')}</p>
          </Section>

          <Section title={t('privacy.s9Title')}>
            <p>{t('privacy.s9Description')}</p>
            <ul className="space-y-1">
              <li>
                {t('privacy.contactEmail')}{' '}
                <a href="mailto:privacy@techshell.com" className="text-brand-600 hover:underline">
                  privacy@techshell.com
                </a>
              </li>
              <li>{t('privacy.contactPhone')}</li>
              <li>{t('privacy.contactAddress')}</li>
            </ul>
            <p className="pt-2">
              {t('privacy.orVisit')}{' '}
              <Link to="/contact" className="text-brand-600 hover:underline">
                {t('privacy.contactPage')}
              </Link>
              .
            </p>
          </Section>
        </div>
      </div>
    </div>
  );
}
