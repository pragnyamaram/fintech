import { useState } from "react";
import { Search, Filter, ArrowUpDown } from "lucide-react";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { mockTransactions } from "../data/mockData";

export function Transactions() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [sortBy, setSortBy] = useState("date");

  const categories = ["all", ...Array.from(new Set(mockTransactions.map(t => t.category)))];

  const filteredTransactions = mockTransactions
    .filter(txn => {
      const matchesSearch = txn.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           txn.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = filterCategory === "all" || txn.category === filterCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === "date") {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      } else if (sortBy === "amount") {
        return b.amount - a.amount;
      }
      return 0;
    });

  const groupedByDate = filteredTransactions.reduce((acc, txn) => {
    const date = new Date(txn.date).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(txn);
    return acc;
  }, {} as Record<string, typeof mockTransactions>);

  const totalSpent = filteredTransactions
    .filter(t => t.type === "debit")
    .reduce((sum, t) => sum + t.amount, 0);
  
  const totalIncome = filteredTransactions
    .filter(t => t.type === "credit")
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="pb-4 bg-background text-foreground">
      
      {/* Header */}
      <div className="sticky top-0 bg-card border-b border-border p-4 space-y-4 z-10">
        <div>
          <h1 className="text-2xl">Transactions</h1>
          <p className="text-sm text-muted-foreground mt-1">
            All your transactions from SMS analysis
          </p>
        </div>

        {/* Stats */}
        <div className="flex gap-3">
          <Card className="flex-1 p-3 bg-muted border-border">
            <p className="text-xs text-muted-foreground">Income</p>
            <p className="text-lg text-green-500 mt-1">
              ₹{totalIncome.toLocaleString()}
            </p>
          </Card>

          <Card className="flex-1 p-3 bg-muted border-border">
            <p className="text-xs text-muted-foreground">Spent</p>
            <p className="text-lg text-red-500 mt-1">
              ₹{totalSpent.toLocaleString()}
            </p>
          </Card>
        </div>

        {/* Search and Filters */}
        <div className="space-y-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search transactions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-input border-border"
            />
          </div>
          
          <div className="flex gap-2">
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="flex-1 bg-input border-border">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-muted-foreground" />
                  <SelectValue />
                </div>
              </SelectTrigger>
              <SelectContent>
                {categories.map(cat => (
                  <SelectItem key={cat} value={cat}>
                    {cat === "all" ? "All Categories" : cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="flex-1 bg-input border-border">
                <div className="flex items-center gap-2">
                  <ArrowUpDown className="w-4 h-4 text-muted-foreground" />
                  <SelectValue />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date">Sort by Date</SelectItem>
                <SelectItem value="amount">Sort by Amount</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Transactions List */}
      <div className="p-4 space-y-6">
        {Object.entries(groupedByDate).map(([date, transactions]) => (
          <div key={date}>
            <p className="text-sm text-muted-foreground mb-2 px-1">
              {date}
            </p>

            <Card className="divide-y divide-border bg-card">
              {transactions.map((txn) => (
                <div key={txn.id} className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-medium truncate">
                          {txn.description}
                        </p>
                        {txn.smsSource && (
                          <Badge variant="outline" className="text-xs shrink-0">
                            SMS
                          </Badge>
                        )}
                      </div>

                      <p className="text-sm text-muted-foreground">
                        {txn.category}
                      </p>

                      {txn.merchant && (
                        <p className="text-xs text-muted-foreground mt-1">
                          {txn.merchant}
                        </p>
                      )}
                    </div>

                    <div className="text-right">
                      <p
                        className={`font-semibold ${
                          txn.type === "credit"
                            ? "text-green-500"
                            : "text-foreground"
                        }`}
                      >
                        {txn.type === "credit" ? "+" : "-"}₹
                        {txn.amount.toLocaleString()}
                      </p>

                      <p className="text-xs text-muted-foreground mt-1">
                        {new Date(txn.date).toLocaleTimeString('en-US', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </Card>
          </div>
        ))}

        {filteredTransactions.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No transactions found
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
