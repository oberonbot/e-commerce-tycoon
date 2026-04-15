import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Heart, LogIn, ShoppingBag } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useWishlist } from '../contexts/WishlistContext';
import { products } from '../data/products';
import { ProductCard } from '../components/ProductCard';

export function Wishlist() {
  const { t } = useTranslation();
  const { isAuthenticated } = useAuth();
  const { items } = useWishlist();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const wishlistProducts = useMemo(
    () => products.filter((p) => items.includes(p.id)),
    [items],
  );

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
        <div className="flex size-16 items-center justify-center rounded-full bg-brand-50">
          <LogIn className="size-8 text-brand-600" strokeWidth={1.5} />
        </div>
        <h1 className="mt-6 text-2xl font-bold text-slate-900">{t('wishlist.signInTitle')}</h1>
        <p className="mt-2 max-w-md text-slate-600">
          {t('wishlist.signInDescription')}
        </p>
        <Link
          to="/login"
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700"
        >
          {t('wishlist.signIn')}
        </Link>
      </div>
    );
  }

  if (wishlistProducts.length === 0) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
        <div className="flex size-16 items-center justify-center rounded-full bg-brand-50">
          <Heart className="size-8 text-brand-600" strokeWidth={1.5} />
        </div>
        <h1 className="mt-6 text-2xl font-bold text-slate-900">{t('wishlist.emptyTitle')}</h1>
        <p className="mt-2 max-w-md text-slate-600">
          {t('wishlist.emptyDescription')}
        </p>
        <Link
          to="/search"
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700"
        >
          <ShoppingBag className="size-4" />
          {t('wishlist.startShopping')}
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <section className="mx-auto max-w-7xl px-4 py-16 md:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
          {t('wishlist.title')}{' '}
          <span className="text-lg font-normal text-slate-500">
            ({wishlistProducts.length} {wishlistProducts.length === 1 ? t('wishlist.item') : t('wishlist.items')})
          </span>
        </h1>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {wishlistProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
