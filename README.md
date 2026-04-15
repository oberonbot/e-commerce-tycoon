# TechShell — Premium Phone Accessories E-Commerce

A modern, fully-featured e-commerce storefront built with **React**, **TypeScript**, **Tailwind CSS v4**, and **Vite**. TechShell is a standalone frontend for a phone accessories shop with a clean, professional design that blends tech and art aesthetics.

> **Note:** This is a pure frontend application with mock data. No backend or database is required — all state is managed in-memory and persisted via `localStorage`.

---

## Features

### Shopping Experience
- **Home page** — Hero carousel with auto-advance, category filter pills, and a responsive product grid (1–4 columns)
- **Product detail page** — Image gallery with thumbnails, variant selectors (model, color, etc.), quantity picker, star ratings, features list, full description, and "You May Also Like" recommendations
- **Search & filtering** — Full-text search across product names and descriptions, category dropdown, price range inputs, and sort options (featured, price, rating, newest)
- **Wishlist** — Heart toggle on any product card or detail page, persisted across sessions
- **Product catalog** — 12 realistic products across 6 categories (Cases, Chargers, Screen Protectors, Stands & Mounts, Audio, Cables)

### Cart & Checkout
- **Shopping cart** — Line items with variant display, quantity controls, per-line totals, and order subtotal
- **Shipping page** — Full address form with US state dropdown, country selector, three shipping speed options (Standard/Express/Overnight) with dynamic pricing
- **Payment page** — Credit card form with formatting, Google Pay and Apple Pay mock buttons, promo code system (try `TECH20` for 20% off), billing address toggle
- **Order confirmation** — Full receipt with order number, itemized breakdown, shipping address, payment method, and estimated delivery date

### Authentication
- **Login** — Demo sign-in with any email (no password required for demo purposes)
- **Registration** — Full form with validation (name, email, password, confirm password), marketing opt-in checkbox, terms agreement
- **Email verification** — 6-digit code input (accepts any 6-digit code in demo mode)
- **Protected routes** — Checkout pages require authentication; unverified users are redirected to verify email

### Informational Pages
- **About** — Brand story, company values (Innovation, Quality, Sustainability, Community), team member profiles, and CTA section
- **Contact** — Business info (email, phone, address, hours), contact form with subject categories, FAQ callout
- **FAQ** — Accordion-style Q&A organized by category (Shipping, Returns, Payment, Products, Account) with 15+ detailed answers
- **Return Policy** — Complete 30-day return policy with eligibility, step-by-step process, refund timeline, and exceptions
- **Terms of Service** — Full 10-section legal terms
- **Privacy Policy** — 9-section privacy policy covering data collection, cookies, rights, and security

### Multi-Language Support
- **Three languages** — English (default), Spanish (Español), and Simplified Chinese (中文)
- **Language switcher** — Globe icon dropdown in the navbar (desktop and mobile)
- **Full coverage** — Every UI string across all 20+ pages is translated, including legal pages and FAQ content
- **Persisted preference** — Language choice saved to `localStorage` and restored on reload

### Order Management
- **Order history** — Past orders with status badges (Processing, Shipped, Delivered) and expandable item details
- **Order persistence** — Completed orders stored in `localStorage`

