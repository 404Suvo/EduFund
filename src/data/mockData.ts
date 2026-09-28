import { ON_CHAIN_TRANSACTIONS } from './onChainData';

export interface ScholarshipProgram {
  id: string;
  name: string;
  sponsor: string;
  sponsorType: 'Corporate CSR' | 'Government' | 'NGO' | 'Merit' | 'Need-Based' | 'Women in STEM';
  sponsorLogo: string;
  description: string;
  totalPool: number;
  disbursedAmount: number;
  studentsFunded: number;
  tokenPerStudent: number;
  tokenSymbol: string;
  allowedCategories: string[];
  status: 'Active' | 'Closing Soon' | 'Completed';
  deadline: string;
  eligibility: string[];
  collegesCovered: string[];
  howFundsAreUsed: string;
  contractAddress: string;
}

export interface Merchant {
  id: string;
  name: string;
  category: 'Books & Stationery' | 'Tuition & Coaching' | 'Hostels' | 'Fee Portals' | 'Tech & Labs' | 'Online Courses';
  city: string;
  address: string;
  verified: boolean;
  rating: number;
  totalReceived: number;
  txCount: number;
  acceptedPrograms: string[];
  contractId: string;
  description: string;
  phone: string;
}

export interface Transaction {
  id: string;
  hash: string;
  fromName: string;
  fromAddress: string;
  toName: string;
  toAddress: string;
  amount: number;
  category: string;
  status: 'Verified On-Chain' | 'Settled' | 'Blocked Non-Education Tx';
  timestamp: string;
  blockNumber: number;
  programId: string;
  purpose: string;
  merchantType?: string;
  blockReason?: string;
}

export interface Donor {
  id: string;
  name: string;
  type: string;
  logo: string;
  totalContributed: number;
  studentsSponsored: number;
  activeProgramsCount: number;
  verifiedSpendRate: number; // percentage
  storyHeadline: string;
  storyDescription: string;
  featuredQuote: string;
  byCollege: { college: string; amount: number }[];
  byCategory: { category: string; amount: number }[];
  monthlyDisbursements: { month: string; amount: number }[];
}

export interface StudentProfile {
  id: string;
  anonymizedId: string;
  name: string;
  college: string;
  city: string;
  degree: string;
  gpa: string;
  programName: string;
  programId: string;
  walletAddress: string;
  totalGrant: number;
  spentAmount: number;
  remainingTokens: number;
  buckets: {
    category: string;
    allocated: number;
    spent: number;
    remaining: number;
    note: string;
  }[];
  stepperStage: 1 | 2 | 3 | 4; // 1: Applied, 2: Verified, 3: Tokens Issued, 4: Spending
  statusLabel: string;
  recentTxCount: number;
}

