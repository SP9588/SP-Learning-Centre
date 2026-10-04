import React, { useState, useMemo } from 'react';
import {
  LayoutDashboard,
  Users,
  Calendar,
  BookOpen,
  CreditCard,
  Settings,
  Download,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Phone,
  MessageSquare,
  Sparkles,
  TrendingUp,
  MapPin,
  ShieldAlert,
  Database,
  Copy,
  Check,
  Edit,
  Save,
  Plus,
  RefreshCw,
  Eye,
  Radar,
  Wifi,
  Building2
} from 'lucide-react';
import {
  Lead,
  Course,
  Batch,
  DemoBooking,
  Student,
  WebsiteSettings,
  Language,
  LeadStatus,
  RegisteredEntity
} from '../types';
import {
  updateLeadStatus,
  updateDemoBookingStatus,
  saveCourses,
  saveSettings,
  exportLeadsToCsv,
  generateSqlSchema,
  saveBatches,
  getVisitorCount,
  getLiveActiveVisitors,
  resetToFreshScratchData
} from '../data/store';
import {
  getRegisteredEntities,
  runAutonomousRadarDiscovery,
  exportRegistryToCsv,
  SP_SOLUTIONS_HQ
} from '../data/locationRadarStore';
import { translations } from '../locales/translations';

