import React, { Children, useState } from 'react'
import { Outlet } from 'react-router-dom';
import Header from "./components/Header/Header";
import Footer from './components/Footer/Footer';
import Sidebar from './components/Sidebar/Sidebar';


function AdminLayout() {

    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(() => {
      try {
        const saved = localStorage.getItem("adminSidebarCollapsed");
        return saved ? JSON.parse(saved) : false;
      } catch (error) {
        return false;
      }
    });

        const toggleSidebar = () => setIsSidebarCollapsed(prev => {
            const newState =!prev;
            localStorage.setItem("adminSidebarCollapsed", JSON.stringify(newState));
            return newState;
        });
    
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Header */}
      <Header toggleSidebar={toggleSidebar} />
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar stays fixed on the left */}
        <Sidebar isCollapsed={isSidebarCollapsed} />

        {/* Main content area scrolls independently */}
        <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-slate-900 flex flex-col">
          <div className="flex-1 p-6">{Children || <Outlet />}</div>
          <Footer />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
