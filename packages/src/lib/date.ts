import { format } from 'date-fns';
import type { DateRange } from 'react-day-picker';

export function getTimezone() {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

type DateRangeParams = {
  start_date?: string;
  end_date?: string;
};

/**
 * Convert `DateRange` (react-day-picker) to a format string
 * that meets API requirements (default: `yyyy-MM-dd`).
 *
 * @param range - A DateRange object containing `from` and `to` (optional).
 * @param formatStr - The date format (default: `yyyy-MM-dd`).
 *
 * @returns An object containing:
 * - `start_date` → the format string resulting from `range.from`
 * - `end_date` → the format string resulting from `range.to`
 *
 * @remarks
 * - Will return `{}` if `range` is undefined
 * - Field will be `undefined` if `from` / `to` is not provided
 * - Safe to spread directly to object query parameters
 */
export const mapDateRangeToParams = (
  range?: DateRange,
  formatStr: string = 'yyyy-MM-dd',
): DateRangeParams => {
  if (!range) return {};

  return {
    end_date: range.to ? format(range.to, formatStr) : undefined,
    start_date: range.from ? format(range.from, formatStr) : undefined,
  };
};

export function formatDateFilterTable(
  date: Date | string | number | undefined,
  opts: Intl.DateTimeFormatOptions = {},
) {
  if (!date) return '';

  try {
    return new Intl.DateTimeFormat('en-US', {
      day: opts.day ?? 'numeric',
      month: opts.month ?? 'long',
      year: opts.year ?? 'numeric',
      ...opts,
    }).format(new Date(date));
  } catch (_err) {
    return '';
  }
}
