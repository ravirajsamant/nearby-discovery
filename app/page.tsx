"use client";

import { useState, useEffect, useRef } from "react";

interface Place {
  id: number;
  rank: number;
  name: string;
  category: string;
  city: string;
  price: "$" | "$$" | "$$$";
  distance: string;
  area: string;
  crowd: "Low" | "Medium" | "High";
  crowdStatus: string;
  bestTime: string;
  vibe: "Chill" | "Lively";
  description: string;
  image: string;
  lat: number;
  lng: number;
  filterTags: string[];
}

interface FilterPill {
  id: string;
  label: string;
  type: "vibe" | "crowd" | "tag";
  value: string;
  icon: React.ReactNode;
}

const FILTER_PILLS: FilterPill[] = [
  {
    id: "Chill",
    label: "Chill",
    type: "vibe",
    value: "Chill",
    icon: (
      <svg
        className="h-3.5 w-3.5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
        />
      </svg>
    ),
  },
  {
    id: "Lively",
    label: "Lively",
    type: "vibe",
    value: "Lively",
    icon: (
      <svg
        className="h-3.5 w-3.5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
        />
      </svg>
    ),
  },
  {
    id: "Low Crowd",
    label: "Low crowd",
    type: "crowd",
    value: "Low",
    icon: (
      <svg
        className="h-3.5 w-3.5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <circle cx="12" cy="8" r="4" />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 20v-1a6 6 0 0112 0v1"
        />
      </svg>
    ),
  },
  {
    id: "Medium Crowd",
    label: "Medium crowd",
    type: "crowd",
    value: "Medium",
    icon: (
      <svg
        className="h-3.5 w-3.5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
    ),
  },
  {
    id: "High Crowd",
    label: "High crowd",
    type: "crowd",
    value: "High",
    icon: (
      <svg
        className="h-3.5 w-3.5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
        />
      </svg>
    ),
  },
  {
    id: "Trending",
    label: "Trending",
    type: "tag",
    value: "Trending",
    icon: (
      <svg
        className="h-3.5 w-3.5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.047 8.287 8.287 0 009 9.601a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z"
        />
      </svg>
    ),
  },
  {
    id: "Hidden Gems",
    label: "Hidden Gems",
    type: "tag",
    value: "Hidden Gems",
    icon: (
      <svg
        className="h-3.5 w-3.5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z"
        />
      </svg>
    ),
  },
];

