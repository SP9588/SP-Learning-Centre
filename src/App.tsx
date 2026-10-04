import React, { useState, useEffect } from 'react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ThreeServices } from './components/ThreeServices';
import { NearMeClasses } from './components/NearMeClasses';
import { OnlineClassesSection } from './components/OnlineClassesSection';
import { CourseCatalog } from './components/CourseCatalog';
import { SingingSpecialSection } from './components/SingingSpecialSection';
import { AiTutorLab } from './components/AiTutorLab';
import { DemoBookingSection } from './components/DemoBookingSection';
import { GoogleMapsRadarSection } from './components/GoogleMapsRadarSection';
import { GoogleRankingSection } from './components/GoogleRankingSection';
import { LocationSection } from './components/LocationSection';
import { LeadPopup } from './components/LeadPopup';
import { StudentPortal } from './components/StudentPortal';
import { AdminDashboard } from './components/AdminDashboard';
import { LegalModals, LegalDocType } from './components/LegalModals';
import { SocialShareModal } from './components/SocialShareModal';
import { Footer } from './components/Footer';

import {
  getCourses,
  getLeads,
  getBatches,
  getDemoBookings,
  getStudents,
  getSettings,
  canShowPopup,
  markPopupDismissed,
  logAnalyticsEvent,
  recordVisitorVisit
} from './data/store';
import { Course, Lead, Batch, DemoBooking, Student, WebsiteSettings, Language } from './types';