// -------------------------------------------------------------
// 12 Realistic Scholarship Programs
// -------------------------------------------------------------
export const MOCK_PROGRAMS: ScholarshipProgram[] = [
  {
    id: 'prog-01',
    name: 'Acme NextGen Engineering 500',
    sponsor: 'Acme Technologies CSR',
    sponsorType: 'Corporate CSR',
    sponsorLogo: '⚙️',
    description: 'Flagship corporate sponsorship funding 500 deserving undergraduate engineering scholars with 100% on-chain proof of lab and tuition expenditure.',
    totalPool: 10000000, // ₹10,00,000 (10 Lakhs)
    disbursedAmount: 7600000,
    studentsFunded: 380,
    tokenPerStudent: 20000,
    tokenSymbol: 'EDUTOKEN-ENG',
    allowedCategories: ['Tech & Labs', 'Books & Stationery', 'Fee Portals', 'Tuition & Coaching'],
    status: 'Active',
    deadline: '2026-11-15',
    eligibility: [
      'B.Tech / B.E. 2nd or 3rd year engineering students',
      'Annual family income under ₹6,00,000',
      'Minimum CGPA 7.5 or 75% aggregate',
      'Enrolled in AICTE / UGC accredited engineering institutes',
    ],
    collegesCovered: ['COEP Pune', 'IIT Bombay', 'NIT Trichy', 'VJTI Mumbai', 'BITS Pilani'],
    howFundsAreUsed: 'Tokens are locked for engineering hardware kits, textbooks, licensed software subscriptions, and certified semester fee gateways.',
    contractAddress: '0x8849a21efc02931a28cb0912f9b2a75d9b1a0301',
  },
  {
    id: 'prog-02',
    name: 'Tata Scholars STEM Advancement',
    sponsor: 'Tata Trust Foundations',
    sponsorType: 'Corporate CSR',
    sponsorLogo: '🏛️',
    description: 'Empowering first-generation learners pursuing fundamental sciences and advanced computing across premier technological institutions.',
    totalPool: 25000000, // ₹2,50,00,000 (2.5 Cr)
    disbursedAmount: 18450000,
    studentsFunded: 920,
    tokenPerStudent: 25000,
    tokenSymbol: 'TATA-STEM',
    allowedCategories: ['Tech & Labs', 'Tuition & Coaching', 'Books & Stationery', 'Hostels'],
    status: 'Active',
    deadline: '2026-12-01',
    eligibility: [
      'Undergraduate or Postgraduate STEM majors',
      'Annual household income below ₹5,00,000',
      'Proof of merit in national entrance exams (JEE / GATE / CUET)',
    ],
    collegesCovered: ['IIT Madras', 'IIT Delhi', 'IISc Bengaluru', 'NIT Surathkal'],
    howFundsAreUsed: 'Allotted via smart-contract vouchers valid strictly at approved college hostels, scientific equipment labs, and technical publishers.',
    contractAddress: '0x127dfbc91024aa88231efb3992b87445c088319a',
  },
  {
    id: 'prog-03',
    name: 'Savitribai Phule Women in Tech Grant',
    sponsor: 'Azim Premji Philanthropic',
    sponsorType: 'Women in STEM',
    sponsorLogo: '🌸',
    description: 'Dedicated financial grant program designed to bridge the gender gap in computer science, robotics, and electrical engineering.',
    totalPool: 12000000, // ₹1.2 Cr
    disbursedAmount: 9800000,
    studentsFunded: 320,
    tokenPerStudent: 30000,
    tokenSymbol: 'PHULE-TECH',
    allowedCategories: ['Tech & Labs', 'Books & Stationery', 'Online Courses', 'Hostels'],
    status: 'Active',
    deadline: '2026-10-30',
    eligibility: [
      'Female students pursuing B.Tech / BCA / MCA / M.Tech in CS/IT/Electronics',
      'Demonstrated academic excellence or tech community leadership',
      'Open to state and central university scholars',
    ],
    collegesCovered: ['Indira Gandhi DTUW Delhi', 'SNDT Mumbai', 'COEP Pune', 'Anna University'],
    howFundsAreUsed: 'Used for specialized cloud computing credits, AI/ML hardware, coding bootcamps, and accommodation in verified campus hostels.',
    contractAddress: '0x9924ba90efca110992388147d0e192ffb384ca02',
  },
  {
    id: 'prog-04',
    name: 'National Post-Matric Merit Aid',
    sponsor: 'Ministry of Higher Education',
    sponsorType: 'Government',
    sponsorLogo: '🇮🇳',
    description: 'Central government direct benefit scholarship guaranteeing zero leakages and transparent tracking for backward classes and economically weak sections.',
    totalPool: 50000000, // ₹5 Cr
    disbursedAmount: 40375640,
    studentsFunded: 2450,
    tokenPerStudent: 18000,
    tokenSymbol: 'GOV-AID-IN',
    allowedCategories: ['Fee Portals', 'Books & Stationery', 'Hostels'],
    status: 'Active',
    deadline: '2026-12-31',
    eligibility: [
      'Domicile of India enrolled in recognized post-matric degree',
      'Annual parental income below ₹2,50,000',
      'Aadhaar KYC verified and university enrollment number confirmed',
    ],
    collegesCovered: ['Delhi University', 'Mumbai University', 'Jadavpur University', 'Osmania University'],
    howFundsAreUsed: 'Automated direct smart-voucher disbursement directly to certified state university fees collection portals.',
    contractAddress: '0x33bca01289fe2034918237492cfa712953ba0190',
  },
  {
    id: 'prog-05',
    name: 'Infosys Foundation DeepTech Fellowship',
    sponsor: 'Infosys Foundation',
    sponsorType: 'Corporate CSR',
    sponsorLogo: '💡',
    description: 'High-impact funding for postgraduate research fellows working on artificial intelligence, cybersecurity, and green tech breakthroughs.',
    totalPool: 15000000, // ₹1.5 Cr
    disbursedAmount: 11200000,
    studentsFunded: 180,
    tokenPerStudent: 60000,
    tokenSymbol: 'INFY-RESEARCH',
    allowedCategories: ['Tech & Labs', 'Online Courses', 'Books & Stationery'],
    status: 'Active',
    deadline: '2026-11-20',
    eligibility: [
      'Enrolled in M.Tech or PhD research in AI, Quantum, or Robotics',
      'Approved thesis supervisor endorsement letter',
    ],
    collegesCovered: ['IIT Roorkee', 'IIT Kanpur', 'IIIT Hyderabad', 'IIT Bombay'],
    howFundsAreUsed: 'Hardware equipment, high-performance GPU cluster compute tokens, and international journal publication costs.',
    contractAddress: '0x448100ca98132910fedb019842aa19273919e830',
  },
  {
    id: 'prog-06',
    name: 'Dr. APJ Abdul Kalam Aerospace Bursary',
    sponsor: 'ISRO-Alumni Educational Trust',
    sponsorType: 'Merit',
    sponsorLogo: '🚀',
    description: 'National merit bursary honoring academic pioneers in aerospace, mechanical, and satellite communications engineering.',
    totalPool: 8000000,
    disbursedAmount: 7200000,
    studentsFunded: 160,
    tokenPerStudent: 45000,
    tokenSymbol: 'KALAM-AERO',
    allowedCategories: ['Tech & Labs', 'Books & Stationery', 'Tuition & Coaching'],
    status: 'Closing Soon',
    deadline: '2026-10-10',
    eligibility: [
      'Top 2% rank in state / national technical entrance exams',
      'Aerospace, Avionics or Mechanical engineering majors',
    ],
    collegesCovered: ['IIST Thiruvananthapuram', 'IIT Madras', 'MIT Manipal'],
    howFundsAreUsed: 'Aerospace simulation tools, CAD software licences, and specialized aerodynamic wind tunnel workshops.',
    contractAddress: '0x77bca22199049182390146e29a99ef01a18204b1',
  },
  {
    id: 'prog-07',
    name: 'Azim Premji Rural Scholars Fund',
    sponsor: 'Azim Premji Philanthropic',
    sponsorType: 'Need-Based',
    sponsorLogo: '🌱',
    description: 'Targeted support for students from aspirational districts and agrarian families migrating to metropolitan cities for higher education.',
    totalPool: 18000000,
    disbursedAmount: 13500000,
    studentsFunded: 675,
    tokenPerStudent: 20000,
    tokenSymbol: 'AP-RURAL',
    allowedCategories: ['Hostels', 'Books & Stationery', 'Fee Portals', 'Tuition & Coaching'],
    status: 'Active',
    deadline: '2026-12-15',
    eligibility: [
      'Students from notified tier-3/tier-4 aspirational districts',
      'Annual household income under ₹3,00,000',
    ],
    collegesCovered: ['Pune University', 'Banaras Hindu University', 'Calcutta University', 'Lucknow University'],
    howFundsAreUsed: 'Safe hostel accommodation vouchers, meal plans at verified mess facilities, and primary academic syllabus books.',
    contractAddress: '0x55bc1188390192309182bbac1929384501a39811',
  },
  {
    id: 'prog-08',
    name: 'Reliance Jio AI & Future Skills Grant',
    sponsor: 'Reliance Foundation',
    sponsorType: 'Corporate CSR',
    sponsorLogo: '🌐',
    description: 'Enabling tier-2 and tier-3 college coders to access high-end compute equipment, laptops, and world-class certification courses.',
    totalPool: 22000000,
    disbursedAmount: 17600000,
    studentsFunded: 440,
    tokenPerStudent: 40000,
    tokenSymbol: 'JIO-SKILLS',
    allowedCategories: ['Tech & Labs', 'Online Courses', 'Books & Stationery'],
    status: 'Active',
    deadline: '2026-11-28',
    eligibility: [
      'Full-time undergraduate engineering or BCA/MCA students',
      'Active GitHub profile or proven hackathon project submission',
    ],
    collegesCovered: ['NIT Warangal', 'PSG Tech Coimbatore', 'Walchand Sangli', 'Thapar Patiala'],
    howFundsAreUsed: 'Redeemable directly at Croma, Reliance Digital, and authorized laptop sellers for developer laptops and peripherals.',
    contractAddress: '0x22899014199abcf0192389146ea0012938f9021a',
  },
  {
    id: 'prog-09',
    name: 'Mahindra All-India Polytechnic Aid',
    sponsor: 'Mahindra CSR Foundation',
    sponsorType: 'Need-Based',
    sponsorLogo: '🚜',
    description: 'Empowering diploma and polytechnic apprentices with hands-on technical equipment, workshop tools, and safety gear.',
    totalPool: 7500000,
    disbursedAmount: 6800000,
    studentsFunded: 450,
    tokenPerStudent: 15000,
    tokenSymbol: 'MAHINDRA-DIP',
    allowedCategories: ['Tech & Labs', 'Books & Stationery', 'Fee Portals'],
    status: 'Closing Soon',
    deadline: '2026-10-18',
    eligibility: [
      'Students enrolled in 3-year state board technical diploma courses',
      'Family income less than ₹3,50,000 per annum',
    ],
    collegesCovered: ['Government Polytechnic Mumbai', 'Government Polytechnic Pune', 'Central Polytechnic Chennai'],
    howFundsAreUsed: 'Workshop measuring tools, drawing instruments, safety gear, and official state board semester fees.',
    contractAddress: '0x6641908239019238491823901928491283948123',
  },
  {
    id: 'prog-10',
    name: 'L&T Build India Fellowship',
    sponsor: 'Larsen & Toubro Ltd',
    sponsorType: 'Merit',
    sponsorLogo: '🏗️',
    description: 'Full sponsorship for young civil, structural, and mechanical engineers building the foundational infrastructure of tomorrow.',
    totalPool: 14000000,
    disbursedAmount: 11200000,
    studentsFunded: 280,
    tokenPerStudent: 40000,
    tokenSymbol: 'LT-BUILD',
    allowedCategories: ['Tech & Labs', 'Tuition & Coaching', 'Books & Stationery'],
    status: 'Active',
    deadline: '2026-11-30',
    eligibility: [
      'Final year Civil or Mechanical engineering degree students',
      'Minimum aggregate score of 70% in all semesters',
    ],
    collegesCovered: ['IIT Kharagpur', 'NIT Rourkela', 'VNIT Nagpur', 'Jadavpur University'],
    howFundsAreUsed: 'Surveying instrument training, BIM/Revit software certification, and geotechnical lab materials.',
    contractAddress: '0x991024bb88123901923849182390192849128394',
  },
  {
    id: 'prog-11',
    name: 'HDFC Badhte Kadam Higher Studies',
    sponsor: 'HDFC Parivartan',
    sponsorType: 'Corporate CSR',
    sponsorLogo: '💳',
    description: 'Socio-economic disaster mitigation fellowship supporting students whose families suffered severe financial crises.',
    totalPool: 16000000,
    disbursedAmount: 14400000,
    studentsFunded: 480,
    tokenPerStudent: 30000,
    tokenSymbol: 'HDFC-STEP',
    allowedCategories: ['Fee Portals', 'Hostels', 'Books & Stationery'],
    status: 'Active',
    deadline: '2026-12-10',
    eligibility: [
      'Students facing single-earner bereavement or critical medical distress',
      'Good academic standing with continuous enrollment',
    ],
    collegesCovered: ['Delhi University', 'Fergusson College Pune', 'St. Xavier Mumbai', 'Loyola Chennai'],
    howFundsAreUsed: 'Direct payment to university fee accounts and verified college hostel messes to prevent dropouts.',
    contractAddress: '0x1188290192839182938491829384918293849182',
  },
  {
    id: 'prog-12',
    name: 'Birla Excellence Book & Lab Fund',
    sponsor: 'Aditya Birla Education Trust',
    sponsorType: 'NGO',
    sponsorLogo: '📚',
    description: 'Providing guaranteed access to original technical reference literature, research journals, and laboratory consumables.',
    totalPool: 9000000,
    disbursedAmount: 8100000,
    studentsFunded: 540,
    tokenPerStudent: 15000,
    tokenSymbol: 'BIRLA-LAB',
    allowedCategories: ['Books & Stationery', 'Tech & Labs'],
    status: 'Active',
    deadline: '2026-11-05',
    eligibility: [
      'Undergraduate science and pharmacy students across India',
      'Merit cum means ranking from college administration',
    ],
    collegesCovered: ['BITS Pilani Goa', 'ICT Mumbai', 'NIPER Mohali', 'Madras Christian College'],
    howFundsAreUsed: 'Chemical reagents, lab safety kits, reference medical/technical volumes from registered bookstore partners.',
    contractAddress: '0x8829102938491829384918293849182938491829',
  },
];

