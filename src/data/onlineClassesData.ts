import { OnlineClassSession } from '../types';

export const liveOnlineSessions: OnlineClassSession[] = [
  {
    id: 'live-eng-101',
    title: 'Daily Spoken English Fluency & Real-Time Conversation Lab',
    titleHi: 'दैनिक स्पोकन इंग्लिश प्रवाह एवं रीयल-टाइम बातचीत अभ्यास',
    subject: 'english',
    scheduledTime: 'Daily 07:30 PM - 08:30 PM IST',
    durationMinutes: 60,
    instructor: 'Santy Manikpuri Sir & Guest Faculty',
    joinLink: 'https://meet.google.com/sp-solutions-english',
    platform: 'Google Meet',
    attendeesCount: 28,
    status: 'LIVE_NOW',
    keyTopics: [
      'Overcoming Hesitation & Stage Fear',
      'Daily 50 Functional Speaking Sentences',
      'Interactive Peer-to-Peer Speaking Room',
      'Accent Clarification & Pronunciation Correction'
    ]
  },
  {
    id: 'live-comp-201',
    title: 'DCA / PGDCA Practical Computer & Tally Prime GST Workshop',
    titleHi: 'डीसीए / पीजीडीसीए कंप्यूटर प्रैक्टिकल एवं टैली प्राइम जीएसटी कार्यशाला',
    subject: 'computer',
    scheduledTime: 'Mon, Wed, Fri 04:00 PM - 05:00 PM IST',
    durationMinutes: 60,
    instructor: 'Technical Faculty SP SOLUTIONS',
    joinLink: 'https://meet.google.com/sp-solutions-computer',
    platform: 'Zoom',
    attendeesCount: 34,
    status: 'UPCOMING',
    keyTopics: [
      'MS Office 365, Excel Advanced Formulas & VLOOKUP',
      'Tally Prime 4.0 GST Billing, Ledger & Inventory Creation',
      'Hindi / English Fast Typing Keyboard Techniques',
      'Government Exam Typing Speed Certification Prep'
    ]
  },
  {
    id: 'live-sing-301',
    title: 'Bollywood Playback Singing, Classical Sur Riyaz & Voice Culture',
    titleHi: 'बॉलीवुड प्लेबैक गायकी, शास्त्रीय सुर रियाज़ एवं आवाज़ संवारना',
    subject: 'singing',
    scheduledTime: 'Tue, Thu, Sat 06:00 PM - 07:00 PM IST',
    durationMinutes: 60,
    instructor: 'Santy Manikpuri (Artist / makemestar)',
    joinLink: 'https://meet.google.com/sp-solutions-vocal',
    platform: 'Google Meet',
    attendeesCount: 42,
    status: 'UPCOMING',
    keyTopics: [
      'Tanpura & Harmonium Pitch Alignment (Sa-Re-Ga-Ma)',
      'Breath Control, Harkat, Murki & Vocal Range Expansion',
      'Mic Technique for Studio Recording & YouTube Karaoke',
      'Expression & Emotion Delivery in Golden Era & Modern Songs'
    ]
  }
];
