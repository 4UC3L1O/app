import { Transaction, Stats } from "../types";

export const api = {
  async getTransactions(): Promise<Transaction[]> {
    const res = await fetch("/api/transactions");
    return res.json();
  },
  async addTransaction(transaction: Omit<Transaction, "id" | "createdAt">): Promise<{ id: number }> {
    const res = await fetch("/api/transactions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(transaction),
    });
    return res.json();
  },
  async deleteTransaction(id: number): Promise<void> {
    await fetch(`/api/transactions/${id}`, { method: "DELETE" });
  },
  async getStats(): Promise<Stats[]> {
    const res = await fetch("/api/stats");
    return res.json();
  },
};
