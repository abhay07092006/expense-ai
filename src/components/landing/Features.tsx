import { Card } from "@/components/ui/card";
import {
  Wallet,
  BarChart3,
  Brain,
  ShieldCheck,
} from "lucide-react";

const features = [
  {
    title: "Expense Tracking",
    description: "Track every expense with ease.",
    icon: Wallet,
  },
  {
    title: "Analytics",
    description: "Visual charts and reports.",
    icon: BarChart3,
  },
  {
    title: "AI Insights",
    description: "Smart suggestions to save money.",
    icon: Brain,
  },
  {
    title: "Secure",
    description: "Your financial data stays protected.",
    icon: ShieldCheck,
  },
];

export default function Features() {
  return (
    <section className="bg-slate-950 px-6 py-24 text-white">
      <div className="mx-auto max-w-7xl">

        <h2 className="mb-16 text-center text-5xl font-bold">
          Why ExpenseAI?
        </h2>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">

          {features.map((feature) => (
            <Card
              key={feature.title}
              className="rounded-3xl border-slate-700 bg-slate-900 p-8 transition hover:-translate-y-2 hover:border-blue-500"
            >
              <feature.icon className="mb-6 h-12 w-12 text-blue-500" />

              <h3 className="text-2xl font-bold">
                {feature.title}
              </h3>

              <p className="mt-4 text-slate-400">
                {feature.description}
              </p>
            </Card>
          ))}

        </div>

      </div>
    </section>
  );
}