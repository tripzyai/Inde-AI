'use client';

import React from 'react';
import { Check } from 'lucide-react';
import Card from './ui/Card';
import Badge from './ui/Badge';
import Button from './ui/Button';

interface PricingProps {
  onOpenChatbot: () => void;
}

export default function Pricing({ onOpenChatbot }: PricingProps) {
  const pricingPlans = [
    {
      title: 'AI Lead Capture Audit',
      price: '$500',
      timeline: '3–5 days',
      description: 'Best for businesses that want to identify where AI can improve lead capture and intake.',
      includes: [
        'Website lead-flow review',
        'Missed lead opportunities',
        'Recommended AI assistant flow',
        'Top FAQs to automate',
        'Lead qualification plan',
        'Pilot proposal',
      ],
      cta: 'Start With Audit',
      highlighted: false,
    },
    {
      title: 'AI Intake Assistant Pilot',
      badge: 'Recommended',
      price: 'Starting at $3,500',
      timeline: '2–3 weeks',
      description: 'Best for businesses that want a working AI assistant on their website.',
      includes: [
        'Website AI chat assistant',
        'Industry-specific intake flow',
        'FAQ knowledge base',
        'Lead qualification questions',
        'Lead scoring',
        'Email lead alerts',
        'Calendly or booking handoff',
        'Google Sheet or CRM handoff',
        'Website integration',
        'Basic analytics',
        '1 revision round',
        '14 days post-launch support',
      ],
      cta: 'Book Pilot Call',
      highlighted: true,
    },
    {
      title: 'AI Growth & Optimization Retainer',
      price: 'Starting at $500/month',
      timeline: 'Monthly',
      description: 'Best for businesses that want the assistant improved every month.',
      includes: [
        'Monthly assistant improvements',
        'FAQ and knowledge updates',
        'Prompt tuning',
        'Lead quality review',
        'Conversation review',
        'Analytics report',
        'Minor workflow updates',
        'Bug fixes',
      ],
      cta: 'Discuss Retainer',
      highlighted: false,
    },
  ];

  return (
    <section id="services" className="py-24 lg:py-28 px-6 lg:px-8 bg-[#f5f3ff]">
      <div className="max-w-[1280px] mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-extrabold text-[#0f172a] mb-6">
            Fixed-Scope Services
          </h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {pricingPlans.map((plan, index) => (
            <div key={index} className="h-full">
              <Card className={`h-full flex flex-col ${plan.highlighted ? 'border-2 border-[#635bff] shadow-lg' : ''}`}>
                {plan.badge && (
                  <div className="mb-4">
                    <Badge>{plan.badge}</Badge>
                  </div>
                )}

                <h3 className="text-2xl font-bold text-[#0f172a] mb-2">
                  {plan.title}
                </h3>

                <div className="text-3xl font-bold text-[#635bff] mb-1">
                  {plan.price}
                </div>

                <div className="text-sm text-slate-500 mb-4">
                  Timeline: {plan.timeline}
                </div>

                <p className="text-slate-600 mb-6 leading-relaxed">
                  {plan.description}
                </p>

                <div className="mb-6 flex-grow">
                  <p className="font-semibold text-[#0f172a] mb-4">Includes:</p>
                  <ul className="space-y-3">
                    {plan.includes.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-[#635bff] flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-slate-600">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Button
                  variant={plan.highlighted ? 'primary' : 'secondary'}
                  className="w-full mt-auto"
                  onClick={onOpenChatbot}
                >
                  {plan.cta}
                </Button>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
