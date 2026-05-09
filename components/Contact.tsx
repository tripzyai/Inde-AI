'use client';

import React, { useState } from 'react';
import Button from './ui/Button';
import Card from './ui/Card';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    website: '',
    industry: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        website: '',
        industry: '',
        message: '',
      });
      setIsSubmitted(false);
    }, 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contact" className="py-24 lg:py-28 px-6 lg:px-8 bg-[#f5f3ff]">
      <div className="max-w-[720px] mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-extrabold text-[#0f172a] mb-6">
            Request Your Free Workflow Audit
          </h2>
        </div>

        <Card>
          {isSubmitted ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-[#0f172a] mb-2">Thank You!</h3>
              <p className="text-slate-600">
                Thanks — we received your request and will follow up soon.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-[#0f172a] mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full h-12 px-4 border border-slate-200 rounded-xl focus:outline-none focus:border-[#635bff] transition-colors"
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-[#0f172a] mb-2">
                  Business Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full h-12 px-4 border border-slate-200 rounded-xl focus:outline-none focus:border-[#635bff] transition-colors"
                  placeholder="you@company.com"
                />
              </div>

              <div>
                <label htmlFor="website" className="block text-sm font-semibold text-[#0f172a] mb-2">
                  Company Website *
                </label>
                <input
                  type="url"
                  id="website"
                  name="website"
                  required
                  value={formData.website}
                  onChange={handleChange}
                  className="w-full h-12 px-4 border border-slate-200 rounded-xl focus:outline-none focus:border-[#635bff] transition-colors"
                  placeholder="https://yourcompany.com"
                />
              </div>

              <div>
                <label htmlFor="industry" className="block text-sm font-semibold text-[#0f172a] mb-2">
                  Industry *
                </label>
                <select
                  id="industry"
                  name="industry"
                  required
                  value={formData.industry}
                  onChange={handleChange}
                  className="w-full h-12 px-4 border border-slate-200 rounded-xl focus:outline-none focus:border-[#635bff] transition-colors bg-white"
                >
                  <option value="">Select your industry</option>
                  <option value="law-firm">Law Firm</option>
                  <option value="dental-healthcare">Dental/Healthcare Clinic</option>
                  <option value="home-services">Home Services</option>
                  <option value="accounting-tax">Accounting/Tax Firm</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-[#0f172a] mb-2">
                  What do you want to improve? *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-[#635bff] transition-colors resize-none"
                  placeholder="Tell us about your lead capture challenges..."
                />
              </div>

              <Button type="submit" variant="primary" className="w-full">
                Request Audit
              </Button>
            </form>
          )}
        </Card>
      </div>
    </section>
  );
}
