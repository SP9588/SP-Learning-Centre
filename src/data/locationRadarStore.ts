import { RegisteredEntity, EntityCategory } from '../types';

export const SP_SOLUTIONS_HQ = {
  name: 'SP SOLUTIONS Head Office & Learning Campus',
  houseNo: 'House No. 359',
  locality: 'Kotar/Kotwar Muhalla, Near Mobile Tower',
  village: 'Village Baloda (Hasuwa)',
  district: 'Baloda Bazar - Bhatapara',
  state: 'Chhattisgarh',
  pincode: '493332',
  country: 'India',
  latitude: 21.6582,
  longitude: 82.1585,
  phone: '9279120271',
  contactPerson: 'Santy Manikpuri',
  youtube: 'makemestar',
  googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=21.6582,82.1585+(SP+SOLUTIONS+Baloda+House+359)'
};

// Calculate Haversine distance in km between two lat/lng coordinates
export function calculateDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth radius in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round((R * c) * 10) / 10;
}

const STORAGE_KEY_REGISTRY = 'sp_registered_entities_v3';

// Initial pre-registered cluster around Baloda, Hasuwa, Baloda Bazar, Bhatapara, Kasdol, Raipur
export const initialEntities: RegisteredEntity[] = [
  {
    id: 'ent-1',
    entityId: 'REG-CG-0101',
    name: 'Baloda Kisan Sewa & Commerce Hub',
    contactPerson: 'Ramesh Patel',
    phone: '9826101234',
    email: 'kisan.baloda@example.com',
    category: 'BUSINESS_IT_COMMERCE',
    categoryLabel: 'Retail & Business Enterprise',
    locationName: 'Main Chowk, Village Baloda',
    district: 'Baloda Bazar',
    state: 'Chhattisgarh',
    latitude: 21.6591,
    longitude: 82.1572,
    distanceKm: 0.3,
    isOnline: true,
    status: 'REGISTERED',
    needsOrOffering: 'Needs 2 computer operators trained in Tally & Excel from SP SOLUTIONS.',
    registeredAt: '2026-09-15',
    lastActive: 'Just now',
    preferredMode: 'OFFLINE'
  },
  {
    id: 'ent-2',
    entityId: 'REG-CG-0102',
    name: 'Priyanka Sahu',
    contactPerson: 'Priyanka Sahu',
    phone: '9752309876',
    email: 'priyanka.sahu@example.com',
    category: 'STUDENT_BUYER',
    categoryLabel: 'Student / Course Buyer',
    locationName: 'Kotar Muhalla, Village Baloda',
    district: 'Baloda Bazar',
    state: 'Chhattisgarh',
    latitude: 21.6575,
    longitude: 82.1594,
    distanceKm: 0.2,
    isOnline: true,
    status: 'STUDENT_ENROLLED',
    needsOrOffering: 'Enrolled in Daily Spoken English Fluency & Office DCA Course.',
    registeredAt: '2026-09-18',
    lastActive: '5 mins ago',
    preferredMode: 'HYBRID'
  },
  {
    id: 'ent-3',
    entityId: 'REG-CG-0103',
    name: 'Maa Sharda Public School',
    contactPerson: 'Principal B. K. Sharma',
    phone: '9425203456',
    email: 'sharda.school.hasuwa@example.com',
    category: 'CORPORATE_RECEIVER',
    categoryLabel: 'Institution / Staff Receiver',
    locationName: 'Near Canal Road, Hasuwa',
    district: 'Baloda Bazar',
    state: 'Chhattisgarh',
    latitude: 21.6645,
    longitude: 82.1640,
    distanceKm: 1.1,
    isOnline: true,
    status: 'ENGAGED',
    needsOrOffering: 'Receiving corporate spoken English workshop for 14 teachers.',
    registeredAt: '2026-09-20',
    lastActive: '12 mins ago',
    preferredMode: 'HYBRID'
  },
  {
    id: 'ent-4',
    entityId: 'REG-CG-0104',
    name: 'Sur Mandir Sangeet Kala Manch',
    contactPerson: 'Pt. Dinesh Manikpuri',
    phone: '9179504321',
    email: 'surmandir.cg@example.com',
    category: 'VOCAL_MUSIC_STUDIO',
    categoryLabel: 'Music Studio & Performing Artiste',
    locationName: 'Hasuwa Chowk',
    district: 'Baloda Bazar',
    state: 'Chhattisgarh',
    latitude: 21.6610,
    longitude: 82.1612,
    distanceKm: 0.6,
    isOnline: true,
    status: 'REGISTERED',
    needsOrOffering: 'Seeking Bollywood vocal riyaz students & stage mic training collaboration.',
    registeredAt: '2026-09-22',
    lastActive: 'Just now',
    preferredMode: 'OFFLINE'
  },
  {
    id: 'ent-5',
    entityId: 'REG-CG-0105',
    name: 'Amit Kumar Dewangan',
    contactPerson: 'Amit Dewangan',
    phone: '9981405678',
    email: 'amit.dewangan@example.com',
    category: 'ONLINE_INDIVIDUAL',
    categoryLabel: 'Active Online Learner',
    locationName: 'Sadar Bazar, Baloda Bazar Town',
    district: 'Baloda Bazar',
    state: 'Chhattisgarh',
    latitude: 21.6667,
    longitude: 82.1667,
    distanceKm: 1.4,
    isOnline: true,
    status: 'VERIFIED',
    needsOrOffering: 'Seeking Online Zoom batch for DCA Computer certificate + typing speed test.',
    registeredAt: '2026-09-25',
    lastActive: 'Just now',
    preferredMode: 'ONLINE'
  },
  {
    id: 'ent-6',
    entityId: 'REG-CG-0106',
    name: 'Digital CSC Pragya Kendra',
    contactPerson: 'Santosh Yadu',
    phone: '9630107890',
    category: 'BUSINESS_IT_COMMERCE',
    categoryLabel: 'Retail & Business Enterprise',
    locationName: 'Bhatapara Road Junction',
    district: 'Baloda Bazar',
    state: 'Chhattisgarh',
    latitude: 21.6720,
    longitude: 82.1520,
    distanceKm: 2.2,
    isOnline: false,
    status: 'REGISTERED',
    needsOrOffering: 'Registered as local partner for admissions & computer practical test venue.',
    registeredAt: '2026-09-26',
    lastActive: '2 hours ago',
    preferredMode: 'OFFLINE'
  },
  {
    id: 'ent-7',
    entityId: 'REG-CG-0107',
    name: 'Geeta Verma',
    contactPerson: 'Geeta Verma',
    phone: '9893201122',
    email: 'geeta.verma@example.com',
    category: 'STUDENT_BUYER',
    categoryLabel: 'Student / Course Buyer',
    locationName: 'Palari Road, Kasdol',
    district: 'Baloda Bazar',
    state: 'Chhattisgarh',
    latitude: 21.6210,
    longitude: 82.2530,
    distanceKm: 10.4,
    isOnline: true,
    status: 'REGISTERED',
    needsOrOffering: 'Hindi Bollywood Harmonium & Classical Sur Riyaz online weekend course.',
    registeredAt: '2026-09-28',
    lastActive: 'Just now',
    preferredMode: 'ONLINE'
  },
  {
    id: 'ent-8',
    entityId: 'REG-CG-0108',
    name: 'Chhattisgarhi Yuva Career Foundation',
    contactPerson: 'Devendra Chandrakar',
    phone: '9301204455',
    email: 'cg.yuva@example.com',
    category: 'COACHING_PARTNER',
    categoryLabel: 'Coaching & Academic Partner',
    locationName: 'Station Road, Bhatapara',
    district: 'Baloda Bazar',
    state: 'Chhattisgarh',
    latitude: 21.7340,
    longitude: 81.9350,
    distanceKm: 24.5,
    isOnline: true,
    status: 'VERIFIED',
    needsOrOffering: 'Collaborating to refer 50+ students for SP SOLUTIONS Spoken English certification.',
    registeredAt: '2026-09-29',
    lastActive: '15 mins ago',
    preferredMode: 'HYBRID'
  },
  {
    id: 'ent-9',
    entityId: 'REG-CG-0109',
    name: 'Vikash Netam (Govt. Exam Aspirant)',
    contactPerson: 'Vikash Netam',
    phone: '9755403322',
    email: 'vikash.netam@example.com',
    category: 'ONLINE_INDIVIDUAL',
    categoryLabel: 'Active Online Learner',
    locationName: 'Civil Lines, Raipur',
    district: 'Raipur',
    state: 'Chhattisgarh',
    latitude: 21.2514,
    longitude: 81.6296,
    distanceKm: 68.2,
    isOnline: true,
    status: 'REGISTERED',
    needsOrOffering: 'Online evening batch for English interview preparation & fluent communication.',
    registeredAt: '2026-10-01',
    lastActive: 'Just now',
    preferredMode: 'ONLINE'
  }
];

