import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import RemoteErrorBoundary from "../components/RemoteErrorBoundary";
import NotFound from "../pages/NotFound";

// Lazy imports dos componentes federados (remotes)
const FeedPage = lazy(() => import("feedMf/FeedPage"));
const ArtistPage = lazy(() => import("feedMf/ArtistPage"));
const LoginPage = lazy(() => import("dashboardMf/LoginPage"));
const RegisterPage = lazy(() => import("dashboardMf/RegisterPage"));
const DashboardLayout = lazy(() => import("dashboardMf/DashboardLayout"));

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="flex flex-col items-center gap-3">
        <div className="animate-spin h-10 w-10 border-4 border-brand-500 border-t-transparent rounded-full" />
        <p className="text-sm text-gray-400">Carregando...</p>
      </div>
    </div>
  );
}

export default function AppRoutes() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        {/* Rotas públicas — feed-mf */}
        <Route
          path="/"
          element={
            <RemoteErrorBoundary name="feed-mf">
              <FeedPage />
            </RemoteErrorBoundary>
          }
        />
        <Route
          path="/artist/:slug"
          element={
            <RemoteErrorBoundary name="feed-mf">
              <ArtistPage />
            </RemoteErrorBoundary>
          }
        />

        {/* Rotas de auth — dashboard-mf */}
        <Route
          path="/login"
          element={
            <RemoteErrorBoundary name="dashboard-mf">
              <LoginPage />
            </RemoteErrorBoundary>
          }
        />
        <Route
          path="/register"
          element={
            <RemoteErrorBoundary name="dashboard-mf">
              <RegisterPage />
            </RemoteErrorBoundary>
          }
        />

        {/* Rotas protegidas — dashboard-mf */}
        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute>
              <RemoteErrorBoundary name="dashboard-mf">
                <DashboardLayout />
              </RemoteErrorBoundary>
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}
