'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { mockOrders } from '@/lib/mockData';
import { useAuthGuard } from '@/hooks/useAuthGuard';
import { getStatusBadgeClass, getStatusLabel, formatDate, formatCurrency } from '@/lib/utils';

export default function DashboardPage() {
  const router = useRouter();
  const isReady = useAuthGuard();

  if (!isReady) return null;

  const recentOrders = mockOrders.slice(0, 3);
  const ordersWithTracking = recentOrders.filter(order => order.trackingNumber);

  return (
    <>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Dashboard</h2>
        <p className="text-gray-600 mt-2 dark:text-gray-300">Manage your orders and get quick access to key features</p>
      </div>

      {/* Quick Actions Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card>
          <h3 className="font-semibold text-gray-900 dark:text-gray-100">Quick Reorder</h3>
          <p className="text-sm text-gray-600 mt-1 dark:text-gray-300">
            Reorder from your recent purchase orders.
          </p>
          <Link href="/orders">
            <Button className="mt-3" size="sm">View Past Orders</Button>
          </Link>
        </Card>
        <Card>
          <h3 className="font-semibold text-gray-900 dark:text-gray-100">Track Orders</h3>
          <p className="text-sm text-gray-600 mt-1 dark:text-gray-300">
            Check real-time status for active shipments.
          </p>
          {ordersWithTracking[0] && (
            <Link href={`/tracking/${ordersWithTracking[0].id}`}>
              <Button className="mt-3" size="sm" variant="secondary">
                Track Latest Order
              </Button>
            </Link>
          )}
        </Card>
        <Card>
          <h3 className="font-semibold text-gray-900 dark:text-gray-100">Ask BetterBot</h3>
          <p className="text-sm text-gray-600 mt-1 dark:text-gray-300">
            Get help with compatibility, stock, and more.
          </p>
          <Button
            className="mt-3"
            size="sm"
            variant="outline"
            onClick={() => {
              // optional: expose a BetterBot open function via context
              const event = new CustomEvent('openBetterBot');
              window.dispatchEvent(event);
            }}
          >
            Open BetterBot
          </Button>
        </Card>
      </div>

      {/* Recent Orders Section */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4 dark:text-gray-100">Recent Orders</h3>
        <div className="bg-white rounded-lg shadow-md overflow-hidden dark:bg-slate-900 dark:shadow-slate-950/40">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-slate-800">
              <thead className="bg-gray-50 dark:bg-slate-900/70">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                    PO Number
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                    Order Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                    Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 dark:bg-slate-900 dark:divide-slate-800">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-slate-800/70">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                      {order.poNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {formatDate(order.date)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusBadgeClass(order.status)}`}>
                        {getStatusLabel(order.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                      {formatCurrency(order.total)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <Link
                        href={`/orders/${order.id}`}
                        className="text-primary-600 hover:text-primary-900 dark:text-primary-400 dark:hover:text-primary-300"
                      >
                        View details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

