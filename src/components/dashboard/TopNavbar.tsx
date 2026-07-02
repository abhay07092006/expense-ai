"use client";

import {
  Bell,
  Search,
  Moon,
  UserCircle2,
} from "lucide-react";

export default function TopNavbar() {
  return (
    <header className="sticky top-0 z-20 flex h-20 items-center justify-between border-b border-slate-800 bg-slate-950 px-8">

      <div>
        <h1 className="text-3xl font-bold text-white">
          Dashboard
        </h1>

        <p className="text-sm text-slate-400">
          Welcome back, Abhay 👋
        </p>
      </div>

      <div className="flex items-center gap-4">

        <div className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-900 px-4 py-2">

          <Search
            size={18}
            className="text-slate-500"
          />

          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent text-white outline-none placeholder:text-slate-500"
          />

        </div>

        <button className="rounded-xl border border-slate-800 bg-slate-900 p-3 transition hover:bg-slate-800">
          <Bell className="text-white" size={20} />
        </button>

        <button className="rounded-xl border border-slate-800 bg-slate-900 p-3 transition hover:bg-slate-800">
          <Moon className="text-white" size={20} />
        </button>

        <button className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-900 px-4 py-2 transition hover:bg-slate-800">

          <UserCircle2
            size={30}
            className="text-blue-500"
          />

          <div className="text-left">
            <p className="text-sm font-semibold text-white">
              Abhay
            </p>

            <p className="text-xs text-slate-400">
              Premium
            </p>
          </div>

        </button>

      </div>

    </header>
  );
}