import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { CartItem } from '../components/CartItem';
import { useCart } from '../contexts/CartContext';
import { formatMoney } from '../lib/techshellCheckout';

export function Cart() {
  const { t } = useTranslation();
  const { items, subtotal, itemCount } = useCart();

  return (
    <div className="min-h-screen bg-slate-50 pb-16 pt-10">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">{t('cart.title')}</h1>
        <p className="mt-1 text-sm text-slate-600">
          {itemCount === 0 ? t('cart.empty') : t('cart.itemCount', { count: itemCount })}
        </p>

        {items.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
            <p className="text-slate-600">{t('cart.emptyMessage')}</p>
            <Link
              to="/"
              className="mt-6 inline-flex h-11 items-center rounded-xl bg-brand-600 px-6 text-sm font-semibold text-white shadow-md shadow-brand-600/25 transition hover:bg-brand-700"
            >
              {t('cart.shopNow')}
            </Link>
          </div>
        ) : (
          <div className="mt-8 space-y-4">
            {items.map((item) => (
              <CartItem key={`${item.product.id}-${JSON.stringify(item.selectedVariants)}`} item={item} />
            ))}
            <div className="flex flex-col gap-4 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-lg font-semibold text-slate-900">
                {t('cart.subtotal')} {formatMoney(subtotal)}
              </p>
              <Link
                to="/shipping"
                className="inline-flex h-12 items-center justify-center rounded-xl bg-brand-600 px-8 text-sm font-semibold text-white shadow-md shadow-brand-600/25 transition hover:bg-brand-700"
              >
                {t('cart.checkout')}
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
