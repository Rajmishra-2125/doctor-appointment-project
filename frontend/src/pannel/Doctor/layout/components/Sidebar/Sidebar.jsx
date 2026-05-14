import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  CalendarCheck,
  Users,
  FileText,
  UserCircle,
  Settings,
} from "lucide-react";

const Sidebar = ({ isCollapsed }) => {
  const navItems = [
    { name: "Dashboard", path: "/doctor/dashboard", icon: LayoutDashboard },
    { name: "Appointments", path: "/doctor/appointments", icon: CalendarCheck },
    { name: "My Patients", path: "/doctor/patients", icon: Users },
    { name: "Prescriptions", path: "/doctor/prescriptions", icon: FileText },
    { name: "Profile", path: "/doctor/profile", icon: UserCircle },
    { name: "Settings", path: "/doctor/settings", icon: Settings },
  ];

  return (
    <aside
      className={`${
        isCollapsed ? "w-20" : "w-72"
      } bg-white dark:bg-[#0f172a] text-gray-500 dark:text-slate-300 flex flex-col pt-6 border-r border-gray-200 dark:border-slate-800 transition-all duration-300 ease-in-out overflow-hidden`}
    >
      <nav className="flex-1 px-4 space-y-4">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            title={isCollapsed ? item.name : ""}
            className={({ isActive }) =>
              `flex items-center ${
                isCollapsed ? "justify-center" : "gap-4"
              } px-4 py-3.5 rounded-xl transition-all duration-200 ${
                isActive
                  ? "bg-[#4f46e5] text-white shadow-lg shadow-indigo-500/20"
                  : "hover:bg-gray-100 dark:hover:bg-slate-800/50 hover:text-gray-900 dark:hover:text-white"
              }`
            }
          >
            <item.icon className={`w-5 h-5 shrink-0 ${item.name === "Dashboard" && "animate-pulse"}`} />
            {!isCollapsed && (
              <span className="font-medium text-[15px] whitespace-nowrap overflow-hidden transition-all duration-300">
                {item.name}
              </span>
            )}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
