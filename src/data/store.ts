import { Course, Lead, DemoBooking, Batch, Student, WebsiteSettings, AnalyticsEvent, SongWork } from '../types';
import { initialCourses, initialLeads, initialDemoBookings, initialBatches, initialStudents, initialSettings } from './seedData';

const STORAGE_KEYS = {
  COURSES: 'sp_courses_v2',
  LEADS: 'sp_leads_v2',
  DEMO_BOOKINGS: 'sp_demo_bookings_v2',
  BATCHES: 'sp_batches_v2',
  STUDENTS: 'sp_students_v2',
  SETTINGS: 'sp_settings_v2',
  ANALYTICS: 'sp_analytics_v2',
  POPUP_DISMISSED: 'sp_popup_dismissed_v2',
  POPUP_SUBMITTED: 'sp_popup_submitted_v2',
  AUTH_USER: 'sp_auth_user_v2',
  LANG: 'sp_language_pref',
  VISITOR_COUNT: 'sp_visitor_total_v2',
  VISITOR_SESSION: 'sp_visitor_session_v2',
};

// Safe localStorage helper
function getStoredItem<T>(key: string, defaultValue: T): T {
  if (typeof window === 'undefined') return defaultValue;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return defaultValue;
    return JSON.parse(raw);
  } catch (e) {
    console.error(`Error reading ${key} from storage:`, e);
    return defaultValue;
  }
}

function setStoredItem<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(`Error writing ${key} to storage:`, e);
  }
}

// Courses
export function getCourses(): Course[] {
  return getStoredItem<Course[]>(STORAGE_KEYS.COURSES, initialCourses);
}

export function saveCourses(courses: Course[]): void {
  setStoredItem(STORAGE_KEYS.COURSES, courses);
}

export function updateCourse(updated: Course): void {
  const current = getCourses();
  const next = current.map(c => (c.id === updated.id ? updated : c));
  saveCourses(next);
}

export function addCourse(newCourse: Course): void {
  const current = getCourses();
  saveCourses([...current, newCourse]);
}

export function deleteCourse(id: string): void {
  const current = getCourses();
  saveCourses(current.filter(c => c.id !== id));
}

// Leads
export function getLeads(): Lead[] {
  return getStoredItem<Lead[]>(STORAGE_KEYS.LEADS, initialLeads);
}

export function saveLeads(leads: Lead[]): void {
  setStoredItem(STORAGE_KEYS.LEADS, leads);
}

export interface AddLeadInput {
  name: string;
  mobile: string;
  email?: string;
  villageCity: string;
  preferredCourse: string;
  learningMode: 'ONLINE' | 'OFFLINE';
  consentStatus: boolean;
  latitude?: number;
  longitude?: number;
  source?: string;
  campaign?: string;
}

export function addLead(input: AddLeadInput): { success: boolean; message: string; lead?: Lead } {
  const cleanMobile = input.mobile.replace(/\D/g, '');
  if (cleanMobile.length < 10) {
    return { success: false, message: 'Please enter a valid 10-digit mobile number.' };
  }

  if (!input.name.trim()) {
    return { success: false, message: 'Please provide your name.' };
  }

  if (!input.consentStatus) {
    return { success: false, message: 'Please agree to be contacted to submit the enquiry.' };
  }

  const existingLeads = getLeads();
  // Prevent duplicate submissions within the current session/recent timestamp
  const duplicate = existingLeads.find(
    l => l.mobile.replace(/\D/g, '') === cleanMobile &&
    new Date().getTime() - new Date(l.registrationDate).getTime() < 1000 * 60 * 60 * 12
  );

  if (duplicate) {
    return {
      success: true,
      message: 'You have already submitted an enquiry recently. Our counselor will contact you shortly!',
      lead: duplicate
    };
  }

  const newLead: Lead = {
    id: `lead-${Date.now()}`,
    leadId: `SP-LD-${Math.floor(100 + Math.random() * 900)}`,
    name: input.name.trim(),
    mobile: cleanMobile,
    email: input.email?.trim() || '',
    villageCity: input.villageCity.trim() || 'Baloda',
    state: 'Chhattisgarh',
    country: 'India',
    preferredCourse: input.preferredCourse,
    learningMode: input.learningMode,
    preferredBatch: 'Flexible / To be confirmed',
    preferredLanguage: 'en',
    source: input.source || 'Website Popup Enquiry',
    campaign: input.campaign || 'Admissions 2026-27',
    registrationDate: new Date().toISOString(),
    lastContactedDate: '',
    leadStatus: 'NEW',
    assignedStaff: 'Admissions Desk',
    notes: 'Voluntary enquiry submitted via website form.',
    consentStatus: input.consentStatus,
    latitude: input.latitude,
    longitude: input.longitude,
  };

  saveLeads([newLead, ...existingLeads]);
  logAnalyticsEvent('enquiry_submit', { course: input.preferredCourse, city: input.villageCity });
  setStoredItem(STORAGE_KEYS.POPUP_SUBMITTED, 'true');

  return { success: true, message: 'Enquiry submitted successfully!', lead: newLead };
}

