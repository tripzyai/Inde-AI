'use client';

import React from 'react';
import Button from './ui/Button';

interface CTAProps {
  onOpenChatbot: () => void;
}

export default function CTA({ onOpenChatbot }: CTAProps) {
  return (
    <section className="py-24 lg:py-28 px-6 lg:px-8 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="bg-[#0f172a] rounded-3xl px-8 py-16 md:px-16 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-6">
            Ready to Capture More Qualified Leads From Your Website?
          </h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Book a free 15-minute workflow audit and we&apos;ll show you where an AI intake assistant can help your business.
          </p>
          <Button variant="primary" onClick={onOpenChatbot}>
            Book Free Workflow Audit
          </Button>
        </div>
      </div>
    </section>
  );
}
