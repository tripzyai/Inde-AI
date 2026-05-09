'use client';

import React from 'react';
import { Check, Globe, Clock, Target, Users } from 'lucide-react';
import Badge from './ui/Badge';
import Button from './ui/Button';
import ChatWidget from './ui/ChatWidget';

interface HeroProps {
  onOpenChatbot: () => void;
}

export default function Hero({ onOpenChatbot }: HeroProps) {
  const proofPoints = [
    { icon: Globe, text: 'Works with your existing website' },
    { icon: Clock, text: 'Delivered in 2–3 weeks' },
    { icon: Target, text: 'Built for lead capture, intake & qualification' },
    { icon: Users, text: 'Human handoff and safe fallback included' },
  ];

  return (
    <section className="min-h-[720px] py-24 lg:py-32 px-6 lg:px-8 bg-gradient-to-b from-[#f5f3ff] to-white">
      <div className="max-w-[1280px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column */}
          <div className="space-y-8">
            <Badge>AI Intake & Lead Qualification</Badge>

            <h1 className="text-4xl lg:text-6xl xl:text-7xl font-extrabold text-[#0f172a] leading-tight">
              AI Intake Assistants That Turn Website Visitors Into{' '}
              <span className="text-[#635bff]">Qualified Leads</span>
            </h1>

            <p className="text-lg lg:text-xl text-slate-600 leading-relaxed">
              We help law firms, clinics, home service businesses, and accounting firms capture more inbound leads with AI assistants that answer questions, qualify prospects, and route them to booking or human follow-up.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="primary" onClick={onOpenChatbot}>
                Book a Free 15-Minute Workflow Audit
              </Button>
              <Button
                variant="secondary"
                onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
              >
                See Service Menu
              </Button>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 pt-4">
              {proofPoints.map((point, index) => (
                <div key={index} className="flex items-start gap-3">
                  <point.icon className="w-5 h-5 text-[#635bff] flex-shrink-0 mt-1" />
                  <span className="text-sm text-slate-700">{point.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column */}
          <div className="flex justify-center lg:justify-end">
            <ChatWidget />
          </div>
        </div>
      </div>
    </section>
  );
}
