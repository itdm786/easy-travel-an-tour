export interface TourPackage {
  id: string;
  title: string;
  slug: string;
  category: "international" | "domestic" | "umrah" | "hajj" | "honeymoon" | "group" | "corporate";
  destination: string;
  duration: string;
  price: number;
  originalPrice?: number;
  image: string;
  featured: boolean;
  rating: number;
  reviews: number;
  description: string;
  highlights: string[];
  itinerary: { day: number; title: string; description: string }[];
  inclusions: string[];
  exclusions: string[];
}

export interface Destination {
  id: string;
  name: string;
  country: string;
  image: string;
  packages: number;
  description: string;
  rating: number;
}

export interface VisaService {
  id: string;
  country: string;
  flag: string;
  type: "Tourist" | "Business" | "Work" | "Student" | "Transit";
  processingTime: string;
  price: number;
  requirements: string[];
}

export interface Review {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  date: string;
  package: string;
  comment: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  date: string;
  category: string;
  tags: string[];
  readTime: string;
}

export const DESTINATIONS: Destination[] = [
  {
    id: "1",
    name: "Dubai",
    country: "United Arab Emirates",
    image: "https://images.pexels.com/photos/2404656/pexels-photo-2404656.jpeg",
    packages: 24,
    description:
      "Experience the glitz and glamour of the Middle East's most dynamic city, where ultramodern architecture meets rich Arabian heritage.",
    rating: 4.8,
  },
  {
    id: "2",
    name: "Istanbul",
    country: "Turkey",
    image: "https://images.pexels.com/photos/2044434/pexels-photo-2044434.jpeg",
    packages: 18,
    description:
      "Where East meets West — explore Ottoman palaces, vibrant bazaars, and breathtaking Bosphorus views in this transcontinental gem.",
    rating: 4.7,
  },
  {
    id: "3",
    name: "Bangkok",
    country: "Thailand",
    image: "https://images.pexels.com/photos/1822481/pexels-photo-1822481.jpeg",
    packages: 20,
    description:
      "Discover the Land of Smiles with ornate temples, floating markets, world-class street food, and tropical paradise islands.",
    rating: 4.6,
  },
  {
    id: "4",
    name: "Kuala Lumpur",
    country: "Malaysia",
    image: "https://images.pexels.com/photos/22804/pexels-photo.jpg",
    packages: 16,
    description:
      "A melting pot of cultures with iconic Petronas Towers, lush rainforests, pristine beaches, and incredible culinary diversity.",
    rating: 4.5,
  },
  {
    id: "5",
    name: "Baku",
    country: "Azerbaijan",
    image: "https://images.pexels.com/photos/17395806/pexels-photo-17395806.jpeg",
    packages: 12,
    description:
      "The City of Winds captivates with its futuristic skyline, UNESCO-listed old city, and unique blend of East and West.",
    rating: 4.6,
  },
  {
    id: "6",
    name: "Cappadocia",
    country: "Turkey",
    image: "https://images.pexels.com/photos/4388161/pexels-photo-4388161.jpeg",
    packages: 10,
    description:
      "Float above fairy chimneys in a hot air balloon, explore underground cities, and witness landscapes that feel otherworldly.",
    rating: 4.9,
  },
  {
    id: "7",
    name: "Antalya",
    country: "Turkey",
    image: "https://images.pexels.com/photos/18207966/pexels-photo-18207966.jpeg",
    packages: 14,
    description:
      "Turquoise waters meet ancient ruins along the stunning Turkish Riviera — a sun-soaked Mediterranean paradise.",
    rating: 4.7,
  },
  {
    id: "8",
    name: "Makkah & Madinah",
    country: "Saudi Arabia",
    image: "https://images.pexels.com/photos/11148384/pexels-photo-11148384.jpeg",
    packages: 30,
    description:
      "Embark on a spiritual journey to the holiest cities of Islam with our comprehensive Umrah and Hajj packages.",
    rating: 4.9,
  },
];

