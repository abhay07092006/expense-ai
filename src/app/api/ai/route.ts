import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const {
      expenses,
      incomes,
      goals,
      budget,
    } = await req.json();

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const prompt = `
You are ExpenseAI, an expert personal financial advisor.

Analyze the user's complete financial data.

========================
INCOME
========================
${JSON.stringify(incomes, null, 2)}

========================
EXPENSES
========================
${JSON.stringify(expenses, null, 2)}

========================
GOALS
========================
${JSON.stringify(goals, null, 2)}

========================
MONTHLY BUDGET
========================
${JSON.stringify(budget, null, 2)}

Provide a concise report in this exact format.

📊 Financial Health Score (0-100)

💰 Income Summary

💸 Expense Summary

📈 Savings Analysis

🎯 Goal Progress

⚠ Biggest Financial Concern

✅ Top 5 Personalized Recommendations

📅 Monthly Budget Advice

Use ₹ currency.

Do not invent data.

Keep the response below 350 words.

Use simple language.
`;

    const result =
      await model.generateContent(prompt);

    return NextResponse.json({
      response: result.response.text(),
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "AI Analysis Failed",
      },
      {
        status: 500,
      }
    );
  }
}