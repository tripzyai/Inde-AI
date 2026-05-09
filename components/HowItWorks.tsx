'use client';

import React from 'react';
import Card from './ui/Card';

export default function HowItWorks() {
  const steps = [
    {
      number: '01',
      title: 'We review your website and intake process',
      description: 'We analyze your current lead flow, identify gaps, and map out the ideal AI assistant experience.',
    },
    {
      number: '02',
      title: 'We design your AI assistant flow',
      description: 'We create the conversation flow, qualification questions, FAQ responses, and routing logic.',
    },
    {
      number: '03',
      title: 'We integrate it into your existing website',
      description: 'A lightweight chat widget is added to your site — no rebuild required, similar to adding a live chat script.',
    },
    {
      number: '04',
      title: 'Your team receives qualified lead summaries',
      description: 'Every qualified lead arrives as a clean summary with contact info, need, urgency, and recommended next step.',
    },
  ];

  return (
    <section id="how-it-works" className="py-24 lg:py-28 px-6 lg:px-8 bg-white">
      <div className="max-w-[1280px] mx-auto">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-4xl lg:text-5xl font-extrabold text-[#0f172a] mb-6">
            From Website Visitor to Qualified Lead in 4 Steps
          </h2>
          <p className="text-lg lg:text-xl text-slate-600">
            No website rebuild required. The assistant is added using a lightweight website widget, similar to adding a live chat or analytics script.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <Card key={index}>
              <div className="text-6xl font-bold text-[#f1efff] mb-4">
                {step.number}
              </div>
              <h3 className="text-lg font-bold text-[#0f172a] mb-4">
                {step.title}
              </h3>
              <p className="text-slate-600 leading-relaxed text-sm">
                {step.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
