import React, { useState, useEffect } from 'react';
import {
  X,
  Sparkles,
  MapPin,
  CheckCircle2,
  Lock,
  Phone,
  ArrowRight,
  ShieldCheck,
  Navigation
} from 'lucide-react';
import { Course, Language, LearningMode } from '../types';
import { addLead } from '../data/store';
import { translations } from '../locales/translations';

interface LeadPopupProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  courses: Course[];
  preselectedCourse?: string;
  campaign?: string;
}

export const LeadPopup: React.FC<LeadPopupProps> = ({
  isOpen,
  onClose,
  language,
  courses,
  preselectedCourse,
  campaign = 'Admissions 2026-27',
}) => {
  const t = translations[language];

  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [villageCity, setVillageCity] = useState('');
  const [preferredCourse, setPreferredCourse] = useState(
    preselectedCourse || courses[0]?.name || 'Spoken English & Communication Mastery'
  );
  const [learningMode, setLearningMode] = useState<LearningMode>('OFFLINE');
  const [consent, setConsent] = useState(true);

  // Voluntary location state
  const [detectingLocation, setDetectingLocation] = useState(false);
  const [locationSuccessNote, setLocationSuccessNote] = useState('');
  const [coords, setCoords] = useState<{ lat?: number; lng?: number }>({});

  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Voluntary browser location acquisition
  const handleUseMyLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser. Please enter village/city manually.');
      return;
    }

    setDetectingLocation(true);
    setError('');

    navigator.geolocation.getCurrentPosition(
      pos => {
        setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setVillageCity('Current Device Location (Shared with consent)');
        setLocationSuccessNote('Approximate location captured with your voluntary permission.');
        setDetectingLocation(false);
      },
      err => {
        setDetectingLocation(false);
        setLocationSuccessNote('');
        if (err.code === err.PERMISSION_DENIED) {
          setError('Location access was denied. You can simply type your village or city manually.');
        } else {
          setError('Could not get location. Please type your village or city name.');
        }
      },
      { timeout: 8000, maximumAge: 60000, enableHighAccuracy: false }
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const cleanMobile = mobile.replace(/\D/g, '');
    if (cleanMobile.length < 10) {
      setError('Please provide a valid 10-digit mobile number.');
      return;
    }

    if (!consent) {
      setError('Please tick the consent box to submit your enquiry.');
      return;
    }

    setSubmitting(true);

    const result = addLead({
      name,
      mobile: cleanMobile,
      email: email.trim() || undefined,
      villageCity: villageCity.trim() || 'Baloda / Not specified',
      preferredCourse,
      learningMode,
      consentStatus: consent,
      latitude: coords.lat,
      longitude: coords.lng,
      campaign,
      source: 'Responsive Website Popup',
    });

    setSubmitting(false);

    if (result.success) {
      setSubmitted(true);
      setTimeout(() => {
        // Auto close after 3 seconds on success
        onClose();
      }, 3500);
    } else {
      setError(result.message);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="enquiry-popup-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in"
    >
      <div className="relative w-full max-w-lg rounded-3xl border border-slate-700 bg-slate-900 p-6 sm:p-8 shadow-2xl text-left max-h-[92vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-xl p-2 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
          aria-label="Close Enquiry Popup"
        >
          <X className="h-5 w-5" />
        </button>

        {submitted ? (
          <div className="py-8 text-center animate-in zoom-in">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 mb-4">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <h3 className="text-2xl font-bold text-white">
              {language === 'hi' ? 'पूछताछ सफलतापूर्वक दर्ज!' : 'Enquiry Received!'}
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-slate-300 max-w-sm mx-auto leading-relaxed">
              {t.popupSuccess}
            </p>
            <div className="mt-4 rounded-xl bg-slate-950 p-3 text-xs text-slate-400 border border-slate-800">
              Selected Course: <strong className="text-white">{preferredCourse}</strong> ({learningMode})
            </div>
            <button
              onClick={onClose}
              className="mt-6 rounded-xl bg-blue-600 px-6 py-2.5 text-xs font-bold text-white hover:bg-blue-500"
            >
              Close Window
            </button>
          </div>
        ) : (
          <div>
            {/* Header */}
            <div className="mb-5">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-400 border border-amber-500/20 mb-2">
                <Sparkles className="h-3.5 w-3.5" />
                <span>{t.popupBadge}</span>
              </div>
              <h2 id="enquiry-popup-title" className="text-xl sm:text-2xl font-black text-white">
                {t.popupTitle}
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                {t.popupSubtitle} • English | Computer | Hindi Bollywood Singing
              </p>
            </div>

            {error && (
              <div className="mb-4 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-300">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3.5">
              {/* Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  {t.fieldName}
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="e.g. Rameshwar Sahu"
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
                />
              </div>

              {/* Mobile Phone */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  {t.fieldPhone}
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-500">
                    +91
                  </span>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    value={mobile}
                    onChange={e => setMobile(e.target.value)}
                    placeholder="98261XXXXX"
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 pl-11 pr-3.5 py-2 text-xs text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Optional Email & Location row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    {t.fieldEmail}
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="name@email.com"
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-semibold text-slate-300">
                      {t.fieldCity}
                    </label>
                    <span className="text-[10px] text-slate-400">Optional</span>
                  </div>
                  <input
                    type="text"
                    value={villageCity}
                    onChange={e => setVillageCity(e.target.value)}
                    placeholder="e.g. Baloda / Hasuwa / Bilaspur"
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Privacy-conscious location sharing button */}
              <div className="rounded-xl border border-slate-800 bg-slate-950 p-2.5 flex items-center justify-between gap-2">
                <div className="text-[11px] text-slate-400">
                  <span className="font-semibold text-slate-300 block">Location Sharing: Optional</span>
                  {locationSuccessNote ? (
                    <span className="text-emerald-400 font-medium">{locationSuccessNote}</span>
                  ) : (
                    <span>Enter city manually or click to use GPS with permission.</span>
                  )}
                </div>
                <button
                  type="button"
                  onClick={handleUseMyLocation}
                  disabled={detectingLocation}
                  className="shrink-0 flex items-center gap-1 rounded-lg border border-slate-700 bg-slate-800 px-2.5 py-1 text-[11px] font-semibold text-slate-200 hover:bg-slate-700 hover:text-white"
                >
                  <Navigation className="h-3 w-3 text-blue-400" />
                  <span>{detectingLocation ? 'Checking...' : t.btnUseMyLocation}</span>
                </button>
              </div>

              {/* Course Selection */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  {t.fieldPreferredCourse}
                </label>
                <select
                  value={preferredCourse}
                  onChange={e => setPreferredCourse(e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-200 focus:border-blue-500 focus:outline-none"
                >
                  {courses.map(c => (
                    <option key={c.id} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Learning Mode Toggle */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  {t.fieldLearningMode}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setLearningMode('OFFLINE')}
                    className={`rounded-xl py-2 px-3 text-xs font-semibold border transition-all text-center ${
                      learningMode === 'OFFLINE'
                        ? 'bg-blue-600 border-blue-500 text-white'
                        : 'bg-slate-950 border-slate-700 text-slate-400 hover:text-white'
                    }`}
                  >
                    {t.modeOffline}
                  </button>
                  <button
                    type="button"
                    onClick={() => setLearningMode('ONLINE')}
                    className={`rounded-xl py-2 px-3 text-xs font-semibold border transition-all text-center ${
                      learningMode === 'ONLINE'
                        ? 'bg-blue-600 border-blue-500 text-white'
                        : 'bg-slate-950 border-slate-700 text-slate-400 hover:text-white'
                    }`}
                  >
                    {t.modeOnline}
                  </button>
                </div>
              </div>

              {/* Consent Checkbox */}
              <div className="pt-1">
                <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-300">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={e => setConsent(e.target.checked)}
                    className="mt-0.5 h-4 w-4 rounded border-slate-700 bg-slate-950 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="leading-tight">
                    {t.consentText}
                  </span>
                </label>
                <div className="mt-1 text-[10px] text-slate-500 flex items-center gap-1.5">
                  <Lock className="h-3 w-3 text-slate-500" />
                  <span>{t.privacyNote}</span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 py-3 text-xs sm:text-sm font-bold text-white shadow-lg hover:from-blue-500 hover:to-indigo-500 transition-all active:scale-[0.99] disabled:opacity-50"
              >
                {submitting ? t.btnSubmitting : t.btnSubmit}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
