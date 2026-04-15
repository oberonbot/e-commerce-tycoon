import { Minus, Plus, Trash2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useCart, type CartItem as CartLineItem } from '../contexts/CartContext';

function formatPrice(value: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
}

function formatVariants(selectedVariants: Record<string, string>) {
  const entries = Object.entries(selectedVariants);
  if (entries.length === 0) return null;
  return entries.map(([k, v]) => `${k}: ${v}`).join(', ');
}

export interface CartItemProps {
  item: CartLineItem;
}

export function CartItem({ item }: CartItemProps) {
  const { t } = useTranslation();
  const { product, quantity, selectedVariants } = item;
  const { updateQuantity, removeFromCart } = useCart();

  const thumb = product.images[0] ?? '';
  const variantLabel = formatVariants(selectedVariants);
  const unitPrice = product.price;
  const lineTotal = unitPrice * quantity;

  return (
    <div className="rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm lg:grid lg:grid-cols-[5rem_minmax(0,1fr)_auto_auto_auto] lg:items-center lg:gap-6">
      <div className="flex gap-4 lg:contents">
        <Link
          to={`/product/${product.slug}`}
          className="size-20 shrink-0 overflow-hidden rounded-lg border border-slate-100 bg-slate-50 lg:size-20"
          aria-label={`View ${product.name}`}
        >
          <img src={thumb} alt="" className="size-full object-cover" />
        </Link>

        <div className="min-w-0 flex-1">
          <Link
            to={`/product/${product.slug}`}
            className="font-semibold text-slate-900 transition hover:text-brand-600"
          >
            {product.name}
          </Link>
          {variantLabel && <p className="mt-1 text-sm text-slate-600">{variantLabel}</p>}
          <p className="mt-1 text-sm text-slate-500">
            {formatPrice(unitPrice)} {t('cart.each')}
          </p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-4 border-t border-slate-100 pt-4 lg:mt-0 lg:contents lg:border-0 lg:pt-0">
        <div className="flex items-center gap-3 lg:justify-center">
          <span className="text-xs font-medium uppercase tracking-wide text-slate-500 lg:hidden">
            {t('cart.qty')}
          </span>
          <div className="inline-flex items-center rounded-lg border border-slate-200 bg-slate-50/80">
            <button
              type="button"
              aria-label={t('cart.decreaseQty')}
              className="flex size-9 items-center justify-center text-slate-600 transition hover:bg-slate-100 hover:text-brand-700"
              onClick={() => updateQuantity(product.id, selectedVariants, quantity - 1)}
            >
              <Minus className="size-4" strokeWidth={2} />
            </button>
            <span className="min-w-8 px-1 text-center text-sm font-semibold tabular-nums text-slate-900">{quantity}</span>
            <button
              type="button"
              aria-label={t('cart.increaseQty')}
              className="flex size-9 items-center justify-center text-slate-600 transition hover:bg-slate-100 hover:text-brand-700"
              onClick={() => updateQuantity(product.id, selectedVariants, quantity + 1)}
            >
              <Plus className="size-4" strokeWidth={2} />
            </button>
          </div>
        </div>

        <p className="text-base font-semibold text-slate-900 lg:text-right">
          <span className="mr-2 text-xs font-medium uppercase tracking-wide text-slate-500 lg:hidden">
            {t('cart.line')}
          </span>
          {formatPrice(lineTotal)}
        </p>

        <div className="flex justify-end lg:justify-center">
          <button
            type="button"
            aria-label={t('cart.removeItem', { name: product.name })}
            className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
            onClick={() => removeFromCart(product.id, selectedVariants)}
          >
            <Trash2 className="size-4" strokeWidth={2} />
          </button>
        </div>
      </div>
    </div>
  );
}
