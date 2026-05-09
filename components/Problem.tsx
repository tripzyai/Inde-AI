'use client';

import React from 'react';
import { FileX, Clock, MessageSquare } from 'lucide-react';
import Card from './ui/Card';

export default function Problem() {
  const problems = [
    {
      icon: FileX,
      title: 'Visitors leave when forms feel too long',
      description: 'Long intake forms create friction. Visitors drop off before they even submit their information.',
    },
    {
      icon: Clock,
      title: 'Teams miss inquiries after hours or during busy periods',
      description: 'Leads don\'t wait. If no one responds quickly, they move to the next business in the search results.',
    },
    {
      icon: MessageSquare,
      title: 'Staff spend time answering the same questions repeatedly',
      description: 'Repetitive FAQs eat into your team\'s time. Time that could be spent closing deals or serving clients.',
    },
  ];

  return (
    <section id="problem" className="py-24 lg:py-28 px-6 lg:px-8 bg-white">
      <div className="max-w-[1280px] mx-auto">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-4xl lg:text-5xl font-extrabold text-[#0f172a] mb-6">
            Most SMB Websites Lose Leads Before Anyone Responds
          </h2>
          <p className="text-lg lg:text-xl text-slate-600">
            Your website should do more than display information. It should help visitors take the next step while your team gets clean, qualified lead information.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {problems.map((problem, index) => (
            <Card key={index}>
              <problem.icon className="w-12 h-12 text-[#635bff] mb-6" />
              <h3 className="text-xl font-bold text-[#0f172a] mb-4">
                {problem.title}
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {problem.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
