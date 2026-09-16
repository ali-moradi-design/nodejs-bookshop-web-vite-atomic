import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '@/lib/auth';
import { isAdminUser } from '@/lib/user';

/** Molecule: primary storefront nav links (catalog / account / admin). */
export function StorefrontNav() {
  const { t } = useTranslation();
  const user = useAuthStore((s) => s.user);

  return (
    <nav className="hidden items-center gap-4 text-sm md:flex">
      <Link to="/catalog" className="text-muted-foreground hover:text-foreground">
        {t('nav.catalog')}
      </Link>
      {user ? (
        <Link to="/panel" className="text-muted-foreground hover:text-foreground">
          {t('nav.account')}
        </Link>
      ) : null}
      {isAdminUser(user) ? (
        <Link to="/admin" className="text-muted-foreground hover:text-foreground">
          {t('nav.admin')}
        </Link>
      ) : null}
    </nav>
  );
}
