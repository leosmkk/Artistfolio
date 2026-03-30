import { Routes, Route } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import DashboardHome from "../pages/DashboardHome";
import WorksListPage from "../pages/WorksListPage";
import WorkFormPage from "../pages/WorkFormPage";
import ProfilePage from "../pages/ProfilePage";

export default function DashboardLayout() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      <Sidebar />

      {/* Main content */}
      <main className="flex-1 bg-gray-50/50 p-6 sm:p-8 lg:p-10 overflow-y-auto">
        <Routes>
          <Route index element={<DashboardHome />} />
          <Route path="works" element={<WorksListPage />} />
          <Route path="works/new" element={<WorkFormPage />} />
          <Route path="works/:id/edit" element={<WorkFormPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Routes>
      </main>
    </div>
  );
}