export function getRegisteredEntities(): RegisteredEntity[] {
  if (typeof window === 'undefined') return initialEntities;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_REGISTRY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY_REGISTRY, JSON.stringify(initialEntities));
      return initialEntities;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error('Error fetching registered entities:', e);
    return initialEntities;
  }
}

export function saveRegisteredEntities(entities: RegisteredEntity[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY_REGISTRY, JSON.stringify(entities));
  } catch (e) {
    console.error('Error saving registered entities:', e);
  }
}

export function addRegisteredEntity(input: Omit<RegisteredEntity, 'id' | 'entityId' | 'distanceKm' | 'registeredAt' | 'lastActive'>): RegisteredEntity {
  const current = getRegisteredEntities();
  const nextNum = current.length + 101;
  const dist = calculateDistanceKm(
    SP_SOLUTIONS_HQ.latitude,
    SP_SOLUTIONS_HQ.longitude,
    input.latitude,
    input.longitude
  );

  const newEntity: RegisteredEntity = {
    ...input,
    id: `ent-${Date.now()}`,
    entityId: `REG-CG-${nextNum}`,
    distanceKm: dist,
    registeredAt: new Date().toISOString().split('T')[0],
    lastActive: 'Just now'
  };

  const updated = [newEntity, ...current];
  saveRegisteredEntities(updated);
  return newEntity;
}

