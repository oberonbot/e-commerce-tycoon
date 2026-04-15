import { useMemo, useState, type FormEvent, type ReactNode, type SVGProps } from 'react'
import { Link } from 'react-router-dom'
import { Smartphone, X } from 'lucide-react'
import { useTranslation } from 'react-i18next'

function InstagramGlyph(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  )
}

function FacebookGlyph(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M24 12.073C24 5.446 18.627 0 12 0S0 5.446 0 12.073c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078V9.218h3.047V7.183c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  )
}

const social = [
  {
    href: 'https://www.instagram.com/',
    label: 'Instagram',
    Icon: InstagramGlyph,
  },
  {
    href: 'https://x.com/',
    label: 'X (Twitter)',
    Icon: X,
  },
  {
    href: 'https://www.facebook.com/',
    label: 'Facebook',
    Icon: FacebookGlyph,
  },
] as const

function FooterColumn({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-sm font-semibold tracking-wide text-white">{title}</h3>
      {children}
    </div>
  )
}

export function Footer() {
  const { t } = useTranslation()
  const [email, setEmail] = useState('')

  const shopLinks = useMemo(
    () =>
      [
        { to: '/shop', label: t('footer.allProducts') },
        { to: '/shop/cases', label: t('footer.cases') },
        { to: '/shop/chargers', label: t('footer.chargers') },
        { to: '/shop/audio', label: t('footer.audio') },
        { to: '/shop/accessories', label: t('footer.accessories') },
      ] as const,
    [t],
  )

  const supportLinks = useMemo(
    () =>
      [
        { to: '/contact', label: t('footer.contactLink') },
        { to: '/faq', label: t('footer.faqLink') },
        { to: '/shipping', label: t('footer.shippingInfo') },
        { to: '/returns', label: t('footer.returnPolicy') },
      ] as const,
    [t],
  )

  const legalLinks = useMemo(
    () =>
      [
        { to: '/terms', label: t('footer.termsOfService') },
        { to: '/privacy', label: t('footer.privacyPolicy') },
        { to: '/about', label: t('footer.aboutUs') },
      ] as const,
    [t],
  )

  function onNewsletterSubmit(e: FormEvent) {
    e.preventDefault()
    setEmail('')
  }

  const linkClass =
    'text-sm text-slate-300 transition-colors hover:text-brand-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400 rounded-sm'

  return (
    <footer className="bg-slate-900 text-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          <FooterColumn title="TechShell">
            <Link
              to="/"
              className="group flex w-fit items-center gap-2 rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-600 text-white shadow-lg shadow-brand-900/30 transition-transform group-hover:scale-[1.02]">
                <Smartphone className="h-5 w-5" strokeWidth={2} aria-hidden />
              </span>
              <span className="font-sans text-xl font-bold tracking-tight">TechShell</span>
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-slate-300">
              {t('footer.description')}
            </p>
            <div className="flex items-center gap-3 pt-1">
              {social.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-700 text-slate-200 transition-colors hover:border-brand-500 hover:bg-slate-800 hover:text-brand-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </FooterColumn>

          <FooterColumn title={t('footer.shop')}>
            <ul className="flex flex-col gap-2">
              {shopLinks.map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className={linkClass}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </FooterColumn>

          <FooterColumn title={t('footer.support')}>
            <ul className="flex flex-col gap-2">
              {supportLinks.map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className={linkClass}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </FooterColumn>

          <FooterColumn title={t('footer.legal')}>
            <ul className="flex flex-col gap-2">
              {legalLinks.map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className={linkClass}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="pt-2">
              <p className="text-sm font-medium text-slate-200">{t('footer.newsletter')}</p>
              <p className="mt-1 text-xs text-slate-400">{t('footer.newsletterDesc')}</p>
              <form
                className="mt-3 flex flex-col gap-2 sm:flex-row"
                onSubmit={onNewsletterSubmit}
              >
                <label htmlFor="footer-newsletter-email" className="sr-only">
                  {t('home.emailLabel')}
                </label>
                <input
                  id="footer-newsletter-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder={t('footer.emailPlaceholder')}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full min-w-0 flex-1 rounded-lg border border-slate-700 bg-slate-800/80 px-3 py-2 text-sm text-white shadow-inner shadow-black/20 placeholder:text-slate-500 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/40"
                />
                <button
                  type="submit"
                  className="shrink-0 rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-brand-900/30 transition-colors hover:bg-brand-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-300"
                >
                  {t('footer.subscribe')}
                </button>
              </form>
            </div>
          </FooterColumn>
        </div>

        <div className="mt-12 border-t border-slate-800 pt-8 text-center text-sm text-slate-400">
          {t('footer.copyright')}
        </div>
      </div>
    </footer>
  )
}