// -------------------------------------------------------------
// 20 Verified Merchants across Indian Cities
// -------------------------------------------------------------
export const MOCK_MERCHANTS: Merchant[] = [
  {
    id: 'merch-01',
    name: 'BookNest Academic Publishers',
    category: 'Books & Stationery',
    city: 'Pune',
    address: 'FC Road, Deccan Gymkhana, Pune 411004',
    verified: true,
    rating: 4.9,
    totalReceived: 3845000,
    txCount: 820,
    acceptedPrograms: ['Acme NextGen Engineering 500', 'Tata Scholars STEM Advancement', 'Azim Premji Rural Scholars Fund'],
    contractId: '0xmerch_booknest_pune',
    description: 'Official university bookstore for engineering, medical, and polytechnic texts with verified POS point integration.',
    phone: '+91 20 2567 8901',
  },
  {
    id: 'merch-02',
    name: 'Silicon Hub Tech & Lab Equipment',
    category: 'Tech & Labs',
    city: 'Bengaluru',
    address: 'SP Road, Electronics City, Bengaluru 560002',
    verified: true,
    rating: 4.8,
    totalReceived: 7420000,
    txCount: 460,
    acceptedPrograms: ['Acme NextGen Engineering 500', 'Reliance Jio AI & Future Skills Grant', 'Infosys Foundation DeepTech Fellowship'],
    contractId: '0xmerch_siliconhub_blr',
    description: 'Microcontroller kits, Arduino/Raspberry Pi components, developer laptops, and VLSI breadboards.',
    phone: '+91 80 4123 4567',
  },
  {
    id: 'merch-03',
    name: 'Scholars Haven Hostels',
    category: 'Hostels',
    city: 'Pune',
    address: 'Near COEP North Campus, Shivajinagar, Pune 411005',
    verified: true,
    rating: 4.7,
    totalReceived: 5120000,
    txCount: 290,
    acceptedPrograms: ['Acme NextGen Engineering 500', 'Azim Premji Rural Scholars Fund', 'HDFC Badhte Kadam Higher Studies'],
    contractId: '0xmerch_scholarshaven_pune',
    description: 'Accredited student housing with high-speed fiber internet, study library, and hygienic dining facility.',
    phone: '+91 20 2553 1122',
  },
  {
    id: 'merch-04',
    name: 'COEP Autonomous Fee Collection Portal',
    category: 'Fee Portals',
    city: 'Pune',
    address: 'Wellesley Road, Shivajinagar, Pune 411005',
    verified: true,
    rating: 5.0,
    totalReceived: 12400000,
    txCount: 620,
    acceptedPrograms: ['Acme NextGen Engineering 500', 'National Post-Matric Merit Aid'],
    contractId: '0xmerch_coep_fees_pune',
    description: 'Direct smart-contract settlement for College of Engineering Pune semester tuition and lab fees.',
    phone: '+91 20 2550 7000',
  },
  {
    id: 'merch-05',
    name: 'Prime IIT Academy & Coding Lab',
    category: 'Tuition & Coaching',
    city: 'Hyderabad',
    address: 'Madhapur Main Road, Hitec City, Hyderabad 500081',
    verified: true,
    rating: 4.9,
    totalReceived: 4950000,
    txCount: 310,
    acceptedPrograms: ['Tata Scholars STEM Advancement', 'Dr. APJ Abdul Kalam Aerospace Bursary'],
    contractId: '0xmerch_primeiit_hyd',
    description: 'Advanced algorithms, competitive coding, GATE engineering preparation and system design seminars.',
    phone: '+91 40 2311 9876',
  },
  {
    id: 'merch-06',
    name: 'Kitab Khana Heritage Bookstore',
    category: 'Books & Stationery',
    city: 'Mumbai',
    address: 'Somaiya Bhavan, Fort, Mumbai 400001',
    verified: true,
    rating: 4.9,
    totalReceived: 2980000,
    txCount: 540,
    acceptedPrograms: ['Savitribai Phule Women in Tech Grant', 'Birla Excellence Book & Lab Fund'],
    contractId: '0xmerch_kitabkhana_bom',
    description: 'Extensive repository of research literature, peer-reviewed monographs, and academic textbooks.',
    phone: '+91 22 6170 2277',
  },
  {
    id: 'merch-07',
    name: 'NexGen Cloud & AI Learning Hub',
    category: 'Online Courses',
    city: 'Bengaluru',
    address: 'Indiranagar 100ft Road, Bengaluru 560038',
    verified: true,
    rating: 4.8,
    totalReceived: 4120000,
    txCount: 520,
    acceptedPrograms: ['Reliance Jio AI & Future Skills Grant', 'Infosys Foundation DeepTech Fellowship'],
    contractId: '0xmerch_nexgencloud_blr',
    description: 'Hands-on cloud architecture and machine learning cohort certifications with industry mentorship.',
    phone: '+91 80 4987 6543',
  },
  {
    id: 'merch-08',
    name: 'IIT Delhi Student Fee Counter',
    category: 'Fee Portals',
    city: 'Delhi',
    address: 'Hauz Khas, New Delhi 110016',
    verified: true,
    rating: 5.0,
    totalReceived: 18500000,
    txCount: 740,
    acceptedPrograms: ['Tata Scholars STEM Advancement', 'National Post-Matric Merit Aid'],
    contractId: '0xmerch_iitd_feecounter',
    description: 'On-chain authorized fee settlement node for Indian Institute of Technology Delhi semester dues.',
    phone: '+91 11 2659 7135',
  },
  {
    id: 'merch-09',
    name: 'Modern Science & Chemistry Lab Supplies',
    category: 'Tech & Labs',
    city: 'Kolkata',
    address: 'College Street, Bowbazar, Kolkata 700073',
    verified: true,
    rating: 4.6,
    totalReceived: 2850000,
    txCount: 390,
    acceptedPrograms: ['Birla Excellence Book & Lab Fund', 'National Post-Matric Merit Aid'],
    contractId: '0xmerch_modernscience_ccu',
    description: 'Calibrated laboratory glass apparatus, analytical reagents, and microscopes for scientific scholars.',
    phone: '+91 33 2241 8765',
  },
  {
    id: 'merch-10',
    name: 'Youth Residency Campus Hostels',
    category: 'Hostels',
    city: 'Delhi',
    address: 'North Campus, Vijay Nagar, Delhi 110009',
    verified: true,
    rating: 4.7,
    totalReceived: 6200000,
    txCount: 380,
    acceptedPrograms: ['Azim Premji Rural Scholars Fund', 'HDFC Badhte Kadam Higher Studies'],
    contractId: '0xmerch_youthresidency_del',
    description: 'Safe, verified student accommodation with round-the-clock security and biometrics in Delhi University zone.',
    phone: '+91 11 4321 0987',
  },
  {
    id: 'merch-11',
    name: 'Reliance Digital Education Tech Partner',
    category: 'Tech & Labs',
    city: 'Mumbai',
    address: 'Phoenix Palladium, Lower Parel, Mumbai 400013',
    verified: true,
    rating: 4.8,
    totalReceived: 9800000,
    txCount: 420,
    acceptedPrograms: ['Reliance Jio AI & Future Skills Grant', 'Acme NextGen Engineering 500'],
    contractId: '0xmerch_reliancedigital_mum',
    description: 'Official student laptop hardware partner offering special academic discount tokens and warranty.',
    phone: '+91 22 4004 5566',
  },
  {
    id: 'merch-12',
    name: 'Pragathi Technical Coaching Institute',
    category: 'Tuition & Coaching',
    city: 'Chennai',
    address: 'Anna Salai, Guindy, Chennai 600032',
    verified: true,
    rating: 4.7,
    totalReceived: 3100000,
    txCount: 210,
    acceptedPrograms: ['L&T Build India Fellowship', 'Tata Scholars STEM Advancement'],
    contractId: '0xmerch_pragathicoaching_maa',
    description: 'Specialized structural engineering modeling, AutoCAD, and civil engineering computational workshops.',
    phone: '+91 44 2235 4321',
  },
  {
    id: 'merch-13',
    name: 'Central Tech Stationery & Blueprints',
    category: 'Books & Stationery',
    city: 'Bengaluru',
    address: 'Malleshwaram 8th Cross, Bengaluru 560003',
    verified: true,
    rating: 4.6,
    totalReceived: 1850000,
    txCount: 490,
    acceptedPrograms: ['Acme NextGen Engineering 500', 'Tata Scholars STEM Advancement'],
    contractId: '0xmerch_centraltech_blr',
    description: 'Draughtsman equipment, engineering drafting sheets, graphing calculators, and reference manuals.',
    phone: '+91 80 2334 1122',
  },
  {
    id: 'merch-14',
    name: 'VJTI Mumbai Treasury & Fee Portal',
    category: 'Fee Portals',
    city: 'Mumbai',
    address: 'HR Mahajani Marg, Matunga, Mumbai 400019',
    verified: true,
    rating: 4.9,
    totalReceived: 8900000,
    txCount: 440,
    acceptedPrograms: ['Acme NextGen Engineering 500', 'Savitribai Phule Women in Tech Grant'],
    contractId: '0xmerch_vjti_fees_mum',
    description: 'Direct smart token settlement gateway for Veermata Jijabai Technological Institute.',
    phone: '+91 22 2419 8100',
  },
  {
    id: 'merch-15',
    name: 'EdTech Pro Cloud Learning Lab',
    category: 'Online Courses',
    city: 'Hyderabad',
    address: 'Gachibowli Financial District, Hyderabad 500032',
    verified: true,
    rating: 4.8,
    totalReceived: 2750000,
    txCount: 330,
    acceptedPrograms: ['Savitribai Phule Women in Tech Grant', 'Reliance Jio AI & Future Skills Grant'],
    contractId: '0xmerch_edtechpro_hyd',
    description: 'Full-stack web engineering, Rust, cryptography, and distributed systems live cohort platforms.',
    phone: '+91 40 4567 8900',
  },
  {
    id: 'merch-16',
    name: 'Kalam Aero Lab Solutions',
    category: 'Tech & Labs',
    city: 'Chennai',
    address: 'Velachery Bypass Road, Chennai 600042',
    verified: true,
    rating: 4.9,
    totalReceived: 3450000,
    txCount: 170,
    acceptedPrograms: ['Dr. APJ Abdul Kalam Aerospace Bursary'],
    contractId: '0xmerch_aerolab_maa',
    description: 'Avionics testing benches, drone prototyping components, and composite material fabrication.',
    phone: '+91 44 2876 5432',
  },
  {
    id: 'merch-17',
    name: 'Heritage Campus Hostel Society',
    category: 'Hostels',
    city: 'Kolkata',
    address: 'Jadavpur Central Road, Kolkata 700032',
    verified: true,
    rating: 4.6,
    totalReceived: 3900000,
    txCount: 260,
    acceptedPrograms: ['National Post-Matric Merit Aid', 'Azim Premji Rural Scholars Fund'],
    contractId: '0xmerch_heritagehostel_ccu',
    description: 'Subsidized verified boarding and lodging facility for undergraduate university students.',
    phone: '+91 33 2414 6677',
  },
  {
    id: 'merch-18',
    name: 'Sapna Book House Academic Superstore',
    category: 'Books & Stationery',
    city: 'Bengaluru',
    address: 'Gandhinagar, Majestic, Bengaluru 560009',
    verified: true,
    rating: 4.9,
    totalReceived: 6150000,
    txCount: 950,
    acceptedPrograms: ['Tata Scholars STEM Advancement', 'Acme NextGen Engineering 500', 'Reliance Jio AI & Future Skills Grant'],
    contractId: '0xmerch_sapnabooks_blr',
    description: 'One of South India’s largest academic book distributors with dedicated EduFund token POS terminals.',
    phone: '+91 80 4011 4455',
  },
  {
    id: 'merch-19',
    name: 'NIT Trichy Academic Dues Settlement',
    category: 'Fee Portals',
    city: 'Chennai',
    address: 'Tanjore Main Road, Thuvakudi, Tiruchirappalli 620015',
    verified: true,
    rating: 5.0,
    totalReceived: 11500000,
    txCount: 510,
    acceptedPrograms: ['Acme NextGen Engineering 500', 'Tata Scholars STEM Advancement'],
    contractId: '0xmerch_nitt_fees',
    description: 'Official institute on-chain treasury recipient for National Institute of Technology Trichy.',
    phone: '+91 431 2503 000',
  },
  {
    id: 'merch-20',
    name: 'Croma Electronics Academic Store',
    category: 'Tech & Labs',
    city: 'Pune',
    address: 'Aundh ITI Road, Pune 411007',
    verified: true,
    rating: 4.7,
    totalReceived: 5650000,
    txCount: 280,
    acceptedPrograms: ['Acme NextGen Engineering 500', 'Reliance Jio AI & Future Skills Grant'],
    contractId: '0xmerch_croma_pune',
    description: 'Authorized laptop hardware and tablet vendor supporting direct EduFund smart token redemption.',
    phone: '+91 20 6721 3400',
  },
];

