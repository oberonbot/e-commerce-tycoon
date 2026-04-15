import { useEffect, useState, type FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, HelpCircle } from 'lucide-react';

const subjectKeys = [
  'general',
  'product',
  'order',
  'return',
  'wholesale',
  'other',
] as const;

export function Contact() {
  const { t } = useTranslation();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: 'general',
    message: '',
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    setForm({ name: '', email: '', subject: 'general', message: '' });
  }

  const inputClass =
    'w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20';

  return (
    <div className="min-h-screen bg-slate-50">
      <section className="mx-auto max-w-7xl px-4 py-16 md:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
          {t('contact.title')}
        </h1>
        <p className="mt-3 max-w-2xl text-slate-600">
          {t('contact.subtitle')}
        </p>

        <div className="mt-12 grid gap-12 lg:grid-cols-5">
          {/* Info column */}
          <div className="flex flex-col gap-8 lg:col-span-2">
            <div className="flex items-start gap-4">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand-100 text-brand-600">
                <Mail className="size-5" strokeWidth={1.75} />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">{t('contact.emailLabel')}</h3>
                <a href="mailto:hello@techshell.com" className="text-sm text-brand-600 hover:underline">
                  hello@techshell.com
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand-100 text-brand-600">
                <Phone className="size-5" strokeWidth={1.75} />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">{t('contact.phoneLabel')}</h3>
                <a href="tel:+15551234567" className="text-sm text-slate-600 hover:text-brand-600">
                  (555) 123-4567
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand-100 text-brand-600">
                <MapPin className="size-5" strokeWidth={1.75} />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">{t('contact.addressLabel')}</h3>
                <p className="text-sm text-slate-600">
                  {t('contact.addressLine1')}<br />
                  {t('contact.addressLine2')}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand-100 text-brand-600">
                <Clock className="size-5" strokeWidth={1.75} />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">{t('contact.hoursLabel')}</h3>
                <p className="text-sm text-slate-600">{t('contact.hoursWeekday')}</p>
                <p className="text-sm text-slate-600">{t('contact.hoursWeekend')}</p>
              </div>
            </div>

            <div className="mt-auto rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <HelpCircle className="size-5 shrink-0 text-brand-600" />
                <h3 className="font-semibold text-slate-900">{t('contact.faqPromptTitle')}</h3>
              </div>
              <p className="mt-2 text-sm text-slate-600">
                {t('contact.faqPromptDescription')}
              </p>
              <Link
                to="/faq"
                className="mt-3 inline-block text-sm font-semibold text-brand-600 hover:text-brand-700"
              >
                {t('contact.visitFaq')}
              </Link>
            </div>
          </div>

          {/* Form column */}
          <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm md:p-8 lg:col-span-3">
            {submitted && (
              <div className="mb-6 flex items-start gap-3 rounded-lg bg-green-50 p-4 text-green-800">
                <CheckCircle className="mt-0.5 size-5 shrink-0" />
                <p className="text-sm font-medium">
                  {t('contact.successMessage')}
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div>
                <label htmlFor="contact-name" className="mb-1.5 block text-sm font-medium text-slate-700">
                  {t('contact.nameLabel')}
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder={t('contact.namePlaceholder')}
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="contact-email" className="mb-1.5 block text-sm font-medium text-slate-700">
                  {t('contact.emailFieldLabel')}
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder={t('contact.emailPlaceholder')}
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="contact-subject" className="mb-1.5 block text-sm font-medium text-slate-700">
                  {t('contact.subjectLabel')}
                </label>
                <select
                  id="contact-subject"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  className={inputClass}
                >
                  {subjectKeys.map((key) => (
                    <option key={key} value={key}>
                      {t(`contact.subjects.${key}`)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="contact-message" className="mb-1.5 block text-sm font-medium text-slate-700">
                  {t('contact.messageLabel')}
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  placeholder={t('contact.messagePlaceholder')}
                  className={inputClass + ' resize-y'}
                />
              </div>

              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700"
              >
                <Send className="size-4" />
                {t('contact.sendButton')}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
