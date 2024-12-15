// routes/PublicRoutes.tsx
import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import ForgotPassword from "../pages/Auth/ForgotPassword";
import StoryList from "../pages/Stories/StoryList";
import StoryDetail from "../pages/Stories/StoryDetail";
import Vocabulary from "../pages/Vocabulary/Topics";

const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="forgot-password" element={<ForgotPassword />} />
      <Route path="stories" element={<StoryList />} />
      <Route path="story/:storyId" element={<StoryDetail />} />
      <Route path="vocabulary" element={<Vocabulary />} />
    </Routes>
  );
};

export default PublicRoutes;
