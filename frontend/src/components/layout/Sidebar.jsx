import { NavLink } from "react-router-dom";

import {
  LayoutDashboard,
  Car,
  History,
  User,
  Settings,
  LogOut,
} from "lucide-react";

const menuItems = [
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    path: "/",
  },
  {
    icon: Car,
    label: "Request Ride",
    path: "/request-ride",
  },
  {
    icon: History,
    label: "History",
    path: "/history",
  },
  {
    icon: User,
    label: "Profile",
    path: "/profile",
  },
];

function Sidebar() {
  return (
    <aside className="flex w-72 flex-col border-r border-zinc-800 bg-zinc-900">
      <div className="border-b border-zinc-800 p-8">
        <h1 className="text-3xl font-extrabold text-purple-500">
          RideFlow
        </h1>

        <p className="mt-1 text-sm text-zinc-500">
          Smart rides. Real-time intelligence.
        </p>
      </div>

      <nav className="flex-1 space-y-2 p-5">
        {menuItems.map(({ icon: Icon, label, path }) => (
          <NavLink
            key={label}
            to={path}
            className={({ isActive }) =>
              `flex w-full items-center gap-4 rounded-xl px-4 py-3 transition-all duration-300 ${
                isActive
                  ? "bg-purple-600 text-white"
                  : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
              }`
            }
          >
            <Icon size={20} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="space-y-2 border-t border-zinc-800 p-5">
        <button className="flex w-full items-center gap-4 rounded-xl px-4 py-3 text-zinc-400 transition hover:bg-zinc-800 hover:text-white">
          <Settings size={20} />
          Settings
        </button>

        <button className="flex w-full items-center gap-4 rounded-xl px-4 py-3 text-red-400 transition hover:bg-red-500/10">
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;