// -------------------------------------------------------------
// -------------------------------------------------------------
// Live On-Chain Transactions Ledger (Midnight Preprod Network)
// -------------------------------------------------------------
export { ON_CHAIN_TRANSACTIONS } from './onChainData';
export const MOCK_TRANSACTIONS: Transaction[] = ON_CHAIN_TRANSACTIONS;

// 6 Corporate / Foundation Donors
// -------------------------------------------------------------
export const MOCK_DONORS: Donor[] = [
  {
    id: 'donor-01',
    name: 'Acme Technologies CSR',
    type: 'Corporate CSR Leader',
    logo: '🏢',
    totalContributed: 10000000, // ₹10,00,000 (10 Lakhs)
    studentsSponsored: 500,
    activeProgramsCount: 1,
    verifiedSpendRate: 98.4,
    storyHeadline: 'Sponsoring 500 engineering students with ₹10,00,000',
    storyDescription: 'Acme Corp deployed ₹10,00,000 to sponsor 500 engineering students across Maharashtra and Karnataka, tracking every rupee in real time from university admission gates to textbook stores.',
    featuredQuote: 'With EduFund, our corporate audit team verified that 100% of our ₹10,00,000 went straight into labs, books, and tuition with zero bureaucratic leaks.',
    byCollege: [
      { college: 'COEP Pune', amount: 3200000 },
      { college: 'VJTI Mumbai', amount: 2800000 },
      { college: 'NIT Trichy', amount: 2400000 },
      { college: 'IIT Bombay', amount: 1600000 },
    ],
    byCategory: [
      { category: 'Fee Portals', amount: 4200000 },
      { category: 'Tech & Labs', amount: 2800000 },
      { category: 'Books & Stationery', amount: 1800000 },
      { category: 'Hostels', amount: 1200000 },
    ],
    monthlyDisbursements: [
      { month: 'May 2026', amount: 1200000 },
      { month: 'Jun 2026', amount: 2100000 },
      { month: 'Jul 2026', amount: 3400000 },
      { month: 'Aug 2026', amount: 1900000 },
      { month: 'Sep 2026', amount: 1400000 },
    ],
  },
  {
    id: 'donor-02',
    name: 'Tata Trust Foundations',
    type: 'Philanthropic Trust',
    logo: '🏛️',
    totalContributed: 25000000,
    studentsSponsored: 920,
    activeProgramsCount: 2,
    verifiedSpendRate: 99.2,
    storyHeadline: 'Catalyzing 920 STEM Scholars across Premier IITs & NITs',
    storyDescription: 'Empowering underprivileged youth in fundamental science and deep engineering through algorithmic zero-knowledge scholarship vouchers.',
    featuredQuote: 'EduFund solves the generational trust problem of philanthropic grants. On-chain verification proves our impact to every stakeholder.',
    byCollege: [
      { college: 'IIT Delhi', amount: 8500000 },
      { college: 'IIT Madras', amount: 7200000 },
      { college: 'IISc Bengaluru', amount: 5100000 },
      { college: 'NIT Surathkal', amount: 4200000 },
    ],
    byCategory: [
      { category: 'Fee Portals', amount: 11000000 },
      { category: 'Tech & Labs', amount: 6500000 },
      { category: 'Books & Stationery', amount: 4500000 },
      { category: 'Hostels', amount: 3000000 },
    ],
    monthlyDisbursements: [
      { month: 'May 2026', amount: 3200000 },
      { month: 'Jun 2026', amount: 4500000 },
      { month: 'Jul 2026', amount: 8200000 },
      { month: 'Aug 2026', amount: 5100000 },
      { month: 'Sep 2026', amount: 4000000 },
    ],
  },
  {
    id: 'donor-03',
    name: 'Azim Premji Philanthropic',
    type: 'Education Foundation',
    logo: '🌱',
    totalContributed: 30000000,
    studentsSponsored: 995,
    activeProgramsCount: 2,
    verifiedSpendRate: 98.9,
    storyHeadline: 'Direct Higher Education Grants for Aspirational Rural Districts',
    storyDescription: 'Reaching students where conventional banking infrastructure falters, converting donor capital into cryptographic guarantees.',
    featuredQuote: 'The transparency of purpose-locked tokens ensures our philanthropic capital reaches the actual classroom, not administrative overhead.',
    byCollege: [
      { college: 'Pune University', amount: 9200000 },
      { college: 'Banaras Hindu University', amount: 8100000 },
      { college: 'Calcutta University', amount: 6800000 },
      { college: 'Osmania University', amount: 5900000 },
    ],
    byCategory: [
      { category: 'Hostels', amount: 12000000 },
      { category: 'Books & Stationery', amount: 9000000 },
      { category: 'Fee Portals', amount: 5500000 },
      { category: 'Tuition & Coaching', amount: 3500000 },
    ],
    monthlyDisbursements: [
      { month: 'May 2026', amount: 4100000 },
      { month: 'Jun 2026', amount: 6200000 },
      { month: 'Jul 2026', amount: 9800000 },
      { month: 'Aug 2026', amount: 5900000 },
      { month: 'Sep 2026', amount: 4000000 },
    ],
  },
  {
    id: 'donor-04',
    name: 'Ministry of Higher Education',
    type: 'Government Directorate',
    logo: '🇮🇳',
    totalContributed: 50000000,
    studentsSponsored: 2450,
    activeProgramsCount: 1,
    verifiedSpendRate: 99.8,
    storyHeadline: 'Direct Citizen Benefit Guaranteed with Zero Leakage',
    storyDescription: 'Transforming post-matric scholarship disbursement by eliminating intermediary bureaucratic friction and paperwork delays.',
    featuredQuote: 'Smart contract rules allow the state government to disburse public scholarships in seconds while maintaining strict public auditability.',
    byCollege: [
      { college: 'Delhi University', amount: 18000000 },
      { college: 'Mumbai University', amount: 15000000 },
      { college: 'Jadavpur University', amount: 9500000 },
      { college: 'Osmania University', amount: 7500000 },
    ],
    byCategory: [
      { category: 'Fee Portals', amount: 29000000 },
      { category: 'Hostels', amount: 12000000 },
      { category: 'Books & Stationery', amount: 9000000 },
    ],
    monthlyDisbursements: [
      { month: 'May 2026', amount: 7500000 },
      { month: 'Jun 2026', amount: 11000000 },
      { month: 'Jul 2026', amount: 16500000 },
      { month: 'Aug 2026', amount: 9000000 },
      { month: 'Sep 2026', amount: 6000000 },
    ],
  },
  {
    id: 'donor-05',
    name: 'Reliance Foundation',
    type: 'Corporate CSR',
    logo: '🌐',
    totalContributed: 22000000,
    studentsSponsored: 440,
    activeProgramsCount: 1,
    verifiedSpendRate: 97.6,
    storyHeadline: 'AI Hardware and Compute Infrastructure for Tomorrow’s Innovators',
    storyDescription: 'Providing modern developer workstations and high-speed research equipment to tier-2 engineering colleges.',
    featuredQuote: 'Every laptop and GPU workstation issued through our grant is cryptographically linked to a verified engineering scholar.',
    byCollege: [
      { college: 'NIT Warangal', amount: 7500000 },
      { college: 'PSG Tech Coimbatore', amount: 6200000 },
      { college: 'Walchand Sangli', amount: 4500000 },
      { college: 'Thapar Patiala', amount: 3800000 },
    ],
    byCategory: [
      { category: 'Tech & Labs', amount: 14500000 },
      { category: 'Online Courses', amount: 4800000 },
      { category: 'Books & Stationery', amount: 2700000 },
    ],
    monthlyDisbursements: [
      { month: 'May 2026', amount: 3000000 },
      { month: 'Jun 2026', amount: 5100000 },
      { month: 'Jul 2026', amount: 7200000 },
      { month: 'Aug 2026', amount: 4100000 },
      { month: 'Sep 2026', amount: 2600000 },
    ],
  },
  {
    id: 'donor-06',
    name: 'HDFC Parivartan',
    type: 'CSR Initiative',
    logo: '💳',
    totalContributed: 16000000,
    studentsSponsored: 480,
    activeProgramsCount: 1,
    verifiedSpendRate: 98.7,
    storyHeadline: 'Crisis Relief Education Support with Guaranteed Continuity',
    storyDescription: 'Ensuring students experiencing sudden family financial hardship never have their university education halted.',
    featuredQuote: 'Our audit turnaround dropped from 6 months of paper invoices to real-time verification on the EduFund blockchain ledger.',
    byCollege: [
      { college: 'Delhi University', amount: 5500000 },
      { college: 'Fergusson College Pune', amount: 4400000 },
      { college: 'St. Xavier Mumbai', amount: 3500000 },
      { college: 'Loyola Chennai', amount: 2600000 },
    ],
    byCategory: [
      { category: 'Fee Portals', amount: 7800000 },
      { category: 'Hostels', amount: 5200000 },
      { category: 'Books & Stationery', amount: 3000000 },
    ],
    monthlyDisbursements: [
      { month: 'May 2026', amount: 2400000 },
      { month: 'Jun 2026', amount: 3800000 },
      { month: 'Jul 2026', amount: 5100000 },
      { month: 'Aug 2026', amount: 2900000 },
      { month: 'Sep 2026', amount: 1800000 },
    ],
  },
];

