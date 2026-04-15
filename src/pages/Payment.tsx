import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  ArrowLeft,
  Check,
  CreditCard,
  Loader2,
  Tag,
  Trash2,
} from 'lucide-react';
import { CheckoutProgress } from '../components/checkout/CheckoutProgress';
import { OrderSummaryCard } from '../components/checkout/OrderSummaryCard';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import type { LastOrderPayload, ShippingAddress } from '../lib/techshellCheckout';
import {
  estimateDeliveryRange,
  formatMoney,
  readStoredShipping,
  shippingAmountForMethod,
  shippingMethodLabel,
  writeLastOrder,
  writeStoredShipping,
} from '../lib/techshellCheckout';

const inputClass =
  'mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20';

type PayTab = 'card' | 'google' | 'apple';

function digitsOnly(s: string) {
  return s.replace(/\D/g, '');
}

function formatCardGroups(raw: string) {
  const d = digitsOnly(raw).slice(0, 19);
  const parts: string[] = [];
  for (let i = 0; i < d.length; i += 4) {
    parts.push(d.slice(i, i + 4));
  }
  return parts.join(' ');
}

function formatExpiry(raw: string) {
  const d = digitsOnly(raw).slice(0, 4);
  if (d.length <= 2) return d;
  return `${d.slice(0, 2)}/${d.slice(2)}`;
}

