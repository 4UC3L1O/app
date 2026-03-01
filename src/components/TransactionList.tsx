import { Transaction } from '../types';
import { Trash2, ArrowUpCircle, ArrowDownCircle } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { motion } from 'motion/react';

interface Props {
  transactions: Transaction[];
  onDelete: (id: number) => void;
}

export default function TransactionList({ transactions, onDelete }: Props) {
  if (transactions.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-3xl border border-zinc-100">
        <p className="text-zinc-400">Nenhuma transação encontrada.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {transactions.map((t, index) => (
        <motion.div
          key={t.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          className="group flex items-center justify-between p-4 bg-white rounded-2xl border border-zinc-100 hover:border-emerald-100 hover:shadow-sm transition-all"
        >
          <div className="flex items-center gap-4">
            <div className={`p-2 rounded-xl ${t.type === 'income' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
              {t.type === 'income' ? <ArrowUpCircle size={24} /> : <ArrowDownCircle size={24} />}
            </div>
            <div>
              <h4 className="font-medium text-zinc-900">{t.description}</h4>
              <div className="flex items-center gap-2 text-xs text-zinc-400">
                <span>{t.category}</span>
                <span>•</span>
                <span>{format(new Date(t.date), "dd 'de' MMMM", { locale: ptBR })}</span>
                {t.dueDate && (
                  <>
                    <span>•</span>
                    <span className="text-amber-600">Venc: {format(new Date(t.dueDate), "dd/MM")}</span>
                  </>
                )}
                {t.clearingDate && (
                  <>
                    <span>•</span>
                    <span className="text-blue-600">Comp: {format(new Date(t.clearingDate), "dd/MM")}</span>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className={`font-semibold ${t.type === 'income' ? 'text-emerald-600' : 'text-red-600'}`}>
              {t.type === 'income' ? '+' : '-'} {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(t.amount)}
            </span>
            <button
              onClick={() => onDelete(t.id)}
              className="p-2 text-zinc-300 hover:text-red-500 hover:bg-red-50 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
