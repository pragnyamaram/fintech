import { Outlet, NavLink } from "react-router-dom";
import {
  Home,
  Receipt,
  TrendingUp,
  CreditCard,
  Target,
  Sparkles,
  MessageCircle,
} from "lucide-react";

export function AppLayout() {
  const navItems = [
    { to: "/", label: "Home", icon: Home },
    { to: "/transactions", label: "Transactions", icon: Receipt },
    { to: "/insights", label: "Insights", icon: TrendingUp },
    { to: "/subscriptions", label: "Subscriptions", icon: CreditCard },
    { to: "/goals", label: "Goals", icon: Target },
    { to: "/ai-coach", label: "AI Coach", icon: Sparkles },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* MOBILE APP CONTAINER */}
      <div className="mx-auto max-w-[430px] min-h-screen pb-20">
        <Outlet />
      </div>

      {/* BOTTOM NAV */}
      <div className="fixed bottom-0 left-0 right-0 bg-black border-t border-gray-800">
        <div className="mx-auto max-w-[430px] flex justify-around py-2 text-xs">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex flex-col items-center ${
                    isActive ? "text-blue-400" : "text-gray-400"
                  }`
                }
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </div>
      </div>
    </div>
  );
}