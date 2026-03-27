import { Target, TrendingUp, Calendar, Plus, AlertCircle } from "lucide-react";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Progress } from "../components/ui/progress";
import { mockGoals } from "../data/mockData";

export function Goals() {
  const totalTargetAmount = mockGoals.reduce((sum, g) => sum + g.targetAmount, 0);
  const totalCurrentAmount = mockGoals.reduce((sum, g) => sum + g.currentAmount, 0);
  const overallProgress = (totalCurrentAmount / totalTargetAmount) * 100;

  const getProgressStatus = (goal: typeof mockGoals[0]) => {
    const progress = (goal.currentAmount / goal.targetAmount) * 100;
    const deadline = new Date(goal.deadline);
    const today = new Date();
    const daysRemaining = Math.ceil((deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    const monthsRemaining = Math.max(1, Math.ceil(daysRemaining / 30));
    const requiredMonthly = (goal.targetAmount - goal.currentAmount) / monthsRemaining;
    
    if (progress >= 100) return { status: "completed", message: "Goal achieved! 🎉" };
    if (daysRemaining < 0) return { status: "overdue", message: "Past deadline" };
    if (requiredMonthly > goal.monthlyTarget! * 1.5) return { status: "behind", message: "Behind schedule" };
    if (progress > 50) return { status: "on-track", message: "On track" };
    return { status: "normal", message: `${monthsRemaining} months left` };
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "destructive";
      case "medium": return "default";
      case "low": return "secondary";
      default: return "secondary";
    }
  };

  return (
    <div className="p-4 pb-24 space-y-6">
      {/* Header */}
      <div className="pt-2">
        <h1 className="text-2xl">Financial Goals</h1>
        <p className="text-sm text-gray-600 mt-1">
          Track your progress towards your dreams
        </p>
      </div>

      {/* Overall Progress */}
      <Card className="p-6 bg-gradient-to-br from-indigo-600 to-purple-600 text-white">
        <div className="flex items-center gap-2 text-indigo-100 mb-2">
          <Target className="w-5 h-5" />
          <span className="text-sm">Overall Progress</span>
        </div>
        <h2 className="text-3xl mb-4">{overallProgress.toFixed(1)}%</h2>
        <Progress value={overallProgress} className="h-2 bg-indigo-400 mb-3" />
        <div className="flex items-center justify-between text-sm">
          <span className="text-indigo-100">
            ₹{totalCurrentAmount.toLocaleString()} saved
          </span>
          <span className="text-indigo-100">
            ₹{totalTargetAmount.toLocaleString()} target
          </span>
        </div>
      </Card>

      {/* Monthly Savings Required */}
      <Card className="p-4 bg-blue-50 border-blue-200">
        <div className="flex items-start gap-3">
          <TrendingUp className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-blue-900">Required Monthly Savings</p>
            <p className="text-sm text-blue-700 mt-1">
              Save ₹{mockGoals.reduce((sum, g) => sum + (g.monthlyTarget || 0), 0).toLocaleString()}/month to achieve all goals on time
            </p>
            <p className="text-xs text-blue-600 mt-2">
              That's {((mockGoals.reduce((sum, g) => sum + (g.monthlyTarget || 0), 0) / 75000) * 100).toFixed(1)}% of your monthly income
            </p>
          </div>
        </div>
      </Card>

      {/* Goals List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg">Your Goals</h2>
          <Button size="sm" variant="outline">
            <Plus className="w-4 h-4 mr-1" />
            Add Goal
          </Button>
        </div>

        {mockGoals.map((goal) => {
          const progress = (goal.currentAmount / goal.targetAmount) * 100;
          const { status, message } = getProgressStatus(goal);
          const remaining = goal.targetAmount - goal.currentAmount;

          return (
            <Card key={goal.id} className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-medium">{goal.name}</p>
                    <Badge variant={getPriorityColor(goal.priority) as any}>
                      {goal.priority}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">{goal.category}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-blue-600">
                    {progress.toFixed(0)}%
                  </p>
                </div>
              </div>

              <div className="space-y-2 mb-3">
                <Progress value={progress} className="h-2" />
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">
                    ₹{goal.currentAmount.toLocaleString()}
                  </span>
                  <span className="text-gray-600">
                    ₹{goal.targetAmount.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">
                      {new Date(goal.deadline).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                  <Badge 
                    variant="outline" 
                    className={
                      status === "completed" ? "text-green-600 border-green-200 bg-green-50" :
                      status === "overdue" || status === "behind" ? "text-red-600 border-red-200 bg-red-50" :
                      status === "on-track" ? "text-blue-600 border-blue-200 bg-blue-50" :
                      "text-gray-600 border-gray-200 bg-gray-50"
                    }
                  >
                    {message}
                  </Badge>
                </div>
              </div>

              <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Remaining to save</span>
                  <span className="font-semibold">₹{remaining.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between text-sm mt-1">
                  <span className="text-gray-600">Monthly target</span>
                  <span className="font-semibold text-blue-600">₹{goal.monthlyTarget?.toLocaleString()}</span>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Tips */}
      <Card className="p-4 bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-amber-900 mb-2">💡 Goal Achievement Tips</p>
            <ul className="space-y-2 text-sm text-amber-800">
              <li className="flex items-start gap-2">
                <span className="shrink-0">•</span>
                <span>Set up auto-transfers on salary day to ensure consistent savings</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="shrink-0">•</span>
                <span>Your Vacation to Bali goal needs ₹17,500/month - consider reducing shopping budget</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="shrink-0">•</span>
                <span>You're ahead on Emergency Fund - great job! Consider allocating extra to New Laptop</span>
              </li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}
