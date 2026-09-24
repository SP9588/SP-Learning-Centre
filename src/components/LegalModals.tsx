import React from 'react';
import { X, ShieldCheck, Lock, AlertTriangle, FileText, Music } from 'lucide-react';
import { Language } from '../types';

export type LegalDocType = 'privacy' | 'terms' | 'refund' | 'disclaimer' | 'copyright';

interface LegalModalsProps {
  docType: LegalDocType | null;
  onClose: () => void;
  language: Language;
}

export const LegalModals: React.FC<LegalModalsProps> = ({ docType, onClose, language }) => {
  if (!docType) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in"
    >
      <div className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-3xl border border-slate-700 bg-slate-900 p-6 sm:p-8 text-left shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-xl p-2 text-slate-400 hover:bg-slate-800 hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>

        {docType === 'privacy' && (
          <div>
            <div className="flex items-center gap-2 text-blue-400 text-xs font-bold uppercase mb-2">
              <Lock className="h-4 w-4" />
              <span>Transparency & Data Protection</span>
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Privacy Policy</h2>
            <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
              <p>
                <strong>SP SOLUTIONS</strong> (&quot;the Institute&quot;), situated at Village Baloda, Hasuwa, House No. 359, Chhattisgarh, India, is committed to the highest standards of student and visitor privacy.
              </p>
              <h4 className="text-white font-bold">1. Voluntary Information Collection</h4>
              <p>
                We do NOT secretly collect any visitor’s name, phone number, email, home address, exact physical location, GPS coordinates, contacts, camera, microphone, or persistent device identifiers without appropriate permission and explicit disclosure.
              </p>
              <h4 className="text-white font-bold">2. Location Data Policy</h4>
              <p>
                Location sharing on our website is entirely <strong>optional</strong>. A visitor may enter their city or village manually OR explicitly click &quot;Use My Location&quot;, which triggers the standard browser permission prompt. We never continuously track visitor locations, nor do we store persistent GPS tracks.
              </p>
              <h4 className="text-white font-bold">3. Use of Information</h4>
              <p>
                Contact information voluntarily provided via enquiry or demo forms is used solely to provide academic counselling, course fee structures, and batch schedule updates via phone or WhatsApp. We never sell, rent, or trade student data with third-party telemarketers.
              </p>
              <h4 className="text-white font-bold">4. Right to Rectification & Deletion</h4>
              <p>
                Any prospective or enrolled student may request deletion of their enquiry contact record by contacting us directly at <strong>9279120271</strong>.
              </p>
            </div>
          </div>
        )}

        {docType === 'disclaimer' && (
          <div>
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase mb-2">
              <AlertTriangle className="h-4 w-4" />
              <span>Academic Disclaimers</span>
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Course & AI Service Disclaimers</h2>
            <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
              <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-4">
                <h4 className="text-amber-300 font-bold mb-1">
                  1. Hindi Bollywood Vocal Course — Classical Singing Exclusion
                </h4>
                <p className="text-amber-200/90 text-xs">
                  <strong>Notice:</strong> Classical singing is excluded from this course offering. Our vocal training focuses exclusively on Hindi Bollywood film songs, romantic/devotional melodies, voice culture (pitch/sur, rhythm/taal, breathing), microphone technique, and stage performance.
                </p>
              </div>

              <h4 className="text-white font-bold">2. AI Tutor & Interactive Practice Lab</h4>
              <p>
                The AI English Tutor, Computer Tutor, and Singing Practice Assistant on this platform are designed solely as supplementary educational practice tools powered by generative AI models. Feedback provided by the AI is for practice assistance and self-study purposes and does not constitute formal accreditation or medical/vocal diagnosis.
              </p>

              <h4 className="text-white font-bold">3. Certifications</h4>
              <p>
                Diploma certifications (such as DCA, ADCA, and Spoken English) are awarded following successful completion of classroom/online modules, minimum 80% attendance, and passing of the institute assessment.
              </p>
            </div>
          </div>
        )}

        {docType === 'copyright' && (
          <div>
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase mb-2">
              <Music className="h-4 w-4" />
              <span>Intellectual Property & Music Compliance</span>
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Copyright & Music Policy</h2>
            <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
              <h4 className="text-white font-bold">1. Bollywood Music & Legal Compliance</h4>
              <p>
                SP SOLUTIONS respects all intellectual property rights. We do not host, store, stream, or distribute unauthorized copyrighted Bollywood master audio recordings or full lyrics on this platform. Song titles mentioned are referenced strictly for educational study guides, pedagogical vocal range analyses, and academic reference under Fair Dealing provisions of the Indian Copyright Act, 1957.
              </p>

              <h4 className="text-white font-bold">2. Original Music Works</h4>
              <p>
                Tracks listed under the <strong>ORIGINAL MUSIC</strong> section are exclusive, original compositions, recordings, and lyrics authored by instructor <strong>Santy Manikpuri</strong> and SP SOLUTIONS student vocalists. All rights are reserved by the creators.
              </p>
            </div>
          </div>
        )}

        {docType === 'terms' && (
          <div>
            <div className="flex items-center gap-2 text-blue-400 text-xs font-bold uppercase mb-2">
              <FileText className="h-4 w-4" />
              <span>Terms of Service</span>
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Terms & Conditions</h2>
            <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
              <p>
                Welcome to <strong>SP SOLUTIONS</strong>. By accessing our website, booking demo classes, or enrolling in our English, Computer, or Vocal courses, you agree to comply with our code of conduct, batch timing policies, and fair educational use standards.
              </p>
              <h4 className="text-white font-bold">Batch Attendance & Code of Conduct</h4>
              <p>
                Students are required to maintain at least 80% attendance to qualify for institute diploma examinations and official certificates. Recording online batch sessions without prior written instructor consent is strictly prohibited.
              </p>
            </div>
          </div>
        )}

        {docType === 'refund' && (
          <div>
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase mb-2">
              <ShieldCheck className="h-4 w-4" />
              <span>Admissions Policy</span>
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Fee Structure & Refund Policy</h2>
            <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
              <p>
                At SP SOLUTIONS, we provide a <strong>100% Free Demo Session</strong> prior to enrollment so students and parents can evaluate faculty, curriculum, and classroom facilities.
              </p>
              <p>
                Course fees paid for classroom or online courses are refundable within the first 3 days of batch commencement (minus nominal registration fee of ₹299). After the completion of the 3-day trial period, fees are non-refundable but can be adjusted towards another batch or course with administrative approval.
              </p>
            </div>
          </div>
        )}

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="rounded-xl bg-slate-800 px-5 py-2 text-xs font-bold text-white hover:bg-slate-700"
          >
            Close Policy
          </button>
        </div>
      </div>
    </div>
  );
};
