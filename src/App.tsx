import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import { Footer } from './components/Footer';
import { Navbar } from './components/Navbar';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { WishlistProvider } from './contexts/WishlistContext';
import { About } from './pages/About';
import { Cart } from './pages/Cart';
import { Contact } from './pages/Contact';
import { FAQ } from './pages/FAQ';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { NotFound } from './pages/NotFound';
import { OrderConfirmation } from './pages/OrderConfirmation';
import { OrderHistory } from './pages/OrderHistory';
import { Payment } from './pages/Payment';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { ProductDetail } from './pages/ProductDetail';
import { Register } from './pages/Register';
import { ReturnPolicy } from './pages/ReturnPolicy';
import { Search } from './pages/Search';
import { Shipping } from './pages/Shipping';
import { TermsOfService } from './pages/TermsOfService';
import { VerifyEmail } from './pages/VerifyEmail';
import { Wishlist } from './pages/Wishlist';

function ShellLayout() {
  return (
    <div className="flex min-h-screen flex-col font-sans bg-slate-50">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <Routes>
              <Route element={<ShellLayout />}>
                <Route index element={<Home />} />
                <Route path="product/:slug" element={<ProductDetail />} />
                <Route path="cart" element={<Cart />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="verify-email" element={<VerifyEmail />} />
                <Route path="shipping" element={<Shipping />} />
                <Route path="payment" element={<Payment />} />
                <Route path="order-confirmation" element={<OrderConfirmation />} />
                <Route path="orders" element={<OrderHistory />} />
                <Route path="search" element={<Search />} />
                <Route path="wishlist" element={<Wishlist />} />
                <Route path="about" element={<About />} />
                <Route path="faq" element={<FAQ />} />
                <Route path="contact" element={<Contact />} />
                <Route path="returns" element={<ReturnPolicy />} />
                <Route path="terms" element={<TermsOfService />} />
                <Route path="privacy" element={<PrivacyPolicy />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
