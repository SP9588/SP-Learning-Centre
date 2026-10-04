import React, { useState } from 'react';
import {
  Video,
  Play,
  Calendar,
  Clock,
  User,
  Users,
  CheckCircle,
  ExternalLink,
  BookOpen,
  Headphones,
  Award,
  Sparkles,
  MapPin,
  ArrowRight,
  Send,
  MessageCircle,
  X
} from 'lucide-react';
import { liveOnlineSessions } from '../data/onlineClassesData';
import { SP_SOLUTIONS_HQ } from '../data/locationRadarStore';
import { Language, OnlineClassSession } from '../types';
import { logAnalyticsEvent } from '../data/store';

interface OnlineClassesSectionProps {
  language: Language;
  onOpenLeadPopup?: () => void;
}

export const OnlineClassesSection: React.FC<OnlineClassesSectionProps> = ({
  language,
  onOpenLeadPopup
}) => {
  const [selectedSession, setSelectedSession] = useState<OnlineClassSession | null>(null);
  const [showJoinModal, setShowJoinModal] = useState<boolean>(false);
  const [activeSessionToJoin, setActiveSessionToJoin] = useState<OnlineClassSession | null>(null);

  // Quick Registration Form State
  const [regName, setRegName] = useState('');
  const [regMobile, setRegMobile] = useState('');
  const [regCity, setRegCity] = useState('');
  const [regMode, setRegMode] = useState<'ONLINE' | 'OFFLINE' | 'HYBRID'>('ONLINE');
  const [submittedPass, setSubmittedPass] = useState<string | null>(null);

  const handleJoinClick = (session: OnlineClassSession) => {
    setActiveSessionToJoin(session);
    setShowJoinModal(true);
    logAnalyticsEvent('online_class_join', { details: session.title });
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName || !regMobile) return;

    const passId = `SP-LIVE-${Math.floor(100000 + Math.random() * 900000)}`;
    setSubmittedPass(passId);
    logAnalyticsEvent('registration_completed', { details: `Online Session: ${activeSessionToJoin?.title}` });
  };

  return (
    <section id="online-classes-section" className="py-16 bg-slate-900 border-t border-slate-800 text-white relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-semibold mb-3">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
            <span>{language === 'hi' ? 'लाइव ऑनलाइन कक्षाएं एवं पाठ' : 'Live Online Interactive Classroom & Lessons'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            {language === 'hi' ? (
              <>
                घर बैठे जुड़ें या <span className="text-amber-400">कैंपस आकर सीखें</span>
              </>
            ) : (
              <>
                Join Live Online or Learn at <span className="text-amber-400">Village Baloda Campus</span>
              </>
            )}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300">
            {language === 'hi'
              ? 'दैनिक स्पोकन इंग्लिश, डीसीए/कंप्यूटर एवं बॉलीवुड सुर रियाज़ की लाइव इंटरेक्टिव कक्षाएं। सभी कक्षाएं सीधे एस पी सॉल्यूशंस (मकान नं. 359, बलोदा) के अनुभवी संकाय द्वारा संचालित होती हैं।'
              : 'Interactive Google Meet / Zoom live classrooms for Spoken English fluency, practical Computer & Tally skills, and Bollywood vocal riyaz. Connect directly from anywhere in India or visit our physical campus at House No. 359, Village Baloda, Baloda Bazar.'}
          </p>

          {/* Institute Campus Link Card */}
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800/80 border border-amber-500/30 text-xs text-amber-300">
            <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              HQ: {SP_SOLUTIONS_HQ.houseNo}, {SP_SOLUTIONS_HQ.locality}, {SP_SOLUTIONS_HQ.village}, {SP_SOLUTIONS_HQ.district}, CG • Contact: {SP_SOLUTIONS_HQ.phone}
            </span>
          </div>
        </div>

        {/* Sessions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {liveOnlineSessions.map(session => (
            <div
              key={session.id}
              className="rounded-2xl bg-slate-950 border border-slate-800 hover:border-amber-500/40 p-6 flex flex-col justify-between transition-all hover:shadow-xl hover:shadow-amber-500/5 group"
            >
              <div>
                {/* Status Badge */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold ${
                      session.status === 'LIVE_NOW'
                        ? 'bg-red-500/20 text-red-400 border border-red-500/40'
                        : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                    }`}
                  >
                    {session.status === 'LIVE_NOW' ? (
                      <>
                        <span className="w-2 h-2 rounded-full bg-red-400 animate-ping" />
                        LIVE TODAY
                      </>
                    ) : (
                      <>
                        <Clock className="w-3 h-3" />
                        UPCOMING BATCH
                      </>
                    )}
                  </span>

                  <span className="text-xs font-medium text-slate-400 flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-amber-400" />
                    <span>{session.attendeesCount} enrolled</span>
                  </span>
                </div>

                {/* Session Title */}
                <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                  {language === 'hi' ? session.titleHi : session.title}
                </h3>

                {/* Meta details */}
                <div className="mt-3 space-y-1.5 text-xs text-slate-400">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>{session.scheduledTime}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                    <span>{session.instructor}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Video className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Platform: {session.platform} • 60 mins interactive</span>
                  </div>
                </div>

                {/* Topics covered */}
                <div className="mt-4 pt-3 border-t border-slate-800/80">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                    {language === 'hi' ? 'मुख्य अभ्यास विषय:' : 'Key Session Modules:'}
                  </p>
                  <ul className="space-y-1 text-xs text-slate-300">
                    {session.keyTopics.map((topic, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 pt-4 border-t border-slate-800 flex items-center gap-2">
                <button
                  onClick={() => handleJoinClick(session)}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs sm:text-sm shadow-md transition cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-slate-950" />
                  <span>{language === 'hi' ? 'कक्षा में शामिल हों / रजिस्टर करें' : 'Join / Register Lesson'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Global Classroom Join Footer */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-slate-950 to-slate-900 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white">
                {language === 'hi' ? 'लाइव क्लास सर्टिफिकेट एवं पर्सनल मेंटरशिप' : 'Govt-Recognized Certification & 1-on-1 Support'}
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Every live online lesson is supplemented with PDF study guides, recorded video backups, and campus support at Village Baloda.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="https://wa.me/919279120271?text=Hello%20SP%20SOLUTIONS%2C%20I%20want%20to%20join%20the%20Online%20Live%20Classes%20and%20need%20the%20meeting%20link."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Live Link Request</span>
            </a>
            <a
              href={`tel:${SP_SOLUTIONS_HQ.phone}`}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700 transition"
            >
              <span>Call Helpline: 9279120271</span>
            </a>
          </div>
        </div>
      </div>

      {/* Join & Register Lesson Modal */}
      {showJoinModal && activeSessionToJoin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700 rounded-2xl p-6 shadow-2xl text-white">
            <button
              onClick={() => {
                setShowJoinModal(false);
                setSubmittedPass(null);
              }}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            {!submittedPass ? (
              <div>
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-400 text-xs font-semibold mb-2">
                  <Video className="w-3.5 h-3.5" />
                  <span>Instant Classroom Pass</span>
                </div>
                <h3 className="text-xl font-bold text-white">
                  {language === 'hi' ? activeSessionToJoin.titleHi : activeSessionToJoin.title}
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Hosted by SP SOLUTIONS (House No. 359, Village Baloda, CG) • Platform: {activeSessionToJoin.platform}
                </p>

                <form onSubmit={handleRegisterSubmit} className="mt-4 space-y-3 text-xs">
                  <div>
                    <label className="block font-semibold text-slate-300 mb-1">
                      Student Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={regName}
                      onChange={e => setRegName(e.target.value)}
                      placeholder="Enter your name"
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-slate-300 mb-1">
                        Mobile Number (WhatsApp) *
                      </label>
                      <input
                        type="tel"
                        required
                        value={regMobile}
                        onChange={e => setRegMobile(e.target.value)}
                        placeholder="10-digit mobile"
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-300 mb-1">
                        Village / City
                      </label>
                      <input
                        type="text"
                        value={regCity}
                        onChange={e => setRegCity(e.target.value)}
                        placeholder="e.g. Baloda / Raipur / Online"
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-300 mb-1">
                      Learning Mode Preference
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {(['ONLINE', 'OFFLINE', 'HYBRID'] as const).map(mode => (
                        <button
                          key={mode}
                          type="button"
                          onClick={() => setRegMode(mode)}
                          className={`py-2 px-2 rounded-lg text-center font-bold text-xs transition cursor-pointer ${
                            regMode === mode
                              ? 'bg-amber-500 text-slate-950'
                              : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                          }`}
                        >
                          {mode}
                        </button>
                      ))}
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-400 pt-1">
                    🔒 Official privacy guarantee: Your details are solely used for classroom access and batch notification.
                  </p>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm shadow-lg transition cursor-pointer"
                    >
                      Generate Live Classroom Pass & Join
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="text-center py-4 space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white">Classroom Pass Generated!</h4>
                  <p className="text-xs text-slate-300 mt-1">
                    Pass Code: <span className="font-mono font-bold text-amber-400 text-sm">{submittedPass}</span>
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 text-left text-xs space-y-1.5">
                  <p className="text-slate-300">
                    <strong className="text-white">Student:</strong> {regName} ({regMobile})
                  </p>
                  <p className="text-slate-300">
                    <strong className="text-white">Session:</strong> {activeSessionToJoin.title}
                  </p>
                  <p className="text-slate-300">
                    <strong className="text-white">Center:</strong> SP SOLUTIONS, House No. 359, Village Baloda, Baloda Bazar
                  </p>
                </div>

                <div className="space-y-2 pt-2">
                  <a
                    href={activeSessionToJoin.joinLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white font-bold text-sm shadow-lg transition"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Open Live Class in {activeSessionToJoin.platform}</span>
                  </a>

                  <a
                    href={`https://wa.me/919279120271?text=Hello%20SP%20SOLUTIONS%2C%20my%20Classroom%20Pass%20is%20${submittedPass}.%20Please%20confirm%20my%20seat%20for%20${encodeURIComponent(activeSessionToJoin.title)}.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-400 font-semibold text-xs border border-emerald-500/30 transition"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Send Pass Confirmation to WhatsApp</span>
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
