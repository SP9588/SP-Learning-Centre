import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ThreeServices } from './components/ThreeServices';
import { NearMeClasses } from './components/NearMeClasses';
import { CourseCatalog } from './components/CourseCatalog';
import { SingingSpecialSection } from './components/SingingSpecialSection';
import { AiTutorLab } from './components/AiTutorLab';
import { DemoBookingSection } from './components/DemoBookingSection';
import { LocationSection } from './components/LocationSection';
import { LeadPopup } from './components/LeadPopup';
import { StudentPortal } from './components/StudentPortal';
import { AdminDashboard } from './components/AdminDashboard';
import { LegalModals, LegalDocType } from './components/LegalModals';
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
  const [selectedCourseForPopup, setSelectedCourseForPopup] = useState<string | undefined>();
  const [selectedCourseForModal, setSelectedCourseForModal] = useState<Course | null>(null);
  const [activeLegalDoc, setActiveLegalDoc] = useState<LegalDocType | null>(null);

  // Load data on initial mount
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

    // Check if lead popup should be displayed
    if (loadedSettings.popupEnabled && canShowPopup(loadedSettings.popupFrequency)) {
      const timer = setTimeout(() => {
        setLeadPopupOpen(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
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
      {/* Header Navigation */}
      <Header
        language={language}
        onLanguageChange={setLanguage}
        settings={settings}
        onOpenLeadPopup={() => handleOpenLeadPopup()}
        onOpenDemoBooking={() => handleOpenDemoBooking()}
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

            {/* Three Main Services Highlight */}
            <ThreeServices
              language={language}
              courses={courses}
              onSelectCourse={setSelectedCourseForModal}
              onEnquireCourse={handleOpenLeadPopup}
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

      {/* Legal Modals (Privacy, Terms, Refund, AI Disclaimer, Copyright) */}
      <LegalModals
        docType={activeLegalDoc}
        onClose={() => setActiveLegalDoc(null)}
        language={language}
      />
    </div>
  );
}