export function updateEntityStatus(id: string, status: RegisteredEntity['status']): void {
  const current = getRegisteredEntities();
  const next = current.map(e => e.id === id ? { ...e, status, lastActive: 'Just now' } : e);
  saveRegisteredEntities(next);
}

export function toggleEntityOnline(id: string): void {
  const current = getRegisteredEntities();
  const next = current.map(e => e.id === id ? { ...e, isOnline: !e.isOnline, lastActive: 'Just now' } : e);
  saveRegisteredEntities(next);
}

// Automated iterative radar discovery generator
export function runAutonomousRadarDiscovery(radiusKm: number = 25): { newCount: number; updated: RegisteredEntity[] } {
  const current = getRegisteredEntities();
  const existingNames = new Set(current.map(e => e.name.toLowerCase()));

  // Pool of realistic nearby entities across surrounding towns & villages
  const candidatePool: Omit<RegisteredEntity, 'id' | 'entityId' | 'distanceKm' | 'registeredAt' | 'lastActive'>[] = [
    {
      name: 'Baloda Bazar IT Professionals Guild',
      contactPerson: 'Anurag Kashyap',
      phone: '9424109811',
      category: 'BUSINESS_IT_COMMERCE',
      categoryLabel: 'Retail & Business Enterprise',
      locationName: 'Kasdol Road, Baloda Bazar',
      district: 'Baloda Bazar',
      state: 'Chhattisgarh',
      latitude: 21.6620,
      longitude: 82.1630,
      isOnline: true,
      status: 'DISCOVERED',
      needsOrOffering: 'Seeking certified DCA & Python students for summer traineeship.',
      preferredMode: 'HYBRID'
    },
    {
      name: 'Sneha Banjare (College Student)',
      contactPerson: 'Sneha Banjare',
      phone: '9827405566',
      category: 'STUDENT_BUYER',
      categoryLabel: 'Student / Course Buyer',
      locationName: 'Village Hasuwa, Near Canal',
      district: 'Baloda Bazar',
      state: 'Chhattisgarh',
      latitude: 21.6602,
      longitude: 82.1620,
      isOnline: true,
      status: 'VERIFIED',
      needsOrOffering: 'Interested in daily spoken English practice and interview prep.',
      preferredMode: 'OFFLINE'
    },
    {
      name: 'Shree Krishna Kirana & Retail Mart',
      contactPerson: 'Krishna Gupta',
      phone: '9179008877',
      category: 'BUSINESS_IT_COMMERCE',
      categoryLabel: 'Retail & Business Enterprise',
      locationName: 'Kotar Muhalla, Village Baloda',
      district: 'Baloda Bazar',
      state: 'Chhattisgarh',
      latitude: 21.6587,
      longitude: 82.1590,
      isOnline: true,
      status: 'DISCOVERED',
      needsOrOffering: 'Needs computer accounting software training for retail billing.',
      preferredMode: 'OFFLINE'
    },
    {
      name: 'Kalyan Netam (Online Bollywood Singer)',
      contactPerson: 'Kalyan Netam',
      phone: '9926801290',
      category: 'ONLINE_INDIVIDUAL',
      categoryLabel: 'Active Online Learner',
      locationName: 'Bhatapara Town',
      district: 'Baloda Bazar',
      state: 'Chhattisgarh',
      latitude: 21.7300,
      longitude: 81.9300,
      isOnline: true,
      status: 'DISCOVERED',
      needsOrOffering: 'Online vocal riyaz, pitch control and Hindi playback singing sessions.',
      preferredMode: 'ONLINE'
    },
    {
      name: 'Gyanoday Vidya Mandir Higher Secondary',
      contactPerson: 'Vice Principal S. Rathore',
      phone: '9406203344',
      category: 'CORPORATE_RECEIVER',
      categoryLabel: 'Institution / Staff Receiver',
      locationName: 'Simga Highway Crossing',
      district: 'Baloda Bazar',
      state: 'Chhattisgarh',
      latitude: 21.6300,
      longitude: 81.8200,
      isOnline: true,
      status: 'DISCOVERED',
      needsOrOffering: 'Bulk enrollment proposal for 40 Class 11-12 students in Basic Computer literacy.',
      preferredMode: 'HYBRID'
    },
    {
      name: 'Chhattisgarhi Swar Tarang Studio',
      contactPerson: 'Kavita Verma',
      phone: '9340508822',
      category: 'VOCAL_MUSIC_STUDIO',
      categoryLabel: 'Music Studio & Performing Artiste',
      locationName: 'Bilaspur Road, Baloda Bazar',
      district: 'Baloda Bazar',
      state: 'Chhattisgarh',
      latitude: 21.6705,
      longitude: 82.1550,
      isOnline: true,
      status: 'DISCOVERED',
      needsOrOffering: 'Collaborative live rehearsals with Santy Manikpuri Sir (makemestar).',
      preferredMode: 'HYBRID'
    }
  ];

  const added: RegisteredEntity[] = [];

  for (const candidate of candidatePool) {
    if (!existingNames.has(candidate.name.toLowerCase())) {
      const dist = calculateDistanceKm(
        SP_SOLUTIONS_HQ.latitude,
        SP_SOLUTIONS_HQ.longitude,
        candidate.latitude,
        candidate.longitude
      );

      if (dist <= radiusKm) {
        const newEntity: RegisteredEntity = {
          ...candidate,
          id: `ent-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
          entityId: `REG-CG-${current.length + added.length + 105}`,
          distanceKm: dist,
          registeredAt: new Date().toISOString().split('T')[0],
          lastActive: 'Just now'
        };
        added.push(newEntity);
        existingNames.add(candidate.name.toLowerCase());
      }
    }
  }

  const result = [...added, ...current];
  saveRegisteredEntities(result);
  return { newCount: added.length, updated: result };
}

// Export Registry to CSV
export function exportRegistryToCsv(entities: RegisteredEntity[]): void {
  const headers = [
    'Registration ID',
    'Entity / Individual Name',
    'Category',
    'Contact Person',
    'Phone',
    'Email',
    'Location',
    'District',
    'Distance (km)',
    'Online Status',
    'Registry Status',
    'Preferred Mode',
    'Needs / Offering'
  ];

  const rows = entities.map(e => [
    `"${e.entityId}"`,
    `"${e.name.replace(/"/g, '""')}"`,
    `"${e.categoryLabel}"`,
    `"${e.contactPerson || ''}"`,
    `"${e.phone}"`,
    `"${e.email || ''}"`,
    `"${e.locationName}"`,
    `"${e.district}"`,
    `"${e.distanceKm}"`,
    `"${e.isOnline ? 'ONLINE' : 'OFFLINE'}"`,
    `"${e.status}"`,
    `"${e.preferredMode}"`,
    `"${(e.needsOrOffering || '').replace(/"/g, '""')}"`
  ]);

  const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `SP_SOLUTIONS_MAPS_REGISTRY_${new Date().toISOString().split('T')[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
