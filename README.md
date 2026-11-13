# 💰 ExpenseAI – AI-Powered Personal Finance Management System

**Track Every Rupee. Manage Smarter. Save Better.**

ExpenseAI is an AI-powered personal finance management web application designed to help users track their income and expenses, manage budgets, monitor savings goals, and understand their financial habits through interactive analytics and AI-generated financial insights.

The platform combines modern web technologies with artificial intelligence to make personal financial management simpler, smarter, and more accessible.

🌐 **Live Demo:** https://expense-ai-mu.vercel.app/

📂 **GitHub Repository:** https://github.com/abhay07092006/expense-ai

---

## 🚀 Project Overview

Managing personal finances can become difficult when income, expenses, savings, and financial goals are maintained separately.

ExpenseAI addresses this problem by providing a centralized financial management platform where users can:

- Record and manage daily expenses.
- Track multiple sources of income.
- Monitor their overall financial balance.
- Analyse spending patterns through interactive charts.
- Create savings goals and track progress.
- Generate AI-powered financial insights.
- Export financial records into PDF and Excel formats.

The application aims to transform ordinary financial records into meaningful information that helps users make better financial decisions.

## ✨ Key Features

### 1. 📊 Interactive Financial Dashboard
- Overview of total income and expenses.
- Automatic balance calculation.
- Total transaction statistics.
- Monthly expense visualization.
- Animated dashboard components.

### 2. 💸 Expense Management
- Add new expense records.
- Edit existing transactions.
- Delete unwanted expenses.
- Categorize expenses.
- Select payment methods.
- Add transaction dates and notes.
- Search and filter expense records.

**Supported expense categories:**
- Food
- Shopping
- Travel
- Bills
- Entertainment
- Health
- Education
- Other

**Supported payment methods:**
- UPI
- Cash
- Credit Card
- Debit Card

### 3. 💵 Income Management
- Record different sources of income.
- Add income amounts and dates.
- View recorded income.
- Integrate income records into financial summaries.

### 4. 🎯 Savings Goals
- Create personalized financial goals.
- Set target amounts.
- Specify target dates.
- Add savings towards existing goals.
- Monitor savings progress.
- Identify completed goals.

### 5. 📈 Financial Analytics
ExpenseAI provides visual insights into financial activities through:

- Monthly expense trend charts.
- Category-wise spending breakdown.
- Payment-method-wise expense analysis.
- Date-based filtering.
- Interactive graphical representations.

### 6. 🤖 AI Financial Advisor

One of the major features of ExpenseAI is its AI-powered financial analysis module.

The AI Financial Advisor analyses the financial information supplied by the application, including:

- Recorded expenses.
- Income records.
- Savings goals.
- Budget-related information.

It generates AI-based financial observations and suggestions to help users understand their spending habits and financial position.

### 7. 📄 Financial Report Generation

Users can export their financial records for offline analysis and documentation.

**PDF Export**
- Generate downloadable expense reports.
- Include transaction title, category, payment method, amount, and date.

**Excel Export**
- Export expense records into Excel format.
- Include transaction details and notes.
- Support further analysis using spreadsheet software.

### 8. 🔐 Authentication and Security
- User authentication using Clerk.
- Protected application routes.
- User-specific financial records.
- Database-backed information storage.

### 9. ⚙️ Settings and User Experience
- Modern responsive interface.
- Dark-themed user interface.
- Interactive components and animations.
- Notification messages for user actions.

---

## 🛠️ Technology Stack

| Category | Technologies |
|---|---|
| Frontend | Next.js, React.js, TypeScript |
| Styling | Tailwind CSS |
| UI Components | Shadcn UI |
| Authentication | Clerk |
| Database | PostgreSQL |
| ORM | Prisma |
| Artificial Intelligence | Google Gemini API |
| Charts | Recharts |
| Animations | Framer Motion |
| Forms | React Hook Form |
| PDF Generation | jsPDF, jsPDF-AutoTable |
| Excel Generation | SheetJS (xlsx) |
| Notifications | Sonner |
| Deployment | Vercel |

---

## 🏗️ System Architecture

ExpenseAI follows a modern full-stack web application architecture.

```text
                 USER
                   |
                   v
          NEXT.JS APPLICATION
                   |
          +--------+--------+
          |                 |
          v                 v
      FRONTEND           CLERK AUTH
      (React.js)         Authentication
          |
          v
       API ROUTES
          |
    +-----+------+----------------+
    |            |                |
    v            v                v
 EXPENSE       INCOME           GOALS
    |            |                |
    +------------+----------------+
                 |
                 v
              PRISMA
                 |
                 v
             POSTGRESQL
                 
                 |
                 v
          GOOGLE GEMINI API
                 |
                 v
         AI FINANCIAL INSIGHTS
```

