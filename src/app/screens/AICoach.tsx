import { useEffect, useState } from "react";
import { analyzeFinance } from "../api";
import { AlertTriangle, Lightbulb, CheckCircle } from "lucide-react";

export function AICoach() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    loadAI();
  }, []);

  const loadAI = async () => {
    const res = await analyzeFinance(1);
    setData(res);
  };

  if (!data) return <div className="p-4">Loading...</div>;

  // 🔥 Convert backend → UI cards
  const cards = [
    ...data.alerts.map((text: string) => ({
      type: "warning",
      title: "Alert",
      text,
    })),
    ...data.suggestions.map((text: string) => ({
      type: "tip",
      title: "Suggestion",
      text,
    })),
  ];

  return (
    <div className="p-4 space-y-4">
      {/* HEADER */}
      <h1 className="text-xl font-semibold">✨ AI Coach</h1>
      <p className="text-gray-400 text-sm">
        Personalized insights powered by your spending
      </p>

      {/* SCORE CARD */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-500 p-5 rounded-2xl">
        <p className="text-sm text-gray-200">Today's Financial Health</p>
        <h2 className="text-3xl font-bold mt-2">{data.score}/100</h2>
        <p className="text-sm mt-2 text-gray-200">{data.summary}</p>
      </div>

      {/* CARDS */}
      <div className="space-y-3">
        {cards.map((card: any, i: number) => {
          const isWarning = card.type === "warning";
          const isTip = card.type === "tip";

          return (
            <div
              key={i}
              className={`p-4 rounded-xl border ${
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
        })}
      </div>
    </div>
  );
}