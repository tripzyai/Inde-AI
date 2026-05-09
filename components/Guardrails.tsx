'use client';

import React from 'react';
import { CheckCircle, Users, Shield, FileText, Lock, Settings } from 'lucide-react';
import Card from './ui/Card';

export default function Guardrails() {
  const guardrails = [
    {
      icon: CheckCircle,
      title: 'Approved FAQ-based answers',
      description: 'The AI only uses responses you\'ve reviewed and approved.',
    },
    {
      icon: Users,
      title: 'Human handoff for complex questions',
      description: 'Anything outside scope is routed to a real person on your team.',
    },
    {
      icon: Shield,
      title: 'Clear disclaimers for sensitive industries',
      description: 'Built-in disclaimers for legal and medical-sensitive conversations.',
    },
    {
      icon: FileText,
      title: 'No sensitive document handling in starter pilots',
      description: 'Pilots focus on intake and routing — not document processing.',
    },
    {
      icon: Lock,
      title: 'Lead data stored securely',
      description: 'All captured data is transmitted and stored with security in mind.',
    },
    {
      icon: Settings,
      title: 'Your team stays in control',
      description: 'You approve the flows, the FAQs, and the routing rules.',
    },
  ];

  return (
    <section className="py-24 lg:py-28 px-6 lg:px-8 bg-white">
      <div className="max-w-[1280px] mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-extrabold text-[#0f172a] mb-6">
            Built With Guardrails and Human Handoff
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {guardrails.map((item, index) => (
            <Card key={index}>
              <item.icon className="w-10 h-10 text-[#635bff] mb-4" />
              <h3 className="text-lg font-bold text-[#0f172a] mb-3">
                {item.title}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {item.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
