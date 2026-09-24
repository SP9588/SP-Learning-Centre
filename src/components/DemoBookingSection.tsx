import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  CheckCircle2,
  Sparkles,
  Phone,
  Laptop,
  BookOpen,
  Music,
  MapPin,
  ArrowRight
} from 'lucide-react';
import { Course, Language, LearningMode } from '../types';
import { addDemoBooking } from '../data/store';
import { translations } from '../locales/translations';

interface DemoBookingSectionProps {
  language: Language;
  courses: Course[];
  preselectedCourseName?: string;
  onSuccessClose?: () => void;
}

export const DemoBookingSection: React.FC<DemoBookingSectionProps> = ({
  language,
  courses,
  preselectedCourseName,
  onSuccessClose,
}) => {
  const t = translations[language];

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [selectedCourse, setSelectedCourse] = useState(preselectedCourseName || courses[0]?.name || 'Spoken English');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('10:00 AM');
  const [learningMode, setLearningMode] = useState<LearningMode>('OFFLINE');
  const [message, setMessage] = useState('');

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPhone = phone.replace(/\D/g, '');

    if (!fullName.trim()) {
      setError('Please enter your full name.');
      return;
    }
    if (cleanPhone.length < 10) {
      setError('Please provide a valid 10-digit mobile number.');
      return;
    }

    const courseObj = courses.find(c => c.name === selectedCourse) || courses[0];

    addDemoBooking({
      name: fullName.trim(),
      phone: cleanPhone,
      email: email.trim() || undefined,
      courseId: courseObj ? courseObj.id : 'general',
      courseName: selectedCourse,
      preferredDate: preferredDate || new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
      preferredTime,
      mode: learningMode,
      message: message.trim() || undefined,
    });

    setSubmitted(true);
    setError('');
  };

  return (
    <section id="demo" className="py-16 sm:py-24 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 border-b border-slate-800">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 sm:p-12 shadow-2xl backdrop-blur-xl">
          {submitted ? (
            <div className="text-center py-8">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 mb-4 animate-in zoom-in">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold text-white">
                Demo Session Booking Confirmed!
              </h3>
              <p className="mt-2 text-sm text-slate-300 max-w-md mx-auto">
                Thank you, <strong>{fullName}</strong>. Your demo class for <strong>{selectedCourse}</strong> ({learningMode}) is scheduled. Our academic coordinator will contact you on <strong>{phone}</strong> to confirm the exact batch timing.
              </p>
              <div className="mt-6 flex justify-center gap-3">
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFullName('');
                    setPhone('');
                    setEmail('');
                    setMessage('');
                    if (onSuccessClose) onSuccessClose();
                  }}
                  className="rounded-xl bg-blue-600 px-6 py-2.5 text-xs font-bold text-white hover:bg-blue-500"
                >
                  Book Another Demo
                </button>
              </div>
            </div>
          ) : (
            <div className="grid gap-8 lg:grid-cols-12 items-center">
              {/* Left Info */}
              <div className="lg:col-span-5 text-left">
                <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-400 border border-amber-500/20 mb-3">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>100% Free • No Obligation</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {t.demoTitle}
                </h3>
                <p className="mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {t.demoSubtitle}
                </p>

                <div className="mt-6 space-y-3 text-xs text-slate-300">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    <span>Meet your mentors & explore syllabus</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    <span>Choice of Baloda Classroom or Live Google Meet</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    <span>Free Level Assessment & Learning roadmap</span>
                  </div>
                </div>

                <div className="mt-6 rounded-xl border border-slate-800 bg-slate-950 p-4 text-xs text-slate-400">
                  <span className="font-semibold text-white block mb-1">Classroom Venue:</span>
                  Village Baloda, Hasuwa, Near Mobile Tower, House No. 359, Chhattisgarh.
                </div>
              </div>

              {/* Right Form */}
              <div className="lg:col-span-7">
                <form onSubmit={handleSubmit} className="space-y-4">
                  {error && (
                    <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-300">
                      {error}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={e => setFullName(e.target.value)}
                        placeholder="e.g. Ramesh Sahu"
                        className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Mobile Number (10 Digits) *
                      </label>
                      <input
                        type="tel"
                        required
                        maxLength={10}
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        placeholder="e.g. 98261XXXXX"
                        className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Select Course *
                      </label>
                      <select
                        value={selectedCourse}
                        onChange={e => setSelectedCourse(e.target.value)}
                        className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2 text-xs text-slate-200 focus:border-blue-500 focus:outline-none"
                      >
                        {courses.map(c => (
                          <option key={c.id} value={c.name}>
                            {c.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Learning Mode *
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => setLearningMode('OFFLINE')}
                          className={`rounded-xl py-2 px-2 text-xs font-semibold border transition-all ${
                            learningMode === 'OFFLINE'
                              ? 'bg-blue-600 border-blue-500 text-white'
                              : 'bg-slate-950 border-slate-700 text-slate-400 hover:text-white'
                          }`}
                        >
                          Baloda Classroom
                        </button>
                        <button
                          type="button"
                          onClick={() => setLearningMode('ONLINE')}
                          className={`rounded-xl py-2 px-2 text-xs font-semibold border transition-all ${
                            learningMode === 'ONLINE'
                              ? 'bg-blue-600 border-blue-500 text-white'
                              : 'bg-slate-950 border-slate-700 text-slate-400 hover:text-white'
                          }`}
                        >
                          Live Online
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        {t.fieldPreferredDate}
                      </label>
                      <input
                        type="date"
                        value={preferredDate}
                        onChange={e => setPreferredDate(e.target.value)}
                        className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2 text-xs text-white focus:border-blue-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        {t.fieldPreferredTime}
                      </label>
                      <select
                        value={preferredTime}
                        onChange={e => setPreferredTime(e.target.value)}
                        className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2 text-xs text-slate-200 focus:border-blue-500 focus:outline-none"
                      >
                        <option value="08:00 AM">Morning 08:00 AM - 09:30 AM</option>
                        <option value="10:00 AM">Morning 10:00 AM - 11:30 AM</option>
                        <option value="04:30 PM">Evening 04:30 PM - 06:00 PM</option>
                        <option value="06:30 PM">Evening 06:30 PM - 08:00 PM</option>
                        <option value="Weekend Special">Weekend Special (Sat/Sun)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      {t.fieldMessage}
                    </label>
                    <textarea
                      rows={2}
                      value={message}
                      onChange={e => setMessage(e.target.value)}
                      placeholder="e.g. I want to learn DCA for exam, or I want to improve voice pitch..."
                      className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 py-3 text-xs sm:text-sm font-bold text-slate-950 shadow-lg hover:from-amber-400 hover:to-orange-400 transition-all active:scale-[0.99]"
                  >
                    Confirm Free Demo Session
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
