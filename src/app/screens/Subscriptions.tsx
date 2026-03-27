import { Calendar, AlertCircle, DollarSign, TrendingUp } from "lucide-react";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { mockSubscriptions } from "../data/mockData";

export function Subscriptions() {
  const activeSubscriptions = mockSubscriptions.filter(s => s.status === "active");
  const cancelledSubscriptions = mockSubscriptions.filter(s => s.status === "cancelled");

  const monthlyTotal = activeSubscriptions
    .filter(s => s.frequency === "monthly")
    .reduce((sum, s) => sum + s.amount, 0);
  
  const yearlyTotal = activeSubscriptions
    .filter(s => s.frequency === "yearly")
    .reduce((sum, s) => sum + s.amount, 0);

  const totalMonthly = monthlyTotal + (yearlyTotal / 12);
  const totalYearly = (monthlyTotal * 12) + yearlyTotal;

  const highRiskSubs = activeSubscriptions.filter(s => s.risk === "high");

  const formatNextBilling = (date: string) => {
    const d = new Date(date);
    const today = new Date();
    const diffTime = d.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return "Overdue";
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Tomorrow";
    if (diffDays <= 7) return `In ${diffDays} days`;
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const getRiskColor = (risk?: string) => {
    switch (risk) {
      case "high": return "text-red-600 bg-red-50 border-red-200";
      case "medium": return "text-amber-600 bg-amber-50 border-amber-200";
      case "low": return "text-green-600 bg-green-50 border-green-200";
      default: return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  return (
    <div className="p-4 pb-24 space-y-6">
      {/* Header */}
      <div className="pt-2">
        <h1 className="text-2xl">Subscriptions</h1>
        <p className="text-sm text-gray-600 mt-1">
          Track and manage your recurring expenses
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-3">
        <Card className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
          <div className="flex items-center gap-2 text-purple-700 mb-1">
            <DollarSign className="w-4 h-4" />
            <p className="text-xs">Monthly</p>
          </div>
          <p className="text-2xl text-purple-900">₹{totalMonthly.toFixed(0)}</p>
        </Card>
        
        <Card className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
          <div className="flex items-center gap-2 text-blue-700 mb-1">
            <TrendingUp className="w-4 h-4" />
            <p className="text-xs">Yearly</p>
          </div>
          <p className="text-2xl text-blue-900">₹{totalYearly.toFixed(0)}</p>
        </Card>
      </div>

      {/* Alerts */}
      {highRiskSubs.length > 0 && (
        <Card className="p-4 bg-red-50 border-red-200">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-red-900">Unused Subscriptions Detected</p>
              <p className="text-sm text-red-700 mt-1">
                {highRiskSubs.length} subscription{highRiskSubs.length > 1 ? "s" : ""} haven't been used recently. 
                You could save ₹{highRiskSubs.reduce((sum, s) => sum + s.amount, 0).toLocaleString()}/month by cancelling.
              </p>
              <Button variant="outline" size="sm" className="mt-2 text-red-700 border-red-300">
                Review Now
              </Button>
            </div>
          </div>
        </Card>
      )}

      <Tabs defaultValue="active" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="active">
            Active ({activeSubscriptions.length})
          </TabsTrigger>
          <TabsTrigger value="cancelled">
            Cancelled ({cancelledSubscriptions.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-3">
          {activeSubscriptions.map((sub) => {
            const nextBillingText = formatNextBilling(sub.nextBilling);
            const isUpcoming = nextBillingText.includes("In") || nextBillingText === "Today" || nextBillingText === "Tomorrow";

            return (
              <Card key={sub.id} className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-medium">{sub.name}</p>
                      {sub.risk && (
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${getRiskColor(sub.risk)}`}
                        >
                          {sub.risk} risk
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{sub.category}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">₹{sub.amount}</p>
                    <p className="text-xs text-gray-500">{sub.frequency}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">Next billing:</span>
                    <span className={`font-medium ${isUpcoming ? "text-orange-600" : "text-gray-900"}`}>
                      {nextBillingText}
                    </span>
                  </div>
                  <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                    Cancel
                  </Button>
                </div>
              </Card>
            );
          })}
        </TabsContent>

        <TabsContent value="cancelled" className="space-y-3">
          {cancelledSubscriptions.map((sub) => (
            <Card key={sub.id} className="p-4 bg-gray-50 border-gray-200">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-medium text-gray-700">{sub.name}</p>
                    <Badge variant="secondary" className="text-xs">
                      Cancelled
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">{sub.category}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Was ₹{sub.amount}/{sub.frequency}
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Reactivate
                </Button>
              </div>
            </Card>
          ))}
        </TabsContent>
      </Tabs>

      {/* Insights */}
      <Card className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
        <h3 className="font-medium text-green-900 mb-3">💰 Subscription Insights</h3>
        <div className="space-y-2 text-sm">
          <div className="flex items-start gap-2">
            <span className="text-green-600 shrink-0">•</span>
            <span className="text-green-800">
              You're spending {((totalMonthly / 75000) * 100).toFixed(1)}% of your income on subscriptions
            </span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-green-600 shrink-0">•</span>
            <span className="text-green-800">
              Entertainment subscriptions account for 62% of total subscription costs
            </span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-green-600 shrink-0">•</span>
            <span className="text-green-800">
              By cancelling unused subscriptions, you could save ₹{(highRiskSubs.reduce((sum, s) => sum + s.amount, 0) * 12).toLocaleString()}/year
            </span>
          </div>
        </div>
      </Card>

      {/* Add Subscription Button */}
      <Button className="w-full">
        + Add New Subscription
      </Button>
    </div>
  );
}
