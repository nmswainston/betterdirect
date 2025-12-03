import { Order } from '@/types/order';

// Utility function for conditional class names
export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

// Status badge utilities
export const statusClasses: Record<Order['status'], string> = {
  'ordered': 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200',
  'processing': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
  'shipped': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
  'out-for-delivery': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
  'delivered': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
};

export const statusLabel: Record<Order['status'], string> = {
  'ordered': 'Ordered',
  'processing': 'Processing',
  'shipped': 'Shipped',
  'out-for-delivery': 'Out for Delivery',
  'delivered': 'Delivered',
};

export function getStatusBadgeClass(status: Order['status']): string {
  return statusClasses[status];
}

export function getStatusLabel(status: Order['status']): string {
  return statusLabel[status];
}

// Date formatting utilities
export function formatDate(date: string | Date, format: 'short' | 'long' = 'short'): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  if (format === 'long') {
    return dateObj.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }
  
  return dateObj.toLocaleDateString('en-US');
}

export function formatDateTime(date: string | Date): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

// Price formatting utilities
export function formatPrice(price: number): string {
  return price.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function formatCurrency(price: number): string {
  return `$${formatPrice(price)}`;
}

