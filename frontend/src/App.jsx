import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import Layout from "./Layout";

// Panel Layouts
import AdminLayout from './pannel/Admin/layout/AdminLayout'
import DoctorLayout from './pannel/Doctor/layout/DoctorLayout'
import PatientLayout from './pannel/Patient/layout/PatientLayout'

/**
 * App component acting as a dynamic layout switcher.
 * It selects the appropriate layout based on the user's role
 * and renders the matched child route via <Outlet />.
 */
function App() {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();

  // Root path redirection logic
  if (location.pathname === "/") {
    if (user) {
      if (user.role === "ADMIN")
        return <Navigate to="/admin/dashboard" replace />;
      if (user.role === "DOCTOR")
        return <Navigate to="/doctor/dashboard" replace />;
      // Patients stay at "/" or redirect to dashboard/home?
      // User's main.jsx has <Route path="" element={<PatientDashboard />} /> under protected patient route.
      // So "/" for patients renders PatientDashboard.
    } else {
      return <Navigate to="/home" replace />;
    }
  }

  // Default to public layout if not logged in
  if (!user) {
    return (
      <Layout>
        <Outlet />
      </Layout>
    );
  }

  // Select Layout based on role
  let LayoutComponent;
  switch (user.role) {
    case "ADMIN":
      LayoutComponent = AdminLayout;
      break;
    case "DOCTOR":
      LayoutComponent = DoctorLayout;
      break;
    case "PATIENT":
      LayoutComponent = PatientLayout;
      break;
    default:
      LayoutComponent = Layout;
  }

  return (
    <LayoutComponent>
      <Outlet />
    </LayoutComponent>
  );
}

export default App;
