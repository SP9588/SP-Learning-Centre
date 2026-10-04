import { Course, Lead, DemoBooking, Batch, Student, WebsiteSettings, SongWork } from '../types';

export const initialSongs: SongWork[] = [
  {
    id: 'song-orig-1',
    title: 'Suron Ke Rang (Original)',
    titleHi: 'सुरों के रंग (मौलिक रचना)',
    artistOrSinger: 'Santy Manikpuri & SP Students',
    musicDirector: 'SP Solutions Studio',
    decade: '2020s',
    genre: 'Inspirational / Pop',
    difficulty: 'MEDIUM',
    vocalRange: 'C3 - E4',
    isOriginal: true,
    copyrightNotice: '© 2025 SP SOLUTIONS. All Rights Reserved. Created and owned by Santy Manikpuri.',
    lyricsGuideSummary: 'Original motivational lyrics on dreams, riyaz, and vocal expression. Official educational track.',
    level: 'INTERMEDIATE',
  },
  {
    id: 'song-orig-2',
    title: 'Baloda Ki Shaan (Original Folk Tribute)',
    titleHi: 'बलोदा की शान (लोक प्रेरणा)',
    artistOrSinger: 'SP Vocal Lab Artists',
    musicDirector: 'Santy Manikpuri',
    decade: '2020s',
    genre: 'Folk-inspired Hindi',
    difficulty: 'EASY',
    vocalRange: 'D3 - D4',
    isOriginal: true,
    copyrightNotice: '© 2025 SP SOLUTIONS. Licensed for institute learners.',
    lyricsGuideSummary: 'Folk-rhythm vocal warm-up celebrating Chhattisgarh heritage. Original melody & composition.',
    level: 'BEGINNER',
  },
  {
    id: 'song-bw-1',
    title: 'Pehla Nasha (Vocal Practice Study Guide)',
    titleHi: 'पहला नशा (रियाज़ अभ्यास)',
    artistOrSinger: 'Udit Narayan / Sadhana Sargam',
    musicDirector: 'Jatin-Lalit',
    decade: '1990s',
    genre: 'Romantic',
    difficulty: 'EASY',
    vocalRange: 'D3 - E4',
    isOriginal: false,
    copyrightNotice: 'Study reference only. SP Solutions does not sell or distribute copyrighted audio masters. Learners utilize authorized streaming.',
    lyricsGuideSummary: 'Excellent for practicing smooth breath transitions, sustained notes, and gentle vibrato dynamics.',
    level: 'BEGINNER',
  },
  {
    id: 'song-bw-2',
    title: 'Tum Hi Ho (Mic & Expression Study Guide)',
    titleHi: 'तुम ही हो (माइक व एक्सप्रेशन अभ्यास)',
    artistOrSinger: 'Arijit Singh',
    musicDirector: 'Mithoon',
    decade: '2010s',
    genre: 'Soulful Film Melody',
    difficulty: 'CHALLENGING',
    vocalRange: 'A2 - F#4',
    isOriginal: false,
    copyrightNotice: 'Educational analysis only. All rights belong to original copyright holders.',
    lyricsGuideSummary: 'Teaches chest-voice resonance, controlled vocal fry, and delicate dynamic shifts near the microphone.',
    level: 'ADVANCED',
  },
  {
    id: 'song-bw-3',
    title: 'Lag Ja Gale (Pitch & Ornamentation Practice)',
    titleHi: 'लग जा गले (सुर व हरकत अभ्यास)',
    artistOrSinger: 'Lata Mangeshkar',
    musicDirector: 'Madan Mohan',
    decade: '1960s',
    genre: 'Classic Film Song',
    difficulty: 'CHALLENGING',
    vocalRange: 'C4 - F5',
    isOriginal: false,
    copyrightNotice: 'Reference study track for vocal pitch exercises.',
    lyricsGuideSummary: 'Focuses on micro-tone placement, emotional modulation, and breath conservation.',
    level: 'ADVANCED',
  },
  {
    id: 'song-bw-4',
    title: 'Achha Sila Diya (Stage & Heartfelt Expression)',
    titleHi: 'अच्छा सिला दिया (स्टेज परफॉर्मेंस)',
    artistOrSinger: 'Sonu Nigam',
    musicDirector: 'Nikhil-Vinay',
    decade: '1990s',
    genre: 'Melodramatic Romantic',
    difficulty: 'MEDIUM',
    vocalRange: 'C3 - G4',
    isOriginal: false,
    copyrightNotice: 'Curriculum study reference for stage dynamics and vocal projection.',
    lyricsGuideSummary: 'Teaches high-pitch breath support, stage body language, and dramatic voice clarity.',
    level: 'INTERMEDIATE',
  }
];

