import { Link, Navigate, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Check, Package } from 'lucide-react';
import { CheckoutProgress } from '../components/checkout/CheckoutProgress';
import { useAuth } from '../contexts/AuthContext';
import type { LastOrderPayload } from '../lib/techshellCheckout';
import { formatMoney, readLastOrder } from '../lib/techshellCheckout';

function formatVariants(selectedVariants: Record<string, string>) {
  const entries = Object.entries(selectedVariants);
  if (entries.length === 0) return null;
  return entries.map(([k, v]) => `${k}: ${v}`).join(' · ');
}

function formatAddress(a: LastOrderPayload['shippingAddress']) {
  const line2 = a.line2 ? `, ${a.line2}` : '';
  return [
    `${a.fullName}`,
    `${a.line1}${line2}`,
    `${a.city}, ${a.state} ${a.postalCode}`,
    a.country,
  ];
}

export function OrderConfirmation() {
  const { t } = useTranslation();
  const { isAuthenticated, user } = useAuth();
  const [searchParams] = useSearchParams();
  const orderParam = searchParams.get('order') ?? '';

  const stored = readLastOrder();
  const order =
    stored && orderParam && stored.orderNumber === orderParam ? stored : null;

  if (!isAuthenticated) {
    const q = orderParam ? `?order=${encodeURIComponent(orderParam)}` : '';
    return <Navigate to={`/login?redirect=${encodeURIComponent(`/order-confirmation${q}`)}`} replace />;
  }

  if (!order || !orderParam) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center px-4 text-center">
        <Package className="size-14 text-slate-300" strokeWidth={1.25} aria-hidden />
        <h1 className="mt-6 text-xl font-semibold text-slate-900">{t('checkout.orderNotFound')}</h1>
        <p className="mt-2 text-sm text-slate-600">{t('checkout.orderNotFoundDesc')}</p>
        <Link
          to="/"
          className="mt-8 inline-flex h-11 items-center rounded-xl bg-brand-600 px-6 text-sm font-semibold text-white shadow-md shadow-brand-600/25 transition hover:bg-brand-700"
        >
          {t('checkout.continueShopping')}
        </Link>
      </div>
    );
  }

  const displayName = user?.name ?? order.customerName;
  const displayEmail = user?.email ?? order.customerEmail;

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50/40 via-slate-50 to-white pb-20 pt-10 md:pt-14">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <CheckoutProgress activeStep={3} allComplete />

        <div className="mt-12 flex flex-col items-center text-center">
          <div
            className="flex size-20 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg shadow-emerald-600/30 ring-4 ring-emerald-100"
            aria-hidden
          >
            <Check className="size-10" strokeWidth={2.5} />
          </div>
          <h1 className="mt-8 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            {t('checkout.orderConfirmed')}
          </h1>
          <p className="mt-3 text-lg text-slate-600">
            {t('checkout.thankYou')}
            {displayName ? `, ${displayName}` : ''}!
          </p>
          <p className="mt-2 font-mono text-sm font-medium text-slate-500">{t('checkout.orderNumber')}</p>
          <p className="mt-1 font-mono text-2xl font-bold tracking-tight text-brand-700 md:text-3xl">
            {order.orderNumber}
          </p>
          <p className="mt-4 max-w-md text-sm text-slate-600">
            {t('checkout.confirmationEmail')}{' '}
            <span className="font-medium text-slate-800">{displayEmail}</span>.
          </p>
        </div>

        <div className="mt-12 overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm ring-1 ring-slate-100/80">
          <div className="border-b border-slate-100 bg-slate-50/80 px-6 py-4">
            <h2 className="text-base font-semibold text-slate-900">{t('checkout.orderDetails')}</h2>
            <p className="mt-1 text-sm text-slate-600">
              {t('checkout.estimatedDelivery')}:{' '}
              <span className="font-medium text-slate-800">{order.estimatedDelivery}</span>
            </p>
          </div>

          <div className="divide-y divide-slate-100 px-6 py-5">
            <ul className="space-y-5">
              {order.lines.map((line) => {
                const v = formatVariants(line.selectedVariants);
                const lineTotal = line.unitPrice * line.quantity;
                return (
                  <li key={`${line.productId}-${JSON.stringify(line.selectedVariants)}`} className="flex gap-4">
                    <div className="size-16 shrink-0 overflow-hidden rounded-lg border border-slate-100 bg-slate-50">
                      <img src={line.image} alt="" className="size-full object-cover" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-slate-900">{line.name}</p>
                      {v && <p className="mt-0.5 text-xs text-slate-500">{v}</p>}
                      <p className="mt-1 text-sm text-slate-600">
                        {t('cart.qty')} {line.quantity} × {formatMoney(line.unitPrice)}
                      </p>
                    </div>
                    <p className="shrink-0 font-semibold text-slate-900">{formatMoney(lineTotal)}</p>
                  </li>
                );
              })}
            </ul>
          </div>

          <dl className="space-y-2 border-t border-slate-100 px-6 py-5 text-sm">
            <div className="flex justify-between text-slate-600">
              <dt>{t('cart.subtotal')}</dt>
              <dd className="font-medium text-slate-900">{formatMoney(order.subtotal)}</dd>
            </div>
            <div className="flex justify-between text-slate-600">
              <dt>{t('checkout.shipping')}</dt>
              <dd className="font-medium text-slate-900">
                {order.shippingAmount <= 0 ? (
                  <span className="text-emerald-600">{t('checkout.free')}</span>
                ) : (
                  formatMoney(order.shippingAmount)
                )}
              </dd>
            </div>
            {order.discountAmount > 0 && (
              <div className="flex justify-between text-emerald-700">
                <dt>
                  {t('checkout.discount')}
                  {order.promoCode ? ` (${order.promoCode})` : ''}
                </dt>
                <dd className="font-medium">−{formatMoney(order.discountAmount)}</dd>
              </div>
            )}
            <div className="flex justify-between text-slate-600">
              <dt>{t('checkout.tax')}</dt>
              <dd className="font-medium text-slate-900">{formatMoney(order.taxAmount)}</dd>
            </div>
            <div className="flex justify-between border-t border-slate-100 pt-3 text-base font-semibold text-slate-900">
              <dt>{t('checkout.total')}</dt>
              <dd className="text-brand-700">{formatMoney(order.total)}</dd>
            </div>
          </dl>

          <div className="grid gap-6 border-t border-slate-100 bg-slate-50/50 px-6 py-6 md:grid-cols-2">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                {t('checkout.shippingAddressLabel')}
              </h3>
              <address className="mt-2 not-italic text-sm leading-relaxed text-slate-700">
                {formatAddress(order.shippingAddress).map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </address>
            </div>
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                {t('checkout.paymentMethodLabel')}
              </h3>
              {order.paymentMethod === 'card' && order.cardLast4 ? (
                <p className="mt-2 font-mono text-sm font-medium tracking-wide text-slate-800">
                  {t('checkout.cardEndingIn')} •••• •••• •••• {order.cardLast4}
                </p>
              ) : (
                <p className="mt-2 text-sm font-medium text-slate-800">
                  {order.paymentMethod === 'google'
                    ? t('checkout.googlePay')
                    : order.paymentMethod === 'apple'
                      ? t('checkout.applePay')
                      : order.cardLast4
                        ? `${t('checkout.cardEndingIn')} ${order.cardLast4}`
                        : t('checkout.paymentCardGeneric')}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            to="/"
            className="inline-flex h-12 items-center justify-center rounded-xl bg-brand-600 px-8 text-sm font-semibold text-white shadow-lg shadow-brand-600/25 transition hover:bg-brand-700"
          >
            {t('checkout.continueShopping')}
          </Link>
          <Link
            to="/orders"
            className="inline-flex h-12 items-center justify-center rounded-xl border border-slate-200 bg-white px-8 text-sm font-semibold text-slate-800 transition hover:bg-slate-50"
          >
            {t('checkout.viewOrderHistory')}
          </Link>
        </div>
      </div>
    </div>
  );
}
