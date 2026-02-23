import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Sidebar from "./components/Sidebar/Sidebar.jsx";

function DoctorLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 bg-gray-50 flex flex-col">
          <div className="flex-1 p-6">{children || <Outlet />}</div>
          <Footer />
        </main>
      </div>
    </div>
  );
}

export default DoctorLayout;