export const initialCourses: Course[] = [
  {
    id: 'course-eng-1',
    slug: 'spoken-english-communication-mastery',
    name: 'Spoken English & Communication Mastery',
    nameHi: 'स्पोकन इंग्लिश एवं कम्युनिकेशन मास्टरी',
    category: 'english',
    subCategory: 'Speaking, Grammar & Personality Development',
    tagline: 'Speak fluent English with unshakeable confidence in 90 days.',
    taglineHi: '90 दिनों में बिना हिचकिचाहट धाराप्रवाह अंग्रेजी बोलें।',
    description:
      'A complete English curriculum engineered for village and town learners as well as global students. Master grammar foundations, daily vocabulary, sentence structure, accent clarity, public speaking, and job interview readiness.',
    descriptionHi:
      'ग्राम बलोदा एवं ऑनलाइन विद्यार्थियों के लिए तैयार किया गया संपूर्ण अंग्रेजी पाठ्यक्रम। व्याकरण की नींव, दैनिक शब्दावली, वाक्य रचना, सार्वजनिक भाषण और इंटरव्यू में सफलता प्राप्त करें।',
    level: 'BEGINNER',
    duration: '90 Days',
    onlineFee: 2499,
    offlineFee: 2999,
    monthlyFee: 899,
    registrationFee: 299,
    discountPercent: 20,
    scholarshipOffer: 'Special rural youth fee concession available.',
    installmentAvailable: true,
    offerPriceOnline: 1999,
    offerPriceOffline: 2399,
    validity: 'Lifetime Notes & 1 Year Portal Access',
    taxGstIncluded: true,
    isPopular: true,
    highlights: [
      'Comprehensive Grammar: Tenses, Prepositions, Voices & Speech',
      'Daily Conversation & 500+ High-Frequency Vocabulary',
      'Interview Preparation & Public Speaking Practice',
      'Audio pronunciation drill + AI conversational tutor',
    ],
    highlightsHi: [
      'संपूर्ण ग्रामर: टेंस, प्रपोजिशन, एक्टिव-पैसिव वॉइस और स्पीच',
      'दैनिक वार्तालाप और 500+ महत्वपूर्ण शब्द भंडार',
      'जॉब इंटरव्यू की तैयारी और पब्लिक स्पीकिंग अभ्यास',
      'ऑडियो उच्चारण अभ्यास और 24x7 एआई ट्यूटर',
    ],
    modules: [
      {
        id: 'mod-eng-1',
        title: 'English Grammar Foundations',
        titleHi: 'अंग्रेजी व्याकरण की मजबूत नींव',
        description: 'Parts of Speech, Sentence Structures, Tenses Mastery, Active/Passive Voice, Direct/Indirect Speech.',
        descriptionHi: 'पार्ट्स ऑफ स्पीच, वाक्य निर्माण, काल (Tenses), एक्टिव/पैसिव वॉइस और डायरेक्ट/इनडायरेक्ट स्पीच।',
        lessons: [
          { id: 'les-eng-101', title: 'Parts of Speech in Simple Terms', titleHi: 'पार्ट्स ऑफ स्पीच सरल हिंदी में', type: 'video', durationMinutes: 45, summary: 'Nouns, pronouns, verbs, adjectives, adverbs, prepositions, conjunctions.', summaryHi: 'संज्ञा, सर्वनाम, क्रिया, विशेषण आदि का सटीक प्रयोग।' },
          { id: 'les-eng-102', title: 'Mastering All 12 Tenses with Formula', titleHi: '12 कालों (Tenses) का आसान फॉर्मूला', type: 'practice', durationMinutes: 60, summary: 'Real-life sentence building across past, present, and future.', summaryHi: 'दैनिक जीवन में उपयोग होने वाले वाक्यों से टेंस समझें।' },
          { id: 'les-eng-103', title: 'Subject-Verb Agreement & Conjunctions', titleHi: 'सब्जेक्ट-वर्ब एग्रीमेंट एवं योजक शब्द', type: 'quiz', durationMinutes: 30, summary: 'Common sentence structure traps solved.', summaryHi: 'वाक्य रचना की गलतियों को पहचानें।' }
        ]
      },
      {
        id: 'mod-eng-2',
        title: 'Vocabulary & Reading Comprehension',
        titleHi: 'शब्दावली एवं वाचन कौशल',
        description: 'Synonyms, Antonyms, Everyday Idioms, Speed Reading, and Pronunciation.',
        descriptionHi: 'समानार्थी, विलोम शब्द, दैनिक मुहावरे, त्वरित वाचन और सटीक उच्चारण।',
        lessons: [
          { id: 'les-eng-201', title: 'Daily Life Vocabulary Booster (300 Words)', titleHi: 'दैनिक उपयोग के 300 आवश्यक शब्द', type: 'pdf', durationMinutes: 40, summary: 'Home, market, office, travel words with Hindi meanings.', summaryHi: 'घर, बाजार, दफ्तर और यात्रा से जुड़े शब्द।' },
          { id: 'les-eng-202', title: 'Pronunciation & Phonics Guide', titleHi: 'उच्चारण एवं ध्वनियों का सही अभ्यास', type: 'audio', durationMinutes: 35, summary: 'Clear silent letters and tongue-twister drills.', summaryHi: 'साइलेंट लेटर्स और कठिन ध्वनियों का शुद्ध उच्चारण।' }
        ]
      },
      {
        id: 'mod-eng-3',
        title: 'Writing Skills & Business Communication',
        titleHi: 'लेखन कौशल एवं व्यावसायिक संचार',
        description: 'Formal letters, office applications, professional emails, essays, and creative writing.',
        descriptionHi: 'औपचारिक पत्र, कार्यालयीन आवेदन, पेशेवर ईमेल और निबंध लेखन।',
        lessons: [
          { id: 'les-eng-301', title: 'Official Email & Application Writing', titleHi: 'ऑफिस ईमेल एवं एप्लीकेशन लेखन', type: 'video', durationMinutes: 50, summary: 'How to write leave, job, and inquiry applications properly.', summaryHi: 'अवकाश, नौकरी और शिकायत पत्र का सही प्रारूप।' }
        ]
      },
      {
        id: 'mod-eng-4',
        title: 'Spoken English & Personality Development',
        titleHi: 'स्पोकन इंग्लिश एवं व्यक्तित्व विकास',
        description: 'Q&A confidence, stage fear removal, presentation skills, and job interview cracking.',
        descriptionHi: 'मंच के डर को दूर करना, आत्मविश्वास से उत्तर देना और जॉब इंटरव्यू की तैयारी।',
        lessons: [
          { id: 'les-eng-401', title: 'Cracking Job Interviews in English', titleHi: 'अंग्रेजी में जॉब इंटरव्यू की तैयारी', type: 'practice', durationMinutes: 55, summary: 'Tell me about yourself, strengths, salary queries, body language.', summaryHi: 'अपना परिचय, खूबियां और सटीक बॉडी लैंग्वेज।' }
        ]
      }
    ]
  },
  {
    id: 'course-comp-1',
    slug: 'dca-diploma-in-computer-applications',
    name: 'DCA (Diploma in Computer Applications)',
    nameHi: 'डीसीए (कंप्यूटर एप्लीकेशन डिप्लोमा)',
    category: 'computer',
    subCategory: 'Certificate Courses, Office & IT Fundamentals',
    tagline: 'Recognized 6-Month Diploma for government and private jobs.',
    taglineHi: 'सरकारी एवं निजी नौकरियों के लिए 6 माह का मान्यता प्राप्त डिप्लोमा।',
    description:
      'Master complete Computer Fundamentals, Windows, MS Office (Word, Excel with formulas, PowerPoint), Internet navigation, Email security, Database introduction, and Hindi/English typing.',
    descriptionHi:
      'कंप्यूटर फंडामेंटल्स, विंडोज, एमएस ऑफिस (वर्ड, एक्सेल फॉर्मूले, पावरपॉइंट), इंटरनेट, डेटाबेस और हिंदी-अंग्रेजी टाइपिंग का संपूर्ण व्यावहारिक प्रशिक्षण।',
    level: 'BEGINNER',
    duration: '6 Months',
    onlineFee: 3999,
    offlineFee: 4999,
    monthlyFee: 850,
    registrationFee: 499,
    discountPercent: 15,
    scholarshipOffer: 'Merit scholarship for top performers in Baloda.',
    installmentAvailable: true,
    offerPriceOnline: 3399,
    offerPriceOffline: 4249,
    validity: '6 Months + Certificate Exam Access',
    taxGstIncluded: true,
    isPopular: true,
    highlights: [
      'MS Word, Advanced Excel (VLOOKUP, Pivot, Formulas) & PowerPoint',
      'Operating Systems: Windows & Linux basics, Files/Folders management',
      'Hindi Typing (Kruti Dev / Mangal) & English Typing speed test',
      'Practical Lab training at Baloda Centre or live screen-share online',
    ],
    highlightsHi: [
      'एमएस वर्ड, एडवांस्ड एक्सेल (VLOOKUP, पिवट, फॉर्मूले) और पावरपॉइंट',
      'ऑपरेटिंग सिस्टम: विंडोज व लिनक्स, फाइल/फोल्डर मैनेजमेंट',
      'हिंदी टाइपिंग (कृति देव/मंगल) और अंग्रेजी टाइपिंग स्पीड टेस्ट',
      'बलोदा सेंटर में प्रैक्टिकल लैब या लाइव ऑनलाइन स्क्रीन-शेयर',
    ],
    modules: [
      {
        id: 'mod-dca-1',
        title: 'Computer Fundamentals & Operating Systems',
        titleHi: 'कंप्यूटर फंडामेंटल्स एवं ऑपरेटिंग सिस्टम',
        description: 'Hardware, software, memory, input/output devices, Windows and Linux filesystem.',
        descriptionHi: 'हार्डवेयर, सॉफ्टवेयर, मेमोरी, इनपुट/आउटपुट डिवाइस एवं विंडोज/लिनक्स फाइल सिस्टम।',
        lessons: [
          { id: 'les-dca-101', title: 'Architecture of Computers & Peripherals', titleHi: 'कंप्यूटर संरचना एवं उपकरण', type: 'video', durationMinutes: 45, summary: 'CPU, RAM, SSD, Ports, Motherboard overview.', summaryHi: 'सीपीयू, रैम, एसएसडी और पोर्ट्स की जानकारी।' },
          { id: 'les-dca-102', title: 'Windows File Management & Settings', titleHi: 'विंडोज फाइल मैनेजमेंट व सेटिंग्स', type: 'practice', durationMinutes: 50, summary: 'Shortcuts, control panel, folder encryption.', summaryHi: 'शॉर्टकट कीज, कंट्रोल पैनल और फाइल्स को सुरक्षित रखना।' }
        ]
      },
      {
        id: 'mod-dca-2',
        title: 'MS Office Suite: Word, Excel, PowerPoint',
        titleHi: 'एमएस ऑफिस: वर्ड, एक्सेल, पावरपॉइंट',
        description: 'Complete office automation: Document formatting, billing sheets, pivot tables, presentations.',
        descriptionHi: 'डॉक्यूमेंट फॉर्मेटिंग, बिलिंग शीट, फॉर्मूले, पिवट टेबल्स और प्रेजेंटेशन।',
        lessons: [
          { id: 'les-dca-201', title: 'MS Word Document Formatting & Mail Merge', titleHi: 'एमएस वर्ड एवं मेल मर्ज', type: 'video', durationMinutes: 60, summary: 'Tables, header/footer, certificates design, mail merge.', summaryHi: 'टेबल्स, सर्टिफिकेट डिजाइन और बल्क मेल मर्ज।' },
          { id: 'les-dca-202', title: 'Advanced Excel Formulas & Data Analysis', titleHi: 'एडवांस्ड एक्सेल फॉर्मूले व एनालिसिस', type: 'practice', durationMinutes: 90, summary: 'SUMIFS, VLOOKUP, XLOOKUP, conditional formatting, chart reports.', summaryHi: 'VLOOKUP, डेटा वैलिडेशन और वित्तीय रिपोर्टिंग।' }
        ]
      },
      {
        id: 'mod-dca-3',
        title: 'Typing Proficiency & Speed Building',
        titleHi: 'टाइपिंग दक्षता एवं गति निर्माण',
        description: 'English touch typing and Hindi typing (Kruti Dev / Mangal Unicode) for CPCT/Government exams.',
        descriptionHi: 'प्रतियोगी परीक्षाओं हेतु अंग्रेजी और हिंदी टाइपिंग का दैनिक अभ्यास।',
        lessons: [
          { id: 'les-dca-301', title: 'Touch Typing Finger Position & Drills', titleHi: 'फिंगर पोजीशन एवं स्पीड ड्रिल', type: 'practice', durationMinutes: 40, summary: 'Reach 35+ WPM with 95%+ accuracy.', summaryHi: '35+ शब्द प्रति मिनट की गति हासिल करें।' }
        ]
      }
    ]
  },
  {
    id: 'course-comp-2',
    slug: 'adca-advanced-diploma-computer-applications',
    name: 'ADCA (Advanced Diploma in Computer Applications)',
    nameHi: 'एडीसीए (एडवांस्ड कंप्यूटर एप्लीकेशन डिप्लोमा)',
    category: 'computer',
    subCategory: '12-Month Comprehensive Diploma, Web, Database & Accounts',
    tagline: 'The ultimate 1-year master diploma covering IT, Coding, and Accounting.',
    taglineHi: 'आईटी, कोडिंग, डेटाबेस और अकाउंटिंग का संपूर्ण 1-वर्षीय मास्टर डिप्लोमा।',
    description:
      'Includes everything in DCA plus Financial Accounting (Tally basics), Relational Databases & SQL, Web Development (HTML5, CSS3, JavaScript), Networking, and an introduction to Python & AI Tools.',
    descriptionHi:
      'डीसीए की सभी सामग्री के अलावा टैली एकाउंटिंग, एसक्यूएल डेटाबेस, वेब डेवलपमेंट, नेटवर्किंग और पायथन एवं एआई टूल्स का संपूर्ण ज्ञान।',
    level: 'INTERMEDIATE',
    duration: '12 Months',
    onlineFee: 6999,
    offlineFee: 8499,
    monthlyFee: 750,
    registrationFee: 599,
    discountPercent: 20,
    scholarshipOffer: 'Discount for female students & top scorers.',
    installmentAvailable: true,
    offerPriceOnline: 5599,
    offerPriceOffline: 6799,
    validity: '12 Months + Project Work Support',
    taxGstIncluded: true,
    highlights: [
      'All DCA modules + Tally Prime Accounting & GST basics',
      'Web Development: HTML5, CSS3, JavaScript, Responsive design',
      'Database Management: SQL Queries, Relational DBs, Normalization',
      'Intro to Python Programming, AI Tools, Prompt Engineering',
    ],
    highlightsHi: [
      'डीसीए के सभी मॉड्यूल्स + टैली प्राइम अकाउंटिंग व जीएसटी',
      'वेब डेवलपमेंट: एचटीएमएल5, सीएसएस3, जावास्क्रिप्ट',
      'डेटाबेस मैनेजमेंट: एसक्यूएल क्वेरी एवं रिलेशनल डेटाबेस',
      'पायथन प्रोग्रामिंग, एआई टूल्स और प्रॉम्प्ट इंजीनियरिंग का परिचय',
    ],
    modules: [
      {
        id: 'mod-adca-1',
        title: 'Web Design & Frontend Development',
        titleHi: 'वेब डिजाइन एवं फ्रंटएंड डेवलपमेंट',
        description: 'Build real responsive websites with HTML, CSS, JavaScript.',
        descriptionHi: 'एचटीएमएल, सीएसएस और जावास्क्रिप्ट से आकर्षक वेबसाइट बनाना सीखें।',
        lessons: [
          { id: 'les-adca-101', title: 'HTML5 Semantic Structure & Modern CSS', titleHi: 'एचटीएमएल5 एवं सीएसएस3 बेसिक्स', type: 'video', durationMinutes: 60, summary: 'Flexbox, Grid, forms, responsive viewports.', summaryHi: 'मोबाइल फ्रेंडली वेब पेज डिजाइन।' }
        ]
      },
      {
        id: 'mod-adca-2',
        title: 'Relational Databases & SQL Queries',
        titleHi: 'रिलेशनल डेटाबेस एवं एसक्यूएल',
        description: 'SELECT, INSERT, UPDATE, JOINs, Primary Keys, normalization.',
        descriptionHi: 'टेबल्स, जॉइन्स, प्राइमरी की और डेटाबेस मैनेजमेंट।',
        lessons: [
          { id: 'les-adca-201', title: 'Writing Real-world SQL Queries', titleHi: 'प्रैक्टिकल एसक्यूएल क्वेरी लिखना', type: 'practice', durationMinutes: 50, summary: 'Manage customer and inventory database tables.', summaryHi: 'डेटाबेस में डेटा जोड़ना, खोजना और अपडेट करना।' }
        ]
      }
    ]
  },
  {
    id: 'course-comp-3',
    slug: 'python-coding-and-ai-technology',
    name: 'Python Programming & AI Tools / Vibe Coding',
    nameHi: 'पायथन प्रोग्रामिंग एवं एआई टूल्स / वाइब कोडिंग',
    category: 'computer',
    subCategory: 'Programming, AI Automation & Prompt Engineering',
    tagline: 'Code modern software with Python and leverage GenAI to build apps 10x faster.',
    taglineHi: 'पायथन में कोडिंग सीखें और आधुनिक एआई टूल्स से 10 गुना तेजी से ऐप बनाएं।',
    description:
      'Learn core programming logic (variables, loops, functions, OOP), script writing, API handling, and the latest modern tools: Generative AI, Prompt Engineering, AI-assisted coding, Vibe Coding, and No-Code/Low-Code app development.',
    descriptionHi:
      'प्रोग्रामिंग की बुनियादी समझ (वेरिएबल्स, लूप्स, फंक्शन्स, ऊप्स), जेनेरेटिव एआई, प्रॉम्प्ट इंजीनियरिंग, वाइब कोडिंग और नो-कोड टूल्स का व्यावहारिक प्रशिक्षण।',
    level: 'BEGINNER',
    duration: '60 Days',
    onlineFee: 3499,
    offlineFee: 4199,
    monthlyFee: 1200,
    registrationFee: 299,
    discountPercent: 15,
    installmentAvailable: true,
    offerPriceOnline: 2974,
    offerPriceOffline: 3569,
    validity: '1 Year Access',
    taxGstIncluded: true,
    highlights: [
      'Python syntax, Data structures, File I/O, Web automation',
      'AI-assisted Coding & Vibe Coding techniques with modern LLMs',
      'Prompt Engineering for developers, students, and businesses',
      'Hands-on project building: Automation scripts & interactive tools',
    ],
    highlightsHi: [
      'पायथन सिंटेक्स, डेटा स्ट्रक्चर्स, फाइल हैंडलिंग, ऑटोमेशन',
      'एआई-असिस्टेड कोडिंग एवं वाइब कोडिंग तकनीक',
      'विद्यार्थियों और व्यवसायों के लिए प्रॉम्प्ट इंजीनियरिंग',
      'प्रैक्टिकल प्रोजेक्ट्स: ऑटोमेशन स्क्रिप्ट्स और वेब टूल्स',
    ],
    modules: [
      {
        id: 'mod-py-1',
        title: 'Python Fundamentals to Automation',
        titleHi: 'पायथन फंडामेंटल्स से ऑटोमेशन तक',
        description: 'Variables, Conditionals, Loops, Lists, Dictionaries, Functions.',
        descriptionHi: 'वेरिएबल्स, लूप्स, फंक्शन्स और डेटा स्ट्रक्चर।',
        lessons: [
          { id: 'les-py-101', title: 'Python Syntax & Interactive Shell', titleHi: 'पायथन सिंटेक्स व शुरुआत', type: 'video', durationMinutes: 45, summary: 'Writing your first script and terminal commands.', summaryHi: 'पहला पायथन कोड लिखना और रन करना।' }
        ]
      },
      {
        id: 'mod-py-2',
        title: 'Modern AI Tools & Prompt Engineering',
        titleHi: 'आधुनिक एआई टूल्स एवं प्रॉम्प्ट इंजीनियरिंग',
        description: 'Using GenAI to write code, design workflows, and automate repetitive tasks.',
        descriptionHi: 'जेनेरेटिव एआई की मदद से कोडिंग और कार्य स्वचालन।',
        lessons: [
          { id: 'les-py-201', title: 'Prompting for Developers & Vibe Coding', titleHi: 'डेवलपर्स के लिए प्रॉम्प्टिंग व वाइब कोडिंग', type: 'practice', durationMinutes: 50, summary: 'Zero-shot, few-shot, and iterative coding with AI assistance.', summaryHi: 'एआई की सहायता से तेजी से सॉफ्टवेयर प्रोटोटाइप बनाना।' }
        ]
      }
    ]
  },
  {
    id: 'course-sing-1',
    slug: 'hindi-bollywood-vocal-singing-mastery',
    name: 'Hindi Bollywood Vocal Learning & Singing Mastery',
    nameHi: 'हिंदी बॉलीवुड वोकल एवं गायन मास्टरी',
    category: 'singing',
    subCategory: 'Bollywood Film Songs, Voice Culture & Stage Performance',
    tagline: 'Find your true pitch, master breath control, and sing Bollywood songs with heartfelt emotion.',
    taglineHi: 'अपने सुर को पहचानें, सांस पर नियंत्रण पाएं और पूरे भाव के साथ बॉलीवुड गीत गाएं।',
    description:
      'Specially designed for lovers of Hindi music. Focuses entirely on Hindi film songs, romantic melodies, devotional bhajans, folk-inspired Hindi singing, pitch stability (Sur), rhythm awareness (Taal), breath support, mic technique, and karaoke/stage confidence. [IMPORTANT: Classical Singing is excluded from this course].',
    descriptionHi:
      'हिंदी संगीत प्रेमियों के लिए विशेष पाठ्यक्रम। बॉलीवुड फिल्मी गाने, रोमांटिक गीत, भक्ति भजन, लोक-गीत, सुर-ताल साधना, सांस नियंत्रण, माइक तकनीक और स्टेज परफॉर्मेंस का रियाज़। [महत्वपूर्ण सूचना: शास्त्रीय संगीत इसमें शामिल नहीं है]।',
    level: 'BEGINNER',
    duration: '90 Days',
    onlineFee: 2999,
    offlineFee: 3499,
    monthlyFee: 999,
    registrationFee: 299,
    discountPercent: 15,
    scholarshipOffer: 'Audition-based talent discount available.',
    installmentAvailable: true,
    offerPriceOnline: 2549,
    offerPriceOffline: 2974,
    validity: '90 Days + Lifetime Vocal Drills',
    taxGstIncluded: true,
    isPopular: true,
    highlights: [
      'Vocal Culture: Breathing exercises, Diaphragm support, Voice projection',
      'Pitch (Sur) Training: Matching notes with Tanpura/Harmonium pitch',
      'Rhythm (Taal) Training: Keherwa, Dadra, Roopak groove mastery',
      'Microphone & Studio Recording Technique for YouTube / Instagram singing',
      'Exclusive Original Music section + Study guides for evergreen Bollywood hits',
    ],
    highlightsHi: [
      'वॉइस कल्चर: सांस का सही व्यायाम, डायफ्राम सपोर्ट, आवाज का विस्तार',
      'सुर साधना: तानपुरा और हार्मोनियम सुर के साथ सटीक गायकी',
      'ताल ज्ञान: कहरवा, दादरा, रूपक ताल पर गायन का अभ्यास',
      'माइक एवं रिकॉर्डिंग तकनीक: यूट्यूब व सोशल मीडिया गायन के लिए',
      'मौलिक संगीत (Original Music) सेक्शन और सदाबहार गीतों का रियाज़',
    ],
    modules: [
      {
        id: 'mod-voc-1',
        title: 'Voice Control, Breathing & Riyaz Routine',
        titleHi: 'वॉइस कंट्रोल, ब्रीदिंग एवं दैनिक रियाज़',
        description: 'Belly breathing, warm-ups, vocal cord safety, throat relaxation, removing strain.',
        descriptionHi: 'डायफ्राम से सांस लेना, गले को बिना थकाए रियाज़ करना और वोकल वॉर्म-अप।',
        lessons: [
          { id: 'les-voc-101', title: 'Daily 15-Minute Morning Riyaz Schedule', titleHi: 'दैनिक 15 मिनट का सुबह का रियाज़', type: 'audio', durationMinutes: 25, summary: 'Sa-Pa sustained notes, humming, lip trills.', summaryHi: 'सा-पा सुर साधना, हमिंग और लिप ट्रिल्स।' },
          { id: 'les-voc-102', title: 'Breath Management for Long Musical Lines', titleHi: 'लंबे सुरों के लिए सांस नियंत्रण', type: 'practice', durationMinutes: 30, summary: 'How to sing whole lines without running out of air.', summaryHi: 'बिना हांफे पूरी लाइन को मधुरता से गाना।' }
        ]
      },
      {
        id: 'mod-voc-2',
        title: 'Pitch Stabilization & Rhythm (Taal) Mastery',
        titleHi: 'सुर स्थिरता एवं ताल ज्ञान',
        description: 'Identifying off-pitch (Besura) tendencies, matching Tanpura pitch, understanding Keherwa and Dadra.',
        descriptionHi: 'बेसुरा होने से बचना, तानपुरे से सुर मिलाना और 8 मात्रा (कहरवा), 6 मात्रा (दादरा) पर गायन।',
        lessons: [
          { id: 'les-voc-201', title: 'Pitch Accuracy with Digital Tanpura', titleHi: 'डिजिटल तानपुरे के साथ सुर साधना', type: 'practice', durationMinutes: 35, summary: 'Ear training and note-matching practice.', summaryHi: 'कानों को सुर पहचानने के लिए तैयार करना।' }
        ]
      },
      {
        id: 'mod-voc-3',
        title: 'Bollywood Song Rendition & Expression',
        titleHi: 'बॉलीवुड गानों की अदायगी एवं एक्सप्रेशन',
        description: 'Singing with soul: romantic nuances, emotional delivery, clear diction in Hindi/Urdu words.',
        descriptionHi: 'गाने में भाव (Expression) लाना, शब्दों का शुद्ध उच्चारण और मधुर अदायगी।',
        lessons: [
          { id: 'les-voc-301', title: 'Song Structure & Phrasing Breakdown', titleHi: 'मुखड़ा और अंतरा की सही अदायगी', type: 'video', durationMinutes: 45, summary: 'Mukhda, Antara, transitions, and dynamics.', summaryHi: 'गीत की शुरुआत, उठाव और ठहराव को समझना।' }
        ]
      },
      {
        id: 'mod-voc-4',
        title: 'Microphone Technique & Stage Confidence',
        titleHi: 'माइक तकनीक एवं मंच पर गायन का आत्मविश्वास',
        description: 'Mic distance, plosive control, stage presence, overcoming nervousness, karaoke singing.',
        descriptionHi: 'माइक की दूरी, कराओके ट्रैक के साथ तालमेल और मंच पर घबराहट दूर करना।',
        lessons: [
          { id: 'les-voc-401', title: 'Live Mic & Karaoke Studio Practice', titleHi: 'लाइव माइक और कराओके पर गायन', type: 'video', durationMinutes: 40, summary: 'Pro tips for stage gigs and YouTube song covers.', summaryHi: 'यूट्यूब कवर्स और स्टेज शो के लिए पेशेवर सुझाव।' }
        ]
      }
    ],
    songsCatalog: initialSongs
  }
];