export function updateLeadStatus(leadId: string, status: Lead['leadStatus'], staffNote?: string): void {
  const leads = getLeads();
  const next = leads.map(l => {
    if (l.id === leadId) {
      return {
        ...l,
        leadStatus: status,
        lastContactedDate: new Date().toISOString(),
        notes: staffNote ? `${l.notes}\n[${new Date().toLocaleDateString()}]: ${staffNote}` : l.notes,
      };
    }
    return l;
  });
  saveLeads(next);
}

// Demo Bookings
export function getDemoBookings(): DemoBooking[] {
  return getStoredItem<DemoBooking[]>(STORAGE_KEYS.DEMO_BOOKINGS, initialDemoBookings);
}

export function saveDemoBookings(bookings: DemoBooking[]): void {
  setStoredItem(STORAGE_KEYS.DEMO_BOOKINGS, bookings);
}

export function addDemoBooking(input: Omit<DemoBooking, 'id' | 'createdAt' | 'status'>): DemoBooking {
  const current = getDemoBookings();
  const newBooking: DemoBooking = {
    ...input,
    id: `demo-${Date.now()}`,
    status: 'PENDING',
    createdAt: new Date().toISOString(),
  };
  saveDemoBookings([newBooking, ...current]);
  logAnalyticsEvent('demo_booking', { course: input.courseName, mode: input.mode });
  return newBooking;
}

export function updateDemoBookingStatus(id: string, status: DemoBooking['status'], classroomOrLink?: string): void {
  const current = getDemoBookings();
  const next = current.map(b => (b.id === id ? { ...b, status, classroomOrLink: classroomOrLink || b.classroomOrLink } : b));
  saveDemoBookings(next);
}

// Batches
export function getBatches(): Batch[] {
  return getStoredItem<Batch[]>(STORAGE_KEYS.BATCHES, initialBatches);
}

export function saveBatches(batches: Batch[]): void {
  setStoredItem(STORAGE_KEYS.BATCHES, batches);
}

// Students
export function getStudents(): Student[] {
  return getStoredItem<Student[]>(STORAGE_KEYS.STUDENTS, initialStudents);
}

export function saveStudents(students: Student[]): void {
  setStoredItem(STORAGE_KEYS.STUDENTS, students);
}

export function addStudent(studentData: Omit<Student, 'id' | 'studentId' | 'enrolledDate'>): Student {
  const current = getStudents();
  const newStudent: Student = {
    ...studentData,
    id: `stu-${Date.now()}`,
    studentId: `SP-2026-${String(current.length + 1).padStart(3, '0')}`,
    enrolledDate: new Date().toISOString().split('T')[0],
  };
  saveStudents([newStudent, ...current]);
  logAnalyticsEvent('registration_completed', { course: studentData.selectedCourseId });
  return newStudent;
}

// Settings
export function getSettings(): WebsiteSettings {
  return getStoredItem<WebsiteSettings>(STORAGE_KEYS.SETTINGS, initialSettings);
}

export function saveSettings(settings: WebsiteSettings): void {
  setStoredItem(STORAGE_KEYS.SETTINGS, settings);
}

// Analytics
export function getAnalyticsEvents(): AnalyticsEvent[] {
  return getStoredItem<AnalyticsEvent[]>(STORAGE_KEYS.ANALYTICS, []);
}

