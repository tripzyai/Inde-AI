import React from 'react';
import { motion } from 'framer-motion';

interface ChatMessageProps {
  message: string;
  isAI: boolean;
}

export default function ChatMessage({ message, isAI }: ChatMessageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex ${isAI ? 'justify-start' : 'justify-end'} mb-4`}
    >
      <div
        className={`px-4 py-3 rounded-2xl max-w-[85%] ${
          isAI
            ? 'bg-slate-100 text-slate-900 rounded-tl-sm'
            : 'bg-[#635bff] text-white rounded-tr-sm'
        }`}
      >
        <p className="text-sm leading-relaxed whitespace-pre-wrap">{message}</p>
      </div>
    </motion.div>
  );
}
