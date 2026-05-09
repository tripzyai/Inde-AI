'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Problem from '@/components/Problem';
import Solution from '@/components/Solution';
import Industries from '@/components/Industries';
import Implementation from '@/components/Implementation';
import HowItWorks from '@/components/HowItWorks';
import LeadSummary from '@/components/LeadSummary';
import Guardrails from '@/components/Guardrails';
import FAQ from '@/components/FAQ';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';
import AuditChatbotOverlay from '@/components/chatbot/AuditChatbotOverlay';

export default function Home() {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const openChatbot = () => setIsChatbotOpen(true);
  const closeChatbot = () => setIsChatbotOpen(false);

  return (
    <>
      <Navbar onOpenChatbot={openChatbot} />
      <main>
        <Hero onOpenChatbot={openChatbot} />
        <Problem />
        <Solution />
        <Industries />
        <Implementation onOpenChatbot={openChatbot} />
        <HowItWorks />
        <LeadSummary />
        <Guardrails />
        <FAQ />
        <CTA onOpenChatbot={openChatbot} />
      </main>
      <Footer />

      <AuditChatbotOverlay isOpen={isChatbotOpen} onClose={closeChatbot} />
    </>
  );
}
