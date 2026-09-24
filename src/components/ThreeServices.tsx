import React from 'react';
import {
  BookOpen,
  Laptop,
  Music,
  CheckCircle2,
  ArrowRight,
  ShieldAlert,
  Sparkles,
  Award,
  Clock,
  IndianRupee
} from 'lucide-react';
import { Language, Course } from '../types';
import { translations } from '../locales/translations';

interface ThreeServicesProps {
  language: Language;
  courses: Course[];
  onSelectCourse: (course: Course) => void;
  onEnquireCourse: (courseName: string) => void;
}

export const ThreeServices: React.FC<ThreeServicesProps> = ({
  language,
  courses,
  onSelectCourse,
  onEnquireCourse,
}) => {
  const t = translations[language];

  const englishCourse = courses.find(c => c.category === 'english') || courses[0];
  const dcaCourse = courses.find(c => c.id === 'course-comp-1') || courses[1];
  const vocalCourse = courses.find(c => c.category === 'singing') || courses[4];

  return (
    <section id="services" className="py-16 sm:py-24 bg-slate-950 border-b border-slate-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-400 border border-blue-500/20 mb-3">
            <span>Specialized Learning Pathways</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {t.servicesSectionTitle}
          </h2>
          <p className="mt-3 text-base text-slate-400">
            {t.servicesSectionSubtitle}
          </p>
        </div>

        {/* 3 Main Cards Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Card 1: English */}
          <div className="group relative flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 hover:border-blue-500/40 hover:bg-slate-900/90 transition-all shadow-xl hover:shadow-blue-500/5">
            <div>
              <div className="flex items-center justify-between">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600/15 text-blue-400 border border-blue-500/30 group-hover:scale-105 transition-transform">
                  <BookOpen className="h-7 w-7" />
                </div>
                <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-400 border border-blue-500/20">
                  Fluency & Grammar
                </span>
              </div>

              <h3 className="mt-6 text-xl font-bold text-white group-hover:text-blue-300 transition-colors">
                {t.service1Title}
              </h3>

              <p className="mt-2 text-sm text-slate-400 leading-relaxed">
                {t.service1Desc}
              </p>

              {/* Subcategories list */}
              <div className="mt-6 space-y-2.5 border-t border-slate-800/80 pt-5">
                <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  Curriculum Highlights:
                </div>
                <ul className="space-y-2 text-xs text-slate-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-blue-400 mt-0.5" />
                    <span><strong>Grammar:</strong> Tenses, Voices, Speech & Sentence Building</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-blue-400 mt-0.5" />
                    <span><strong>Vocabulary:</strong> 500+ High-frequency daily words, idioms</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-blue-400 mt-0.5" />
                    <span><strong>Writing:</strong> Letters, applications, office emails & essays</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-blue-400 mt-0.5" />
                    <span><strong>Speaking & Personality:</strong> Fluency drills, Public speaking & Interviews</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-8 border-t border-slate-800/80 pt-5">
              <div className="flex items-baseline justify-between mb-4">
                <div>
                  <span className="text-xs text-slate-400">Classroom / Online from</span>
                  <div className="text-xl font-extrabold text-white">
                    ₹{englishCourse?.offerPriceOnline || 1999}
                    <span className="text-xs font-normal text-slate-400 ml-1">/ 90 Days</span>
                  </div>
                </div>
                <div className="text-right text-xs text-slate-400">
                  Monthly: <span className="text-blue-400 font-semibold">₹{englishCourse?.monthlyFee || 899}/mo</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => englishCourse && onSelectCourse(englishCourse)}
                  className="rounded-xl border border-slate-700 bg-slate-800 px-3 py-2.5 text-xs font-semibold text-slate-200 hover:bg-slate-700 hover:text-white transition-all text-center"
                >
                  View Modules
                </button>
                <button
                  onClick={() => onEnquireCourse(englishCourse?.name || 'Spoken English')}
                  className="rounded-xl bg-blue-600 px-3 py-2.5 text-xs font-bold text-white hover:bg-blue-500 transition-all text-center shadow"
                >
                  {t.btnEnquireNow}
                </button>
              </div>
            </div>
          </div>

          {/* Card 2: Computer & Technology */}
          <div className="group relative flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 hover:border-emerald-500/40 hover:bg-slate-900/90 transition-all shadow-xl hover:shadow-emerald-500/5">
            <div>
              <div className="flex items-center justify-between">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-600/15 text-emerald-400 border border-emerald-500/30 group-hover:scale-105 transition-transform">
                  <Laptop className="h-7 w-7" />
                </div>
                <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400 border border-emerald-500/20">
                  Govt Certified • Tech
                </span>
              </div>

              <h3 className="mt-6 text-xl font-bold text-white group-hover:text-emerald-300 transition-colors">
                {t.service2Title}
              </h3>

              <p className="mt-2 text-sm text-slate-400 leading-relaxed">
                {t.service2Desc}
              </p>

              {/* Subcategories list */}
              <div className="mt-6 space-y-2.5 border-t border-slate-800/80 pt-5">
                <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  Curriculum Highlights:
                </div>
                <ul className="space-y-2 text-xs text-slate-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400 mt-0.5" />
                    <span><strong>Certificates:</strong> DCA (6 Mo) & ADCA (12 Mo) full syllabus</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400 mt-0.5" />
                    <span><strong>Office & Typing:</strong> Word, Excel, PowerPoint, Kruti Dev & English</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400 mt-0.5" />
                    <span><strong>Coding & Web:</strong> Python, C/C++, HTML/CSS, SQL database</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400 mt-0.5" />
                    <span><strong>AI & Vibe Coding:</strong> Prompt Engineering & Modern GenAI tools</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-8 border-t border-slate-800/80 pt-5">
              <div className="flex items-baseline justify-between mb-4">
                <div>
                  <span className="text-xs text-slate-400">DCA Diploma from</span>
                  <div className="text-xl font-extrabold text-white">
                    ₹{dcaCourse?.offerPriceOnline || 3399}
                    <span className="text-xs font-normal text-slate-400 ml-1">/ 6 Months</span>
                  </div>
                </div>
                <div className="text-right text-xs text-slate-400">
                  Classroom: <span className="text-emerald-400 font-semibold">₹{dcaCourse?.offerPriceOffline || 4249}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => dcaCourse && onSelectCourse(dcaCourse)}
                  className="rounded-xl border border-slate-700 bg-slate-800 px-3 py-2.5 text-xs font-semibold text-slate-200 hover:bg-slate-700 hover:text-white transition-all text-center"
                >
                  View DCA / ADCA
                </button>
                <button
                  onClick={() => onEnquireCourse(dcaCourse?.name || 'Computer DCA')}
                  className="rounded-xl bg-emerald-600 px-3 py-2.5 text-xs font-bold text-white hover:bg-emerald-500 transition-all text-center shadow"
                >
                  {t.btnEnquireNow}
                </button>
              </div>
            </div>
          </div>

          {/* Card 3: Hindi Bollywood Vocal */}
          <div className="group relative flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 hover:border-amber-500/40 hover:bg-slate-900/90 transition-all shadow-xl hover:shadow-amber-500/5">
            <div>
              <div className="flex items-center justify-between">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-600/15 text-amber-400 border border-amber-500/30 group-hover:scale-105 transition-transform">
                  <Music className="h-7 w-7" />
                </div>
                <span className="rounded-full bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-400 border border-amber-500/20">
                  Bollywood Singing
                </span>
              </div>

              <h3 className="mt-6 text-xl font-bold text-white group-hover:text-amber-300 transition-colors">
                {t.service3Title}
              </h3>

              <p className="mt-2 text-sm text-slate-400 leading-relaxed">
                {t.service3Desc}
              </p>

              {/* Exclusion callout */}
              <div className="mt-4 rounded-lg bg-amber-500/10 border border-amber-500/20 p-2.5 text-[11px] text-amber-300/90">
                <strong>Notice:</strong> Classical singing is excluded from this course. Focus is 100% on Bollywood film songs, romantic, devotional, and mic/stage singing.
              </div>

              {/* Subcategories list */}
              <div className="mt-4 space-y-2.5 border-t border-slate-800/80 pt-4">
                <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  Curriculum Highlights:
                </div>
                <ul className="space-y-2 text-xs text-slate-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-amber-400 mt-0.5" />
                    <span><strong>Voice Control:</strong> Diaphragm breathing, pitch matching (Sur)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-amber-400 mt-0.5" />
                    <span><strong>Taal & Rhythm:</strong> Keherwa, Dadra, Roopak groove timing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-amber-400 mt-0.5" />
                    <span><strong>Stage & Mic:</strong> Microphone distance, vocal dynamics & karaoke</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-amber-400 mt-0.5" />
                    <span><strong>Original Works:</strong> Exclusive original compositions & songs</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-8 border-t border-slate-800/80 pt-5">
              <div className="flex items-baseline justify-between mb-4">
                <div>
                  <span className="text-xs text-slate-400">Vocal Course from</span>
                  <div className="text-xl font-extrabold text-white">
                    ₹{vocalCourse?.offerPriceOnline || 2549}
                    <span className="text-xs font-normal text-slate-400 ml-1">/ 90 Days</span>
                  </div>
                </div>
                <div className="text-right text-xs text-slate-400">
                  Baloda Studio: <span className="text-amber-400 font-semibold">₹{vocalCourse?.offerPriceOffline || 2974}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => vocalCourse && onSelectCourse(vocalCourse)}
                  className="rounded-xl border border-slate-700 bg-slate-800 px-3 py-2.5 text-xs font-semibold text-slate-200 hover:bg-slate-700 hover:text-white transition-all text-center"
                >
                  View Singing Syllabus
                </button>
                <button
                  onClick={() => onEnquireCourse(vocalCourse?.name || 'Hindi Bollywood Vocal')}
                  className="rounded-xl bg-amber-500 px-3 py-2.5 text-xs font-bold text-slate-950 hover:bg-amber-400 transition-all text-center shadow"
                >
                  {t.btnEnquireNow}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
