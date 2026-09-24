import React, { useState } from 'react';
import {
  GraduationCap,
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  Award,
  CreditCard,
  FileText,
  User,
  Bell,
  MessageSquare,
  Sparkles,
  Download,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Video,
  AlertCircle
} from 'lucide-react';
import { Student, Course, Batch, Language, LearningMode, CourseLevel } from '../types';
import { addStudent } from '../data/store';
import { translations } from '../locales/translations';

interface StudentPortalProps {
  language: Language;
  students: Student[];
  courses: Course[];
  batches: Batch[];
  onOpenLeadPopup: () => void;
  onOpenDemoBooking: () => void;
  onBackToLanding: () => void;
}

export const StudentPortal: React.FC<StudentPortalProps> = ({
  language,
  students,
  courses,
  batches,
  onOpenLeadPopup,
  onOpenDemoBooking,
  onBackToLanding,
}) => {
  const t = translations[language];

  // Active student selection or new registration mode
  const [selectedStudentId, setSelectedStudentId] = useState<string>(students[0]?.id || '');
  const [activeTab, setActiveTab] = useState<
    'courses' | 'progress' | 'classes' | 'assignments' | 'attendance' | 'payments' | 'certificates' | 'register'
  >('courses');

  // Certificate viewing modal
  const [viewingCertificate, setViewingCertificate] = useState<any | null>(null);

  // New Student Registration form state
  const [regName, setRegName] = useState('');
  const [regMobile, setRegMobile] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regCity, setRegCity] = useState('Baloda');
  const [regCourseId, setRegCourseId] = useState(courses[0]?.id || '');
  const [regLevel, setRegLevel] = useState<CourseLevel>('BEGINNER');
  const [regMode, setRegMode] = useState<LearningMode>('OFFLINE');
  const [regBatch, setRegBatch] = useState(batches[0]?.id || '');
  const [regConsent, setRegConsent] = useState(true);
  const [regSuccessNote, setRegSuccessNote] = useState('');

  const activeStudent = students.find(s => s.id === selectedStudentId) || students[0];
  const enrolledCourse = courses.find(c => c.id === activeStudent?.selectedCourseId) || courses[0];
  const studentBatch = batches.find(b => b.id === activeStudent?.preferredBatch) || batches[0];

  const handleRegisterNewStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName.trim() || regMobile.length < 10) {
      alert('Please provide your full name and valid 10-digit mobile number.');
      return;
    }

    const newStu = addStudent({
      fullName: regName.trim(),
      mobile: regMobile.trim(),
      email: regEmail.trim(),
      cityVillage: regCity.trim(),
      state: 'Chhattisgarh',
      selectedCourseId: regCourseId,
      level: regLevel,
      learningMode: regMode,
      preferredBatch: regBatch,
      status: 'ACTIVE',
      attendanceRate: 100,
      progressPercent: 5,
      payments: [
        {
          id: `pay-${Date.now()}`,
          amount: 500,
          date: new Date().toISOString().split('T')[0],
          method: 'UPI',
          status: 'PAID',
          receiptNo: `REC-SP-${Math.floor(100 + Math.random() * 900)}`,
          courseName: courses.find(c => c.id === regCourseId)?.name || 'Course Registration',
        }
      ],
      assignments: [],
      certificates: [],
    });

    setRegSuccessNote(`Registration Successful! Student ID: ${newStu.studentId}`);
    setSelectedStudentId(newStu.id);
    setTimeout(() => {
      setActiveTab('courses');
      setRegSuccessNote('');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-20">
      {/* Top Banner / Student Switcher */}
      <div className="border-b border-slate-800 bg-slate-900/80 px-4 py-4 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToLanding}
              className="text-xs font-semibold text-slate-400 hover:text-white transition-colors"
            >
              &larr; Back to Website
            </button>
            <span className="text-slate-700">|</span>
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white font-bold">
                <GraduationCap className="h-5 w-5" />
              </div>
              <div>
                <h1 className="text-sm font-bold text-white">SP Student Portal</h1>
                <span className="text-[11px] text-slate-400">
                  Learning Management System • Baloda & Online
                </span>
              </div>
            </div>
          </div>

          {/* Student Switcher dropdown for testing & multi-student support */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400">Current Student:</span>
            <select
              value={selectedStudentId}
              onChange={e => {
                setSelectedStudentId(e.target.value);
                if (activeTab === 'register') setActiveTab('courses');
              }}
              className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-1.5 text-xs text-white focus:border-blue-500 focus:outline-none"
            >
              {students.map(s => (
                <option key={s.id} value={s.id}>
                  {s.fullName} ({s.studentId})
                </option>
              ))}
            </select>

            <button
              onClick={() => setActiveTab('register')}
              className="rounded-lg bg-blue-600 px-3 py-1.5 font-bold text-white hover:bg-blue-500 text-xs shadow"
            >
              + New Student Admission
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
        {/* Student Profile Card */}
        {activeStudent && activeTab !== 'register' && (
          <div className="mb-6 rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-xl font-black text-white shadow-lg shadow-blue-500/20">
                  {activeStudent.fullName.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-white">{activeStudent.fullName}</h2>
                    <span className="rounded bg-emerald-500/10 px-2 py-0.5 text-[11px] font-semibold text-emerald-400 border border-emerald-500/20">
                      {activeStudent.status}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 mt-1">
                    <span>ID: <strong className="text-slate-200">{activeStudent.studentId}</strong></span>
                    <span>•</span>
                    <span>Course: <strong className="text-blue-400">{enrolledCourse?.name}</strong></span>
                    <span>•</span>
                    <span>Mode: <strong className="text-slate-200">{activeStudent.learningMode}</strong></span>
                    <span>•</span>
                    <span>City/Village: <strong>{activeStudent.cityVillage}</strong></span>
                  </div>
                </div>
              </div>

              {/* Progress Summary bar */}
              <div className="sm:text-right">
                <div className="text-xs text-slate-400 mb-1">Overall Course Progress</div>
                <div className="flex items-center gap-3">
                  <div className="w-36 h-2.5 rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-emerald-400 rounded-full"
                      style={{ width: `${activeStudent.progressPercent}%` }}
                    />
                  </div>
                  <span className="text-sm font-bold text-emerald-400">{activeStudent.progressPercent}%</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-6 border-b border-slate-800 pb-3">
          {[
            { id: 'courses', label: 'My Courses', icon: BookOpen },
            { id: 'progress', label: 'My Progress', icon: CheckCircle2 },
            { id: 'classes', label: 'My Classes & Batches', icon: Calendar },
            { id: 'assignments', label: 'My Assignments', icon: FileText },
            { id: 'attendance', label: 'My Attendance', icon: Clock },
            { id: 'payments', label: 'My Payments', icon: CreditCard },
            { id: 'certificates', label: 'Certificates', icon: Award },
            { id: 'register', label: 'Course Registration', icon: GraduationCap },
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition-all ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                    : 'bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-white border border-slate-800'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: MY COURSES */}
        {activeTab === 'courses' && enrolledCourse && (
          <div className="space-y-6">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4 mb-6">
                <div>
                  <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">
                    Enrolled Active Course
                  </span>
                  <h3 className="text-xl font-bold text-white mt-1">
                    {language === 'hi' ? enrolledCourse.nameHi : enrolledCourse.name}
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {enrolledCourse.subCategory} • Duration: {enrolledCourse.duration}
                  </p>
                </div>
                <div className="text-xs text-slate-400">
                  Access: <span className="text-emerald-400 font-semibold">{enrolledCourse.validity}</span>
                </div>
              </div>

              {/* Modules breakdown */}
              <div className="space-y-4">
                {enrolledCourse.modules.map((mod, idx) => (
                  <div key={mod.id} className="rounded-xl border border-slate-800 bg-slate-950 p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-bold text-white flex items-center gap-2">
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-500/20 text-[11px] text-blue-400">
                          {idx + 1}
                        </span>
                        <span>{language === 'hi' ? mod.titleHi : mod.title}</span>
                      </h4>
                      <span className="text-[11px] text-slate-500">{mod.lessons.length} Lessons</span>
                    </div>

                    <p className="text-xs text-slate-400 mb-3 ml-7">
                      {language === 'hi' ? mod.descriptionHi : mod.description}
                    </p>

                    <div className="space-y-2 ml-7">
                      {mod.lessons.map(les => (
                        <div
                          key={les.id}
                          className="flex items-center justify-between rounded-lg border border-slate-800/80 bg-slate-900/60 p-2.5 text-xs text-slate-200"
                        >
                          <div className="flex items-center gap-2">
                            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-blue-600/10 text-blue-400">
                              <BookOpen className="h-3.5 w-3.5" />
                            </span>
                            <span className="font-medium">
                              {language === 'hi' ? les.titleHi : les.title}
                            </span>
                          </div>

                          <div className="flex items-center gap-3">
                            <span className="text-[11px] text-slate-500">{les.durationMinutes} mins</span>
                            <button
                              onClick={() => alert(`Starting lesson: ${les.title}. Study notes and video player ready.`)}
                              className="rounded bg-blue-600/20 px-2.5 py-1 text-[11px] font-bold text-blue-300 hover:bg-blue-600 hover:text-white transition-colors"
                            >
                              Launch Lesson
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: MY PROGRESS */}
        {activeTab === 'progress' && (
          <div className="grid gap-6 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 text-center">
              <div className="text-3xl font-extrabold text-blue-400">{activeStudent.progressPercent}%</div>
              <div className="text-xs font-semibold text-slate-300 mt-1">Syllabus Completed</div>
              <p className="text-[11px] text-slate-400 mt-2">
                Keep up the daily attendance to unlock the final certification exam.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 text-center">
              <div className="text-3xl font-extrabold text-emerald-400">{activeStudent.attendanceRate}%</div>
              <div className="text-xs font-semibold text-slate-300 mt-1">Attendance Record</div>
              <p className="text-[11px] text-slate-400 mt-2">
                Eligible for certification (Minimum 80% required).
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 text-center">
              <div className="text-3xl font-extrabold text-amber-400">
                {activeStudent.assignments.filter(a => a.status === 'SUBMITTED' || a.status === 'GRADED').length}
              </div>
              <div className="text-xs font-semibold text-slate-300 mt-1">Assignments Done</div>
              <p className="text-[11px] text-slate-400 mt-2">
                Practical lab assignments submitted and verified.
              </p>
            </div>
          </div>
        )}

        {/* TAB 3: MY CLASSES & BATCHES */}
        {activeTab === 'classes' && (
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
            <h3 className="text-lg font-bold text-white mb-4">Class Schedule & Batch Details</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-xl border border-slate-800 bg-slate-950 p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-blue-400 uppercase">Assigned Batch</span>
                  <span className="rounded bg-emerald-500/10 px-2 py-0.5 text-[10px] text-emerald-400 font-semibold">
                    {studentBatch.status}
                  </span>
                </div>
                <h4 className="text-base font-bold text-white">{studentBatch.name}</h4>
                <div className="text-xs text-slate-300 space-y-1.5">
                  <div>Timing: <strong>{studentBatch.timeSlot}</strong></div>
                  <div>Faculty: <strong>{studentBatch.teacherName}</strong></div>
                  <div>Mode: <strong>{activeStudent.learningMode}</strong></div>
                </div>

                {activeStudent.learningMode === 'OFFLINE' ? (
                  <div className="rounded-lg bg-blue-950/30 border border-blue-500/20 p-3 text-xs text-blue-300">
                    <strong>Classroom Venue:</strong> SP SOLUTIONS, Village Baloda, Hasuwa, Near Mobile Tower, House No. 359, Chhattisgarh.
                  </div>
                ) : (
                  <div className="rounded-lg bg-emerald-950/30 border border-emerald-500/20 p-3 text-xs text-emerald-300">
                    <strong>Live Meeting Link:</strong> https://meet.google.com/sp-solutions-live
                  </div>
                )}
              </div>

              {/* Faculty support card */}
              <div className="rounded-xl border border-slate-800 bg-slate-950 p-5 space-y-3">
                <h4 className="text-sm font-bold text-white">Contact Faculty / Mentor</h4>
                <p className="text-xs text-slate-400">
                  Have doubts in your Spoken English, DCA/ADCA practicals, or Bollywood vocal pitch exercises?
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  <a
                    href="tel:9279120271"
                    className="rounded-lg bg-slate-800 border border-slate-700 px-3 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-700"
                  >
                    Call Faculty: 9279120271
                  </a>
                  <a
                    href="https://wa.me/919279120271"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg bg-emerald-600/20 border border-emerald-500/30 px-3 py-2 text-xs font-semibold text-emerald-300 hover:bg-emerald-600/30"
                  >
                    WhatsApp Mentor
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: MY ASSIGNMENTS */}
        {activeTab === 'assignments' && (
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
            <h3 className="text-lg font-bold text-white mb-4">Course Practical Assignments</h3>
            {activeStudent.assignments.length === 0 ? (
              <p className="text-xs text-slate-400">No pending assignments at this moment.</p>
            ) : (
              <div className="space-y-3">
                {activeStudent.assignments.map(asg => (
                  <div key={asg.id} className="rounded-xl border border-slate-800 bg-slate-950 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-sm">{asg.title}</span>
                        <span className="rounded bg-emerald-500/10 px-2 py-0.5 text-[10px] text-emerald-400 font-semibold">
                          {asg.status}
                        </span>
                        {asg.grade && (
                          <span className="rounded bg-blue-500/10 px-2 py-0.5 text-[10px] text-blue-400 font-bold">
                            Grade: {asg.grade}
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-slate-400 mt-1">
                        Course: {asg.courseName} • Due: {asg.dueDate}
                      </div>
                      {asg.feedback && (
                        <div className="mt-2 text-xs text-slate-300 bg-slate-900 p-2 rounded border border-slate-800">
                          <strong>Faculty Feedback:</strong> {asg.feedback}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 5: MY ATTENDANCE */}
        {activeTab === 'attendance' && (
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
            <h3 className="text-lg font-bold text-white mb-3">Attendance Logs</h3>
            <p className="text-xs text-slate-400 mb-6">
              Official attendance maintained for government certificate issuance and exam qualification.
            </p>
            <div className="grid gap-3 sm:grid-cols-4">
              <div className="rounded-xl bg-slate-950 border border-slate-800 p-4 text-center">
                <div className="text-2xl font-bold text-emerald-400">48</div>
                <div className="text-xs text-slate-400">Classes Attended</div>
              </div>
              <div className="rounded-xl bg-slate-950 border border-slate-800 p-4 text-center">
                <div className="text-2xl font-bold text-red-400">3</div>
                <div className="text-xs text-slate-400">Absences (With Leave)</div>
              </div>
              <div className="rounded-xl bg-slate-950 border border-slate-800 p-4 text-center">
                <div className="text-2xl font-bold text-blue-400">{activeStudent.attendanceRate}%</div>
                <div className="text-xs text-slate-400">Attendance Percentage</div>
              </div>
              <div className="rounded-xl bg-slate-950 border border-slate-800 p-4 text-center">
                <div className="text-2xl font-bold text-emerald-400">Eligible</div>
                <div className="text-xs text-slate-400">Exam Eligibility</div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: MY PAYMENTS */}
        {activeTab === 'payments' && (
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
            <h3 className="text-lg font-bold text-white mb-4">Payment Receipts & Fee Status</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-slate-800 text-slate-400 uppercase tracking-wider">
                  <tr>
                    <th className="pb-3">Receipt No</th>
                    <th className="pb-3">Course</th>
                    <th className="pb-3">Amount</th>
                    <th className="pb-3">Method</th>
                    <th className="pb-3">Date</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-200">
                  {activeStudent.payments.map(pay => (
                    <tr key={pay.id}>
                      <td className="py-3 font-mono font-bold text-blue-400">{pay.receiptNo}</td>
                      <td className="py-3">{pay.courseName}</td>
                      <td className="py-3 font-bold text-white">₹{pay.amount}</td>
                      <td className="py-3">{pay.method}</td>
                      <td className="py-3 text-slate-400">{pay.date}</td>
                      <td className="py-3">
                        <span className="rounded bg-emerald-500/10 px-2 py-0.5 text-[10px] text-emerald-400 font-semibold">
                          {pay.status}
                        </span>
                      </td>
                      <td className="py-3 text-right">
                        <button
                          onClick={() => alert(`Downloading official receipt ${pay.receiptNo} from SP SOLUTIONS...`)}
                          className="flex items-center gap-1 rounded bg-slate-800 px-2.5 py-1 text-[11px] text-slate-300 hover:text-white ml-auto"
                        >
                          <Download className="h-3 w-3" />
                          <span>Receipt</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 7: CERTIFICATES */}
        {activeTab === 'certificates' && (
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
            <h3 className="text-lg font-bold text-white mb-2">Verified Course Certificates</h3>
            <p className="text-xs text-slate-400 mb-6">
              Certificates issued by SP SOLUTIONS (Baloda, Chhattisgarh). Each certificate contains a unique verification code.
            </p>

            {activeStudent.certificates.length === 0 ? (
              <div className="rounded-xl border border-slate-800 bg-slate-950 p-8 text-center">
                <Award className="h-10 w-10 text-slate-600 mx-auto mb-2" />
                <p className="text-xs text-slate-400">No certificates issued yet.</p>
                <span className="text-[11px] text-slate-500 mt-1 block">
                  Complete your course syllabus and practical exam to generate your certificate.
                </span>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {activeStudent.certificates.map(cert => (
                  <div key={cert.id} className="rounded-xl border border-amber-500/30 bg-slate-950 p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-amber-400">CERTIFICATE OF COMPLETION</span>
                      <span className="text-[11px] font-mono text-slate-500">{cert.certificateNo}</span>
                    </div>

                    <h4 className="text-base font-bold text-white">{cert.courseName}</h4>
                    <div className="text-xs text-slate-300">
                      Awarded to: <strong>{cert.studentName}</strong> ({cert.grade})
                    </div>
                    <div className="text-[11px] text-slate-400">
                      Issue Date: {cert.issueDate} • Verification Code: <span className="font-mono text-emerald-400">{cert.verificationCode}</span>
                    </div>

                    <div className="pt-2">
                      <button
                        onClick={() => setViewingCertificate(cert)}
                        className="rounded-lg bg-amber-500 px-4 py-2 text-xs font-bold text-slate-950 hover:bg-amber-400 shadow"
                      >
                        View & Print Certificate
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 8: COURSE REGISTRATION FORM */}
        {activeTab === 'register' && (
          <div className="max-w-2xl mx-auto rounded-3xl border border-slate-800 bg-slate-900/80 p-6 sm:p-10 shadow-2xl">
            <div className="mb-6">
              <span className="rounded bg-blue-500/10 px-2.5 py-1 text-xs font-semibold text-blue-400 border border-blue-500/20">
                Official Admission Form
              </span>
              <h3 className="text-2xl font-bold text-white mt-2">Student Course Registration</h3>
              <p className="text-xs text-slate-400 mt-1">
                Enroll for classroom batches in Baloda, Chhattisgarh or live interactive sessions online.
              </p>
            </div>

            {regSuccessNote && (
              <div className="mb-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-xs text-emerald-300">
                {regSuccessNote}
              </div>
            )}

            <form onSubmit={handleRegisterNewStudent} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={regName}
                    onChange={e => setRegName(e.target.value)}
                    placeholder="Student Full Name"
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Mobile Number (10 Digits) *</label>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    value={regMobile}
                    onChange={e => setRegMobile(e.target.value)}
                    placeholder="98261XXXXX"
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2 text-xs text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={regEmail}
                    onChange={e => setRegEmail(e.target.value)}
                    placeholder="student@gmail.com"
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">City / Village *</label>
                  <input
                    type="text"
                    required
                    value={regCity}
                    onChange={e => setRegCity(e.target.value)}
                    placeholder="e.g. Baloda / Hasuwa"
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2 text-xs text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Selected Course *</label>
                  <select
                    value={regCourseId}
                    onChange={e => setRegCourseId(e.target.value)}
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white"
                  >
                    {courses.map(c => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Learning Mode *</label>
                  <select
                    value={regMode}
                    onChange={e => setRegMode(e.target.value as LearningMode)}
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white"
                  >
                    <option value="OFFLINE">Baloda Classroom (Near Mobile Tower, House 359)</option>
                    <option value="ONLINE">Live Interactive Online (Anywhere)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="flex items-start gap-2 cursor-pointer text-xs text-slate-300 pt-2">
                  <input
                    type="checkbox"
                    checked={regConsent}
                    onChange={e => setRegConsent(e.target.checked)}
                    className="mt-0.5 h-4 w-4 rounded border-slate-700 bg-slate-950 text-blue-600"
                  />
                  <span>
                    I agree to the Terms & Conditions and Privacy Policy of SP SOLUTIONS.
                  </span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-blue-600 py-3 text-xs sm:text-sm font-bold text-white hover:bg-blue-500 shadow transition-all"
              >
                Complete Student Registration
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Certificate Viewer Modal */}
      {viewingCertificate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="relative w-full max-w-2xl rounded-3xl border-4 border-amber-500/50 bg-slate-900 p-8 shadow-2xl text-center">
            <button
              onClick={() => setViewingCertificate(null)}
              className="absolute right-4 top-4 rounded-xl p-2 text-slate-400 hover:bg-slate-800 hover:text-white"
            >
              ✕
            </button>

            <div className="border-4 border-amber-500/20 p-6 rounded-2xl bg-gradient-to-b from-slate-950 to-slate-900">
              <div className="text-amber-400 text-xs font-bold tracking-widest uppercase mb-1">
                SP SOLUTIONS • LEARNING & VOCAL CENTRE
              </div>
              <div className="text-[11px] text-slate-400 mb-6">
                Village Baloda, Hasuwa, House 359, Chhattisgarh, India
              </div>

              <h2 className="text-2xl font-serif font-black text-white uppercase tracking-wider mb-2">
                Certificate of Completion
              </h2>

              <p className="text-xs text-slate-300 italic mb-4">
                This is to officially certify that
              </p>

              <div className="text-2xl font-bold text-amber-300 border-b border-amber-500/30 pb-2 mb-4 inline-block px-8">
                {viewingCertificate.studentName}
              </div>

              <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed mb-6">
                has successfully completed the comprehensive curriculum and practical assessments for
                <br />
                <strong className="text-white text-sm mt-1 block">{viewingCertificate.courseName}</strong>
                with distinction ({viewingCertificate.grade}).
              </p>

              <div className="flex justify-between items-end border-t border-slate-800 pt-6 text-xs text-slate-400">
                <div className="text-left">
                  <div className="font-mono text-[11px] text-emerald-400">
                    Verify Code: {viewingCertificate.verificationCode}
                  </div>
                  <div>Issued: {viewingCertificate.issueDate}</div>
                </div>
                <div className="text-right">
                  <div className="font-serif italic font-bold text-slate-200">Santy Manikpuri</div>
                  <div className="text-[10px] text-slate-400">Director & Lead Instructor</div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-center gap-3">
              <button
                onClick={() => window.print()}
                className="rounded-xl bg-amber-500 px-5 py-2 text-xs font-bold text-slate-950 hover:bg-amber-400"
              >
                Print Official Certificate
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
