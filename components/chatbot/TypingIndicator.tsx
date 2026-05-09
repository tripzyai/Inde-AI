import React from 'react';

export default function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-4 py-3 bg-slate-100 rounded-2xl rounded-tl-sm w-fit">
      <span className="w-2 h-2 bg-[#635bff] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
      <span className="w-2 h-2 bg-[#635bff] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
      <span className="w-2 h-2 bg-[#635bff] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
    </div>
  );
}
