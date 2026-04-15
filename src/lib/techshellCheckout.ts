export const CHECKOUT_SHIPPING_KEY = 'techshell:checkoutShipping';
export const LAST_ORDER_KEY = 'techshell:lastOrder';

export type ShippingMethodId = 'standard' | 'express' | 'overnight';

export interface ShippingAddress {
  fullName: string;
  email: string;
  phone: string;
  line1: string;
  line2: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  saveAsDefault: boolean;
}

export interface StoredShippingCheckout {
  address: ShippingAddress;
  method: ShippingMethodId;
  shippingCost: number;
}

export interface StoredOrderLine {
  productId: string;
  name: string;
  image: string;
  quantity: number;
  unitPrice: number;
  selectedVariants: Record<string, string>;
}

export interface LastOrderPayload {
  orderNumber: string;
  placedAt: string;
  customerName: string;
  customerEmail: string;
  lines: StoredOrderLine[];
  subtotal: number;
  shippingLabel: string;
  shippingAmount: number;
  taxRate: number;
  taxAmount: number;
  promoCode: string | null;
  discountAmount: number;
  total: number;
  shippingAddress: ShippingAddress;
  paymentMethod: 'card' | 'google' | 'apple';
  cardLast4: string | null;
  billingSameAsShipping: boolean;
  billingAddress: ShippingAddress | null;
  estimatedDelivery: string;
}

export function formatMoney(value: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
}

export function shippingAmountForMethod(
  method: ShippingMethodId,
  subtotal: number,
): number {
  if (method === 'standard') return subtotal >= 50 ? 0 : 5.99;
  if (method === 'express') return 12.99;
  return 24.99;
}

export function shippingMethodLabel(id: ShippingMethodId): string {
  if (id === 'standard') return 'Standard (5–7 days)';
  if (id === 'express') return 'Express (2–3 days)';
  return 'Overnight (1 day)';
}

export function readStoredShipping(): StoredShippingCheckout | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(CHECKOUT_SHIPPING_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredShippingCheckout;
    if (!parsed?.address || !parsed.method) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function writeStoredShipping(data: StoredShippingCheckout) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(CHECKOUT_SHIPPING_KEY, JSON.stringify(data));
  } catch {
    /* ignore */
  }
}

export function readLastOrder(): LastOrderPayload | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(LAST_ORDER_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as LastOrderPayload;
  } catch {
    return null;
  }
}

export function writeLastOrder(order: LastOrderPayload) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(LAST_ORDER_KEY, JSON.stringify(order));
  } catch {
    /* ignore */
  }
}

export function estimateDeliveryRange(method: ShippingMethodId): string {
  const fmt = (d: Date) =>
    d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  const add = (days: number) => {
    const x = new Date();
    x.setDate(x.getDate() + days);
    return x;
  };
  if (method === 'standard') return `${fmt(add(5))} – ${fmt(add(7))}`;
  if (method === 'express') return `${fmt(add(2))} – ${fmt(add(3))}`;
  return fmt(add(1));
}