export const TOUR_PACKAGES: TourPackage[] = [
  {
    id: "p1",
    title: "Dubai Luxury Escape",
    slug: "dubai-luxury-escape",
    category: "international",
    destination: "Dubai, UAE",
    duration: "5 Days / 4 Nights",
    price: 185000,
    originalPrice: 215000,
    image: "https://images.pexels.com/photos/2404656/pexels-photo-2404656.jpeg",
    featured: true,
    rating: 4.8,
    reviews: 234,
    description:
      "Indulge in the ultimate luxury experience in Dubai. From Burj Khalifa to Palm Jumeirah, experience the finest that this glamorous city has to offer with premium accommodations and exclusive experiences.",
    highlights: [
      "Burj Khalifa At The Top viewing experience",
      "Desert safari with private dune bashing & BBQ dinner",
      "Dubai Marina yacht cruise with dinner",
      "Shopping at Dubai Mall & Mall of Emirates",
      "Palm Jumeirah & Atlantis Aquaventure",
    ],
    itinerary: [],
    inclusions: [
      "Return airfare (Islamabad - Dubai - Islamabad)",
      "4 nights in 5-star hotel with breakfast",
      "Airport transfers in private vehicle",
      "All tours & activities as per itinerary",
      "Travel insurance",
      "Dubai tourist visa",
    ],
    exclusions: [
      "Personal expenses & shopping",
      "Lunch & dinner (except where mentioned)",
      "Optional tours",
      "PCR test (if applicable)",
    ],
  },
  {
    id: "p2",
    title: "Istanbul, Antalya & Cappadocia",
    slug: "istanbul-antalya-cappadocia",
    category: "international",
    destination: "Turkey",
    duration: "9 Days / 8 Nights",
    price: 199000,
    originalPrice: 245000,
    image: "https://images.pexels.com/photos/2044434/pexels-photo-2044434.jpeg",
    featured: true,
    rating: 4.9,
    reviews: 312,
    description:
      "The ultimate Turkish trilogy — explore the cultural riches of Istanbul, the stunning coastline of Antalya, and the magical landscapes of Cappadocia in one unforgettable journey.",
    highlights: [
      "Hagia Sophia, Blue Mosque & Topkapi Palace",
      "Bosphorus dinner cruise",
      "Grand Bazaar & Spice Market shopping tour",
      "Antalya old town & Düden Waterfalls",
      "Hot air balloon ride over Cappadocia",
      "Underground city & Göreme open-air museum",
    ],
    itinerary: [],
    inclusions: [
      "Return airfare (Islamabad - Istanbul - Islamabad)",
      "Domestic flights within Turkey",
      "8 nights in 4-star & boutique hotels",
      "Daily breakfast & select dinners",
      "Professional English-speaking guide",
      "All entrance fees",
      "Airport transfers",
    ],
    exclusions: [
      "Personal expenses",
      "Lunch",
      "Hot air balloon (optional add-on)",
      "Travel insurance",
      "Visa fee",
    ],
  },
  {
    id: "p3",
    title: "Thailand Discovery — Bangkok & Phuket",
    slug: "thailand-discovery",
    category: "international",
    destination: "Thailand",
    duration: "7 Days / 6 Nights",
    price: 159000,
    originalPrice: 189000,
    image: "https://images.pexels.com/photos/1822481/pexels-photo-1822481.jpeg",
    featured: true,
    rating: 4.7,
    reviews: 198,
    description:
      "From Bangkok's vibrant streets to Phuket's pristine beaches, experience the best of Thailand with our carefully curated itinerary blending culture, adventure, and relaxation.",
    highlights: [
      "Grand Palace & Emerald Buddha Temple",
      "Floating market experience",
      "Phi Phi Island day trip from Phuket",
      "Thai massage & spa experience",
      "James Bond Island & Phang Nga Bay",
      "Bangkok street food tour",
    ],
    itinerary: [],
    inclusions: [
      "Return airfare",
      "6 nights in 4-star hotels",
      "Daily breakfast",
      "All transfers",
      "Sightseeing as per itinerary",
      "English-speaking guide",
    ],
    exclusions: [
      "Personal expenses",
      "Lunch & dinner",
      "Optional activities",
      "Visa fee (if applicable)",
    ],
  },
  {
    id: "p4",
    title: "Malaysia — Kuala Lumpur & Langkawi",
    slug: "malaysia-kuala-lumpur-langkawi",
    category: "international",
    destination: "Malaysia",
    duration: "7 Days / 6 Nights",
    price: 165000,
    originalPrice: 195000,
    image: "https://images.pexels.com/photos/22804/pexels-photo.jpg",
    featured: false,
    rating: 4.6,
    reviews: 167,
    description:
      "Explore Malaysia's dynamic capital Kuala Lumpur and unwind on the pristine beaches of Langkawi in this perfect city-and-beach combination package.",
    highlights: [
      "Petronas Twin Towers skybridge visit",
      "Batu Caves exploration",
      "Langkawi cable car & sky bridge",
      "Island hopping tour",
      "Shopping at Bukit Bintang",
      "Mangrove forest tour",
    ],
    itinerary: [],
    inclusions: [
      "Return airfare",
      "6 nights hotel accommodation",
      "Daily breakfast",
      "All transfers",
      "Guided tours",
      "Travel insurance",
    ],
    exclusions: [
      "Personal expenses",
      "Meals not mentioned",
      "Optional activities",
    ],
  },
  {
    id: "p5",
    title: "Azerbaijan — Baku & Gabala",
    slug: "azerbaijan-baku-gabala",
    category: "international",
    destination: "Azerbaijan",
    duration: "6 Days / 5 Nights",
    price: 145000,
    originalPrice: 175000,
    image: "https://images.pexels.com/photos/17395806/pexels-photo-17395806.jpeg",
    featured: false,
    rating: 4.7,
    reviews: 145,
    description:
      "Discover the Land of Fire — from Baku's futuristic Flame Towers and medieval Old City to the lush mountain scenery of Gabala.",
    highlights: [
      "Baku Old City (Icherisheher) UNESCO tour",
      "Flame Towers & Baku Boulevard",
      "Gabala mountain resort & Tufandag cable car",
      "Nohur Lake & Yeddi Gozel waterfall",
      "Mud volcanoes & Gobustan rock art",
      "Shopping at Nizami Street",
    ],
    itinerary: [],
    inclusions: [
      "Return airfare",
      "5 nights hotel accommodation",
      "Daily breakfast",
      "All transfers",
      "Guided tours",
      "E-visa processing",
    ],
    exclusions: [
      "Personal expenses",
      "Lunch & dinner",
      "Optional activities",
      "Visa fee",
    ],
  },
  {
    id: "p6",
    title: "Sri Lanka Paradise Island",
    slug: "sri-lanka-paradise",
    category: "international",
    destination: "Sri Lanka",
    duration: "7 Days / 6 Nights",
    price: 135000,
    originalPrice: 165000,
    image: "https://images.pexels.com/photos/28792455/pexels-photo-28792455.jpeg",
    featured: false,
    rating: 4.5,
    reviews: 123,
    description:
      "Explore the pearl of the Indian Ocean — ancient temples, lush tea plantations, wildlife safaris, and golden beaches await in this tropical paradise.",
    highlights: [
      "Sigiriya Lion Rock fortress",
      "Kandy Temple of the Sacred Tooth Relic",
      "Nuwara Eliya tea plantations",
      "Yala National Park safari",
      "Bentota beach relaxation",
      "Colombo city tour",
    ],
    itinerary: [],
    inclusions: [
      "Return airfare",
      "6 nights hotel accommodation",
      "Daily breakfast & dinner",
      "All transfers in AC vehicle",
      "English-speaking guide",
      "Visa assistance",
    ],
    exclusions: [
      "Personal expenses",
      "Lunch",
      "Camera fees at sites",
      "Travel insurance",
    ],
  },
];

