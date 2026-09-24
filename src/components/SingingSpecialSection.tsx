import React, { useState } from 'react';
import {
  Music,
  Disc,
  Mic2,
  Sparkles,
  ShieldAlert,
  Headphones,
  CheckCircle2,
  Layers,
  Volume2,
  Calendar,
  User,
  Radio,
  FileCheck
} from 'lucide-react';
import { SongWork, Language } from '../types';
import { initialSongs } from '../data/seedData';
import { translations } from '../locales/translations';

interface SingingSpecialSectionProps {
  language: Language;
  onEnquireCourse: (courseName: string) => void;
  onOpenDemoBooking: () => void;
}

export const SingingSpecialSection: React.FC<SingingSpecialSectionProps> = ({
  language,
  onEnquireCourse,
  onOpenDemoBooking,
}) => {
  const t = translations[language];
  const [activeTab, setActiveTab] = useState<'study-guides' | 'original-music'>('original-music');
  const [selectedDecade, setSelectedDecade] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');

  const originalSongs = initialSongs.filter(s => s.isOriginal);
  const bollywoodStudyTracks = initialSongs.filter(s => !s.isOriginal);

  const displayedStudyTracks = bollywoodStudyTracks.filter(s => {
    const matchDecade = selectedDecade === 'all' || s.decade === selectedDecade;
    const matchDiff = selectedDifficulty === 'all' || s.difficulty === selectedDifficulty;
    return matchDecade && matchDiff;
  });

  return (
    <section id="singing-hub" className="py-16 sm:py-24 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border-b border-slate-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/10 px-3.5 py-1 text-xs font-semibold text-amber-400 border border-amber-500/20 mb-3">
            <Mic2 className="h-3.5 w-3.5" />
            <span>Voice Culture & Bollywood Vocal Hub</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {language === 'hi' ? 'हिंदी बॉलीवुड वोकल एवं गायन प्रशिक्षण' : 'Hindi Bollywood Vocal Learning & Voice Culture'}
          </h2>

          <p className="mt-3 text-base text-slate-300">
            Learn voice projection, pitch stabilization (Sur), rhythm mastery (Taal), breathing technique, and soulful Bollywood song rendition for YouTube, Instagram, stage & studio.
          </p>

          {/* CRITICAL EXCLUSION CALLOUT */}
          <div className="mt-5 rounded-2xl border border-amber-500/40 bg-amber-500/10 p-4 text-left shadow-lg">
            <div className="flex items-start gap-3">
              <ShieldAlert className="h-5 w-5 shrink-0 text-amber-400 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-amber-300 uppercase tracking-wide">
                  {t.singingDisclaimerTitle}
                </h4>
                <p className="mt-1 text-xs text-amber-200/90 leading-relaxed">
                  {t.singingDisclaimerText}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Pillars of Vocal Training Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-14">
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 hover:border-amber-500/30 transition-all">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/15 text-amber-400 mb-3">
              <Radio className="h-5 w-5" />
            </div>
            <h4 className="text-sm font-bold text-white">Voice & Breath Control</h4>
            <p className="mt-1 text-xs text-slate-400 leading-relaxed">
              Diaphragm support, belly breathing, throat relaxation, removing strain, and sustained tone power.
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 hover:border-amber-500/30 transition-all">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/15 text-amber-400 mb-3">
              <Layers className="h-5 w-5" />
            </div>
            <h4 className="text-sm font-bold text-white">Pitch (Sur) & Taal (Rhythm)</h4>
            <p className="mt-1 text-xs text-slate-400 leading-relaxed">
              Ear training with Tanpura pitch, fixing off-key notes, and grooving on Keherwa and Dadra beats.
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 hover:border-amber-500/30 transition-all">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/15 text-amber-400 mb-3">
              <Mic2 className="h-5 w-5" />
            </div>
            <h4 className="text-sm font-bold text-white">Microphone & Studio Recording</h4>
            <p className="mt-1 text-xs text-slate-400 leading-relaxed">
              Pro mic distance, pop filter dynamics, expression nuances, and vocal track recording for covers.
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 hover:border-amber-500/30 transition-all">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/15 text-amber-400 mb-3">
              <Headphones className="h-5 w-5" />
            </div>
            <h4 className="text-sm font-bold text-white">Stage & Karaoke Confidence</h4>
            <p className="mt-1 text-xs text-slate-400 leading-relaxed">
              Singing with live karaoke tracks, audience eye contact, overcoming stage fright, and charisma.
            </p>
          </div>
        </div>

        {/* Section Tabs: Original Music vs Study Guides */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <button
            onClick={() => setActiveTab('original-music')}
            className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-bold transition-all ${
              activeTab === 'original-music'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Sparkles className="h-4 w-4" />
            <span>ORIGINAL MUSIC (By Santy Manikpuri & Students)</span>
          </button>

          <button
            onClick={() => setActiveTab('study-guides')}
            className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-bold transition-all ${
              activeTab === 'study-guides'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Disc className="h-4 w-4" />
            <span>BOLLYWOOD VOCAL STUDY GUIDES (Decade / Singer)</span>
          </button>
        </div>

        {/* Content Tab 1: Original Music */}
        {activeTab === 'original-music' && (
          <div className="space-y-6">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 sm:p-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5 mb-6">
                <div>
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-amber-400" />
                    <span>Original Compositions & Institute Music Works</span>
                  </h3>
                  <p className="mt-1 text-xs text-slate-400">
                    Original songs created, composed, and recorded by instructor Santy Manikpuri and SP Solutions student vocalists.
                  </p>
                </div>
                <div className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-500/10 px-3 py-1 text-xs text-emerald-400 border border-emerald-500/20">
                  <FileCheck className="h-3.5 w-3.5" />
                  <span>100% Authorized & Original</span>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {originalSongs.map(song => (
                  <div
                    key={song.id}
                    className="rounded-xl border border-slate-800 bg-slate-950 p-5 hover:border-amber-500/40 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="rounded bg-amber-500/20 px-2 py-0.5 text-[10px] font-bold text-amber-300 uppercase">
                          {song.genre}
                        </span>
                        <h4 className="mt-2 text-base font-bold text-white">
                          {language === 'hi' ? song.titleHi : song.title}
                        </h4>
                        <div className="mt-1 text-xs text-slate-400">
                          Composer & Vocals: <span className="text-slate-200">{song.artistOrSinger}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-slate-500 block">Vocal Range</span>
                        <span className="text-xs font-mono font-bold text-amber-400">{song.vocalRange}</span>
                      </div>
                    </div>

                    <p className="mt-3 text-xs text-slate-300 leading-relaxed border-t border-slate-800/80 pt-3">
                      {song.lyricsGuideSummary}
                    </p>

                    <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-900">
                      <span className="truncate max-w-[280px]">{song.copyrightNotice}</span>
                      <span className="text-emerald-400 font-semibold">Institute Track</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Content Tab 2: Bollywood Study Guides */}
        {activeTab === 'study-guides' && (
          <div className="space-y-6">
            {/* Filters */}
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-800 bg-slate-900/60 p-4 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-slate-400">Filter by Decade:</span>
                <select
                  value={selectedDecade}
                  onChange={e => setSelectedDecade(e.target.value)}
                  className="rounded-lg border border-slate-700 bg-slate-950 px-2.5 py-1.5 text-xs text-slate-200"
                >
                  <option value="all">All Decades</option>
                  <option value="1960s">1960s Golden Era</option>
                  <option value="1990s">1990s Melody Era</option>
                  <option value="2010s">2010s Modern Era</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-slate-400">Difficulty:</span>
                <select
                  value={selectedDifficulty}
                  onChange={e => setSelectedDifficulty(e.target.value)}
                  className="rounded-lg border border-slate-700 bg-slate-950 px-2.5 py-1.5 text-xs text-slate-200"
                >
                  <option value="all">All Levels</option>
                  <option value="EASY">Easy</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="CHALLENGING">Challenging</option>
                </select>
              </div>
            </div>

            {/* Copyright Compliance Banner */}
            <div className="rounded-xl border border-blue-500/20 bg-blue-950/20 p-4 text-xs text-slate-300">
              <div className="flex items-start gap-2.5">
                <ShieldAlert className="h-4 w-4 shrink-0 text-blue-400 mt-0.5" />
                <div>
                  <span className="font-semibold text-blue-300">{t.copyrightNoticeTitle}: </span>
                  <span>{t.copyrightNoticeText}</span>
                </div>
              </div>
            </div>

            {/* Song Cards */}
            <div className="grid gap-4 md:grid-cols-2">
              {displayedStudyTracks.map(song => (
                <div
                  key={song.id}
                  className="rounded-xl border border-slate-800 bg-slate-950 p-5 hover:border-slate-700 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="rounded bg-slate-800 px-2 py-0.5 text-[10px] font-semibold text-slate-300">
                          {song.decade}
                        </span>
                        <span className="rounded bg-blue-500/10 px-2 py-0.5 text-[10px] font-semibold text-blue-400">
                          {song.genre}
                        </span>
                        <span className={`rounded px-2 py-0.5 text-[10px] font-semibold ${
                          song.difficulty === 'EASY'
                            ? 'bg-emerald-500/10 text-emerald-400'
                            : song.difficulty === 'MEDIUM'
                            ? 'bg-amber-500/10 text-amber-400'
                            : 'bg-red-500/10 text-red-400'
                        }`}>
                          {song.difficulty}
                        </span>
                      </div>
                      <h4 className="mt-2 text-base font-bold text-white">
                        {language === 'hi' ? song.titleHi : song.title}
                      </h4>
                      <div className="mt-1 text-xs text-slate-400">
                        Singer Reference: <span className="text-slate-200">{song.artistOrSinger}</span>
                        {song.musicDirector && <span> • Director: {song.musicDirector}</span>}
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] text-slate-500 block">Vocal Range</span>
                      <span className="text-xs font-mono font-bold text-amber-400">{song.vocalRange}</span>
                    </div>
                  </div>

                  <p className="mt-3 text-xs text-slate-300 leading-relaxed border-t border-slate-800/80 pt-3">
                    <strong>Study Focus:</strong> {song.lyricsGuideSummary}
                  </p>

                  <div className="mt-3 text-[10px] text-slate-500 italic pt-2 border-t border-slate-900">
                    {song.copyrightNotice}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA Bar */}
        <div className="mt-12 rounded-2xl border border-amber-500/30 bg-gradient-to-r from-amber-950/40 via-slate-900 to-amber-950/40 p-6 sm:p-8 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-white">
              Ready to find your pitch & develop your Bollywood vocal style?
            </h3>
            <p className="text-xs text-slate-300 mt-1">
              Join offline batch at Baloda Centre or attend live interactive sessions online.
            </p>
          </div>
          <div className="flex flex-wrap gap-2.5">
            <button
              onClick={onOpenDemoBooking}
              className="rounded-xl border border-amber-500/50 bg-amber-500/15 px-4 py-2.5 text-xs font-bold text-amber-300 hover:bg-amber-500/25"
            >
              Book Free Vocal Demo
            </button>
            <button
              onClick={() => onEnquireCourse('Hindi Bollywood Vocal Learning & Singing Mastery')}
              className="rounded-xl bg-amber-500 px-5 py-2.5 text-xs font-bold text-slate-950 hover:bg-amber-400 shadow"
            >
              Enquire for Singing
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
