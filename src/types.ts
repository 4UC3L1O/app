export interface Transaction {
  id: number;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  date: string;
  dueDate?: string;
  clearingDate?: string;
  createdAt: string;
}

export interface Stats {
  totalIncome: number;
  totalExpense: number;
  category: string;
  type: 'income' | 'expense';
}
