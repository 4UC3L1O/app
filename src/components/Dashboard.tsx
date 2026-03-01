import { Stats } from '../types';
import { TrendingUp, TrendingDown, Wallet } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { motion } from 'motion/react';

interface Props {
  stats: Stats[];
}

const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4'];

export default function Dashboard({ stats }: Props) {
  const totalIncome = stats.filter(s => s.type === 'income').reduce((acc, curr) => acc + curr.totalIncome, 0);
  const totalExpense = stats.filter(s => s.type === 'expense').reduce((acc, curr) => acc + curr.totalExpense, 0);
  const balance = totalIncome - totalExpense;

  const expenseData = stats
    .filter(s => s.type === 'expense')
    .map(s => ({ name: s.category, value: s.totalExpense }));

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div 
          whileHover={{ y: -2 }}
          className="p-6 bg-white rounded-3xl border border-zinc-100 shadow-sm"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
              <TrendingUp size={20} />
            </div>
            <span className="text-sm font-medium text-zinc-500">Receitas</span>
          </div>
          <p className="text-2xl font-bold text-emerald-600">{formatCurrency(totalIncome)}</p>
        </motion.div>

        <motion.div 
          whileHover={{ y: -2 }}
          className="p-6 bg-white rounded-3xl border border-zinc-100 shadow-sm"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-red-50 text-red-600 rounded-xl">
              <TrendingDown size={20} />
            </div>
            <span className="text-sm font-medium text-zinc-500">Despesas</span>
          </div>
          <p className="text-2xl font-bold text-red-600">{formatCurrency(totalExpense)}</p>
        </motion.div>

        <motion.div 
          whileHover={{ y: -2 }}
          className="p-6 bg-zinc-900 rounded-3xl shadow-xl shadow-zinc-900/20"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-white/10 text-white rounded-xl">
              <Wallet size={20} />
            </div>
            <span className="text-sm font-medium text-zinc-400">Saldo Atual</span>
          </div>
          <p className="text-2xl font-bold text-white">{formatCurrency(balance)}</p>
        </motion.div>
      </div>

      {expenseData.length > 0 && (
        <div className="p-6 bg-white rounded-3xl border border-zinc-100 shadow-sm">
          <h3 className="text-lg font-semibold mb-6">Distribuição de Gastos</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={expenseData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {expenseData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: number) => formatCurrency(value)}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
            {expenseData.map((entry, index) => (
              <div key={entry.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                <span className="text-xs text-zinc-500 truncate">{entry.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