// Fresh start from scratch for leads, demo bookings, and students
export const initialLeads: Lead[] = [];
export const initialDemoBookings: DemoBooking[] = [];
export const initialStudents: Student[] = [];

export const initialBatches: Batch[] = [
  {
    id: 'batch-baloda-morn',
    name: 'Baloda Morning Classroom Batch (English & DCA)',
    courseId: 'course-comp-1',
    timeSlot: '08:00 AM - 10:00 AM (Mon - Sat)',
    mode: 'OFFLINE',
    teacherName: 'Santy Manikpuri & Faculty',
    totalSeats: 25,
    enrolledCount: 0,
    startDate: '2026-10-01',
    status: 'ACTIVE',
  },
  {
    id: 'batch-baloda-eve',
    name: 'Baloda Evening Technology & Coding Batch',
    courseId: 'course-comp-3',
    timeSlot: '04:30 PM - 06:00 PM (Mon - Fri)',
    mode: 'OFFLINE',
    teacherName: 'Tech Lead SP Solutions',
    totalSeats: 20,
    enrolledCount: 0,
    startDate: '2026-10-05',
    status: 'ACTIVE',
  },
  {
    id: 'batch-global-vocal',
    name: 'Global Live Online Bollywood Vocal Batch',
    courseId: 'course-sing-1',
    timeSlot: '07:00 PM - 08:30 PM (Tue, Thu, Sat)',
    mode: 'ONLINE',
    teacherName: 'Santy Manikpuri (Vocal Coach)',
    totalSeats: 30,
    enrolledCount: 0,
    startDate: '2026-10-02',
    status: 'ACTIVE',
  }
];

