// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Layout from "./layout/Layout";
import Home from "./Pages/Home";
import AboutSection from "./Pages/AboutSection";
import BlogSection from "./Pages/BlogSection";
import ContactUs from "./Pages/ContactUs";
import ServicesSection from "./Pages/ServicesSection";
import FAQSection from "./Pages/FAQSection";
import TeamSection from "./Pages/TeamSection";
import AllProjects from "./Pages/Projects";
import AllTeam from "./Pages/AllTeam";
import AllServices from "./Pages/AllServices";
import UploadTest from "./Pages/UploadTest";
import ReviewForm from "./Pages/ReviewForm";
import TestimonialsSection from "./Pages/TestimonialsSection";
import { FeaturesSectionDemo } from "./Pages/FeaturesSectionDemo";

// Admin Pages
import AdminLogin from "./Pages/Admin/AdminLogin";
import ForgotPassword from "./Pages/Admin/ForgotPassword";
import ResetPassword from "./Pages/Admin/ResetPassword";
import DashboardHome from "./Pages/Admin/DashboardHome";
import ContactSubmissions from "./Pages/Admin/ContactSubmissions";
import ManageProjects from "./Pages/Admin/ManageProjects";
import ManageTeam from "./Pages/Admin/ManageTeam";
import ManageServices from "./Pages/Admin/ManageServices";
import AdminTestimonials from "./Pages/Admin/AdminTestimonials";
import SidebarDemo from "./Pages/Admin/Sidebar.jsx";

// Auth
import ProtectedRoute from "./Component/auth/ProtectedRoute";

function App() {
  return (
    <Router>
      {/* Toast Notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#f97316",
            color: "#fff",
            borderRadius: "8px",
            fontSize: "0.9rem",
            boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
          },
          success: { iconTheme: { primary: "#fff", secondary: "#f97316" } },
          error: { style: { background: "#dc2626" }, iconTheme: { primary: "#fff", secondary: "#dc2626" } },
        }}
      />

      <Routes>
        {/* 🏠 Public Site Layout */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<AboutSection />} />
          <Route path="services" element={<ServicesSection />} />
          <Route path="blog" element={<BlogSection />} />
          <Route path="contact" element={<ContactUs />} />
          <Route path="team" element={<TeamSection />} />
          <Route path="faq" element={<FAQSection />} />
          <Route path="allteam" element={<AllTeam />} />
          <Route path="allservices" element={<AllServices />} />
          <Route path="feature" element={<FeaturesSectionDemo />} />
          <Route path="projects" element={<AllProjects />} />
          <Route path="/upload-test" element={<UploadTest />} />
          <Route path="/review" element={<ReviewForm />} />
          <Route path="/testimonials" element={<TestimonialsSection />} />
        </Route>

        {/* Public Admin Auth Pages */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/forgot-password" element={<ForgotPassword />} />
        <Route path="/admin/reset-password" element={<ResetPassword />} />

        {/* Protected Admin Dashboard */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <SidebarDemo />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardHome />} />
          <Route path="contacts" element={<ContactSubmissions />} />
          <Route path="projects" element={<ManageProjects />} />
          <Route path="team" element={<ManageTeam />} />
          <Route path="services" element={<ManageServices />} />
          <Route path="review" element={<AdminTestimonials />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