const PLACES: Place[] = [
  // PUNE PLACES
  {
    id: 1,
    rank: 1,
    name: "Aga Khan Palace",
    category: "HERITAGE LANDMARK",
    city: "Pune",
    distance: "0.8 mi",
    area: "Yerawada",
    price: "$",
    crowd: "Low",
    crowdStatus: "Low crowd • No wait",
    bestTime: "Afternoon (3–5:30 PM)",
    vibe: "Chill",
    description:
      "Italianate landmark featuring tranquil cloistered colonnades, landscaped gardens, and the Mahatma Gandhi memorial.",
    image:
      "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1200&q=80",
    lat: 18.5529,
    lng: 73.9015,
    filterTags: ["Trending", "Chill"],
  },
  {
    id: 2,
    rank: 2,
    name: "Vohuman Cafe",
    category: "IRANI BREAKFAST",
    city: "Pune",
    distance: "1.4 mi",
    area: "Near Pune Station",
    price: "$",
    crowd: "High",
    crowdStatus: "Busy • 15 min wait",
    bestTime: "Morning (7:30–10 AM)",
    vibe: "Lively",
    description:
      "Famous Irani morning institution beloved for fresh crusty bun maska, double cheese omelettes, and brewed spiced chai.",
    image:
      "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=80",
    lat: 18.5284,
    lng: 73.8741,
    filterTags: ["Trending", "Lively"],
  },
  {
    id: 3,
    rank: 3,
    name: "FC Road Market",
    category: "STREET BAZAAR",
    city: "Pune",
    distance: "1.8 mi",
    area: "Fergusson College Rd",
    price: "$",
    crowd: "High",
    crowdStatus: "Busy • high energy",
    bestTime: "Evening (5:30–9 PM)",
    vibe: "Lively",
    description:
      "Bustling collegiate shopping boulevard packed with curbside bookstores, local footwear stalls, and savory street snacks.",
    image:
      "https://images.unsplash.com/photo-1533900298318-6b8da08a523e?auto=format&fit=crop&w=1200&q=80",
    lat: 18.5222,
    lng: 73.8415,
    filterTags: ["Trending", "Lively"],
  },
  {
    id: 4,
    rank: 4,
    name: "Shaniwar Wada",
    category: "HISTORIC CITADEL",
    city: "Pune",
    distance: "2.1 mi",
    area: "Shaniwar Peth",
    price: "$",
    crowd: "Medium",
    crowdStatus: "Moderate crowd • 5 min wait",
    bestTime: "Morning (9–11:30 AM)",
    vibe: "Chill",
    description:
      "18th-century Maratha Peshwa fortification featuring massive spiked Dilli Darwaza gates, stone bastions, and fountain gardens.",
    image:
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80",
    lat: 18.5196,
    lng: 73.8553,
    filterTags: ["Trending", "Hidden Gems", "Chill"],
  },
  {
    id: 5,
    rank: 5,
    name: "Osho Teerth Park",
    category: "ZEN GARDEN",
    city: "Pune",
    distance: "2.5 mi",
    area: "Koregaon Park",
    price: "$",
    crowd: "Low",
    crowdStatus: "Low crowd • No wait",
    bestTime: "Early morning (6–8:30 AM)",
    vibe: "Chill",
    description:
      "Lush 12-acre Japanese-style sanctuary with shaded bamboo groves, meandering freshwater streams, and reflective ponds.",
    image:
      "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=1200&q=80",
    lat: 18.5398,
    lng: 73.8966,
    filterTags: ["Hidden Gems", "Chill"],
  },
  {
    id: 6,
    rank: 6,
    name: "Cafe Goodluck",
    category: "HERITAGE DINER",
    city: "Pune",
    distance: "2.8 mi",
    area: "Deccan Gymkhana",
    price: "$$",
    crowd: "Medium",
    crowdStatus: "Moderate crowd • 10 min wait",
    bestTime: "Morning (8–11 AM)",
    vibe: "Lively",
    description:
      "Historic 1935 dining landmark at Goodluck Chowk, famous for spiced mutton kheema with hot pav, bun maska, and custard.",
    image:
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80",
    lat: 18.5165,
    lng: 73.8418,
    filterTags: ["Hidden Gems", "Lively"],
  },
  {
    id: 7,
    rank: 7,
    name: "Pagdandi Bookstore",
    category: "BOOKSTORE CAFE",
    city: "Pune",
    distance: "3.2 mi",
    area: "Baner",
    price: "$",
    crowd: "Low",
    crowdStatus: "Low crowd • No wait",
    bestTime: "Afternoon (2–5 PM)",
    vibe: "Chill",
    description:
      "Cozy independent community bookstore cafe serving artisanal herbal teas, organic bites, and peaceful seating.",
    image:
      "https://images.unsplash.com/photo-1507842229451-7f01be7fe7ab?auto=format&fit=crop&w=1200&q=80",
    lat: 18.559,
    lng: 73.7868,
    filterTags: ["Chill", "Hidden Gems"],
  },
  {
    id: 8,
    rank: 8,
    name: "Kayani Bakery",
    category: "PARSI BAKERY",
    city: "Pune",
    distance: "3.5 mi",
    area: "Camp",
    price: "$",
    crowd: "High",
    crowdStatus: "Busy • short rush queue",
    bestTime: "Morning (8–10:30 AM)",
    vibe: "Lively",
    description:
      "Iconic 1955 bakery renowned across India for freshly baked Shrewsbury butter biscuits and warm mawa cakes.",
    image:
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=80",
    lat: 18.5135,
    lng: 73.8784,
    filterTags: ["Trending", "Lively"],
  },

  // MUMBAI PLACES
  {
    id: 9,
    rank: 1,
    name: "Marine Drive Promenade",
    category: "SEASIDE PROMENADE",
    city: "Mumbai",
    distance: "1.2 mi",
    area: "South Mumbai",
    price: "$",
    crowd: "Medium",
    crowdStatus: "Moderate crowd • Sunset rush",
    bestTime: "Evening (5:30–8 PM)",
    vibe: "Chill",
    description:
      "Iconic 3.6 km long C-shaped boulevard along the Arabian Sea coast, known as the Queen's Necklace.",
    image:
      "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1200&q=80",
    lat: 18.9432,
    lng: 72.8231,
    filterTags: ["Trending", "Chill"],
  },
  {
    id: 10,
    rank: 2,
    name: "Leopold Cafe & Bar",
    category: "HERITAGE BISTRO",
    city: "Mumbai",
    distance: "1.8 mi",
    area: "Colaba",
    price: "$$",
    crowd: "High",
    crowdStatus: "Busy • 15 min wait",
    bestTime: "Evening (7–11 PM)",
    vibe: "Lively",
    description:
      "Historic 1871 Colaba restaurant famous for hearty continental fare, chilled beer towers, and energetic chatter.",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
    lat: 18.9228,
    lng: 72.8317,
    filterTags: ["Trending", "Lively"],
  },
  {
    id: 11,
    rank: 3,
    name: "Prithvi Cafe",
    category: "ART & CULTURE CAFE",
    city: "Mumbai",
    distance: "3.4 mi",
    area: "Juhu",
    price: "$",
    crowd: "Low",
    crowdStatus: "Low crowd • Relaxed seating",
    bestTime: "Afternoon (3–6 PM)",
    vibe: "Chill",
    description:
      "Open-air bohemian courtyard cafe surrounded by fairy lights and bamboo, celebrated for Irish coffee and stuffed parathas.",
    image:
      "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?auto=format&fit=crop&w=1200&q=80",
    lat: 19.1062,
    lng: 72.8258,
    filterTags: ["Hidden Gems", "Chill"],
  },
  {
    id: 12,
    rank: 4,
    name: "Bandra Bandstand",
    category: "COASTAL WALKWAY",
    city: "Mumbai",
    distance: "4.1 mi",
    area: "Bandra West",
    price: "$",
    crowd: "High",
    crowdStatus: "Busy • High energy",
    bestTime: "Evening (5–8 PM)",
    vibe: "Lively",
    description:
      "Scenic kilometer-long rocky seaside walkway overlooking the Arabian Sea, featuring the Bandra Fort amphitheater.",
    image:
      "https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?auto=format&fit=crop&w=1200&q=80",
    lat: 19.0434,
    lng: 72.8193,
    filterTags: ["Trending", "Lively"],
  },

  // BANGALORE PLACES
  {
    id: 13,
    rank: 1,
    name: "Cubbon Park",
    category: "BOTANICAL SANCTUARY",
    city: "Bangalore",
    distance: "0.9 mi",
    area: "Central Bangalore",
    price: "$",
    crowd: "Low",
    crowdStatus: "Low crowd • Open lawns",
    bestTime: "Morning (6:30–9:30 AM)",
    vibe: "Chill",
    description:
      "300-acre historic lung space with lush canopy avenues, century-old red stone buildings, and serene walking tracks.",
    image:
      "https://images.unsplash.com/photo-1588714477688-cf28a50e94f7?auto=format&fit=crop&w=1200&q=80",
    lat: 12.9763,
    lng: 77.5929,
    filterTags: ["Trending", "Chill"],
  },
  {
    id: 14,
    rank: 2,
    name: "CTR (Central Tiffin Room)",
    category: "ICONIC TIFFIN",
    city: "Bangalore",
    distance: "2.1 mi",
    area: "Malleswaram",
    price: "$",
    crowd: "High",
    crowdStatus: "Busy • 20 min queue",
    bestTime: "Morning (7:30–10 AM)",
    vibe: "Lively",
    description:
      "Legendary 1920s legacy breakfast spot renowned for crisp butter-rich Benne Masala Dosa and filter coffee.",
    image:
      "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=1200&q=80",
    lat: 13.0031,
    lng: 77.5701,
    filterTags: ["Trending", "Lively"],
  },
  {
    id: 15,
    rank: 3,
    name: "Ranga Shankara",
    category: "THEATRE & CAFE",
    city: "Bangalore",
    distance: "3.5 mi",
    area: "JP Nagar",
    price: "$",
    crowd: "Low",
    crowdStatus: "Low crowd • Serene foyer",
    bestTime: "Evening (5–7:30 PM)",
    vibe: "Chill",
    description:
      "Vibrant performing arts theatre hub with an open-air foyer serving piping hot sabudana vadas and ginger chai.",
    image:
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1200&q=80",
    lat: 12.9126,
    lng: 77.5854,
    filterTags: ["Hidden Gems", "Chill"],
  },
  {
    id: 16,
    rank: 4,
    name: "Church Street",
    category: "URBAN WALKWAY",
    city: "Bangalore",
    distance: "1.4 mi",
    area: "Brigade Road",
    price: "$$",
    crowd: "High",
    crowdStatus: "Busy • Vibrant buzz",
    bestTime: "Evening (6–10 PM)",
    vibe: "Lively",
    description:
      "Cobblestone pedestrian-friendly promenade lined with indie bookstores, craft cafes, street musicians, and gastropubs.",
    image:
      "https://images.unsplash.com/photo-1543083477-4f785aeafaa9?auto=format&fit=crop&w=1200&q=80",
    lat: 12.9749,
    lng: 77.6074,
    filterTags: ["Trending", "Lively"],
  },

  // DELHI PLACES
  {
    id: 17,
    rank: 1,
    name: "India Gate & Kartavya Path",
    category: "WAR MEMORIAL",
    city: "Delhi",
    distance: "1.1 mi",
    area: "Central Delhi",
    price: "$",
    crowd: "Medium",
    crowdStatus: "Moderate crowd • Evening breeze",
    bestTime: "Evening (6–9 PM)",
    vibe: "Chill",
    description:
      "Iconic 42-meter high sandstone triumphal arch surrounded by sprawling verdant lawns, water fountains, and evening street food.",
    image:
      "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1200&q=80",
    lat: 28.6129,
    lng: 77.2295,
    filterTags: ["Trending", "Chill"],
  },
  {
    id: 18,
    rank: 2,
    name: "Chandni Chowk Market",
    category: "HISTORIC BAZAAR",
    city: "Delhi",
    distance: "2.3 mi",
    area: "Old Delhi",
    price: "$",
    crowd: "High",
    crowdStatus: "Busy • High energy",
    bestTime: "Afternoon (12–4 PM)",
    vibe: "Lively",
    description:
      "Vibrant 17th-century Mughal commercial street famous for Paranthe Wali Gali, spice aromas, silver jewelry, and jalebis.",
    image:
      "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?auto=format&fit=crop&w=1200&q=80",
    lat: 28.6562,
    lng: 77.2307,
    filterTags: ["Trending", "Lively"],
  },
  {
    id: 19,
    rank: 3,
    name: "Lodhi Garden",
    category: "HERITAGE PARK",
    city: "Delhi",
    distance: "2.8 mi",
    area: "Lodhi Estate",
    price: "$",
    crowd: "Low",
    crowdStatus: "Low crowd • Peaceful walk",
    bestTime: "Morning (6:30–9:30 AM)",
    vibe: "Chill",
    description:
      "Serene 90-acre lush garden park housing 15th-century Sayyid and Lodi dynastic tombs, bonsai park, and freshwater lake.",
    image:
      "https://images.unsplash.com/photo-1608958435020-e8a7109ba809?auto=format&fit=crop&w=1200&q=80",
    lat: 28.5933,
    lng: 77.2197,
    filterTags: ["Hidden Gems", "Chill"],
  },
  {
    id: 20,
    rank: 4,
    name: "Hauz Khas Social",
    category: "LAKESIDE LOUNGE",
    city: "Delhi",
    distance: "4.2 mi",
    area: "Hauz Khas Village",
    price: "$$",
    crowd: "High",
    crowdStatus: "Busy • DJ & sunset terrace",
    bestTime: "Evening (7–11 PM)",
    vibe: "Lively",
    description:
      "Urban cafe and nightlife hub overlooking the medieval 13th-century water tank reservoir and deer park forest.",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
    lat: 28.5539,
    lng: 77.1942,
    filterTags: ["Trending", "Lively"],
  },

  // HYDERABAD PLACES
  {
    id: 21,
    rank: 1,
    name: "Charminar & Laad Bazaar",
    category: "HISTORIC MONUMENT",
    city: "Hyderabad",
    distance: "1.0 mi",
    area: "Old City",
    price: "$",
    crowd: "High",
    crowdStatus: "Busy • Night bazaar buzz",
    bestTime: "Evening (6–9:30 PM)",
    vibe: "Lively",
    description:
      "Grand 1591 four-minaret Indo-Islamic monument surrounded by shimmering lacquer bangle bazaars and steaming Irani chai stalls.",
    image:
      "https://images.unsplash.com/photo-1609137144813-7d9921338f24?auto=format&fit=crop&w=1200&q=80",
    lat: 17.3616,
    lng: 78.4747,
    filterTags: ["Trending", "Lively"],
  },
  {
    id: 22,
    rank: 2,
    name: "Hussain Sagar & Necklace Rd",
    category: "LAKESIDE PROMENADE",
    city: "Hyderabad",
    distance: "2.4 mi",
    area: "Tank Bund",
    price: "$",
    crowd: "Medium",
    crowdStatus: "Moderate crowd • Lake breeze",
    bestTime: "Sunset (5:30–8 PM)",
    vibe: "Chill",
    description:
      "Heart-shaped freshwater lake dating to 1563 featuring the monolithic Buddha statue and tranquil lakeside walkway.",
    image:
      "https://images.unsplash.com/photo-1628080035043-982845c22fb4?auto=format&fit=crop&w=1200&q=80",
    lat: 17.4239,
    lng: 78.4738,
    filterTags: ["Trending", "Chill"],
  },
  {
    id: 23,
    rank: 3,
    name: "Lamakaan Cultural Space",
    category: "CULTURE & ARTS",
    city: "Hyderabad",
    distance: "3.1 mi",
    area: "Banjara Hills",
    price: "$",
    crowd: "Low",
    crowdStatus: "Low crowd • Open courtyard",
    bestTime: "Evening (4:30–7:30 PM)",
    vibe: "Chill",
    description:
      "Open cultural retreat and cafe hosting poetry readings, independent plays, and warm samosas under banyan trees.",
    image:
      "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=80",
    lat: 17.4168,
    lng: 78.4485,
    filterTags: ["Hidden Gems", "Chill"],
  },
  {
    id: 24,
    rank: 4,
    name: "Bawarchi Biryani House",
    category: "HERITAGE BIRYANI",
    city: "Hyderabad",
    distance: "3.7 mi",
    area: "RTC X Roads",
    price: "$$",
    crowd: "High",
    crowdStatus: "Busy • 15 min wait",
    bestTime: "Afternoon (1–3:30 PM)",
    vibe: "Lively",
    description:
      "World-famous dining institution renowned for authentic Hyderabadi mutton dum biryani, mirchi ka salan, and raita.",
    image:
      "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=1200&q=80",
    lat: 17.4062,
    lng: 78.4984,
    filterTags: ["Trending", "Lively"],
  },
];

