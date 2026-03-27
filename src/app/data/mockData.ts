import { Transaction, Subscription, Goal, AIInsight, BudgetStatus } from "../types";

export const mockTransactions: Transaction[] = [
  {
    id: "1",
    date: "2026-02-13",
    description: "Swiggy Food Delivery",
    amount: 450,
    category: "Food & Dining",
    type: "debit",
    merchant: "Swiggy",
    smsSource: "SWIGGY"
  },
  {
    id: "2",
    date: "2026-02-13",
    description: "Salary Credited",
    amount: 75000,
    category: "Income",
    type: "credit",
    smsSource: "HDFC"
  },
  {
    id: "3",
    date: "2026-02-12",
    description: "Netflix Subscription",
    amount: 649,
    category: "Entertainment",
    type: "debit",
    merchant: "Netflix",
    smsSource: "NETFLIX"
  },
  {
    id: "4",
    date: "2026-02-12",
    description: "Uber Ride",
    amount: 285,
    category: "Transportation",
    type: "debit",
    merchant: "Uber",
    smsSource: "UBER"
  },
  {
    id: "5",
    date: "2026-02-11",
    description: "Amazon Shopping",
    amount: 2450,
    category: "Shopping",
    type: "debit",
    merchant: "Amazon",
    smsSource: "AMAZON"
  },
  {
    id: "6",
    date: "2026-02-10",
    description: "Starbucks Coffee",
    amount: 320,
    category: "Food & Dining",
    type: "debit",
    merchant: "Starbucks",
    smsSource: "SBUX"
  },
  {
    id: "7",
    date: "2026-02-09",
    description: "Gym Membership",
    amount: 1500,
    category: "Health & Fitness",
    type: "debit",
    merchant: "Cult.fit",
    smsSource: "CULTFIT"
  },
  {
    id: "8",
    date: "2026-02-08",
    description: "Zomato Order",
    amount: 680,
    category: "Food & Dining",
    type: "debit",
    merchant: "Zomato",
    smsSource: "ZOMATO"
  },
  {
    id: "9",
    date: "2026-02-07",
    description: "Electricity Bill",
    amount: 1850,
    category: "Utilities",
    type: "debit",
    smsSource: "BESCOM"
  },
  {
    id: "10",
    date: "2026-02-06",
    description: "Freelance Payment",
    amount: 15000,
    category: "Income",
    type: "credit",
    smsSource: "PAYPAL"
  },
  {
    id: "11",
    date: "2026-02-05",
    description: "Spotify Premium",
    amount: 119,
    category: "Entertainment",
    type: "debit",
    merchant: "Spotify",
    smsSource: "SPOTIFY"
  },
  {
    id: "12",
    date: "2026-02-04",
    description: "Big Basket Groceries",
    amount: 3200,
    category: "Groceries",
    type: "debit",
    merchant: "BigBasket",
    smsSource: "BIGBSK"
  },
  {
    id: "13",
    date: "2026-02-03",
    description: "Myntra Fashion",
    amount: 4500,
    category: "Shopping",
    type: "debit",
    merchant: "Myntra",
    smsSource: "MYNTRA"
  },
  {
    id: "14",
    date: "2026-02-02",
    description: "Book My Show",
    amount: 600,
    category: "Entertainment",
    type: "debit",
    merchant: "BookMyShow",
    smsSource: "BMS"
  },
  {
    id: "15",
    date: "2026-02-01",
    description: "Rent Payment",
    amount: 18000,
    category: "Housing",
    type: "debit",
    smsSource: "IMPS"
  }
];

export const mockSubscriptions: Subscription[] = [
  {
    id: "1",
    name: "Netflix Premium",
    amount: 649,
    frequency: "monthly",
    nextBilling: "2026-03-12",
    category: "Entertainment",
    status: "active",
    risk: "medium"
  },
  {
    id: "2",
    name: "Spotify Premium",
    amount: 119,
    frequency: "monthly",
    nextBilling: "2026-03-05",
    category: "Entertainment",
    status: "active",
    risk: "low"
  },
  {
    id: "3",
    name: "Amazon Prime",
    amount: 1499,
    frequency: "yearly",
    nextBilling: "2026-08-15",
    category: "Shopping",
    status: "active",
    risk: "low"
  },
  {
    id: "4",
    name: "Cult.fit Gym",
    amount: 1500,
    frequency: "monthly",
    nextBilling: "2026-03-09",
    category: "Health & Fitness",
    status: "active",
    risk: "high"
  },
  {
    id: "5",
    name: "YouTube Premium",
    amount: 129,
    frequency: "monthly",
    nextBilling: "2026-02-20",
    category: "Entertainment",
    status: "active",
    risk: "high"
  },
  {
    id: "6",
    name: "Adobe Creative Cloud",
    amount: 2999,
    frequency: "monthly",
    nextBilling: "2026-02-25",
    category: "Professional",
    status: "cancelled",
    risk: "medium"
  }
];

