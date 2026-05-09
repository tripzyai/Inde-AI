'use client';

import React from 'react';
import { Scale, Heart, Home, Calculator } from 'lucide-react';
import Card from './ui/Card';

export default function Industries() {
  const industries = [
    {
      icon: Scale,
      title: 'Law Firms',
      features: [
        'Free consultation intake',
        'Case qualification',
        'Practice-area FAQs',
        'After-hours lead capture',
        'Consultation booking',
        'Lead summary for intake team',
      ],
    },
    {
      icon: Heart,
      title: 'Dental & Healthcare Clinics',
      features: [
        'Appointment inquiries',
        'Treatment FAQs',
        'New patient intake',
        'Insurance/basic pricing questions',
        'After-hours lead capture',
        'Booking handoff',
      ],
    },
    {
      icon: Home,
      title: 'Home Service Businesses',
      features: [
        'Quote request assistant',
        'Service-area qualification',
        'Emergency request routing',
        'Job details collection',
        'Callback or booking request',
        'Lead summary for dispatch team',
      ],
    },
    {
      icon: Calculator,
      title: 'Accounting & Tax Firms',
      features: [
        'Client inquiry qualification',
        'Tax season FAQs',
        'Document checklist assistant',
        'Service-fit qualification',
        'Consultation booking',
        'Lead summary for the firm',
      ],
    },
  ];

  return (
    <section id="industries" className="py-24 lg:py-28 px-6 lg:px-8 bg-white">
      <div className="max-w-[1280px] mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-extrabold text-[#0f172a] mb-6">
            Built for High-Intent Service Businesses
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {industries.map((industry, index) => (
            <Card key={index}>
              <industry.icon className="w-12 h-12 text-[#635bff] mb-6" />
              <h3 className="text-xl font-bold text-[#0f172a] mb-6">
                {industry.title}
              </h3>
              <ul className="space-y-3">
                {industry.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                    <span className="text-[#635bff] mt-1 flex-shrink-0">•</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
