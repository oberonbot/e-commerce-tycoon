import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Globe,
  Heart,
  Menu,
  Search,
  ShoppingBag,
  Smartphone,
  User,
  X,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useAuth } from '../contexts/AuthContext'
import { useCart } from '../contexts/CartContext'
import { useWishlist } from '../contexts/WishlistContext'

const LANG_CODES = [
  { lng: 'en', code: 'EN' },
  { lng: 'es', code: 'ES' },
  { lng: 'zh', code: '中文' },
] as const

function CountBadge({ count }: { count: number }) {
  if (count <= 0) return null
  const label = count > 99 ? '99+' : String(count)
  return (
    <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-brand-600 px-1 text-[10px] font-semibold leading-none text-white">
      {label}
    </span>
  )
}

function LanguageSelect({
  className,
  selectId,
}: {
  className?: string
  selectId: string
}) {
  const { t, i18n } = useTranslation()
  const current =
    LANG_CODES.find((l) => i18n.language.startsWith(l.lng))?.lng ?? 'en'

  return (
    <div className={className}>
      <div className="relative flex items-center">
        <Globe
          className="pointer-events-none absolute left-2 h-4 w-4 text-slate-500"
          strokeWidth={2}
          aria-hidden
        />
        <select
          id={selectId}
          aria-label={`${t('lang.en')}, ${t('lang.es')}, ${t('lang.zh')}`}
          value={current}
          onChange={(e) => {
            void i18n.changeLanguage(e.target.value)
          }}
          className="h-9 min-w-[4.5rem] cursor-pointer appearance-none rounded-lg border border-slate-200 bg-white py-1 pl-8 pr-8 text-xs font-semibold text-slate-800 shadow-sm transition-colors hover:border-slate-300 hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
        >
          {LANG_CODES.map(({ lng, code }) => (
            <option key={lng} value={lng}>
              {code}
            </option>
          ))}
        </select>
        <span className="pointer-events-none absolute right-2 text-[10px] text-slate-500" aria-hidden>
          ▼
        </span>
      </div>
    </div>
  )
}