---

## 📂 Project Structure

The main project structure is organized as follows:

```text
expense-ai/
│
├── prisma/
│   └── schema.prisma
│
├── public/
│
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── ai/
│   │   │   ├── expenses/
│   │   │   ├── income/
│   │   │   └── goals/
│   │   │
│   │   ├── dashboard/
│   │   ├── expenses/
│   │   ├── income/
│   │   ├── goals/
│   │   ├── analytics/
│   │   ├── reports/
│   │   └── settings/
│   │
│   ├── components/
│   │   ├── analytics/
│   │   ├── dashboard/
│   │   ├── expenses/
│   │   ├── goals/
│   │   ├── income/
│   │   ├── reports/
│   │   └── ui/
│   │
│   ├── context/
│   │   └── providers/
│   │
│   ├── hooks/
│   │
│   ├── lib/
│   │
│   ├── services/
│   │
│   ├── types/
│   │
│   └── middleware.ts
│
├── package.json
├── tsconfig.json
├── next.config.ts
└── README.md
```

*Note: This is a simplified representation of the project structure.*

---

## ⚙️ Installation and Setup

Follow these steps to run ExpenseAI locally.

### Prerequisites

Make sure the following tools are installed:

- Node.js (LTS version recommended)
- npm
- PostgreSQL database
- Git

### Step 1: Clone the Repository

```bash
git clone https://github.com/abhay07092006/expense-ai.git

cd expense-ai
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Configure Environment Variables

Create a `.env` file in the root directory.

Configure the required credentials:

```env
DATABASE_URL="your_postgresql_connection_url"

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="your_clerk_publishable_key"

CLERK_SECRET_KEY="your_clerk_secret_key"

GEMINI_API_KEY="your_google_gemini_api_key"
```

Use the exact environment variable names expected by the corresponding source files in your repository.

### Step 4: Configure Prisma

Run the following commands:

```bash
npx prisma generate
```

Apply database migrations according to the existing Prisma schema:

```bash
npx prisma migrate dev
```

### Step 5: Start the Development Server

```bash
npm run dev
```

Open your browser and visit:

```text
http://localhost:3000
```

---

## 🧠 Working Methodology

ExpenseAI operates through the following workflow:

1. **Authentication:** Users authenticate through Clerk.
2. **Data Entry:** Users add their income, expenses, and savings goals.
3. **Data Storage:** Financial records are processed through application API routes and stored in PostgreSQL using Prisma.
4. **Financial Calculation:** The application calculates income, expenses, balance, and transaction statistics.
5. **Visualization:** Recharts displays financial trends and spending distributions.
6. **AI Analysis:** Financial information is sent to the AI API for generating financial insights.
7. **Report Generation:** Users can export expense records into PDF and Excel documents.

---

## 🎯 Project Objectives

- Develop an intelligent personal finance management platform.
- Simplify daily income and expense tracking.
- Provide better visibility into spending habits.
- Encourage structured savings through financial goals.
- Use AI to generate meaningful financial insights.
- Present financial information through interactive visualizations.
- Provide downloadable financial reports.

---

## 🔮 Future Scope

The platform can be further enhanced through the following developments:

- AI-powered monthly budget recommendations.
- Automatic recurring expense detection.
- Receipt scanning using OCR.
- Voice-based expense entry.
- Advanced spending prediction using machine learning.
- Bank account integration through authorized financial APIs.
- Financial anomaly detection.
- Personalized savings recommendations.
- Multi-currency support.
- Mobile application development.

*These are proposed future enhancements and are not claimed as currently implemented features.*

---



## 🌐 Project Links

- **Live Application:** https://expense-ai-mu.vercel.app/
- **Source Code:** https://github.com/abhay07092006/expense-ai

---

## 📜 Conclusion

ExpenseAI demonstrates how modern web development technologies and artificial intelligence can be combined to create a practical personal finance management solution.

By integrating expense tracking, income management, savings goals, financial analytics, and AI-generated insights into one platform, the application provides users with a centralized way to monitor and understand their financial activities.

The project also provides a foundation for future development in intelligent financial planning and personalized money management.

---

**Built with ❤️ using Next.js, TypeScript, PostgreSQL, Prisma and Google Gemini AI.**
