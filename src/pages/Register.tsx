import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';

type FieldErrors = {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  terms?: string;
};

export function Register() {
  const { t } = useTranslation();
  const { register } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [marketingOptIn, setMarketingOptIn] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const validate = (): boolean => {
    const next: FieldErrors = {};
    if (!name.trim()) next.name = t('auth.nameRequired');
    if (!email.trim()) next.email = t('auth.emailRequired');
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      next.email = t('auth.emailInvalid');
    }
    if (!password) next.password = t('auth.passwordRequired');
    if (!confirmPassword) next.confirmPassword = t('auth.confirmPasswordRequired');
    else if (password !== confirmPassword) {
      next.confirmPassword = t('auth.passwordsMismatch');
    }
    if (!termsAccepted) next.terms = t('auth.termsRequired');
    setFieldErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    if (!validate()) return;
    setLoading(true);
    try {
      await register(name.trim(), email.trim(), password);
      navigate('/verify-email', { replace: true });
    } catch (err) {
      setFormError(err instanceof Error ? err.message : t('auth.registrationFailed'));
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    'mt-1.5 w-full rounded-xl border bg-slate-50/50 px-3 py-2.5 text-sm text-slate-900 outline-none ring-brand-600/20 transition placeholder:text-slate-400 focus:bg-white focus:ring-4';
  const inputErrorClass = 'border-red-300 focus:border-red-500';
  const inputOkClass = 'border-slate-200 focus:border-brand-500';

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-gradient-to-b from-slate-50 to-white px-4 py-16">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-slate-200/80 bg-white p-8 shadow-sm shadow-slate-200/50">
          <h1 className="font-sans text-2xl font-bold tracking-tight text-slate-900">{t('auth.createAccount')}</h1>
          <p className="mt-2 text-sm text-slate-600">{t('auth.createAccountDesc')}</p>

          <form className="mt-8 space-y-5" onSubmit={handleSubmit} noValidate>
            {formError ? (
              <div
                role="alert"
                className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
              >
                {formError}
              </div>
            ) : null}

            <div>
              <label htmlFor="register-name" className="block text-sm font-medium text-slate-700">
                {t('auth.name')}
              </label>
              <input
                id="register-name"
                name="name"
                type="text"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`${inputClass} ${fieldErrors.name ? inputErrorClass : inputOkClass}`}
                placeholder="Alex Rivera"
              />
              {fieldErrors.name ? (
                <p className="mt-1.5 text-xs text-red-600">{fieldErrors.name}</p>
              ) : null}
            </div>

            <div>
              <label htmlFor="register-email" className="block text-sm font-medium text-slate-700">
                {t('auth.email')}
              </label>
              <input
                id="register-email"
                name="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`${inputClass} ${fieldErrors.email ? inputErrorClass : inputOkClass}`}
                placeholder="you@example.com"
              />
              {fieldErrors.email ? (
                <p className="mt-1.5 text-xs text-red-600">{fieldErrors.email}</p>
              ) : null}
            </div>

            <div>
              <label htmlFor="register-password" className="block text-sm font-medium text-slate-700">
                {t('auth.password')}
              </label>
              <input
                id="register-password"
                name="password"
                type="password"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`${inputClass} ${fieldErrors.password ? inputErrorClass : inputOkClass}`}
                placeholder="••••••••"
              />
              {fieldErrors.password ? (
                <p className="mt-1.5 text-xs text-red-600">{fieldErrors.password}</p>
              ) : null}
            </div>

            <div>
              <label
                htmlFor="register-confirm-password"
                className="block text-sm font-medium text-slate-700"
              >
                {t('auth.confirmPassword')}
              </label>
              <input
                id="register-confirm-password"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`${inputClass} ${fieldErrors.confirmPassword ? inputErrorClass : inputOkClass}`}
                placeholder="••••••••"
              />
              {fieldErrors.confirmPassword ? (
                <p className="mt-1.5 text-xs text-red-600">{fieldErrors.confirmPassword}</p>
              ) : null}
            </div>

            <label className="flex cursor-pointer items-start gap-3 text-sm text-slate-700">
              <input
                type="checkbox"
                checked={marketingOptIn}
                onChange={(e) => setMarketingOptIn(e.target.checked)}
                className="mt-0.5 size-4 shrink-0 rounded border-slate-300 text-brand-600 focus:ring-brand-600"
              />
              <span>{t('auth.marketingOptIn')}</span>
            </label>

            <div>
              <label className="flex cursor-pointer items-start gap-3 text-sm text-slate-700">
                <input
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  className="mt-0.5 size-4 shrink-0 rounded border-slate-300 text-brand-600 focus:ring-brand-600"
                />
                <span>
                  {t('auth.termsAgree')}{' '}
                  <Link to="/terms" className="font-semibold text-brand-600 hover:text-brand-700">
                    {t('auth.termsOfService')}
                  </Link>{' '}
                  {t('auth.and')}{' '}
                  <Link to="/privacy" className="font-semibold text-brand-600 hover:text-brand-700">
                    {t('auth.privacyPolicy')}
                  </Link>
                </span>
              </label>
              {fieldErrors.terms ? (
                <p className="mt-1.5 text-xs text-red-600">{fieldErrors.terms}</p>
              ) : null}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center rounded-xl bg-brand-600 px-4 py-3 text-sm font-semibold text-white shadow-sm shadow-brand-600/25 transition hover:bg-brand-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 disabled:pointer-events-none disabled:opacity-60"
            >
              {loading ? (
                <span className="inline-flex items-center gap-2">
                  <span
                    className="size-4 animate-spin rounded-full border-2 border-white/30 border-t-white"
                    aria-hidden
                  />
                  {t('auth.creatingAccount')}
                </span>
              ) : (
                t('auth.createAccount')
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-600">
            {t('auth.alreadyHaveAccount')}{' '}
            <Link to="/login" className="font-semibold text-brand-600 hover:text-brand-700">
              {t('auth.signIn')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
