// routes/AdminRoutes.tsx
import { Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Admin/Dashboard";
import ManageLessons from "../pages/Admin/ManageLessons";
import ManageUsers from "../pages/Admin/ManageUsers";
import ManageStories from "../pages/Admin/ManageStories";
import Stats from "../pages/Admin/Stats";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="admin/dashboard" element={<Dashboard />} />
      <Route path="admin/manage-lessons" element={<ManageLessons />} />
      <Route path="admin/manage-users" element={<ManageUsers />} />
      <Route path="admin/manage-stories" element={<ManageStories />} />
      <Route path="admin/stats" element={<Stats />} />
    </Routes>
  );
};

export default AdminRoutes;
