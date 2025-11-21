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
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">PO Number</p>
          <p className="text-base font-semibold text-gray-900 dark:text-gray-100">{order.poNumber}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Order Date</p>
          <p className="text-base font-semibold text-gray-900 dark:text-gray-100">
            {formatDate(order.date, 'long')}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Shipping Address</p>
          <p className="text-base font-semibold text-gray-900 dark:text-gray-100">{order.shippingAddress}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Tracking Number</p>
          <p className="text-base font-semibold text-gray-900 dark:text-gray-100">
            {trackingNumber || order.trackingNumber || 'Not available'}
          </p>
        </div>
      </div>
    </Card>
  );
}

