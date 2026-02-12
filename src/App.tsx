import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { AppLayout } from "@/components/layout/AppLayout";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import CompanyProfilePage from "./pages/CompanyProfilePage";
import EventSubmissionPage from "./pages/EventSubmissionPage";
import ApplicationsListPage from "./pages/ApplicationsListPage";
import ApplicationDetailPage from "./pages/ApplicationDetailPage";
import ReviewsPage from "./pages/ReviewsPage";
import AdminEventTypesPage from "./pages/admin/AdminEventTypesPage";
import AdminTemplatesPage from "./pages/admin/AdminTemplatesPage";
import AdminUsersPage from "./pages/admin/AdminUsersPage";
import AdminAuditPage from "./pages/admin/AdminAuditPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const ProtectedRoute: React.FC<{ children: React.ReactNode; roles?: string[] }> = ({ children, roles }) => {
  const { isAuthenticated, user } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (roles && user && !roles.includes(user.role)) return <Navigate to="/dashboard" replace />;
  return <AppLayout>{children}</AppLayout>;
};

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" /> : <LoginPage />} />
      <Route path="/" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />

      <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
      <Route path="/company" element={<ProtectedRoute roles={["user"]}><CompanyProfilePage /></ProtectedRoute>} />
      <Route path="/events/new" element={<ProtectedRoute roles={["user"]}><EventSubmissionPage /></ProtectedRoute>} />
      <Route path="/applications" element={<ProtectedRoute><ApplicationsListPage /></ProtectedRoute>} />
      <Route path="/applications/:id" element={<ProtectedRoute><ApplicationDetailPage /></ProtectedRoute>} />
      <Route path="/reviews" element={<ProtectedRoute roles={["staff"]}><ReviewsPage /></ProtectedRoute>} />

      <Route path="/admin/events" element={<ProtectedRoute roles={["admin"]}><AdminEventTypesPage /></ProtectedRoute>} />
      <Route path="/admin/templates" element={<ProtectedRoute roles={["admin"]}><AdminTemplatesPage /></ProtectedRoute>} />
      <Route path="/admin/users" element={<ProtectedRoute roles={["admin"]}><AdminUsersPage /></ProtectedRoute>} />
      <Route path="/admin/audit" element={<ProtectedRoute roles={["admin"]}><AdminAuditPage /></ProtectedRoute>} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
