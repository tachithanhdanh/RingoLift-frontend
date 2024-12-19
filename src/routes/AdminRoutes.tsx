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
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="manage-lessons" element={<ManageLessons />} />
      <Route path="manage-users" element={<ManageUsers />} />
      <Route path="manage-stories" element={<ManageStories />} />
      <Route path="stats" element={<Stats />} />
    </Routes>
  );
};

export default AdminRoutes;
