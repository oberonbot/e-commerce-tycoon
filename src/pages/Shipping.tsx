import { useEffect, useMemo, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, MapPin } from 'lucide-react';
import { CheckoutProgress } from '../components/checkout/CheckoutProgress';
import { OrderSummaryCard } from '../components/checkout/OrderSummaryCard';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import type { ShippingAddress, ShippingMethodId } from '../lib/techshellCheckout';
import {
  readStoredShipping,
  shippingAmountForMethod,
  writeStoredShipping,
} from '../lib/techshellCheckout';

const US_STATES: { code: string; name: string }[] = [
  { code: 'AL', name: 'Alabama' },
  { code: 'AK', name: 'Alaska' },
  { code: 'AZ', name: 'Arizona' },
  { code: 'AR', name: 'Arkansas' },
  { code: 'CA', name: 'California' },
  { code: 'CO', name: 'Colorado' },
  { code: 'CT', name: 'Connecticut' },
  { code: 'DE', name: 'Delaware' },
  { code: 'DC', name: 'District of Columbia' },
  { code: 'FL', name: 'Florida' },
  { code: 'GA', name: 'Georgia' },
  { code: 'HI', name: 'Hawaii' },
  { code: 'ID', name: 'Idaho' },
  { code: 'IL', name: 'Illinois' },
  { code: 'IN', name: 'Indiana' },
  { code: 'IA', name: 'Iowa' },
  { code: 'KS', name: 'Kansas' },
  { code: 'KY', name: 'Kentucky' },
  { code: 'LA', name: 'Louisiana' },
  { code: 'ME', name: 'Maine' },
  { code: 'MD', name: 'Maryland' },
  { code: 'MA', name: 'Massachusetts' },
  { code: 'MI', name: 'Michigan' },
  { code: 'MN', name: 'Minnesota' },
  { code: 'MS', name: 'Mississippi' },
  { code: 'MO', name: 'Missouri' },
  { code: 'MT', name: 'Montana' },
  { code: 'NE', name: 'Nebraska' },
  { code: 'NV', name: 'Nevada' },
  { code: 'NH', name: 'New Hampshire' },
  { code: 'NJ', name: 'New Jersey' },
  { code: 'NM', name: 'New Mexico' },
  { code: 'NY', name: 'New York' },
  { code: 'NC', name: 'North Carolina' },
  { code: 'ND', name: 'North Dakota' },
  { code: 'OH', name: 'Ohio' },
  { code: 'OK', name: 'Oklahoma' },
  { code: 'OR', name: 'Oregon' },
  { code: 'PA', name: 'Pennsylvania' },
  { code: 'RI', name: 'Rhode Island' },
  { code: 'SC', name: 'South Carolina' },
  { code: 'SD', name: 'South Dakota' },
  { code: 'TN', name: 'Tennessee' },
  { code: 'TX', name: 'Texas' },
  { code: 'UT', name: 'Utah' },
  { code: 'VT', name: 'Vermont' },
  { code: 'VA', name: 'Virginia' },
  { code: 'WA', name: 'Washington' },
  { code: 'WV', name: 'West Virginia' },
  { code: 'WI', name: 'Wisconsin' },
  { code: 'WY', name: 'Wyoming' },
];

const COUNTRIES = [
  { code: 'US', name: 'United States' },
  { code: 'CA', name: 'Canada' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'DE', name: 'Germany' },
  { code: 'FR', name: 'France' },
  { code: 'AU', name: 'Australia' },
  { code: 'JP', name: 'Japan' },
];

const inputClass =
  'mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20';

function emptyAddress(userEmail: string): ShippingAddress {
  return {
    fullName: '',
    email: userEmail,
    phone: '',
    line1: '',
    line2: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'US',
    saveAsDefault: false,
  };
}

