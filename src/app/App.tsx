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
        <Route element={<AppLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/subscriptions" element={<Subscriptions />} />
          <Route path="/goals" element={<Goals />} />
          <Route path="/ai-coach" element={<AICoach />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}