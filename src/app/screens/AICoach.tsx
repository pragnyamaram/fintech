import { useEffect, useState } from "react";
import { analyzeFinance, chatWithAI, getTransactions, getDashboard } from "../api";
import { AlertTriangle, Lightbulb, CheckCircle } from "lucide-react";

type AIData = {
  score: number;
  summary: string;
  alerts?: string[];
  suggestions?: string[];
  prediction?: {
    dailySpendRate?: number;
    predictedMonthlySpend?: number;
    predictedBalance?: number;
    daysLeft?: number;
  };
  budgetPlan?: {
    monthlyIncome?: number;
    savingsTarget?: number;
    plannedSpend?: number;
    budgetRemaining?: number;
    categoryLimits?: Record<string, number>;
    categorySpending?: Record<string, number>;
  };
  categoryBreakdown?: Record<string, number>;
};

export function AICoach() {
  const [data, setData] = useState<AIData | null>(null);
  const [error, setError] = useState("");

  const [messages, setMessages] = useState<
    { role: "ai" | "user"; text: string }[]
  >([
    {
      role: "ai",
      text: "Hi! I am your AI finance coach 💡 Ask me anything about your spending!",
    },
  ]);

  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    loadAI();
  }, []);

  const loadAI = async () => {
    try {
      setError("");
      const res = await analyzeFinance(1);
      console.log("AI DATA:", res);
      setData(res);
    } catch (err) {
      console.error("AI error:", err);
      setError(
        err instanceof Error ? err.message : "Failed to load AI insights"
      );
    }
  };

  const typeOut = async (text: string) => {
    let current = "";
    setIsTyping(true);
    setMessages((prev) => [...prev, { role: "ai", text: "" }]);

    for (let i = 0; i < text.length; i++) {
      current += text[i];
      await new Promise((r) => setTimeout(r, 10));

      setMessages((prev) => {
        const copy = [...prev];
        copy[copy.length - 1] = { role: "ai", text: current };
        return copy;
      });
    }

    setIsTyping(false);
  };

  const sendMessage = async () => {
    if (!input.trim() || !data) return;

    const userText = input;
    setMessages((prev) => [...prev, { role: "user", text: userText }]);
    setInput("");

    try {
      // ✅ Fetch fresh real data// ← check this in F12

      const reply = await chatWithAI(userText,1);
      await typeOut(reply);
    } catch (err) {
      console.error("Chat error:", err);
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: "Sorry, I could not answer right now." },
      ]);
    }
  };

  if (error) {
    return <div className="text-red-500 p-4">{error}</div>;
  }

  if (!data) {
    return <div className="text-white p-4">Loading AI data...</div>;
  }

  const alerts = data.alerts ?? [];
  const suggestions = data.suggestions ?? [];

  const cards = [
    ...alerts.map((text) => ({
      type: "warning",
      title: "Alert",
      text,
    })),
    ...suggestions.map((text) => ({
      type: "tip",
      title: "Suggestion",
      text,
    })),
  ];

  return (
    <div className="p-4 space-y-6 text-white">
      <div>
        <h1 className="text-2xl font-bold">✨ AI Coach</h1>
        <p className="text-gray-400 text-sm">
          Personalized insights powered by your spending
        </p>
      </div>

      <div className="bg-gradient-to-r from-purple-600 to-blue-500 p-5 rounded-2xl">
        <p className="text-sm text-gray-200">Financial Health Score</p>
        <h2 className="text-3xl font-bold mt-2">{data.score}/100</h2>
        <p className="text-sm mt-2 text-gray-200">{data.summary}</p>
      </div>

      <div className="space-y-3">
        {cards.length === 0 ? (
          <div className="p-4 rounded-xl bg-gray-900 text-white">
            No alerts or suggestions right now.
          </div>
        ) : (
          cards.map((card: any, i: number) => {
            const isWarning = card.type === "warning";
            const isTip = card.type === "tip";

            return (
              <div
                key={i}
                className={`p-4 rounded-xl ${
                  isWarning
                    ? "bg-orange-100 text-black"
                    : isTip
                    ? "bg-blue-100 text-black"
                    : "bg-green-100 text-black"
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  {isWarning && <AlertTriangle size={18} />}
                  {isTip && <Lightbulb size={18} />}
                  {!isWarning && !isTip && <CheckCircle size={18} />}

                  <p className="font-semibold">{card.title}</p>

                  <span className="ml-auto text-xs px-2 py-1 rounded bg-black text-white">
                    {card.type}
                  </span>
                </div>

                <p className="text-sm">{card.text}</p>
              </div>
            );
          })
        )}
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-2">💬 Ask AI Coach</h2>

        <div className="bg-black border border-gray-800 rounded-xl p-3 flex flex-col h-[320px]">
          <div className="flex-1 overflow-y-auto space-y-2">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[70%] p-2 rounded-lg text-sm ${
                  m.role === "user" ? "bg-blue-600 ml-auto" : "bg-gray-800"
                }`}
              >
                {m.text}
              </div>
            ))}

            {isTyping && (
              <div className="text-gray-400 text-sm animate-pulse">
                Typing...
              </div>
            )}
          </div>

          <div className="flex gap-2 mt-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 p-2 rounded bg-gray-900 text-sm"
              placeholder="Ask about your finances..."
            />
            <button onClick={sendMessage} className="bg-blue-600 px-4 rounded">
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

