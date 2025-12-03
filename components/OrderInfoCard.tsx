'use client';

import Card from '@/components/ui/Card';
import { Order } from '@/types/order';
import { formatDate } from '@/lib/utils';

interface OrderInfoCardProps {
  order: Order;
  trackingNumber?: string;
}

export default function OrderInfoCard({ order, trackingNumber }: OrderInfoCardProps) {
  return (
    <Card>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide dark:text-gray-400 mb-2">PO Number</p>
          <p className="text-base font-bold text-gray-900 dark:text-gray-100">{order.poNumber}</p>
        </div>
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide dark:text-gray-400 mb-2">Order Date</p>
          <p className="text-base font-bold text-gray-900 dark:text-gray-100">
            {formatDate(order.date, 'long')}
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide dark:text-gray-400 mb-2">Shipping Address</p>
          <p className="text-base font-bold text-gray-900 dark:text-gray-100">{order.shippingAddress}</p>
        </div>
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide dark:text-gray-400 mb-2">Tracking Number</p>
          <p className="text-base font-bold text-gray-900 dark:text-gray-100">
            {trackingNumber || order.trackingNumber || (
              <span className="text-gray-400 dark:text-gray-500 font-normal">Not available</span>
            )}
          </p>
        </div>
      </div>
    </Card>
  );
}

