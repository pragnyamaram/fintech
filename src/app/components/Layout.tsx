import { Outlet, NavLink } from "react-router";
import { useEffect } from "react";
import { Home, Receipt, TrendingUp, CreditCard, Target, Sparkles, Moon } from "lucide-react";

export function Layout() {

  // OPTIONAL: Enable dark by default (remove if not needed)
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
  };

  const navItems = [
    { to: "/", icon: Home, label: "Home" },
    { to: "/transactions", icon: Receipt, label: "Transactions" },
    { to: "/insights", icon: TrendingUp, label: "Insights" },
    { to: "/subscriptions", icon: CreditCard, label: "Subscriptions" },
    { to: "/goals", icon: Target, label: "Goals" },
    { to: "/coach", icon: Sparkles, label: "AI Coach" },
  ];

  return (
    <div className="flex flex-col h-screen bg-background text-foreground max-w-md mx-auto">

      {/* Optional Theme Toggle */}
      <div className="p-3 flex justify-end">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-md border border-border hover:bg-muted transition"
        >
          <Moon className="w-4 h-4" />
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto pb-20">
        <Outlet />
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-card border-t border-border px-2 py-2">
        <div className="flex justify-around items-center">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-colors ${
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <item.icon className="w-6 h-6" />
                  <span className="text-xs">{item.label}</span>
                </>
              )}
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  );
}
