export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  category: string;
  type: "debit" | "credit";
  merchant?: string;
  smsSource?: string;
}

export interface Subscription {
  id: string;
  name: string;
  amount: number;
  frequency: "monthly" | "yearly" | "weekly";
  nextBilling: string;
  category: string;
  status: "active" | "cancelled";
  risk?: "high" | "medium" | "low";
}

export interface Goal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  category: string;
  priority: "high" | "medium" | "low";
  monthlyTarget?: number;
}

export interface SpendingPattern {
  category: string;
  amount: number;
  percentage: number;
  trend: "up" | "down" | "stable";
  change: number;
}

export interface AIInsight {
  id: string;
  type: "warning" | "success" | "info" | "tip";
  title: string;
  message: string;
  action?: string;
  timestamp: string;
  category?: string;
}

export interface BudgetStatus {
  category: string;
  spent: number;
  budget: number;
  remaining: number;
  status: "healthy" | "warning" | "exceeded";
}
