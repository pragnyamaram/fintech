import { Sparkles, TrendingUp, AlertCircle, CheckCircle, Info, Lightbulb, ArrowRight } from "lucide-react";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { mockAIInsights } from "../data/mockData";
import { motion } from "motion/react";

export function AICoach() {
  const warnings = mockAIInsights.filter(i => i.type === "warning");
  const tips = mockAIInsights.filter(i => i.type === "tip");
  const successes = mockAIInsights.filter(i => i.type === "success");
  const infos = mockAIInsights.filter(i => i.type === "info");

  const getInsightIcon = (type: string) => {
    switch (type) {
      case "warning":
        return <AlertCircle className="w-6 h-6 text-orange-500" />;
      case "success":
        return <CheckCircle className="w-6 h-6 text-green-500" />;
      case "tip":
        return <Lightbulb className="w-6 h-6 text-blue-500" />;
      case "info":
        return <Info className="w-6 h-6 text-purple-500" />;
      default:
        return <Sparkles className="w-6 h-6 text-gray-500" />;
    }
  };

  const getInsightCardStyle = (type: string) => {
    switch (type) {
      case "warning":
        return "border-orange-200 bg-orange-50";
      case "success":
        return "border-green-200 bg-green-50";
      case "tip":
        return "border-blue-200 bg-blue-50";
      case "info":
        return "border-purple-200 bg-purple-50";
      default:
        return "border-gray-200 bg-gray-50";
    }
  };

  const getBadgeVariant = (type: string) => {
    switch (type) {
      case "warning":
        return "destructive";
      case "success":
        return "default";
      default:
        return "secondary";
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="p-4 pb-24 space-y-6">
      {/* Header */}
      <div className="pt-2">
        <div className="flex items-center gap-2 mb-1">
          <Sparkles className="w-6 h-6 text-purple-600" />
          <h1 className="text-2xl">AI Coach</h1>
        </div>
        <p className="text-sm text-gray-600 mt-1">
          Personalized insights powered by your spending behavior
        </p>
      </div>

      {/* Daily Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="p-6 bg-gradient-to-br from-purple-600 to-indigo-600 text-white">
          <div className="flex items-center gap-2 text-purple-100 mb-2">
            <TrendingUp className="w-5 h-5" />
            <span className="text-sm">Today's Financial Health Score</span>
          </div>
          <h2 className="text-4xl mb-3">7.5/10</h2>
          <p className="text-sm text-purple-100 leading-relaxed">
            You're doing well! Your spending is under control, but there are opportunities 
            to save more by canceling unused subscriptions and reducing weekend dining expenses.
          </p>
        </Card>
      </motion.div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg mb-3">Recommended Actions</h2>
        <div className="space-y-2">
          <Button 
            variant="outline" 
            className="w-full justify-between h-auto py-3 px-4"
          >
            <div className="flex items-center gap-3 text-left">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                <AlertCircle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="font-medium">Cancel unused subscriptions</p>
                <p className="text-sm text-gray-600">Save ₹1,548/year</p>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-gray-400" />
          </Button>

          <Button 
            variant="outline" 
            className="w-full justify-between h-auto py-3 px-4"
          >
            <div className="flex items-center gap-3 text-left">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                <TrendingUp className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="font-medium">Set food delivery budget</p>
                <p className="text-sm text-gray-600">Reduce spending by 30%</p>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-gray-400" />
          </Button>

          <Button 
            variant="outline" 
            className="w-full justify-between h-auto py-3 px-4"
          >
            <div className="flex items-center gap-3 text-left">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="font-medium">Increase emergency fund</p>
                <p className="text-sm text-gray-600">You're ahead of schedule!</p>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-gray-400" />
          </Button>
        </div>
      </div>

      {/* Insights by Category */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4 h-auto">
          <TabsTrigger value="all" className="text-xs py-2">
            All ({mockAIInsights.length})
          </TabsTrigger>
          <TabsTrigger value="warnings" className="text-xs py-2">
            Warnings ({warnings.length})
          </TabsTrigger>
          <TabsTrigger value="tips" className="text-xs py-2">
            Tips ({tips.length})
          </TabsTrigger>
          <TabsTrigger value="success" className="text-xs py-2">
            Wins ({successes.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-3">
          {mockAIInsights.map((insight, index) => (
            <motion.div
              key={insight.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className={`p-4 ${getInsightCardStyle(insight.type)}`}>
                <div className="flex gap-3">
                  <div className="shrink-0 mt-0.5">
                    {getInsightIcon(insight.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <p className="font-medium">{insight.title}</p>
                      <Badge variant={getBadgeVariant(insight.type) as any} className="text-xs shrink-0">
                        {insight.type}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed mb-2">
                      {insight.message}
                    </p>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-gray-500">
                        {formatTimestamp(insight.timestamp)}
                        {insight.category && ` • ${insight.category}`}
                      </p>
                      {insight.action && (
                        <Button variant="link" size="sm" className="h-auto p-0 text-xs">
                          {insight.action} →
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </TabsContent>

        <TabsContent value="warnings" className="space-y-3">
          {warnings.map((insight, index) => (
            <motion.div
              key={insight.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className={`p-4 ${getInsightCardStyle(insight.type)}`}>
                <div className="flex gap-3">
                  <div className="shrink-0 mt-0.5">
                    {getInsightIcon(insight.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <p className="font-medium">{insight.title}</p>
                      <Badge variant="destructive" className="text-xs shrink-0">
                        {insight.type}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed mb-2">
                      {insight.message}
                    </p>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-gray-500">
                        {formatTimestamp(insight.timestamp)}
                        {insight.category && ` • ${insight.category}`}
                      </p>
                      {insight.action && (
                        <Button variant="link" size="sm" className="h-auto p-0 text-xs">
                          {insight.action} →
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </TabsContent>

        <TabsContent value="tips" className="space-y-3">
          {tips.map((insight, index) => (
            <motion.div
              key={insight.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className={`p-4 ${getInsightCardStyle(insight.type)}`}>
                <div className="flex gap-3">
                  <div className="shrink-0 mt-0.5">
                    {getInsightIcon(insight.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <p className="font-medium">{insight.title}</p>
                      <Badge variant="secondary" className="text-xs shrink-0">
                        {insight.type}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed mb-2">
                      {insight.message}
                    </p>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-gray-500">
                        {formatTimestamp(insight.timestamp)}
                        {insight.category && ` • ${insight.category}`}
                      </p>
                      {insight.action && (
                        <Button variant="link" size="sm" className="h-auto p-0 text-xs">
                          {insight.action} →
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </TabsContent>

        <TabsContent value="success" className="space-y-3">
          {successes.map((insight, index) => (
            <motion.div
              key={insight.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className={`p-4 ${getInsightCardStyle(insight.type)}`}>
                <div className="flex gap-3">
                  <div className="shrink-0 mt-0.5">
                    {getInsightIcon(insight.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <p className="font-medium">{insight.title}</p>
                      <Badge variant="default" className="text-xs shrink-0">
                        {insight.type}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed mb-2">
                      {insight.message}
                    </p>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-gray-500">
                        {formatTimestamp(insight.timestamp)}
                        {insight.category && ` • ${insight.category}`}
                      </p>
                      {insight.action && (
                        <Button variant="link" size="sm" className="h-auto p-0 text-xs">
                          {insight.action} →
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </TabsContent>
      </Tabs>

      {/* Ask AI Coach */}
      <Card className="p-6 bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-200">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h3 className="font-medium text-gray-900 mb-2">Ask Your AI Coach</h3>
          <p className="text-sm text-gray-600 mb-4">
            Get personalized financial advice based on your spending patterns
          </p>
          <Button className="w-full bg-gradient-to-r from-purple-600 to-indigo-600">
            Start Conversation
          </Button>
        </div>
      </Card>
    </div>
  );
}
