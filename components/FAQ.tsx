'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: 'Do we need to rebuild our website?',
      answer: 'No. We add a lightweight chat widget to your existing website, similar to adding live chat or analytics.',
    },
    {
      question: 'How long does implementation take?',
      answer: 'Most pilots are delivered in 2–3 weeks after we receive your website content, FAQs, booking details, and lead routing preferences.',
    },
    {
      question: 'Can it connect to our CRM?',
      answer: 'The starter pilot includes Google Sheet or simple CRM handoff. More advanced CRM integrations can be added later.',
    },
    {
      question: 'Does the assistant give legal or medical advice?',
      answer: 'No. The assistant is designed for intake, FAQs, and routing — includes disclaimers, fallback responses, and human handoff.',
    },
    {
      question: 'What happens if the AI is unsure?',
      answer: 'It routes the visitor to human follow-up instead of guessing.',
    },
    {
      question: 'What industries do you serve?',
      answer: 'We currently focus on law firms, dental and healthcare clinics, home service businesses, and accounting/tax firms.',
    },
  ];

  return (
    <section id="faq" className="py-24 lg:py-28 px-6 lg:px-8 bg-[#f5f3ff]">
      <div className="max-w-[800px] mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-extrabold text-[#0f172a] mb-6">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white border border-slate-200 rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 flex justify-between items-center text-left hover:bg-slate-50 transition-colors"
              >
                <span className="font-bold text-[#0f172a] text-lg pr-4">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-6 h-6 text-[#635bff] flex-shrink-0 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}
                />
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-5 text-slate-600 leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
