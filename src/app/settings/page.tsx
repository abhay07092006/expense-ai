"use client";

import { useEffect, useState } from "react";
import {
  Moon,
  Bell,
  Shield,
  User,
} from "lucide-react";
import { UserButton } from "@clerk/nextjs";

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] =
    useState(true);

  const [currency, setCurrency] =
    useState("₹ INR");

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    const notify =
      localStorage.getItem("notifications");
    const savedCurrency =
      localStorage.getItem("currency");

    if (theme)
      setDarkMode(theme === "dark");

    if (notify)
      setNotifications(notify === "true");

    if (savedCurrency)
      setCurrency(savedCurrency);
  }, []);

  function toggleTheme() {
    const next = !darkMode;

    setDarkMode(next);

    localStorage.setItem(
      "theme",
      next ? "dark" : "light"
    );

    document.documentElement.classList.toggle(
      "dark",
      next
    );
  }

  function toggleNotifications() {
    const next = !notifications;

    setNotifications(next);

    localStorage.setItem(
      "notifications",
      String(next)
    );
  }

  function changeCurrency(
    value: string
  ) {
    setCurrency(value);

    localStorage.setItem(
      "currency",
      value
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 p-8">
      <h1 className="mb-8 text-3xl font-bold text-white">
        Settings
      </h1>

      <div className="space-y-6">

        {/* Theme */}

        <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900 p-6">
          <div className="flex items-center gap-4">
            <Moon className="text-blue-500" />

            <div>
              <h2 className="font-semibold text-white">
                Dark Mode
              </h2>

              <p className="text-sm text-slate-400">
                Toggle application theme
              </p>
            </div>
          </div>

          <button
            onClick={toggleTheme}
            className={`rounded-full px-4 py-2 font-semibold transition ${
              darkMode
                ? "bg-green-600 text-white"
                : "bg-slate-700 text-white"
            }`}
          >
            {darkMode ? "ON" : "OFF"}
          </button>
        </div>

        {/* Notifications */}

        <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900 p-6">
          <div className="flex items-center gap-4">
            <Bell className="text-yellow-500" />

            <div>
              <h2 className="font-semibold text-white">
                Notifications
              </h2>

              <p className="text-sm text-slate-400">
                Enable expense alerts
              </p>
            </div>
          </div>

          <button
            onClick={toggleNotifications}
            className={`rounded-full px-4 py-2 font-semibold transition ${
              notifications
                ? "bg-green-600 text-white"
                : "bg-slate-700 text-white"
            }`}
          >
            {notifications
              ? "ON"
              : "OFF"}
          </button>
        </div>

        {/* Currency */}

        <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900 p-6">
          <div>
            <h2 className="font-semibold text-white">
              Currency
            </h2>

            <p className="text-sm text-slate-400">
              Default currency
            </p>
          </div>

          <select
            value={currency}
            onChange={(e) =>
              changeCurrency(
                e.target.value
              )
            }
            className="rounded-lg bg-slate-800 p-2 text-white"
          >
            <option>₹ INR</option>
            <option>$ USD</option>
            <option>€ EUR</option>
            <option>£ GBP</option>
          </select>
        </div>

        {/* Security */}

        <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900 p-6">
          <div className="flex items-center gap-4">
            <Shield className="text-red-500" />

            <div>
              <h2 className="font-semibold text-white">
                Security
              </h2>

              <p className="text-sm text-slate-400">
                Protected by Clerk
              </p>
            </div>
          </div>

          <span className="rounded-full bg-green-600 px-4 py-2 text-white">
            Active
          </span>
        </div>

        {/* Account */}

        <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900 p-6">
          <div className="flex items-center gap-4">
            <User className="text-cyan-500" />

            <div>
              <h2 className="font-semibold text-white">
                Account
              </h2>

              <p className="text-sm text-slate-400">
                Manage your profile
              </p>
            </div>
          </div>

          <UserButton
            
          />
        </div>

      </div>
    </div>
  );
}