function emptyBilling(): ShippingAddress {
  return {
    fullName: '',
    email: '',
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

function generateOrderNumber() {
  const part = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `TS-${Date.now().toString(36).toUpperCase()}-${part}`;
}

export function Payment() {
  const { t } = useTranslation();
  const { isAuthenticated, user } = useAuth();
  const { items, subtotal, clearCart } = useCart();
  const navigate = useNavigate();

  const [shippingState, setShippingState] = useState(() => readStoredShipping());
  const [payTab, setPayTab] = useState<PayTab>('card');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardholder, setCardholder] = useState('');
  const [saveCard, setSaveCard] = useState(false);
  const [sameBilling, setSameBilling] = useState(true);
  const [billing, setBilling] = useState<ShippingAddress>(() => emptyBilling());

  const [promoInput, setPromoInput] = useState('');
  const [promoApplied, setPromoApplied] = useState<{ code: string; discount: number } | null>(null);

  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setShippingState(readStoredShipping());
  }, []);

  const shippingCost = useMemo(() => {
    if (!shippingState) return 0;
    return shippingAmountForMethod(shippingState.method, subtotal);
  }, [shippingState, subtotal]);

  const discount = promoApplied?.discount ?? 0;

  useEffect(() => {
    if (!shippingState) return;
    const nextCost = shippingAmountForMethod(shippingState.method, subtotal);
    if (nextCost !== shippingState.shippingCost) {
      const next = { ...shippingState, shippingCost: nextCost };
      setShippingState(next);
      writeStoredShipping(next);
    }
  }, [subtotal, shippingState]);

  useEffect(() => {
    setPromoApplied((prev) => {
      if (prev?.code !== 'TECH20') return prev;
      const nextDiscount = subtotal * 0.2;
      if (prev.discount === nextDiscount) return prev;
      return { code: 'TECH20', discount: nextDiscount };
    });
  }, [subtotal]);

  useEffect(() => {
    if (sameBilling && shippingState?.address) {
      setBilling(shippingState.address);
    }
  }, [sameBilling, shippingState?.address]);

  const setBillingField = useCallback(<K extends keyof ShippingAddress>(key: K, value: ShippingAddress[K]) => {
    setBilling((prev) => ({ ...prev, [key]: value }));
  }, []);

  const tryApplyPromo = () => {
    const code = promoInput.trim().toUpperCase();
    if (code === 'TECH20') {
      setPromoApplied({ code: 'TECH20', discount: subtotal * 0.2 });
      setPromoInput('');
    }
  };

  const removePromo = () => setPromoApplied(null);

  const placeOrder = () => {
    if (!shippingState || !user) return;
    setSubmitting(true);
    const orderNumber = generateOrderNumber();
    const shipAddr = shippingState.address;
    const billAddr = sameBilling ? shipAddr : billing;
    const digits = digitsOnly(cardNumber);
    const last4 = digits.length >= 4 ? digits.slice(-4) : '0000';

    window.setTimeout(() => {
      const taxable = Math.max(0, subtotal - discount);
      const taxAmount = taxable * 0.0825;
      const total = taxable + shippingCost + taxAmount;

      const payload: LastOrderPayload = {
        orderNumber,
        placedAt: new Date().toISOString(),
        customerName: user.name,
        customerEmail: user.email,
        lines: items.map((item) => ({
          productId: item.product.id,
          name: item.product.name,
          image: item.product.images[0] ?? '',
          quantity: item.quantity,
          unitPrice: item.product.price,
          selectedVariants: item.selectedVariants,
        })),
        subtotal,
        shippingLabel: shippingMethodLabel(shippingState.method),
        shippingAmount: shippingCost,
        taxRate: 0.0825,
        taxAmount,
        promoCode: promoApplied?.code ?? null,
        discountAmount: discount,
        total,
        shippingAddress: shipAddr,
        paymentMethod: payTab,
        cardLast4: payTab === 'card' ? last4 : null,
        billingSameAsShipping: sameBilling,
        billingAddress: sameBilling ? null : billAddr,
        estimatedDelivery: estimateDeliveryRange(shippingState.method),
      };

      writeLastOrder(payload);
      clearCart();
      setSubmitting(false);
      navigate(`/order-confirmation?order=${encodeURIComponent(orderNumber)}`, { replace: true });
    }, 2000);
  };

  if (!isAuthenticated) {
    return <Navigate to="/login?redirect=/payment" replace />;
  }

  if (user && !user.emailVerified) {
    return <Navigate to="/verify-email?redirect=/payment" replace />;
  }

  if (!shippingState) {
    return <Navigate to="/shipping" replace />;
  }

  if (items.length === 0) {
    return <Navigate to="/cart" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white pb-16 pt-8 md:pt-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-600">TechShell</p>
          <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
            {t('checkout.payment')}
          </h1>
        </div>

        <CheckoutProgress activeStep={2} />

        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_380px] lg:items-start">
          <div className="space-y-8">
            <section className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm ring-1 ring-slate-100/80 md:p-8">
              <h2 className="text-lg font-semibold text-slate-900">{t('checkout.paymentMethod')}</h2>
              <p className="mt-1 text-sm text-slate-600">{t('checkout.paymentDesc')}</p>

              <div className="mt-6 flex flex-wrap gap-2">
                {(
                  [
                    { id: 'card' as const, labelKey: 'checkout.creditDebitCard' as const },
                    { id: 'google' as const, labelKey: 'checkout.googlePay' as const },
                    { id: 'apple' as const, labelKey: 'checkout.applePay' as const },
                  ] as const
                ).map((tab) => {
                  const active = payTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setPayTab(tab.id)}
                      className={`rounded-xl border px-4 py-2.5 text-sm font-semibold transition ${
                        active
                          ? 'border-brand-600 bg-brand-600 text-white shadow-md shadow-brand-600/20'
                          : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      {t(tab.labelKey)}
                    </button>
                  );
                })}
              </div>

              {payTab === 'card' && (
                <div className="mt-8 space-y-5 border-t border-slate-100 pt-8">
                  <label className="block">
                    <span className="text-sm font-medium text-slate-700">{t('checkout.cardNumber')}</span>
                    <div className="relative mt-1.5">
                      <CreditCard
                        className="pointer-events-none absolute left-3.5 top-1/2 size-5 -translate-y-1/2 text-slate-400"
                        aria-hidden
                      />
                      <input
                        className={`${inputClass} pl-11 font-mono tracking-wide`}
                        inputMode="numeric"
                        autoComplete="cc-number"
                        placeholder="4242 4242 4242 4242"
                        value={formatCardGroups(cardNumber)}
                        onChange={(e) => setCardNumber(digitsOnly(e.target.value))}
                      />
                    </div>
                  </label>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <label className="block">
                      <span className="text-sm font-medium text-slate-700">{t('checkout.expiry')}</span>
                      <input
                        className={`${inputClass} font-mono`}
                        inputMode="numeric"
                        autoComplete="cc-exp"
                        placeholder="MM/YY"
                        value={formatExpiry(expiry)}
                        onChange={(e) => setExpiry(digitsOnly(e.target.value))}
                      />
                    </label>
                    <label className="block">
                      <span className="text-sm font-medium text-slate-700">{t('checkout.cvv')}</span>
                      <input
                        className={`${inputClass} font-mono`}
                        inputMode="numeric"
                        autoComplete="cc-csc"
                        placeholder="123"
                        maxLength={4}
                        value={cvv}
                        onChange={(e) => setCvv(digitsOnly(e.target.value).slice(0, 4))}
                      />
                    </label>
                  </div>
                  <label className="block">
                    <span className="text-sm font-medium text-slate-700">{t('checkout.cardholderName')}</span>
                    <input
                      className={inputClass}
                      autoComplete="cc-name"
                      placeholder={t('checkout.nameOnCard')}
                      value={cardholder}
                      onChange={(e) => setCardholder(e.target.value)}
                    />
                  </label>
                  <label className="flex cursor-pointer items-center gap-3">
                    <input
                      type="checkbox"
                      checked={saveCard}
                      onChange={(e) => setSaveCard(e.target.checked)}
                      className="size-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
                    />
                    <span className="text-sm text-slate-700">{t('checkout.saveCard')}</span>
                  </label>
                </div>
              )}

              {payTab === 'google' && (
                <div className="mt-8 border-t border-slate-100 pt-8">
                  <button
                    type="button"
                    className="flex h-14 w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white text-[15px] font-semibold text-slate-800 shadow-sm transition hover:bg-slate-50"
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-lg font-bold">
                      <span className="bg-gradient-to-br from-blue-500 via-amber-500 to-emerald-600 bg-clip-text text-transparent">
                        G
                      </span>
                    </span>
                    {t('checkout.payWithGooglePay')}
                  </button>
                </div>
              )}

              {payTab === 'apple' && (
                <div className="mt-8 border-t border-slate-100 pt-8">
                  <button
                    type="button"
                    className="flex h-14 w-full items-center justify-center rounded-xl bg-black text-[15px] font-semibold text-white transition hover:bg-slate-900"
                  >
                    {t('checkout.payWithApplePay')}
                  </button>
                </div>
              )}
            </section>

            <section className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm ring-1 ring-slate-100/80 md:p-8">
              <div className="flex items-center gap-2">
                <Tag className="size-5 text-brand-600" aria-hidden />
                <h2 className="text-lg font-semibold text-slate-900">{t('checkout.promoCode')}</h2>
              </div>
              {!promoApplied ? (
                <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                  <input
                    className={inputClass + ' mt-0 sm:flex-1'}
                    placeholder={t('checkout.enterCode')}
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        tryApplyPromo();
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={tryApplyPromo}
                    className="h-[42px] shrink-0 rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-800 transition hover:bg-slate-50"
                  >
                    {t('checkout.apply')}
                  </button>
                </div>
              ) : (
                <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-emerald-200 bg-emerald-50/60 px-4 py-3">
                  <div className="flex items-center gap-2 text-emerald-800">
                    <span className="flex size-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                      <Check className="size-4" strokeWidth={2.5} aria-hidden />
                    </span>
                    <div>
                      <p className="text-sm font-semibold">
                        {promoApplied.code} {t('checkout.applied')}
                      </p>
                      <p className="text-xs text-emerald-700">
                        {t('checkout.youSave')} {formatMoney(promoApplied.discount)}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={removePromo}
                    className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium text-emerald-900 transition hover:bg-emerald-100/80"
                  >
                    <Trash2 className="size-4" aria-hidden />
                    {t('checkout.remove')}
                  </button>
                </div>
              )}
            </section>

            <section className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm ring-1 ring-slate-100/80 md:p-8">
              <h2 className="text-lg font-semibold text-slate-900">{t('checkout.billingAddress')}</h2>
              <label className="mt-4 flex cursor-pointer items-center gap-3">
                <input
                  type="checkbox"
                  checked={sameBilling}
                  onChange={(e) => setSameBilling(e.target.checked)}
                  className="size-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
                />
                <span className="text-sm text-slate-700">{t('checkout.sameAsShipping')}</span>
              </label>

              {!sameBilling && (
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <label className="block sm:col-span-2">
                    <span className="text-sm font-medium text-slate-700">{t('checkout.fullName')}</span>
                    <input
                      className={inputClass}
                      value={billing.fullName}
                      onChange={(e) => setBillingField('fullName', e.target.value)}
                    />
                  </label>
                  <label className="block">
                    <span className="text-sm font-medium text-slate-700">{t('auth.email')}</span>
                    <input
                      type="email"
                      className={inputClass}
                      value={billing.email}
                      onChange={(e) => setBillingField('email', e.target.value)}
                    />
                  </label>
                  <label className="block">
                    <span className="text-sm font-medium text-slate-700">{t('checkout.phone')}</span>
                    <input
                      type="tel"
                      className={inputClass}
                      value={billing.phone}
                      onChange={(e) => setBillingField('phone', e.target.value)}
                    />
                  </label>
                  <label className="block sm:col-span-2">
                    <span className="text-sm font-medium text-slate-700">{t('checkout.addressLine1')}</span>
                    <input
                      className={inputClass}
                      value={billing.line1}
                      onChange={(e) => setBillingField('line1', e.target.value)}
                    />
                  </label>
                  <label className="block sm:col-span-2">
                    <span className="text-sm font-medium text-slate-700">
                      {t('checkout.addressLine2')}{' '}
                      <span className="font-normal text-slate-400">({t('checkout.optional')})</span>
                    </span>
                    <input
                      className={inputClass}
                      value={billing.line2}
                      onChange={(e) => setBillingField('line2', e.target.value)}
                    />
                  </label>
                  <label className="block">
                    <span className="text-sm font-medium text-slate-700">{t('checkout.city')}</span>
                    <input
                      className={inputClass}
                      value={billing.city}
                      onChange={(e) => setBillingField('city', e.target.value)}
                    />
                  </label>
                  <label className="block">
                    <span className="text-sm font-medium text-slate-700">{t('checkout.stateProvince')}</span>
                    <input
                      className={inputClass}
                      value={billing.state}
                      onChange={(e) => setBillingField('state', e.target.value)}
                    />
                  </label>
                  <label className="block">
                    <span className="text-sm font-medium text-slate-700">{t('checkout.zip')}</span>
                    <input
                      className={inputClass}
                      value={billing.postalCode}
                      onChange={(e) => setBillingField('postalCode', e.target.value)}
                    />
                  </label>
                  <label className="block">
                    <span className="text-sm font-medium text-slate-700">{t('checkout.country')}</span>
                    <input
                      className={inputClass}
                      value={billing.country}
                      onChange={(e) => setBillingField('country', e.target.value)}
                    />
                  </label>
                </div>
              )}
            </section>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <Link
                to="/shipping"
                className="inline-flex items-center justify-center gap-2 text-sm font-medium text-slate-600 transition hover:text-brand-600"
              >
                <ArrowLeft className="size-4" aria-hidden />
                {t('checkout.backToShipping')}
              </Link>
              <button
                type="button"
                disabled={submitting}
                onClick={placeOrder}
                className="inline-flex h-14 min-w-[200px] items-center justify-center gap-2 rounded-xl bg-brand-600 px-10 text-base font-semibold text-white shadow-lg shadow-brand-600/30 transition hover:bg-brand-700 disabled:pointer-events-none disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
              >
                {submitting ? (
                  <>
                    <Loader2 className="size-5 animate-spin" aria-hidden />
                    {t('checkout.placingOrder')}
                  </>
                ) : (
                  t('checkout.placeOrder')
                )}
              </button>
            </div>
          </div>

          <div className="lg:sticky lg:top-24">
            <OrderSummaryCard
              items={items}
              subtotal={subtotal}
              shipping={shippingCost}
              discount={discount}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
