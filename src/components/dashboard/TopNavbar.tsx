"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Bell,
  CheckCheck,
  Trash2,
} from "lucide-react";
import { useNotification } from "@/hooks/useNotification";
import { usePathname } from "next/navigation";
import {
  UserButton,
  useUser,
} from "@clerk/nextjs";

export default function TopNavbar() {
  const pathname = usePathname();
  const { user } = useUser();

  const {
    notifications,
    markAsRead,
    clearNotifications,
  } = useNotification();

  const [open, setOpen] = useState(false);

  const unreadCount = notifications.filter(
    (n) => !n.read
  ).length;

  const pageTitles: Record<string, string> = {
    "/dashboard": "Dashboard",
    "/expenses": "Expenses",
    "/income": "Income",
   "/goals": "Goals",
    "/analytics": "Analytics",
    "/reports": "Reports",
    "/settings": "Settings",
  };

  const title = pageTitles[pathname] ?? "ExpenseAI";

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="sticky top-0 z-50 flex h-20 items-center justify-between border-b border-white/10 bg-slate-950/70 px-8 backdrop-blur-xl"
    >
      <div>
        <h1 className="bg-gradient-to-r from-white via-blue-200 to-cyan-400 bg-clip-text text-3xl font-bold text-transparent">
          {title}
        </h1>

        <p className="text-sm text-slate-400">
          Welcome back,{" "}
          {user?.firstName ||
            user?.username ||
            "User"}{" "}
          👋
        </p>
      </div>

      <div className="flex items-center gap-4">

        {/* Notifications */}

        <div className="relative">
          <motion.button
            whileHover={{
              scale: 1.1,
              rotate: 10,
            }}
            whileTap={{
              scale: 0.9,
            }}
            onClick={() => setOpen(!open)}
            className="relative rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur-xl"
          >
            <Bell
              size={20}
              className="text-white"
            />

            {unreadCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                {unreadCount}
              </span>
            )}
          </motion.button>

          {open && (
            <div className="absolute right-0 mt-4 w-96 rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl">

              <div className="flex items-center justify-between border-b border-slate-700 p-4">

                <h3 className="font-semibold text-white">
                  Notifications
                </h3>

                <div className="flex gap-2">

                  <button
                    onClick={() =>
                      notifications.forEach((n) =>
                        markAsRead(n.id)
                      )
                    }
                    className="rounded-lg p-2 hover:bg-slate-800"
                  >
                    <CheckCheck
                      size={18}
                      className="text-green-400"
                    />
                  </button>

                  <button
                    onClick={clearNotifications}
                    className="rounded-lg p-2 hover:bg-slate-800"
                  >
                    <Trash2
                      size={18}
                      className="text-red-400"
                    />
                  </button>

                </div>

              </div>

              {notifications.length === 0 ? (
                <p className="p-6 text-center text-slate-400">
                  No notifications
                </p>
              ) : (
                <div className="max-h-96 overflow-y-auto">

                  {notifications.map((item) => (
                    <button
                      key={item.id}
                      onClick={() =>
                        markAsRead(item.id)
                      }
                      className={`w-full border-b border-slate-800 p-4 text-left transition hover:bg-slate-800 ${
                        item.read
                          ? "opacity-60"
                          : ""
                      }`}
                    >
                      <h4 className="font-semibold text-white">
                        {item.title}
                      </h4>

                      <p className="mt-1 text-sm text-slate-400">
                        {item.message}
                      </p>
                    </button>
                  ))}

                </div>
              )}
            </div>
          )}
        </div>

        {/* User Profile */}

        <motion.div
          whileHover={{
            scale: 1.03,
          }}
          className="flex items-center gap-3 rounded-2xl border border-blue-500/20 bg-gradient-to-r from-slate-900 to-slate-800 px-4 py-2 shadow-lg shadow-blue-500/10"
        >
          <UserButton
            appearance={{
              elements: {
                avatarBox: "h-10 w-10",
              },
            }}
          />

          <div className="text-left">
            <p className="font-semibold text-white">
              {user?.fullName ||
                user?.firstName ||
                user?.username ||
                "User"}
            </p>

            <p className="max-w-[180px] truncate text-xs text-blue-400">
              {user?.primaryEmailAddress?.emailAddress}
            </p>
          </div>
        </motion.div>

      </div>
    </motion.header>
  );
}