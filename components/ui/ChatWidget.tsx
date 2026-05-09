'use client';

import React from 'react';
import { MessageCircle } from 'lucide-react';

export default function ChatWidget() {
  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-xl w-full max-w-[420px] overflow-hidden">
      {/* Header */}
      <div className="bg-[#635bff] text-white p-4 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
          <MessageCircle className="w-6 h-6" />
        </div>
        <div className="min-w-0">
          <div className="font-semibold truncate">Inde AI Assistant</div>
          <div className="text-xs text-white/80 flex items-center gap-1">
            <span className="w-2 h-2 bg-green-400 rounded-full flex-shrink-0"></span>
            <span className="truncate">Online • Typically replies instantly</span>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="p-6 space-y-4 min-h-[300px]">
        {/* Visitor Message */}
        <div className="flex justify-end">
          <div className="bg-[#f1efff] text-[#0f172a] rounded-2xl rounded-tr-sm px-4 py-3 max-w-[85%]">
            <p className="text-sm">I need help with a case. Can someone call me?</p>
          </div>
        </div>

        {/* AI Message */}
        <div className="flex justify-start">
          <div className="bg-slate-100 text-[#0f172a] rounded-2xl rounded-tl-sm px-4 py-3 max-w-[85%]">
            <p className="text-sm">I can collect a few details and route this to the team. What type of help do you need?</p>
          </div>
        </div>

        {/* Typing Indicator */}
        <div className="flex justify-start">
          <div className="bg-slate-100 rounded-2xl rounded-tl-sm px-4 py-3">
            <div className="flex gap-1">
              <span className="w-2 h-2 bg-[#635bff] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
              <span className="w-2 h-2 bg-[#635bff] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
              <span className="w-2 h-2 bg-[#635bff] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
            </div>
          </div>
        </div>
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-slate-200">
        <div className="flex items-center gap-2 bg-slate-50 rounded-full px-4 py-3">
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-1 bg-transparent outline-none text-sm text-[#0f172a] placeholder-slate-400 min-w-0"
            disabled
          />
          <button className="text-[#635bff] flex-shrink-0">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