export const UMRAH_PACKAGES: TourPackage[] = [
  {
    id: "u1",
    title: "5-Star VIP Umrah Package",
    slug: "vip-umrah-package",
    category: "umrah",
    destination: "Makkah & Madinah, Saudi Arabia",
    duration: "10 Days / 9 Nights",
    price: 395000,
    image: "https://images.pexels.com/photos/11148384/pexels-photo-11148384.jpeg",
    featured: true,
    rating: 4.9,
    reviews: 567,
    description:
      "Experience a truly blessed Umrah journey with 5-star accommodation steps from Haram, premium flights, and comprehensive spiritual guidance throughout your pilgrimage.",
    highlights: [
      "5 nights at Pullman ZamZam (5-star, Haram view)",
      "4 nights at Al Haram Hotel Madinah (5-star)",
      "Direct flights with Saudi Airlines",
      "Complete visa processing",
      "Private Ziyarat tours in Makkah & Madinah",
      "Spiritual guidance from experienced scholars",
      "Meet & assist services at airport",
    ],
    itinerary: [],
    inclusions: [
      "Return airfare on Saudi Airlines",
      "5-star hotel accommodation",
      "Daily breakfast & dinner",
      "Umrah visa processing",
      "All ground transportation",
      "Ziyarat tours",
      "Ihram kit",
      "24/7 ground support",
    ],
    exclusions: [
      "Personal expenses",
      "Lunch",
      "Sacrifice/Qurbani",
      "Additional room services",
    ],
  },
  {
    id: "u2",
    title: "Economy Umrah Package",
    slug: "economy-umrah-package",
    category: "umrah",
    destination: "Makkah & Madinah, Saudi Arabia",
    duration: "10 Days / 9 Nights",
    price: 245000,
    image: "https://images.pexels.com/photos/11148384/pexels-photo-11148384.jpeg",
    featured: false,
    rating: 4.7,
    reviews: 389,
    description:
      "A budget-friendly Umrah package without compromising on the essentials — comfortable hotels, reliable flights, and comprehensive support.",
    highlights: [
      "5 nights at 3-star hotel in Makkah",
      "4 nights at 3-star hotel in Madinah",
      "Economy flights with reputable airlines",
      "Complete visa processing",
      "Group Ziyarat tours",
      "Ground transportation",
    ],
    itinerary: [],
    inclusions: [
      "Return airfare",
      "3-star hotels",
      "Daily breakfast",
      "Visa processing",
      "Shared transportation",
      "Group Ziyarat",
      "Ihram kit",
      "Ground support",
    ],
    exclusions: [
      "Personal expenses",
      "Lunch & dinner",
      "Sacrifice",
      "Room upgrades",
    ],
  },
  {
    id: "u3",
    title: "Ramadan Special Umrah",
    slug: "ramadan-umrah-package",
    category: "umrah",
    destination: "Makkah & Madinah, Saudi Arabia",
    duration: "12 Days / 11 Nights",
    price: 525000,
    image: "https://images.pexels.com/photos/11148384/pexels-photo-11148384.jpeg",
    featured: true,
    rating: 4.9,
    reviews: 421,
    description:
      "Perform Umrah during the blessed month of Ramadan with premium hotels near Haram, guided Taraweeh arrangements, and Iftar/Suhoor provisions.",
    highlights: [
      "Premium hotels near Haram in Makkah & Madinah",
      "Guided Taraweeh arrangements",
      "Iftar & Suhoor included",
      "Last 10 days option available",
      "Spiritual lectures daily",
      "Private Ziyarat tours",
    ],
    itinerary: [],
    inclusions: [
      "Return airfare",
      "4/5-star hotels",
      "Iftar & Suhoor daily",
      "Visa processing",
      "Private transportation",
      "Ziyarat tours",
      "Ihram kit",
      "Scholar guidance",
    ],
    exclusions: [
      "Personal expenses",
      "Itikaf arrangements (optional)",
      "Sacrifice",
    ],
  },
];

