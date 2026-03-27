import { useEffect, useState } from "react";
import { Search, Filter, ArrowUpDown } from "lucide-react";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  createTransaction,
  deleteTransaction,
  getTransactions,
  updateTransaction,
} from "../api";

export function Transactions() {
  const userId = 1;

  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [sortBy, setSortBy] = useState("date");

  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("DEBIT");

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editAmount, setEditAmount] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editType, setEditType] = useState("DEBIT");

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const data = await getTransactions(userId);

      const formatted = data.map((txn: any) => ({
        id: txn.id,
        amount: txn.amount,
        category: txn.category || "other",
        description: txn.description || "No description",
        type: txn.type || "DEBIT",
        date: txn.timestamp,
      }));

      setTransactions(formatted);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async () => {
    if (!amount || !category || !description) {
      alert("Please fill all fields");
      return;
    }

    await createTransaction({
      amount: Number(amount),
      category,
      description,
      type,
      userId,
    });

    setAmount("");
    setCategory("");
    setDescription("");
    setType("DEBIT");
    fetchTransactions();
  };

  const handleDelete = async (id: number) => {
    await deleteTransaction(id);
    fetchTransactions();
  };

  const startEdit = (txn: any) => {
    setEditingId(txn.id);
    setEditAmount(String(txn.amount));
    setEditCategory(txn.category);
    setEditDescription(txn.description);
    setEditType(txn.type || "DEBIT");
  };

  const handleUpdate = async () => {
    if (editingId == null) return;

    await updateTransaction(editingId, {
      amount: Number(editAmount),
      category: editCategory,
      description: editDescription,
      type: editType,
    });

    setEditingId(null);
    setEditAmount("");
    setEditCategory("");
    setEditDescription("");
    setEditType("DEBIT");
    fetchTransactions();
  };

  const categories = ["all", ...Array.from(new Set(transactions.map((t) => t.category)))];

  const filteredTransactions = transactions
    .filter((txn) => {
      const matchesSearch =
        txn.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        txn.category.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = filterCategory === "all" || txn.category === filterCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === "date") return new Date(b.date).getTime() - new Date(a.date).getTime();
      if (sortBy === "amount") return b.amount - a.amount;
      return 0;
    });

  const groupedByDate = filteredTransactions.reduce((acc, txn) => {
    const date = new Date(txn.date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
    if (!acc[date]) acc[date] = [];
    acc[date].push(txn);
    return acc;
  }, {} as Record<string, any[]>);

  if (loading) {
    return <div className="p-4">Loading transactions...</div>;
  }

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-semibold">Transactions</h1>

      <Card className="p-4 space-y-3">
        <h2 className="font-semibold">Add Transaction</h2>

        <div className="grid gap-2">
          <Input placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
          <Input placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} />
          <Input placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />

          <Select value={type} onValueChange={setType}>
            <SelectTrigger>
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="DEBIT">DEBIT</SelectItem>
              <SelectItem value="CREDIT">CREDIT</SelectItem>
            </SelectContent>
          </Select>

          <button onClick={handleAdd} className="bg-blue-500 text-white px-3 py-2 rounded">
            Add Transaction
          </button>
        </div>
      </Card>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search transactions..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9"
        />
      </div>

      <div className="flex gap-2">
        <Select value={filterCategory} onValueChange={setFilterCategory}>
          <SelectTrigger className="flex-1">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="flex-1">
            <ArrowUpDown className="w-4 h-4 mr-2" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="date">Date</SelectItem>
            <SelectItem value="amount">Amount</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        {Object.entries(groupedByDate).map(([date, txns]) => (
          <div key={date}>
            <p className="text-sm mb-2">{date}</p>

            <Card className="divide-y">
              {txns.map((txn: any) => (
                <div key={txn.id} className="p-4 space-y-3">
                  {editingId === txn.id ? (
                    <div className="space-y-2">
                      <Input value={editAmount} onChange={(e) => setEditAmount(e.target.value)} />
                      <Input value={editCategory} onChange={(e) => setEditCategory(e.target.value)} />
                      <Input value={editDescription} onChange={(e) => setEditDescription(e.target.value)} />

                      <Select value={editType} onValueChange={setEditType}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="DEBIT">DEBIT</SelectItem>
                          <SelectItem value="CREDIT">CREDIT</SelectItem>
                        </SelectContent>
                      </Select>

                      <div className="flex gap-2">
                        <button onClick={handleUpdate} className="bg-green-600 text-white px-3 py-2 rounded">
                          Save
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          className="bg-gray-500 text-white px-3 py-2 rounded"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex justify-between">
                      <div>
                        <p className="font-medium">{txn.description}</p>
                        <p className="text-sm text-muted-foreground">{txn.category}</p>
                        <p className="text-xs text-muted-foreground">{txn.type}</p>
                      </div>

                      <div className="text-right space-y-1">
                        <p className={txn.type === "CREDIT" ? "text-green-600" : ""}>
                          {txn.type === "CREDIT" ? "+" : "-"}₹{txn.amount}
                        </p>

                        <div className="flex gap-2 justify-end">
                          <button onClick={() => startEdit(txn)} className="text-blue-600 text-xs">
                            Edit
                          </button>
                          <button onClick={() => handleDelete(txn.id)} className="text-red-600 text-xs">
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </Card>
          </div>
        ))}

        {filteredTransactions.length === 0 && (
          <div className="text-center py-10 text-muted-foreground">No transactions</div>
        )}
      </div>
    </div>
  );
}