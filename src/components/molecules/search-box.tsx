import { Search } from 'lucide-react';
import { Input, Icon } from '@/components/atoms';
import { cn } from '@/lib/utils';

type SearchBoxProps = {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  onSubmit?: () => void;
  placeholder?: string;
  className?: string;
  inputClassName?: string;
  'aria-label'?: string;
};

/** Molecule: search input with leading icon. */
export function SearchBox({
  id,
  value,
  onChange,
  onSubmit,
  placeholder,
  className,
  inputClassName,
  'aria-label': ariaLabel,
}: SearchBoxProps) {
  return (
    <div className={cn('relative', className)}>
      <Icon
        icon={Search}
        size={16}
        className="pointer-events-none absolute start-3 top-1/2 -translate-y-1/2 text-muted-foreground"
      />
      <Input
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={ariaLabel}
        className={cn('ps-9', inputClassName)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') onSubmit?.();
        }}
      />
    </div>
  );
}