export const VISA_SERVICES: VisaService[] = [
  {
    id: "v1",
    country: "United Arab Emirates",
    flag: "🇦🇪",
    type: "Tourist",
    processingTime: "3-5 working days",
    price: 35000,
    requirements: [
      "Valid passport (6+ months)",
      "Passport-sized photographs",
      "Confirmed flight booking",
      "Hotel reservation",
      "Bank statement (3 months)",
      "CNIC copy",
    ],
  },
  {
    id: "v2",
    country: "Turkey",
    flag: "🇹🇷",
    type: "Tourist",
    processingTime: "24-48 hours",
    price: 25000,
    requirements: [
      "Valid passport (6+ months)",
      "Passport-sized photographs",
      "Flight reservation",
      "Hotel booking",
      "Bank statement",
      "Travel insurance",
    ],
  },
  {
    id: "v3",
    country: "Thailand",
    flag: "🇹🇭",
    type: "Tourist",
    processingTime: "5-7 working days",
    price: 28000,
    requirements: [
      "Valid passport (6+ months)",
      "Passport-sized photographs",
      "Confirmed return ticket",
      "Hotel reservation",
      "Bank statement",
      "Employment letter",
    ],
  },
  {
    id: "v4",
    country: "Malaysia",
    flag: "🇲🇾",
    type: "Tourist",
    processingTime: "4-6 working days",
    price: 22000,
    requirements: [
      "Valid passport (6+ months)",
      "Passport-sized photographs",
      "Return flight ticket",
      "Hotel confirmation",
      "Bank statement",
      "CNIC copy",
    ],
  },
  {
    id: "v5",
    country: "Saudi Arabia",
    flag: "🇸🇦",
    type: "Tourist",
    processingTime: "5-7 working days",
    price: 45000,
    requirements: [
      "Valid passport (6+ months)",
      "Passport-sized photographs",
      "Confirmed flight booking",
      "Hotel reservation",
      "Bank statement",
      "Travel insurance",
      "Vaccination certificate",
    ],
  },
  {
    id: "v6",
    country: "Azerbaijan",
    flag: "🇦🇿",
    type: "Tourist",
    processingTime: "3-5 working days",
    price: 20000,
    requirements: [
      "Valid passport (6+ months)",
      "Passport-sized photographs",
      "Flight reservation",
      "Hotel booking",
      "Bank statement",
      "Employment letter",
    ],
  },
];

