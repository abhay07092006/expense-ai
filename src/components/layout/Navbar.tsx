import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

        <h1 className="text-2xl font-bold text-white">
          💰 ExpenseAI
        </h1>

        <div className="hidden items-center gap-8 text-slate-300 md:flex">
          <a href="#" className="hover:text-white transition">
            Features
          </a>

          <a href="#" className="hover:text-white transition">
            Dashboard
          </a>

          <a href="#" className="hover:text-white transition">
            Pricing
          </a>
        </div>

        <Button>Get Started</Button>

      </div>
    </nav>
  );
}