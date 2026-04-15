import { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Mail } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';

export function VerifyEmail() {
  const { t } = useTranslation();
  const { user, verifyEmail } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [code, setCode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [resendHint, setResendHint] = useState<string | null>(null);

  const redirectTarget = searchParams.get('redirect');
  const safeRedirect =
    redirectTarget && redirectTarget.startsWith('/') && !redirectTarget.startsWith('//')
      ? redirectTarget
      : null;

  useEffect(() => {
    if (!user) {
      navigate('/login', { replace: true });
    }
  }, [user, navigate]);

  useEffect(() => {
    if (user?.emailVerified) {
      navigate(safeRedirect ?? '/', { replace: true });
    }
  }, [user, navigate, safeRedirect]);

  if (!user) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResendHint(null);
    setLoading(true);
    try {
      await verifyEmail(code);
      navigate(safeRedirect ?? '/', { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : t('auth.verificationFailed'));
    } finally {
      setLoading(false);
    }
  };

  const handleCodeChange = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 6);
    setCode(digits);
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-gradient-to-b from-slate-50 to-white px-4 py-16">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-slate-200/80 bg-white p-8 text-center shadow-sm shadow-slate-200/50">
          <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
            <Mail className="size-7" strokeWidth={1.75} aria-hidden />
          </div>
          <h1 className="mt-6 font-sans text-2xl font-bold tracking-tight text-slate-900">
            {t('auth.checkEmail')}
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">
            {t('auth.verificationSent')}{' '}
            <span className="font-semibold text-slate-900">{user.email}</span>
          </p>

          <form className="mt-8 text-left" onSubmit={handleSubmit}>
            {error ? (
              <div
                role="alert"
                className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
              >
                {error}
              </div>
            ) : null}
            {resendHint ? (
              <div
                role="status"
                className="mb-4 rounded-xl border border-brand-200 bg-brand-50 px-4 py-3 text-sm text-brand-900"
              >
                {resendHint}
              </div>
            ) : null}

            <label htmlFor="verify-code" className="block text-sm font-medium text-slate-700">
              {t('auth.verificationCode')}
            </label>
            <input
              id="verify-code"
              name="code"
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={6}
              value={code}
              onChange={(e) => handleCodeChange(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-3 text-center font-sans text-2xl font-semibold tracking-[0.35em] text-slate-900 outline-none ring-brand-600/20 transition focus:border-brand-500 focus:bg-white focus:ring-4"
              placeholder="••••••"
            />

            <button
              type="submit"
              disabled={loading || code.length !== 6}
              className="mt-6 flex w-full items-center justify-center rounded-xl bg-brand-600 px-4 py-3 text-sm font-semibold text-white shadow-sm shadow-brand-600/25 transition hover:bg-brand-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 disabled:pointer-events-none disabled:opacity-50"
            >
              {loading ? (
                <span className="inline-flex items-center gap-2">
                  <span
                    className="size-4 animate-spin rounded-full border-2 border-white/30 border-t-white"
                    aria-hidden
                  />
                  {t('auth.verifying')}
                </span>
              ) : (
                t('auth.verifyEmail')
              )}
            </button>
          </form>

          <button
            type="button"
            className="mt-6 text-sm font-semibold text-brand-600 transition hover:text-brand-700"
            onClick={() => {
              setResendHint(t('auth.resendHint'));
            }}
          >
            {t('auth.resendCode')}
          </button>

          <p className="mt-8 text-sm text-slate-600">
            {t('auth.wrongAddress')}{' '}
            <Link to="/register" className="font-semibold text-brand-600 hover:text-brand-700">
              {t('auth.goBack')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