export const REVIEWS: Review[] = [
  {
    id: "r1",
    name: "Ahmed Hassan",
    avatar: "",
    rating: 5,
    date: "2025-12-15",
    package: "VIP Umrah Package",
    comment:
      "MashAllah, it was a wonderful experience. Great host, nice hotels, and a really informative tour! The Umrah trip was well-organized and our tour leader provided us with valuable insights. Made sure we got the most out of our trip. 5 stars!",
  },
  {
    id: "r2",
    name: "Fatima Khan",
    avatar: "",
    rating: 5,
    date: "2025-11-20",
    package: "Turkey Trilogy Tour",
    comment:
      "Don't think twice before choosing Easy Travel and Tours. This was my first international trip, and I can't thank the team enough. Everything was very well organized, and it made the overall experience an enjoyable and memorable one. Definitely recommend 10/10!",
  },
  {
    id: "r3",
    name: "Mohammad Usman",
    avatar: "",
    rating: 5,
    date: "2025-10-08",
    package: "Dubai Luxury Escape",
    comment:
      "As a first-time customer, I want to extend my deepest appreciation to Easy Travel. One of the best experiences I've had in my life. The team is very knowledgeable and hard-working when it comes to organizing everything before, during, and after the trip.",
  },
  {
    id: "r4",
    name: "Sara Ali",
    avatar: "",
    rating: 5,
    date: "2025-09-12",
    package: "Thailand Discovery",
    comment:
      "Outstanding, professional service from start to finish. The itinerary was perfectly balanced between activities and relaxation. Hotels were excellent and the local guides were fantastic. Will definitely book again for our next family vacation!",
  },
  {
    id: "r5",
    name: "Bilal Mahmood",
    avatar: "",
    rating: 4,
    date: "2025-08-25",
    package: "Azerbaijan Tour",
    comment:
      "Great value for money. Baku was absolutely stunning and the arrangements were seamless. The only small issue was a minor delay in the airport pickup, but the team handled it professionally. Overall, highly recommended!",
  },
  {
    id: "r6",
    name: "Ayesha Tariq",
    avatar: "",
    rating: 5,
    date: "2025-07-30",
    package: "Malaysia Tour",
    comment:
      "One of the best travel agencies I've worked with. They went above and beyond to customize our Malaysia itinerary. Kuala Lumpur and Langkawi were both spectacular. The hotel selections were perfect for our family. Will come back for Umrah!",
  },
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "b1",
    title: "Top 10 Must-Visit Destinations in Turkey for 2026",
    slug: "top-destinations-turkey-2026",
    excerpt:
      "From the fairy chimneys of Cappadocia to the turquoise waters of Antalya, discover the most breathtaking destinations in Turkey that should be on your 2026 travel list.",
    content: "",
    image: "https://images.pexels.com/photos/4388161/pexels-photo-4388161.jpeg",
    author: "Travel Expert",
    date: "2026-01-15",
    category: "Destinations",
    tags: ["Turkey", "Travel Guide", "2026"],
    readTime: "5 min read",
  },
  {
    id: "b2",
    title: "Complete Guide to Umrah: Preparation, Rituals & Tips",
    slug: "complete-umrah-guide",
    excerpt:
      "Everything you need to know before embarking on your spiritual journey — from visa requirements and packing tips to the step-by-step rituals of Umrah.",
    content: "",
    image: "https://images.pexels.com/photos/11148384/pexels-photo-11148384.jpeg",
    author: "Islamic Scholar",
    date: "2026-01-10",
    category: "Umrah",
    tags: ["Umrah", "Guide", "Spiritual"],
    readTime: "8 min read",
  },
  {
    id: "b3",
    title: "Dubai on a Budget: Luxury Experience Without Breaking the Bank",
    slug: "dubai-budget-luxury",
    excerpt:
      "Think Dubai is only for the ultra-rich? Think again. Discover insider tips on how to experience the best of Dubai without exceeding your travel budget.",
    content: "",
    image: "https://images.pexels.com/photos/2404656/pexels-photo-2404656.jpeg",
    author: "Travel Blogger",
    date: "2026-01-05",
    category: "Budget Travel",
    tags: ["Dubai", "Budget", "Tips"],
    readTime: "6 min read",
  },
];

