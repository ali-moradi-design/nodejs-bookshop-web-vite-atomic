import type { LucideIcon, LucideProps } from 'lucide-react';
import { cn } from '@/lib/utils';

export type IconProps = LucideProps & {
  icon: LucideIcon;
  /** Pixel size shortcut; maps to width/height and keeps stroke consistent. */
  size?: number;
};

/**
 * Atom wrapper around Lucide icons for consistent sizing in the design system.
 */
export function Icon({ icon: Lucide, className, size = 16, ...props }: IconProps) {
  return (
    <Lucide
      className={cn('shrink-0', className)}
      width={size}
      height={size}
      aria-hidden={props['aria-label'] || props['aria-labelledby'] ? undefined : true}
      {...props}
    />
  );
}
