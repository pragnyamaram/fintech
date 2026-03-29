// src/app/api.tsx
const BASE_URL = "http://localhost:8080/api";
const AI_BASE_URL = "http://localhost:8000";

export const getTransactions = async (userId: number) => {
  const res = await fetch(`${BASE_URL}/transactions/${userId}`);
  if (!res.ok) throw new Error("Failed to fetch transactions");
  return res.json();
};

export const createTransaction = async (payload: {
  amount: number;
  category: string;
  description: string;
  type: string;
  userId: number;
}) => {
  const res = await fetch(`${BASE_URL}/transactions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error("Failed to create transaction");
  return res.json();
};

export const updateTransaction = async (
  id: number,
  payload: {
    amount: number;
    category: string;
    description: string;
    type: string;
  }
) => {
  const res = await fetch(`${BASE_URL}/transactions/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error("Failed to update transaction");
  return res.json();
};

export const deleteTransaction = async (id: number) => {
  const res = await fetch(`${BASE_URL}/transactions/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Failed to delete transaction");
  return res.text();
};

export const getDashboard = async (userId: number) => {
  const res = await fetch(`${BASE_URL}/dashboard/${userId}`);
  if (!res.ok) throw new Error("Failed to fetch dashboard");
  return res.json();
};

export const analyzeFinance = async (userId: number) => {
  const transactions = await getTransactions(userId).catch(() => []);
  const dashboard = await getDashboard(userId).catch(() => null);

  const salary = dashboard?.salary ?? dashboard?.income ?? 50000;

  const res = await fetch(`${AI_BASE_URL}/analyze`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId,
      salary,
      transactions,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`AI analysis failed (${res.status}): ${text}`);
  }

  return res.json();
};

// export const chatWithAI = async (
//   message: string,
//   financeContext: object,
//   userId: number = 1
// ) => {
//   const res = await fetch(`${AI_BASE_URL}/ai/chat`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ message, userId, financeContext }),
//   });

//   if (!res.ok) throw new Error("Chat failed");
//   const data = await res.json();
//   return data.reply;
// };
export const chatWithAI = async (
  message: string,
  userId: number = 1
) => {
  const res = await fetch("http://localhost:8000/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId,
      message
    }),
  });

  if (!res.ok) {
    throw new Error("Chat failed");
  }

  const data = await res.json();
  return data.reply;
};

export const getGoals = async (userId: number) => {
  const res = await fetch(`http://localhost:8080/api/goals/${userId}`);
  if (!res.ok) throw new Error("Failed to fetch goals");
  return res.json();
};

export const createGoal = async (payload: any) => {
  const res = await fetch(`http://localhost:8080/api/goals`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  return res.json();
};