import { RotateCcw, Shield, Truck } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Carousel } from '../components/Carousel';
import type { CarouselSlide } from '../components/Carousel';
import { ProductCard } from '../components/ProductCard';
import { categories, products } from '../data/products';

export function Home() {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState('All');

  const heroSlides = useMemo<CarouselSlide[]>(
    () => [
      {
        id: 1,
        title: t('home.hero.slide1Title'),
        subtitle: t('home.hero.slide1Subtitle'),
        cta: t('home.hero.slide1Cta'),
        link: '/search?category=Cases',
        bgColor: 'from-brand-600 to-amber-700',
        image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=800&q=80',
      },
      {
        id: 2,
        title: t('home.hero.slide2Title'),
        subtitle: t('home.hero.slide2Subtitle'),
        cta: t('home.hero.slide2Cta'),
        link: '/search?category=Chargers',
        bgColor: 'from-slate-800 to-slate-900',
        image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800&q=80',
      },
      {
        id: 3,
        title: t('home.hero.slide3Title'),
        subtitle: t('home.hero.slide3Subtitle'),
        cta: t('home.hero.slide3Cta'),
        link: '/search?category=Screen Protectors',
        bgColor: 'from-brand-700 to-orange-800',
        image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80',
      },
    ],
    [t],
  );

  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'All') return products;
    return products.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="min-h-screen bg-slate-50">
      <Carousel slides={heroSlides} />

      <section className="mx-auto max-w-7xl px-4 py-12 md:px-6 lg:px-8">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">{t('home.featuredProducts')}</h2>

        <div className="mt-6 -mx-4 overflow-x-auto px-4 pb-2 md:-mx-6 md:px-6 lg:-mx-8 lg:px-8">
          <div className="flex min-w-min gap-2">
            {categories.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition ${
                    active
                      ? 'bg-brand-600 text-white shadow-sm'
                      : 'border border-slate-200 bg-white text-slate-700 hover:border-brand-300 hover:text-brand-700'
                  }`}
                >
                  {t(`categories.${cat}`)}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <p className="mt-10 text-center text-slate-600">{t('home.noProducts')}</p>
        )}
      </section>

      <section className="border-y border-slate-200/80 bg-white py-14 md:py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <h2 className="text-center text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
            {t('home.whyTechShell')}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-slate-600">{t('home.whyDesc')}</p>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-200/80 bg-slate-50/80 p-6 text-center shadow-sm">
              <div className="mx-auto flex size-12 items-center justify-center rounded-xl bg-brand-100 text-brand-600">
                <Truck className="size-6" strokeWidth={1.75} />
              </div>
              <h3 className="mt-4 font-semibold text-slate-900">{t('home.freeShipping')}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{t('home.freeShippingDesc')}</p>
            </div>
            <div className="rounded-2xl border border-slate-200/80 bg-slate-50/80 p-6 text-center shadow-sm">
              <div className="mx-auto flex size-12 items-center justify-center rounded-xl bg-brand-100 text-brand-600">
                <RotateCcw className="size-6" strokeWidth={1.75} />
              </div>
              <h3 className="mt-4 font-semibold text-slate-900">{t('home.returns')}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{t('home.returnsDesc')}</p>
            </div>
            <div className="rounded-2xl border border-slate-200/80 bg-slate-50/80 p-6 text-center shadow-sm">
              <div className="mx-auto flex size-12 items-center justify-center rounded-xl bg-brand-100 text-brand-600">
                <Shield className="size-6" strokeWidth={1.75} />
              </div>
              <h3 className="mt-4 font-semibold text-slate-900">{t('home.securePayment')}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{t('home.securePaymentDesc')}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-linear-to-br from-brand-600 to-brand-800 py-14 md:py-16">
        <div className="mx-auto max-w-2xl px-4 text-center md:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">{t('home.stayInLoop')}</h2>
          <p className="mt-3 text-sm text-white/90 md:text-base">{t('home.stayInLoopDesc')}</p>
          <form
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-stretch"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <label htmlFor="newsletter-email" className="sr-only">
              {t('home.emailLabel')}
            </label>
            <input
              id="newsletter-email"
              type="email"
              name="email"
              required
              placeholder="you@example.com"
              className="min-h-11 w-full rounded-lg border border-white/20 bg-white/10 px-4 py-2.5 text-white placeholder:text-white/60 backdrop-blur-sm outline-none ring-brand-300 transition focus:border-white/40 focus:ring-2"
            />
            <button
              type="submit"
              className="shrink-0 rounded-lg bg-white px-6 py-2.5 text-sm font-semibold text-brand-700 shadow-md transition hover:bg-brand-50"
            >
              {t('footer.subscribe')}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
