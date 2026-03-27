import { createBrowserRouter } from "react-router";
import { Dashboard } from "./screens/Dashboard";
import { Transactions } from "./screens/Transactions";
import { Insights } from "./screens/Insights";
import { Subscriptions } from "./screens/Subscriptions";
import { Goals } from "./screens/Goals";
import { AICoach } from "./screens/AICoach";
import { Layout } from "./components/Layout";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Dashboard },
      { path: "transactions", Component: Transactions },
      { path: "insights", Component: Insights },
      { path: "subscriptions", Component: Subscriptions },
      { path: "goals", Component: Goals },
      { path: "coach", Component: AICoach },
    ],
  },
]);