export function Shipping() {
  const { t } = useTranslation();
  const { isAuthenticated, user } = useAuth();
  const { items, subtotal } = useCart();
  const navigate = useNavigate();

  const [method, setMethod] = useState<ShippingMethodId>('standard');
  const [address, setAddress] = useState<ShippingAddress>(() =>
    emptyAddress(user?.email ?? ''),
  );

  useEffect(() => {
    if (!user?.email) return;
    setAddress((prev) => ({ ...prev, email: prev.email || user.email }));
  }, [user?.email]);

  useEffect(() => {
    const saved = readStoredShipping();
    if (saved?.address) {
      setAddress(saved.address);
      setMethod(saved.method);
    }
  }, []);

  const shippingCost = useMemo(() => shippingAmountForMethod(method, subtotal), [method, subtotal]);

  const methodLine = useMemo(() => {
    if (method === 'standard') return t('checkout.methodLineStandard');
    if (method === 'express') return t('checkout.methodLineExpress');
    return t('checkout.methodLineOvernight');
  }, [method, t]);

  if (!isAuthenticated) {
    return <Navigate to="/login?redirect=/shipping" replace />;
  }

  if (user && !user.emailVerified) {
    return <Navigate to="/verify-email?redirect=/shipping" replace />;
  }

  if (items.length === 0) {
    return <Navigate to="/cart" replace />;
  }

  const setField = <K extends keyof ShippingAddress>(key: K, value: ShippingAddress[K]) => {
    setAddress((prev) => ({ ...prev, [key]: value }));
  };

  const onContinue = () => {
    const payload = { address, method, shippingCost };
    writeStoredShipping(payload);
    navigate('/payment');
  };

  const isUS = address.country === 'US';

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white pb-16 pt-8 md:pt-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-600">TechShell</p>
          <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
            {t('checkout.title')}
          </h1>
        </div>

        <CheckoutProgress activeStep={1} />

        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_380px] lg:items-start">
          <div className="space-y-10">
            <section className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm ring-1 ring-slate-100/80 md:p-8">
              <div className="flex items-start gap-3">
                <span className="flex size-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                  <MapPin className="size-5" strokeWidth={2} aria-hidden />
                </span>
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">{t('checkout.shippingAddress')}</h2>
                  <p className="mt-1 text-sm text-slate-600">{t('checkout.shippingAddressDesc')}</p>
                </div>
              </div>

              <div className="mt-8 grid gap-5 sm:grid-cols-2">
                <label className="block sm:col-span-2">
                  <span className="text-sm font-medium text-slate-700">{t('checkout.fullName')}</span>
                  <input
                    className={inputClass}
                    value={address.fullName}
                    onChange={(e) => setField('fullName', e.target.value)}
                    autoComplete="name"
                    required
                  />
                </label>
                <label className="block">
                  <span className="text-sm font-medium text-slate-700">{t('auth.email')}</span>
                  <input
                    type="email"
                    className={inputClass}
                    value={address.email}
                    onChange={(e) => setField('email', e.target.value)}
                    autoComplete="email"
                    required
                  />
                </label>
                <label className="block">
                  <span className="text-sm font-medium text-slate-700">{t('checkout.phone')}</span>
                  <input
                    type="tel"
                    className={inputClass}
                    value={address.phone}
                    onChange={(e) => setField('phone', e.target.value)}
                    autoComplete="tel"
                    required
                  />
                </label>
                <label className="block sm:col-span-2">
                  <span className="text-sm font-medium text-slate-700">{t('checkout.addressLine1')}</span>
                  <input
                    className={inputClass}
                    value={address.line1}
                    onChange={(e) => setField('line1', e.target.value)}
                    autoComplete="address-line1"
                    required
                  />
                </label>
                <label className="block sm:col-span-2">
                  <span className="text-sm font-medium text-slate-700">
                    {t('checkout.addressLine2')}{' '}
                    <span className="font-normal text-slate-400">({t('checkout.optional')})</span>
                  </span>
                  <input
                    className={inputClass}
                    value={address.line2}
                    onChange={(e) => setField('line2', e.target.value)}
                    autoComplete="address-line2"
                  />
                </label>
                <label className="block">
                  <span className="text-sm font-medium text-slate-700">{t('checkout.city')}</span>
                  <input
                    className={inputClass}
                    value={address.city}
                    onChange={(e) => setField('city', e.target.value)}
                    autoComplete="address-level2"
                    required
                  />
                </label>
                {isUS ? (
                  <label className="block">
                    <span className="text-sm font-medium text-slate-700">{t('checkout.state')}</span>
                    <select
                      className={inputClass}
                      value={address.state}
                      onChange={(e) => setField('state', e.target.value)}
                      autoComplete="address-level1"
                      required
                    >
                      <option value="">{t('checkout.selectState')}</option>
                      {US_STATES.map((s) => (
                        <option key={s.code} value={s.code}>
                          {s.name}
                        </option>
                      ))}
                    </select>
                  </label>
                ) : (
                  <label className="block">
                    <span className="text-sm font-medium text-slate-700">{t('checkout.stateProvince')}</span>
                    <input
                      className={inputClass}
                      value={address.state}
                      onChange={(e) => setField('state', e.target.value)}
                      required
                    />
                  </label>
                )}
                <label className="block">
                  <span className="text-sm font-medium text-slate-700">{t('checkout.zip')}</span>
                  <input
                    className={inputClass}
                    value={address.postalCode}
                    onChange={(e) => setField('postalCode', e.target.value)}
                    autoComplete="postal-code"
                    required
                  />
                </label>
                <label className="block">
                  <span className="text-sm font-medium text-slate-700">{t('checkout.country')}</span>
                  <select
                    className={inputClass}
                    value={address.country}
                    onChange={(e) => setField('country', e.target.value)}
                    autoComplete="country"
                    required
                  >
                    {COUNTRIES.map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <label className="mt-6 flex cursor-pointer items-center gap-3">
                <input
                  type="checkbox"
                  checked={address.saveAsDefault}
                  onChange={(e) => setField('saveAsDefault', e.target.checked)}
                  className="size-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
                />
                <span className="text-sm text-slate-700">{t('checkout.saveDefault')}</span>
              </label>
            </section>

            <section className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm ring-1 ring-slate-100/80 md:p-8">
              <h2 className="text-lg font-semibold text-slate-900">{t('checkout.shippingMethod')}</h2>
              <p className="mt-1 text-sm text-slate-600">{t('checkout.shippingMethodDesc')}</p>

              <fieldset className="mt-6 space-y-3">
                <legend className="sr-only">{t('checkout.shippingSpeed')}</legend>
                {(
                  [
                    {
                      id: 'standard' as const,
                      titleKey: 'checkout.standard' as const,
                      etaKey: 'checkout.standardEta' as const,
                      note: subtotal >= 50 ? t('checkout.freeOver50') : '$5.99',
                    },
                    {
                      id: 'express' as const,
                      titleKey: 'checkout.express' as const,
                      etaKey: 'checkout.expressEta' as const,
                      note: '$12.99',
                    },
                    {
                      id: 'overnight' as const,
                      titleKey: 'checkout.overnight' as const,
                      etaKey: 'checkout.overnightEta' as const,
                      note: '$24.99',
                    },
                  ] as const
                ).map((opt) => {
                  const cost = shippingAmountForMethod(opt.id, subtotal);
                  const selected = method === opt.id;
                  return (
                    <label
                      key={opt.id}
                      className={`flex cursor-pointer items-center justify-between gap-4 rounded-xl border px-4 py-4 transition ${
                        selected
                          ? 'border-brand-500 bg-brand-50/60 ring-2 ring-brand-500/20'
                          : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="shipMethod"
                          checked={selected}
                          onChange={() => setMethod(opt.id)}
                          className="size-4 border-slate-300 text-brand-600 focus:ring-brand-500"
                        />
                        <div>
                          <p className="font-semibold text-slate-900">{t(opt.titleKey)}</p>
                          <p className="text-sm text-slate-600">{t(opt.etaKey)}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-slate-900">
                          {cost <= 0 ? t('checkout.free') : `$${cost.toFixed(2)}`}
                        </p>
                        <p className="text-xs text-slate-500">{opt.note}</p>
                      </div>
                    </label>
                  );
                })}
              </fieldset>
            </section>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <Link
                to="/cart"
                className="inline-flex items-center justify-center gap-2 text-sm font-medium text-slate-600 transition hover:text-brand-600"
              >
                <ArrowLeft className="size-4" aria-hidden />
                {t('checkout.backToCart')}
              </Link>
              <button
                type="button"
                onClick={onContinue}
                className="inline-flex h-12 items-center justify-center rounded-xl bg-brand-600 px-8 text-sm font-semibold text-white shadow-lg shadow-brand-600/25 transition hover:bg-brand-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
              >
                {t('checkout.continueToPayment')}
              </button>
            </div>
          </div>

          <div className="lg:sticky lg:top-24">
            <OrderSummaryCard items={items} subtotal={subtotal} shipping={shippingCost} />
            <p className="mt-4 text-center text-xs leading-relaxed text-slate-500">
              {methodLine}. {t('checkout.includeTaxPercent', { percent: ((0.0825) * 100).toFixed(2) })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
