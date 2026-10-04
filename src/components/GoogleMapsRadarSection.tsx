import React, { useState, useMemo } from 'react';
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow
} from '@vis.gl/react-google-maps';
import {
  Compass,
  Radar,
  Users,
  Building2,
  Briefcase,
  Music,
  Wifi,
  MapPin,
  Navigation,
  Phone,
  MessageCircle,
  PlusCircle,
  Download,
  Search,
  CheckCircle2,
  RefreshCw,
  Sparkles,
  ExternalLink,
  SlidersHorizontal,
  X
} from 'lucide-react';
import {
  SP_SOLUTIONS_HQ,
  getRegisteredEntities,
  addRegisteredEntity,
  toggleEntityOnline,
  runAutonomousRadarDiscovery,
  exportRegistryToCsv
} from '../data/locationRadarStore';
import { RegisteredEntity, EntityCategory, Language } from '../types';

interface GoogleMapsRadarSectionProps {
  language: Language;
  onOpenRegisterModal?: (initialCategory?: EntityCategory) => void;
  onOpenLeadPopup?: () => void;
}

export const GoogleMapsRadarSection: React.FC<GoogleMapsRadarSectionProps> = ({
  language,
  onOpenRegisterModal,
  onOpenLeadPopup
}) => {
  const apiKey = (import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string) || 'AIzaSyALqNVUAINSttORFB2z1GXIA5yy8j0tR94';

  const [entities, setEntities] = useState<RegisteredEntity[]>(() => getRegisteredEntities());
  const [selectedEntity, setSelectedEntity] = useState<RegisteredEntity | null>(null);
  const [radiusFilter, setRadiusFilter] = useState<number>(50);
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');
  const [onlineOnly, setOnlineOnly] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [scanMessage, setScanMessage] = useState<string>('');
  const [showAddModal, setShowAddModal] = useState<boolean>(false);

  // New Entity Form State
  const [newForm, setNewForm] = useState({
    name: '',
    contactPerson: '',
    phone: '',
    email: '',
    category: 'STUDENT_BUYER' as EntityCategory,
    locationName: '',
    district: 'Baloda Bazar',
    state: 'Chhattisgarh',
    latitude: 21.6610,
    longitude: 82.1620,
    isOnline: true,
    status: 'REGISTERED' as RegisteredEntity['status'],
    needsOrOffering: '',
    preferredMode: 'HYBRID' as 'ONLINE' | 'OFFLINE' | 'HYBRID'
  });

  // Filtered list based on radius, category, online status, and search query
  const filteredEntities = useMemo(() => {
    return entities.filter(ent => {
      if (ent.distanceKm > radiusFilter) return false;
      if (categoryFilter !== 'ALL' && ent.category !== categoryFilter) return false;
      if (onlineOnly && !ent.isOnline) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const match =
          ent.name.toLowerCase().includes(q) ||
          ent.locationName.toLowerCase().includes(q) ||
          ent.district.toLowerCase().includes(q) ||
          ent.needsOrOffering.toLowerCase().includes(q) ||
          ent.categoryLabel.toLowerCase().includes(q);
        if (!match) return false;
      }
      return true;
    });
  }, [entities, radiusFilter, categoryFilter, onlineOnly, searchQuery]);

  // Online count
  const onlineCount = useMemo(() => entities.filter(e => e.isOnline).length, [entities]);

  // Handler for Autonomous Iterative Radar Scanning
  const handleTriggerRadarScan = () => {
    setIsScanning(true);
    setScanMessage(
      language === 'hi'
        ? `रेडार नेविगेशन सक्रिय: ${radiusFilter} किमी दायरे में खरीदारों, प्राप्तकर्ताओं एवं सक्रिय ग्राहकों की खोज जारी...`
        : `Radar active: Navigating Google Maps across ${radiusFilter} km radius for buyers, receivers & end-users...`
    );

    setTimeout(() => {
      const result = runAutonomousRadarDiscovery(radiusFilter);
      setEntities([...result.updated]);
      setIsScanning(false);
      setScanMessage(
        result.newCount > 0
          ? language === 'hi'
            ? `सफलतापूर्वक ${result.newCount} नए खरीदार/व्यवसाय पंजीकृत किए गए!`
            : `Successfully registered ${result.newCount} new nearby buyers & business profiles!`
          : language === 'hi'
            ? `सभी नजदीकी स्थान स्कैन किए गए। सभी ऑनलाइन उपयोगकर्ता पहले से पंजीकृत हैं।`
            : `Scan complete. All active nearby buyers and partners are up-to-date in the registry.`
      );
      setTimeout(() => setScanMessage(''), 5000);
    }, 1800);
  };

  // Handler for toggling online status of an individual
  const handleToggleOnline = (id: string) => {
    toggleEntityOnline(id);
    setEntities(getRegisteredEntities());
  };

  // Add entity submit
  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newForm.name || !newForm.phone) return;

    const labelMap: Record<EntityCategory, string> = {
      STUDENT_BUYER: 'Student / Course Buyer',
      CORPORATE_RECEIVER: 'Institution / Staff Receiver',
      BUSINESS_IT_COMMERCE: 'Retail & Business Enterprise',
      VOCAL_MUSIC_STUDIO: 'Music Studio & Performing Artiste',
      ONLINE_INDIVIDUAL: 'Active Online Learner',
      COACHING_PARTNER: 'Coaching & Academic Partner'
    };

    addRegisteredEntity({
      ...newForm,
      categoryLabel: labelMap[newForm.category]
    });

    setEntities(getRegisteredEntities());
    setShowAddModal(false);
    setNewForm({
      name: '',
      contactPerson: '',
      phone: '',
      email: '',
      category: 'STUDENT_BUYER',
      locationName: '',
      district: 'Baloda Bazar',
      state: 'Chhattisgarh',
      latitude: 21.6610,
      longitude: 82.1620,
      isOnline: true,
      status: 'REGISTERED',
      needsOrOffering: '',
      preferredMode: 'HYBRID'
    });
  };

  return (
    <section id="location-radar-section" className="relative py-16 bg-slate-950 text-white overflow-hidden">
      {/* Background radial glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 border-b border-slate-800 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-3">
              <Radar className="w-3.5 h-3.5 animate-spin" />
              <span>
                {language === 'hi'
                  ? 'गूगल मैप्स ऑटोमेशन एवं स्थानीय खरीदार/ग्राहक रजिस्ट्री'
                  : 'Google Maps Autonomous Radar & Buyer/Receiver Registry'}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {language === 'hi' ? (
                <>
                  आस-पास के <span className="text-amber-400">खरीदार, संस्थान एवं ग्राहक</span> नेविगेटर
                </>
              ) : (
                <>
                  Find & Register Nearby <span className="text-amber-400">Buyers, Receivers & Customers</span>
                </>
              )}
            </h2>
            <p className="mt-2 text-sm text-slate-300 max-w-2xl">
              {language === 'hi'
                ? 'गूगल मैप्स के माध्यम से एस पी सॉल्यूशंस (मकान नं. 359, ग्राम बलोदा, बलौदाबाजार) के आसपास के सक्रिय ऑनलाइन छात्रों, कार्यालयों, व्यापारिक श्रेणियों एवं कलाकारों को स्वतः खोजें, पंजीकृत करें और रिकॉर्ड रखें।'
                : 'Navigate coordinates around SP SOLUTIONS (House No. 359, Village Baloda, Baloda Bazar). Autonomously iterate across radii to discover, register, and connect with active buyers, hiring institutions, and online learners.'}
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={handleTriggerRadarScan}
              disabled={isScanning}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-amber-500/20 transition-all cursor-pointer disabled:opacity-50"
            >
              <Radar className={`w-4 h-4 ${isScanning ? 'animate-spin' : ''}`} />
              <span>
                {isScanning
                  ? language === 'hi' ? 'स्कैनिंग जारी...' : 'Navigating Maps...'
                  : language === 'hi' ? 'ऑटोमेटेड रेडार स्कैन चलाएं' : 'Run Autonomous Radar Scan'}
              </span>
            </button>

            <button
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium text-xs sm:text-sm border border-slate-700 transition cursor-pointer"
            >
              <PlusCircle className="w-4 h-4 text-emerald-400" />
              <span>{language === 'hi' ? 'नया व्यवसाय/ग्राहक जोड़ें' : 'Register New Entity'}</span>
            </button>

            <button
              onClick={() => exportRegistryToCsv(entities)}
              className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 font-medium text-xs sm:text-sm border border-slate-700 transition cursor-pointer"
              title="Export all registered entities to CSV spreadsheet"
            >
              <Download className="w-4 h-4 text-sky-400" />
              <span>{language === 'hi' ? 'CSV रिकॉर्ड डाउनलोड' : 'Export CSV'}</span>
            </button>
          </div>
        </div>

        {/* Scan Status Toast Notification */}
        {scanMessage && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-200 text-xs sm:text-sm flex items-center justify-between shadow-lg animate-in fade-in">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{scanMessage}</span>
            </div>
            <button
              onClick={() => setScanMessage('')}
              className="text-emerald-400 hover:text-emerald-200 text-xs px-2 py-1"
            >
              ✕
            </button>
          </div>
        )}

        {/* Live Metrics Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium">Total Registered</p>
              <p className="text-xl font-bold text-white">{entities.length}</p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <Wifi className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium">Active Online Learners</p>
              <p className="text-xl font-bold text-emerald-400">{onlineCount}</p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center shrink-0">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium">Institutes & Receivers</p>
              <p className="text-xl font-bold text-sky-400">
                {entities.filter(e => e.category === 'CORPORATE_RECEIVER' || e.category === 'BUSINESS_IT_COMMERCE').length}
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0">
              <Music className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium">Vocal / Art Studios</p>
              <p className="text-xl font-bold text-purple-400">
                {entities.filter(e => e.category === 'VOCAL_MUSIC_STUDIO').length}
              </p>
            </div>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 mb-6 flex flex-wrap items-center justify-between gap-4">
          {/* Radius selector */}
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-slate-400 shrink-0" />
            <span className="text-xs text-slate-300 font-medium">
              {language === 'hi' ? 'दूरी दायरा:' : 'Radius:'}
            </span>
            <div className="flex items-center gap-1">
              {[5, 15, 25, 50, 100].map(r => (
                <button
                  key={r}
                  onClick={() => setRadiusFilter(r)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition cursor-pointer ${
                    radiusFilter === r
                      ? 'bg-amber-500 text-slate-950 font-bold'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {r} km
                </button>
              ))}
            </div>
          </div>

          {/* Category Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-300 font-medium">
              {language === 'hi' ? 'श्रेणी:' : 'Category:'}
            </span>
            <select
              value={categoryFilter}
              onChange={e => setCategoryFilter(e.target.value)}
              className="bg-slate-800 border border-slate-700 text-xs text-white rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-amber-400"
            >
              <option value="ALL">All Categories ({entities.length})</option>
              <option value="STUDENT_BUYER">Student / Course Buyers</option>
              <option value="CORPORATE_RECEIVER">Institutes & Receivers</option>
              <option value="BUSINESS_IT_COMMERCE">Retail & Commercial IT</option>
              <option value="VOCAL_MUSIC_STUDIO">Music & Vocal Studios</option>
              <option value="ONLINE_INDIVIDUAL">Online Active Individuals</option>
              <option value="COACHING_PARTNER">Academic Partners</option>
            </select>
          </div>

          {/* Online Only Toggle */}
          <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300 select-none">
            <input
              type="checkbox"
              checked={onlineOnly}
              onChange={e => setOnlineOnly(e.target.checked)}
              className="w-4 h-4 rounded text-emerald-500 focus:ring-emerald-400 bg-slate-800 border-slate-700 cursor-pointer"
            />
            <span className="flex items-center gap-1.5 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              {language === 'hi' ? 'केवल ऑनलाइन एवं सक्रिय उपयोगकर्ता' : 'Online & Able in Radius'}
            </span>
          </label>

          {/* Search bar */}
          <div className="relative min-w-[200px] flex-1 sm:flex-initial">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder={language === 'hi' ? 'नाम, गाँव या आवश्यकता खोजें...' : 'Search name, village or need...'}
              className="w-full bg-slate-800/80 border border-slate-700 text-xs text-white rounded-lg pl-8 pr-3 py-1.5 focus:outline-none focus:border-amber-400 placeholder-slate-500"
            />
          </div>
        </div>

        {/* Map & List Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Interactive Google Map with AdvancedMarker */}
          <div className="lg:col-span-7 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl relative bg-slate-900">
            {/* Top Bar inside Map */}
            <div className="absolute top-3 left-3 z-10 bg-slate-950/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700 text-xs text-white flex items-center gap-2 shadow-md">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span className="font-semibold">Center: SP SOLUTIONS</span>
              <span className="text-slate-400">House 359, Baloda</span>
            </div>

            <div className="absolute top-3 right-3 z-10 bg-slate-950/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700 text-xs text-emerald-400 flex items-center gap-1.5 shadow-md">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{filteredEntities.length} In-Radius Targets</span>
            </div>

            {/* Google Map Container with explicit height (CF2) */}
            <div className="h-[460px] sm:h-[520px] w-full">
              <APIProvider apiKey={apiKey}>
                <Map
                  defaultCenter={{ lat: SP_SOLUTIONS_HQ.latitude, lng: SP_SOLUTIONS_HQ.longitude }}
                  defaultZoom={12}
                  mapId="DEMO_MAP_ID"
                  gestureHandling="greedy"
                  disableDefaultUI={false}
                  internalUsageAttributionIds={["gmp_mcp_codeassist_v1_aistudio"]}
                  className="w-full h-full"
                >
                  {/* Central Campus Marker: SP SOLUTIONS HQ */}
                  <AdvancedMarker
                    position={{ lat: SP_SOLUTIONS_HQ.latitude, lng: SP_SOLUTIONS_HQ.longitude }}
                    title="SP SOLUTIONS Head Office - House No. 359, Baloda"
                    onClick={() => {
                      setSelectedEntity({
                        id: 'hq-sp-solutions',
                        entityId: 'HQ-SP-001',
                        name: 'SP SOLUTIONS Campus (Head Office)',
                        contactPerson: 'Santy Manikpuri (9279120271)',
                        phone: '9279120271',
                        category: 'COACHING_PARTNER',
                        categoryLabel: 'Main Learning Center & Studio',
                        locationName: 'House No. 359, Kotar Muhalla, Village Baloda, Hasuwa',
                        district: 'Baloda Bazar',
                        state: 'Chhattisgarh',
                        latitude: SP_SOLUTIONS_HQ.latitude,
                        longitude: SP_SOLUTIONS_HQ.longitude,
                        distanceKm: 0,
                        isOnline: true,
                        status: 'VERIFIED',
                        needsOrOffering: 'Primary Training Center for Spoken English, DCA/PGDCA Computer & Bollywood Singing.',
                        registeredAt: '2026-01-01',
                        lastActive: 'Online Now',
                        preferredMode: 'HYBRID'
                      });
                    }}
                  >
                    <Pin
                      background="#f59e0b"
                      borderColor="#78350f"
                      glyphColor="#0f172a"
                      scale={1.3}
                    />
                  </AdvancedMarker>

                  {/* Registered Entities Markers */}
                  {filteredEntities.map(ent => {
                    const isOnline = ent.isOnline;
                    const pinBg =
                      ent.category === 'STUDENT_BUYER'
                        ? '#10b981'
                        : ent.category === 'CORPORATE_RECEIVER'
                          ? '#0284c7'
                          : ent.category === 'VOCAL_MUSIC_STUDIO'
                            ? '#a855f7'
                            : ent.category === 'ONLINE_INDIVIDUAL'
                              ? '#06b6d4'
                              : '#f97316';

                    return (
                      <AdvancedMarker
                        key={ent.id}
                        position={{ lat: ent.latitude, lng: ent.longitude }}
                        title={`${ent.name} (${ent.distanceKm} km)`}
                        onClick={() => setSelectedEntity(ent)}
                      >
                        <div className="relative group cursor-pointer">
                          <Pin
                            background={pinBg}
                            borderColor="#0f172a"
                            glyphColor="#ffffff"
                            scale={0.95}
                          />
                          {isOnline && (
                            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-slate-950 animate-ping" />
                          )}
                        </div>
                      </AdvancedMarker>
                    );
                  })}

                  {/* InfoWindow for selected item */}
                  {selectedEntity && (
                    <InfoWindow
                      position={{ lat: selectedEntity.latitude, lng: selectedEntity.longitude }}
                      onCloseClick={() => setSelectedEntity(null)}
                    >
                      <div className="p-1 max-w-[260px] text-slate-900">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                            {selectedEntity.categoryLabel}
                          </span>
                          <span className="text-[10px] font-bold text-amber-600">
                            {selectedEntity.distanceKm === 0 ? 'Campus HQ' : `${selectedEntity.distanceKm} km away`}
                          </span>
                        </div>
                        <h4 className="font-bold text-sm text-slate-900 leading-tight">
                          {selectedEntity.name}
                        </h4>
                        <p className="text-xs text-slate-600 mt-1 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                          <span>{selectedEntity.locationName}, {selectedEntity.district}</span>
                        </p>
                        <p className="text-xs text-slate-700 mt-1.5 bg-amber-50 p-1.5 rounded border border-amber-200">
                          {selectedEntity.needsOrOffering}
                        </p>

                        <div className="mt-2.5 pt-2 border-t border-slate-200 flex items-center justify-between gap-2">
                          <a
                            href={`tel:${selectedEntity.phone}`}
                            className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 hover:text-emerald-800 bg-emerald-50 px-2 py-1 rounded"
                          >
                            <Phone className="w-3 h-3" /> Call
                          </a>
                          <a
                            href={`https://wa.me/91${selectedEntity.phone}?text=Hello%20${encodeURIComponent(selectedEntity.name)}%2C%20regarding%20learning%20and%20courses%20at%20SP%20SOLUTIONS%20Baloda.`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-800 bg-emerald-100 px-2 py-1 rounded"
                          >
                            <MessageCircle className="w-3 h-3" /> WhatsApp
                          </a>
                        </div>
                      </div>
                    </InfoWindow>
                  )}
                </Map>
              </APIProvider>
            </div>

            {/* Map Legend Footer */}
            <div className="p-3 bg-slate-950 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
              <div className="flex flex-wrap items-center gap-3">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  <span>SP Solutions HQ</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span>Student Buyers</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-sky-500" />
                  <span>Institutes & Receivers</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
                  <span>Vocal Studios</span>
                </span>
              </div>
              <a
                href={SP_SOLUTIONS_HQ.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-amber-400 hover:underline font-medium"
              >
                <span>Google Maps View</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Directory & Records List */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300">
                {language === 'hi' ? 'पंजीकृत रिकॉर्ड्स' : 'Nearby Records'} ({filteredEntities.length})
              </h3>
              <span className="text-xs text-slate-400">
                Sorted by distance from House 359
              </span>
            </div>

            {/* Scrollable list */}
            <div className="max-h-[500px] overflow-y-auto space-y-2.5 pr-1 custom-scrollbar">
              {filteredEntities.length === 0 ? (
                <div className="p-8 text-center rounded-2xl bg-slate-900/60 border border-slate-800 text-slate-400 text-xs">
                  <p>No buyers or receivers match the selected radius and filter.</p>
                  <button
                    onClick={handleTriggerRadarScan}
                    className="mt-3 px-3 py-1.5 rounded-lg bg-amber-500 text-slate-950 font-bold text-xs"
                  >
                    Run Autonomous Radar Scan
                  </button>
                </div>
              ) : (
                filteredEntities.map(ent => (
                  <div
                    key={ent.id}
                    onClick={() => setSelectedEntity(ent)}
                    className={`p-3.5 rounded-xl border transition cursor-pointer text-left ${
                      selectedEntity?.id === ent.id
                        ? 'bg-amber-500/10 border-amber-500/60 ring-1 ring-amber-500/30'
                        : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-white group-hover:text-amber-300">
                            {ent.name}
                          </h4>
                          {ent.isOnline ? (
                            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-semibold border border-emerald-500/30">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                              Online
                            </span>
                          ) : (
                            <span className="px-1.5 py-0.5 rounded-full bg-slate-800 text-slate-400 text-[10px]">
                              Offline
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-slate-500" />
                          <span>{ent.locationName}, {ent.district}</span>
                          <span className="text-amber-400 font-bold ml-1">({ent.distanceKm} km)</span>
                        </p>
                      </div>

                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 shrink-0">
                        {ent.entityId}
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 mt-2 line-clamp-2 bg-slate-950/60 p-2 rounded-lg border border-slate-800/80">
                      {ent.needsOrOffering}
                    </p>

                    <div className="mt-3 pt-2.5 border-t border-slate-800 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={e => {
                            e.stopPropagation();
                            handleToggleOnline(ent.id);
                          }}
                          className="text-[11px] text-slate-400 hover:text-white underline cursor-pointer"
                        >
                          Toggle {ent.isOnline ? 'Offline' : 'Online'}
                        </button>
                      </div>

                      <div className="flex items-center gap-2">
                        <a
                          href={`tel:${ent.phone}`}
                          onClick={e => e.stopPropagation()}
                          className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 inline-flex items-center gap-1"
                        >
                          <Phone className="w-3 h-3 text-emerald-400" />
                          <span>Call</span>
                        </a>
                        <a
                          href={`https://wa.me/91${ent.phone}?text=Hello%20${encodeURIComponent(ent.name)}%2C%20connecting%20from%20SP%20SOLUTIONS%20Baloda%20(House%20359).`}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={e => e.stopPropagation()}
                          className="px-2 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-semibold inline-flex items-center gap-1"
                        >
                          <MessageCircle className="w-3 h-3" />
                          <span>WhatsApp</span>
                        </a>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Manual Registration Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700 rounded-2xl p-6 shadow-2xl text-white max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <PlusCircle className="w-5 h-5 text-emerald-400" />
                  {language === 'hi' ? 'नया खरीदार या व्यवसाय पंजीकृत करें' : 'Register Buyer, Receiver or Business'}
                </h3>
                <p className="text-xs text-slate-400">
                  Will be recorded into SP SOLUTIONS geographic database
                </p>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">
                  Entity / Business / Learner Name *
                </label>
                <input
                  type="text"
                  required
                  value={newForm.name}
                  onChange={e => setNewForm({ ...newForm, name: e.target.value })}
                  placeholder="e.g. Ramesh Sahu (Spoken English) or Maa Gayatri High School"
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">
                    Category *
                  </label>
                  <select
                    value={newForm.category}
                    onChange={e => setNewForm({ ...newForm, category: e.target.value as EntityCategory })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="STUDENT_BUYER">Student / Course Buyer</option>
                    <option value="CORPORATE_RECEIVER">Institute / Staff Receiver</option>
                    <option value="BUSINESS_IT_COMMERCE">Retail / IT Business</option>
                    <option value="VOCAL_MUSIC_STUDIO">Music / Vocal Studio</option>
                    <option value="ONLINE_INDIVIDUAL">Online Active Individual</option>
                    <option value="COACHING_PARTNER">Coaching Partner</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">
                    Contact Person
                  </label>
                  <input
                    type="text"
                    value={newForm.contactPerson}
                    onChange={e => setNewForm({ ...newForm, contactPerson: e.target.value })}
                    placeholder="Name of manager or learner"
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={newForm.phone}
                    onChange={e => setNewForm({ ...newForm, phone: e.target.value })}
                    placeholder="10-digit mobile"
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={newForm.email}
                    onChange={e => setNewForm({ ...newForm, email: e.target.value })}
                    placeholder="name@example.com"
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">
                    Village / Locality *
                  </label>
                  <input
                    type="text"
                    required
                    value={newForm.locationName}
                    onChange={e => setNewForm({ ...newForm, locationName: e.target.value })}
                    placeholder="e.g. Village Hasuwa / Sadar Bazar"
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">
                    District
                  </label>
                  <input
                    type="text"
                    value={newForm.district}
                    onChange={e => setNewForm({ ...newForm, district: e.target.value })}
                    placeholder="Baloda Bazar / Raipur"
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">
                  Learning Need / Offering Requirement
                </label>
                <textarea
                  rows={2}
                  value={newForm.needsOrOffering}
                  onChange={e => setNewForm({ ...newForm, needsOrOffering: e.target.value })}
                  placeholder="e.g. Requires Spoken English evening batch or needs 2 computer staff."
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newForm.isOnline}
                    onChange={e => setNewForm({ ...newForm, isOnline: e.target.checked })}
                    className="w-4 h-4 rounded text-emerald-500 bg-slate-800 border-slate-700"
                  />
                  <span className="text-slate-300 font-medium">Currently Online & Able</span>
                </label>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold cursor-pointer"
                  >
                    Save & Register
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