export const FAQS = [
  {
    question: "What services does Easy Travel & Tours provide?",
    answer:
      "We offer comprehensive travel services including international and domestic flight bookings, hotel reservations worldwide, international and domestic tour packages, Umrah & Hajj packages, visa processing services for multiple countries, corporate travel management, travel insurance, and transportation services. As an IATA-certified agency, we ensure professional, reliable, and competitive travel solutions.",
  },
  {
    question: "How do I book a tour package?",
    answer:
      "You can book a tour package by visiting our website and browsing our packages section, calling our office directly at +92 51 2719103, visiting our office at I-8 Markaz, Islamabad, or filling out the inquiry form on our contact page. Our travel consultants will guide you through the selection process and help customize the package according to your preferences.",
  },
  {
    question: "What documents are required for visa processing?",
    answer:
      "Visa requirements vary by destination. Generally, you need a valid passport (minimum 6 months validity), passport-sized photographs with white background, confirmed flight booking, hotel reservation, bank statements (last 3-6 months), and an employment letter or business registration. Some countries may require additional documents like travel insurance, vaccination certificates, or invitation letters. Contact our visa team for country-specific requirements.",
  },
  {
    question: "Do you offer customized tour packages?",
    answer:
      "Absolutely! We specialize in creating tailor-made itineraries based on your preferences, budget, travel dates, and group size. Whether you want to modify an existing package or build a completely custom trip from scratch, our travel consultants will work with you to design the perfect journey.",
  },
  {
    question: "What is included in your Umrah packages?",
    answer:
      "Our Umrah packages typically include return airfare, hotel accommodation in Makkah and Madinah, Umrah visa processing, all ground transportation between cities and airports, guided Ziyarat tours, Ihram kit, and 24/7 ground support. Premium packages also include meals, 5-star hotels near Haram, and personal scholar guidance. We offer economy, standard, and VIP packages to suit different budgets.",
  },
  {
    question: "How far in advance should I book my trip?",
    answer:
      "We recommend booking at least 4-6 weeks in advance for regular international tours to secure the best flight prices and hotel availability. For Umrah packages, especially during Ramadan and peak seasons (December, summer breaks), we suggest booking 2-3 months ahead. However, we can also accommodate last-minute bookings based on availability.",
  },
  {
    question: "Do you offer group discounts?",
    answer:
      "Yes, we offer attractive discounts for group bookings. The discount varies based on the group size, destination, and season. Groups of 10 or more travelers typically receive special rates. Contact our group travel desk for a customized quotation for your group.",
  },
  {
    question: "Is travel insurance included in the packages?",
    answer:
      "Travel insurance is included in most of our premium packages. For economy and standard packages, we offer travel insurance as an optional add-on. We strongly recommend purchasing travel insurance for medical emergencies, trip cancellation, lost baggage, and other unforeseen circumstances. We partner with leading insurance providers to offer comprehensive coverage at competitive rates.",
  },
];

