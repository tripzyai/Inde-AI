import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface OptionButtonProps {
  label: string;
  selected: boolean;
  onClick: () => void;
  disabled?: boolean;
}

export default function OptionButton({ label, selected, onClick, disabled = false }: OptionButtonProps) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      onClick={onClick}
      disabled={disabled}
      className={`
        relative px-4 py-3 rounded-xl border-2 transition-all duration-200 text-left w-full
        ${selected
          ? 'border-[#635bff] bg-[#f1efff] text-[#0f172a]'
          : 'border-slate-200 bg-white text-slate-700 hover:border-[#635bff]'
        }
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
      `}
    >
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">{label}</span>
        {selected && (
          <Check className="w-5 h-5 text-[#635bff]" />
        )}
      </div>
    </motion.button>
  );
}
