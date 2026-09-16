import { useTranslation } from 'react-i18next';
import { LoginForm } from '@/components/organisms';
import { AuthTemplate } from '@/components/templates';
import { usePageTitle } from '@/lib/hooks';

export function LoginPage() {
  const { t } = useTranslation();
  usePageTitle(t('nav.login'));
  return (
    <AuthTemplate>
      <LoginForm />
    </AuthTemplate>
  );
}
