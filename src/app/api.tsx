const BASE_URL = "http://localhost:8080/api";

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
  const res = await fetch(`${BASE_URL}/ai/analyze/${userId}`, {
    method: "POST",
  });

  if (!res.ok) {
    throw new Error("AI analysis failed");
  }

  return res.json();
};