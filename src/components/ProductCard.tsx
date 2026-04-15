import { Heart, ShoppingBag, Star } from 'lucide-react';
import type { MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import type { Product } from '../data/products';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';

function formatPrice(value: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
}

function StarRating({ rating, reviewCount }: { rating: number; reviewCount: number }) {
  const rounded = Math.min(5, Math.round(rating));
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
        {Array.from({ length: 5 }, (_, i) => {
          const filled = i < rounded;
          return (
            <Star
              key={i}
              className={`size-4 shrink-0 ${filled ? 'fill-amber-400 text-amber-400' : 'fill-slate-200 text-slate-200'}`}
            />
          );
        })}
      </div>
      <span className="text-xs text-slate-500">
        {rating.toFixed(1)} ({reviewCount})
      </span>
    </div>
  );
}

export interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className = '' }: ProductCardProps) {
  const { t } = useTranslation();
  const { addToCart } = useCart();
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();

  const inWishlist = isInWishlist(product.id);
  const primaryImage = product.images[0] ?? '';

  const salePercent =
    product.compareAtPrice != null && product.compareAtPrice > product.price
      ? Math.round((1 - product.price / product.compareAtPrice) * 100)
      : null;

  const toggleWishlist = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product.id);
    }
  };

  const handleAddToCart = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!product.inStock) return;
    addToCart(product, 1, {});
  };

  return (
    <article
      className={`group flex flex-col overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-sm transition-shadow duration-300 hover:shadow-lg ${className}`}
    >
      <div className="relative aspect-square overflow-hidden bg-slate-100">
        <Link to={`/product/${product.slug}`} className="block size-full" aria-label={`View ${product.name}`}>
          <img
            src={primaryImage}
            alt=""
            className="size-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
        </Link>

        <button
          type="button"
          onClick={toggleWishlist}
          aria-label={inWishlist ? t('product.removeFromWishlist') : t('product.addToWishlist')}
          aria-pressed={inWishlist}
          className="absolute right-3 top-3 flex size-10 items-center justify-center rounded-full border border-slate-200/80 bg-white/95 text-slate-600 shadow-sm backdrop-blur-sm transition hover:border-brand-300 hover:text-brand-600"
        >
          <Heart className={`size-5 ${inWishlist ? 'fill-brand-600 text-brand-600' : ''}`} strokeWidth={1.75} />
        </button>

        {salePercent != null && (
          <span className="absolute left-3 top-3 rounded-md bg-brand-600 px-2 py-1 text-xs font-bold uppercase tracking-wide text-white shadow-sm">
            {salePercent}
            {t('product.off')}
          </span>
        )}

        {!product.inStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-900/50 backdrop-blur-[2px]">
            <span className="rounded-md bg-slate-900 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-white">
              {t('product.outOfStockBadge')}
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <span className="w-fit rounded-md bg-brand-50 px-2 py-0.5 text-xs font-medium text-brand-700">
          {product.category}
        </span>

        <Link
          to={`/product/${product.slug}`}
          className="font-semibold leading-snug text-slate-900 transition hover:text-brand-600"
        >
          {product.name}
        </Link>

        <p className="line-clamp-2 text-sm leading-relaxed text-slate-600">{product.shortDescription}</p>

        <StarRating rating={product.rating} reviewCount={product.reviewCount} />

        <div className="mt-auto flex flex-wrap items-baseline gap-2 pt-1">
          <span className="text-lg font-semibold text-slate-900">{formatPrice(product.price)}</span>
          {product.compareAtPrice != null && product.compareAtPrice > product.price && (
            <span className="text-sm text-slate-400 line-through">{formatPrice(product.compareAtPrice)}</span>
          )}
        </div>

        <button
          type="button"
          onClick={handleAddToCart}
          disabled={!product.inStock}
          className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500 disabled:shadow-none"
        >
          <ShoppingBag className="size-4" strokeWidth={2} />
          {t('product.addToCart')}
        </button>
      </div>
    </article>
  );
}
