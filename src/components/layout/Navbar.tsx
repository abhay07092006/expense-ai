"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

        <Link
          href="/"
          className="text-2xl font-bold text-white"
        >
          💰 ExpenseAI
        </Link>

        <div className="hidden items-center gap-8 md:flex">

          <a
            href="#features"
            className="text-slate-300 transition hover:text-white"
          >
            Features
          </a>

          <Link
            href="/dashboard"
            className="text-slate-300 transition hover:text-white"
          >
            Dashboard
          </Link>

          <a
            href="#pricing"
            className="text-slate-300 transition hover:text-white"
          >
            Pricing
          </a>

        </div>

        <Link href="/sign-up">
          <Button>
            Get Started
          </Button>
        </Link>

      </div>
    </nav>
  );
}