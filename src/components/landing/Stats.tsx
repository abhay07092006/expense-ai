"use client";

import CountUp from "react-countup";
import { Card } from "@/components/ui/card";

const stats = [
  {
    number: 10000,
    suffix: "+",
    label: "Happy Users",
  },
  {
    number: 50,
    suffix: "L+",
    prefix: "₹",
    label: "Expenses Tracked",
  },
  {
    number: 98,
    suffix: "%",
    label: "Accuracy",
  },
  {
    number: 24,
    suffix: "/7",
    label: "Support",
  },
];

export default function Stats() {
  return (
    <section className="bg-slate-950 px-6 py-24 text-white">
      <div className="mx-auto max-w-7xl">

        <h2 className="mb-14 text-center text-5xl font-bold">
          Trusted by Thousands
        </h2>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">

          {stats.map((item) => (
            <Card
              key={item.label}
              className="rounded-3xl border-slate-700 bg-slate-900 p-10 text-center"
            >
              <h3 className="text-5xl font-extrabold text-blue-500">

                {item.prefix}

                <CountUp
                  end={item.number}
                  duration={3}
                />

                {item.suffix}

              </h3>

              <p className="mt-4 text-slate-400">
                {item.label}
              </p>

            </Card>
          ))}

        </div>

      </div>
    </section>
  );
}