export default function App() {
  // App State
  const [language, setLanguage] = useState<Language>('en');
  const [activeView, setActiveView] = useState<'landing' | 'student' | 'admin'>('landing');

  // Stored State
  const [courses, setCourses] = useState<Course[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [batches, setBatches] = useState<Batch[]>([]);
  const [demoBookings, setDemoBookings] = useState<DemoBooking[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [settings, setSettings] = useState<WebsiteSettings>(getSettings());

  // Popups & Modals State
  const [leadPopupOpen, setLeadPopupOpen] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [selectedCourseForPopup, setSelectedCourseForPopup] = useState<string | undefined>();
  const [selectedCourseForModal, setSelectedCourseForModal] = useState<Course | null>(null);
  const [activeLegalDoc, setActiveLegalDoc] = useState<LegalDocType | null>(null);
  const [gmpQuotaExceeded, setGmpQuotaExceeded] = useState(false);

  // Load data on initial mount and listen to GMP quota events
  useEffect(() => {
    const loadedCourses = getCourses();
    const loadedLeads = getLeads();
    const loadedBatches = getBatches();
    const loadedDemos = getDemoBookings();
    const loadedStudents = getStudents();
    const loadedSettings = getSettings();

    setCourses(loadedCourses);
    setLeads(loadedLeads);
    setBatches(loadedBatches);
    setDemoBookings(loadedDemos);
    setStudents(loadedStudents);
    setSettings(loadedSettings);

    recordVisitorVisit();
    logAnalyticsEvent('page_view', { view: 'landing' });

    // Quota defense listener
    const handleQuotaExceeded = () => {
      setGmpQuotaExceeded(true);
    };
    window.addEventListener('gmp-quota-exceeded', handleQuotaExceeded);

    // Check if lead popup should be displayed
    if (loadedSettings.popupEnabled && canShowPopup(loadedSettings.popupFrequency)) {
      const timer = setTimeout(() => {
        setLeadPopupOpen(true);
      }, 1500);
      return () => {
        clearTimeout(timer);
        window.removeEventListener('gmp-quota-exceeded', handleQuotaExceeded);
      };
    }

    return () => {
      window.removeEventListener('gmp-quota-exceeded', handleQuotaExceeded);
    };
  }, []);

  const refreshAllData = () => {
    setCourses(getCourses());
    setLeads(getLeads());
    setBatches(getBatches());
    setDemoBookings(getDemoBookings());
    setStudents(getStudents());
    setSettings(getSettings());
  };

  const handleOpenLeadPopup = (courseName?: string) => {
    setSelectedCourseForPopup(courseName);
    setLeadPopupOpen(true);
    logAnalyticsEvent('enquiry_open', { course: courseName });
  };

  const handleCloseLeadPopup = () => {
    setLeadPopupOpen(false);
    markPopupDismissed();
  };

  const handleOpenDemoBooking = (courseName?: string) => {
    if (activeView !== 'landing') {
      setActiveView('landing');
    }
    setTimeout(() => {
      const el = document.getElementById('demo');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleExploreCourses = () => {
    const el = document.getElementById('courses');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-100 selection:bg-blue-600 selection:text-white">
      {/* Google Maps Platform Quota Notice Banner (CF8 Quota Defense) */}
      {gmpQuotaExceeded && (
        <div className="bg-amber-50 border-b border-amber-200 text-amber-900 px-4 py-2.5 text-xs md:text-sm text-center sticky top-0 z-50 shadow-sm">
          <span>
            Google Maps Platform quota reached. If you are the app owner, visit{' '}
            <a
              href="https://developers.google.com/maps/ai/ai-studio?utm_campaign=gmp_mcp_codeassist_v1_aistudio#quota_exceeded_errors"
              target="_blank"
              rel="noopener noreferrer"
              className="underline font-semibold text-amber-950 hover:text-amber-800"
            >
              maps developer site
            </a>{' '}
            for instructions to update your account.
          </span>
        </div>
      )}

      {/* Header Navigation */}
      <Header
        language={language}
        onLanguageChange={setLanguage}
        settings={settings}
        onOpenLeadPopup={() => handleOpenLeadPopup()}
        onOpenDemoBooking={() => handleOpenDemoBooking()}
        onOpenShareModal={() => setShareModalOpen(true)}
        activeView={activeView}
        setActiveView={setActiveView as any}
      />

      {/* Main Content Router */}
      <main>
        {activeView === 'landing' && (
          <>
            {/* Hero Section */}
            <Hero
              language={language}
              settings={settings}
              onOpenLeadPopup={() => handleOpenLeadPopup()}
              onOpenDemoBooking={() => handleOpenDemoBooking()}
              onExploreCourses={handleExploreCourses}
            />

            {/* Automated 'Near Me' Classes Section for SEO & Instant Local/Global Discovery */}
            <NearMeClasses
              language={language}
              settings={settings}
              onOpenLeadPopup={handleOpenLeadPopup}
              onOpenDemoBooking={handleOpenDemoBooking}
            />

            {/* Google Search Access & Ranking Simulator */}
            <GoogleRankingSection
              language={language}
              onOpenShareModal={() => setShareModalOpen(true)}
            />

            {/* Live Online Classes & Interactive Lessons Portal */}
            <OnlineClassesSection
              language={language}
              onOpenLeadPopup={() => handleOpenLeadPopup()}
            />

            {/* Three Main Services Highlight */}
            <ThreeServices
              language={language}
              courses={courses}
              onSelectCourse={setSelectedCourseForModal}
              onEnquireCourse={handleOpenLeadPopup}
            />

            {/* Google Maps Autonomous Radar & Buyers/Receivers Registry */}
            <GoogleMapsRadarSection
              language={language}
              onOpenLeadPopup={() => handleOpenLeadPopup()}
            />

            {/* Course Catalog & Fees */}
            <CourseCatalog
              language={language}
              courses={courses}
              selectedCourseForModal={selectedCourseForModal}
              setSelectedCourseForModal={setSelectedCourseForModal}
              onEnquireCourse={handleOpenLeadPopup}
              onOpenDemoBooking={handleOpenDemoBooking}
            />

            {/* Hindi Bollywood Vocal Learning Section */}
            <SingingSpecialSection
              language={language}
              onEnquireCourse={handleOpenLeadPopup}
              onOpenDemoBooking={() => handleOpenDemoBooking('Hindi Bollywood Vocal Learning & Singing Mastery')}
            />

            {/* AI Tutor & Practice Lab */}
            <AiTutorLab language={language} />

            {/* Demo Class Booking Form */}
            <DemoBookingSection
              language={language}
              courses={courses}
              preselectedCourseName={selectedCourseForPopup}
            />

            {/* Location & Directions (Baloda, Hasuwa, House 359) */}
            <LocationSection
              language={language}
              settings={settings}
              onOpenLeadPopup={() => handleOpenLeadPopup()}
              onOpenDemoBooking={() => handleOpenDemoBooking()}
            />
          </>
        )}

        {/* Student Portal View */}
        {activeView === 'student' && (
          <StudentPortal
            language={language}
            students={students}
            courses={courses}
            batches={batches}
            onOpenLeadPopup={() => handleOpenLeadPopup()}
            onOpenDemoBooking={() => handleOpenDemoBooking()}
            onBackToLanding={() => setActiveView('landing')}
          />
        )}

        {/* Admin Dashboard & CRM View */}
        {activeView === 'admin' && (
          <AdminDashboard
            language={language}
            leads={leads}
            courses={courses}
            batches={batches}
            demoBookings={demoBookings}
            students={students}
            settings={settings}
            onUpdateLeads={refreshAllData}
            onUpdateCourses={refreshAllData}
            onUpdateSettings={setSettings}
            onBackToLanding={() => setActiveView('landing')}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        settings={settings}
        language={language}
        onOpenLegalDoc={setActiveLegalDoc}
        onOpenLeadPopup={() => handleOpenLeadPopup()}
        onOpenDemoBooking={() => handleOpenDemoBooking()}
        onNavigateView={setActiveView as any}
      />

      {/* Responsive Lead Popup with Voluntary Location */}
      <LeadPopup
        isOpen={leadPopupOpen}
        onClose={handleCloseLeadPopup}
        language={language}
        courses={courses}
        preselectedCourse={selectedCourseForPopup}
        campaign={settings.activeCampaign}
      />

      {/* Global Social Share Modal (LinkedIn, GitHub, OpenAI, Facebook, WhatsApp, Threads, Discord) */}
      <SocialShareModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        language={language}
      />

      {/* Legal Modals (Privacy, Terms, Refund, AI Disclaimer, Copyright) */}
      <LegalModals
        docType={activeLegalDoc}
        onClose={() => setActiveLegalDoc(null)}
        language={language}
      />

      {/* Vercel Speed Insights */}
      <SpeedInsights />
    </div>
  );
}
