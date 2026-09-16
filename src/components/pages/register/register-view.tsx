import { useTranslation } from 'react-i18next';
import { RegisterForm } from '@/components/organisms';
import { AuthTemplate } from '@/components/templates';
import { usePageTitle } from '@/lib/hooks';

export function RegisterPage() {
  const { t } = useTranslation();
  usePageTitle(t('nav.register'));
  return (
    <AuthTemplate>
      <RegisterForm />
    </AuthTemplate>
  );
}
