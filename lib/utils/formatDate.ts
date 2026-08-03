import { format, formatDistanceToNow } from 'date-fns';
import { id } from 'date-fns/locale';

export function formatDate(date: Date | string, fmt = 'dd MMMM yyyy'): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return format(d, fmt, { locale: id });
}

export function formatDateEn(date: Date | string, fmt = 'MMMM dd, yyyy'): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return format(d, fmt);
}

export function timeAgo(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return formatDistanceToNow(d, { addSuffix: true, locale: id });
}

export function estimateReadTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.replace(/<[^>]*>/g, '').split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}
