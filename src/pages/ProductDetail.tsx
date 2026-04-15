import { Check, Heart, Minus, Plus, Star } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import { ProductCard } from '../components/ProductCard';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';
import type { Product } from '../data/products';
import { products } from '../data/products';

function formatPrice(value: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
}

function hashString(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (Math.imul(31, h) + str.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

function mulberry32(seed: number) {
  return function next() {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function pickRelatedProducts(current: Product, limit: number): Product[] {
  const pool = products.filter((p) => p.id !== current.id && p.category === current.category);
  if (pool.length === 0) return [];
  const rand = mulberry32(hashString(current.slug) || 1);
  const shuffled = [...pool];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, Math.min(limit, shuffled.length));
}

function buildInitialVariants(product: Product): Record<string, string> {
  const out: Record<string, string> = {};
  for (const v of product.variants ?? []) {
    if (v.options[0]) out[v.name] = v.options[0];
  }
  return out;
}

function StarRating({ rating, reviewCount }: { rating: number; reviewCount: number }) {
  const { t } = useTranslation();
  const rounded = Math.min(5, Math.round(rating));
  return (
    <div className="flex flex-wrap items-center gap-2">
      <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
        {Array.from({ length: 5 }, (_, i) => {
          const filled = i < rounded;
          return (
            <Star
              key={i}
              className={`size-5 shrink-0 ${filled ? 'fill-amber-400 text-amber-400' : 'fill-slate-200 text-slate-200'}`}
            />
          );
        })}
      </div>
      <span className="text-sm text-slate-600">
        {rating.toFixed(1)} <span className="text-slate-400">·</span> {reviewCount} {t('product.reviews')}
      </span>
    </div>
  );
}

function ProductDetailView({ product }: { product: Product }) {
  const { t } = useTranslation();
  const { addToCart } = useCart();
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();

  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariants, setSelectedVariants] = useState(() => buildInitialVariants(product));

  const related = useMemo(() => pickRelatedProducts(product, 4), [product]);

  const inWishlist = isInWishlist(product.id);
  const mainSrc = product.images[mainImageIndex] ?? product.images[0] ?? '';
  const maxQty = product.inStock ? Math.max(1, product.stockCount) : 1;

  const savings =
    product.compareAtPrice != null && product.compareAtPrice > product.price
      ? product.compareAtPrice - product.price
      : null;

  const setVariant = (name: string, value: string) => {
    setSelectedVariants((prev) => ({ ...prev, [name]: value }));
  };

  const decQty = () => setQuantity((q) => Math.max(1, q - 1));
  const incQty = () => setQuantity((q) => Math.min(maxQty, q + 1));

  const handleAddToCart = () => {
    if (!product.inStock) return;
    addToCart(product, quantity, selectedVariants);
  };

  const toggleWishlist = () => {
    if (inWishlist) removeFromWishlist(product.id);
    else addToWishlist(product.id);
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-16">
      <div className="mx-auto max-w-7xl px-4 py-8 md:px-6 lg:px-8 lg:py-12">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">
          <div>
            <div className="aspect-[4/3] overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
              {mainSrc ? (
                <img src={mainSrc} alt="" className="size-full object-cover" />
              ) : (
                <div className="flex size-full items-center justify-center text-slate-400">{t('product.noImage')}</div>
              )}
            </div>
            {product.images.length > 1 && (
              <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
                {product.images.map((src, i) => {
                  const active = i === mainImageIndex;
                  return (
                    <button
                      key={`${src}-${i}`}
                      type="button"
                      onClick={() => setMainImageIndex(i)}
                      className={`relative size-16 shrink-0 overflow-hidden rounded-lg border-2 transition md:size-20 ${
                        active ? 'border-brand-600 ring-2 ring-brand-600/20' : 'border-transparent hover:border-slate-300'
                      }`}
                      aria-label={t('product.showImage', { n: i + 1 })}
                    >
                      <img src={src} alt="" className="size-full object-cover" />
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <div className="flex flex-col">
            <span className="w-fit rounded-md bg-brand-50 px-2.5 py-1 text-xs font-medium text-brand-700">
              {product.category}
            </span>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">{product.name}</h1>
            <div className="mt-4">
              <StarRating rating={product.rating} reviewCount={product.reviewCount} />
            </div>

            <div className="mt-6 flex flex-wrap items-baseline gap-3">
              <span className="text-3xl font-bold text-slate-900">{formatPrice(product.price)}</span>
              {product.compareAtPrice != null && product.compareAtPrice > product.price && (
                <>
                  <span className="text-lg text-slate-400 line-through">{formatPrice(product.compareAtPrice)}</span>
                  {savings != null && (
                    <span className="rounded-md bg-emerald-50 px-2 py-1 text-sm font-semibold text-emerald-700">
                      {t('product.save')} {formatPrice(savings)}
                    </span>
                  )}
                </>
              )}
            </div>

            <p className="mt-6 text-base leading-relaxed text-slate-600">{product.shortDescription}</p>

            {product.variants && product.variants.length > 0 && (
              <div className="mt-8 flex flex-col gap-6">
                {product.variants.map((variant) => (
                  <div key={variant.name}>
                    <p className="text-sm font-medium text-slate-900">{variant.name}</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {variant.options.map((opt) => {
                        const selected = selectedVariants[variant.name] === opt;
                        return (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => setVariant(variant.name, opt)}
                            className={`rounded-lg border px-3 py-2 text-sm font-medium transition ${
                              selected
                                ? 'border-brand-600 bg-brand-600 text-white'
                                : 'border-slate-200 bg-white text-slate-700 hover:border-brand-300'
                            }`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-8">
              <p className="text-sm font-medium text-slate-900">{t('product.quantity')}</p>
              <div className="mt-2 inline-flex items-center rounded-lg border border-slate-200 bg-white shadow-sm">
                <button
                  type="button"
                  onClick={decQty}
                  disabled={quantity <= 1}
                  className="flex size-11 items-center justify-center text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                  aria-label={t('cart.decreaseQty')}
                >
                  <Minus className="size-4" />
                </button>
                <span className="min-w-10 text-center text-sm font-semibold text-slate-900">{quantity}</span>
                <button
                  type="button"
                  onClick={incQty}
                  disabled={!product.inStock || quantity >= maxQty}
                  className="flex size-11 items-center justify-center text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                  aria-label={t('cart.increaseQty')}
                >
                  <Plus className="size-4" />
                </button>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="inline-flex flex-1 items-center justify-center rounded-xl bg-brand-600 px-6 py-3.5 text-base font-semibold text-white shadow-md transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500 disabled:shadow-none"
              >
                {t('product.addToCart')}
              </button>
              <button
                type="button"
                onClick={toggleWishlist}
                aria-label={inWishlist ? t('product.removeFromWishlist') : t('product.addToWishlist')}
                aria-pressed={inWishlist}
                className="inline-flex size-12 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:border-brand-300 hover:text-brand-600 sm:size-[52px]"
              >
                <Heart
                  className={`size-6 ${inWishlist ? 'fill-brand-600 text-brand-600' : ''}`}
                  strokeWidth={1.75}
                />
              </button>
            </div>

            {!product.inStock && <p className="mt-3 text-sm font-medium text-red-600">{t('product.outOfStock')}</p>}

            <ul className="mt-10 space-y-3 border-t border-slate-200 pt-8">
              {product.features.map((f) => (
                <li key={f} className="flex gap-3 text-sm text-slate-700">
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-600">
                    <Check className="size-3.5" strokeWidth={2.5} />
                  </span>
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <section className="mt-16 border-t border-slate-200 pt-12">
          <h2 className="text-xl font-semibold text-slate-900">{t('product.description')}</h2>
          <p className="mt-4 max-w-3xl whitespace-pre-line text-base leading-relaxed text-slate-600">{product.description}</p>
        </section>

        {related.length > 0 && (
          <section className="mt-16 border-t border-slate-200 pt-12">
            <h2 className="text-xl font-semibold text-slate-900">{t('product.youMayAlsoLike')}</h2>
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

export function ProductDetail() {
  const { t } = useTranslation();
  const { slug } = useParams<{ slug: string }>();
  const product = useMemo(() => products.find((p) => p.slug === slug), [slug]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!slug || !product) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center bg-slate-50 px-4 py-16">
        <h1 className="text-2xl font-semibold text-slate-900">{t('product.notFound')}</h1>
        <p className="mt-2 text-center text-slate-600">{t('product.notFoundDesc')}</p>
        <Link
          to="/"
          className="mt-8 inline-flex items-center rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700"
        >
          {t('product.backToShop')}
        </Link>
      </div>
    );
  }

  return <ProductDetailView key={slug} product={product} />;
}
