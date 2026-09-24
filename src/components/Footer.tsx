import React from 'react';
import {
  MapPin,
  Phone,
  MessageSquare,
  Instagram,
  Youtube,
  Navigation,
  Sparkles,
  GraduationCap,
  LayoutDashboard,
  ShieldCheck,
  Heart
} from 'lucide-react';
import { WebsiteSettings, Language } from '../types';
import { LegalDocType } from './LegalModals';
import { translations } from '../locales/translations';

interface FooterProps {
  settings: WebsiteSettings;
  language: Language;
  onOpenLegalDoc: (type: LegalDocType) => void;
  onOpenLeadPopup: () => void;
  onOpenDemoBooking: () => void;
  onNavigateView: (view: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  settings,
  language,
  onOpenLegalDoc,
  onOpenLeadPopup,
  onOpenDemoBooking,
  onNavigateView,
}) => {
  const t = translations[language];

  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello ${settings.instituteName}, I would like to enquire about your courses.`
    );
    window.open(`https://wa.me/${settings.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-slate-300">
      {/* Prominent Quick-Action Strip */}
      <div className="border-b border-slate-800/80 bg-slate-900/60 py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-white">
                Admissions Open 2026-27 • Join Baloda Classroom or Live Online
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Call admissions desk directly at <strong>{settings.phone}</strong> or book a free trial session.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <a
                href={`tel:${settings.phone}`}
                className="flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800 px-3.5 py-2 text-xs font-semibold text-white hover:bg-slate-700 transition-colors"
              >
                <Phone className="h-3.5 w-3.5 text-emerald-400" />
                <span>{t.btnCallNow}</span>
              </a>

              <button
                onClick={handleWhatsApp}
                className="flex items-center gap-1.5 rounded-xl bg-emerald-600/20 border border-emerald-500/40 px-3.5 py-2 text-xs font-semibold text-emerald-300 hover:bg-emerald-600/30 transition-colors"
              >
                <MessageSquare className="h-3.5 w-3.5" />
                <span>{t.btnWhatsApp}</span>
              </button>

              <a
                href={settings.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-xl bg-blue-600 px-3.5 py-2 text-xs font-bold text-white hover:bg-blue-500 shadow transition-colors"
              >
                <Navigation className="h-3.5 w-3.5" />
                <span>{t.btnGetDirections}</span>
              </a>

              <button
                onClick={onOpenDemoBooking}
                className="flex items-center gap-1.5 rounded-xl bg-amber-500 px-3.5 py-2 text-xs font-bold text-slate-950 hover:bg-amber-400 shadow transition-colors"
              >
                <Sparkles className="h-3.5 w-3.5" />
                <span>{t.btnBookDemo}</span>
              </button>

              <button
                onClick={onOpenLeadPopup}
                className="rounded-xl border border-blue-500/40 bg-blue-500/10 px-3.5 py-2 text-xs font-semibold text-blue-300 hover:bg-blue-500/20 transition-colors"
              >
                {t.btnEnquireNow}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-12">
          {/* Brand & Address */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-amber-500 font-black text-white text-base">
                SP
              </div>
              <div>
                <span className="text-lg font-black text-white">{settings.instituteName}</span>
                <p className="text-[11px] text-slate-400">English • Computer • Bollywood Vocal</p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Empowering students in Chhattisgarh and learners globally with practical language fluency, government-recognized computer qualifications, and Bollywood vocal singing mastery.
            </p>

            <div className="text-xs text-slate-300 space-y-1 pt-2">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
                <span>{settings.addressLine}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-blue-400 shrink-0" />
                <span>Helpdesk: {settings.phone}</span>
              </div>
            </div>

            {/* Social media buttons */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <a
                href={settings.youtubeUrl || 'https://www.youtube.com/@makemestar'}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs text-slate-300 hover:border-red-500/40 hover:text-white transition-colors"
                title="YouTube: @makemestar"
              >
                <Youtube className="h-3.5 w-3.5 text-red-500" />
                <span>@makemestar</span>
              </a>

              <a
                href={settings.instagramUrl || 'https://www.instagram.com/santymanikpuri'}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs text-slate-300 hover:border-pink-500/40 hover:text-white transition-colors"
                title="Instagram: @santymanikpuri"
              >
                <Instagram className="h-3.5 w-3.5 text-pink-400" />
                <span>@santymanikpuri</span>
              </a>

              <a
                href={settings.whatsappUrl || 'https://wa.me/919279120271'}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs text-slate-300 hover:border-emerald-500/40 hover:text-white transition-colors"
                title="WhatsApp Desk"
              >
                <MessageSquare className="h-3.5 w-3.5 text-emerald-400" />
                <span>WhatsApp</span>
              </a>

              <a
                href={`mailto:${settings.email || 'santoshprasad8891@gmail.com'}`}
                className="flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs text-slate-300 hover:border-blue-500/40 hover:text-white transition-colors"
                title="Email Support"
              >
                <span>Email Us</span>
              </a>
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Programs</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => {
                    onNavigateView('landing');
                    setTimeout(() => {
                      document.getElementById('near-me-classes')?.scrollIntoView({ behavior: 'smooth' });
                    }, 50);
                  }}
                  className="text-blue-400 hover:text-blue-300 font-semibold transition-colors"
                >
                  Classes Near Me (Auto)
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigateView('landing');
                    setTimeout(() => {
                      document.getElementById('courses')?.scrollIntoView({ behavior: 'smooth' });
                    }, 50);
                  }}
                  className="hover:text-white transition-colors"
                >
                  Spoken English (90 Days)
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigateView('landing');
                    setTimeout(() => {
                      document.getElementById('courses')?.scrollIntoView({ behavior: 'smooth' });
                    }, 50);
                  }}
                  className="hover:text-white transition-colors"
                >
                  Computer DCA (6 Months)
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigateView('landing');
                    setTimeout(() => {
                      document.getElementById('courses')?.scrollIntoView({ behavior: 'smooth' });
                    }, 50);
                  }}
                  className="hover:text-white transition-colors"
                >
                  Computer ADCA (1 Year)
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigateView('landing');
                    setTimeout(() => {
                      document.getElementById('singing-hub')?.scrollIntoView({ behavior: 'smooth' });
                    }, 50);
                  }}
                  className="hover:text-amber-400 transition-colors"
                >
                  Bollywood Vocal & Singing
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigateView('landing');
                    setTimeout(() => {
                      document.getElementById('ai-lab')?.scrollIntoView({ behavior: 'smooth' });
                    }, 50);
                  }}
                  className="hover:text-indigo-400 transition-colors"
                >
                  AI Practice Lab
                </button>
              </li>
            </ul>
          </div>

          {/* SaaS & Portals */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Portals & Tools</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => onNavigateView('student')}
                  className="flex items-center gap-1.5 text-blue-400 hover:text-blue-300 transition-colors"
                >
                  <GraduationCap className="h-3.5 w-3.5" />
                  <span>Student LMS Dashboard</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateView('admin')}
                  className="flex items-center gap-1.5 text-indigo-400 hover:text-indigo-300 transition-colors"
                >
                  <LayoutDashboard className="h-3.5 w-3.5" />
                  <span>Admin & Leads CRM</span>
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenDemoBooking}
                  className="hover:text-white transition-colors"
                >
                  Book Free Demo Class
                </button>
              </li>
              <li>
                <a
                  href={settings.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  <span>Google Maps Location</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Privacy & Legal Policies */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Compliance & Legal
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => onOpenLegalDoc('privacy')}
                  className="hover:text-white transition-colors text-left"
                >
                  Privacy Policy (Voluntary Data)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenLegalDoc('disclaimer')}
                  className="hover:text-white transition-colors text-left"
                >
                  Classical Exclusion & AI Disclaimer
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenLegalDoc('copyright')}
                  className="hover:text-white transition-colors text-left"
                >
                  Copyright Policy & Original Music
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenLegalDoc('terms')}
                  className="hover:text-white transition-colors text-left"
                >
                  Terms & Conditions
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenLegalDoc('refund')}
                  className="hover:text-white transition-colors text-left"
                >
                  Admission & Refund Policy
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-slate-800/80 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} {settings.instituteName}. All rights reserved.
            Village Baloda, Hasuwa, Near Mobile Tower, House No. 359, Chhattisgarh.
          </div>
          <div className="flex items-center gap-1 text-[11px] text-slate-400">
            <span>Built for Baloda, Chhattisgarh & Online Students Worldwide</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