export const mockGoals: Goal[] = [
  {
    id: "1",
    name: "Emergency Fund",
    targetAmount: 300000,
    currentAmount: 125000,
    deadline: "2026-12-31",
    category: "Savings",
    priority: "high",
    monthlyTarget: 17500
  },
  {
    id: "2",
    name: "Vacation to Bali",
    targetAmount: 150000,
    currentAmount: 45000,
    deadline: "2026-08-01",
    category: "Travel",
    priority: "medium",
    monthlyTarget: 17500
  },
  {
    id: "3",
    name: "New Laptop",
    targetAmount: 120000,
    currentAmount: 80000,
    deadline: "2026-05-01",
    category: "Tech",
    priority: "medium",
    monthlyTarget: 13333
  },
  {
    id: "4",
    name: "Investment Portfolio",
    targetAmount: 500000,
    currentAmount: 150000,
    deadline: "2027-02-01",
    category: "Investment",
    priority: "high",
    monthlyTarget: 29166
  }
];

export const mockAIInsights: AIInsight[] = [
  {
    id: "1",
    type: "warning",
    title: "High Food Delivery Spending",
    message: "You've spent ₹3,450 on food delivery this week - 45% more than last month. Consider cooking at home 2-3 times a week to save ₹8,000/month.",
    action: "Set a weekly food budget",
    timestamp: "2026-02-13T10:30:00",
    category: "Food & Dining"
  },
  {
    id: "2",
    type: "tip",
    title: "Unused Subscriptions Detected",
    message: "YouTube Premium hasn't been used in 45 days. You could save ₹1,548/year by cancelling it.",
    action: "Review subscriptions",
    timestamp: "2026-02-13T09:15:00",
    category: "Entertainment"
  },
  {
    id: "3",
    type: "success",
    title: "Excellent Savings Progress!",
    message: "You're 41.7% towards your Emergency Fund goal - ahead of schedule by 2 months!",
    action: "View goal details",
    timestamp: "2026-02-13T08:00:00",
    category: "Savings"
  },
  {
    id: "4",
    type: "warning",
    title: "Shopping Budget Alert",
    message: "You've exceeded your shopping budget by ₹2,450 this month. Consider reviewing non-essential purchases.",
    action: "View spending breakdown",
    timestamp: "2026-02-12T18:45:00",
    category: "Shopping"
  },
  {
    id: "5",
    type: "info",
    title: "Salary Credited",
    message: "Your salary of ₹75,000 has been credited. Based on your goals, we recommend saving ₹22,500 (30%) this month.",
    action: "Auto-allocate savings",
    timestamp: "2026-02-13T11:00:00",
    category: "Income"
  },
  {
    id: "6",
    type: "tip",
    title: "Smart Spending Opportunity",
    message: "You typically spend ₹3,200 on groceries. Switching to a cash-back credit card could save ₹1,920/year.",
    action: "Learn more",
    timestamp: "2026-02-11T14:20:00",
    category: "Groceries"
  }
];

export const mockBudgets: BudgetStatus[] = [
  {
    category: "Food & Dining",
    spent: 8450,
    budget: 8000,
    remaining: -450,
    status: "exceeded"
  },
  {
    category: "Shopping",
    spent: 6950,
    budget: 5000,
    remaining: -1950,
    status: "exceeded"
  },
  {
    category: "Entertainment",
    spent: 1497,
    budget: 2000,
    remaining: 503,
    status: "healthy"
  },
  {
    category: "Transportation",
    spent: 2850,
    budget: 4000,
    remaining: 1150,
    status: "healthy"
  },
  {
    category: "Groceries",
    spent: 3200,
    budget: 6000,
    remaining: 2800,
    status: "healthy"
  },
  {
    category: "Health & Fitness",
    spent: 1500,
    budget: 2000,
    remaining: 500,
    status: "healthy"
  },
  {
    category: "Utilities",
    spent: 1850,
    budget: 3000,
    remaining: 1150,
    status: "healthy"
  }
];

// Helper function to calculate spending trends
export const getSpendingByCategory = () => {
  const categoryTotals = new Map<string, number>();
  
  mockTransactions
    .filter(t => t.type === "debit")
    .forEach(t => {
      const current = categoryTotals.get(t.category) || 0;
      categoryTotals.set(t.category, current + t.amount);
    });
  
  const total = Array.from(categoryTotals.values()).reduce((sum, val) => sum + val, 0);
  
  return Array.from(categoryTotals.entries()).map(([category, amount]) => ({
    category,
    amount,
    percentage: (amount / total) * 100,
    trend: Math.random() > 0.5 ? "up" : "down" as "up" | "down",
    change: Math.floor(Math.random() * 30) - 10
  })).sort((a, b) => b.amount - a.amount);
};

// Future balance prediction
export const getFutureBalancePrediction = () => {
  const currentBalance = 42350;
  const avgMonthlyIncome = 75000;
  const avgMonthlyExpense = 45000;
  
  return [
    { month: "Feb", predicted: currentBalance, actual: currentBalance },
    { month: "Mar", predicted: currentBalance + (avgMonthlyIncome - avgMonthlyExpense), actual: null },
    { month: "Apr", predicted: currentBalance + 2 * (avgMonthlyIncome - avgMonthlyExpense), actual: null },
    { month: "May", predicted: currentBalance + 3 * (avgMonthlyIncome - avgMonthlyExpense), actual: null },
    { month: "Jun", predicted: currentBalance + 4 * (avgMonthlyIncome - avgMonthlyExpense), actual: null },
    { month: "Jul", predicted: currentBalance + 5 * (avgMonthlyIncome - avgMonthlyExpense), actual: null },
  ];
};
