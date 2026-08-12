export const SITE = {
  name: "Easy Travel & Tours",
  tagline: "Your Journey, Our Passion",
  description:
    "Premium travel agency offering worldwide flights, hotel bookings, visa services, international and domestic tour packages, Umrah & Hajj packages, corporate travel, and travel insurance. IATA certified travel partner in Islamabad, Pakistan.",
  url: "https://www.easytravel.com.pk",
  logo: "/images/logo.svg",
  email: "info@easytravel.com.pk",
  phone: "+92 51 2719103",
  phone2: "+92 332 0007024",
  uan: "0311-113-59-00",
  whatsapp: "+9231200007024",
  address: "Office #22, 1st Floor, Rose Plaza, I-8 Markaz, Islamabad, Pakistan",
  social: {
    facebook: "https://www.facebook.com/easytravelisb/",
    instagram: "https://www.instagram.com/easytraveltours/",
    twitter: "https://twitter.com/easytravelisb",
    youtube: "https://youtube.com/@easytraveltours",
  },
};

export const NAVIGATION = {
  main: [
    { label: "Home", href: "/" },
    {
      label: "Tours",
      children: [
        { label: "International Tours", href: "/international-tours" },
        { label: "Domestic Tours", href: "/domestic-tours" },
        { label: "Holiday Packages", href: "/holiday-packages" },
        { label: "Honeymoon Packages", href: "/holiday-packages?type=honeymoon" },
        { label: "Group Tours", href: "/holiday-packages?type=group" },
      ],
    },
    { label: "Flights", href: "/flights" },
    { label: "Hotels", href: "/hotels" },
    {
      label: "Visa Services",
      href: "/visa-services",
    },
    {
      label: "Religious",
      children: [
        { label: "Umrah Packages", href: "/umrah" },
        { label: "Hajj Packages", href: "/hajj" },
      ],
    },
    {
      label: "Services",
      children: [
        { label: "Corporate Travel", href: "/corporate-travel" },
        { label: "Travel Insurance", href: "/travel-insurance" },
        { label: "Transportation", href: "/corporate-travel#transportation" },
      ],
    },
    { label: "Contact", href: "/contact" },
  ],
};

export const FEATURES = [
  {
    title: "IATA Certified",
    description:
      "We are a fully licensed and IATA-accredited travel agency, ensuring safe, reliable, and professional travel services worldwide.",
    icon: "BadgeCheck",
  },
  {
    title: "24/7 Support",
    description:
      "Round-the-clock customer support to assist you before, during, and after your journey — because your peace of mind matters.",
    icon: "Headphones",
  },
  {
    title: "Best Price Guarantee",
    description:
      "We negotiate directly with airlines and hotels to offer you the most competitive prices without compromising on quality.",
    icon: "Shield",
  },
  {
    title: "Customized Packages",
    description:
      "Every traveler is unique. We design tailor-made itineraries that match your preferences, budget, and travel style.",
    icon: "PenTool",
  },
  {
    title: "Expert Team",
    description:
      "Our travel consultants bring decades of combined experience in the travel industry to craft your perfect journey.",
    icon: "Users",
  },
  {
    title: "Global Network",
    description:
      "Strong partnerships with airlines, hotels, and tour operators across 50+ countries for seamless travel experiences.",
    icon: "Globe",
  },
];

export const STATS = [
  { label: "Happy Travelers", value: 50000, suffix: "+" },
  { label: "Destinations", value: 100, suffix: "+" },
  { label: "Years Experience", value: 15, suffix: "+" },
  { label: "Tour Packages", value: 500, suffix: "+" },
];

export const PARTNERS = [
  "Emirates",
  "Qatar Airways",
  "Turkish Airlines",
  "Saudi Airlines",
  "Etihad Airways",
  "Singapore Airlines",
  "Marriott Hotels",
  "Hilton Worldwide",
  "Hyatt Hotels",
  "Accor Hotels",
];
