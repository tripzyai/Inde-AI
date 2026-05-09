'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowLeft } from 'lucide-react';
import ChatMessage from './ChatMessage';
import OptionButton from './OptionButton';
import ProgressBar from './ProgressBar';
import TypingIndicator from './TypingIndicator';
import Button from '../ui/Button';

interface AuditChatbotOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  text: string;
  isAI: boolean;
}

interface AuditData {
  industry: string;
  automationGoal: string;
  currentProcess: string;
  biggestProblem: string;
  tools: string[];
  websiteUrl: string;
  name: string;
  email: string;
  submittedAt?: string;
}

const TOTAL_STEPS = 7;

export default function AuditChatbotOverlay({ isOpen, onClose }: AuditChatbotOverlayProps) {
  const [step, setStep] = useState(0);
  const [messages, setMessages] = useState<Message[]>([]);
  const [showTyping, setShowTyping] = useState(false);
  const [auditData, setAuditData] = useState<Partial<AuditData>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Form state
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [selectedTools, setSelectedTools] = useState<string[]>([]);
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Questions configuration
  const questions = [
    {
      text: "Hi, I'm Inde AI's workflow audit assistant. I'll ask a few quick questions to understand your business and where AI can help. This takes about 2 minutes.\n\nWhat type of business do you run?",
      options: [
        'Law Firm',
        'Dental / Healthcare Clinic',
        'Home Service Business',
        'Accounting / Tax Firm',
        'Other'
      ],
      field: 'industry',
      type: 'single'
    },
    {
      text: "What are you looking to automate or improve?",
      options: [
        'Lead capture from website',
        'Appointment or consultation booking',
        'Repetitive FAQ responses',
        'Quote requests',
        'Internal admin work',
        'Not sure yet'
      ],
      field: 'automationGoal',
      type: 'single'
    },
    {
      text: "What happens today when a visitor contacts you from your website?",
      options: [
        'They fill out a form',
        'They call us',
        'They book on Calendly or another tool',
        'They email us',
        'We use live chat',
        'The process is manual or inconsistent'
      ],
      field: 'currentProcess',
      type: 'single'
    },
    {
      text: "What is your biggest lead-handling problem right now?",
      options: [
        'We miss leads after hours',
        'Leads are not qualified',
        'Staff answer the same questions repeatedly',
        'Response time is slow',
        'Forms are too long',
        'We do not know where leads drop off'
      ],
      field: 'biggestProblem',
      type: 'single'
    },
    {
      text: "What tools do you currently use? (Select all that apply)",
      options: [
        'Website form',
        'Calendly',
        'Google Sheets',
        'HubSpot',
        'GoHighLevel',
        'Salesforce',
        'Email only',
        'Other / not sure'
      ],
      field: 'tools',
      type: 'multi'
    },
    {
      text: "What is your website URL?",
      field: 'websiteUrl',
      type: 'input'
    },
    {
      text: "What is your name and business email?",
      field: 'contact',
      type: 'contact'
    }
  ];

  // Initialize conversation
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setTimeout(() => {
        setShowTyping(true);
        setTimeout(() => {
          setShowTyping(false);
          setMessages([{ text: questions[0].text, isAI: true }]);
        }, 1500);
      }, 500);
    }
  }, [isOpen]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, showTyping]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  // Prevent body scroll when overlay is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      resetChatbot();
    }, 300);
  };

  const resetChatbot = () => {
    setStep(0);
    setMessages([]);
    setShowTyping(false);
    setAuditData({});
    setIsSubmitted(false);
    setSelectedOption('');
    setSelectedTools([]);
    setWebsiteUrl('');
    setName('');
    setEmail('');
  };

  const handleNext = () => {
    const currentQuestion = questions[step];
    let userResponse = '';
    let dataUpdate: Partial<AuditData> = {};

    // Collect user response
    if (currentQuestion.type === 'single') {
      userResponse = selectedOption;
      dataUpdate = { [currentQuestion.field]: selectedOption };
    } else if (currentQuestion.type === 'multi') {
      userResponse = selectedTools.join(', ');
      dataUpdate = { [currentQuestion.field]: selectedTools };
    } else if (currentQuestion.type === 'input') {
      userResponse = websiteUrl;
      dataUpdate = { [currentQuestion.field]: websiteUrl };
    } else if (currentQuestion.type === 'contact') {
      userResponse = `${name}\n${email}`;
      dataUpdate = { name, email };
    }

    // Add user message
    setMessages(prev => [...prev, { text: userResponse, isAI: false }]);

    // Update audit data
    setAuditData(prev => ({ ...prev, ...dataUpdate }));

    // Reset form state
    setSelectedOption('');
    setSelectedTools([]);

    // Move to next step or show summary
    if (step < questions.length - 1) {
      setShowTyping(true);
      setTimeout(() => {
        setShowTyping(false);
        setMessages(prev => [...prev, { text: questions[step + 1].text, isAI: true }]);
        setStep(step + 1);
      }, 1000);
    } else {
      // Generate final summary
      showFinalSummary({ ...auditData, ...dataUpdate } as AuditData);
    }
  };

  const showFinalSummary = (data: AuditData) => {
    const summary = `Thanks, ${data.name}. Based on your answers, the best starting point for ${data.industry} is likely an AI intake assistant focused on ${data.automationGoal}. It can help qualify visitors, collect key details, and route serious leads to your team faster. We'll review ${data.websiteUrl} and follow up with a suggested workflow audit.`;

    setShowTyping(true);
    setTimeout(() => {
      setShowTyping(false);
      setMessages(prev => [...prev, { text: summary, isAI: true }]);
      setStep(step + 1); // Move to final step
    }, 1500);
  };

  const handleBack = () => {
    if (step > 0) {
      // Remove last AI and user messages
      setMessages(prev => prev.slice(0, -2));
      setStep(step - 1);
    }
  };

  const handleSubmit = async () => {
    const finalData: AuditData = {
      ...auditData as AuditData,
      submittedAt: new Date().toISOString()
    };

    // Add conversation messages to the payload
    const dataWithMessages = {
      ...finalData,
      messages: messages
    };

    setIsSubmitted(true);
    setShowTyping(true);

    try {
      // Call the API to process the audit
      const response = await fetch('/api/submit-audit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataWithMessages),
      });

      const result = await response.json();

      if (result.success) {
        // Show confirmation message
        setTimeout(() => {
          setShowTyping(false);
          setMessages(prev => [...prev, {
            text: result.summary,
            isAI: true
          }]);
        }, 2000);

        console.log('Audit submitted successfully:', result.auditId);
        console.log('Lead score:', result.leadScore);
      } else {
        // Show error message
        setTimeout(() => {
          setShowTyping(false);
          setMessages(prev => [...prev, {
            text: "Sorry, there was an error processing your request. Please try again or contact us directly at hello@indeai.com",
            isAI: true
          }]);
        }, 1000);
        console.error('Audit submission failed:', result.error);
      }
    } catch (error) {
      // Handle network or other errors
      setTimeout(() => {
        setShowTyping(false);
        setMessages(prev => [...prev, {
          text: "Sorry, there was a connection error. Please try again or contact us directly at hello@indeai.com",
          isAI: true
        }]);
      }, 1000);
      console.error('Audit submission error:', error);
    }
  };

  const canProceed = () => {
    const currentQuestion = questions[step];
    if (!currentQuestion) return false;

    if (currentQuestion.type === 'single') return selectedOption !== '';
    if (currentQuestion.type === 'multi') return selectedTools.length > 0;
    if (currentQuestion.type === 'input') return websiteUrl.trim() !== '' && isValidUrl(websiteUrl);
    if (currentQuestion.type === 'contact') return name.trim() !== '' && email.trim() !== '' && isValidEmail(email);

    return false;
  };

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const isValidUrl = (url: string) => {
    try {
      new URL(url.startsWith('http') ? url : `https://${url}`);
      return true;
    } catch {
      return false;
    }
  };

  const currentQuestion = questions[step];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] bg-white overflow-hidden"
        >
          {/* Header */}
          <div className="border-b border-slate-200 px-6 py-4">
            <div className="max-w-5xl mx-auto flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#635bff] rounded-xl flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">I</span>
                </div>
                <span className="text-xl font-bold text-[#0f172a]">Inde AI</span>
              </div>
              <button
                onClick={handleClose}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                aria-label="Close"
              >
                <X className="w-6 h-6 text-slate-600" />
              </button>
            </div>
          </div>

          {/* Chat Container */}
          <div className="h-[calc(100vh-80px)] overflow-y-auto" ref={chatContainerRef}>
            <div className="max-w-[760px] mx-auto px-6 py-8">
              {/* Header Text */}
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-[#0f172a] mb-2">
                  Free AI Workflow Audit
                </h1>
                <p className="text-slate-600">
                  Answer a few questions and we'll suggest where an AI intake assistant can help your business.
                </p>
              </div>

              {/* Progress Bar */}
              {step < questions.length && (
                <div className="mb-8">
                  <ProgressBar current={step + 1} total={TOTAL_STEPS} />
                </div>
              )}

              {/* Messages */}
              <div className="space-y-4 mb-6">
                {messages.map((msg, idx) => (
                  <ChatMessage key={idx} message={msg.text} isAI={msg.isAI} />
                ))}

                {showTyping && (
                  <div className="flex justify-start">
                    <TypingIndicator />
                  </div>
                )}
              </div>

              {/* Input Area */}
              {!isSubmitted && step < questions.length && currentQuestion && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  {/* Single Select Options */}
                  {currentQuestion.type === 'single' && currentQuestion.options && (
                    <div className="space-y-2">
                      {currentQuestion.options.map((option, idx) => (
                        <OptionButton
                          key={idx}
                          label={option}
                          selected={selectedOption === option}
                          onClick={() => setSelectedOption(option)}
                        />
                      ))}
                    </div>
                  )}

                  {/* Multi Select Options */}
                  {currentQuestion.type === 'multi' && currentQuestion.options && (
                    <div className="space-y-2">
                      {currentQuestion.options.map((option, idx) => (
                        <OptionButton
                          key={idx}
                          label={option}
                          selected={selectedTools.includes(option)}
                          onClick={() => {
                            setSelectedTools(prev =>
                              prev.includes(option)
                                ? prev.filter(t => t !== option)
                                : [...prev, option]
                            );
                          }}
                        />
                      ))}
                    </div>
                  )}

                  {/* Website URL Input */}
                  {currentQuestion.type === 'input' && (
                    <div>
                      <input
                        type="url"
                        value={websiteUrl}
                        onChange={(e) => setWebsiteUrl(e.target.value)}
                        placeholder="https://yourcompany.com"
                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-[#635bff] transition-colors"
                      />
                    </div>
                  )}

                  {/* Contact Inputs */}
                  {currentQuestion.type === 'contact' && (
                    <div className="space-y-3">
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your full name"
                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-[#635bff] transition-colors"
                      />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@company.com"
                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-[#635bff] transition-colors"
                      />
                      {email && !isValidEmail(email) && (
                        <p className="text-sm text-red-600">Please enter a valid email address</p>
                      )}
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-4">
                    {step > 0 && (
                      <button
                        onClick={handleBack}
                        className="px-6 py-3 border-2 border-slate-200 rounded-full hover:border-[#635bff] transition-colors flex items-center gap-2"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        Back
                      </button>
                    )}
                    <Button
                      variant="primary"
                      onClick={handleNext}
                      className="flex-1"
                      disabled={!canProceed()}
                    >
                      {currentQuestion.type === 'multi' ? 'Continue' : 'Next'}
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* Final Actions */}
              {step === questions.length && !isSubmitted && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col gap-3"
                >
                  <Button variant="primary" onClick={handleSubmit} className="w-full">
                    Submit Audit Request
                  </Button>
                  <button
                    onClick={resetChatbot}
                    className="px-6 py-3 border-2 border-slate-200 rounded-full hover:border-[#635bff] transition-colors"
                  >
                    Start Over
                  </button>
                </motion.div>
              )}

              {/* Success State */}
              {isSubmitted && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-8"
                >
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <Button variant="primary" onClick={handleClose} className="mt-4">
                    Close
                  </Button>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