export function Navbar() {
  const { t } = useTranslation()
  const { itemCount } = useCart()
  const { isAuthenticated } = useAuth()
  const { items } = useWishlist()
  const wishlistCount = items.length
  const [mobileOpen, setMobileOpen] = useState(false)

  const navLinks = useMemo(
    () =>
      [
        { to: '/', label: t('nav.shop') },
        { to: '/about', label: t('nav.about') },
        { to: '/faq', label: t('nav.faq') },
        { to: '/contact', label: t('nav.contact') },
      ] as const,
    [t],
  )

  useEffect(() => {
    if (!mobileOpen) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [mobileOpen])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  const accountHref = isAuthenticated ? '/account' : '/login'

  const wishlistAria =
    wishlistCount > 0
      ? `${t('nav.wishlist')}, ${wishlistCount} ${
          wishlistCount === 1 ? t('wishlist.item') : t('wishlist.items')
        }`
      : t('nav.wishlist')

  const cartAria =
    itemCount > 0
      ? `${t('nav.cart')}, ${t('cart.itemCount', { count: itemCount })}`
      : t('nav.cart')

  const iconLinkClass =
    'relative flex h-10 w-10 items-center justify-center rounded-lg text-slate-600 transition-colors hover:bg-slate-50 hover:text-brand-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600'

  const textLinkClass =
    'rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-brand-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600'

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-md supports-[backdrop-filter]:bg-white/80">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="group flex shrink-0 items-center gap-2 rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600 text-white shadow-sm shadow-brand-600/25 transition-transform group-hover:scale-[1.02]">
            <Smartphone className="h-5 w-5" strokeWidth={2} aria-hidden />
          </span>
          <span className="font-sans text-lg font-bold tracking-tight text-slate-900">
            TechShell
          </span>
        </Link>

        <nav
          className="hidden flex-1 items-center justify-center gap-8 md:flex"
          aria-label="Primary"
        >
          {navLinks.map(({ to, label }) => (
            <Link key={to} to={to} className={textLinkClass}>
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-0.5 sm:gap-1">
          <Link
            to="/search"
            className={iconLinkClass}
            aria-label={t('nav.search')}
          >
            <Search className="h-5 w-5" strokeWidth={2} aria-hidden />
          </Link>
          <Link
            to="/wishlist"
            className={iconLinkClass}
            aria-label={wishlistAria}
          >
            <Heart className="h-5 w-5" strokeWidth={2} aria-hidden />
            <CountBadge count={wishlistCount} />
          </Link>
          <Link to="/cart" className={iconLinkClass} aria-label={cartAria}>
            <ShoppingBag className="h-5 w-5" strokeWidth={2} aria-hidden />
            <CountBadge count={itemCount} />
          </Link>
          <Link
            to={accountHref}
            className={iconLinkClass}
            aria-label={isAuthenticated ? t('nav.account') : t('nav.login')}
          >
            <User className="h-5 w-5" strokeWidth={2} aria-hidden />
          </Link>

          <LanguageSelect className="hidden md:block" selectId="navbar-lang-desktop" />

          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-lg text-slate-700 transition-colors hover:bg-slate-50 hover:text-brand-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 md:hidden"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            onClick={() => setMobileOpen((o) => !o)}
          >
            {mobileOpen ? (
              <X className="h-6 w-6" strokeWidth={2} aria-hidden />
            ) : (
              <Menu className="h-6 w-6" strokeWidth={2} aria-hidden />
            )}
            <span className="sr-only">{t('nav.toggleMenu')}</span>
          </button>
        </div>
      </div>

      {/* Mobile menu backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-[2px] transition-opacity duration-300 md:hidden ${
          mobileOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
        aria-hidden={!mobileOpen}
        onClick={() => setMobileOpen(false)}
      />

      {/* Mobile drawer (slides from right) */}
      <aside
        id="mobile-menu"
        className={`fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col border-l border-slate-200 bg-white shadow-2xl transition-transform duration-300 ease-out md:hidden ${
          mobileOpen ? 'pointer-events-auto translate-x-0' : 'pointer-events-none translate-x-full'
        }`}
        aria-hidden={!mobileOpen}
        inert={!mobileOpen}
      >
        <div className="flex items-center justify-between border-b border-slate-100 px-4 py-4">
          <span className="text-sm font-semibold uppercase tracking-wider text-slate-500">
            {t('nav.menu')}
          </span>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-50 hover:text-brand-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
            onClick={() => setMobileOpen(false)}
            aria-label={t('nav.closeMenu')}
          >
            <X className="h-6 w-6" strokeWidth={2} />
          </button>
        </div>

        <div className="flex flex-1 flex-col gap-1 overflow-y-auto px-3 py-4">
          <div className="px-3 pb-3">
            <LanguageSelect selectId="navbar-lang-drawer" />
          </div>

          <p className="px-3 pb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
            {t('nav.navigate')}
          </p>
          {navLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className="rounded-xl px-3 py-3 text-base font-medium text-slate-800 transition-colors hover:bg-brand-50 hover:text-brand-600"
              onClick={() => setMobileOpen(false)}
            >
              {label}
            </Link>
          ))}

          <div className="my-4 h-px bg-slate-100" />

          <p className="px-3 pb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
            {t('nav.quickLinks')}
          </p>
          <Link
            to="/search"
            className="flex items-center gap-3 rounded-xl px-3 py-3 text-base font-medium text-slate-800 transition-colors hover:bg-brand-50 hover:text-brand-600"
            onClick={() => setMobileOpen(false)}
          >
            <Search className="h-5 w-5 text-brand-600" aria-hidden />
            {t('nav.search')}
          </Link>
          <Link
            to="/wishlist"
            className="flex items-center gap-3 rounded-xl px-3 py-3 text-base font-medium text-slate-800 transition-colors hover:bg-brand-50 hover:text-brand-600"
            onClick={() => setMobileOpen(false)}
          >
            <span className="relative inline-flex">
              <Heart className="h-5 w-5 text-brand-600" aria-hidden />
              <CountBadge count={wishlistCount} />
            </span>
            {t('nav.wishlist')}
            {wishlistCount > 0 ? (
              <span className="ml-auto text-sm text-slate-500">({wishlistCount})</span>
            ) : null}
          </Link>
          <Link
            to="/cart"
            className="flex items-center gap-3 rounded-xl px-3 py-3 text-base font-medium text-slate-800 transition-colors hover:bg-brand-50 hover:text-brand-600"
            onClick={() => setMobileOpen(false)}
          >
            <span className="relative inline-flex">
              <ShoppingBag className="h-5 w-5 text-brand-600" aria-hidden />
              <CountBadge count={itemCount} />
            </span>
            {t('nav.cart')}
            {itemCount > 0 ? (
              <span className="ml-auto text-sm text-slate-500">({itemCount})</span>
            ) : null}
          </Link>
          <Link
            to={accountHref}
            className="flex items-center gap-3 rounded-xl px-3 py-3 text-base font-medium text-slate-800 transition-colors hover:bg-brand-50 hover:text-brand-600"
            onClick={() => setMobileOpen(false)}
          >
            <User className="h-5 w-5 text-brand-600" aria-hidden />
            {isAuthenticated ? t('nav.account') : t('nav.login')}
          </Link>
        </div>

        <div className="border-t border-slate-100 p-4">
          <p className="text-center text-xs text-slate-500">{t('nav.tagline')}</p>
        </div>
      </aside>
    </header>
  )
}
