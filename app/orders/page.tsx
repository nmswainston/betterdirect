'use client';

import Link from 'next/link';
import { mockOrders } from '@/lib/mockData';
import { useAuthGuard } from '@/hooks/useAuthGuard';
import { getStatusBadgeClass, formatDate, formatCurrency } from '@/lib/utils';

export default function OrdersPage() {
  const isReady = useAuthGuard();

  if (!isReady) return null;

  return (
    <>
      <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Past Orders</h2>
          <p className="text-gray-600 mt-2 dark:text-gray-300">Select an order to reorder items</p>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {mockOrders.map((order) => (
            <Link
              key={order.id}
              href={`/orders/${order.id}`}
              className="block bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow dark:bg-slate-900 dark:shadow-slate-950/40 dark:hover:shadow-slate-900/70"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-base font-bold text-gray-900 dark:text-gray-100">{order.poNumber}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {formatDate(order.date, 'long')} • {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{formatCurrency(order.total)}</p>
                  <span className={`inline-block mt-1 px-3 py-1 text-xs font-semibold rounded-full ${getStatusBadgeClass(order.status)}`}>
                    {order.status.replace('-', ' ')}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
    </>
  );
}

