
import { Card, CardContent } from "@/components/ui/card";
import {
  Wallet,
  CreditCard,
  TrendingDown,
  Receipt,
} from "lucide-react";

const stats = [
  {
    title: "Total Expenses",
    value: "₹35,500",
    icon: Wallet,
    color: "text-red-500",
  },
  {
    title: "This Month",
    value: "₹18,200",
    icon: CreditCard,
    color: "text-blue-500",
  },
  {
    title: "Average / Day",
    value: "₹607",
    icon: TrendingDown,
    color: "text-yellow-500",
  },
  {
    title: "Transactions",
    value: "124",
    icon: Receipt,
    color: "text-green-500",
  },
];

export default function ExpenseStats() {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((item) => (
        <Card
          key={item.title}
          className="border-slate-800 bg-slate-900 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/10"
        >
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-sm text-slate-400">
                {item.title}
              </p>

              <h2 className="mt-3 text-3xl font-bold text-white">
                {item.value}
              </h2>
            </div>

            <item.icon
              className={`h-10 w-10 ${item.color}`}
            />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}