interface AdminDashboardProps {
  language: Language;
  leads: Lead[];
  courses: Course[];
  batches: Batch[];
  demoBookings: DemoBooking[];
  students: Student[];
  settings: WebsiteSettings;
  onUpdateLeads: () => void;
  onUpdateCourses: () => void;
  onUpdateSettings: (newSettings: WebsiteSettings) => void;
  onBackToLanding: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  language,
  leads,
  courses,
  batches,
  demoBookings,
  students,
  settings,
  onUpdateLeads,
  onUpdateCourses,
  onUpdateSettings,
  onBackToLanding,
}) => {
  const t = translations[language];

  const [activeTab, setActiveTab] = useState<
    'overview' | 'leads' | 'demos' | 'courses' | 'batches' | 'radar' | 'settings' | 'sql'
  >('overview');

  // Maps Radar & Buyers Registry state
  const [radarEntities, setRadarEntities] = useState<RegisteredEntity[]>(() => getRegisteredEntities());
  const [radarScanning, setRadarScanning] = useState(false);
  const [radarScanNote, setRadarScanNote] = useState('');

  // Leads filter & search
  const [leadSearch, setLeadSearch] = useState('');
  const [leadStatusFilter, setLeadStatusFilter] = useState<string>('all');
  const [selectedLeadForNotes, setSelectedLeadForNotes] = useState<Lead | null>(null);
  const [staffNoteInput, setStaffNoteInput] = useState('');

  // Course editing state
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);

  // Settings form state
  const [localSettings, setLocalSettings] = useState<WebsiteSettings>(settings);
  const [settingsSavedNote, setSettingsSavedNote] = useState('');

  // SQL Copy state
  const [copiedSql, setCopiedSql] = useState(false);
  const [resetConfirmNote, setResetConfirmNote] = useState('');

  // Real-time visitor metrics
  const totalVisitors = getVisitorCount();
  const liveActiveVisitors = getLiveActiveVisitors();
  const totalLeadsCount = leads.length;
  const newLeadsCount = leads.filter(l => l.leadStatus === 'NEW').length;
  const contactedLeadsCount = leads.filter(l => l.leadStatus === 'CONTACTED').length;
  const activeStudentsCount = students.filter(s => s.status === 'ACTIVE').length;
  const totalRevenue = students.reduce(
    (sum, s) => sum + s.payments.reduce((pSum, p) => pSum + (p.status === 'PAID' ? p.amount : 0), 0),
    0
  );
  const conversionRate = totalLeadsCount > 0 ? ((activeStudentsCount / totalLeadsCount) * 100).toFixed(1) : '0';

  const handleResetDataToFresh = () => {
    if (window.confirm('Reset all leads, demo bookings, and students to a fresh clean entry state from scratch?')) {
      resetToFreshScratchData();
      onUpdateLeads();
      setResetConfirmNote('Data successfully refreshed to fresh scratch state!');
      setTimeout(() => setResetConfirmNote(''), 4000);
    }
  };

  // Filtered Leads
  const filteredLeads = useMemo(() => {
    return leads.filter(l => {
      const matchSearch =
        l.name.toLowerCase().includes(leadSearch.toLowerCase()) ||
        l.mobile.includes(leadSearch) ||
        l.villageCity.toLowerCase().includes(leadSearch.toLowerCase()) ||
        l.preferredCourse.toLowerCase().includes(leadSearch.toLowerCase());

      const matchStatus = leadStatusFilter === 'all' || l.leadStatus === leadStatusFilter;

      return matchSearch && matchStatus;
    });
  }, [leads, leadSearch, leadStatusFilter]);

  const handleStatusChange = (leadId: string, newStatus: LeadStatus) => {
    updateLeadStatus(leadId, newStatus);
    onUpdateLeads();
  };

  const handleSaveStaffNote = () => {
    if (!selectedLeadForNotes || !staffNoteInput.trim()) return;
    updateLeadStatus(selectedLeadForNotes.id, selectedLeadForNotes.leadStatus, staffNoteInput.trim());
    onUpdateLeads();
    setStaffNoteInput('');
    setSelectedLeadForNotes(null);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    saveSettings(localSettings);
    onUpdateSettings(localSettings);
    setSettingsSavedNote('Settings saved successfully!');
    setTimeout(() => setSettingsSavedNote(''), 3000);
  };

  const handleCopySql = () => {
    const sql = generateSqlSchema();
    navigator.clipboard.writeText(sql);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2500);
  };

  const handleSaveCourseFees = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCourse) return;
    const updated = courses.map(c => (c.id === editingCourse.id ? editingCourse : c));
    saveCourses(updated);
    onUpdateCourses();
    setEditingCourse(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-20">
      {/* Admin Top Navigation */}
      <div className="border-b border-slate-800 bg-slate-900/90 px-4 py-4 backdrop-blur-md sticky top-0 z-30">
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
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white font-bold">
                <LayoutDashboard className="h-5 w-5" />
              </div>
              <div>
                <h1 className="text-sm font-bold text-white">SP SOLUTIONS Admin Suite</h1>
                <span className="text-[11px] text-slate-400">
                  Lead Management & Course Operations Platform
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => exportLeadsToCsv(leads)}
              className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-200 hover:bg-slate-700 hover:text-white transition-colors"
            >
              <Download className="h-3.5 w-3.5 text-blue-400" />
              <span>Export Leads (CSV)</span>
            </button>
            <button
              onClick={() => setActiveTab('sql')}
              className="flex items-center gap-1.5 rounded-lg bg-indigo-600/30 border border-indigo-500/40 px-3 py-1.5 text-xs font-semibold text-indigo-300 hover:bg-indigo-600/40 transition-colors"
            >
              <Database className="h-3.5 w-3.5" />
              <span>PostgreSQL / Supabase Schema</span>
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-6 border-b border-slate-800 pb-3">
          {[
            { id: 'overview', label: 'Dashboard Overview', icon: TrendingUp },
            { id: 'leads', label: `Leads CRM (${leads.length})`, icon: Users },
            { id: 'demos', label: `Demo Bookings (${demoBookings.length})`, icon: Calendar },
            { id: 'courses', label: `Courses & Fees (${courses.length})`, icon: BookOpen },
            { id: 'batches', label: `Batches (${batches.length})`, icon: Clock },
            { id: 'radar', label: `Maps Radar & Registry (${radarEntities.length})`, icon: Radar },
            { id: 'settings', label: 'Platform & GBP Settings', icon: Settings },
            { id: 'sql', label: 'SQL Migration Schema', icon: Database },
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition-all ${
                  activeTab === tab.id
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                    : 'bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-white border border-slate-800'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* ============================================================== */}
        {/* TAB 1: OVERVIEW & FUNNEL */}
        {/* ============================================================== */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* KPI Cards Grid */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
                <div className="text-xs text-slate-400">Total Website Visitors</div>
                <div className="text-2xl font-black text-white mt-1">{totalVisitors}</div>
                <div className="text-[11px] text-emerald-400 mt-2 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  <span>Organic & Local Search</span>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
                <div className="text-xs text-slate-400">Enquiries / Leads</div>
                <div className="text-2xl font-black text-blue-400 mt-1">{totalLeadsCount}</div>
                <div className="text-[11px] text-slate-400 mt-2">
                  <strong className="text-amber-400">{newLeadsCount}</strong> awaiting first call
                </div>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
                <div className="text-xs text-slate-400">Demo Sessions Booked</div>
                <div className="text-2xl font-black text-amber-400 mt-1">{demoBookings.length}</div>
                <div className="text-[11px] text-slate-400 mt-2">Online & Baloda Centre</div>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
                <div className="text-xs text-slate-400">Enrolled Students</div>
                <div className="text-2xl font-black text-emerald-400 mt-1">{activeStudentsCount}</div>
                <div className="text-[11px] text-slate-400 mt-2">Active batches running</div>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
                <div className="text-xs text-slate-400">Fee Collections</div>
                <div className="text-2xl font-black text-white mt-1">₹{totalRevenue.toLocaleString()}</div>
                <div className="text-[11px] text-emerald-400 mt-2">
                  Conversion: <strong className="text-white">{conversionRate}%</strong>
                </div>
              </div>
            </div>

            {/* Visual Conversion Funnel Flowchart */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
              <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-indigo-400" />
                <span>Automated SaaS Conversion Funnel</span>
              </h3>
              <p className="text-xs text-slate-400 mb-6">
                End-to-end journey tracking every stage from first visitor touchpoint to course completion certificate.
              </p>

              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-6 text-xs text-center">
                <div className="rounded-xl border border-slate-800 bg-slate-950 p-3">
                  <span className="text-[10px] text-slate-500 font-bold block">STAGE 1</span>
                  <div className="font-bold text-white mt-1">1. Visitor Touch</div>
                  <div className="text-[11px] text-slate-400 mt-1">Baloda / Chhattisgarh / Online</div>
                  <div className="text-sm font-extrabold text-blue-400 mt-2">3,840</div>
                </div>

                <div className="rounded-xl border border-slate-800 bg-slate-950 p-3">
                  <span className="text-[10px] text-slate-500 font-bold block">STAGE 2</span>
                  <div className="font-bold text-white mt-1">2. Lead Captured</div>
                  <div className="text-[11px] text-slate-400 mt-1">Explicit Consent Popup</div>
                  <div className="text-sm font-extrabold text-blue-400 mt-2">{totalLeadsCount}</div>
                </div>

                <div className="rounded-xl border border-slate-800 bg-slate-950 p-3">
                  <span className="text-[10px] text-slate-500 font-bold block">STAGE 3</span>
                  <div className="font-bold text-white mt-1">3. Demo Session</div>
                  <div className="text-[11px] text-slate-400 mt-1">Free Trial Class</div>
                  <div className="text-sm font-extrabold text-amber-400 mt-2">{demoBookings.length}</div>
                </div>

                <div className="rounded-xl border border-slate-800 bg-slate-950 p-3">
                  <span className="text-[10px] text-slate-500 font-bold block">STAGE 4</span>
                  <div className="font-bold text-white mt-1">4. Counselling</div>
                  <div className="text-[11px] text-slate-400 mt-1">Phone / WhatsApp Call</div>
                  <div className="text-sm font-extrabold text-indigo-400 mt-2">{contactedLeadsCount + 1}</div>
                </div>

                <div className="rounded-xl border border-slate-800 bg-slate-950 p-3">
                  <span className="text-[10px] text-slate-500 font-bold block">STAGE 5</span>
                  <div className="font-bold text-white mt-1">5. Registration & Pay</div>
                  <div className="text-[11px] text-slate-400 mt-1">UPI / Cash / Receipt</div>
                  <div className="text-sm font-extrabold text-emerald-400 mt-2">{activeStudentsCount}</div>
                </div>

                <div className="rounded-xl border border-slate-800 bg-slate-950 p-3">
                  <span className="text-[10px] text-slate-500 font-bold block">STAGE 6</span>
                  <div className="font-bold text-white mt-1">6. Certified Alumni</div>
                  <div className="text-[11px] text-slate-400 mt-1">Unique Verified Code</div>
                  <div className="text-sm font-extrabold text-amber-400 mt-2">128+</div>
                </div>
              </div>
            </div>

            {/* Quick action bar */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
                <h4 className="text-sm font-bold text-white mb-2">Need to contact urgent new leads?</h4>
                <p className="text-xs text-slate-400 mb-4">
                  There are {newLeadsCount} new enquiries submitted in the last 24 hours awaiting callbacks.
                </p>
                <button
                  onClick={() => {
                    setLeadStatusFilter('NEW');
                    setActiveTab('leads');
                  }}
                  className="rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold text-white hover:bg-blue-500"
                >
                  View {newLeadsCount} New Leads &rarr;
                </button>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
                <h4 className="text-sm font-bold text-white mb-2">Configure Google Maps & Socials</h4>
                <p className="text-xs text-slate-400 mb-4">
                  Manage Baloda location destination, WhatsApp numbers, and YouTube / Instagram handles.
                </p>
                <button
                  onClick={() => setActiveTab('settings')}
                  className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-700 hover:text-white"
                >
                  Open Settings &rarr;
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 2: LEADS CRM */}
        {/* ============================================================== */}
        {activeTab === 'leads' && (
          <div className="space-y-6">
            {/* Search and Filters */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 flex flex-wrap items-center justify-between gap-3">
              <div className="relative w-full sm:w-80">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  value={leadSearch}
                  onChange={e => setLeadSearch(e.target.value)}
                  placeholder="Search by name, phone, city, or course..."
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 pl-10 pr-3.5 py-2 text-xs text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="text-slate-400">Filter Status:</span>
                <select
                  value={leadStatusFilter}
                  onChange={e => setLeadStatusFilter(e.target.value)}
                  className="rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-200"
                >
                  <option value="all">All Statuses ({leads.length})</option>
                  <option value="NEW">NEW</option>
                  <option value="CONTACTED">CONTACTED</option>
                  <option value="INTERESTED">INTERESTED</option>
                  <option value="DEMO_BOOKED">DEMO_BOOKED</option>
                  <option value="REGISTERED">REGISTERED</option>
                  <option value="PAID">PAID</option>
                  <option value="NOT_INTERESTED">NOT_INTERESTED</option>
                </select>

                <button
                  onClick={() => exportLeadsToCsv(filteredLeads)}
                  className="rounded-xl bg-blue-600 px-3.5 py-2 text-xs font-bold text-white hover:bg-blue-500 flex items-center gap-1.5"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>Download CSV</span>
                </button>
              </div>
            </div>

            {/* Leads Table */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="border-b border-slate-800 bg-slate-950/80 text-slate-400 uppercase tracking-wider">
                    <tr>
                      <th className="p-3.5">Lead Code</th>
                      <th className="p-3.5">Name</th>
                      <th className="p-3.5">Mobile</th>
                      <th className="p-3.5">City / Village</th>
                      <th className="p-3.5">Preferred Course</th>
                      <th className="p-3.5">Mode</th>
                      <th className="p-3.5">Status</th>
                      <th className="p-3.5">Assigned Staff</th>
                      <th className="p-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80 text-slate-200">
                    {filteredLeads.map(lead => (
                      <tr key={lead.id} className="hover:bg-slate-800/30 transition-colors">
                        <td className="p-3.5 font-mono font-bold text-blue-400">{lead.leadId}</td>
                        <td className="p-3.5 font-semibold text-white">
                          {lead.name}
                          {lead.email && <div className="text-[10px] text-slate-500 font-normal">{lead.email}</div>}
                        </td>
                        <td className="p-3.5">
                          <a
                            href={`tel:${lead.mobile}`}
                            className="text-emerald-400 hover:underline flex items-center gap-1"
                          >
                            <Phone className="h-3 w-3" />
                            <span>{lead.mobile}</span>
                          </a>
                        </td>
                        <td className="p-3.5">
                          <span className="flex items-center gap-1 text-slate-300">
                            <MapPin className="h-3 w-3 text-red-400" />
                            <span>{lead.villageCity}</span>
                          </span>
                          {lead.latitude && (
                            <span className="text-[10px] text-slate-500 font-mono">
                              ({lead.latitude.toFixed(2)}, {lead.longitude?.toFixed(2)})
                            </span>
                          )}
                        </td>
                        <td className="p-3.5 font-medium max-w-[180px] truncate">{lead.preferredCourse}</td>
                        <td className="p-3.5">
                          <span className="rounded bg-slate-800 px-2 py-0.5 text-[10px] font-semibold text-slate-300">
                            {lead.learningMode}
                          </span>
                        </td>
                        <td className="p-3.5">
                          <select
                            value={lead.leadStatus}
                            onChange={e => handleStatusChange(lead.id, e.target.value as LeadStatus)}
                            className={`rounded-lg px-2 py-1 text-[11px] font-bold border focus:outline-none ${
                              lead.leadStatus === 'NEW'
                                ? 'bg-amber-500/10 border-amber-500/30 text-amber-300'
                                : lead.leadStatus === 'CONTACTED'
                                ? 'bg-blue-500/10 border-blue-500/30 text-blue-300'
                                : lead.leadStatus === 'PAID' || lead.leadStatus === 'ACTIVE_STUDENT'
                                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                                : 'bg-slate-800 border-slate-700 text-slate-300'
                            }`}
                          >
                            <option value="NEW">NEW</option>
                            <option value="CONTACTED">CONTACTED</option>
                            <option value="INTERESTED">INTERESTED</option>
                            <option value="DEMO_BOOKED">DEMO_BOOKED</option>
                            <option value="REGISTERED">REGISTERED</option>
                            <option value="PAYMENT_PENDING">PAYMENT_PENDING</option>
                            <option value="PAID">PAID</option>
                            <option value="ACTIVE_STUDENT">ACTIVE_STUDENT</option>
                            <option value="COMPLETED">COMPLETED</option>
                            <option value="NOT_INTERESTED">NOT_INTERESTED</option>
                          </select>
                        </td>
                        <td className="p-3.5 text-slate-400">{lead.assignedStaff}</td>
                        <td className="p-3.5 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <a
                              href={`https://wa.me/91${lead.mobile}?text=${encodeURIComponent(
                                `Namaste ${lead.name}, greetings from SP SOLUTIONS (Baloda, Chhattisgarh). We received your enquiry for ${lead.preferredCourse}. How can we assist you with admissions?`
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="rounded bg-emerald-600/20 px-2 py-1 text-[11px] font-semibold text-emerald-300 hover:bg-emerald-600/30"
                              title="Chat on WhatsApp"
                            >
                              WhatsApp
                            </a>
                            <button
                              onClick={() => {
                                setSelectedLeadForNotes(lead);
                                setStaffNoteInput('');
                              }}
                              className="rounded bg-slate-800 px-2 py-1 text-[11px] font-semibold text-slate-300 hover:bg-slate-700 hover:text-white"
                            >
                              Notes
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Staff Notes Editor Modal */}
            {selectedLeadForNotes && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
                <div className="relative w-full max-w-lg rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-2xl">
                  <h3 className="text-base font-bold text-white mb-1">
                    Counselling Notes for {selectedLeadForNotes.name} ({selectedLeadForNotes.leadId})
                  </h3>
                  <p className="text-xs text-slate-400 mb-4">
                    Course: {selectedLeadForNotes.preferredCourse} • Mobile: {selectedLeadForNotes.mobile}
                  </p>

                  <div className="rounded-xl bg-slate-950 p-3 text-xs text-slate-300 border border-slate-800 max-h-36 overflow-y-auto whitespace-pre-line mb-4">
                    {selectedLeadForNotes.notes || 'No previous staff notes recorded.'}
                  </div>

                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Add Staff Follow-up Note:
                  </label>
                  <textarea
                    rows={3}
                    value={staffNoteInput}
                    onChange={e => setStaffNoteInput(e.target.value)}
                    placeholder="e.g. Called student, confirmed batch timing for Saturday demo..."
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 p-3 text-xs text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none mb-4"
                  />

                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setSelectedLeadForNotes(null)}
                      className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-700"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSaveStaffNote}
                      className="rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold text-white hover:bg-blue-500"
                    >
                      Save Note
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 3: DEMO BOOKINGS */}
        {/* ============================================================== */}
        {activeTab === 'demos' && (
          <div className="space-y-6">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold text-white">Free Demo Class Bookings</h3>
                <span className="text-xs text-slate-400">{demoBookings.length} total demo requests</span>
              </div>

              <div className="space-y-3">
                {demoBookings.map(demo => (
                  <div
                    key={demo.id}
                    className="rounded-xl border border-slate-800 bg-slate-950 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-sm">{demo.name}</span>
                        <span className="text-xs text-slate-400">({demo.phone})</span>
                        <span className="rounded bg-blue-500/10 px-2 py-0.5 text-[10px] font-semibold text-blue-400">
                          {demo.mode}
                        </span>
                        <span
                          className={`rounded px-2 py-0.5 text-[10px] font-bold ${
                            demo.status === 'CONFIRMED'
                              ? 'bg-emerald-500/10 text-emerald-400'
                              : demo.status === 'COMPLETED'
                              ? 'bg-indigo-500/10 text-indigo-400'
                              : 'bg-amber-500/10 text-amber-400'
                          }`}
                        >
                          {demo.status}
                        </span>
                      </div>

                      <div className="text-xs text-slate-300 mt-1">
                        Course: <strong className="text-white">{demo.courseName}</strong> • Slot:{' '}
                        <strong>
                          {demo.preferredDate} at {demo.preferredTime}
                        </strong>
                      </div>

                      {demo.classroomOrLink && (
                        <div className="text-[11px] text-blue-400 mt-1 font-mono">
                          Classroom / Meeting Link: {demo.classroomOrLink}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          const link = prompt(
                            'Enter Classroom room or Live Google Meet link for this student:',
                            demo.classroomOrLink || 'Baloda Studio / https://meet.google.com/sp-demo'
                          );
                          if (link) {
                            updateDemoBookingStatus(demo.id, 'CONFIRMED', link);
                            onUpdateLeads();
                          }
                        }}
                        className="rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-emerald-500"
                      >
                        Confirm Slot
                      </button>

                      <a
                        href={`https://wa.me/91${demo.phone}?text=${encodeURIComponent(
                          `Namaste ${demo.name}, your Demo class for ${demo.courseName} at SP SOLUTIONS is scheduled on ${demo.preferredDate} at ${demo.preferredTime}.`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-200 hover:bg-slate-700"
                      >
                        WhatsApp
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 4: COURSES & FEES */}
        {/* ============================================================== */}
        {activeTab === 'courses' && (
          <div className="space-y-6">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold text-white">Course Fees & Discount Management</h3>
                <span className="text-xs text-slate-400">Updates sync instantly with public website</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="border-b border-slate-800 text-slate-400 uppercase tracking-wider">
                    <tr>
                      <th className="pb-3">Course Name</th>
                      <th className="pb-3">Category</th>
                      <th className="pb-3">Duration</th>
                      <th className="pb-3">Online Fee</th>
                      <th className="pb-3">Offline Fee</th>
                      <th className="pb-3">Monthly</th>
                      <th className="pb-3">Discount</th>
                      <th className="pb-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-200">
                    {courses.map(course => (
                      <tr key={course.id}>
                        <td className="py-3 font-semibold text-white">{course.name}</td>
                        <td className="py-3 uppercase text-blue-400 text-[11px] font-bold">
                          {course.category}
                        </td>
                        <td className="py-3">{course.duration}</td>
                        <td className="py-3 font-bold text-white">₹{course.offerPriceOnline}</td>
                        <td className="py-3 font-bold text-emerald-400">₹{course.offerPriceOffline}</td>
                        <td className="py-3 text-slate-300">₹{course.monthlyFee || 'N/A'}</td>
                        <td className="py-3 text-amber-400 font-bold">{course.discountPercent}% OFF</td>
                        <td className="py-3 text-right">
                          <button
                            onClick={() => setEditingCourse({ ...course })}
                            className="rounded bg-blue-600/20 border border-blue-500/30 px-2.5 py-1 text-[11px] font-bold text-blue-300 hover:bg-blue-600 hover:text-white"
                          >
                            Edit Fees
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Course Edit Modal */}
            {editingCourse && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
                <div className="relative w-full max-w-lg rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-2xl">
                  <h3 className="text-base font-bold text-white mb-1">
                    Edit Fees for {editingCourse.name}
                  </h3>
                  <p className="text-xs text-slate-400 mb-4">
                    Category: {editingCourse.category} • Duration: {editingCourse.duration}
                  </p>

                  <form onSubmit={handleSaveCourseFees} className="space-y-3.5">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          Online Fee (₹)
                        </label>
                        <input
                          type="number"
                          value={editingCourse.offerPriceOnline}
                          onChange={e =>
                            setEditingCourse({ ...editingCourse, offerPriceOnline: Number(e.target.value) })
                          }
                          className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          Offline Classroom Fee (₹)
                        </label>
                        <input
                          type="number"
                          value={editingCourse.offerPriceOffline}
                          onChange={e =>
                            setEditingCourse({ ...editingCourse, offerPriceOffline: Number(e.target.value) })
                          }
                          className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          Monthly Fee (₹)
                        </label>
                        <input
                          type="number"
                          value={editingCourse.monthlyFee || 0}
                          onChange={e =>
                            setEditingCourse({ ...editingCourse, monthlyFee: Number(e.target.value) })
                          }
                          className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          Registration / Admission Fee (₹)
                        </label>
                        <input
                          type="number"
                          value={editingCourse.registrationFee}
                          onChange={e =>
                            setEditingCourse({ ...editingCourse, registrationFee: Number(e.target.value) })
                          }
                          className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setEditingCourse(null)}
                        className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-2 text-xs text-slate-300 hover:bg-slate-700"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="rounded-xl bg-blue-600 px-5 py-2 text-xs font-bold text-white hover:bg-blue-500"
                      >
                        Save Course Fees
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 5: BATCHES */}
        {/* ============================================================== */}
        {activeTab === 'batches' && (
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
            <h3 className="text-base font-bold text-white mb-4">Batches Schedule</h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {batches.map(batch => (
                <div key={batch.id} className="rounded-xl border border-slate-800 bg-slate-950 p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">{batch.name}</span>
                    <span className="rounded bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-400">
                      {batch.status}
                    </span>
                  </div>
                  <div className="text-xs text-slate-300">
                    Timing: <strong>{batch.timeSlot}</strong>
                  </div>
                  <div className="text-xs text-slate-400">
                    Teacher: {batch.teacherName} • Mode: {batch.mode}
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800">
                    <span>Enrolled: {batch.enrolledCount} / {batch.totalSeats} seats</span>
                    <span className="text-blue-400 font-semibold">{batch.totalSeats - batch.enrolledCount} left</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 6: SETTINGS & GOOGLE BUSINESS PROFILE */}
        {/* ============================================================== */}
        {activeTab === 'settings' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <form onSubmit={handleSaveSettings} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-6">
              <div>
                <h3 className="text-base font-bold text-white">Platform & Business Settings</h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Update institute contact details, popup behaviour, and Google Business Profile links.
                </p>
              </div>

              {settingsSavedNote && (
                <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-xs text-emerald-300">
                  {settingsSavedNote}
                </div>
              )}

              {/* Business Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Institute Name
                  </label>
                  <input
                    type="text"
                    value={localSettings.instituteName}
                    onChange={e => setLocalSettings({ ...localSettings, instituteName: e.target.value })}
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Contact Phone Number (Primary)
                  </label>
                  <input
                    type="text"
                    value={localSettings.phone}
                    onChange={e => setLocalSettings({ ...localSettings, phone: e.target.value })}
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    WhatsApp Number (10 or 12 Digits)
                  </label>
                  <input
                    type="text"
                    value={localSettings.whatsappNumber}
                    onChange={e => setLocalSettings({ ...localSettings, whatsappNumber: e.target.value })}
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Instagram Handle
                  </label>
                  <input
                    type="text"
                    value={localSettings.instagramUsername}
                    onChange={e => setLocalSettings({ ...localSettings, instagramUsername: e.target.value })}
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    YouTube Channel Handle (makemestar)
                  </label>
                  <input
                    type="text"
                    value={localSettings.youtubeChannel}
                    onChange={e =>
                      setLocalSettings({
                        ...localSettings,
                        youtubeChannel: e.target.value,
                        youtubeUrl: `https://www.youtube.com/@${e.target.value.replace(/^@/, '')}`
                      })
                    }
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    YouTube Full Hyperlink
                  </label>
                  <input
                    type="url"
                    value={localSettings.youtubeUrl || 'https://www.youtube.com/@makemestar'}
                    onChange={e => setLocalSettings({ ...localSettings, youtubeUrl: e.target.value })}
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Official Support Email
                  </label>
                  <input
                    type="email"
                    value={localSettings.email || 'santoshprasad8891@gmail.com'}
                    onChange={e => setLocalSettings({ ...localSettings, email: e.target.value })}
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2 text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Full Institute Address
                </label>
                <textarea
                  rows={2}
                  value={localSettings.addressLine}
                  onChange={e => setLocalSettings({ ...localSettings, addressLine: e.target.value })}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 p-3 text-xs text-white"
                />
              </div>

              {/* Fresh Data Reset & Management Action */}
              <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div>
                    <h5 className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                      Data Reset &amp; Fresh Scratch Start
                    </h5>
                    <p className="text-xs text-slate-300 mt-0.5">
                      Reset all leads, bookings, and enrolled student lists back to an initial empty state (0 records) for clean production entry.
                    </p>
                    {resetConfirmNote && (
                      <span className="text-xs text-emerald-400 font-semibold block mt-1">
                        {resetConfirmNote}
                      </span>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={handleResetDataToFresh}
                    className="rounded-xl border border-red-500/40 bg-red-600/20 px-3.5 py-2 text-xs font-bold text-red-300 hover:bg-red-600/30 transition-colors shrink-0"
                  >
                    Reset To Fresh Scratch Data
                  </button>
                </div>
              </div>

              {/* Google Maps URL */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Configurable Google Maps URL (Destination for &quot;Get Directions&quot;)
                </label>
                <input
                  type="text"
                  value={localSettings.googleMapsUrl}
                  onChange={e => setLocalSettings({ ...localSettings, googleMapsUrl: e.target.value })}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2 text-xs text-white font-mono"
                />
                <span className="text-[11px] text-slate-400 mt-1 block">
                  Paste the official Google Maps link for the Baloda institute address here.
                </span>
              </div>

              {/* Justdial & Google Search Directory Linking */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Justdial Official Profile URL
                  </label>
                  <input
                    type="text"
                    value={localSettings.justdialUrl || ''}
                    onChange={e => setLocalSettings({ ...localSettings, justdialUrl: e.target.value })}
                    placeholder="https://www.justdial.com/Baloda-Bazar/SP-Solutions-..."
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2 text-xs text-white font-mono"
                  />
                  <span className="text-[11px] text-slate-400 mt-1 block">
                    Direct link to SP SOLUTIONS on Justdial Baloda Bazar.
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Google Search Query & Knowledge Link
                  </label>
                  <input
                    type="text"
                    value={localSettings.googleSearchUrl || ''}
                    onChange={e => setLocalSettings({ ...localSettings, googleSearchUrl: e.target.value })}
                    placeholder="https://www.google.com/search?q=SP+Solutions+Baloda..."
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2 text-xs text-white font-mono"
                  />
                  <span className="text-[11px] text-slate-400 mt-1 block">
                    Google Knowledge Graph and top ranking search query URL.
                  </span>
                </div>
              </div>

              {/* Lead Popup Behaviour */}
              <div className="border-t border-slate-800 pt-5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3">
                  Lead Enquiry Popup Configuration
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="popupEnabled"
                      checked={localSettings.popupEnabled}
                      onChange={e => setLocalSettings({ ...localSettings, popupEnabled: e.target.checked })}
                      className="h-4 w-4 rounded border-slate-700 bg-slate-950 text-blue-600"
                    />
                    <label htmlFor="popupEnabled" className="text-xs text-slate-300 font-medium">
                      Enable Responsive Enquiry Popup
                    </label>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Popup Trigger Frequency
                    </label>
                    <select
                      value={localSettings.popupFrequency}
                      onChange={e =>
                        setLocalSettings({
                          ...localSettings,
                          popupFrequency: e.target.value as WebsiteSettings['popupFrequency'],
                        })
                      }
                      className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white"
                    >
                      <option value="ONCE_PER_DAY">Once per day (Recommended)</option>
                      <option value="ONCE_PER_SESSION">Once per browser session</option>
                      <option value="ALWAYS">Always on page load (Testing only)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Google Business Profile Guidance */}
              <div className="rounded-xl border border-blue-500/20 bg-blue-950/20 p-4 text-xs text-slate-300 space-y-2">
                <h5 className="font-bold text-blue-300">
                  Google Business Profile (GBP) Connection Guide
                </h5>
                <p className="leading-relaxed">
                  {localSettings.gbpVerificationNotes}
                </p>
                <div className="font-semibold text-slate-200">
                  Address format configured in Schema.org LocalBusiness:
                </div>
                <div className="bg-slate-950 p-2.5 rounded font-mono text-[11px] text-slate-400">
                  Village Baloda, Hasuwa, House No. 359, Kotar/Kotwar Muhalla, Chhattisgarh, 495559
                </div>
              </div>

              <button
                type="submit"
                className="rounded-xl bg-blue-600 px-6 py-2.5 text-xs font-bold text-white hover:bg-blue-500 shadow"
              >
                Save Settings
              </button>
            </form>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB: GOOGLE MAPS RADAR & BUYERS/RECEIVERS REGISTRY */}
        {/* ============================================================== */}
        {activeTab === 'radar' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Radar className="h-5 w-5 text-emerald-400" />
                  <span>Google Maps Autonomous Radar & Category Registry</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Autonomous iterations around SP SOLUTIONS (House No. 359, Baloda) registering buyers, hiring institutions & online learners.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setRadarScanning(true);
                    setRadarScanNote('Autonomous radar navigation in progress across Baloda Bazar radius...');
                    setTimeout(() => {
                      const res = runAutonomousRadarDiscovery(50);
                      setRadarEntities([...res.updated]);
                      setRadarScanning(false);
                      setRadarScanNote(`Autonomous scan complete! ${res.newCount} new entities registered.`);
                      setTimeout(() => setRadarScanNote(''), 4000);
                    }, 1500);
                  }}
                  disabled={radarScanning}
                  className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-4 py-2 text-xs font-bold text-slate-950 hover:from-amber-400 hover:to-amber-500 shadow disabled:opacity-50 cursor-pointer"
                >
                  <RefreshCw className={`h-3.5 w-3.5 ${radarScanning ? 'animate-spin' : ''}`} />
                  <span>{radarScanning ? 'Scanning Radius...' : 'Run Autonomous Scan'}</span>
                </button>

                <button
                  onClick={() => exportRegistryToCsv(radarEntities)}
                  className="flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800 px-3.5 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-700 cursor-pointer"
                >
                  <Download className="h-3.5 w-3.5 text-sky-400" />
                  <span>Export Registry (CSV)</span>
                </button>
              </div>
            </div>

            {radarScanNote && (
              <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-200 text-xs flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span>{radarScanNote}</span>
              </div>
            )}

            {/* Registry KPI Summary */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                <p className="text-xs text-slate-400">Total Registered</p>
                <p className="text-xl font-bold text-white mt-1">{radarEntities.length}</p>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                <p className="text-xs text-slate-400">Active Online Now</p>
                <p className="text-xl font-bold text-emerald-400 mt-1">
                  {radarEntities.filter(e => e.isOnline).length}
                </p>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                <p className="text-xs text-slate-400">Student Buyers</p>
                <p className="text-xl font-bold text-amber-400 mt-1">
                  {radarEntities.filter(e => e.category === 'STUDENT_BUYER' || e.category === 'ONLINE_INDIVIDUAL').length}
                </p>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                <p className="text-xs text-slate-400">Business & Receivers</p>
                <p className="text-xl font-bold text-sky-400 mt-1">
                  {radarEntities.filter(e => e.category === 'BUSINESS_IT_COMMERCE' || e.category === 'CORPORATE_RECEIVER').length}
                </p>
              </div>
            </div>

            {/* Registered Entities Table */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-slate-950/80 text-slate-400 uppercase font-semibold text-[11px] border-b border-slate-800">
                    <tr>
                      <th className="px-4 py-3">Entity ID</th>
                      <th className="px-4 py-3">Name & Contact</th>
                      <th className="px-4 py-3">Category</th>
                      <th className="px-4 py-3">Location & Distance</th>
                      <th className="px-4 py-3">Online Status</th>
                      <th className="px-4 py-3">Needs / Offering</th>
                      <th className="px-4 py-3 text-right">Direct Connect</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {radarEntities.map(ent => (
                      <tr key={ent.id} className="hover:bg-slate-800/40 transition">
                        <td className="px-4 py-3 font-mono text-[11px] text-amber-400 font-semibold">
                          {ent.entityId}
                        </td>
                        <td className="px-4 py-3">
                          <div className="font-bold text-white">{ent.name}</div>
                          <div className="text-[11px] text-slate-400">
                            {ent.contactPerson ? `${ent.contactPerson} • ` : ''}{ent.phone}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                            {ent.categoryLabel}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="text-slate-200">{ent.locationName}</div>
                          <div className="text-[11px] text-amber-400 font-medium">{ent.distanceKm} km from House 359</div>
                        </td>
                        <td className="px-4 py-3">
                          {ent.isOnline ? (
                            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/40">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                              ONLINE
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 text-[10px]">
                              OFFLINE
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3 max-w-[220px] truncate text-slate-300" title={ent.needsOrOffering}>
                          {ent.needsOrOffering}
                        </td>
                        <td className="px-4 py-3 text-right">
                          <div className="inline-flex items-center gap-1.5">
                            <a
                              href={`tel:${ent.phone}`}
                              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200"
                              title="Call"
                            >
                              <Phone className="h-3.5 w-3.5 text-emerald-400" />
                            </a>
                            <a
                              href={`https://wa.me/91${ent.phone}?text=Hello%20${encodeURIComponent(ent.name)}%2C%20connecting%20from%20SP%20SOLUTIONS%20(House%20359%20Baloda).`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white"
                              title="WhatsApp"
                            >
                              <MessageSquare className="h-3.5 w-3.5" />
                            </a>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 7: POSTGRESQL / SUPABASE MIGRATION SCHEMA */}
        {/* ============================================================== */}
        {activeTab === 'sql' && (
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Database className="h-4 w-4 text-indigo-400" />
                  <span>Complete PostgreSQL / Supabase Migration Schema</span>
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Ready-to-execute SQL migration script containing table schemas, enums, relationships, and Row Level Security (RLS) policies.
                </p>
              </div>

              <button
                onClick={handleCopySql}
                className="flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white hover:bg-indigo-500 shadow"
              >
                {copiedSql ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                <span>{copiedSql ? 'SQL Copied!' : 'Copy SQL Schema'}</span>
              </button>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 overflow-x-auto">
              <pre className="text-[11px] font-mono text-blue-300 leading-relaxed max-h-[500px] overflow-y-auto">
                {generateSqlSchema()}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
