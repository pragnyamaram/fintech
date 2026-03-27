import { TrendingUp, TrendingDown, AlertTriangle } from "lucide-react";
import { Card } from "../components/ui/card";
import { Progress } from "../components/ui/progress";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { getSpendingByCategory, mockBudgets } from "../data/mockData";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, BarChart, Bar, XAxis, YAxis } from "recharts";

export function Insights() {
  const spendingData = getSpendingByCategory();
  
  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4', '#84cc16'];

  const pieChartData = spendingData.map(item => ({
    name: item.category,
    value: item.amount
  }));

  const topCategories = spendingData.slice(0, 5);

  return (
    <div className="p-4 pb-24 space-y-6">
      {/* Header */}
      <div className="pt-2">
        <h1 className="text-2xl">Insights & Analytics</h1>
        <p className="text-sm text-gray-600 mt-1">
          Understanding your spending patterns
        </p>
      </div>

      <Tabs defaultValue="spending" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="spending">Spending</TabsTrigger>
          <TabsTrigger value="budgets">Budgets</TabsTrigger>
        </TabsList>

        <TabsContent value="spending" className="space-y-6">
          {/* Spending Distribution */}
          <Card className="p-4">
            <h2 className="text-lg mb-4">Spending Distribution</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => `₹${value.toLocaleString()}`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Top Spending Categories */}
          <div>
            <h2 className="text-lg mb-3">Top Spending Categories</h2>
            <div className="space-y-3">
              {topCategories.map((item, index) => (
                <Card key={item.category} className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-3 h-3 rounded-full shrink-0"
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      />
                      <div>
                        <p className="font-medium">{item.category}</p>
                        <p className="text-sm text-gray-600">
                          {item.percentage.toFixed(1)}% of total spending
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">₹{item.amount.toLocaleString()}</p>
                      <div className="flex items-center gap-1 mt-1">
                        {item.trend === "up" ? (
                          <TrendingUp className="w-4 h-4 text-red-500" />
                        ) : (
                          <TrendingDown className="w-4 h-4 text-green-500" />
                        )}
                        <span className={`text-xs ${item.trend === "up" ? "text-red-500" : "text-green-500"}`}>
                          {Math.abs(item.change)}%
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Spending Patterns */}
          <Card className="p-4">
            <h2 className="text-lg mb-4">Spending Patterns</h2>
            <div className="space-y-4">
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-amber-900">Weekend Overspending</p>
                    <p className="text-sm text-amber-700 mt-1">
                      You spend 60% more on weekends compared to weekdays. Average weekend spending: ₹4,200
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <TrendingUp className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-blue-900">Peak Spending Hours</p>
                    <p className="text-sm text-blue-700 mt-1">
                      Most transactions occur between 7-9 PM. Consider setting spending alerts during this time.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <TrendingDown className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-purple-900">Impulse Purchase Trend</p>
                    <p className="text-sm text-purple-700 mt-1">
                      23% of your shopping expenses are under ₹500 - potential impulse buys totaling ₹6,400/month
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="budgets" className="space-y-6">
          {/* Budget Overview Chart */}
          <Card className="p-4">
            <h2 className="text-lg mb-4">Budget vs Actual Spending</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockBudgets} layout="vertical">
                  <XAxis type="number" tick={{ fontSize: 12 }} />
                  <YAxis 
                    type="category" 
                    dataKey="category" 
                    tick={{ fontSize: 10 }} 
                    width={80}
                  />
                  <Tooltip formatter={(value: number) => `₹${value.toLocaleString()}`} />
                  <Bar dataKey="budget" fill="#e5e7eb" name="Budget" />
                  <Bar dataKey="spent" fill="#3b82f6" name="Spent" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Budget Status by Category */}
          <div>
            <h2 className="text-lg mb-3">Budget Status</h2>
            <div className="space-y-3">
              {mockBudgets.map((budget) => {
                const percentage = (budget.spent / budget.budget) * 100;
                return (
                  <Card key={budget.category} className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="font-medium">{budget.category}</p>
                        <p className="text-sm text-gray-600 mt-1">
                          ₹{budget.spent.toLocaleString()} / ₹{budget.budget.toLocaleString()}
                        </p>
                      </div>
                      <Badge 
                        variant={
                          budget.status === "exceeded" ? "destructive" : 
                          budget.status === "warning" ? "default" : 
                          "secondary"
                        }
                      >
                        {budget.status}
                      </Badge>
                    </div>
                    <Progress 
                      value={Math.min(percentage, 100)} 
                      className={`h-2 ${budget.status === "exceeded" ? "bg-red-200" : ""}`}
                    />
                    <div className="flex items-center justify-between mt-2">
                      <p className="text-xs text-gray-600">
                        {percentage.toFixed(1)}% used
                      </p>
                      <p className={`text-xs font-medium ${budget.remaining < 0 ? "text-red-600" : "text-green-600"}`}>
                        {budget.remaining < 0 ? "Exceeded by" : "Remaining"}: ₹{Math.abs(budget.remaining).toLocaleString()}
                      </p>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Budget Recommendations */}
          <Card className="p-4 bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
            <h3 className="font-medium mb-2">💡 Budget Recommendations</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 shrink-0">•</span>
                <span>Consider reducing your Food & Dining budget by ₹2,000 or increasing it to ₹10,000 to match spending</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 shrink-0">•</span>
                <span>You have ₹2,800 unused in Groceries - reallocate to exceeded categories?</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 shrink-0">•</span>
                <span>Shopping expenses are ₹1,950 over budget - set up spending alerts at 80%</span>
              </li>
            </ul>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
