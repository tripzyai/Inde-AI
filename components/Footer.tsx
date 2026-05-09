import React from 'react';

export default function Footer() {
  const links = [
    { href: '#implementation', label: 'Service' },
    { href: '#industries', label: 'Industries' },
    { href: '#how-it-works', label: 'How It Works' },
    { href: '#faq', label: 'FAQ' },
  ];

  return (
    <footer className="bg-[#0f172a] text-white py-16 px-6 lg:px-8">
      <div className="max-w-[1280px] mx-auto">
        <div className="grid md:grid-cols-2 gap-12 mb-12">
          {/* Left Column - Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-[#635bff] rounded-xl flex items-center justify-center">
                <span className="text-white text-2xl font-bold">I</span>
              </div>
              <span className="text-2xl font-bold">Inde AI</span>
            </div>
            <p className="text-slate-400 max-w-md">
              AI Intake & Lead Qualification Assistants for Service Businesses
            </p>
          </div>

          {/* Right Column - Links */}
          <div>
            <div className="flex flex-wrap gap-6">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 pt-8">
          <p className="text-slate-400 text-sm text-center">
            © 2026 Inde AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
