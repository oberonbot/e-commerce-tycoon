import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { Search as SearchIcon, SlidersHorizontal, X } from 'lucide-react';
import { categories, products } from '../data/products';
import { ProductCard } from '../components/ProductCard';

type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest';

export function Search() {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();

  const sortOptions: { value: SortOption; label: string }[] = [
    { value: 'featured', label: t('search.sort.featured') },
    { value: 'price-asc', label: t('search.sort.priceAsc') },
    { value: 'price-desc', label: t('search.sort.priceDesc') },
    { value: 'rating', label: t('search.sort.rating') },
    { value: 'newest', label: t('search.sort.newest') },
  ];

  const initialQuery = searchParams.get('q') ?? '';
  const initialCategory = searchParams.get('category') ?? 'All';

  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState(initialCategory);
  const [sort, setSort] = useState<SortOption>('featured');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setQuery(searchParams.get('q') ?? '');
    const cat = searchParams.get('category') ?? 'All';
    const normalized = categories.find(
      (c) => c.toLowerCase() === cat.toLowerCase(),
    );
    setCategory(normalized ?? 'All');
  }, [searchParams]);

  function updateParams(q: string, cat: string) {
    const params = new URLSearchParams();
    if (q) params.set('q', q);
    if (cat && cat !== 'All') params.set('category', cat);
    setSearchParams(params, { replace: true });
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    updateParams(query, category);
  }

  function handleCategoryChange(cat: string) {
    setCategory(cat);
    updateParams(query, cat);
  }

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    const min = minPrice ? parseFloat(minPrice) : 0;
    const max = maxPrice ? parseFloat(maxPrice) : Infinity;

    let result = products.filter((p) => {
      if (q && !p.name.toLowerCase().includes(q) && !p.description.toLowerCase().includes(q)) {
        return false;
      }
      if (category !== 'All' && p.category.toLowerCase() !== category.toLowerCase()) {
        return false;
      }
      if (p.price < min || p.price > max) return false;
      return true;
    });

    switch (sort) {
      case 'price-asc':
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result = [...result].sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        result = [...result].sort((a, b) => Number(b.id) - Number(a.id));
        break;
    }

    return result;
  }, [query, category, sort, minPrice, maxPrice]);

  const selectClass =
    'rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20';
  const inputClass =
    'w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20';

  return (
    <div className="min-h-screen bg-slate-50">
      <section className="mx-auto max-w-7xl px-4 py-12 md:px-6 lg:px-8">
        {/* Search bar */}
        <form onSubmit={handleSearch} className="relative">
          <SearchIcon className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('search.placeholder')}
            className="w-full rounded-xl border border-slate-300 bg-white py-3.5 pl-12 pr-4 text-base text-slate-900 shadow-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 md:text-lg"
          />
        </form>

        {/* Filter toggle (mobile) */}
        <button
          type="button"
          onClick={() => setShowFilters(!showFilters)}
          className="mt-4 inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 md:hidden"
        >
          {showFilters ? <X className="size-4" /> : <SlidersHorizontal className="size-4" />}
          {showFilters ? t('search.hideFilters') : t('search.filters')}
        </button>

        {/* Filters */}
        <div className={`mt-4 flex flex-wrap items-end gap-4 ${showFilters ? '' : 'hidden md:flex'}`}>
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-500">{t('search.categoryLabel')}</label>
            <select
              value={category}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className={selectClass}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {t(`categories.${cat}`)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-slate-500">{t('search.minPrice')}</label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              placeholder="$0"
              className={inputClass + ' w-24'}
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-slate-500">{t('search.maxPrice')}</label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              placeholder={t('search.any')}
              className={inputClass + ' w-24'}
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-slate-500">{t('search.sortBy')}</label>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOption)}
              className={selectClass}
            >
              {sortOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Results info */}
        <p className="mt-6 text-sm text-slate-600">
          {t('search.showing')} <strong>{filtered.length}</strong>{' '}
          {filtered.length === 1 ? t('search.result') : t('search.results')}
          {query && (
            <>
              {' '}{t('search.for')} "<span className="font-medium text-slate-900">{query}</span>"
            </>
          )}
        </p>

        {/* Product grid */}
        {filtered.length > 0 ? (
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="mt-16 flex flex-col items-center text-center">
            <SearchIcon className="size-12 text-slate-300" strokeWidth={1.5} />
            <h2 className="mt-4 text-xl font-semibold text-slate-900">{t('search.noResults')}</h2>
            <p className="mt-2 max-w-md text-slate-600">
              {t('search.noResultsDescription')}
            </p>
            <ul className="mt-4 space-y-1 text-sm text-slate-500">
              <li>{t('search.suggestion1')}</li>
              <li>{t('search.suggestion2')}</li>
              <li>{t('search.suggestion3')}</li>
              <li>{t('search.suggestion4')}</li>
            </ul>
          </div>
        )}
      </section>
    </div>
  );
}
