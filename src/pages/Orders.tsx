import { Link } from 'react-router-dom';
import { Package } from 'lucide-react';
import { readLastOrder } from '../lib/techshellCheckout';

export function Orders() {
  const last = readLastOrder();

  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-2xl font-bold tracking-tight text-slate-900">Order history</h1>
      <p className="mt-1 text-sm text-slate-600">Orders placed in this browser session.</p>

      {!last ? (
        <div className="mt-10 flex flex-col items-center rounded-2xl border border-dashed border-slate-200 bg-white py-16 text-center">
          <Package className="size-12 text-slate-300" strokeWidth={1.25} aria-hidden />
          <p className="mt-4 text-slate-600">No orders yet.</p>
          <Link to="/" className="mt-6 text-sm font-semibold text-brand-600 hover:text-brand-700">
            Start shopping
          </Link>
        </div>
      ) : (
        <ul className="mt-8 space-y-4">
          <li className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="font-mono font-semibold text-slate-900">{last.orderNumber}</p>
              <p className="text-xs text-slate-500">{new Date(last.placedAt).toLocaleString()}</p>
            </div>
            <p className="mt-2 text-sm text-slate-600">{last.lines.length} line item(s)</p>
            <Link
              to={`/order-confirmation?order=${encodeURIComponent(last.orderNumber)}`}
              className="mt-4 inline-block text-sm font-semibold text-brand-600 hover:text-brand-700"
            >
              View confirmation
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
}
