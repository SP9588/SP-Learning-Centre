export type Language = 'en' | 'hi';

export type LeadStatus =
  | 'NEW'
  | 'CONTACTED'
  | 'INTERESTED'
  | 'DEMO_BOOKED'
  | 'REGISTERED'
  | 'PAYMENT_PENDING'
  | 'PAID'
  | 'ACTIVE_STUDENT'
  | 'COMPLETED'
  | 'NOT_INTERESTED';

export type LearningMode = 'ONLINE' | 'OFFLINE';

export type CourseLevel = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';

export type CourseCategory = 'english' | 'computer' | 'singing';

export type CourseDuration =
  | '7 Days'
  | '14 Days'
  | '30 Days'
  | '60 Days'
  | '90 Days'
  | '6 Months'
  | '12 Months';

export interface Lead {
  id: string;
  leadId: string;
  name: string;
  mobile: string;
  email?: string;
  villageCity: string;
  state: string;
  country: string;
  optionalAddress?: string;
  preferredCourse: string;
  preferredSubCourse?: string;
  learningMode: LearningMode;
  preferredBatch: string;
  preferredLanguage: Language;
  source: string;
  campaign: string;
  registrationDate: string;
  lastContactedDate: string;
  leadStatus: LeadStatus;
  assignedStaff: string;
  notes: string;
  consentStatus: boolean;
  latitude?: number;
  longitude?: number;
}

export interface CourseLesson {
  id: string;
  title: string;
  titleHi: string;
  type: 'video' | 'audio' | 'pdf' | 'quiz' | 'practice';
  durationMinutes: number;
  summary: string;
  summaryHi: string;
  resourceLink?: string;
  isCopyrightFree?: boolean;
}

export interface CourseModule {
  id: string;
  title: string;
  titleHi: string;
  description: string;
  descriptionHi: string;
  lessons: CourseLesson[];
}

export interface SongWork {
  id: string;
  title: string;
  titleHi: string;
  artistOrSinger: string;
  musicDirector?: string;
  decade: string;
  genre: string;
  difficulty: 'EASY' | 'MEDIUM' | 'CHALLENGING';
  vocalRange: string;
  isOriginal: boolean;
  copyrightNotice: string;
  authorizedAudioPreviewUrl?: string;
  lyricsGuideSummary: string;
  level: CourseLevel;
}

export interface Course {
  id: string;
  slug: string;
  name: string;
  nameHi: string;
  category: CourseCategory;
  subCategory: string;
  tagline: string;
  taglineHi: string;
  description: string;
  descriptionHi: string;
  level: CourseLevel;
  duration: CourseDuration;
  onlineFee: number;
  offlineFee: number;
  monthlyFee?: number;
  registrationFee: number;
  discountPercent: number;
  scholarshipOffer?: string;
  installmentAvailable: boolean;
  offerPriceOnline: number;
  offerPriceOffline: number;
  validity: string;
  taxGstIncluded: boolean;
  isPopular?: boolean;
  highlights: string[];
  highlightsHi: string[];
  modules: CourseModule[];
  songsCatalog?: SongWork[];
}

export interface DemoBooking {
  id: string;
  name: string;
  phone: string;
  email?: string;
  courseId: string;
  courseName: string;
  preferredDate: string;
  preferredTime: string;
  mode: LearningMode;
  message?: string;
  status: 'PENDING' | 'APPROVED' | 'CONFIRMED' | 'COMPLETED' | 'RESCHEDULED' | 'CANCELLED';
  adminNotes?: string;
  classroomOrLink?: string;
  createdAt: string;
}

export interface Batch {
  id: string;
  name: string;
  courseId: string;
  timeSlot: string;
  mode: LearningMode;
  teacherName: string;
  totalSeats: number;
  enrolledCount: number;
  startDate: string;
  status: 'ACTIVE' | 'UPCOMING' | 'COMPLETED';
}

export interface StudentPayment {
  id: string;
  amount: number;
  date: string;
  method: 'UPI' | 'CASH' | 'RAZORPAY_DEMO' | 'BANK_TRANSFER';
  status: 'PAID' | 'PENDING' | 'REFUNDED';
  receiptNo: string;
  courseName: string;
}

export interface StudentAssignment {
  id: string;
  title: string;
  courseName: string;
  dueDate: string;
  status: 'PENDING' | 'SUBMITTED' | 'GRADED';
  grade?: string;
  feedback?: string;
}

export interface StudentCertificate {
  id: string;
  certificateNo: string;
  studentName: string;
  courseName: string;
  issueDate: string;
  grade: string;
  verificationCode: string;
}

export interface Student {
  id: string;
  studentId: string;
  fullName: string;
  mobile: string;
  email: string;
  cityVillage: string;
  state: string;
  selectedCourseId: string;
  level: CourseLevel;
  learningMode: LearningMode;
  preferredBatch: string;
  emergencyContact?: string;
  passwordHash?: string;
  enrolledDate: string;
  status: 'ACTIVE' | 'PENDING_PAYMENT' | 'COMPLETED';
  attendanceRate: number;
  progressPercent: number;
  payments: StudentPayment[];
  assignments: StudentAssignment[];
  certificates: StudentCertificate[];
}

export interface WebsiteSettings {
  instituteName: string;
  tagline: string;
  taglineHi: string;
  addressLine: string;
  landmark: string;
  village: string;
  state: string;
  country: string;
  houseNo: string;
  pincode: string;
  phone: string;
  phoneUrl: string;
  email: string;
  emailUrl: string;
  whatsappNumber: string;
  whatsappUrl: string;
  instagramUsername: string;
  instagramUrl: string;
  youtubeChannel: string;
  youtubeUrl: string;
  facebookUrl: string;
  linkedinUrl: string;
  googleMapsUrl: string;
  officialGbpStatus: string;
  gbpVerificationNotes: string;
  popupEnabled: boolean;
  popupFrequency: 'ALWAYS' | 'ONCE_PER_SESSION' | 'ONCE_PER_DAY';
  defaultCampaign: string;
  activeCampaign?: string;
  paymentGatewayProvider: 'RAZORPAY' | 'UPI' | 'STRIPE';
  razorpayKeyIdPlaceholder: string;
  razorpaySecretConfigured: boolean;
  aiTutorEnabled: boolean;
  englishAiEnabled: boolean;
  computerAiEnabled: boolean;
  singingAiEnabled: boolean;
}

export interface AnalyticsEvent {
  id: string;
  name:
    | 'page_view'
    | 'course_view'
    | 'enquiry_open'
    | 'enquiry_submit'
    | 'demo_booking'
    | 'registration_started'
    | 'registration_completed'
    | 'payment_started'
    | 'payment_completed'
    | 'whatsapp_click'
    | 'call_click'
    | 'directions_click';
  timestamp: string;
  details?: string;
  courseId?: string;
  city?: string;
}
