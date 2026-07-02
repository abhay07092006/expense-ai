import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";

import "./globals.css";

import ExpenseProvider from "@/context/providers/ExpenseProvider";

export const metadata: Metadata = {
  title: "ExpenseAI",
  description: "AI Powered Expense Tracker",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <ExpenseProvider>
            {children}
          </ExpenseProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}