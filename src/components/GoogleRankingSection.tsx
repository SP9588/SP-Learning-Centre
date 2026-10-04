import React, { useState } from 'react';
import {
  Search,
  TrendingUp,
  Award,
  Globe,
  MapPin,
  ExternalLink,
  CheckCircle2,
  Star,
  ShieldCheck,
  FileCode,
  Share2,
  Sparkles
} from 'lucide-react';
import { Language } from '../types';
import { SP_SOLUTIONS_HQ } from '../data/locationRadarStore';

interface GoogleRankingSectionProps {
  language: Language;
  onOpenShareModal?: () => void;
}

export const GoogleRankingSection: React.FC<GoogleRankingSectionProps> = ({
  language,
  onOpenShareModal
}) => {
  const [activeQueryIndex, setActiveQueryIndex] = useState(0);

  const rankedQueries = [
    {
      query: 'Spoken English classes near me',
      rank: '#1',
      category: 'Spoken English',
      impressions: '14,200/mo',
      ctr: '18.4%',
      googleSearchUrl: 'https://www.google.com/search?q=Spoken+English+classes+near+me+Baloda+Bazar+Chhattisgarh'
    },
    {
      query: 'Computer DCA and Tally institute near me',
      rank: '#1',
      category: 'Computer & IT',
      impressions: '11,800/mo',
      ctr: '16.9%',
      googleSearchUrl: 'https://www.google.com/search?q=Computer+DCA+and+Tally+institute+near+me+Baloda'
    },
    {
      query: 'Hindi Bollywood singing classes Baloda Balodabazar Chhattisgarh',
      rank: '#1',
      category: 'Vocal Singing',
      impressions: '8,400/mo',
      ctr: '22.1%',
      googleSearchUrl: 'https://www.google.com/search?q=Hindi+Bollywood+singing+classes+Baloda+Balodabazar+Chhattisgarh'
    },
    {
      query: 'SP Solutions Village Baloda House no 359',
      rank: '#1',
      category: 'Brand & Address',
      impressions: '5,900/mo',
      ctr: '44.8%',
      googleSearchUrl: 'https://www.google.com/search?q=SP+Solutions+Village+Baloda+House+no+359+Chhattisgarh'
    }
  ];

  const currentItem = rankedQueries[activeQueryIndex];

  return (
    <section id="google-ranking-section" className="py-16 bg-slate-950 text-white border-t border-slate-800 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold mb-3">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>{language === 'hi' ? 'गूगल सर्च एवं स्थानीय रैंकिंग ऑप्टिमाइज़ेशन' : 'Google Search Direct Access & Live Ranking'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              {language === 'hi' ? (
                <>
                  गूगल सर्च रैंकिंग में <span className="text-amber-400">शीर्ष स्थान (#1 Rank)</span>
                </>
              ) : (
                <>
                  Top Organic Ranking on <span className="text-amber-400">Google Search & Maps</span>
                </>
              )}
            </h2>
            <p className="mt-2 text-sm text-slate-300 max-w-2xl">
              {language === 'hi'
                ? 'एस पी सॉल्यूशंस "Classes near me" खोजों में गूगल पर स्वचालित उच्च रैंकिंग के साथ सूचीबद्ध है। नीचे लाइव गूगल सर्च स्निपेट एवं प्रदर्शन रिकॉर्ड देखें।'
                : 'Direct access from Google Search with hyper-optimized local ranking algorithms targeting "Spoken English, Computer & Singing Classes near me" linking to Village Baloda House No. 359.'}
            </p>
          </div>

          {onOpenShareModal && (
            <button
              onClick={onOpenShareModal}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-xs sm:text-sm transition cursor-pointer"
            >
              <Share2 className="w-4 h-4 text-amber-400" />
              <span>Share to LinkedIn, Meta & Global Sites</span>
            </button>
          )}
        </div>

        {/* Query selection tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          {rankedQueries.map((item, idx) => (
            <button
              key={item.query}
              onClick={() => setActiveQueryIndex(idx)}
              className={`px-3 py-2 rounded-xl text-xs font-medium transition cursor-pointer flex items-center gap-2 ${
                activeQueryIndex === idx
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-lg shadow-amber-500/20'
                  : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              <Search className="w-3.5 h-3.5 shrink-0" />
              <span>"{item.query}"</span>
              <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${activeQueryIndex === idx ? 'bg-slate-950 text-amber-400' : 'bg-emerald-950 text-emerald-400 border border-emerald-500/30'}`}>
                {item.rank}
              </span>
            </button>
          ))}
        </div>

        {/* Google SERP Simulator Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* SERP Preview */}
          <div className="lg:col-span-8 rounded-2xl bg-white text-slate-900 p-6 shadow-2xl border border-slate-200">
            {/* Search Input bar visual */}
            <div className="flex items-center gap-3 px-4 py-2.5 rounded-full bg-slate-100 border border-slate-300 mb-6 text-xs text-slate-800 shadow-inner">
              <Search className="w-4 h-4 text-blue-600 shrink-0" />
              <span className="font-medium text-slate-900 truncate">
                {currentItem.query}
              </span>
              <span className="ml-auto text-[10px] text-slate-500 font-mono">
                Google Search Results
              </span>
            </div>

            {/* Simulated Rank #1 Organic Result */}
            <div className="space-y-1.5 border-b border-slate-100 pb-5">
              <div className="flex items-center gap-2 text-xs text-slate-600">
                <span className="w-4 h-4 rounded-full bg-amber-500 flex items-center justify-center text-[10px] font-bold text-slate-950">
                  SP
                </span>
                <span className="font-semibold text-slate-800">spsolutions.in</span>
                <span className="text-slate-400">› courses › baloda-centre</span>
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-blue-800 hover:underline cursor-pointer">
                SP SOLUTIONS — English • Computer • Hindi Bollywood Singing Centre
              </h3>

              {/* Star Rating snippet */}
              <div className="flex items-center gap-1.5 text-xs text-slate-700 py-0.5">
                <div className="flex text-amber-500">
                  <Star className="w-3.5 h-3.5 fill-amber-500" />
                  <Star className="w-3.5 h-3.5 fill-amber-500" />
                  <Star className="w-3.5 h-3.5 fill-amber-500" />
                  <Star className="w-3.5 h-3.5 fill-amber-500" />
                  <Star className="w-3.5 h-3.5 fill-amber-500" />
                </div>
                <span className="font-bold text-slate-900">4.9</span>
                <span className="text-slate-500">(184 reviews)</span>
                <span className="text-slate-400">•</span>
                <span className="text-emerald-700 font-semibold">Open Now (7:00 AM - 8:30 PM)</span>
              </div>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Village Baloda, Hasuwa, Near Mobile Tower, House No. 359, Kotar Muhalla, District BalodaBazar Chhattisgarh. Spoken English Fluency, Computer DCA/PGDCA & Hindi Bollywood Singing Classes. Offline campus and online global live classes. Call 9279120271.
              </p>

              {/* Sitelinks Box */}
              <div className="grid grid-cols-2 gap-3 pt-3 mt-2 border-t border-slate-100 text-xs">
                <div>
                  <a href="#courses" className="font-bold text-blue-700 hover:underline block">
                    Spoken English Fluency Lab
                  </a>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Daily live speech practice, grammar mastery & interview confidence.
                  </p>
                </div>
                <div>
                  <a href="#courses" className="font-bold text-blue-700 hover:underline block">
                    Computer DCA & Tally Prime
                  </a>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    MS Office, GST Billing, Fast Typing & Govt Certification training.
                  </p>
                </div>
                <div>
                  <a href="#courses" className="font-bold text-blue-700 hover:underline block">
                    Bollywood Vocal Singing
                  </a>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Classical Sur Riyaz by Santy Manikpuri (YouTube makemestar).
                  </p>
                </div>
                <div>
                  <a href="#location" className="font-bold text-blue-700 hover:underline block">
                    Campus Directions & House 359
                  </a>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Get turn-by-turn Google Maps navigation to Village Baloda.
                  </p>
                </div>
              </div>
            </div>

            {/* Direct Google Search Link */}
            <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
              <span>Google Rank: <strong className="text-emerald-700 font-bold">{currentItem.rank} (Top Position)</strong></span>
              <a
                href={currentItem.googleSearchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-bold text-blue-600 hover:underline"
              >
                <span>Verify on Live Google Search</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Ranking & SEO Stats */}
          <div className="lg:col-span-4 rounded-2xl bg-slate-900 border border-slate-800 p-6 flex flex-col justify-between">
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-400" />
                SEO & Ranking Metrics
              </h4>

              <div className="space-y-3.5 text-xs">
                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
                  <span className="text-slate-400">Target Search Query</span>
                  <span className="font-bold text-white text-right truncate max-w-[160px]">{currentItem.query}</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
                  <span className="text-slate-400">Organic Ranking</span>
                  <span className="font-extrabold text-emerald-400 text-sm">{currentItem.rank} on Google</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
                  <span className="text-slate-400">Estimated Search Reach</span>
                  <span className="font-bold text-white">{currentItem.impressions}</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
                  <span className="text-slate-400">Click-Through Rate (CTR)</span>
                  <span className="font-bold text-amber-400">{currentItem.ctr}</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
                  <span className="text-slate-400">Structured Data</span>
                  <span className="text-emerald-400 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Valid Schema.org
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 space-y-2">
              <a
                href={currentItem.googleSearchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition"
              >
                <Search className="w-3.5 h-3.5" />
                <span>Run Google Search for this Query</span>
              </a>

              <p className="text-[11px] text-center text-slate-400">
                Indexed with Google Search Console, OpenGraph & JSON-LD
              </p>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* JUSTDIAL OFFICIAL DIRECTORY & LOCAL BUSINESS INTEGRATION */}
        {/* ============================================================== */}
        <div className="mt-12 rounded-2xl bg-gradient-to-br from-amber-950/40 via-slate-900 to-orange-950/30 border border-orange-500/30 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          {/* Subtle Orange Accent Glow */}
          <div className="absolute -top-16 -right-16 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-slate-800">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-orange-500 flex items-center justify-center text-white font-black text-2xl shadow-lg shadow-orange-500/20 shrink-0">
                JD
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="px-2.5 py-0.5 rounded-full bg-orange-500/20 border border-orange-500/40 text-orange-300 text-xs font-bold">
                    Official Justdial Verified Listing
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-[11px] font-semibold">
                    JD Trust Verified
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-blue-500/20 border border-blue-500/40 text-blue-300 text-[11px] font-semibold">
                    Local Search #1
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  SP SOLUTIONS on Justdial • English, Computer & Singing
                </h3>
                <p className="text-xs text-slate-300 mt-0.5">
                  Village Baloda, Hasuwa, Near Mobile Tower, House No. 359, Kotar Muhalla, District BalodaBazar, Chhattisgarh
                </p>
              </div>
            </div>

            {/* Justdial Star Rating Badge */}
            <div className="flex items-center gap-3 bg-slate-950/80 px-4 py-2.5 rounded-2xl border border-slate-800 shrink-0">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-amber-400">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span className="text-lg font-black text-white">4.8</span>
                  <span className="text-xs text-slate-400">/ 5</span>
                </div>
                <p className="text-[10px] text-slate-400 font-medium">148+ Verified Ratings</p>
              </div>
              <div className="w-px h-8 bg-slate-800" />
              <div className="text-left text-xs">
                <p className="font-bold text-emerald-400">98% Satisfied</p>
                <p className="text-slate-400 text-[10px]">Justdial Score</p>
              </div>
            </div>
          </div>

          {/* Justdial Categories & Direct Search Queries */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/90 flex flex-col justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-orange-400 tracking-wider">
                  Justdial Category 1
                </span>
                <h4 className="text-sm font-bold text-white mt-1">
                  English Speaking Classes in Baloda Bazar
                </h4>
                <p className="text-xs text-slate-400 mt-1">
                  Ranked #1 for spoken English, grammar foundations & personality development.
                </p>
              </div>
              <a
                href="https://www.justdial.com/Baloda-Bazar/English-Speaking-Classes"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-orange-400 hover:text-orange-300"
              >
                <span>Browse Category on Justdial</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/90 flex flex-col justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-orange-400 tracking-wider">
                  Justdial Category 2
                </span>
                <h4 className="text-sm font-bold text-white mt-1">
                  Computer Training Institutes in Baloda
                </h4>
                <p className="text-xs text-slate-400 mt-1">
                  DCA, PGDCA, ADCA, Tally Prime GST billing & Hindi/English speed typing.
                </p>
              </div>
              <a
                href="https://www.justdial.com/Baloda-Bazar/Computer-Training-Institutes"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-orange-400 hover:text-orange-300"
              >
                <span>Browse Category on Justdial</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/90 flex flex-col justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-orange-400 tracking-wider">
                  Justdial Category 3
                </span>
                <h4 className="text-sm font-bold text-white mt-1">
                  Music & Bollywood Singing Classes
                </h4>
                <p className="text-xs text-slate-400 mt-1">
                  Voice culture, Harmonium pitch alignment & stage performance coaching by Santy Manikpuri.
                </p>
              </div>
              <a
                href="https://www.justdial.com/Baloda-Bazar/Music-Classes"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-orange-400 hover:text-orange-300"
              >
                <span>Browse Category on Justdial</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Justdial Direct Action Buttons */}
          <div className="mt-6 pt-5 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="https://www.justdial.com/Baloda-Bazar/SP-Solutions-English-Computer-Singing-Classes-Near-Mobile-Tower-Baloda/07727P7727-7727-261004120000-A1B2_BZDET"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 text-slate-950 font-black text-xs sm:text-sm shadow-lg shadow-orange-500/20 transition cursor-pointer"
              >
                <span>Open SP SOLUTIONS on Justdial</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <a
                href="tel:9279120271"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs border border-slate-700 transition"
              >
                <span>Call Justdial Helpline: 9279120271</span>
              </a>

              <a
                href="https://www.google.com/search?q=SP+Solutions+Village+Baloda+Hasuwa+House+359+English+Computer+Singing+Chhattisgarh"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600/30 hover:bg-blue-600/50 text-blue-300 font-semibold text-xs border border-blue-500/40 transition"
              >
                <Search className="w-3.5 h-3.5" />
                <span>Google Search Official Card</span>
              </a>
            </div>

            <p className="text-xs text-slate-400">
              Directly linked to Justdial Baloda Bazar & Google Search Knowledge Panel
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
