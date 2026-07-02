"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Wallet,
  BarChart3,
  Target,
  FileText,
  Settings,
  User,
  LogOut,
} from "lucide-react";

const menu = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
  },
  {
    title: "Expenses",
    icon: Wallet,
    href: "/expenses",
  },
  {
    title: "Analytics",
    icon: BarChart3,
    href: "/analytics",
  },
  {
    title: "Goals",
    icon: Target,
    href: "/goals",
  },
  {
    title: "Reports",
    icon: FileText,
    href: "/reports",
  },
  {
    title: "Settings",
    icon: Settings,
    href: "/settings",
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-64 flex-col justify-between border-r border-slate-800 bg-slate-950">
      <div>
        <div className="border-b border-slate-800 p-8">
          <h1 className="text-3xl font-bold text-white">
            ExpenseAI
          </h1>

          <p className="mt-2 text-sm text-slate-400">
            Personal Finance
          </p>
        </div>

        <nav className="mt-8 px-4">
          {menu.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.title}
                href={item.href}
                className={`mb-2 flex items-center gap-4 rounded-xl px-4 py-3 transition-all duration-200 ${
                  isActive
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                    : "text-slate-400 hover:bg-slate-900 hover:text-white"
                }`}
              >
                <item.icon size={20} />
                <span>{item.title}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="border-t border-slate-800 p-4">
        <button className="mb-2 flex w-full items-center gap-4 rounded-xl px-4 py-3 text-slate-400 transition hover:bg-slate-900 hover:text-white">
          <User size={20} />
          Profile
        </button>

        <button className="flex w-full items-center gap-4 rounded-xl px-4 py-3 text-red-400 transition hover:bg-red-500/10">
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </aside>
  );
}