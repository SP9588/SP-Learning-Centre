import React, { useState, useEffect } from 'react';
import {
  Phone,
  MessageSquare,
  MapPin,
  Menu,
  X,
  Globe,
  Sparkles,
  GraduationCap,
  LayoutDashboard,
  Music,
  Laptop,
  BookOpen,
  Youtube,
  Instagram,
  Users,
  Compass
} from 'lucide-react';
import { Language, WebsiteSettings } from '../types';
import { translations } from '../locales/translations';
import { getVisitorCount, getLiveActiveVisitors } from '../data/store';

interface HeaderProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  settings: WebsiteSettings;
  onOpenLeadPopup: () => void;
  onOpenDemoBooking: () => void;
  activeView: string;
  setActiveView: (view: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  language,
  onLanguageChange,
  settings,
  onOpenLeadPopup,
  onOpenDemoBooking,
  activeView,
  setActiveView,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [visitorTotal, setVisitorTotal] = useState<number>(1420);
  const [liveVisitors, setLiveVisitors] = useState<number>(14);

  const t = translations[language];

  useEffect(() => {
    setVisitorTotal(getVisitorCount());
    setLiveVisitors(getLiveActiveVisitors());

    // Gentle fluctuation for realistic live online presence
    const interval = setInterval(() => {
      setLiveVisitors(getLiveActiveVisitors());
      setVisitorTotal(getVisitorCount());
    }, 12000);
    return () => clearInterval(interval);
  }, []);

  const handleNavClick = (view: string, hash?: string) => {
    setActiveView(view);
    setMobileMenuOpen(false);
    if (hash) {
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    }
  };

  const openWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello ${settings.instituteName}, I am interested in your English, Computer, or Hindi Bollywood Vocal courses.`
    );
    window.open(`https://wa.me/${settings.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-950/90 backdrop-blur-md">
      {/* Top micro-bar: Live Visitors Counter + Socials + Call */}
      <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 px-4 py-1.5 text-xs text-slate-300">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2">
          {/* Location & Live Visitor Counter */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="flex items-center gap-1 text-amber-400 font-medium">
              <MapPin className="h-3.5 w-3.5" />
              <span>Baloda, Hasuwa, House 359 (CG)</span>
            </span>

            <span className="hidden sm:inline text-slate-600">|</span>

            {/* Real-time Website Visitor Counter Badge */}
            <div className="flex items-center gap-1.5 rounded-full bg-slate-800/90 px-2.5 py-0.5 border border-slate-700 text-[11px]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-emerald-400 font-semibold">{liveVisitors} Live Online</span>
              <span className="text-slate-500">•</span>
              <span className="text-slate-300">Total Visits: <strong className="text-white">{visitorTotal.toLocaleString()}</strong></span>
            </div>
          </div>

          {/* Socials & Language Switch */}
          <div className="flex items-center gap-2.5">
            {/* YouTube Link */}
            <a
              href={settings.youtubeUrl || 'https://www.youtube.com/@makemestar'}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-slate-300 hover:text-red-400 transition-colors"
              title="YouTube: @makemestar"
            >
              <Youtube className="h-3.5 w-3.5 text-red-500" />
              <span className="hidden md:inline text-[11px] font-medium">makemestar</span>
            </a>

            {/* Instagram Link */}
            <a
              href={settings.instagramUrl || 'https://www.instagram.com/santymanikpuri'}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-slate-300 hover:text-pink-400 transition-colors"
              title="Instagram: @santymanikpuri"
            >
              <Instagram className="h-3.5 w-3.5 text-pink-400" />
              <span className="hidden md:inline text-[11px] font-medium">santymanikpuri</span>
            </a>

            {/* Call Direct */}
            <a
              href={`tel:${settings.phone}`}
              className="flex items-center gap-1 text-slate-200 hover:text-white transition-colors"
            >
              <Phone className="h-3.5 w-3.5 text-emerald-400" />
              <span>{settings.phone}</span>
            </a>

            {/* WhatsApp */}
            <button
              onClick={openWhatsApp}
              className="flex items-center gap-1 rounded bg-emerald-600/30 px-2 py-0.5 text-emerald-300 hover:bg-emerald-600/40 border border-emerald-500/30 transition-colors"
            >
              <MessageSquare className="h-3 w-3" />
              <span className="font-semibold">{t.btnWhatsApp}</span>
            </button>

            {/* Language Switch */}
            <div className="flex items-center gap-1 rounded-full bg-slate-800/80 p-0.5 border border-slate-700">
              <button
                onClick={() => onLanguageChange('en')}
                className={`rounded-full px-2 py-0.5 text-[11px] font-medium transition-all ${
                  language === 'en'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                English
              </button>
              <button
                onClick={() => onLanguageChange('hi')}
                className={`rounded-full px-2 py-0.5 text-[11px] font-medium transition-all ${
                  language === 'hi'
                    ? 'bg-amber-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                हिंदी
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Brand identity */}
        <div
          onClick={() => handleNavClick('landing')}
          className="flex cursor-pointer items-center gap-3 select-none"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-amber-500 font-extrabold text-white shadow-lg shadow-blue-500/20 text-lg tracking-wider border border-white/10">
            SP
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-black tracking-tight text-white">
                {settings.instituteName}
              </span>
              <span className="hidden md:inline-flex items-center rounded bg-blue-500/10 px-1.5 py-0.5 text-[10px] font-semibold text-blue-400 border border-blue-500/20">
                Baloda • CG
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium truncate max-w-[280px] sm:max-w-md">
              {language === 'hi' ? settings.taglineHi : settings.tagline}
            </p>
          </div>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-1 text-sm font-medium text-slate-300">
          <button
            onClick={() => handleNavClick('landing')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeView === 'landing' ? 'bg-slate-800 text-white' : 'hover:text-white hover:bg-slate-900'
            }`}
          >
            {t.navHome}
          </button>
          <button
            onClick={() => handleNavClick('landing', 'near-me-classes')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-blue-300 hover:text-white hover:bg-slate-900 transition-colors"
          >
            <Compass className="h-4 w-4 text-blue-400" />
            <span>Classes Near Me</span>
          </button>
          <button
            onClick={() => handleNavClick('landing', 'courses')}
            className="px-3 py-1.5 rounded-lg hover:text-white hover:bg-slate-900 transition-colors"
          >
            {t.navCourses}
          </button>
          <button
            onClick={() => handleNavClick('landing', 'singing-hub')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:text-amber-400 hover:bg-slate-900 transition-colors"
          >
            <Music className="h-4 w-4 text-amber-400" />
            <span>{t.navSinging}</span>
          </button>
          <button
            onClick={() => handleNavClick('landing', 'ai-lab')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:text-indigo-400 hover:bg-slate-900 transition-colors"
          >
            <Sparkles className="h-4 w-4 text-indigo-400" />
            <span>{t.navAiTutors}</span>
          </button>
          <button
            onClick={() => handleNavClick('landing', 'location-contact')}
            className="px-3 py-1.5 rounded-lg hover:text-white hover:bg-slate-900 transition-colors"
          >
            {t.navContact}
          </button>
        </nav>

        {/* Action CTAs */}
        <div className="hidden sm:flex items-center gap-2">
          <button
            onClick={onOpenDemoBooking}
            className="rounded-lg border border-amber-500/40 bg-amber-500/10 px-3 py-1.5 text-xs font-semibold text-amber-300 hover:bg-amber-500/20 hover:border-amber-400 transition-all shadow-sm"
          >
            {t.btnBookDemo}
          </button>
          <button
            onClick={() => handleNavClick('student')}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
              activeView === 'student'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                : 'bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-700'
            }`}
          >
            <GraduationCap className="h-3.5 w-3.5 text-blue-400" />
            <span>{t.navStudentPortal}</span>
          </button>
          <button
            onClick={() => handleNavClick('admin')}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
              activeView === 'admin'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            <LayoutDashboard className="h-3.5 w-3.5 text-indigo-400" />
            <span>{t.navAdminPortal}</span>
          </button>
        </div>

        {/* Mobile menu hamburger */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={onOpenLeadPopup}
            className="rounded-lg bg-blue-600 px-2.5 py-1 text-xs font-bold text-white shadow"
          >
            {t.btnEnquireNow}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-900 hover:text-white"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="border-b border-slate-800 bg-slate-950 px-4 py-4 lg:hidden animate-in slide-in-from-top-2">
          <div className="grid gap-2 text-sm">
            <button
              onClick={() => handleNavClick('landing')}
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-left font-medium text-slate-200 hover:bg-slate-900"
            >
              <BookOpen className="h-4 w-4 text-blue-400" />
              <span>{t.navHome}</span>
            </button>
            <button
              onClick={() => handleNavClick('landing', 'near-me-classes')}
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-left font-medium text-blue-300 hover:bg-slate-900"
            >
              <Compass className="h-4 w-4 text-blue-400" />
              <span>Classes Near Me</span>
            </button>
            <button
              onClick={() => handleNavClick('landing', 'courses')}
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-left font-medium text-slate-200 hover:bg-slate-900"
            >
              <Laptop className="h-4 w-4 text-emerald-400" />
              <span>{t.navCourses}</span>
            </button>
            <button
              onClick={() => handleNavClick('landing', 'singing-hub')}
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-left font-medium text-slate-200 hover:bg-slate-900"
            >
              <Music className="h-4 w-4 text-amber-400" />
              <span>{t.navSinging}</span>
            </button>
            <button
              onClick={() => handleNavClick('landing', 'ai-lab')}
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-left font-medium text-slate-200 hover:bg-slate-900"
            >
              <Sparkles className="h-4 w-4 text-indigo-400" />
              <span>{t.navAiTutors}</span>
            </button>
            <button
              onClick={() => handleNavClick('landing', 'location-contact')}
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-left font-medium text-slate-200 hover:bg-slate-900"
            >
              <MapPin className="h-4 w-4 text-red-400" />
              <span>{t.navContact}</span>
            </button>

            {/* Social media links in mobile drawer */}
            <div className="flex items-center gap-3 px-3 py-2 border-t border-slate-800 my-1">
              <a
                href={settings.youtubeUrl || 'https://www.youtube.com/@makemestar'}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-red-400"
              >
                <Youtube className="h-4 w-4 text-red-500" />
                <span>YouTube (@makemestar)</span>
              </a>
              <a
                href={settings.instagramUrl || 'https://www.instagram.com/santymanikpuri'}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-pink-400"
              >
                <Instagram className="h-4 w-4 text-pink-400" />
                <span>Instagram</span>
              </a>
            </div>

            <div className="my-2 border-t border-slate-800 pt-2 grid grid-cols-2 gap-2">
              <button
                onClick={() => handleNavClick('student')}
                className="flex items-center justify-center gap-2 rounded-lg bg-blue-600/20 border border-blue-500/30 px-3 py-2 text-xs font-semibold text-blue-300"
              >
                <GraduationCap className="h-4 w-4" />
                <span>{t.navStudentPortal}</span>
              </button>
              <button
                onClick={() => handleNavClick('admin')}
                className="flex items-center justify-center gap-2 rounded-lg bg-indigo-600/20 border border-indigo-500/30 px-3 py-2 text-xs font-semibold text-indigo-300"
              >
                <LayoutDashboard className="h-4 w-4" />
                <span>{t.navAdminPortal}</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={onOpenDemoBooking}
                className="w-full rounded-lg bg-amber-500 px-3 py-2 text-center text-xs font-bold text-slate-950 shadow"
              >
                {t.btnBookDemo}
              </button>
              <a
                href={`tel:${settings.phone}`}
                className="flex items-center justify-center gap-1.5 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-center text-xs font-semibold text-slate-200"
              >
                <Phone className="h-3.5 w-3.5 text-emerald-400" />
                <span>{t.btnCallNow}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
