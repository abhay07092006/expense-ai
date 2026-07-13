"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

import DashboardPreview from "./DashboardPreview";

export default function Hero() {
  return (
    <section className="bg-slate-950 px-6 py-24 text-white">
      <div className="mx-auto max-w-7xl text-center">

        <span className="rounded-full border border-slate-700 px-4 py-2 text-sm">
          🚀 AI Powered Expense Tracker
        </span>

        <h1 className="mt-8 text-6xl font-extrabold leading-tight">
          Track Every Rupee
          <br />
          Smarter.
        </h1>

        <p className="mx-auto mt-8 max-w-2xl text-xl text-slate-400">
          Manage your finances with AI-powered insights,
          beautiful analytics and powerful reports.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">

          {/* If user is NOT logged in */}
          <Link href="/sign-up">
  <Button size="lg">
    Get Started
    <ArrowRight className="ml-2 h-5 w-5" />
  </Button>
</Link>

          {/* Features Button */}
          <a href="#features">
            <Button
              variant="outline"
              size="lg"
            >
              Explore Features
            </Button>
          </a>

        </div>

       <div id="dashboard-preview">
  <DashboardPreview />
</div>

      </div>
    </section>
  );
}