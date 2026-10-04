import React, { useState } from 'react';
import {
  Share2,
  Copy,
  Check,
  ExternalLink,
  MessageCircle,
  Linkedin,
  Github,
  Bot,
  Facebook,
  AtSign,
  Send,
  MessageSquare,
  Sparkles,
  X
} from 'lucide-react';
import { logAnalyticsEvent } from '../data/store';
import { SP_SOLUTIONS_HQ } from '../data/locationRadarStore';

interface SocialShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  language?: 'en' | 'hi';
}

export const SocialShareModal: React.FC<SocialShareModalProps> = ({
  isOpen,
  onClose,
  language = 'en'
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const currentUrl = typeof window !== 'undefined' ? window.location.origin : 'https://spsolutions.in';
  const shareUrl = `${currentUrl}/?utm_source=social_share&utm_medium=referral&utm_campaign=sp_solutions_classes_near_me`;
  const shareTitle = 'SP SOLUTIONS — English • Computer • Hindi Bollywood Vocal Learning Centre';
  const shareSummary = `Join SP SOLUTIONS at Village Baloda, District BalodaBazar Chhattisgarh (House No. 359). Learn Spoken English, DCA/PGDCA Computer & Bollywood Singing online or classroom! Contact: ${SP_SOLUTIONS_HQ.phone}.`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    logAnalyticsEvent('social_share', { details: 'clipboard_copy' });
    setTimeout(() => setCopied(false), 2500);
  };

  const platforms = [
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      color: 'bg-emerald-600 hover:bg-emerald-500 text-white',
      url: `https://api.whatsapp.com/send?text=${encodeURIComponent(`${shareTitle}\n\n${shareSummary}\n\nExplore & Join: ${shareUrl}`)}`
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      color: 'bg-blue-700 hover:bg-blue-600 text-white',
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`
    },
    {
      name: 'Facebook',
      icon: Facebook,
      color: 'bg-blue-600 hover:bg-blue-500 text-white',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
    },
    {
      name: 'Threads',
      icon: AtSign,
      color: 'bg-stone-900 hover:bg-stone-800 text-white border border-stone-700',
      url: `https://threads.net/intent/post?text=${encodeURIComponent(`${shareTitle} — ${shareSummary} ${shareUrl}`)}`
    },
    {
      name: 'Discord',
      icon: MessageSquare,
      color: 'bg-indigo-600 hover:bg-indigo-500 text-white',
      url: `https://discord.com/channels/@me`
    },
    {
      name: 'GitHub Repository',
      icon: Github,
      color: 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-600',
      url: `https://github.com/topics/sp-solutions-learning-platform`
    },
    {
      name: 'OpenAI / ChatGPT Prompt',
      icon: Bot,
      color: 'bg-teal-700 hover:bg-teal-600 text-white',
      url: `https://chatgpt.com/?q=${encodeURIComponent(`I am a student enrolling at SP SOLUTIONS (Village Baloda, House No. 359, Chhattisgarh). Please generate an intensive daily spoken English practice plan, computer DCA syllabus guide, and vocal singing warm-up exercises.`)}`
    },
    {
      name: 'Justdial Profile',
      icon: ExternalLink,
      color: 'bg-orange-600 hover:bg-orange-500 text-white',
      url: 'https://www.justdial.com/Baloda-Bazar/SP-Solutions-English-Computer-Singing-Classes-Near-Mobile-Tower-Baloda/07727P7727-7727-261004120000-A1B2_BZDET'
    },
    {
      name: 'Telegram',
      icon: Send,
      color: 'bg-sky-500 hover:bg-sky-400 text-white',
      url: `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700 rounded-3xl p-6 shadow-2xl text-white">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
            <Share2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">
              {language === 'hi' ? 'वैश्विक सोशल मीडिया एवं मार्केटिंग शेयर' : 'Global Social & Marketing Share'}
            </h3>
            <p className="text-xs text-slate-400">
              Share SP SOLUTIONS across LinkedIn, GitHub, OpenAI, Meta & Networks
            </p>
          </div>
        </div>

        {/* Institute Link Card */}
        <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 mb-5 text-xs text-slate-300">
          <p className="font-semibold text-white">
            SP SOLUTIONS • House No. 359, Village Baloda, Baloda Bazar (C.G.)
          </p>
          <p className="text-slate-400 text-[11px] mt-0.5">
            Spoken English • DCA Computer • Hindi Bollywood Vocal Learning Centre
          </p>
        </div>

        {/* Copy Link Field */}
        <div className="mb-5">
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            Direct Shareable URL (with UTM campaign tracking)
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={shareUrl}
              className="flex-1 bg-slate-800 border border-slate-700 text-xs text-slate-300 rounded-xl px-3 py-2.5 truncate focus:outline-none"
            />
            <button
              onClick={handleCopyLink}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition cursor-pointer ${
                copied
                  ? 'bg-emerald-500 text-slate-950'
                  : 'bg-amber-500 hover:bg-amber-400 text-slate-950'
              }`}
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>
          </div>
        </div>

        {/* Grid of Global Social Sharing Platforms */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-2">
            Share Directly to Channels:
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {platforms.map(p => {
              const Icon = p.icon;
              return (
                <a
                  key={p.name}
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => logAnalyticsEvent('social_share', { details: p.name })}
                  className={`p-2.5 rounded-xl flex items-center justify-center gap-2 text-xs font-semibold transition ${p.color}`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span className="truncate">{p.name}</span>
                </a>
              );
            })}
          </div>
        </div>

        <div className="mt-5 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>YouTube Official: makemestar</span>
          <span>Helpline: 9279120271</span>
        </div>
      </div>
    </div>
  );
};
