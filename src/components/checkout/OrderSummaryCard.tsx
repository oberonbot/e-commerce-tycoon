import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import type { CartItem } from '../../contexts/CartContext';
import { formatMoney } from '../../lib/techshellCheckout';

function formatVariants(selectedVariants: Record<string, string>) {
  const entries = Object.entries(selectedVariants);
  if (entries.length === 0) return null;
  return entries.map(([k, v]) => `${k}: ${v}`).join(' · ');
}

const TAX_RATE = 0.0825;

export function OrderSummaryCard({
  items,
  subtotal,
  shipping,
  discount = 0,
}: {
  items: CartItem[];
  subtotal: number;
  shipping: number;
  discount?: number;
}) {
  const { t } = useTranslation();
  const taxableBase = Math.max(0, subtotal - discount);
  const tax = taxableBase * TAX_RATE;
  const total = taxableBase + shipping + tax;

  return (
    <aside className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm ring-1 ring-slate-100/80">
      <h2 className="text-lg font-semibold tracking-tight text-slate-900">{t('checkout.orderSummary')}</h2>
      <ul className="mt-4 max-h-72 space-y-4 overflow-y-auto pr-1">
        {items.map((item) => {
          const thumb = item.product.images[0] ?? '';
          const vLabel = formatVariants(item.selectedVariants);
          const line = item.product.price * item.quantity;
          return (
            <li key={`${item.product.id}-${JSON.stringify(item.selectedVariants)}`} className="flex gap-3">
              <Link
                to={`/product/${item.product.slug}`}
                className="size-14 shrink-0 overflow-hidden rounded-lg border border-slate-100 bg-slate-50"
              >
                <img src={thumb} alt="" className="size-full object-cover" />
              </Link>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-slate-900 line-clamp-2">{item.product.name}</p>
                {vLabel && <p className="mt-0.5 text-xs text-slate-500">{vLabel}</p>}
                <p className="mt-1 text-xs text-slate-600">
                  {t('cart.qty')} {item.quantity} × {formatMoney(item.product.price)}
                </p>
              </div>
              <p className="shrink-0 text-sm font-semibold text-slate-900">{formatMoney(line)}</p>
            </li>
          );
        })}
      </ul>
      <dl className="mt-5 space-y-2 border-t border-slate-100 pt-4 text-sm">
        <div className="flex justify-between text-slate-600">
          <dt>{t('cart.subtotal')}</dt>
          <dd className="font-medium text-slate-900">{formatMoney(subtotal)}</dd>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-emerald-700">
            <dt>{t('checkout.discount')}</dt>
            <dd className="font-medium">−{formatMoney(discount)}</dd>
          </div>
        )}
        <div className="flex justify-between text-slate-600">
          <dt>{t('checkout.shipping')}</dt>
          <dd className="font-medium text-slate-900">
            {shipping <= 0 ? <span className="text-emerald-600">{t('checkout.free')}</span> : formatMoney(shipping)}
          </dd>
        </div>
        <div className="flex justify-between text-slate-600">
          <dt>{t('checkout.estTax')}</dt>
          <dd className="font-medium text-slate-900">{formatMoney(tax)}</dd>
        </div>
        <div className="flex justify-between border-t border-slate-100 pt-3 text-base font-semibold text-slate-900">
          <dt>{t('checkout.total')}</dt>
          <dd className="text-brand-700">{formatMoney(total)}</dd>
        </div>
      </dl>
    </aside>
  );
}

export function useCheckoutTotals(subtotal: number, shipping: number, discount = 0) {
  const taxableBase = Math.max(0, subtotal - discount);
  const tax = taxableBase * TAX_RATE;
  const total = taxableBase + shipping + tax;
  return { tax, total, taxableBase };
}
