"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Wallet,
  BarChart3,
  Target,
  FileText,
  Settings,
  User,
  LogOut,
  Sparkles,
  TrendingUp
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
  title: "Income",
  icon: TrendingUp,
  href: "/income",
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
    <aside className="sticky top-0 flex h-screen w-72 flex-col justify-between border-r border-white/10 bg-slate-950/70 backdrop-blur-xl">

      <div>

        <div className="border-b border-white/10 p-8">

          <div className="flex items-center gap-3">

            <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 p-3">
              <Sparkles className="text-white" />
            </div>

            <div>

              <h1 className="bg-gradient-to-r from-white via-blue-300 to-cyan-400 bg-clip-text text-3xl font-bold text-transparent">
                ExpenseAI
              </h1>

              <p className="text-sm text-slate-400">
                AI Powered Finance
              </p>

            </div>

          </div>

        </div>

        <nav className="mt-8 space-y-2 px-4">

          {menu.map((item) => {

            const active = pathname === item.href;

            return (

              <motion.div
                key={item.title}
                whileHover={{
                  x: 8,
                }}
              >

                <Link
                  href={item.href}
                  className={`flex items-center gap-4 rounded-2xl px-5 py-4 transition-all duration-300 ${
                    active
                      ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-xl shadow-blue-500/30"
                      : "text-slate-400 hover:bg-white/5 hover:text-white"
                  }`}
                >

                  <item.icon size={22} />

                  <span className="font-medium">
                    {item.title}
                  </span>

                </Link>

              </motion.div>

            );
          })}

        </nav>

      </div>

      <div className="border-t border-white/10 p-5">

        <motion.button
          whileHover={{ scale: 1.03 }}
          className="mb-3 flex w-full items-center gap-4 rounded-2xl bg-white/5 px-5 py-4 text-slate-300 transition"
        >

          <User className="text-blue-400" />

          <div className="text-left">

            <p className="font-semibold">
              Abhay Singh
            </p>

            <p className="text-xs text-slate-500">
              Premium Member
            </p>

          </div>

        </motion.button>

        <motion.button
          whileHover={{
            scale: 1.03,
          }}
          className="flex w-full items-center gap-4 rounded-2xl bg-red-500/10 px-5 py-4 text-red-400"
        >
          <LogOut />

          Logout

        </motion.button>

      </div>

    </aside>
  );
}