export function logAnalyticsEvent(name: AnalyticsEvent['name'], metadata?: Record<string, any>): void {
  if (typeof window === 'undefined') return;
  const current = getAnalyticsEvents();
  const event: AnalyticsEvent = {
    id: `evt-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    name,
    timestamp: new Date().toISOString(),
    details: metadata ? JSON.stringify(metadata) : undefined,
    courseId: metadata?.course,
    city: metadata?.city,
  };
  // Keep last 300 events
  const next = [event, ...current].slice(0, 300);
  setStoredItem(STORAGE_KEYS.ANALYTICS, next);
}

// Popup dismissal / check
export function canShowPopup(frequency: WebsiteSettings['popupFrequency']): boolean {
  if (typeof window === 'undefined') return false;
  if (localStorage.getItem(STORAGE_KEYS.POPUP_SUBMITTED) === 'true') {
    return false; // Already submitted voluntarily
  }

  const dismissedTime = localStorage.getItem(STORAGE_KEYS.POPUP_DISMISSED);
  if (!dismissedTime) return true;

  if (frequency === 'ALWAYS') return true;

  if (frequency === 'ONCE_PER_SESSION') {
    return sessionStorage.getItem('sp_popup_session_closed') !== 'true';
  }

  if (frequency === 'ONCE_PER_DAY') {
    const elapsed = Date.now() - Number(dismissedTime);
    return elapsed > 1000 * 60 * 60 * 24;
  }

  return true;
}

export function markPopupDismissed(): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.POPUP_DISMISSED, String(Date.now()));
  sessionStorage.setItem('sp_popup_session_closed', 'true');
}

// ==============================================================
// VISITOR ANALYTICS & REAL-TIME VISITOR TRACKING
// ==============================================================
const BASELINE_VISITOR_COUNT = 1420;

export function recordVisitorVisit(): { totalVisits: number; isNewSession: boolean } {
  if (typeof window === 'undefined') {
    return { totalVisits: BASELINE_VISITOR_COUNT, isNewSession: false };
  }

  let total = getStoredItem<number>(STORAGE_KEYS.VISITOR_COUNT, BASELINE_VISITOR_COUNT);
  const isExistingSession = sessionStorage.getItem(STORAGE_KEYS.VISITOR_SESSION) === 'active';

  if (!isExistingSession) {
    total += 1;
    setStoredItem(STORAGE_KEYS.VISITOR_COUNT, total);
    sessionStorage.setItem(STORAGE_KEYS.VISITOR_SESSION, 'active');
    logAnalyticsEvent('page_view', { totalVisits: total });
    return { totalVisits: total, isNewSession: true };
  }

  return { totalVisits: total, isNewSession: false };
}

export function getVisitorCount(): number {
  return getStoredItem<number>(STORAGE_KEYS.VISITOR_COUNT, BASELINE_VISITOR_COUNT);
}

export function getLiveActiveVisitors(): number {
  // Realistic concurrent browsing range between 11 and 21 learners
  if (typeof window === 'undefined') return 14;
  const currentMinute = new Date().getMinutes();
  const base = 12;
  const variance = (currentMinute % 9) + 2;
  return base + variance;
}

// Reset all dynamic entities to fresh scratch data
export function resetToFreshScratchData(): void {
  if (typeof window === 'undefined') return;
  setStoredItem(STORAGE_KEYS.LEADS, []);
  setStoredItem(STORAGE_KEYS.DEMO_BOOKINGS, []);
  setStoredItem(STORAGE_KEYS.STUDENTS, []);
  setStoredItem(STORAGE_KEYS.SETTINGS, initialSettings);
}

// CSV Export for Leads
export function exportLeadsToCsv(leads: Lead[]): void {
  if (!leads.length) return;
  const headers = [
    'Lead ID',
    'Name',
    'Mobile',
    'Email',
    'City/Village',
    'State',
    'Course',
    'Mode',
    'Status',
    'Source',
    'Registered Date',
    'Staff Assigned',
    'Notes'
  ];

  const rows = leads.map(l => [
    `"${l.leadId}"`,
    `"${l.name.replace(/"/g, '""')}"`,
    `"${l.mobile}"`,
    `"${l.email || ''}"`,
    `"${l.villageCity}"`,
    `"${l.state}"`,
    `"${l.preferredCourse}"`,
    `"${l.learningMode}"`,
    `"${l.leadStatus}"`,
    `"${l.source}"`,
    `"${l.registrationDate}"`,
    `"${l.assignedStaff}"`,
    `"${(l.notes || '').replace(/"/g, '""').replace(/\n/g, ' ')}"`
  ]);

  const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `SP_SOLUTIONS_LEADS_${new Date().toISOString().split('T')[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// SQL Schema and Migration Export generator for PostgreSQL / Supabase
export function generateSqlSchema(): string {
  return `-- ====================================================================
