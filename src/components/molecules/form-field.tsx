import type { ReactNode } from 'react';
import { Label } from '@/components/atoms';
import { cn } from '@/lib/utils';

type FormFieldProps = {
  label: ReactNode;
  htmlFor?: string;
  error?: ReactNode;
  className?: string;
  children: ReactNode;
};

/** Molecule: Label + control + optional error message. */
export function FormField({ label, htmlFor, error, className, children }: FormFieldProps) {
  return (
    <div className={cn('space-y-1', className)}>
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
      {error ? <p className="text-sm text-destructive">{error}</p> : null}
    </div>
  );
}