export const AIRLINES = [
  { name: "Emirates", logo: "✈️", rating: 4.8 },
  { name: "Qatar Airways", logo: "✈️", rating: 4.9 },
  { name: "Turkish Airlines", logo: "✈️", rating: 4.7 },
  { name: "Saudi Airlines", logo: "✈️", rating: 4.5 },
  { name: "Etihad Airways", logo: "✈️", rating: 4.7 },
  { name: "Singapore Airlines", logo: "✈️", rating: 4.9 },
];

export const HOTELS = [
  {
    name: "Burj Al Arab",
    location: "Dubai, UAE",
    stars: 7,
    price: 450000,
    image: "https://images.pexels.com/photos/2404656/pexels-photo-2404656.jpeg",
    rating: 4.9,
  },
  {
    name: "Pullman ZamZam",
    location: "Makkah, Saudi Arabia",
    stars: 5,
    price: 120000,
    image: "https://images.pexels.com/photos/11148384/pexels-photo-11148384.jpeg",
    rating: 4.8,
  },
  {
    name: "Ciragan Palace Kempinski",
    location: "Istanbul, Turkey",
    stars: 5,
    price: 250000,
    image: "https://images.pexels.com/photos/2044434/pexels-photo-2044434.jpeg",
    rating: 4.9,
  },
  {
    name: "Mandarin Oriental",
    location: "Bangkok, Thailand",
    stars: 5,
    price: 180000,
    image: "https://images.pexels.com/photos/1822481/pexels-photo-1822481.jpeg",
    rating: 4.8,
  },
];

export const OFFER_TAGS = [
  { text: "Early Bird", color: "bg-emerald-500" },
  { text: "Honeymoon Special", color: "bg-pink-500" },
  { text: "Ramadan Deal", color: "bg-amber-500" },
  { text: "Group Discount", color: "bg-blue-500" },
  { text: "Last Minute", color: "bg-red-500" },
  { text: "Family Offer", color: "bg-purple-500" },
];