-- SP SOLUTIONS LEARNING & LEAD MANAGEMENT SAAS
-- COMPLETE POSTGRESQL / SUPABASE SCHEMA MIGRATION SCRIPT
-- ====================================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. ENUM TYPES
CREATE TYPE user_role AS ENUM ('SUPER_ADMIN', 'ADMIN', 'TEACHER', 'STUDENT', 'LEAD_MANAGER');
CREATE TYPE lead_status AS ENUM ('NEW', 'CONTACTED', 'INTERESTED', 'DEMO_BOOKED', 'REGISTERED', 'PAYMENT_PENDING', 'PAID', 'ACTIVE_STUDENT', 'COMPLETED', 'NOT_INTERESTED');
CREATE TYPE learning_mode AS ENUM ('ONLINE', 'OFFLINE');
CREATE TYPE course_level AS ENUM ('BEGINNER', 'INTERMEDIATE', 'ADVANCED');
CREATE TYPE payment_status AS ENUM ('PAID', 'PENDING', 'FAILED', 'REFUNDED');

-- 3. PROFILES & ROLES TABLE
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  phone TEXT UNIQUE,
  role user_role DEFAULT 'STUDENT',
  city_village TEXT,
  state TEXT DEFAULT 'Chhattisgarh',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. LEADS TABLE (Privacy Compliant)
CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lead_code TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  mobile TEXT NOT NULL,
  email TEXT,
  village_city TEXT DEFAULT 'Baloda',
  state TEXT DEFAULT 'Chhattisgarh',
  country TEXT DEFAULT 'India',
  preferred_course TEXT NOT NULL,
  learning_mode learning_mode DEFAULT 'OFFLINE',
  preferred_batch TEXT,
  preferred_language TEXT DEFAULT 'en',
  source TEXT DEFAULT 'Website Popup',
  campaign TEXT DEFAULT 'Admissions 2026-27',
  lead_status lead_status DEFAULT 'NEW',
  assigned_staff TEXT DEFAULT 'Admissions Desk',
  notes TEXT,
  consent_status BOOLEAN NOT NULL DEFAULT TRUE,
  consent_timestamp TIMESTAMPTZ DEFAULT NOW(),
  latitude NUMERIC(10, 7),
  longitude NUMERIC(10, 7),
  last_contacted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. COURSES TABLE
CREATE TABLE IF NOT EXISTS courses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  name_hi TEXT NOT NULL,
  category TEXT NOT NULL, -- 'english', 'computer', 'singing'
  sub_category TEXT,
  tagline TEXT,
  tagline_hi TEXT,
  description TEXT,
  description_hi TEXT,
  level course_level DEFAULT 'BEGINNER',
  duration TEXT NOT NULL,
  online_fee NUMERIC(10,2) NOT NULL,
  offline_fee NUMERIC(10,2) NOT NULL,
  monthly_fee NUMERIC(10,2),
  registration_fee NUMERIC(10,2) DEFAULT 299.00,
  discount_percent INT DEFAULT 0,
  tax_gst_included BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. DEMO BOOKINGS TABLE
CREATE TABLE IF NOT EXISTS demo_bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lead_id UUID REFERENCES leads(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  course_id TEXT NOT NULL,
  course_name TEXT NOT NULL,
  preferred_date DATE NOT NULL,
  preferred_time TEXT NOT NULL,
  mode learning_mode DEFAULT 'OFFLINE',
  status TEXT DEFAULT 'PENDING',
  classroom_or_link TEXT,
  admin_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. BATCHES TABLE
CREATE TABLE IF NOT EXISTS batches (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  course_id UUID REFERENCES courses(id),
  time_slot TEXT NOT NULL,
  mode learning_mode DEFAULT 'OFFLINE',
  teacher_name TEXT NOT NULL,
  total_seats INT DEFAULT 25,
  enrolled_count INT DEFAULT 0,
  start_date DATE,
  status TEXT DEFAULT 'ACTIVE',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. PAYMENTS TABLE
CREATE TABLE IF NOT EXISTS payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID,
  lead_id UUID REFERENCES leads(id),
  amount NUMERIC(10,2) NOT NULL,
  payment_method TEXT NOT NULL,
  receipt_no TEXT UNIQUE NOT NULL,
  gateway_payment_id TEXT,
  status payment_status DEFAULT 'PAID',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. ROW LEVEL SECURITY (RLS)
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- Policy: Only Admins can view/edit leads
CREATE POLICY admin_leads_all ON leads
  FOR ALL
  TO authenticated
  USING (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role IN ('SUPER_ADMIN', 'ADMIN', 'LEAD_MANAGER')));

-- Policy: Public can insert lead with consent
CREATE POLICY public_lead_insert ON leads
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (consent_status = TRUE);
`;
}
