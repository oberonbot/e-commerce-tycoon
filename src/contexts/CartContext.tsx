import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { Product } from '../data/products';

const STORAGE_KEY = 'e-commerce-tycoon:cart';

export interface CartItem {
  product: Product;
  quantity: number;
  selectedVariants: Record<string, string>;
}

export interface CartContextType {
  items: CartItem[];
  addToCart: (
    product: Product,
    quantity?: number,
    selectedVariants?: Record<string, string>,
  ) => void;
  removeFromCart: (productId: string, selectedVariants?: Record<string, string>) => void;
  updateQuantity: (
    productId: string,
    selectedVariants: Record<string, string>,
    quantity: number,
  ) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

function normalizeVariants(v: Record<string, string>): string {
  const keys = Object.keys(v).sort();
  const sorted: Record<string, string> = {};
  for (const k of keys) {
    sorted[k] = v[k];
  }
  return JSON.stringify(sorted);
}

function matchesLine(
  item: CartItem,
  productId: string,
  selectedVariants: Record<string, string>,
): boolean {
  return (
    item.product.id === productId &&
    normalizeVariants(item.selectedVariants) === normalizeVariants(selectedVariants)
  );
}

function readStoredCart(): CartItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed as CartItem[];
  } catch {
    return [];
  }
}

function writeStoredCart(items: CartItem[]) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    /* ignore quota / private mode */
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => readStoredCart());

  useEffect(() => {
    writeStoredCart(items);
  }, [items]);

  const addToCart = useCallback(
    (product: Product, quantity = 1, selectedVariants: Record<string, string> = {}) => {
      const qty = Math.max(1, Math.floor(quantity));
      setItems((prev) => {
        const idx = prev.findIndex((item) => matchesLine(item, product.id, selectedVariants));
        if (idx >= 0) {
          const next = [...prev];
          next[idx] = { ...next[idx], quantity: next[idx].quantity + qty };
          return next;
        }
        return [...prev, { product, quantity: qty, selectedVariants: { ...selectedVariants } }];
      });
    },
    [],
  );

  const removeFromCart = useCallback((productId: string, selectedVariants: Record<string, string> = {}) => {
    setItems((prev) => prev.filter((item) => !matchesLine(item, productId, selectedVariants)));
  }, []);

  const updateQuantity = useCallback(
    (productId: string, selectedVariants: Record<string, string>, quantity: number) => {
      const q = Math.floor(quantity);
      if (q <= 0) {
        setItems((prev) => prev.filter((item) => !matchesLine(item, productId, selectedVariants)));
        return;
      }
      setItems((prev) =>
        prev.map((item) =>
          matchesLine(item, productId, selectedVariants) ? { ...item, quantity: q } : item,
        ),
      );
    },
    [],
  );

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const itemCount = useMemo(() => items.reduce((sum, item) => sum + item.quantity, 0), [items]);

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
    [items],
  );

  const value = useMemo<CartContextType>(
    () => ({
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      itemCount,
      subtotal,
    }),
    [items, addToCart, removeFromCart, updateQuantity, clearCart, itemCount, subtotal],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextType {
  const ctx = useContext(CartContext);
  if (ctx === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return ctx;
}
