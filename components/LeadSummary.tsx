'use client';

import React from 'react';
import Card from './ui/Card';

export default function LeadSummary() {
  const leadData = [
    { label: 'Name', value: 'John Smith' },
    { label: 'Phone', value: '(555) 123-4567' },
    { label: 'Email', value: 'john@example.com' },
    { label: 'Need', value: 'Car accident consultation' },
    { label: 'Location', value: 'Austin, TX' },
    { label: 'Urgency', value: 'High' },
    { label: 'Lead Score', value: '88/100' },
    { label: 'Recommended', value: 'Call within 15 minutes' },
  ];

  return (
    <section className="py-24 lg:py-28 px-6 lg:px-8 bg-[#f5f3ff]">
      <div className="max-w-[1280px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column */}
          <div className="space-y-6">
            <h2 className="text-4xl lg:text-5xl font-extrabold text-[#0f172a] leading-tight">
              Your Team Gets Clean Lead Summaries, Not Just Chat Logs
            </h2>
            <p className="text-lg lg:text-xl text-slate-600 leading-relaxed">
              Every qualified lead arrives as a structured summary — with contact info, intent, urgency, lead score, and a recommended next step. No more digging through messy chat transcripts.
            </p>
          </div>

          {/* Right Column */}
          <div>
            <Card className="shadow-md">
              <div className="bg-[#635bff] text-white px-6 py-4 -m-8 mb-6 rounded-t-3xl">
                <h3 className="text-xl font-bold">New Lead: Personal Injury Inquiry</h3>
              </div>

              <div className="space-y-4">
                {leadData.map((item, index) => (
                  <div key={index} className="flex justify-between items-start border-b border-slate-100 pb-3 last:border-0">
                    <span className="font-semibold text-[#0f172a]">{item.label}:</span>
                    <span className={`text-slate-700 text-right ${item.label === 'Lead Score' ? 'text-[#635bff] font-bold' : ''} ${item.label === 'Urgency' && item.value === 'High' ? 'text-red-600 font-semibold' : ''}`}>
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