// -------------------------------------------------------------
// 8 Real Student Profiles with Purpose-Specific Token Buckets
// -------------------------------------------------------------
export const MOCK_STUDENTS: StudentProfile[] = [
  {
    id: 'stu-01',
    anonymizedId: 'STU-9402',
    name: 'Aarav Sharma',
    college: 'COEP Technological University, Pune',
    city: 'Pune',
    degree: 'B.Tech Mechanical Engineering, Year 3',
    gpa: '8.82 CGPA',
    programName: 'Acme NextGen Engineering 500',
    programId: 'prog-01',
    walletAddress: '0x9402abf12c8901235b89a01f543dc8e7192ba01',
    totalGrant: 48000,
    spentAmount: 36000,
    remainingTokens: 12000,
    buckets: [
      {
        category: 'Tuition & College Fees',
        allocated: 20000,
        spent: 20000,
        remaining: 0,
        note: 'Direct settlement to COEP fee gateway completed',
      },
      {
        category: 'Books & Academic Stationery',
        allocated: 10000,
        spent: 8200,
        remaining: 1800,
        note: 'Redeemable only at verified campus bookstores (BookNest, Sapna)',
      },
      {
        category: 'Tech & Laboratory Kits',
        allocated: 12000,
        spent: 7800,
        remaining: 4200,
        note: 'Restricted to AICTE/college accredited hardware partners',
      },
      {
        category: 'Campus Accommodation & Mess',
        allocated: 6000,
        spent: 0,
        remaining: 6000,
        note: 'Available for university approved student housing only',
      },
    ],
    stepperStage: 4,
    statusLabel: 'Active Spending',
    recentTxCount: 5,
  },
  {
    id: 'stu-02',
    anonymizedId: 'STU-1182',
    name: 'Pooja Patel',
    college: 'Indian Institute of Technology, Bombay',
    city: 'Mumbai',
    degree: 'B.Tech Computer Science, Year 2',
    gpa: '9.45 CGPA',
    programName: 'Tata Scholars STEM Advancement',
    programId: 'prog-02',
    walletAddress: '0x1182bc91024aa88231efb3992b87445c088319a',
    totalGrant: 50000,
    spentAmount: 34400,
    remainingTokens: 15600,
    buckets: [
      {
        category: 'Tech & Laboratory Kits',
        allocated: 25000,
        spent: 23200,
        remaining: 1800,
        note: 'High-performance FPGA and embedded sensor development boards',
      },
      {
        category: 'Books & Reference Literature',
        allocated: 12000,
        spent: 7200,
        remaining: 4800,
        note: 'Core algorithms and machine learning reference library texts',
      },
      {
        category: 'Tuition & Specialized Bootcamps',
        allocated: 13000,
        spent: 4000,
        remaining: 9000,
        note: 'Parallel computing and CUDA engineering workshops',
      },
    ],
    stepperStage: 4,
    statusLabel: 'Active Spending',
    recentTxCount: 4,
  },
  {
    id: 'stu-03',
    anonymizedId: 'STU-3829',
    name: 'Sneha Banerjee',
    college: 'Indira Gandhi DTUW, Delhi',
    city: 'Delhi',
    degree: 'B.Tech Information Technology, Year 3',
    gpa: '9.10 CGPA',
    programName: 'Savitribai Phule Women in Tech Grant',
    programId: 'prog-03',
    walletAddress: '0x3829ca110992388147d0e192ffb384ca021948',
    totalGrant: 45000,
    spentAmount: 27300,
    remainingTokens: 17700,
    buckets: [
      {
        category: 'Online Certifications & Courses',
        allocated: 20000,
        spent: 17000,
        remaining: 3000,
        note: 'Cloud systems and distributed systems micro-degrees',
      },
      {
        category: 'Books & Hardware Labs',
        allocated: 15000,
        spent: 10300,
        remaining: 4700,
        note: 'Hardware security tokens and operating systems texts',
      },
      {
        category: 'Hostel Accommodation',
        allocated: 10000,
        spent: 0,
        remaining: 10000,
        note: 'Campus verified residence fee pool',
      },
    ],
    stepperStage: 4,
    statusLabel: 'Active Spending',
    recentTxCount: 3,
  },
  {
    id: 'stu-04',
    anonymizedId: 'STU-4910',
    name: 'Rahul Deshmukh',
    college: 'Veermata Jijabai Technological Institute (VJTI)',
    city: 'Mumbai',
    degree: 'B.Tech Electrical Engineering, Year 3',
    gpa: '8.65 CGPA',
    programName: 'Acme NextGen Engineering 500',
    programId: 'prog-01',
    walletAddress: '0x4910efb3992b87445c088319a9924ba90efca11',
    totalGrant: 48000,
    spentAmount: 42500,
    remainingTokens: 5500,
    buckets: [
      {
        category: 'Fee Portals',
        allocated: 20000,
        spent: 20000,
        remaining: 0,
        note: 'VJTI semester fees verified',
      },
      {
        category: 'Tech & Labs',
        allocated: 18000,
        spent: 18000,
        remaining: 0,
        note: 'Power electronics testing rig and digital oscilloscope',
      },
      {
        category: 'Hostels',
        allocated: 10000,
        spent: 4500,
        remaining: 5500,
        note: 'Campus room reservation balance',
      },
    ],
    stepperStage: 4,
    statusLabel: 'Active Spending',
    recentTxCount: 4,
  },
  {
    id: 'stu-05',
    anonymizedId: 'STU-5521',
    name: 'Kavya Sundaram',
    college: 'Indian Institute of Technology, Madras',
    city: 'Chennai',
    degree: 'Dual Degree Aerospace Engineering, Year 4',
    gpa: '9.30 CGPA',
    programName: 'Dr. APJ Abdul Kalam Aerospace Bursary',
    programId: 'prog-06',
    walletAddress: '0x5521ff1289fe2034918237492cfa712953ba0190',
    totalGrant: 60000,
    spentAmount: 51500,
    remainingTokens: 8500,
    buckets: [
      {
        category: 'Tech & Labs',
        allocated: 35000,
        spent: 33500,
        remaining: 1500,
        note: 'Avionics prototyping components and telemetry hardware',
      },
      {
        category: 'Tuition & Coaching',
        allocated: 15000,
        spent: 14000,
        remaining: 1000,
        note: 'Aerospace structural analysis and flight simulations',
      },
      {
        category: 'Books & Literature',
        allocated: 10000,
        spent: 4000,
        remaining: 6000,
        note: 'Compressible flow and propulsion reference manuals',
      },
    ],
    stepperStage: 4,
    statusLabel: 'Active Spending',
    recentTxCount: 4,
  },
  {
    id: 'stu-06',
    anonymizedId: 'STU-6743',
    name: 'Mohd. Zeeshan',
    college: 'Jadavpur University, Kolkata',
    city: 'Kolkata',
    degree: 'B.E. Civil Engineering, Year 2',
    gpa: '8.40 CGPA',
    programName: 'Azim Premji Rural Scholars Fund',
    programId: 'prog-07',
    walletAddress: '0x6743cc77aa19273919e830992388147d0e192ff',
    totalGrant: 35000,
    spentAmount: 26500,
    remainingTokens: 8500,
    buckets: [
      {
        category: 'Hostels',
        allocated: 20000,
        spent: 19500,
        remaining: 500,
        note: 'Jadavpur student hostel accommodation',
      },
      {
        category: 'Books & Stationery',
        allocated: 10000,
        spent: 7000,
        remaining: 3000,
        note: 'Structural engineering codes and solved papers',
      },
      {
        category: 'Tuition & Labs',
        allocated: 5000,
        spent: 0,
        remaining: 5000,
        note: 'Geotechnical testing workshops',
      },
    ],
    stepperStage: 4,
    statusLabel: 'Active Spending',
    recentTxCount: 3,
  },
  {
    id: 'stu-07',
    anonymizedId: 'STU-7811',
    name: 'Ananya Rao',
    college: 'National Institute of Technology, Warangal',
    city: 'Hyderabad',
    degree: 'B.Tech CSE with AI Specialization, Year 3',
    gpa: '9.22 CGPA',
    programName: 'Reliance Jio AI & Future Skills Grant',
    programId: 'prog-08',
    walletAddress: '0x7811aa90efca110992388147d0e192ffb384ca02',
    totalGrant: 55000,
    spentAmount: 49000,
    remainingTokens: 6000,
    buckets: [
      {
        category: 'Tech & Labs',
        allocated: 35000,
        spent: 35000,
        remaining: 0,
        note: 'NVIDIA GPU accelerated developer workstation kit',
      },
      {
        category: 'Tuition & Certifications',
        allocated: 15000,
        spent: 14000,
        remaining: 1000,
        note: 'Computer vision and deep reinforcement learning tracks',
      },
      {
        category: 'Books & Papers',
        allocated: 5000,
        spent: 0,
        remaining: 5000,
        note: 'NeurIPS & ICML research paper repositories',
      },
    ],
    stepperStage: 4,
    statusLabel: 'Active Spending',
    recentTxCount: 3,
  },
  {
    id: 'stu-08',
    anonymizedId: 'STU-8923',
    name: 'Vikram Meena',
    college: 'Delhi Technological University (DTU)',
    city: 'Delhi',
    degree: 'B.Tech Electronics & Comm., Year 1',
    gpa: '8.75 CGPA',
    programName: 'National Post-Matric Merit Aid',
    programId: 'prog-04',
    walletAddress: '0x892301daefb3992b87445c088319a9924ba90efc',
    totalGrant: 36000,
    spentAmount: 30900,
    remainingTokens: 5100,
    buckets: [
      {
        category: 'Fee Portals',
        allocated: 15000,
        spent: 15000,
        remaining: 0,
        note: 'DTU semester tuition fee gateway settled',
      },
      {
        category: 'Hostels',
        allocated: 14000,
        spent: 12000,
        remaining: 2000,
        note: 'Campus hostel room boarding allotment',
      },
      {
        category: 'Books & Stationery',
        allocated: 7000,
        spent: 3900,
        remaining: 3100,
        note: 'First-year foundational mathematics & engineering physics textbooks',
      },
    ],
    stepperStage: 3,
    statusLabel: 'Tokens Issued',
    recentTxCount: 3,
  },
];

