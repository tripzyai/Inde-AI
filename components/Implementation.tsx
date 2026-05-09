'use client';

import React from 'react';
import { Check, ClipboardList, Bot, LineChart } from 'lucide-react';
import Badge from './ui/Badge';
import Button from './ui/Button';

interface ImplementationProps {
  onOpenChatbot: () => void;
}

const phases = [
  {
    number: 1,
    title: 'Workflow Audit',
    icon: ClipboardList,
    description:
      'We review your website, lead flow, intake process, FAQs, and missed lead opportunities to identify where an AI assistant can create the most value.',
    bullets: [
      'Website lead-flow review',
      'Missed lead opportunities',
      'Recommended AI assistant flow',
      'Top FAQs to automate',
      'Lead qualification plan',
      'Implementation roadmap',
    ],
  },
  {
    number: 2,
    title: 'AI Intake Assistant Build',
    icon: Bot,
    description:
      'We design and launch a website AI assistant that answers approved questions, qualifies visitors, collects key details, and routes leads to your team.',
    bullets: [
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
    ],
  },
  {
    number: 3,
    title: 'Optimization & Support',
    icon: LineChart,
    description:
      'After launch, we review conversations, improve the assistant, update FAQs, and help your team get better lead quality over time.',
    bullets: [
      'Monthly assistant improvements',
      'FAQ and knowledge updates',
      'Prompt tuning',
      'Lead quality review',
      'Conversation review',
      'Analytics report',
      'Minor workflow updates',
      'Bug fixes',
    ],
  },
];

export default function Implementation({ onOpenChatbot }: ImplementationProps) {
  return (
    <section
      id="implementation"
      className="py-24 lg:py-28 px-6 lg:px-8 bg-white scroll-mt-24"
    >
      <div className="max-w-[1280px] mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-14 lg:mb-16">
          <div className="mb-5 flex justify-center">
            <Badge>One service, from audit to launch.</Badge>
          </div>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-[#0f172a] mb-6 tracking-tight">
            AI Intake Assistant Implementation
          </h2>
          <p className="text-lg lg:text-xl text-slate-600 leading-relaxed">
            A fixed-scope implementation service that helps service businesses add an AI intake assistant to
            their existing website — from workflow audit to launch and ongoing optimization.
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-8 sm:p-10 lg:p-12 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-3 lg:divide-x lg:divide-slate-200">
            {phases.map((phase, index) => {
              const Icon = phase.icon;
              return (
                <div
                  key={phase.number}
                  className={`flex flex-col ${
                    index > 0 ? 'mt-10 pt-10 border-t border-slate-200 lg:mt-0 lg:pt-0 lg:border-t-0' : ''
                  } ${index > 0 ? 'lg:pl-8 xl:pl-10' : ''} ${index < phases.length - 1 ? 'lg:pr-8 xl:pr-10' : ''}`}
                >
                  <div className="flex items-start gap-4 mb-5">
                    <div
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#f1efff] text-[#635bff]"
                      aria-hidden
                    >
                      <Icon className="h-6 w-6" strokeWidth={2} />
                    </div>
                    <div className="min-w-0 pt-0.5">
                      <p className="text-sm font-semibold text-[#635bff] mb-1">Phase {phase.number}</p>
                      <h3 className="text-xl font-bold text-[#0f172a] leading-snug">{phase.title}</h3>
                    </div>
                  </div>

                  <p className="text-slate-600 leading-relaxed mb-6 flex-grow">{phase.description}</p>

                  <ul className="space-y-3">
                    {phase.bullets.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-[#635bff] flex-shrink-0 mt-0.5" aria-hidden />
                        <span className="text-sm text-slate-700 leading-snug">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-12 flex justify-center">
          <Button variant="primary" className="min-w-[240px] px-10" onClick={onOpenChatbot}>
            Book Free Workflow Audit
          </Button>
        </div>
      </div>
    </section>
  );
}
