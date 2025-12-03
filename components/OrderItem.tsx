'use client';

import { OrderItem as OrderItemType } from '@/types/order';
import { formatCurrency } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface OrderItemProps {
  item: OrderItemType;
  quantity: number;
  isSelected: boolean;
  onToggle: () => void;
  onQuantityChange: (quantity: number) => void;
}

export default function OrderItem({
  item,
  quantity,
  isSelected,
  onToggle,
  onQuantityChange,
}: OrderItemProps) {
  const handleIncrement = () => {
    onQuantityChange(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 0) {
      onQuantityChange(quantity - 1);
    }
  };

  return (
    <div
      className={cn(
        'border-2 rounded-xl p-5 transition-all duration-200',
        isSelected
          ? 'border-primary-500 bg-primary-50/50 dark:bg-primary-900/20 shadow-sm'
          : 'border-gray-200 dark:border-slate-700 dark:bg-slate-800/50 hover:border-gray-300 dark:hover:border-slate-600'
      )}
    >
      <div className="flex flex-col sm:flex-row sm:items-start space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="flex items-start space-x-4 flex-1">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={onToggle}
            className="mt-1 h-5 w-5 text-primary-600 focus:ring-2 focus:ring-primary-500 focus:ring-offset-1 border-gray-300 rounded transition-colors dark:border-slate-600 dark:bg-slate-800 cursor-pointer"
            aria-label={`Select ${item.productName}`}
          />
          <div className="flex-1">
            <h4 className="font-semibold text-gray-900 dark:text-gray-100 text-base">{item.productName}</h4>
            <p className="text-sm text-gray-500 mt-1 dark:text-gray-400">SKU: {item.sku}</p>
            <p className="text-lg font-semibold text-gray-900 mt-2 dark:text-gray-100">
              {formatCurrency(item.price)}
              <span className="text-sm font-normal text-gray-500 dark:text-gray-400 ml-1">each</span>
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between sm:justify-end space-x-4 sm:space-x-6">
          <div className="flex items-center border-2 border-gray-300 rounded-lg overflow-hidden dark:border-slate-600">
            <button
              onClick={handleDecrement}
              disabled={quantity === 0}
              className="px-3 py-1.5 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent dark:text-gray-300 dark:hover:bg-slate-700 transition-colors font-medium"
              aria-label="Decrease quantity"
            >
              −
            </button>
            <span className="px-4 py-1.5 text-gray-900 font-semibold min-w-[3rem] text-center bg-gray-50 dark:bg-slate-800 dark:text-gray-100">
              {quantity}
            </span>
            <button
              onClick={handleIncrement}
              className="px-3 py-1.5 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-slate-700 transition-colors font-medium"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Subtotal</p>
            <p className="text-xl font-bold text-gray-900 dark:text-gray-100">
              {formatCurrency(item.price * quantity)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

