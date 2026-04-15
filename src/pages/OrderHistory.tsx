import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, Navigate } from 'react-router-dom';
import { ChevronDown, Package, ShoppingBag, Truck, CheckCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { products } from '../data/products';

interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface Order {
  id: string;
  date: string;
  status: 'Processing' | 'Shipped' | 'Delivered';
  items: OrderItem[];
  total: number;
}

const statusConfig = {
  Processing: { icon: Package, color: 'text-amber-600 bg-amber-50' },
  Shipped: { icon: Truck, color: 'text-blue-600 bg-blue-50' },
  Delivered: { icon: CheckCircle, color: 'text-green-600 bg-green-50' },
} as const;

const mockOrders: Order[] = [
  {
    id: 'TS-20260328-001',
    date: '2026-03-28',
    status: 'Delivered',
    items: [
      { productId: '1', name: products[0].name, price: products[0].price, quantity: 1, image: products[0].images[0] },
      { productId: '5', name: products[4].name, price: products[4].price, quantity: 2, image: products[4].images[0] },
    ],
    total: 59.97,
  },
  {
    id: 'TS-20260405-002',
    date: '2026-04-05',
    status: 'Shipped',
    items: [
      { productId: '4', name: products[3].name, price: products[3].price, quantity: 1, image: products[3].images[0] },
    ],
    total: 39.99,
  },
  {
    id: 'TS-20260412-003',
    date: '2026-04-12',
    status: 'Processing',
    items: [
      { productId: '7', name: products[6].name, price: products[6].price, quantity: 1, image: products[6].images[0] },
      { productId: '8', name: products[7].name, price: products[7].price, quantity: 1, image: products[7].images[0] },
    ],
    total: 92.98,
  },
];

function formatDate(iso: string) {
  return new Date(iso + 'T00:00:00').toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function formatPrice(value: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
}

const statusI18nKey: Record<Order['status'], string> = {
  Processing: 'orders.processing',
  Shipped: 'orders.shipped',
  Delivered: 'orders.delivered',
};

export function OrderHistory() {
  const { t } = useTranslation();
  const { isAuthenticated } = useAuth();
  const [expandedOrders, setExpandedOrders] = useState<Set<string>>(new Set());

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const orders = mockOrders;

  function toggleOrder(id: string) {
    setExpandedOrders((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  if (orders.length === 0) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
        <div className="flex size-16 items-center justify-center rounded-full bg-brand-50">
          <Package className="size-8 text-brand-600" strokeWidth={1.5} />
        </div>
        <h1 className="mt-6 text-2xl font-bold text-slate-900">{t('orders.emptyTitle')}</h1>
        <p className="mt-2 max-w-md text-slate-600">
          {t('orders.emptyDescription')}
        </p>
        <Link
          to="/search"
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700"
        >
          <ShoppingBag className="size-4" />
          {t('orders.startShopping')}
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <section className="mx-auto max-w-4xl px-4 py-16 md:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
          {t('orders.title')}
        </h1>
        <p className="mt-2 text-slate-600">{t('orders.subtitle')}</p>

        <div className="mt-8 flex flex-col gap-4">
          {orders.map((order) => {
            const expanded = expandedOrders.has(order.id);
            const { icon: StatusIcon, color: statusColor } = statusConfig[order.status];

            return (
              <div
                key={order.id}
                className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => toggleOrder(order.id)}
                  className="flex w-full items-center gap-4 px-6 py-5 text-left transition hover:bg-slate-50"
                >
                  <div className="hidden sm:block">
                    <div className="flex size-12 items-center justify-center rounded-xl bg-slate-100">
                      <Package className="size-6 text-slate-500" strokeWidth={1.5} />
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      <span className="font-semibold text-slate-900">{order.id}</span>
                      <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColor}`}>
                        <StatusIcon className="size-3.5" />
                        {t(statusI18nKey[order.status])}
                      </span>
                    </div>
                    <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-500">
                      <span>{formatDate(order.date)}</span>
                      <span>{order.items.length} {order.items.length === 1 ? t('orders.item') : t('orders.items')}</span>
                      <span className="font-medium text-slate-900">{formatPrice(order.total)}</span>
                    </div>
                  </div>

                  <ChevronDown
                    className={`size-5 shrink-0 text-slate-400 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
                  />
                </button>

                <div
                  className={`grid transition-[grid-template-rows] duration-200 ${expanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
                >
                  <div className="overflow-hidden">
                    <div className="border-t border-slate-100 px-6 py-4">
                      <div className="flex flex-col gap-3">
                        {order.items.map((item) => (
                          <div key={item.productId} className="flex items-center gap-4">
                            <img
                              src={item.image}
                              alt=""
                              className="size-14 shrink-0 rounded-lg bg-slate-100 object-cover"
                            />
                            <div className="flex-1">
                              <p className="text-sm font-medium text-slate-900">{item.name}</p>
                              <p className="text-sm text-slate-500">{t('orders.qty')}: {item.quantity}</p>
                            </div>
                            <span className="text-sm font-medium text-slate-900">
                              {formatPrice(item.price * item.quantity)}
                            </span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
                        <span className="text-sm font-medium text-slate-600">{t('orders.total')}</span>
                        <span className="text-base font-semibold text-slate-900">
                          {formatPrice(order.total)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
