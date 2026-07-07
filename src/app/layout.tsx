import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import IncomeProvider from "@/context/IncomeContext";
import GoalProvider from "@/context/providers/GoalProvider";
import "./globals.css";
import ThemeProvider from "@/components/providers/ThemeProvider";

import ExpenseProvider from "@/context/providers/ExpenseProvider";
import NotificationProvider from "@/context/NotificationContext";

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
  <html lang="en" suppressHydrationWarning>
    <body>
      
       
  <ThemeProvider>
  <ExpenseProvider>
    <IncomeProvider>
      <GoalProvider>
        <NotificationProvider>
          {children}

          <Toaster
            richColors
            position="top-right"
          />
        </NotificationProvider>
      </GoalProvider>
    </IncomeProvider>
  </ExpenseProvider>
</ThemeProvider>
   
    </body>
  </html>
</ClerkProvider>
  );
}