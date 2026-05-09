import React from 'react';
import { motion } from 'framer-motion';

interface ProgressBarProps {
  current: number;
  total: number;
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const percentage = (current / total) * 100;

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs font-medium text-slate-600">
          Step {current} of {total}
        </span>
        <span className="text-xs font-medium text-[#635bff]">
          {Math.round(percentage)}%
        </span>
      </div>
      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="h-full bg-[#635bff] rounded-full"
        />
      </div>
    </div>
  );
}
