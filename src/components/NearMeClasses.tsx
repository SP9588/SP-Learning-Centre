import React, { useState } from 'react';
import {
  MapPin,
  Sparkles,
  Globe,
  CheckCircle2,
  Navigation,
  BookOpen,
  Monitor,
  Music,
  Phone,
  MessageSquare,
  ArrowRight,
  ShieldCheck,
  Award
} from 'lucide-react';
import { Language, WebsiteSettings } from '../types';
import { translations } from '../locales/translations';

interface NearMeClassesProps {
  language: Language;
  settings: WebsiteSettings;
  onOpenLeadPopup: (courseName?: string) => void;
  onOpenDemoBooking: (courseName?: string) => void;
}

const COMMON_REGIONS = [
  { name: 'Baloda / Hasuwa (Local Centre)', isLocal: true, tag: 'Campus & Online' },
  { name: 'Bilaspur & Janjgir', isLocal: true, tag: 'Campus & Online' },
  { name: 'Raipur & Durg-Bhilai', isLocal: true, tag: 'Live Online + Verified Delivery' },
  { name: 'Delhi NCR & UP', isLocal: false, tag: 'Live Online 1-on-1 & Batches' },
  { name: 'Bihar & Jharkhand', isLocal: false, tag: 'Live Online Interactive' },
  { name: 'Mumbai & Maharashtra', isLocal: false, tag: 'Live Online Interactive' },
  { name: 'Bengaluru & South India', isLocal: false, tag: 'Live Online English & Tech' },
  { name: 'International / NRI Students', isLocal: false, tag: 'Global Timezone Batches' },
];

