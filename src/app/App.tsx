import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppLayout } from "./Layout";
import { Dashboard } from "./screens/Dashboard";
import { Transactions } from "./screens/Transactions";
import { Insights } from "./screens/Insights";
import { Subscriptions } from "./screens/Subscriptions";
import { Goals } from "./screens/Goals";
import { AICoach } from "./screens/AICoach";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="insights" element={<Insights />} />
          <Route path="subscriptions" element={<Subscriptions />} />
          <Route path="goals" element={<Goals />} />
          <Route path="ai-coach" element={<AICoach />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}