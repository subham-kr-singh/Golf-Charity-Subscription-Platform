import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import { Spinner } from './components/ui/Spinner';

// Layouts
import { PublicLayout } from './components/layout/PublicLayout';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { AdminLayout } from './components/layout/AdminLayout';

// Public Pages
import { HomePage } from './pages/public/HomePage';
import { CharitiesPage } from './pages/public/CharitiesPage';
import { CharityDetailPage } from './pages/public/CharityDetailPage';
import { HowItWorksPage } from './pages/public/HowItWorksPage';
import { LoginPage } from './pages/public/LoginPage';
import { RegisterPage } from './pages/public/RegisterPage';
import { NotFoundPage } from './pages/public/NotFoundPage';

// Dashboard Pages
import { DashboardHome } from './pages/dashboard/DashboardHome';
import { ScoresPage } from './pages/dashboard/ScoresPage';
import { DrawPage } from './pages/dashboard/DrawPage';
import { CharityPage as DashboardCharityPage } from './pages/dashboard/CharityPage';
import { SubscriptionPage } from './pages/dashboard/SubscriptionPage';
import { WinningsPage } from './pages/dashboard/WinningsPage';
import { ProfilePage } from './pages/dashboard/ProfilePage';

// Admin Pages
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminUsersPage } from './pages/admin/AdminUsersPage';
import { AdminDrawPage } from './pages/admin/AdminDrawPage';
import { AdminCharitiesPage } from './pages/admin/AdminCharitiesPage';
import { AdminWinnersPage } from './pages/admin/AdminWinnersPage';
import { AdminReportsPage } from './pages/admin/AdminReportsPage';

// Protected Route Wrapper
const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requireAdmin && user?.role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

// Auth Route Wrapper
const AuthRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/charities" element={<CharitiesPage />} />
          <Route path="/charities/:id" element={<CharityDetailPage />} />
          <Route path="/how-it-works" element={<HowItWorksPage />} />
          
          <Route path="/login" element={
            <AuthRoute>
              <LoginPage />
            </AuthRoute>
          } />
          <Route path="/register" element={
            <AuthRoute>
              <RegisterPage />
            </AuthRoute>
          } />
          
          <Route path="*" element={<NotFoundPage />} />
        </Route>

        {/* Dashboard Routes (Protected) */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }>
          <Route index element={<DashboardHome />} />
          <Route path="scores" element={<ScoresPage />} />
          <Route path="draw" element={<DrawPage />} />
          <Route path="charity" element={<DashboardCharityPage />} />
          <Route path="subscription" element={<SubscriptionPage />} />
          <Route path="winnings" element={<WinningsPage />} />
          <Route path="winnings/claim/:claimId" element={<WinningsPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>

        {/* Admin Routes (Protected + Admin Only) */}
        <Route path="/admin" element={
          <ProtectedRoute requireAdmin={true}>
            <AdminLayout />
          </ProtectedRoute>
        }>
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<AdminUsersPage />} />
          <Route path="draw" element={<AdminDrawPage />} />
          <Route path="charities" element={<AdminCharitiesPage />} />
          <Route path="winners" element={<AdminWinnersPage />} />
          <Route path="reports" element={<AdminReportsPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