// -------------------------------------------------------------
// Live Impact Stats Strip
// -------------------------------------------------------------
export const PLATFORM_STATS = {
  totalDistributed: 124500000, // ₹12,45,00,000 (12.45 Cr)
  studentsFunded: 14820,
  approvedMerchants: 438,
  verifiedTransactions: 68912,
  averagePayoutTime: '< 60 seconds',
  oldSystemPayoutTime: '45 days',
  fraudRate: '0.00%',
  universitiesOnboarded: 84,
};

// -------------------------------------------------------------
// Interactive 5 Steps: How It Works
// -------------------------------------------------------------
export const HOW_IT_WORKS_STEPS = [
  {
    step: 1,
    title: 'Donor Funds a Program',
    shortDesc: 'A corporate CSR or government entity deposits INR or crypto into a smart contract pool.',
    detail: 'The donor specifies the scholarship criteria (e.g., engineering students, tier-2 cities, minimum CGPA) and allowed expenditure categories (tuition, books, lab hardware). The money is locked in an immutable audit vault.',
    icon: 'ShieldCheck',
    color: '#1F2BFF',
  },
  {
    step: 2,
    title: 'EduFund Mints Scholarship Tokens',
    shortDesc: 'Smart contracts issue purpose-specific cryptographic vouchers bound by strict rules.',
    detail: 'Funds are minted as non-fungible educational vouchers pegged 1:1 to ₹ INR. Unlike bank cash or general UPI, these tokens carry embedded cryptographic constraints preventing redemption at unauthorized merchants.',
    icon: 'Coins',
    color: '#FFB000',
  },
  {
    step: 3,
    title: 'Students Verify & Receive Tokens',
    shortDesc: 'Students verify eligibility and receive tokens directly to their student wallet.',
    detail: 'Using decentralized identity and zero-knowledge verification, students prove their university enrollment and academic merit without exposing sensitive personal documents. Tokens arrive within 60 seconds of approval.',
    icon: 'GraduationCap',
    color: '#00F0B5',
  },
  {
    step: 4,
    title: 'Spend ONLY at Approved Merchants',
    shortDesc: 'Tokens are accepted exclusively at verified campus bookstores, labs, hostels, and tuition portals.',
    detail: 'Students tap or scan a QR code to pay. If a student attempts to spend at an unapproved merchant (cinemas, e-commerce clothes, restaurants), the smart contract immediately rejects the transaction. Funds stay locked to learning.',
    icon: 'Store',
    color: '#6FCFDD',
  },
  {
    step: 5,
    title: 'Everything is Publicly Auditable',
    shortDesc: 'Donors, regulators, and the public trace every single rupee from vault to receipt.',
    detail: 'Every settlement is published to the public on-chain explorer with merchant receipt hashes, timestamped blocks, and categorical tags. Real-time audit reports can be downloaded instantly by CSR committees.',
    icon: 'FileSpreadsheet',
    color: '#00A550',
  },
];

