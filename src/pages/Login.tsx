import { type FormEvent, useState } from 'react';
import { Link, Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';

const inputClass =
  'mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20';

export function Login() {
  const { t } = useTranslation();
  const { isAuthenticated, login } = useAuth();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const redirectTo = searchParams.get('redirect') || '/';

  if (isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmedEmail = email.trim();
    const trimmedName = name.trim();
    const local = trimmedEmail.split('@')[0] || 'Customer';
    login({
      email: trimmedEmail,
      name: trimmedName || local.replace(/\./g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
    });
    navigate(redirectTo, { replace: true });
  };

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-16">
      <div className="rounded-2xl border border-slate-200/80 bg-white p-8 shadow-sm ring-1 ring-slate-100/80">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-brand-600">TechShell</p>
        <h1 className="mt-2 text-center text-2xl font-bold tracking-tight text-slate-900">{t('auth.signIn')}</h1>
        <p className="mt-2 text-center text-sm text-slate-600">{t('auth.signInDesc')}</p>

        <form onSubmit={onSubmit} className="mt-8 space-y-4">
          <label className="block">
            <span className="text-sm font-medium text-slate-700">{t('auth.name')}</span>
            <input
              className={inputClass}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Alex Rivera"
              autoComplete="name"
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-slate-700">{t('auth.email')}</span>
            <input
              type="email"
              required
              className={inputClass}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              autoComplete="email"
            />
          </label>
          <button
            type="submit"
            className="mt-2 flex h-12 w-full items-center justify-center rounded-xl bg-brand-600 text-sm font-semibold text-white shadow-md shadow-brand-600/25 transition hover:bg-brand-700"
          >
            {t('auth.continue')}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-600">
          <Link to="/" className="font-medium text-brand-600 hover:text-brand-700">
            {t('auth.backToShop')}
          </Link>
        </p>
      </div>
    </div>
  );
}
