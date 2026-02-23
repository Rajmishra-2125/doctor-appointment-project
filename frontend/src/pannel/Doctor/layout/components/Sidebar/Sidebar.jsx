import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Calendar,
  Clock,
  Users,
  UserCircle,
  Settings,
} from "lucide-react";

const Sidebar = () => {
  const navItems = [
    { name: "Dashboard", path: "/doctor/dashboard", icon: LayoutDashboard },
    { name: "My Schedule", path: "/doctor/schedule", icon: Calendar },
    { name: "Manage Slots", path: "/doctor/slots", icon: Clock },
    { name: "My Patients", path: "/doctor/patients", icon: Users },
    { name: "Profile", path: "/doctor/profile", icon: UserCircle },
    { name: "Settings", path: "/doctor/settings", icon: Settings },
  ];

  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen flex flex-col pt-6">
      <nav className="flex-1 px-4 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? "bg-emerald-600 text-white"
                  : "text-gray-400 hover:bg-gray-800 hover:text-white"
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.name}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
