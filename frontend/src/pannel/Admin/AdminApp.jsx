import React, { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Lazy Loaded Admin Panel Pages
const AdminDashboard = lazy(() => import("./pages/AdminDashboard.jsx"));
const ManageAppointment = lazy(() => import("./pages/ManageAppointment.jsx"));
const ManageDoctor = lazy(() => import("./pages/ManageDoctor.jsx"));
const ManagePatient = lazy(() => import("./pages/ManagePatient.jsx"));
const ManagePayment = lazy(() => import("./pages/ManagePayment.jsx"));
const ManageSettings = lazy(() => import("./pages/ManageSettings.jsx"));
const MedicalRecords = lazy(() => import("./pages/MedicalRecords.jsx"));
const ManageAnalytics = lazy(() => import("./pages/ManageAnalytics.jsx"));
const PatientProfile = lazy(() => import("./pages/PatientProfile.jsx"));

const AdminApp = () => {
  return (
    <Suspense fallback={
      <div className="flex h-screen w-full items-center justify-center bg-transparent">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    }>
      <Routes>
        <Route path="dashboard" element={<AdminDashboard />} />
      <Route path="appointments" element={<ManageAppointment />} />
      <Route path="doctors" element={<ManageDoctor />} />
      <Route path="patients" element={<ManagePatient />} />
      <Route path="patients/:id" element={<PatientProfile />} />
      <Route path="payments" element={<ManagePayment />} />
      <Route path="settings" element={<ManageSettings />} />
      <Route path="medical-records" element={<MedicalRecords />} />
      <Route path="analytics" element={<ManageAnalytics />} />
      {/* Catch-all for unknown admin routes */}
      <Route path="" element={<Navigate to="/admin/dashboard" replace />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </Suspense>
  );
};

export default AdminApp;
