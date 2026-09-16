import { formatMoney } from '@/lib/utils';
import { cn } from '@/lib/utils';

type PriceTagProps = {
  amount: number;
  currency?: string;
  locale?: string;
  className?: string;
};

/** Molecule: formatted price display. */
export function PriceTag({ amount, currency = 'USD', locale = 'en', className }: PriceTagProps) {
  return (
    <span className={cn('font-semibold tabular-nums', className)}>
      {formatMoney(amount, currency, locale)}
    </span>
  );
}
