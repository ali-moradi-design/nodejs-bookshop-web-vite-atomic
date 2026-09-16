import { lazy, Suspense } from 'react';
import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { AppProviders } from '@/app/providers';
import { StorefrontTemplate, PanelTemplate, AdminTemplate } from '@/components/templates';
import { Header, Footer, RequireAuth } from '@/components/organisms';
import { PageLoader } from '@/components/atoms';

const HomePage = lazy(() =>
  import('@/components/pages/home').then((m) => ({ default: m.HomePage })),
);
const CatalogPage = lazy(() =>
  import('@/components/pages/catalog').then((m) => ({ default: m.CatalogPage })),
);
const BookDetailPage = lazy(() =>
  import('@/components/pages/book-detail').then((m) => ({ default: m.BookDetailPage })),
);
const CartPage = lazy(() =>
  import('@/components/pages/cart').then((m) => ({ default: m.CartPage })),
);
const CheckoutPage = lazy(() =>
  import('@/components/pages/checkout').then((m) => ({ default: m.CheckoutPage })),
);
const LoginPage = lazy(() =>
  import('@/components/pages/login').then((m) => ({ default: m.LoginPage })),
);
const RegisterPage = lazy(() =>
  import('@/components/pages/register').then((m) => ({ default: m.RegisterPage })),
);
const PanelDashboardPage = lazy(() =>
  import('@/components/pages/panel/dashboard').then((m) => ({ default: m.PanelDashboardPage })),
);
const ProfilePage = lazy(() =>
  import('@/components/pages/panel/profile').then((m) => ({ default: m.ProfilePage })),
);
const PanelOrdersPage = lazy(() =>
  import('@/components/pages/panel/orders').then((m) => ({ default: m.PanelOrdersPage })),
);
const PanelOrderDetailPage = lazy(() =>
  import('@/components/pages/panel/order-detail').then((m) => ({
    default: m.PanelOrderDetailPage,
  })),
);
const FavoritesPage = lazy(() =>
  import('@/components/pages/panel/favorites').then((m) => ({ default: m.FavoritesPage })),
);
const MyReviewsPage = lazy(() =>
  import('@/components/pages/panel/reviews').then((m) => ({ default: m.MyReviewsPage })),
);
const ReportIssuePage = lazy(() =>
  import('@/components/pages/panel/report').then((m) => ({ default: m.ReportIssuePage })),
);
const AdminDashboardPage = lazy(() =>
  import('@/components/pages/admin/dashboard').then((m) => ({ default: m.AdminDashboardPage })),
);
const AdminBooksPage = lazy(() =>
  import('@/components/pages/admin/books').then((m) => ({ default: m.AdminBooksPage })),
);
const AdminOrdersPage = lazy(() =>
  import('@/components/pages/admin/orders').then((m) => ({ default: m.AdminOrdersPage })),
);
const AdminUsersPage = lazy(() =>
  import('@/components/pages/admin/users').then((m) => ({ default: m.AdminUsersPage })),
);
const AdminRolesPage = lazy(() =>
  import('@/components/pages/admin/roles').then((m) => ({ default: m.AdminRolesPage })),
);
const AdminPermissionsPage = lazy(() =>
  import('@/components/pages/admin/permissions').then((m) => ({ default: m.AdminPermissionsPage })),
);
const AdminDiscountsPage = lazy(() =>
  import('@/components/pages/admin/discounts').then((m) => ({ default: m.AdminDiscountsPage })),
);
const AdminReportsPage = lazy(() =>
  import('@/components/pages/admin/reports').then((m) => ({ default: m.AdminReportsPage })),
);
const AdminAnalyticsPage = lazy(() =>
  import('@/components/pages/admin/analytics').then((m) => ({ default: m.AdminAnalyticsPage })),
);

const RouteFallback = () => <PageLoader />;

const StorefrontLayout = () => (
  <div className="flex min-h-screen flex-col">
    <Header />
    <StorefrontTemplate>
      <Suspense fallback={<RouteFallback />}>
        <Outlet />
      </Suspense>
    </StorefrontTemplate>
    <Footer />
  </div>
);

const PanelLayout = () => (
  <div className="flex min-h-screen flex-col">
    <Header />
    <RequireAuth>
      <PanelTemplate>
        <Suspense fallback={<RouteFallback />}>
          <Outlet />
        </Suspense>
      </PanelTemplate>
    </RequireAuth>
  </div>
);

const AdminLayout = () => (
  <div className="flex min-h-screen flex-col">
    <Header />
    <RequireAuth requireAdmin>
      <AdminTemplate>
        <Suspense fallback={<RouteFallback />}>
          <Outlet />
        </Suspense>
      </AdminTemplate>
    </RequireAuth>
  </div>
);

export function AppRouter() {
  return (
    <BrowserRouter>
      <AppProviders>
        <Routes>
          <Route element={<StorefrontLayout />}>
            <Route index element={<HomePage />} />
            <Route path="catalog" element={<CatalogPage />} />
            <Route path="books/:id" element={<BookDetailPage />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="checkout" element={<CheckoutPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
          </Route>

          <Route path="panel" element={<PanelLayout />}>
            <Route index element={<PanelDashboardPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="orders" element={<PanelOrdersPage />} />
            <Route path="orders/:id" element={<PanelOrderDetailPage />} />
            <Route path="favorites" element={<FavoritesPage />} />
            <Route path="reviews" element={<MyReviewsPage />} />
            <Route path="report" element={<ReportIssuePage />} />
          </Route>

          <Route path="admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboardPage />} />
            <Route path="books" element={<AdminBooksPage />} />
            <Route path="orders" element={<AdminOrdersPage />} />
            <Route path="users" element={<AdminUsersPage />} />
            <Route path="roles" element={<AdminRolesPage />} />
            <Route path="permissions" element={<AdminPermissionsPage />} />
            <Route path="discounts" element={<AdminDiscountsPage />} />
            <Route path="reports" element={<AdminReportsPage />} />
            <Route path="analytics" element={<AdminAnalyticsPage />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AppProviders>
    </BrowserRouter>
  );
}
