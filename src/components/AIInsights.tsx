import { useState, useEffect } from 'react';
import { Sparkles, RefreshCw } from 'lucide-react';
import { motion } from 'motion/react';
import { Transaction } from '../types';
import { getFinancialAdvice } from '../services/geminiService';

interface Insight {
  title: string;
  description: string;
}

interface Props {
  transactions: Transaction[];
}

export default function AIInsights({ transactions }: Props) {
  const [insights, setInsights] = useState<Insight[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchInsights = async () => {
    if (transactions.length === 0) return;
    setLoading(true);
    const data = await getFinancialAdvice(transactions);
    setInsights(data.insights);
    setLoading(false);
  };

  useEffect(() => {
    if (transactions.length > 0 && insights.length === 0) {
      fetchInsights();
    }
  }, [transactions]);

  if (transactions.length === 0) return null;

  return (
    <div className="p-6 bg-emerald-50 rounded-3xl border border-emerald-100">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2 text-emerald-700">
          <Sparkles size={20} />
          <h3 className="font-semibold">Insights da IA</h3>
        </div>
        <button 
          onClick={fetchInsights}
          disabled={loading}
          className="p-2 text-emerald-600 hover:bg-emerald-100 rounded-full transition-colors disabled:opacity-50"
        >
          <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {loading ? (
          Array(3).fill(0).map((_, i) => (
            <div key={i} className="h-24 bg-white/50 animate-pulse rounded-2xl" />
          ))
        ) : (
          insights.map((insight, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-4 bg-white rounded-2xl shadow-sm border border-emerald-100/50"
            >
              <h4 className="font-bold text-emerald-900 text-sm mb-1">{insight.title}</h4>
              <p className="text-xs text-emerald-700 leading-relaxed">{insight.description}</p>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
