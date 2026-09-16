import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '@/lib/auth';
import { CheckoutForm } from '@/components/organisms';
import { Button } from '@/components/atoms';
import { EmptyState } from '@/components/molecules';
import { usePageTitle } from '@/lib/hooks';

export function CheckoutPage() {
  const { t } = useTranslation();
  usePageTitle(t('checkout.title'));
  const user = useAuthStore((s) => s.user);

  if (!user) {
    return (
      <EmptyState
        title={t('checkout.title')}
        description={t('cart.loginHint')}
        action={
          <Button asChild>
            <Link to="/login">{t('nav.login')}</Link>
          </Button>
        }
      />
    );
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <h1 className="text-2xl font-bold">{t('checkout.title')}</h1>
      <CheckoutForm defaultFullName={user.name || ''} />
    </div>
  );
}
