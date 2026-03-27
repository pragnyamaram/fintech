import { useEffect, useState } from "react";
import { getDashboard, analyzeFinance } from "../api";
import { ChevronRight, AlertCircle, Lightbulb, CircleCheckBig, Sparkles } from "lucide-react";

export function Dashboard() {
  const [data, setData] = useState<any>(null);
  const [ai, setAI] = useState<any>(null);

  useEffect(() => {
    const load = async () => {
      const dashboard = await getDashboard(1);
      const aiData = await analyzeFinance(1);
      setData(dashboard);
      setAI(aiData);
    };

    load();
  }, []);

  if (!data || !ai) {
    return <div className="p-4 text-white">Loading...</div>;
  }

  return (
    <div className="space-y-6 p-4">
      <div className="pt-2">
        <p className="text-sm text-white/70">Good afternoon,</p>
        <h1 className="mt-1 text-3xl font-bold">Pragnya 👋</h1>
      </div>

      <section className="rounded-3xl bg-gradient-to-br from-blue-600 to-blue-800 p-6 shadow-lg">
        <p className="text-sm text-white/90">Current Balance</p>
        <h2 className="mt-4 text-4xl font-bold">₹{Number(data.netBalance).toLocaleString()}</h2>

        <div className="mt-10 grid grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-white/80">Income</p>
            <p className="mt-1 text-xl font-semibold">₹{Number(data.totalIncome).toLocaleString()}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-white/80">Spent</p>
            <p className="mt-1 text-xl font-semibold text-red-200">
              ₹{Number(data.totalSpent).toLocaleString()}
            </p>
          </div>
        </div>

        <div className="mt-8 border-t border-white/20 pt-4 flex items-center justify-between">
          <p className="text-sm text-white/90">Savings Rate</p>
          <p className="text-lg font-semibold">{Number(data.savingsRate).toFixed(1)}%</p>
        </div>
      </section>

      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-xl font-semibold">AI Insights</h2>
          <button className="text-sm text-blue-400">View all</button>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border border-orange-500/20 bg-[#111111] p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex gap-3">
                <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-orange-500" />
                <div>
                  <p className="text-base font-semibold">High Spending Alert</p>
                  <p className="mt-2 text-sm text-white/75">
                    {ai.alerts?.[0] || "Your spending is under control."}
                  </p>
                  <button className="mt-3 text-sm font-semibold text-white">
                    Set a weekly budget →
                  </button>
                </div>
              </div>
              <span className="rounded-full bg-red-900 px-3 py-1 text-xs font-semibold text-white">
                warning
              </span>
            </div>
          </div>

          <div className="rounded-2xl border border-blue-500/20 bg-[#111111] p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex gap-3">
                <Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-blue-400" />
                <div>
                  <p className="text-base font-semibold">Unused Subscriptions Detected</p>
                  <p className="mt-2 text-sm text-white/75">
                    {ai.suggestions?.[0] || "Try reducing expenses in one category."}
                  </p>
                  <button className="mt-3 text-sm font-semibold text-white">
                    Review subscriptions →
                  </button>
                </div>
              </div>
              <span className="rounded-full bg-zinc-800 px-3 py-1 text-xs font-semibold text-white">
                tip
              </span>
            </div>
          </div>

          <div className="rounded-2xl border border-green-500/20 bg-[#111111] p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex gap-3">
                <CircleCheckBig className="mt-0.5 h-5 w-5 shrink-0 text-green-400" />
                <div>
                  <p className="text-base font-semibold">Excellent Savings Progress!</p>
                  <p className="mt-2 text-sm text-white/75">
                    You&apos;re {Number(data.savingsRate).toFixed(1)}% towards your savings goal.
                  </p>
                  <button className="mt-3 text-sm font-semibold text-white">
                    View goal details →
                  </button>
                </div>
              </div>
              <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-black">
                success
              </span>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Active Goals</h2>
          <button className="text-sm text-blue-400">View all</button>
        </div>

        <div className="rounded-2xl bg-[#111111] p-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-lg font-semibold">Emergency Fund</p>
              <p className="text-white/70">₹125,000 / ₹300,000</p>
            </div>
            <span className="rounded-full bg-red-900 px-3 py-1 text-xs font-semibold">high</span>
          </div>

          <div className="mt-6 h-2 w-full overflow-hidden rounded-full bg-white/15">
            <div className="h-full w-[42%] rounded-full bg-white" />
          </div>

          <p className="mt-4 text-sm text-white/70">41.7% complete • 2026-12-31</p>
        </div>

        <div className="mt-4 rounded-2xl bg-[#111111] p-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-lg font-semibold">Vacation to Bali</p>
              <p className="text-white/70">₹45,000 / ₹150,000</p>
            </div>
            <span className="rounded-full bg-zinc-800 px-3 py-1 text-xs font-semibold">medium</span>
          </div>

          <div className="mt-6 h-2 w-full overflow-hidden rounded-full bg-white/15">
            <div className="h-full w-[30%] rounded-full bg-white" />
          </div>

          <p className="mt-4 text-sm text-white/70">30.0% complete • 2026-08-01</p>
        </div>
      </section>

      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Recent Transactions</h2>
          <button className="text-sm text-blue-400">View all</button>
        </div>

        <div className="space-y-3">
          {data.recentTransactions?.map((txn: any) => (
            <div key={txn.id} className="border-b border-white/10 pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-base font-semibold">{txn.description}</p>
                  <p className="text-sm text-white/60">{txn.category} • {new Date(txn.timestamp).toLocaleDateString()}</p>
                </div>
                <p className={txn.type === "CREDIT" ? "text-green-400" : "text-red-400"}>
                  {txn.type === "CREDIT" ? "+" : "-"}₹{Number(txn.amount).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="h-8" />
    </div>
  );
}