### UX & Design
- **Responsive design** — Mobile-first layout with hamburger menu drawer, stacked layouts on small screens
- **404 page** — Custom not-found page with navigation links
- **Newsletter signup** — Email capture in the home page hero section and footer
- **Scroll to top** — Automatic scroll reset on page navigation
- **Smooth transitions** — Carousel animations, hover effects, accordion expand/collapse

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | [React 19](https://react.dev) with TypeScript |
| Build Tool | [Vite 8](https://vite.dev) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com) |
| Routing | [React Router v7](https://reactrouter.com) |
| Icons | [Lucide React](https://lucide.dev) |
| i18n | [i18next](https://www.i18next.com) + [react-i18next](https://react.i18next.com) |
| State | React Context API + `localStorage` persistence |

---

## Getting Started

### Prerequisites

- **Node.js** >= 18 (tested with v25)
- **npm** >= 9

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/e-commerce-tycoon.git
cd e-commerce-tycoon

# Install dependencies
npm install
```

### Development

```bash
# Start the dev server with hot module replacement
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build

```bash
# Type-check and build for production
npm run build

# Preview the production build locally
npm run preview
```

### Linting

```bash
npm run lint
```

---

## Project Structure

```
src/
├── components/
│   ├── Navbar.tsx                 # Sticky header with nav, search, wishlist, cart, language switcher
│   ├── Footer.tsx                 # 4-column footer with links, social icons, newsletter
│   ├── Carousel.tsx               # Auto-advancing hero carousel with arrows & dots
│   ├── ProductCard.tsx            # Product card with wishlist, sale badge, add to cart
│   ├── CartItem.tsx               # Cart line item with quantity controls
│   └── checkout/
│       ├── CheckoutProgress.tsx   # 3-step checkout stepper indicator
│       └── OrderSummaryCard.tsx   # Reusable order summary sidebar
├── contexts/
│   ├── AuthContext.tsx             # Mock auth (login, register, verify, logout)
│   ├── CartContext.tsx             # Cart state with variant-aware line items
│   └── WishlistContext.tsx         # Wishlist by product ID
├── data/
│   └── products.ts                # 12 products, hero slides, categories
├── lib/
│   └── techshellCheckout.ts       # Checkout helpers (shipping calc, order storage)
├── locales/
│   ├── en.ts                      # English translations
│   ├── es.ts                      # Spanish translations
│   └── zh.ts                      # Simplified Chinese translations
├── pages/
│   ├── Home.tsx                   # Hero + category filter + product grid + features + newsletter
│   ├── ProductDetail.tsx          # Image gallery + variants + add to cart + related
│   ├── Cart.tsx                   # Cart items + subtotal + checkout link
│   ├── Login.tsx                  # Sign-in form with redirect support
│   ├── Register.tsx               # Registration with validation + terms
│   ├── VerifyEmail.tsx            # 6-digit verification code
│   ├── Shipping.tsx               # Address form + shipping method selection
│   ├── Payment.tsx                # Card/GPay/APay + promo + billing
│   ├── OrderConfirmation.tsx      # Order success with full receipt
│   ├── OrderHistory.tsx           # Past orders with expandable details
│   ├── Search.tsx                 # Search + filter + sort
│   ├── Wishlist.tsx               # Saved products grid
│   ├── About.tsx                  # Brand story, values, team
│   ├── Contact.tsx                # Contact form + business info
│   ├── FAQ.tsx                    # Accordion FAQ by category
│   ├── ReturnPolicy.tsx           # 30-day return policy
│   ├── TermsOfService.tsx         # Full terms
│   ├── PrivacyPolicy.tsx          # Privacy policy
│   └── NotFound.tsx               # 404 page
├── i18n.ts                        # i18next configuration
├── App.tsx                        # Router with all routes + layout shell
├── main.tsx                       # Entry point
└── index.css                      # Tailwind imports + custom theme
```

---

## Available Routes

| Path | Page |
|------|------|
| `/` | Home (shop) |
| `/product/:slug` | Product detail |
| `/cart` | Shopping cart |
| `/login` | Sign in |
| `/register` | Create account |
| `/verify-email` | Email verification |
| `/shipping` | Checkout — shipping |
| `/payment` | Checkout — payment |
| `/order-confirmation` | Order success |
| `/orders` | Order history |
| `/search` | Search & filter |
| `/wishlist` | Wishlist |
| `/about` | About us |
| `/contact` | Contact |
| `/faq` | FAQ |
| `/returns` | Return policy |
| `/terms` | Terms of service |
| `/privacy` | Privacy policy |
| `*` | 404 Not Found |

---

## Demo Tips

- **Promo code:** Enter `TECH20` on the payment page for 20% off
- **Login:** Use any email address — no real authentication is required
- **Email verification:** Enter any 6-digit number (e.g., `123456`)
- **Language:** Click the globe icon in the navbar to switch between English, Spanish, and Chinese
- **Data persistence:** Cart, wishlist, auth state, and completed orders persist in `localStorage`

---

## Contributing

Contributions are welcome! Here's how to get started:

1. **Fork** the repository
2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes** — follow the existing code style:
   - TypeScript strict mode
   - Tailwind utility classes only (no `@apply`)
   - Functional components with hooks
   - Translation keys for all user-facing strings
4. **Test your changes**
   ```bash
   npm run build    # Ensure TypeScript compiles cleanly
   npm run lint     # Ensure no lint errors
   ```
5. **Commit** with a descriptive message
   ```bash
   git commit -m "feat: add product reviews section"
   ```
6. **Push** and open a Pull Request
   ```bash
   git push origin feature/your-feature-name
   ```

### Adding a New Language

1. Create a new file in `src/locales/` (e.g., `fr.ts`) using `en.ts` as a template
2. Translate all values while keeping the exact same key structure
3. Register it in `src/i18n.ts` by importing and adding to the `resources` object
4. Add the language option to the `lang` key in all existing locale files

### Code Style Guidelines

- Use `const` by default, `let` only when reassignment is needed
- Prefer named exports for pages and components
- Keep components focused — one component per file
- Use Tailwind CSS utility classes directly; avoid custom CSS
- All user-facing text must use `useTranslation()` with keys from `src/locales/`

---

## License

This project is for educational and demonstration purposes.

---

Built with React + TypeScript + Tailwind CSS + Vite
