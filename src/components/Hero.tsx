import React from 'react';
import {
  Sparkles,
  ArrowRight,
  Phone,
  MessageSquare,
  MapPin,
  CheckCircle2,
  Users,
  Award,
  BookOpen,
  Laptop,
  Music
} from 'lucide-react';
import { Language, WebsiteSettings } from '../types';
import { translations } from '../locales/translations';

interface HeroProps {
  language: Language;
  settings: WebsiteSettings;
  onOpenLeadPopup: () => void;
  onOpenDemoBooking: () => void;
  onExploreCourses: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  language,
  settings,
  onOpenLeadPopup,
  onOpenDemoBooking,
  onExploreCourses,
}) => {
  const t = translations[language];

  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello ${settings.instituteName}, I want to enquire about your courses (English, Computer, Hindi Bollywood Vocal) for admissions.`
    );
    window.open(`https://wa.me/${settings.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <section className="relative overflow-hidden border-b border-slate-800 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-12 md:py-20 lg:py-24">
      {/* Background glow effects */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-96 w-96 -translate-x-1/2 rounded-full bg-blue-600/15 blur-[120px]" />
      <div className="pointer-events-none absolute top-1/3 -right-20 -z-10 h-80 w-80 rounded-full bg-amber-500/10 blur-[100px]" />
      <div className="pointer-events-none absolute bottom-0 -left-20 -z-10 h-72 w-72 rounded-full bg-indigo-600/15 blur-[100px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          {/* Main Hero Copy */}
          <div className="text-center lg:col-span-7 lg:text-left">
            {/* Admissions Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3.5 py-1.5 text-xs font-semibold text-blue-300 shadow-sm backdrop-blur-sm mb-6">
              <Sparkles className="h-3.5 w-3.5 text-amber-400 animate-pulse" />
              <span>{t.heroBadge}</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl leading-[1.15]">
              <span className="block text-slate-100">{t.heroTitlePart1}</span>
              <span className="block bg-gradient-to-r from-blue-400 via-indigo-300 to-emerald-400 bg-clip-text text-transparent">
                {t.heroTitlePart2}
              </span>
              <span className="block bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                {t.heroTitlePart3}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="mt-5 text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-normal">
              {t.heroSubtitle}
            </p>

            {/* Location pill & Near Me shortcut */}
            <div className="mt-4 flex flex-wrap items-center justify-center lg:justify-start gap-2 text-xs text-slate-400">
              <span className="inline-flex items-center gap-1 rounded bg-slate-800/80 px-2.5 py-1 text-slate-300 border border-slate-700">
                <MapPin className="h-3 w-3 text-red-400" />
                <span>Baloda, Hasuwa, House 359, Chhattisgarh</span>
              </span>
              <a
                href="#near-me-classes"
                className="inline-flex items-center gap-1 rounded bg-blue-600/20 px-2.5 py-1 text-blue-300 border border-blue-500/40 hover:bg-blue-600/30 transition-colors"
              >
                <Sparkles className="h-3 w-3 text-blue-400" />
                <span>Classes Near Me (Automated Search)</span>
              </a>
              <span className="inline-flex items-center gap-1 rounded bg-slate-800/80 px-2.5 py-1 text-emerald-300 border border-slate-700">
                <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                <span>Live Interactive Online Globally</span>
              </span>
            </div>

            {/* Action CTAs */}
            <div className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-3">
              <button
                onClick={onExploreCourses}
                className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-600/30 hover:from-blue-500 hover:to-indigo-500 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>{t.btnExploreCourses}</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={onOpenDemoBooking}
                className="flex items-center gap-2 rounded-xl border border-amber-500/50 bg-amber-500/10 px-5 py-3.5 text-sm font-bold text-amber-300 hover:bg-amber-500/20 hover:border-amber-400 transition-all active:scale-[0.98]"
              >
                <span>{t.btnBookDemo}</span>
              </button>

              <button
                onClick={handleWhatsApp}
                className="flex items-center gap-2 rounded-xl border border-emerald-500/40 bg-emerald-600/15 px-4 py-3.5 text-sm font-semibold text-emerald-300 hover:bg-emerald-600/25 transition-all"
                title="Chat on WhatsApp"
              >
                <MessageSquare className="h-4 w-4 text-emerald-400" />
                <span>{t.btnWhatsApp}</span>
              </button>

              <a
                href={`tel:${settings.phone}`}
                className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800/80 px-4 py-3.5 text-sm font-medium text-slate-200 hover:bg-slate-700 hover:text-white transition-all"
              >
                <Phone className="h-4 w-4 text-blue-400" />
                <span>{settings.phone}</span>
              </a>
            </div>

            {/* Trust Metric Badges */}
            <div className="mt-10 pt-6 border-t border-slate-800/80 grid grid-cols-3 gap-3 text-left">
              <div>
                <div className="text-xl sm:text-2xl font-black text-white">1,200+</div>
                <div className="text-xs text-slate-400">{t.heroStatStudents}</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-black text-amber-400">Baloda + Online</div>
                <div className="text-xs text-slate-400">{t.heroStatModes}</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-black text-emerald-400">24x7 AI Lab</div>
                <div className="text-xs text-slate-400">{t.heroStatSupport}</div>
              </div>
            </div>
          </div>

          {/* Hero Visual Card / 3 Highlights Showcase */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-2xl backdrop-blur-xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-500/80" />
                  <div className="h-3 w-3 rounded-full bg-amber-500/80" />
                  <div className="h-3 w-3 rounded-full bg-emerald-500/80" />
                  <span className="text-xs font-semibold text-slate-400 ml-1">SP Learning Ecosystem</span>
                </div>
                <button
                  onClick={onOpenLeadPopup}
                  className="rounded-md bg-blue-600/30 px-2.5 py-1 text-[11px] font-bold text-blue-300 border border-blue-500/40 hover:bg-blue-600/40"
                >
                  Quick Enquiry
                </button>
              </div>

              {/* 3 Streamlined Pillars */}
              <div className="space-y-3">
                {/* 1. English */}
                <div className="group rounded-xl border border-blue-500/20 bg-blue-950/20 p-3.5 hover:border-blue-500/40 transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
                      <BookOpen className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-sm font-bold text-white group-hover:text-blue-300">
                          {t.service1Title}
                        </h2>
                        <span className="text-[10px] rounded bg-blue-500/20 px-1.5 py-0.5 text-blue-300 font-medium">
                          90 Days
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-slate-400 leading-relaxed">
                        Grammar, 500+ daily vocabulary words, Spoken drills, Public speaking & Interview mastery.
                      </p>
                    </div>
                  </div>
                </div>

                {/* 2. Computer & Tech */}
                <div className="group rounded-xl border border-emerald-500/20 bg-emerald-950/20 p-3.5 hover:border-emerald-500/40 transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      <Laptop className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-sm font-bold text-white group-hover:text-emerald-300">
                          {t.service2Title}
                        </h2>
                        <span className="text-[10px] rounded bg-emerald-500/20 px-1.5 py-0.5 text-emerald-300 font-medium">
                          DCA • ADCA • AI
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-slate-400 leading-relaxed">
                        Basic IT, MS Office, Hindi/English typing, Python programming, Web dev & Vibe Coding tools.
                      </p>
                    </div>
                  </div>
                </div>

                {/* 3. Hindi Bollywood Vocal */}
                <div className="group rounded-xl border border-amber-500/20 bg-amber-950/20 p-3.5 hover:border-amber-500/40 transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
                      <Music className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-sm font-bold text-white group-hover:text-amber-300">
                          {t.service3Title}
                        </h2>
                        <span className="text-[10px] rounded bg-amber-500/20 px-1.5 py-0.5 text-amber-300 font-medium">
                          Voice Culture
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-slate-400 leading-relaxed">
                        Pitch (Sur), Rhythm (Taal), Bollywood melodies, mic technique & original studio music.
                      </p>
                      <div className="mt-1 text-[10px] font-semibold text-amber-400/90">
                        * Classical singing excluded from this course
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Institute quick address strip */}
              <div className="mt-4 rounded-lg bg-slate-950/80 p-3 text-xs border border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-slate-300 font-medium">Classroom in Baloda & Online Across India</span>
                </div>
                <button
                  onClick={onOpenDemoBooking}
                  className="text-amber-400 hover:text-amber-300 font-bold"
                >
                  Book Demo &rarr;
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
