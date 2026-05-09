'use client';

import React from 'react';
import { MousePointer, MessageCircle, ClipboardCheck, UserCheck, Send, ArrowRight } from 'lucide-react';

export default function Solution() {
  const steps = [
    { icon: MousePointer, label: 'Website Visitor' },
    { icon: MessageCircle, label: 'AI Assistant' },
    { icon: ClipboardCheck, label: 'Qualification Questions' },
    { icon: UserCheck, label: 'Booking / Handoff' },
    { icon: Send, label: 'Lead Summary Sent to Team' },
  ];

  return (
    <section id="solution" className="py-24 lg:py-28 px-6 lg:px-8 bg-[#f5f3ff]">
      <div className="max-w-[1280px] mx-auto">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-4xl lg:text-5xl font-extrabold text-[#0f172a] mb-6">
            Add an AI Intake Assistant to Your Website
          </h2>
          <p className="text-lg lg:text-xl text-slate-600">
            Our assistants guide visitors through a simple conversation, answer approved FAQs, collect key details, score the lead, and notify your team with a structured summary.
          </p>
        </div>

        {/* Desktop: Horizontal Flow */}
        <div className="hidden md:flex items-center justify-between gap-4">
          {steps.map((step, index) => (
            <React.Fragment key={index}>
              <div className="flex flex-col items-center text-center flex-1">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md mb-4">
                  <step.icon className="w-8 h-8 text-[#635bff]" />
                </div>
                <p className="text-sm font-semibold text-[#0f172a]">{step.label}</p>
              </div>
              {index < steps.length - 1 && (
                <ArrowRight className="w-6 h-6 text-[#635bff] flex-shrink-0" />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Mobile: Vertical Flow */}
        <div className="md:hidden space-y-6">
          {steps.map((step, index) => (
            <div key={index} className="flex items-center gap-4">
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-md flex-shrink-0">
                <step.icon className="w-7 h-7 text-[#635bff]" />
              </div>
              <p className="text-base font-semibold text-[#0f172a]">{step.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
