import React from 'react';
import {
  MapPin,
  Navigation,
  Phone,
  MessageSquare,
  Instagram,
  Youtube,
  ExternalLink,
  ShieldCheck,
  Building,
  HelpCircle
} from 'lucide-react';
import { Language, WebsiteSettings } from '../types';
import { translations } from '../locales/translations';

interface LocationSectionProps {
  language: Language;
  settings: WebsiteSettings;
  onOpenLeadPopup: () => void;
  onOpenDemoBooking: () => void;
}

export const LocationSection: React.FC<LocationSectionProps> = ({
  language,
  settings,
  onOpenLeadPopup,
  onOpenDemoBooking,
}) => {
  const t = translations[language];

  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello ${settings.instituteName}, I want directions / visit information for your institute in Baloda.`
    );
    window.open(`https://wa.me/${settings.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <section id="location-contact" className="py-16 sm:py-24 bg-slate-950 border-b border-slate-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-12 items-start">
          {/* Left Info Column */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-400 border border-blue-500/20 mb-3">
                <MapPin className="h-3.5 w-3.5 text-red-400" />
                <span>Institute Location & Navigation</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                {t.locTitle}
              </h2>
              <p className="mt-2 text-sm text-slate-300">
                {t.locDirectionsDesc}
              </p>
            </div>

            {/* Address Card */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
              <div className="flex items-start gap-3">
                <Building className="h-5 w-5 text-blue-400 shrink-0 mt-1" />
                <div>
                  <h3 className="text-base font-bold text-white">{settings.instituteName}</h3>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    {settings.addressLine}
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    District: Janjgir-Champa / Baloda Region, Chhattisgarh - {settings.pincode}, India.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-3 border-t border-slate-800 text-xs text-slate-300">
                <a
                  href={`tel:${settings.phone}`}
                  className="flex items-center gap-1.5 hover:text-white transition-colors"
                >
                  <Phone className="h-4 w-4 text-emerald-400" />
                  <span>Call: <strong>{settings.phone}</strong></span>
                </a>
                <span className="text-slate-700">•</span>
                <button
                  onClick={handleWhatsApp}
                  className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  <MessageSquare className="h-4 w-4" />
                  <span>WhatsApp: {settings.phone}</span>
                </button>
              </div>
            </div>

            {/* Social Media Links Card */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                Official Social Profiles & Direct Channels
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* YouTube */}
                <a
                  href={settings.youtubeUrl || 'https://www.youtube.com/@makemestar'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 rounded-xl border border-slate-800 bg-slate-950 p-3 text-xs text-slate-200 hover:border-red-500/40 hover:text-white transition-all group"
                >
                  <div className="p-2 rounded-lg bg-red-500/10 text-red-400 group-hover:scale-105 transition-transform">
                    <Youtube className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="font-semibold">YouTube</div>
                    <div className="text-[11px] text-slate-400">@makemestar</div>
                  </div>
                  <ExternalLink className="h-3.5 w-3.5 ml-auto text-slate-500" />
                </a>

                {/* Instagram */}
                <a
                  href={settings.instagramUrl || 'https://www.instagram.com/santymanikpuri'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 rounded-xl border border-slate-800 bg-slate-950 p-3 text-xs text-slate-200 hover:border-pink-500/40 hover:text-white transition-all group"
                >
                  <div className="p-2 rounded-lg bg-pink-500/10 text-pink-400 group-hover:scale-105 transition-transform">
                    <Instagram className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="font-semibold">Instagram</div>
                    <div className="text-[11px] text-slate-400">@santymanikpuri</div>
                  </div>
                  <ExternalLink className="h-3.5 w-3.5 ml-auto text-slate-500" />
                </a>

                {/* WhatsApp */}
                <a
                  href={`https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(
                    'Hello SP SOLUTIONS, I want to enquire about classes.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 rounded-xl border border-slate-800 bg-slate-950 p-3 text-xs text-slate-200 hover:border-emerald-500/40 hover:text-white transition-all group"
                >
                  <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 group-hover:scale-105 transition-transform">
                    <MessageSquare className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="font-semibold">WhatsApp Desk</div>
                    <div className="text-[11px] text-slate-400">+91 {settings.whatsappNumber}</div>
                  </div>
                  <ExternalLink className="h-3.5 w-3.5 ml-auto text-slate-500" />
                </a>

                {/* Direct Phone / Call */}
                <a
                  href={`tel:${settings.phone}`}
                  className="flex items-center gap-2.5 rounded-xl border border-slate-800 bg-slate-950 p-3 text-xs text-slate-200 hover:border-blue-500/40 hover:text-white transition-all group"
                >
                  <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 group-hover:scale-105 transition-transform">
                    <Phone className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="font-semibold">Direct Call</div>
                    <div className="text-[11px] text-slate-400">{settings.phone}</div>
                  </div>
                  <ExternalLink className="h-3.5 w-3.5 ml-auto text-slate-500" />
                </a>
              </div>
            </div>

            {/* Prominent Action Buttons */}
            <div className="flex flex-wrap gap-3">
              <a
                href={settings.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-xs sm:text-sm font-bold text-white hover:bg-blue-500 shadow transition-all"
              >
                <Navigation className="h-4 w-4" />
                <span>{t.btnGetDirections}</span>
              </a>

              <button
                onClick={handleWhatsApp}
                className="flex items-center gap-2 rounded-xl border border-emerald-500/40 bg-emerald-600/15 px-4 py-3 text-xs sm:text-sm font-bold text-emerald-300 hover:bg-emerald-600/25 transition-all"
              >
                <MessageSquare className="h-4 w-4" />
                <span>{t.btnWhatsApp}</span>
              </button>

              <button
                onClick={onOpenLeadPopup}
                className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-xs sm:text-sm font-semibold text-slate-200 hover:bg-slate-700"
              >
                {t.btnEnquireNow}
              </button>

              <button
                onClick={onOpenDemoBooking}
                className="rounded-xl border border-amber-500/40 bg-amber-500/10 px-4 py-3 text-xs sm:text-sm font-bold text-amber-300 hover:bg-amber-500/20"
              >
                {t.btnBookDemo}
              </button>
            </div>
          </div>

          {/* Right Column: Interactive Map Preview & Google Business Profile transparency */}
          <div className="lg:col-span-6 space-y-6">
            <div className="relative rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-red-400" />
                  <span className="text-xs font-bold text-white">Google Maps Navigation Target</span>
                </div>
                <span className="text-[11px] rounded bg-emerald-500/10 px-2 py-0.5 text-emerald-400 border border-emerald-500/20">
                  Configurable Destination
                </span>
              </div>

              {/* Map Preview graphic */}
              <div className="relative h-64 rounded-xl border border-slate-800 bg-slate-950 flex flex-col items-center justify-center p-6 text-center overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px]" />

                <div className="relative z-10">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/20 text-red-400 border border-red-500/30 mb-3 animate-bounce">
                    <MapPin className="h-7 w-7" />
                  </div>
                  <h4 className="text-sm font-bold text-white">
                    SP SOLUTIONS Learning Centre
                  </h4>
                  <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
                    Village Baloda, Hasuwa, Near Mobile Tower, House No. 359, Chhattisgarh
                  </p>

                  <a
                    href={settings.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-xs font-bold text-white hover:bg-blue-500 shadow transition-all"
                  >
                    <span>Open in Google Maps App</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>

              {/* Google Business Profile Information Note */}
              <div className="mt-5 rounded-xl border border-slate-800 bg-slate-950/80 p-4 text-xs">
                <div className="flex items-start gap-2.5">
                  <ShieldCheck className="h-4 w-4 text-blue-400 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-slate-200">Google Business Profile Integration</h5>
                    <p className="text-slate-400 mt-1 leading-relaxed">
                      {settings.gbpVerificationNotes}
                    </p>
                    <div className="mt-2 flex items-center gap-2 text-[11px] text-blue-400 font-medium">
                      <span>Address structured with LocalBusiness schema (JSON-LD)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
