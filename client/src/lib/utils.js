import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatDate(dateStr) {
  if (!dateStr) return '';
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(new Date(dateStr));
}

export function formatShortDate(dateStr) {
  if (!dateStr) return '';
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }).format(new Date(dateStr));
}

export function getInitials(fullName) {
  if (!fullName) return '';
  const parts = fullName.split(' ');
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}

export function capitalise(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}