// -------------------------------------------------------------
// Trust & Security Highlights
// -------------------------------------------------------------
export const TRUST_FEATURES = [
  {
    title: 'Duplicate-Claim Prevention',
    description: 'Cryptographic nullifiers ensure a single student cannot claim multiple grants across different portals using duplicate IDs.',
    icon: 'Fingerprint',
  },
  {
    title: 'Merchant Whitelisting',
    description: 'Only accredited vendors (bookstores, colleges, labs) with verified physical and GSTIN credentials receive settlement rights.',
    icon: 'CheckCircle2',
  },
  {
    title: 'Smart-Contract Rules',
    description: 'Tokens are non-transferable between unauthorized peers. Value cannot be cashed out into general fiat currency.',
    icon: 'Cpu',
  },
  {
    title: 'On-Chain Receipts',
    description: 'Every textbook purchase and hostel fee produces an immutable proof hash visible to the corporate donor’s audit dashboard.',
    icon: 'FileCheck',
  },
];

// -------------------------------------------------------------
// FAQ Items
// -------------------------------------------------------------
export const FAQ_ITEMS = [
  {
    q: 'How does EduFund prevent scholarship money from being misspent on non-educational items?',
    a: 'EduFund does not disburse unrestricted cash or general UPI balance. Instead, it issues purpose-bound smart tokens that contain cryptographic logic rules. These tokens can ONLY execute a transfer to wallet addresses registered by approved education merchants (such as university fee gateways, verified technical bookstores, accredited campus hostels, and lab suppliers). Any attempt to spend at unauthorized retail outlets (like movie theatres, fashion sites, or dining apps) is instantly rejected at the blockchain protocol level.',
  },
  {
    q: 'Why can’t a student just transfer their scholarship tokens to a friend or withdraw to cash?',
    a: 'The underlying smart contract restricts peer-to-peer transfers. Students can only initiate transactions to accredited educational merchant smart contracts. Additionally, redemption into bank INR is only permitted for verified merchants after on-chain proof of invoice generation.',
  },
  {
    q: 'How does this benefit Corporate CSR donors and government bodies?',
    a: 'Traditional scholarship schemes take 45+ days to navigate government and college bureaucracy, suffer from paperwork loss, and leave donors with zero visibility into whether funds were actually spent on books or fees. With EduFund, CSR teams can view real-time on-chain dashboards, see exact beneficiary statistics, verify merchant category distributions, and generate 100% compliant statutory audit reports with a single click.',
  },
  {
    q: 'What is required for a local bookstore, hostel, or tuition centre to become an approved merchant?',
    a: 'Merchants submit their GSTIN, shop/establishment license, university proximity proof, and designated settlement bank account. Our automated accreditation system verifies merchant credentials within 24 hours, generates an on-chain merchant public key, and issues a verified QR terminal for instant student checkout.',
  },
  {
    q: 'How does the platform protect student privacy while maintaining donor transparency?',
    a: 'EduFund uses zero-knowledge pseudonymization. While the public ledger tracks the program name, token amount, verified merchant, and item category (e.g. ₹5,000 for semester textbooks at BookNest Pune), student identities are shielded via cryptographic pseudonyms (`STU-9402`), protecting vulnerable students from public exposure while giving donors complete financial auditability.',
  },
  {
    q: 'Do students or donors need technical cryptocurrency experience or real crypto wallets?',
    a: 'No. EduFund is designed with account abstraction. Students and donors can sign in with standard email, phone OTP, or campus single-sign-on (SSO). The blockchain infrastructure, token minting, and verification happen smoothly under the hood with zero gas fee friction for students.',
  },
];