export const NearMeClasses: React.FC<NearMeClassesProps> = ({
  language,
  settings,
  onOpenLeadPopup,
  onOpenDemoBooking,
}) => {
  const t = translations[language];
  const [selectedRegion, setSelectedRegion] = useState<string>('Baloda / Hasuwa (Local Centre)');
  const [customLocation, setCustomLocation] = useState<string>('');
  const [isAutoDetecting, setIsAutoDetecting] = useState<boolean>(false);
  const [detectedLocationName, setDetectedLocationName] = useState<string>('');

  const activeLocation = customLocation.trim() || detectedLocationName || selectedRegion;

  const handleAutoDetect = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }
    setIsAutoDetecting(true);
    navigator.geolocation.getCurrentPosition(
      position => {
        setIsAutoDetecting(false);
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        // Check if roughly near Chhattisgarh coordinates
        if (lat >= 20.0 && lat <= 24.5 && lng >= 80.0 && lng <= 84.5) {
          setDetectedLocationName('Your Area in Chhattisgarh');
        } else {
          setDetectedLocationName('Your City (Live Online Batches Available)');
        }
      },
      () => {
        setIsAutoDetecting(false);
        // Fallback gracefully without error
        setDetectedLocationName('Online Direct Classroom (Any Location)');
      },
      { timeout: 8000 }
    );
  };

  return (
    <section id="near-me-classes" className="relative py-20 bg-slate-900/40 border-t border-slate-800">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-96 bg-blue-600/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3.5 py-1 text-xs font-semibold text-blue-300 mb-3">
            <MapPin className="h-3.5 w-3.5 text-blue-400" />
            <span>Automated Location-Based Educational Access</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Spoken English, Computer &amp; Singing Classes <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-amber-400">Near Me</span>
          </h2>

          <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
            Whether you live right next to our physical institute at <strong>House No. 359, Village Baloda, Chhattisgarh</strong> or anywhere in India &amp; globally, SP SOLUTIONS automatically connects you with tailored batches, practical labs, and personal mentorship.
          </p>
        </div>

        {/* Location Selector Bar */}
        <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-5 mb-12 shadow-xl backdrop-blur-md">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2.5 w-full md:w-auto">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white shrink-0">
                <Navigation className="h-4 w-4" />
              </div>
              <div>
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                  Current View For
                </span>
                <span className="text-sm font-bold text-white flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  {activeLocation}
                </span>
              </div>
            </div>

            {/* Region quick chips */}
            <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
              {COMMON_REGIONS.slice(0, 4).map(reg => (
                <button
                  key={reg.name}
                  onClick={() => {
                    setSelectedRegion(reg.name);
                    setCustomLocation('');
                    setDetectedLocationName('');
                  }}
                  className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-all ${
                    selectedRegion === reg.name && !customLocation && !detectedLocationName
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-white border border-slate-800'
                  }`}
                >
                  {reg.name}
                </button>
              ))}

              <button
                onClick={handleAutoDetect}
                disabled={isAutoDetecting}
                className="flex items-center gap-1 rounded-lg border border-indigo-500/40 bg-indigo-500/10 px-2.5 py-1 text-xs font-semibold text-indigo-300 hover:bg-indigo-500/20 transition-all"
              >
                <Sparkles className="h-3 w-3" />
                <span>{isAutoDetecting ? 'Detecting...' : 'Detect Near Me'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* 3 Pillar Cards Targeted "Near Me" */}
        <div className="grid gap-6 md:grid-cols-3 mb-12">
          {/* Pillar 1: Spoken English */}
          <div className="group rounded-3xl border border-slate-800 bg-slate-950 p-6 hover:border-blue-500/40 transition-all shadow-lg flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  <BookOpen className="h-6 w-6" />
                </div>
                <span className="rounded-full bg-blue-500/10 px-2.5 py-0.5 text-[11px] font-bold text-blue-300">
                  90 Days Course
                </span>
              </div>

              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                Spoken English Classes Near Me
              </h3>

              <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                Remove hesitation and gain natural conversational fluency with daily interactive practice in {activeLocation}.
              </p>

              <ul className="space-y-2 text-xs text-slate-300 mb-6">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                  <span>Daily live conversation partner drills</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                  <span>500+ Daily usable vocabulary &amp; idioms</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                  <span>Interview training &amp; Personality Development</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                  <span>Baloda classroom or Live Mobile/PC app</span>
                </li>
              </ul>
            </div>

            <div className="pt-4 border-t border-slate-900 flex items-center gap-2">
              <button
                onClick={() => onOpenDemoBooking('Spoken English & Communication Mastery')}
                className="w-full rounded-xl bg-blue-600 px-3.5 py-2 text-xs font-bold text-white hover:bg-blue-500 transition-colors"
              >
                Book Free English Demo
              </button>
              <button
                onClick={() => onOpenLeadPopup('Spoken English & Communication Mastery')}
                className="rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-slate-300 hover:bg-slate-800"
              >
                Fees
              </button>
            </div>
          </div>

          {/* Pillar 2: Computer & IT (DCA / ADCA) */}
          <div className="group rounded-3xl border border-slate-800 bg-slate-950 p-6 hover:border-emerald-500/40 transition-all shadow-lg flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <Monitor className="h-6 w-6" />
                </div>
                <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-bold text-emerald-300">
                  DCA • ADCA • IT
                </span>
              </div>

              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                Computer Classes Near Me
              </h3>

              <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                Govt-recognized diploma courses (DCA/ADCA), MS Office, Hindi/English typing, and Python coding near {activeLocation}.
              </p>

              <ul className="space-y-2 text-xs text-slate-300 mb-6">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                  <span>DCA (6 Mos) &amp; ADCA (1 Yr) Recognized Diplomas</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                  <span>CPCT / Kruti Dev &amp; Mangal Typing Lab</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                  <span>Advanced Excel, VLOOKUP, Pivot &amp; Billing</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                  <span>Python, Web Development &amp; AI Vibe Coding</span>
                </li>
              </ul>
            </div>

            <div className="pt-4 border-t border-slate-900 flex items-center gap-2">
              <button
                onClick={() => onOpenDemoBooking('DCA (Diploma in Computer Applications)')}
                className="w-full rounded-xl bg-emerald-600 px-3.5 py-2 text-xs font-bold text-white hover:bg-emerald-500 transition-colors"
              >
                Book Computer Demo
              </button>
              <button
                onClick={() => onOpenLeadPopup('DCA (Diploma in Computer Applications)')}
                className="rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-slate-300 hover:bg-slate-800"
              >
                Fees
              </button>
            </div>
          </div>

          {/* Pillar 3: Hindi Bollywood Vocal */}
          <div className="group rounded-3xl border border-slate-800 bg-slate-950 p-6 hover:border-amber-500/40 transition-all shadow-lg flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  <Music className="h-6 w-6" />
                </div>
                <span className="rounded-full bg-amber-500/10 px-2.5 py-0.5 text-[11px] font-bold text-amber-300">
                  Vocal Mastery
                </span>
              </div>

              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">
                Singing Classes Near Me (Bollywood)
              </h3>

              <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                Hindi Bollywood film singing, voice culture, pitch correction (Sur), and stage confidence training accessible in {activeLocation}.
              </p>

              <ul className="space-y-2 text-xs text-slate-300 mb-6">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                  <span>Diaphragm breathing &amp; pitch stability (Sur)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                  <span>Bollywood melodies, romantic &amp; devotional songs</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                  <span>Microphone technique &amp; Karaoke track practice</span>
                </li>
                <li className="flex items-center gap-2 text-amber-300/80 font-medium">
                  <CheckCircle2 className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                  <span>* Classical singing excluded from this course</span>
                </li>
              </ul>
            </div>

            <div className="pt-4 border-t border-slate-900 flex items-center gap-2">
              <button
                onClick={() => onOpenDemoBooking('Hindi Bollywood Vocal Learning & Singing Mastery')}
                className="w-full rounded-xl bg-amber-500 px-3.5 py-2 text-xs font-bold text-slate-950 hover:bg-amber-400 transition-colors"
              >
                Book Vocal Demo
              </button>
              <button
                onClick={() => onOpenLeadPopup('Hindi Bollywood Vocal Learning & Singing Mastery')}
                className="rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-slate-300 hover:bg-slate-800"
              >
                Fees
              </button>
            </div>
          </div>
        </div>

        {/* Automated Delivery Comparison Banner */}
        <div className="rounded-3xl border border-blue-500/20 bg-gradient-to-r from-blue-950/40 via-slate-900 to-indigo-950/40 p-6 sm:p-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2 text-xs font-bold text-blue-400 uppercase tracking-wider">
                <Globe className="h-4 w-4" />
                <span>How We Deliver Quality Education Near You</span>
              </div>
              <h4 className="text-xl font-bold text-white">
                Two Flexible Modes Designed for Chhattisgarh &amp; Global Students
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Whether you prefer in-person hands-on labs at our Baloda Institute or live online classes with full screen-share guidance and doubt-clearing from the comfort of your home, SP SOLUTIONS has you covered.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href={settings.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-blue-500 transition-colors"
              >
                <Navigation className="h-4 w-4" />
                <span>Get Directions (Baloda)</span>
              </a>

              <a
                href={`https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(
                  `Hello SP SOLUTIONS, I am searching for classes near me in ${activeLocation}. Please share batch timings.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-4 py-2.5 text-xs font-semibold text-emerald-300 hover:bg-emerald-500/20 transition-colors"
              >
                <MessageSquare className="h-4 w-4" />
                <span>WhatsApp Admissions</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
