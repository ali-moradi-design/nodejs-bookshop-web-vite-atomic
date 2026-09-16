import { useTranslation } from 'react-i18next';
import { Button } from '@/components/atoms';
import { useClearCartMutation } from '@/lib/cart/use-clear-cart-mutation';

export function ClearCartButton() {
  const { t } = useTranslation();
  const clearMut = useClearCartMutation();

  return (
    <Button
      variant="outline"
      className="border-destructive/40 text-destructive hover:bg-destructive/10 hover:text-destructive"
      onClick={() => clearMut.mutate()}
      disabled={clearMut.isPending}
    >
      {t('cart.clear')}
    </Button>
  );
}
