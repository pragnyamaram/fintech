import { ArrowUpRight, ArrowDownRight, TrendingUp, AlertCircle, CheckCircle } from "lucide-react";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";
import { mockTransactions, mockAIInsights, mockGoals, getFutureBalancePrediction } from "../data/mockData";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export function Dashboard() {
  const currentBalance = 42350;
  const monthlyIncome = 75000;
  const monthlyExpense = 32650;
  const savingsRate = ((monthlyIncome - monthlyExpense) / monthlyIncome * 100).toFixed(1);
  
  const recentTransactions = mockTransactions.slice(0, 5);
  const topInsights = mockAIInsights.slice(0, 3);
  const futureBalance = getFutureBalancePrediction();

  const getInsightIcon = (type: string) => {
    switch (type) {
      case "warning":
        return <AlertCircle className="w-5 h-5 text-orange-500" />;
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "tip":
        return <TrendingUp className="w-5 h-5 text-blue-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-muted-foreground" />;
    }
  };

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="pt-2">
        <p className="text-muted-foreground">Good afternoon,</p>
        <h1 className="text-2xl mt-1">Priya 👋</h1>
      </div>

      {/* Balance Card */}
      <Card className="p-6 bg-gradient-to-br from-blue-600 to-blue-700 text-white">
        <p className="text-blue-100 text-sm">Current Balance</p>
        <h2 className="text-4xl mt-2 mb-4">₹{currentBalance.toLocaleString()}</h2>
        
        <div className="flex gap-4 mt-4">
          <div className="flex-1">
            <div className="flex items-center gap-1 text-blue-100 text-sm">
              <ArrowDownRight className="w-4 h-4" />
              <span>Income</span>
            </div>
            <p className="text-lg mt-1">₹{monthlyIncome.toLocaleString()}</p>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-1 text-blue-100 text-sm">
              <ArrowUpRight className="w-4 h-4" />
              <span>Spent</span>
            </div>
            <p className="text-lg mt-1">₹{monthlyExpense.toLocaleString()}</p>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-blue-500">
          <div className="flex items-center justify-between text-sm">
            <span className="text-blue-100">Savings Rate</span>
            <span className="font-semibold">{savingsRate}%</span>
          </div>
        </div>
      </Card>

      {/* AI Insights */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg">AI Insights</h2>
          <a href="/coach" className="text-sm text-primary">View all</a>
        </div>
        
        <div className="space-y-3">
          {topInsights.map((insight) => (
            <Card key={insight.id} className="p-4 bg-card border-border">
              <div className="flex gap-3">
                {getInsightIcon(insight.type)}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <p className="text-sm font-medium">{insight.title}</p>
                    <Badge 
                      variant={
                        insight.type === "warning" ? "destructive" : 
                        insight.type === "success" ? "default" : 
                        "secondary"
                      }
                      className="text-xs shrink-0"
                    >
                      {insight.type}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {insight.message}
                  </p>
                  {insight.action && (
                    <button className="text-xs text-primary mt-2">
                      {insight.action} →
                    </button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Future Balance Prediction */}
      <div>
        <h2 className="text-lg mb-3">Balance Prediction</h2>
        <Card className="p-4 bg-card border-border">
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={futureBalance}>
                <XAxis 
                  dataKey="month" 
                  tick={{ fontSize: 12 }}
                  stroke="var(--color-muted-foreground)"
                />
                <YAxis 
                  tick={{ fontSize: 12 }}
                  stroke="var(--color-muted-foreground)"
                  tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}k`}
                />
                <Tooltip 
                  formatter={(value: number) => [`₹${value.toLocaleString()}`, "Balance"]}
                  contentStyle={{ fontSize: 12 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="predicted" 
                  stroke="var(--color-chart-1)" 
                  strokeWidth={2}
                  dot={{ fill: "var(--color-chart-1)", r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <p className="text-sm text-muted-foreground mt-2 text-center">
            At this rate, you'll have ₹{futureBalance[futureBalance.length - 1].predicted.toLocaleString()} by July
          </p>
        </Card>
      </div>

      {/* Active Goals */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg">Active Goals</h2>
          <a href="/goals" className="text-sm text-primary">View all</a>
        </div>
        
        <div className="space-y-3">
          {mockGoals.slice(0, 2).map((goal) => {
            const progress = (goal.currentAmount / goal.targetAmount) * 100;
            return (
              <Card key={goal.id} className="p-4 bg-card border-border">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-medium">{goal.name}</p>
                    <p className="text-sm text-muted-foreground">
                      ₹{goal.currentAmount.toLocaleString()} / ₹{goal.targetAmount.toLocaleString()}
                    </p>
                  </div>
                  <Badge variant={goal.priority === "high" ? "destructive" : "secondary"}>
                    {goal.priority}
                  </Badge>
                </div>
                <Progress value={progress} className="h-2" />
                <p className="text-xs text-muted-foreground mt-2">
                  {progress.toFixed(1)}% complete • {goal.deadline}
                </p>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Recent Transactions */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg">Recent Transactions</h2>
          <a href="/transactions" className="text-sm text-primary">View all</a>
        </div>
        
        <Card className="divide-y bg-card border-border">
          {recentTransactions.map((txn) => (
            <div key={txn.id} className="p-4 flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{txn.description}</p>
                <p className="text-sm text-muted-foreground">
                  {txn.category} • {new Date(txn.date).toLocaleDateString()}
                </p>
              </div>
              <div className="text-right ml-4">
                <p className={`font-semibold ${txn.type === "credit" ? "text-green-600" : "text-foreground"}`}>
                  {txn.type === "credit" ? "+" : "-"}₹{txn.amount.toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}