export const initialSettings: WebsiteSettings = {
  instituteName: 'SP SOLUTIONS',
  tagline: 'English • Computer • Hindi Bollywood Vocal Learning Centre',
  taglineHi: 'अंग्रेजी • कंप्यूटर • हिंदी बॉलीवुड वोकल लर्निंग सेंटर',
  addressLine: 'Village Baloda, Hasuwa, Near Mobile Tower, House No. 359, Kotar/Kotwar Muhalla',
  landmark: 'Near Mobile Tower',
  village: 'Baloda',
  state: 'Chhattisgarh',
  country: 'India',
  houseNo: 'House No. 359',
  pincode: '495559',
  phone: '9279120271',
  phoneUrl: 'tel:+919279120271',
  email: 'santoshprasad8891@gmail.com',
  emailUrl: 'mailto:santoshprasad8891@gmail.com',
  whatsappNumber: '9279120271',
  whatsappUrl: 'https://wa.me/919279120271',
  instagramUsername: 'santymanikpuri',
  instagramUrl: 'https://www.instagram.com/santymanikpuri',
  youtubeChannel: 'makemestar',
  youtubeUrl: 'https://www.youtube.com/@makemestar',
  facebookUrl: 'https://www.facebook.com/santymanikpuri',
  linkedinUrl: 'https://www.linkedin.com/in/santymanikpuri',
  googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Village+Baloda+Hasuwa+House+359+Chhattisgarh',
  justdialUrl: 'https://www.justdial.com/Baloda-Bazar/SP-Solutions-English-Computer-Singing-Classes-Near-Mobile-Tower-Baloda/07727P7727-7727-261004120000-A1B2_BZDET',
  googleSearchUrl: 'https://www.google.com/search?q=SP+Solutions+Village+Baloda+Hasuwa+House+359+English+Computer+Singing+Chhattisgarh',
  officialGbpStatus: 'CONFIGURED_PENDING_CLAIM',
  gbpVerificationNotes:
    'SP SOLUTIONS address is configured with Schema.org LocalBusiness metadata. When official Google Business Profile is verified by postal postcard / video in Baloda, insert the Google Place ID or Business CID URL in this field.',
  popupEnabled: true,
  popupFrequency: 'ONCE_PER_SESSION',
  defaultCampaign: 'Admissions 2026-27',
  paymentGatewayProvider: 'UPI',
  razorpayKeyIdPlaceholder: 'rzp_test_placeholder_key',
  razorpaySecretConfigured: false,
  aiTutorEnabled: true,
  englishAiEnabled: true,
  computerAiEnabled: true,
  singingAiEnabled: true,
};