/* Real Interactive Leaflet Map Component */
function RealLeafletMap({
  places,
  selectedPlace,
  onSelectPlace,
  onOpenDetails,
}: {
  places: Place[];
  selectedPlace: Place | null;
  onSelectPlace: (place: Place) => void;
  onOpenDetails: (place: Place) => void;
}) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapInstanceRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const markersGroupRef = useRef<any[]>([]);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    const setupMap = () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const L = (window as any).L;
      if (!L || !mapContainerRef.current) return;

      if (!mapInstanceRef.current) {
        const initialLat = selectedPlace ? selectedPlace.lat : 18.5304;
        const initialLng = selectedPlace ? selectedPlace.lng : 73.8567;

        const map = L.map(mapContainerRef.current, {
          zoomControl: true,
          scrollWheelZoom: true,
        }).setView([initialLat, initialLng], 13);

        L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 19,
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);

        mapInstanceRef.current = map;
      }

      const map = mapInstanceRef.current;

      // Invalidate size to ensure full tile rendering after container is visible
      setTimeout(() => {
        if (map) map.invalidateSize();
      }, 150);

      // Clear old markers
      markersGroupRef.current.forEach((marker) => marker.remove());
      markersGroupRef.current = [];

      // Add markers for all visible places
      places.forEach((place) => {
        const isCurrent = selectedPlace?.id === place.id;
        const iconHtml = `
          <div style="transform: translate(-50%, -100%); cursor: pointer; text-align: center;">
            <div style="
              display: inline-flex;
              align-items: center;
              gap: 4px;
              background-color: ${isCurrent ? "#FF5B00" : "#FFFFFF"};
              color: ${isCurrent ? "#FFFFFF" : "#1A1A1A"};
              border: 2px solid ${isCurrent ? "#FF5B00" : "#EAEAEA"};
              box-shadow: 0 4px 14px rgba(0,0,0,0.18);
              padding: 4px 9px;
              border-radius: 9999px;
              font-family: 'Poppins', sans-serif;
              font-size: 11px;
              font-weight: 700;
              white-space: nowrap;
            ">
              <span style="
                background-color: ${isCurrent ? "#FFFFFF" : "#FF5B00"};
                color: ${isCurrent ? "#FF5B00" : "#FFFFFF"};
                border-radius: 9999px;
                width: 17px;
                height: 17px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 9px;
                font-weight: 800;
              ">#${place.rank}</span>
              <span>${place.name}</span>
            </div>
            <div style="
              width: 0;
              height: 0;
              border-left: 6px solid transparent;
              border-right: 6px solid transparent;
              border-top: 6px solid ${isCurrent ? "#FF5B00" : "#FFFFFF"};
              margin: -1px auto 0;
            "></div>
          </div>
        `;

        const customIcon = L.divIcon({
          html: iconHtml,
          className: "custom-leaflet-marker",
          iconSize: [0, 0],
        });

        const marker = L.marker([place.lat, place.lng], { icon: customIcon }).addTo(map);

        marker.on("click", () => {
          onSelectPlace(place);
        });

        markersGroupRef.current.push(marker);
      });

      if (selectedPlace) {
        map.setView([selectedPlace.lat, selectedPlace.lng], 14, { animate: true });
      }
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((window as any).L) {
      setupMap();
    } else {
      timer = setInterval(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if ((window as any).L) {
          if (timer) clearInterval(timer);
          setupMap();
        }
      }, 200);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [places, selectedPlace, onSelectPlace]);

  // Clean unmount
  useEffect(() => {
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div className="relative w-full h-[520px] sm:h-[580px] rounded-3xl overflow-hidden border border-[#EAEAEA] bg-[#EEF2F6] shadow-[0_4px_24px_rgba(0,0,0,0.06)]">
      <div ref={mapContainerRef} className="w-full h-full z-0" />

      {/* Floating Place Preview Card on Map */}
      {selectedPlace && (
        <div className="absolute bottom-5 inset-x-4 sm:inset-x-auto sm:right-6 sm:w-96 z-[500] pointer-events-auto">
          <div className="rounded-2xl border border-[#EAEAEA] bg-white/95 backdrop-blur-md p-4 shadow-2xl flex items-center gap-3.5">
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-[#F2F2F2]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={selectedPlace.image}
                alt={selectedPlace.name}
                className="h-full w-full object-cover"
              />
              <span className="absolute top-1 left-1 rounded bg-black/60 px-1 text-[9px] font-bold text-white">
                #{selectedPlace.rank}
              </span>
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-1">
                <span className="text-[10px] font-bold text-[#FF5B00] uppercase tracking-wider truncate">
                  {selectedPlace.category}
                </span>
                <span className="text-xs font-semibold text-[#6B6B6B]">
                  {selectedPlace.distance}
                </span>
              </div>
              <h4 className="text-sm font-bold text-[#1A1A1A] truncate">
                {selectedPlace.name}
              </h4>
              <p className="text-[11px] text-[#6B6B6B] truncate mt-0.5">
                {selectedPlace.vibe}
              </p>
            </div>

            <button
              type="button"
              onClick={() => onOpenDetails(selectedPlace)}
              className="shrink-0 rounded-xl bg-[#FF5B00] px-3.5 py-2 text-xs font-bold text-white shadow-sm hover:bg-[#E05000] transition cursor-pointer"
            >
              Details
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

interface CityItem {
  id: string;
  name: string;
  badge: string;
  displayLocation: string;
  region: string;
  popularAreas: string[];
  lat: number;
  lng: number;
}

interface LocationSuggestion {
  id: string;
  name: string;
  fullName: string;
  latitude: number;
  longitude: number;
  placeType: string;
  city: string;
  contextText: string;
}

interface SelectedLocationData {
  name: string;
  fullName: string;
  latitude: number;
  longitude: number;
  city: string;
}


const CITIES: CityItem[] = [
  {
    id: "pune",
    name: "Pune",
    badge: "MH-12",
    displayLocation: "Pune, MH-12",
    region: "Maharashtra, India",
    popularAreas: ["Koregaon Park", "Baner", "FC Road", "Camp", "Kothrud"],
    lat: 18.5204,
    lng: 73.8567,
  },
  {
    id: "mumbai",
    name: "Mumbai",
    badge: "MH-01",
    displayLocation: "Mumbai, MH-01",
    region: "Maharashtra, India",
    popularAreas: ["Bandra", "Colaba", "Juhu", "Powai", "Andheri"],
    lat: 19.0760,
    lng: 72.8777,
  },
  {
    id: "bangalore",
    name: "Bangalore",
    badge: "KA-01",
    displayLocation: "Bangalore, KA-01",
    region: "Karnataka, India",
    popularAreas: ["Indiranagar", "Koramangala", "Whitefield", "HSR Layout"],
    lat: 12.9716,
    lng: 77.5946,
  },
  {
    id: "delhi",
    name: "Delhi",
    badge: "DL-01",
    displayLocation: "Delhi, DL-01",
    region: "Delhi NCR, India",
    popularAreas: ["Central Delhi", "Old Delhi", "Lodhi Estate", "Hauz Khas Village"],
    lat: 28.6139,
    lng: 77.2090,
  },
  {
    id: "hyderabad",
    name: "Hyderabad",
    badge: "TS-09",
    displayLocation: "Hyderabad, TS-09",
    region: "Telangana, India",
    popularAreas: ["Old City", "Tank Bund", "Banjara Hills", "RTC X Roads"],
    lat: 17.3850,
    lng: 78.4867,
  },
];

export default function Home() {
  const [viewMode, setViewMode] = useState<"list" | "map">("list");
  const [placeSearchQuery, setPlaceSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [bookmarkedIds, setBookmarkedIds] = useState<number[]>([1, 4]);
  const [selectedModalPlace, setSelectedModalPlace] = useState<Place | null>(null);
  const [selectedMapPlace, setSelectedMapPlace] = useState<Place | null>(PLACES[0]);
  const [activeNavTab, setActiveNavTab] = useState<"discover" | "saved" | "activity" | "profile">("discover");

  // Debounce search query by 300ms for smooth, flicker-free filtering
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(placeSearchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [placeSearchQuery]);

  const handleClearSearch = () => {
    setPlaceSearchQuery("");
    setDebouncedSearchQuery("");
  };

  // 3) Stored selected location data: name + latitude + longitude
  const [selectedLocationData, setSelectedLocationData] = useState<SelectedLocationData>({
    name: "Pune",
    fullName: "Pune, MH-12",
    latitude: 18.5204,
    longitude: 73.8567,
    city: "Pune",
  });
  const [selectedCity, setSelectedCity] = useState("Pune");
  const [selectedLocation, setSelectedLocation] = useState("Pune, MH-12");

  // Location search input & Mapbox API suggestions state
  const [searchQuery, setSearchQuery] = useState("");
  const [locationSuggestions, setLocationSuggestions] = useState<LocationSuggestion[]>([]);
  const [isLoadingLocations, setIsLoadingLocations] = useState(false);
  const [isLocationSheetOpen, setIsLocationSheetOpen] = useState(false);
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);

  // Filter states: selectedVibe, selectedCrowd, selectedTag
  const [selectedVibe, setSelectedVibe] = useState<string | null>(null);
  const [selectedCrowd, setSelectedCrowd] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // 1 & 4) Mapbox Geocoding API integration with 300ms debounce
  useEffect(() => {
    const trimmed = searchQuery.trim();
    if (!trimmed) {
      return;
    }

    const abortController = new AbortController();

    const timer = setTimeout(async () => {
      setIsLoadingLocations(true);
      try {
        const token =
          process.env.NEXT_PUBLIC_MAPBOX_TOKEN ||
          process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN ||
          "";

        if (!token) {
          throw new Error("Mapbox token not configured");
        }

        const endpoint = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          trimmed
        )}.json?access_token=${token}&types=place,locality,neighborhood,district&autocomplete=true&limit=8`;

        const res = await fetch(endpoint, { signal: abortController.signal });
        if (!res.ok) {
          throw new Error(`Mapbox API returned ${res.status}`);
        }

        const data = await res.json();
        if (Array.isArray(data.features) && data.features.length > 0) {
          const mapped: LocationSuggestion[] = data.features.map(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (feature: any) => {
              const contextCity = feature.context?.find(
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (c: any) => c.id.startsWith("place")
              )?.text;

              const rawType = feature.place_type?.[0] || "place";
              const formattedType =
                rawType === "place"
                  ? "City"
                  : rawType === "neighborhood"
                  ? "Neighborhood"
                  : rawType === "locality"
                  ? "Area"
                  : rawType === "district"
                  ? "District"
                  : rawType;

              return {
                id: feature.id,
                name: feature.text,
                fullName: feature.place_name,
                latitude: feature.center[1],
                longitude: feature.center[0],
                placeType: formattedType,
                city: contextCity || feature.text,
                contextText: feature.place_name.startsWith(feature.text)
                  ? feature.place_name.slice(feature.text.length).replace(/^,\s*/, "")
                  : feature.place_name,
              };
            }
          );
          setLocationSuggestions(mapped);
        } else {
          setLocationSuggestions([]);
        }
      } catch (err: unknown) {
        if ((err as Error)?.name === "AbortError") return;

        // Graceful fallback to matching local cities if offline or token issues
        const q = trimmed.toLowerCase();
        const localMatches: LocationSuggestion[] = CITIES.filter(
          (c) =>
            c.name.toLowerCase().includes(q) ||
            c.region.toLowerCase().includes(q) ||
            c.badge.toLowerCase().includes(q) ||
            c.popularAreas.some((a) => a.toLowerCase().includes(q))
        ).map((c) => ({
          id: `local-${c.id}`,
          name: c.name,
          fullName: c.displayLocation,
          latitude: c.lat,
          longitude: c.lng,
          placeType: "City",
          city: c.name,
          contextText: c.region,
        }));

        setLocationSuggestions(localMatches);
      } finally {
        setIsLoadingLocations(false);
      }
    }, 300);

    return () => {
      clearTimeout(timer);
      abortController.abort();
    };
  }, [searchQuery]);

  // 3) On selecting a location:
  // - Store name + latitude + longitude
  // - Update selected location in app
  // - Close modal
  const handleSelectLocation = (location: {
    name: string;
    fullName?: string;
    latitude: number;
    longitude: number;
    city?: string;
  }) => {
    const newLocationData: SelectedLocationData = {
      name: location.name,
      fullName: location.fullName || location.name,
      latitude: location.latitude,
      longitude: location.longitude,
      city: location.city || location.name,
    };

    // Store name + latitude + longitude
    setSelectedLocationData(newLocationData);

    // Update selected location in app
    setSelectedLocation(location.fullName || location.name);
    const resolvedCity = location.city || location.name;
    setSelectedCity(resolvedCity);

    // Reset queries & suggestions
    setSearchQuery("");
    setLocationSuggestions([]);
    setIsLoadingLocations(false);
    setPlaceSearchQuery("");
    setDebouncedSearchQuery("");

    // Close modal
    setIsLocationSheetOpen(false);

    // Sync active map place with first spot in the new city if exists
    const firstPlace = PLACES.find(
      (p) => p.city.toLowerCase() === resolvedCity.toLowerCase()
    );
    if (firstPlace) {
      setSelectedMapPlace(firstPlace);
    }
  };

  const handleSelectCity = (city: CityItem) => {
    handleSelectLocation({
      name: city.name,
      fullName: city.displayLocation,
      latitude: city.lat,
      longitude: city.lng,
      city: city.name,
    });
  };

  // Keyboard navigation & scroll locking for bottom sheet
  useEffect(() => {
    if (!isLocationSheetOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsLocationSheetOpen(false);
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isLocationSheetOpen]);

  const handleUseCurrentLocation = () => {
    setIsDetectingLocation(true);
    const puneCity = CITIES.find((c) => c.name === "Pune") || CITIES[0];
    if (typeof navigator !== "undefined" && "geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        () => {
          handleSelectCity(puneCity);
          setIsDetectingLocation(false);
        },
        () => {
          handleSelectCity(puneCity);
          setIsDetectingLocation(false);
        },
        { timeout: 2500 }
      );
    } else {
      handleSelectCity(puneCity);
      setIsDetectingLocation(false);
    }
  };

  // 5) Persist saved items using localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("nearby_pune_saved_places");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // eslint-disable-next-line react-hooks/set-state-in-effect
          setBookmarkedIds(parsed);
        }
      }
    } catch {
      // Fallback silently if localStorage is restricted
    }
  }, []);

  const toggleBookmark = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setBookmarkedIds((prev) => {
      const updated = prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id];
      try {
        localStorage.setItem("nearby_pune_saved_places", JSON.stringify(updated));
      } catch {
        // Fallback silently
      }
      return updated;
    });
  };

  // 4) Filter Click Handler: toggles filter ON/OFF
  const handlePillClick = (pill: FilterPill) => {
    if (pill.type === "vibe") {
      setSelectedVibe((prev) => (prev === pill.value ? null : pill.value));
    } else if (pill.type === "crowd") {
      setSelectedCrowd((prev) => (prev === pill.value ? null : pill.value));
    } else if (pill.type === "tag") {
      setSelectedTag((prev) => (prev === pill.value ? null : pill.value));
    }
  };

  const isPillActive = (pill: FilterPill) => {
    if (pill.type === "vibe") return selectedVibe === pill.value;
    if (pill.type === "crowd") return selectedCrowd === pill.value;
    if (pill.type === "tag") return selectedTag === pill.value;
    return false;
  };

  // 3) Switch to Map view focusing on a specific place
  const handleOpenMapWithPlace = (place: Place, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSelectedMapPlace(place);
    setViewMode("map");
  };

  // 3) Filter logic:
  // Only show places where:
  // - place.city === selectedCity
  // - AND matches selected filters (if any)
  const filteredPlaces = PLACES.filter((place) => {
    // 6) Bottom Nav Saved Tab filter
    if (activeNavTab === "saved" && !bookmarkedIds.includes(place.id)) {
      return false;
    }

    // 1. City filter
    if (place.city.toLowerCase() !== selectedCity.toLowerCase()) {
      return false;
    }

    // 2. Vibe filter (e.g. Chill, Lively)
    if (selectedVibe && place.vibe.toLowerCase() !== selectedVibe.toLowerCase()) {
      return false;
    }

    // 3. Crowd filter (e.g. Low, Medium, High)
    if (selectedCrowd && place.crowd.toLowerCase() !== selectedCrowd.toLowerCase()) {
      return false;
    }

    // 4. Tag filter (e.g. Trending, Hidden Gems)
    if (selectedTag && !place.filterTags.includes(selectedTag)) {
      return false;
    }

    // 5. Search query: works across place name, category (e.g. cafe, heritage), and vibe (e.g. chill, lively)
    const query = debouncedSearchQuery.toLowerCase().trim();
    if (!query) return true;

    // Supports both single-term and multi-term searches (e.g. "chill cafe") across name, category, and vibe
    const terms = query.split(/\s+/).filter(Boolean);
    return terms.every(
      (term) =>
        place.name.toLowerCase().includes(term) ||
        place.category.toLowerCase().includes(term) ||
        place.vibe.toLowerCase().includes(term) ||
        place.area.toLowerCase().includes(term) ||
        place.description.toLowerCase().includes(term) ||
        place.filterTags.some((tag) => tag.toLowerCase().includes(term))
    );
  });

  // Derive active map place from filtered places safely without setState in effect
  const currentMapPlace =
    selectedMapPlace && filteredPlaces.some((p) => p.id === selectedMapPlace.id)
      ? selectedMapPlace
      : filteredPlaces[0] || null;

  const activeFilters = [
    selectedVibe,
    selectedCrowd ? `${selectedCrowd} Crowd` : null,
    selectedTag,
  ].filter(Boolean);
  const activeFilterSummary = activeFilters.join(" + ");

  const getCrowdBadgeStyle = (level: string) => {
    const l = level.toLowerCase();
    switch (l) {
      case "low":
        return {
          pill: "bg-emerald-50 text-emerald-700 border-emerald-200/90",
          dot: "bg-emerald-500",
        };
      case "medium":
      case "moderate":
        return {
          pill: "bg-amber-50 text-amber-700 border-amber-200/90",
          dot: "bg-amber-500",
        };
      case "high":
      case "busy":
      default:
        return {
          pill: "bg-rose-50 text-rose-700 border-rose-200/90",
          dot: "bg-rose-500",
        };
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#1A1A1A] font-['Poppins',sans-serif] px-4 py-6 sm:px-6 md:px-10 md:py-10 pb-28 sm:pb-32 antialiased selection:bg-[#FF5B00]/15 selection:text-[#FF5B00]">
      <main className="mx-auto w-full max-w-[1180px] flex flex-col gap-8 md:gap-10">
        {/* ============================================================ */}
        {/* HEADER SECTION                                               */}
        {/* ============================================================ */}
        <section className="flex flex-col gap-5 sm:gap-6">
          <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-[#EAEAEA] pb-5 sm:pb-6">
            {/* Left side: App name (bold, larger) + Location (smaller, lighter text below) */}
            <div className="flex flex-col items-start gap-1 min-w-0">
              <h1 className="flex items-center gap-2.5 text-2xl sm:text-3xl font-extrabold tracking-tight text-[#1A1A1A]">
                {/* Logo: App Icon (Orange tile with magnifying glass and compass needle) */}
                <svg
                  className="h-[22px] w-[22px] sm:h-6 sm:w-6 shrink-0"
                  viewBox="0 0 100 100"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <rect width="100" height="100" rx="24" fill="#FF5B00" />
                  <circle
                    cx="46"
                    cy="46"
                    r="25"
                    fill="none"
                    stroke="white"
                    strokeWidth="6.5"
                  />
                  <path
                    d="M63.5 63.5L74 74"
                    stroke="white"
                    strokeWidth="6.5"
                    strokeLinecap="round"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    fill="white"
                    d="M62 30L52.5 52.5L30 62L39.5 39.5Z M46 39.5A6.5 6.5 0 1 0 46 52.5A6.5 6.5 0 1 0 46 39.5Z"
                  />
                </svg>
                <span>Nearby Discovery</span>
              </h1>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setLocationSuggestions([]);
                  setIsLoadingLocations(false);
                  setIsLocationSheetOpen(true);
                }}
                className="group inline-flex items-center gap-1.5 text-xs sm:text-sm text-[#6B6B6B] hover:text-[#FF5B00] transition-colors cursor-pointer text-left py-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5B00]/40 rounded-md"
                aria-label={`Select location, currently ${selectedLocation}`}
                aria-haspopup="dialog"
                aria-expanded={isLocationSheetOpen}
              >
                <svg
                  className="h-4 w-4 shrink-0 text-[#FF5B00] transition-transform duration-200 group-hover:scale-110"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span className="font-medium text-[#4A4A4A] group-hover:text-[#FF5B00] transition-colors">
                  {selectedLocation}
                </span>
                <svg
                  className="h-3.5 w-3.5 shrink-0 text-[#8A8A8A] transition-transform duration-200 group-hover:translate-y-0.5 group-hover:text-[#FF5B00]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.2}
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            </div>

            {/* 3) LIST ↔ MAP TOGGLE */}
            <div className="inline-flex shrink-0 self-start sm:self-auto items-center p-1 rounded-full bg-[#F2F2F2] border border-[#EAEAEA] shadow-inner">
              <button
                type="button"
                onClick={() => setViewMode("list")}
                className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold transition-all duration-200 cursor-pointer ${
                  viewMode === "list"
                    ? "bg-[#FF5B00] text-white shadow-[0_2px_8px_rgba(255,91,0,0.3)]"
                    : "bg-transparent text-[#6B6B6B] hover:text-[#1A1A1A]"
                }`}
              >
                <svg
                  className="h-3.5 w-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
                List
              </button>
              <button
                type="button"
                onClick={() => setViewMode("map")}
                className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold transition-all duration-200 cursor-pointer ${
                  viewMode === "map"
                    ? "bg-[#FF5B00] text-white shadow-[0_2px_8px_rgba(255,91,0,0.3)]"
                    : "bg-transparent text-[#6B6B6B] hover:text-[#1A1A1A]"
                }`}
              >
                <svg
                  className="h-3.5 w-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                  />
                </svg>
                Map
              </button>
            </div>
          </header>

          {/* 7) SEARCH: Filters places by name or category */}
          <div className="w-full md:max-w-2xl md:mx-auto">
            <div className="relative flex items-center">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-[#8A8A8A]">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-4.35-4.35m1.85-5.15a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                type="text"
                value={placeSearchQuery}
                onChange={(e) => setPlaceSearchQuery(e.target.value)}
                placeholder="Search by name, vibe, or category (e.g. cafes, heritage, markets)"
                className="w-full rounded-full border border-[#EAEAEA] bg-white py-3.5 pl-11 pr-11 text-sm text-[#1A1A1A] placeholder-[#8A8A8A] shadow-[0_2px_8px_rgba(0,0,0,0.03)] outline-none transition duration-200 focus:border-[#FF5B00] focus:ring-4 focus:ring-[#FF5B00]/10"
              />
              {placeSearchQuery && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className="absolute inset-y-0 right-0 flex items-center pr-4 text-[#8A8A8A] hover:text-[#FF5B00] transition-colors cursor-pointer"
                >
                  <span className="sr-only">Clear search</span>
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* 2) FILTERS: Interactive Pills */}
          <div className="w-full flex justify-start sm:justify-center overflow-x-auto no-scrollbar px-1 py-1">
            <div className="flex items-center gap-2.5 sm:gap-3 min-w-max mx-auto sm:mx-0">
              {FILTER_PILLS.map((pill) => {
                const isActive = isPillActive(pill);

                return (
                  <button
                    key={pill.id}
                    type="button"
                    onClick={() => handlePillClick(pill)}
                    className={`shrink-0 inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold border transition-all duration-200 cursor-pointer ${
                      isActive
                        ? "bg-[#FF5B00] text-white shadow-[0_3px_10px_rgba(255,91,0,0.3)] border-[#FF5B00] scale-[1.02]"
                        : "bg-white text-[#6B6B6B] border-[#EAEAEA] hover:border-[#D4D4D4] hover:text-[#1A1A1A] active:scale-95"
                    }`}
                  >
                    <span className={isActive ? "text-white" : "text-[#8A8A8A]"}>
                      {pill.icon}
                    </span>
                    <span>{pill.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* CARDS LIST OR REAL LEAFLET MAP VIEW                          */}
        {/* ============================================================ */}
        {viewMode === "list" ? (
          <section className="flex flex-col gap-6">
            {/* Section Header with Dynamic Result Count */}
            <div className="flex items-center justify-between border-b border-[#EAEAEA] pb-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#1A1A1A]">
                  {activeNavTab === "saved"
                    ? "Saved Places"
                    : activeNavTab === "activity"
                    ? "Recent Discovery Activity"
                    : activeNavTab === "profile"
                    ? "Explorer Profile"
                    : debouncedSearchQuery.trim()
                    ? `Results for "${debouncedSearchQuery.trim()}"`
                    : activeFilterSummary
                    ? `${activeFilterSummary} Places`
                    : `Trending in ${selectedCity}`}
                </h2>
                <p className="text-xs text-[#6B6B6B] font-normal mt-0.5">
                  {debouncedSearchQuery.trim()
                    ? `Matching name, category, or vibe in ${selectedCity}`
                    : "Curated by proximity and local character"}
                </p>
              </div>

              {/* Result Count Badge */}
              <span className="inline-flex items-center rounded-full bg-[#FF5B00]/10 px-3.5 py-1 text-xs font-bold text-[#FF5B00] border border-[#FF5B00]/20 shadow-xs">
                {filteredPlaces.length} {filteredPlaces.length === 1 ? "place" : "places"}
              </span>
            </div>

            {/* 6) Active Nav Tab = "activity" View */}
            {activeNavTab === "activity" ? (
              <div className="rounded-3xl border border-[#EAEAEA] bg-white p-6 sm:p-8 flex flex-col gap-4 shadow-sm">
                <h3 className="text-base font-bold text-[#1A1A1A]">Real-Time Pune Activity</h3>
                <div className="flex flex-col gap-3">
                  <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#FAFAFA] border border-[#EAEAEA]">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-rose-100 text-rose-600 font-bold text-xs">
                      🔥
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-[#1A1A1A]">High Morning Crowd at Vohuman Cafe</p>
                      <p className="text-xs text-[#6B6B6B]">Estimated 15–20 min rush queue for bun maska & cheese omelettes.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#FAFAFA] border border-[#EAEAEA]">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 font-bold text-xs">
                      🌿
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-[#1A1A1A]">Quiet Hours at Osho Teerth Park</p>
                      <p className="text-xs text-[#6B6B6B]">Serene bamboo walk conditions with zero wait time right now.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#FAFAFA] border border-[#EAEAEA]">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-600 font-bold text-xs">
                      🛍️
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-[#1A1A1A]">Evening Street Bazaar Active at FC Road</p>
                      <p className="text-xs text-[#6B6B6B]">Bookstalls and food vendors opening along Fergusson College Road.</p>
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveNavTab("discover")}
                  className="self-start mt-2 inline-flex items-center gap-1.5 rounded-xl bg-[#FF5B00] px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-[#E05000] transition cursor-pointer"
                >
                  Browse All Places
                </button>
              </div>
            ) : activeNavTab === "profile" ? (
              /* 6) Active Nav Tab = "profile" View */
              <div className="rounded-3xl border border-[#EAEAEA] bg-white p-6 sm:p-8 flex flex-col gap-5 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#FF5B00] text-white text-xl font-bold shadow-md">
                    RS
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#1A1A1A]">Pune City Explorer</h3>
                    <p className="text-xs text-[#6B6B6B]">Active Discovery Member · Level 2</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div className="rounded-2xl border border-[#EAEAEA] bg-[#FAFAFA] p-4 text-center">
                    <span className="text-xl font-bold text-[#FF5B00]">{bookmarkedIds.length}</span>
                    <p className="text-xs text-[#6B6B6B] mt-0.5">Saved Places</p>
                  </div>
                  <div className="rounded-2xl border border-[#EAEAEA] bg-[#FAFAFA] p-4 text-center">
                    <span className="text-xl font-bold text-[#1A1A1A]">8</span>
                    <p className="text-xs text-[#6B6B6B] mt-0.5">Curated Spots</p>
                  </div>
                  <div className="rounded-2xl border border-[#EAEAEA] bg-[#FAFAFA] p-4 text-center col-span-2 sm:col-span-1">
                    <span className="text-xl font-bold text-emerald-600">MH-12</span>
                    <p className="text-xs text-[#6B6B6B] mt-0.5">Home Territory</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveNavTab("discover")}
                  className="self-start mt-1 inline-flex items-center gap-1.5 rounded-xl bg-[#FF5B00] px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-[#E05000] transition cursor-pointer"
                >
                  Return to Discovery
                </button>
              </div>
            ) : (
              /* High-Signal Cards Grid */
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-7 items-start">
                {filteredPlaces.map((place) => {
                  const isBookmarked = bookmarkedIds.includes(place.id);
                  const crowdStyle = getCrowdBadgeStyle(place.crowd);

                  return (
                    <article
                      key={place.id}
                      onClick={() => setSelectedModalPlace(place)}
                      tabIndex={0}
                      role="button"
                      aria-label={`View details for ${place.name}`}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setSelectedModalPlace(place);
                        }
                      }}
                      className="group relative flex flex-col justify-between overflow-hidden rounded-[24px] border border-[#EAEAEA] bg-white shadow-[0_2px_10px_rgba(0,0,0,0.03)] transition-all duration-300 hover:-translate-y-1 hover:border-[#D4D4D4] hover:shadow-[0_16px_36px_rgba(0,0,0,0.08)] cursor-pointer text-left focus:outline-none focus:ring-2 focus:ring-[#FF5B00]/30"
                    >
                      {/* Top Image Section */}
                      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#F2F2F2]">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={place.image}
                          alt={place.name}
                          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                          loading="lazy"
                        />

                        {/* Ambient Gradient Overlay */}
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-black/35" />

                        {/* Rank Badge */}
                        <span className="absolute top-3.5 left-3.5 inline-flex items-center rounded-full bg-black/50 backdrop-blur-md px-3 py-1 text-[11px] font-bold tracking-wider text-white border border-white/20 shadow-xs">
                          #{place.rank}
                        </span>

                        {/* 5) Bookmark Icon: Toggles saved state & persists to localStorage */}
                        <button
                          type="button"
                          onClick={(e) => toggleBookmark(place.id, e)}
                          className={`absolute top-3.5 right-3.5 flex h-8 w-8 items-center justify-center rounded-full backdrop-blur-md border transition-all duration-200 active:scale-90 shadow-xs cursor-pointer ${
                            isBookmarked
                              ? "bg-[#FF5B00] text-white border-[#FF5B00]"
                              : "bg-black/45 text-white border-white/20 hover:bg-black/65"
                          }`}
                          title={isBookmarked ? "Saved to collection" : "Save location"}
                          aria-label="Save bookmark"
                        >
                          <svg
                            className="h-4 w-4"
                            fill={isBookmarked ? "currentColor" : "none"}
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                            />
                          </svg>
                        </button>

                        {/* Distance Badge */}
                        <span className="absolute bottom-3.5 right-3.5 inline-flex items-center gap-1.5 rounded-full bg-black/55 backdrop-blur-md px-3 py-1 text-xs font-semibold text-white border border-white/20 shadow-xs">
                          <svg
                            className="h-3.5 w-3.5 text-white/90"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                          {place.distance}
                        </span>
                      </div>

                      {/* Card Content Area */}
                      <div className="flex flex-col p-5 sm:p-6">
                        {/* Category */}
                        <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.14em] uppercase text-[#FF5B00]">
                          {place.category}
                        </span>

                        {/* Place Name + Price Indicator */}
                        <div className="mt-1 flex items-baseline justify-between gap-3">
                          <h3 className="text-lg sm:text-[1.28rem] font-bold tracking-tight text-[#1A1A1A] group-hover:text-[#FF5B00] transition-colors leading-snug">
                            {place.name}
                          </h3>
                          <span
                            className="shrink-0 font-bold text-xs tracking-wider text-[#6B6B6B] bg-[#F4F4F4] px-2.5 py-1 rounded-md border border-[#EAEAEA] self-start ml-2"
                            title={`Price level: ${place.price}`}
                          >
                            {place.price}
                          </span>
                        </div>

                        {/* Smart Pills: Crowd Status & Best Time */}
                        <div className="mt-2.5 flex flex-wrap items-center gap-2">
                          {/* Crowd Pill */}
                          <span
                            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-0.5 text-[11px] font-semibold border ${crowdStyle.pill}`}
                          >
                            <span className={`h-1.5 w-1.5 rounded-full ${crowdStyle.dot}`} />
                            {place.crowdStatus}
                          </span>

                          {/* Best Time Pill */}
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F4F4F4] px-3 py-0.5 text-[11px] font-medium text-[#6B6B6B] border border-[#EAEAEA]">
                            <svg
                              className="h-3 w-3 text-[#8A8A8A]"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={1.8}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                            {place.bestTime}
                          </span>
                        </div>

                        {/* Description (max 2 lines) */}
                        <p className="mt-3 text-[13px] leading-[1.6] text-[#6B6B6B] font-normal line-clamp-2">
                          {place.description}
                        </p>

                        {/* Bottom Row: Vibe + Action Buttons */}
                        <div className="mt-4 pt-3.5 border-t border-[#EAEAEA] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          {/* Vibe Line */}
                          <div className="text-xs text-[#6B6B6B]">
                            <span className="font-semibold text-[#1A1A1A] mr-1.5">Vibe:</span>
                            <span>{place.vibe}</span>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                            {/* Map Button: Switches to map view with this place selected */}
                            <button
                              type="button"
                              onClick={(e) => handleOpenMapWithPlace(place, e)}
                              className="inline-flex items-center gap-1.5 rounded-xl border border-[#EAEAEA] bg-[#F7F7F7] px-3 py-1.5 text-xs font-semibold text-[#1A1A1A] hover:bg-[#00CBD0]/10 hover:border-[#00CBD0]/50 hover:text-[#008A8E] transition-all duration-200 cursor-pointer shadow-xs"
                            >
                              <svg
                                className="h-3.5 w-3.5 text-[#6B6B6B]"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                                />
                              </svg>
                              Map
                            </button>

                            {/* Details Button: Opens detail modal */}
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedModalPlace(place);
                              }}
                              className="inline-flex items-center gap-1.5 rounded-xl bg-[#FF5B00] px-3.5 py-1.5 text-xs font-semibold text-white shadow-[0_2px_8px_rgba(255,91,0,0.3)] hover:bg-[#E05000] active:scale-95 transition-all duration-200 cursor-pointer"
                            >
                              <span>Details</span>
                              <svg
                                className="h-3.5 w-3.5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M9 5l7 7-7 7"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </article>
                  );
                })}

                {/* Empty State */}
                {filteredPlaces.length === 0 && (
                  <div className="col-span-full py-14 text-center rounded-3xl border border-dashed border-[#EAEAEA] bg-white p-8">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#FAFAFA] text-[#8A8A8A] mb-3 border border-[#EAEAEA]">
                      <svg
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21 21l-4.35-4.35m1.85-5.15a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                    </div>
                    <p className="text-base font-semibold text-[#1A1A1A]">
                      {debouncedSearchQuery.trim()
                        ? `No results found for "${debouncedSearchQuery.trim()}"`
                        : "No matching places. Try changing filters."}
                    </p>
                    <p className="mt-1 text-xs text-[#6B6B6B] max-w-md mx-auto">
                      {debouncedSearchQuery.trim()
                        ? `No places in ${selectedCity} match this search. Try searching by place name, category (e.g. cafe, heritage), or vibe (chill, lively).`
                        : activeNavTab === "saved"
                        ? "Click the bookmark icon on any card to save places to your personal list."
                        : `No places in ${selectedCity} match the current combination of vibe and crowd filters.`}
                    </p>
                    <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
                      {debouncedSearchQuery.trim() && (
                        <button
                          type="button"
                          onClick={handleClearSearch}
                          className="inline-flex items-center rounded-xl bg-[#FF5B00] px-4 py-2 text-xs font-semibold text-white shadow-[0_2px_8px_rgba(255,91,0,0.3)] hover:bg-[#E05000] transition cursor-pointer"
                        >
                          Clear search
                        </button>
                      )}
                      {(selectedVibe || selectedCrowd || selectedTag) && (
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedVibe(null);
                            setSelectedCrowd(null);
                            setSelectedTag(null);
                            handleClearSearch();
                            setActiveNavTab("discover");
                          }}
                          className="inline-flex items-center rounded-xl bg-[#FAFAFA] border border-[#EAEAEA] px-4 py-2 text-xs font-semibold text-[#6B6B6B] hover:text-[#1A1A1A] hover:bg-[#F2F2F2] transition cursor-pointer"
                        >
                          Reset filters
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </section>
        ) : (
          /* ============================================================ */
          /* 4) REAL LEAFLET MAP VIEW WITH LAT/LNG MARKERS                */
          /* ============================================================ */
          <section className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#1A1A1A]">
                  Interactive {selectedCity} Map
                </h2>
                <p className="text-xs text-[#6B6B6B]">
                  Showing real lat/lng coordinates across {selectedCity} with OpenStreetMap tiles
                </p>
              </div>
              <button
                type="button"
                onClick={() => setViewMode("list")}
                className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 text-xs font-bold text-[#1A1A1A] shadow-sm border border-[#EAEAEA] hover:border-[#FF5B00] hover:text-[#FF5B00] transition cursor-pointer"
              >
                Back to List
              </button>
            </div>

            <RealLeafletMap
              places={filteredPlaces}
              selectedPlace={currentMapPlace}
              onSelectPlace={(place) => setSelectedMapPlace(place)}
              onOpenDetails={(place) => setSelectedModalPlace(place)}
            />
          </section>
        )}
      </main>

      {/* ============================================================ */}
      {/* 6) FUNCTIONAL FLOATING BOTTOM NAV                            */ }
      {/* ============================================================ */}
      <nav
        aria-label="Bottom Navigation"
        className="fixed bottom-5 inset-x-0 z-40 flex justify-center pointer-events-none px-4"
      >
        <div className="pointer-events-auto inline-flex items-center gap-1.5 rounded-full bg-white/90 backdrop-blur-xl px-2.5 py-1.5 shadow-[0_12px_32px_rgba(0,0,0,0.12)] border border-[#EAEAEA]/80">
          {/* Discover Tab */}
          <button
            type="button"
            onClick={() => {
              setActiveNavTab("discover");
              setViewMode("list");
            }}
            className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold transition-all duration-200 cursor-pointer ${
              activeNavTab === "discover" && viewMode === "list"
                ? "bg-[#FF5B00] text-white shadow-[0_2px_8px_rgba(255,91,0,0.3)]"
                : "text-[#6B6B6B] hover:text-[#1A1A1A] hover:bg-black/5"
            }`}
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 21a9 9 0 100-18 9 9 0 000 18z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.25 9.75l-4.5 1.5 1.5 4.5 4.5-1.5-1.5-4.5z"
              />
            </svg>
            <span>Discover</span>
          </button>

          {/* Saved Tab */}
          <button
            type="button"
            onClick={() => {
              setActiveNavTab("saved");
              setViewMode("list");
            }}
            className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold transition-all duration-200 cursor-pointer ${
              activeNavTab === "saved"
                ? "bg-[#FF5B00] text-white shadow-[0_2px_8px_rgba(255,91,0,0.3)]"
                : "text-[#6B6B6B] hover:text-[#1A1A1A] hover:bg-black/5"
            }`}
          >
            <svg
              className="h-4 w-4"
              fill={activeNavTab === "saved" ? "currentColor" : "none"}
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
              />
            </svg>
            <span>Saved</span>
            {bookmarkedIds.length > 0 && (
              <span
                className={`ml-0.5 rounded-full px-1.5 py-0.2 text-[10px] font-bold ${
                  activeNavTab === "saved"
                    ? "bg-white text-[#FF5B00]"
                    : "bg-[#FF5B00]/10 text-[#FF5B00]"
                }`}
              >
                {bookmarkedIds.length}
              </span>
            )}
          </button>

          {/* Activity Tab */}
          <button
            type="button"
            onClick={() => {
              setActiveNavTab("activity");
              setViewMode("list");
            }}
            className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold transition-all duration-200 cursor-pointer ${
              activeNavTab === "activity"
                ? "bg-[#FF5B00] text-white shadow-[0_2px_8px_rgba(255,91,0,0.3)]"
                : "text-[#6B6B6B] hover:text-[#1A1A1A] hover:bg-black/5"
            }`}
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>Activity</span>
          </button>

          {/* Profile Tab */}
          <button
            type="button"
            onClick={() => {
              setActiveNavTab("profile");
              setViewMode("list");
            }}
            className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold transition-all duration-200 cursor-pointer ${
              activeNavTab === "profile"
                ? "bg-[#FF5B00] text-white shadow-[0_2px_8px_rgba(255,91,0,0.3)]"
                : "text-[#6B6B6B] hover:text-[#1A1A1A] hover:bg-black/5"
            }`}
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
              />
            </svg>
            <span>Profile</span>
          </button>
        </div>
      </nav>

      {/* ============================================================ */}
      {/* INTERACTIVE DETAIL MODAL                                     */}
      {/* ============================================================ */}
      {selectedModalPlace && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-opacity"
          onClick={() => setSelectedModalPlace(null)}
        >
          <div
            className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white shadow-2xl border border-[#EAEAEA] p-6 sm:p-7 flex flex-col gap-4 text-left"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              type="button"
              onClick={() => setSelectedModalPlace(null)}
              className="absolute top-5 right-5 flex h-8 w-8 items-center justify-center rounded-full bg-[#F4F4F4] text-[#6B6B6B] hover:bg-[#EAEAEA] hover:text-[#1A1A1A] transition cursor-pointer"
              aria-label="Close modal"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Modal Image */}
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-[#F2F2F2]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={selectedModalPlace.image}
                alt={selectedModalPlace.name}
                className="h-full w-full object-cover"
              />
              <span className="absolute top-3.5 left-3.5 rounded-full bg-black/50 backdrop-blur-md px-3 py-1 text-xs font-bold text-white border border-white/20">
                Rank #{selectedModalPlace.rank}
              </span>
              <span className="absolute bottom-3.5 right-3.5 rounded-full bg-black/60 backdrop-blur-md px-3 py-1 text-xs font-semibold text-white border border-white/20">
                {selectedModalPlace.distance}
              </span>
            </div>

            {/* Content Details */}
            <div>
              <div className="flex items-center justify-between gap-3">
                <span className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#FF5B00]">
                  {selectedModalPlace.category}
                </span>
                <span className="font-semibold text-sm text-[#6B6B6B] bg-[#F4F4F4] px-2.5 py-0.5 rounded-md border border-[#EAEAEA]">
                  {selectedModalPlace.price}
                </span>
              </div>
              <h2 className="mt-1 text-2xl font-bold tracking-tight text-[#1A1A1A]">
                {selectedModalPlace.name}
              </h2>
              <div className="mt-2.5 flex flex-wrap items-center gap-2">
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold border ${
                    getCrowdBadgeStyle(selectedModalPlace.crowd).pill
                  }`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      getCrowdBadgeStyle(selectedModalPlace.crowd).dot
                    }`}
                  />
                  {selectedModalPlace.crowdStatus}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F4F4F4] px-3 py-1 text-[11px] font-medium text-[#6B6B6B] border border-[#EAEAEA]">
                  {selectedModalPlace.bestTime}
                </span>
              </div>
              <p className="mt-3.5 text-sm leading-relaxed text-[#6B6B6B]">
                {selectedModalPlace.description}
              </p>
            </div>

            {/* Modal Vibe & Actions */}
            <div className="mt-2 pt-4 border-t border-[#EAEAEA] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="text-xs text-[#6B6B6B]">
                <span className="font-semibold text-[#1A1A1A] mr-1.5">Vibe:</span>
                <span>{selectedModalPlace.vibe}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={(e) => toggleBookmark(selectedModalPlace.id, e)}
                  className={`inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-semibold border transition cursor-pointer ${
                    bookmarkedIds.includes(selectedModalPlace.id)
                      ? "bg-[#FF5B00] text-white border-[#FF5B00]"
                      : "bg-white text-[#1A1A1A] border-[#EAEAEA] hover:bg-[#F4F4F4]"
                  }`}
                >
                  <svg
                    className="h-3.5 w-3.5"
                    fill={
                      bookmarkedIds.includes(selectedModalPlace.id)
                        ? "currentColor"
                        : "none"
                    }
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                    />
                  </svg>
                  {bookmarkedIds.includes(selectedModalPlace.id) ? "Saved" : "Save"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const place = selectedModalPlace;
                    setSelectedModalPlace(null);
                    handleOpenMapWithPlace(place);
                  }}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-[#EAEAEA] bg-[#F7F7F7] px-4 py-2 text-xs font-semibold text-[#1A1A1A] hover:bg-[#00CBD0]/10 hover:border-[#00CBD0]/50 hover:text-[#008A8E] transition cursor-pointer"
                >
                  View on Map
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedModalPlace(null)}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-[#FF5B00] px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-[#E05000] transition cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* LOCATION SELECTOR BOTTOM SHEET MODAL                         */}
      {/* ============================================================ */}
      {isLocationSheetOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="location-sheet-title"
          className="fixed inset-0 z-50 flex items-end justify-center"
        >
          {/* Backdrop overlay */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs animate-backdrop-fade-in"
            onClick={() => setIsLocationSheetOpen(false)}
            aria-hidden="true"
          />

          {/* Bottom Sheet Panel */}
          <div
            className="relative z-10 w-full max-w-lg rounded-t-[28px] sm:rounded-t-[32px] bg-white border-t border-[#EAEAEA] shadow-[0_-12px_40px_rgba(0,0,0,0.18)] max-h-[85vh] flex flex-col text-left overflow-hidden animate-sheet-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Pull Bar / Drag Handle */}
            <div className="pt-3 pb-1 flex justify-center shrink-0">
              <div className="h-1.5 w-12 rounded-full bg-[#E0E0E0]" />
            </div>

            {/* Header: Title + Close Button */}
            <div className="px-5 sm:px-6 pt-2 pb-4 flex items-center justify-between border-b border-[#F0F0F0]">
              <div>
                <h3
                  id="location-sheet-title"
                  className="text-lg sm:text-xl font-bold text-[#1A1A1A] tracking-tight"
                >
                  Select Location
                </h3>
                <p className="text-xs text-[#7A7A7A] mt-0.5">
                  Find spots and curated places in your city
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsLocationSheetOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F4F4F4] text-[#6B6B6B] hover:bg-[#EAEAEA] hover:text-[#1A1A1A] transition cursor-pointer"
                aria-label="Close location selector"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Sheet Scrollable Content */}
            <div className="px-5 sm:px-6 py-4 overflow-y-auto flex flex-col gap-4">
              {/* Search input */}
              <div className="relative flex items-center">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-[#8A8A8A]">
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-4.35-4.35m1.85-5.15a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    const val = e.target.value;
                    setSearchQuery(val);
                    if (!val.trim()) {
                      setLocationSuggestions([]);
                      setIsLoadingLocations(false);
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && locationSuggestions.length > 0) {
                      handleSelectLocation(locationSuggestions[0]);
                    } else if (e.key === "Escape") {
                      setSearchQuery("");
                      setLocationSuggestions([]);
                      setIsLoadingLocations(false);
                    }
                  }}
                  placeholder="Search city or area"
                  className="w-full rounded-2xl border border-[#EAEAEA] bg-[#FAFAFA] py-3 pl-10 pr-10 text-sm text-[#1A1A1A] placeholder-[#8A8A8A] outline-none transition focus:border-[#FF5B00] focus:bg-white focus:ring-4 focus:ring-[#FF5B00]/10"
                />
                {isLoadingLocations && (
                  <div className="absolute inset-y-0 right-9 flex items-center pointer-events-none">
                    <svg
                      className="animate-spin h-4 w-4 text-[#FF5B00]"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8H4z"
                      />
                    </svg>
                  </div>
                )}
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery("");
                      setLocationSuggestions([]);
                      setIsLoadingLocations(false);
                    }}
                    className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-[#8A8A8A] hover:text-[#FF5B00] transition-colors cursor-pointer"
                  >
                    <span className="sr-only">Clear search</span>
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                )}
              </div>

              {/* Conditional Display: Search Results vs Default Suggested Cities */}
              {searchQuery.trim().length > 0 ? (
                /* 1) SEARCH RESULTS (Suggested Cities hidden) */
                <div className="flex flex-col gap-2 pt-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#8A8A8A]">
                      {isLoadingLocations ? "Searching locations..." : "Search results"}
                    </span>
                    {!isLoadingLocations && locationSuggestions.length > 0 && (
                      <span className="text-xs text-[#FF5B00] font-semibold">
                        {locationSuggestions.length} {locationSuggestions.length === 1 ? "location" : "locations"} found
                      </span>
                    )}
                  </div>

                  {/* 5) Loading state while fetching */}
                  {isLoadingLocations ? (
                    <div className="flex flex-col gap-1.5 py-1">
                      {[1, 2, 3].map((n) => (
                        <div
                          key={n}
                          className="w-full flex items-center justify-between p-3 rounded-2xl border border-[#EAEAEA] bg-[#FAFAFA]"
                        >
                          <div className="flex items-center gap-3 min-w-0 w-full animate-pulse">
                            <div className="h-9 w-9 shrink-0 rounded-xl bg-[#EAEAEA]" />
                            <div className="flex flex-col gap-1.5 w-3/4">
                              <div className="h-3.5 bg-[#EAEAEA] rounded w-2/5" />
                              <div className="h-2.5 bg-[#EAEAEA] rounded w-3/5" />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : locationSuggestions.length > 0 ? (
                    /* 2) Dropdown / list of suggestions from Mapbox Geocoding */
                    <div className="flex flex-col gap-1.5">
                      {locationSuggestions.map((suggestion) => {
                        const isSelected =
                          selectedLocationData.name.toLowerCase() ===
                            suggestion.name.toLowerCase() ||
                          selectedLocation.toLowerCase() ===
                            suggestion.fullName.toLowerCase();

                        return (
                          <button
                            key={suggestion.id}
                            type="button"
                            onClick={() => handleSelectLocation(suggestion)}
                            className={`w-full flex items-center justify-between p-3 rounded-2xl border transition-all duration-150 cursor-pointer text-left ${
                              isSelected
                                ? "bg-[#FF5B00]/8 border-[#FF5B00]/40 shadow-xs"
                                : "bg-[#FAFAFA] border-[#EAEAEA] hover:border-[#D4D4D4] hover:bg-white"
                            }`}
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <div
                                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
                                  isSelected
                                    ? "bg-[#FF5B00] text-white"
                                    : "bg-white border border-[#EAEAEA] text-[#6B6B6B]"
                                }`}
                              >
                                <svg
                                  className="h-4 w-4"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  strokeWidth={2}
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                  />
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                  />
                                </svg>
                              </div>
                              <div className="min-w-0">
                                <div className="flex items-center gap-2">
                                  <span
                                    className={`text-sm font-bold truncate ${
                                      isSelected ? "text-[#FF5B00]" : "text-[#1A1A1A]"
                                    }`}
                                  >
                                    {suggestion.name}
                                  </span>
                                  <span className="rounded bg-[#EAEAEA] px-1.5 py-0.5 text-[10px] font-semibold text-[#6B6B6B]">
                                    {suggestion.placeType}
                                  </span>
                                </div>
                                <p className="text-xs text-[#7A7A7A] truncate mt-0.5">
                                  {suggestion.contextText || suggestion.fullName}
                                </p>
                              </div>
                            </div>

                            {isSelected ? (
                              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#FF5B00] text-white">
                                <svg
                                  className="h-3.5 w-3.5"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  strokeWidth={3}
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                              </div>
                            ) : (
                              <div className="flex items-center gap-1.5 shrink-0 pl-2">
                                <span className="text-[10px] font-mono text-[#8A8A8A] hidden sm:inline">
                                  {suggestion.latitude.toFixed(2)}°, {suggestion.longitude.toFixed(2)}°
                                </span>
                                <span className="text-xs font-semibold text-[#FF5B00]">
                                  Select
                                </span>
                              </div>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  ) : (
                    /* 6) NO RESULTS FOUND */
                    <div className="py-10 px-4 text-center rounded-2xl border border-dashed border-[#EAEAEA] bg-[#FAFAFA]/70 my-2">
                      <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#8A8A8A] mb-2.5 border border-[#EAEAEA] shadow-2xs">
                        <svg
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={1.5}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      </div>
                      <p className="text-sm font-bold text-[#1A1A1A]">No cities found</p>
                      <p className="text-xs text-[#7A7A7A] mt-1 max-w-xs mx-auto">
                        No matching locations for &ldquo;{searchQuery.trim()}&rdquo;. Try searching for a city, area, or neighborhood.
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setSearchQuery("");
                          setLocationSuggestions([]);
                          setIsLoadingLocations(false);
                        }}
                        className="mt-3.5 inline-flex items-center gap-1.5 rounded-xl bg-white border border-[#EAEAEA] px-3.5 py-1.5 text-xs font-semibold text-[#FF5B00] hover:border-[#FF5B00]/40 transition cursor-pointer shadow-2xs"
                      >
                        View suggested cities
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                /* 3) EMPTY INPUT: SHOW SUGGESTED CITIES & CURRENT LOCATION */
                <>
                  {/* Button: "Use current location" */}
                  <button
                    type="button"
                    onClick={handleUseCurrentLocation}
                    disabled={isDetectingLocation}
                    className="w-full flex items-center justify-center gap-2.5 rounded-2xl bg-[#FF5B00]/10 hover:bg-[#FF5B00] text-[#FF5B00] hover:text-white border border-[#FF5B00]/25 px-4 py-3 text-sm font-semibold transition-all duration-200 cursor-pointer shadow-xs active:scale-[0.99] disabled:opacity-70 group"
                  >
                    <svg
                      className={`h-4 w-4 shrink-0 transition-transform ${
                        isDetectingLocation ? "animate-spin" : "group-hover:scale-110"
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      {isDetectingLocation ? (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                        />
                      ) : (
                        <>
                          <circle cx="12" cy="12" r="3" />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 2v3m0 14v3M2 12h3m14 0h3"
                          />
                          <circle cx="12" cy="12" r="7" strokeDasharray="3 3" />
                        </>
                      )}
                    </svg>
                    <span>
                      {isDetectingLocation ? "Detecting location..." : "Use current location"}
                    </span>
                  </button>

                  {/* Suggested Cities */}
                  <div className="flex flex-col gap-2 pt-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#8A8A8A]">
                      Suggested cities
                    </span>

                    <div className="flex flex-col gap-1.5">
                      {CITIES.map((city) => {
                        const isSelected = selectedCity.toLowerCase() === city.name.toLowerCase();

                        return (
                          <button
                            key={city.id}
                            type="button"
                            onClick={() => handleSelectCity(city)}
                            className={`w-full flex items-center justify-between p-3 rounded-2xl border transition-all duration-150 cursor-pointer text-left ${
                              isSelected
                                ? "bg-[#FF5B00]/8 border-[#FF5B00]/40 shadow-xs"
                                : "bg-[#FAFAFA] border-[#EAEAEA] hover:border-[#D4D4D4] hover:bg-white"
                            }`}
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <div
                                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
                                  isSelected
                                    ? "bg-[#FF5B00] text-white"
                                    : "bg-white border border-[#EAEAEA] text-[#6B6B6B]"
                                }`}
                              >
                                <svg
                                  className="h-4 w-4"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  strokeWidth={2}
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                  />
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                  />
                                </svg>
                              </div>
                              <div className="min-w-0">
                                <div className="flex items-center gap-2">
                                  <span
                                    className={`text-sm font-bold truncate ${
                                      isSelected ? "text-[#FF5B00]" : "text-[#1A1A1A]"
                                    }`}
                                  >
                                    {city.name}
                                  </span>
                                  <span className="rounded bg-[#EAEAEA] px-1.5 py-0.5 text-[10px] font-semibold text-[#6B6B6B]">
                                    {city.badge}
                                  </span>
                                </div>
                                <p className="text-xs text-[#7A7A7A] truncate mt-0.5">
                                  {city.region}
                                </p>
                              </div>
                            </div>

                            {isSelected && (
                              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#FF5B00] text-white">
                                <svg
                                  className="h-3.5 w-3.5"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  strokeWidth={3}
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                              </div>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Bottom safe area spacing */}
            <div className="h-4 sm:h-5" />
          </div>
        </div>
      )}
    </div>
  );
}
