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

function formatDistanceKm(distance: string): string {
  if (!distance) return "";
  const trimmed = distance.trim();
  if (trimmed.endsWith("km")) return trimmed;
  const match = trimmed.match(/^([\d.]+)\s*(?:mi|miles?)?$/i);
  if (match) {
    const miles = parseFloat(match[1]);
    if (!isNaN(miles)) {
      const km = miles * 1.609344;
      return `${km.toFixed(1)} km`;
    }
  }
  return trimmed;
}

const INITIAL_PLACES: Place[] = [
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

const PLACES: Place[] = INITIAL_PLACES.map((p) => ({
  ...p,
  distance: formatDistanceKm(p.distance),
}));

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
              background-color: ${isCurrent ? "#1769E0" : "#FFFFFF"};
              color: ${isCurrent ? "#FFFFFF" : "#172B4D"};
              border: 2px solid ${isCurrent ? "#1769E0" : "#DCE5EF"};
              box-shadow: 0 4px 14px rgba(23,43,77,0.18);
              padding: 4px 9px;
              border-radius: 9999px;
              font-family: 'Poppins', sans-serif;
              font-size: 11px;
              font-weight: 700;
              white-space: nowrap;
            ">
              <span style="
                background-color: ${isCurrent ? "#FFFFFF" : "#1769E0"};
                color: ${isCurrent ? "#1769E0" : "#FFFFFF"};
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
              border-top: 6px solid ${isCurrent ? "#1769E0" : "#FFFFFF"};
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
    <div className="relative w-full h-[520px] sm:h-[580px] rounded-3xl overflow-hidden border border-[#DCE5EF] bg-[#EEF2F6] shadow-[0_4px_24px_rgba(23,43,77,0.06)]">
      <div ref={mapContainerRef} className="w-full h-full z-0" />

      {/* Floating Place Preview Card on Map */}
      {selectedPlace && (
        <div className="absolute bottom-5 inset-x-4 sm:inset-x-auto sm:right-6 sm:w-96 z-[500] pointer-events-auto">
          <div className="rounded-2xl border border-[#DCE5EF] bg-white/95 backdrop-blur-md p-4 shadow-[0_12px_32px_rgba(23,43,77,0.12)] flex items-center gap-3.5">
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-[#F5F8FC]">
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
                <span className="text-[10px] font-bold text-[#0F8B8D] uppercase tracking-wider truncate">
                  {selectedPlace.category}
                </span>
                <span className="text-xs font-semibold text-[#5F6F82]">
                  {selectedPlace.distance}
                </span>
              </div>
              <h4 className="text-sm font-bold text-[#172B4D] truncate">
                {selectedPlace.name}
              </h4>
              <p className="text-[11px] text-[#5F6F82] truncate mt-0.5">
                {selectedPlace.vibe}
              </p>
            </div>

            <button
              type="button"
              onClick={() => onOpenDetails(selectedPlace)}
              className="shrink-0 rounded-xl bg-[#1769E0] px-3.5 py-2 text-xs font-bold text-white shadow-xs hover:bg-[#1247A8] transition cursor-pointer"
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
  place_id?: string;
  address?: string;
}

interface SelectedLocationData {
  name: string;
  fullName: string;
  latitude: number;
  longitude: number;
  city: string;
}

interface GoogleAddressComponent {
  long_name: string;
  short_name: string;
  types: string[];
}

interface GoogleGeocodeResult {
  address_components: GoogleAddressComponent[];
  formatted_address?: string;
  geometry?: {
    location?: {
      lat: () => number;
      lng: () => number;
    };
  };
}

interface PlacePredictionText {
  text?: string;
  toString?: () => string;
}

interface GooglePlacePrediction {
  placeId: string;
  text?: PlacePredictionText | string;
  mainText?: PlacePredictionText | string;
  secondaryText?: PlacePredictionText | string;
  types?: string[];
}

interface GoogleAutocompleteSuggestionItem {
  placePrediction?: GooglePlacePrediction;
}

interface GoogleAutocompleteSuggestionsResponse {
  suggestions: GoogleAutocompleteSuggestionItem[];
}

interface NewGooglePlacePhoto {
  name?: string;
  widthPx?: number;
  heightPx?: number;
}

interface NewGooglePlace {
  displayName?: {
    text?: string;
    languageCode?: string;
  };
  formattedAddress?: string;
  location?: {
    latitude?: number;
    longitude?: number;
  };
  photos?: NewGooglePlacePhoto[];
}

interface NewPlacesSearchNearbyResponse {
  places?: NewGooglePlace[];
}

interface WindowWithGoogle extends Window {
  google?: {
    maps?: {
      importLibrary?: (libraryName: string) => Promise<unknown>;
      Geocoder?: new () => {
        geocode: (
          request: { location?: { lat: number; lng: number }; placeId?: string; address?: string },
          callback: (results: GoogleGeocodeResult[] | null, status: string) => void
        ) => void;
      };
      places?: {
        AutocompleteSuggestion?: {
          fetchAutocompleteSuggestions: (request: {
            input: string;
            includedPrimaryTypes?: string[];
            includedRegionCodes?: string[];
          }) => Promise<GoogleAutocompleteSuggestionsResponse>;
        };
      };
    };
  };
}

function getDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function hashStringToPositiveInt(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash) || 1;
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

const ensureGoogleMapsLoaded = async (apiKey: string): Promise<void> => {
  if (typeof window === "undefined") return;
  const win = window as unknown as WindowWithGoogle;
  if (
    win.google?.maps?.places?.AutocompleteSuggestion &&
    win.google?.maps?.Geocoder
  ) {
    return;
  }

  await new Promise<void>((resolve, reject) => {
    const scriptId = "google-maps-js-sdk";
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement("script");
      script.id = scriptId;
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&v=weekly`;
      script.async = true;
      document.head.appendChild(script);
    }
    if (win.google?.maps) {
      resolve();
    } else {
      script.addEventListener("load", () => resolve(), { once: true });
      script.addEventListener("error", (e) => reject(e), { once: true });
    }
  });

  if (win.google?.maps?.importLibrary) {
    await win.google.maps.importLibrary("places");
  }
};

export default function Home() {
  const [viewMode, setViewMode] = useState<"list" | "map">("list");
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [isSearchDropdownOpen, setIsSearchDropdownOpen] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const [bookmarkedIds, setBookmarkedIds] = useState<number[]>([1, 4]);
  const [selectedModalPlace, setSelectedModalPlace] = useState<Place | null>(null);
  const [selectedMapPlace, setSelectedMapPlace] = useState<Place | null>(PLACES[0]);
  const [activeNavTab, setActiveNavTab] = useState<"discover" | "saved" | "activity" | "profile">("discover");
  const [placesList, setPlacesList] = useState<Place[]>(PLACES);
  const lastPlacesSearchIdRef = useRef(0);

  // Debounce search query by 300ms for smooth, flicker-free filtering
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleClearSearch = () => {
    setSearchQuery("");
    setDebouncedSearchQuery("");
    setLocationSuggestions([]);
    setIsSearchDropdownOpen(false);
  };

  // Close search dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(e.target as Node)
      ) {
        setIsSearchDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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

  // Autocomplete location suggestions state
  const [locationSuggestions, setLocationSuggestions] = useState<LocationSuggestion[]>([]);
  const [isLoadingLocations, setIsLoadingLocations] = useState(false);
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);

  // Filter states: selectedVibe, selectedCrowd, selectedTag
  const [selectedVibe, setSelectedVibe] = useState<string | null>(null);
  const [selectedCrowd, setSelectedCrowd] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // 1 & 4) Google Maps JavaScript API AutocompleteSuggestion integration with 300ms debounce
  useEffect(() => {
    const trimmed = searchQuery.trim();
    if (!trimmed) {
      return;
    }

    let isCancelled = false;

    const timer = setTimeout(async () => {
      setIsLoadingLocations(true);
      try {
        const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";
        if (!apiKey) {
          console.error("Google Maps API key is not configured.");
          setIsLoadingLocations(false);
          return;
        }

        await ensureGoogleMapsLoaded(apiKey);
        if (isCancelled) return;

        const win = window as unknown as WindowWithGoogle;
        const AutocompleteSuggestion =
          win.google?.maps?.places?.AutocompleteSuggestion;

        if (!AutocompleteSuggestion?.fetchAutocompleteSuggestions) {
          throw new Error("Google Maps AutocompleteSuggestion is not available.");
        }

        const response = await AutocompleteSuggestion.fetchAutocompleteSuggestions({
          input: trimmed,
        });

        if (isCancelled) return;

        const suggestions = response?.suggestions;
        if (Array.isArray(suggestions) && suggestions.length > 0) {
          const mapped: LocationSuggestion[] = [];

          for (const item of suggestions) {
            const pred = item.placePrediction;
            if (!pred) continue;

            const placeId = pred.placeId;
            const mainText =
              typeof pred.mainText === "string"
                ? pred.mainText
                : pred.mainText?.text ||
                  (pred.mainText ? String(pred.mainText) : "");
            const secondaryText =
              typeof pred.secondaryText === "string"
                ? pred.secondaryText
                : pred.secondaryText?.text ||
                  (pred.secondaryText ? String(pred.secondaryText) : "");
            const fullText =
              typeof pred.text === "string"
                ? pred.text
                : pred.text?.text ||
                  (pred.text ? String(pred.text) : "");

            const name = mainText || fullText.split(",")[0] || fullText || "Place";
            const address = secondaryText || fullText || name;
            const fullName = fullText || (secondaryText ? `${name}, ${secondaryText}` : name);

            const primaryType = pred.types?.[0] || "place";
            const formattedType =
              primaryType === "locality" || primaryType === "political"
                ? "City"
                : primaryType === "sublocality" || primaryType === "neighborhood"
                ? "Area"
                : primaryType === "administrative_area_level_2"
                ? "District"
                : primaryType === "establishment"
                ? "Landmark"
                : "Place";

            mapped.push({
              id: placeId,
              place_id: placeId,
              name,
              address,
              fullName,
              latitude: 0,
              longitude: 0,
              placeType: formattedType,
              city: name,
              contextText: address,
            });
          }

          if (mapped.length > 0) {
            setLocationSuggestions(mapped);
          } else {
            // Fallback to local matching cities if no predictions returned
            const q = trimmed.toLowerCase();
            const localMatches: LocationSuggestion[] = CITIES.filter(
              (c) =>
                c.name.toLowerCase().includes(q) ||
                c.region.toLowerCase().includes(q) ||
                c.badge.toLowerCase().includes(q) ||
                c.popularAreas.some((a) => a.toLowerCase().includes(q))
            ).map((c) => ({
              id: `local-${c.id}`,
              place_id: `local-${c.id}`,
              name: c.name,
              address: c.region,
              fullName: c.displayLocation,
              latitude: c.lat,
              longitude: c.lng,
              placeType: "City",
              city: c.name,
              contextText: c.region,
            }));

            setLocationSuggestions(localMatches);
          }
        } else {
          // Fallback to local matching cities
          const q = trimmed.toLowerCase();
          const localMatches: LocationSuggestion[] = CITIES.filter(
            (c) =>
              c.name.toLowerCase().includes(q) ||
              c.region.toLowerCase().includes(q) ||
              c.badge.toLowerCase().includes(q) ||
              c.popularAreas.some((a) => a.toLowerCase().includes(q))
          ).map((c) => ({
            id: `local-${c.id}`,
            place_id: `local-${c.id}`,
            name: c.name,
            address: c.region,
            fullName: c.displayLocation,
            latitude: c.lat,
            longitude: c.lng,
            placeType: "City",
            city: c.name,
            contextText: c.region,
          }));

          setLocationSuggestions(localMatches);
        }
        setIsLoadingLocations(false);
      } catch (err) {
        if (!isCancelled) {
          console.error("Google Maps place search error:", err);
          const q = trimmed.toLowerCase();
          const localMatches: LocationSuggestion[] = CITIES.filter(
            (c) =>
              c.name.toLowerCase().includes(q) ||
              c.region.toLowerCase().includes(q) ||
              c.badge.toLowerCase().includes(q) ||
              c.popularAreas.some((a) => a.toLowerCase().includes(q))
          ).map((c) => ({
            id: `local-${c.id}`,
            place_id: `local-${c.id}`,
            name: c.name,
            address: c.region,
            fullName: c.displayLocation,
            latitude: c.lat,
            longitude: c.lng,
            placeType: "City",
            city: c.name,
            contextText: c.region,
          }));

          setLocationSuggestions(localMatches);
          setIsLoadingLocations(false);
        }
      }
    }, 300);

    return () => {
      isCancelled = true;
      clearTimeout(timer);
    };
  }, [searchQuery]);

  // Fetch nearby places across distinct categories using Places API (New)
  const fetchNearbyPlaces = async (lat: number, lng: number, city: string) => {
    const searchId = ++lastPlacesSearchIdRef.current;
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";
    if (!apiKey) {
      console.warn("Google Maps API key is not configured; keeping default places.");
      return;
    }

    try {
      // 1 & 2. SEPARATE API calls for each category (same lat/lng, same radius)
      const fetchCategoryPlaces = async (categoryType: string): Promise<NewGooglePlace[]> => {
        try {
          const response = await fetch("https://places.googleapis.com/v1/places:searchNearby", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-Goog-Api-Key": apiKey,
              "X-Goog-FieldMask": "places.displayName,places.formattedAddress,places.location,places.photos",
            },
            body: JSON.stringify({
              includedTypes: [categoryType],
              maxResultCount: 10,
              locationRestriction: {
                circle: {
                  center: {
                    latitude: lat,
                    longitude: lng,
                  },
                  radius: 3000,
                },
              },
            }),
          });

          if (!response.ok) {
            const errText = await response.text();
            console.warn(`Places API (New) error for category "${categoryType}":`, response.status, errText);
            return [];
          }

          const data: NewPlacesSearchNearbyResponse = await response.json();
          return data.places || [];
        } catch (catErr) {
          console.error(`Places API (New) call failed for "${categoryType}":`, catErr);
          return [];
        }
      };

      // Execute separate calls for the 5 specified categories:
      // Call 1 → restaurant
      // Call 2 → tourist_attraction
      // Call 3 → hindu_temple
      // Call 4 → park
      // Call 5 → shopping_mall
      const [restaurantsRaw, attractionsRaw, templesRaw, parksRaw, mallsRaw] = await Promise.all([
        fetchCategoryPlaces("restaurant"),
        fetchCategoryPlaces("tourist_attraction"),
        fetchCategoryPlaces("hindu_temple"),
        fetchCategoryPlaces("park"),
        fetchCategoryPlaces("shopping_mall"),
      ]);

      if (searchId !== lastPlacesSearchIdRef.current) return;

      // 4. Store results separately
      const categorized = {
        restaurants: restaurantsRaw,
        attractions: attractionsRaw,
        temples: templesRaw,
        parks: parksRaw,
        malls: mallsRaw,
      };

      // Log count per category
      console.log(`Places API (New) category breakdown for "${city}":`, {
        restaurants: categorized.restaurants.length,
        attractions: categorized.attractions.length,
        temples: categorized.temples.length,
        parks: categorized.parks.length,
        malls: categorized.malls.length,
      });

      // 5. Merge results AFTER fetching:
      // Limit each category (top 5 each) and interleave to ensure diversity across results
      const limitPerCategory = 5;
      const categoriesOrdered = [
        {
          items: categorized.attractions.slice(0, limitPerCategory),
          category: "TOURIST ATTRACTION",
          defaultVibe: "Lively" as const,
          defaultCrowd: "High" as const,
          crowdStatus: "Popular landmark • lively energy",
          bestTime: "Morning (9 AM–12:30 PM)",
          descPrefix: "Iconic landmark and cultural heritage destination",
          fallbackImage: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1200&q=80",
        },
        {
          items: categorized.temples.slice(0, limitPerCategory),
          category: "HERITAGE & TEMPLE",
          defaultVibe: "Chill" as const,
          defaultCrowd: "Low" as const,
          crowdStatus: "Serene • spiritual atmosphere",
          bestTime: "Early Morning (6–9 AM)",
          descPrefix: "Revered spiritual sanctuary known for serene architecture",
          fallbackImage: "https://images.unsplash.com/photo-1561361058-c24cecae35ca?auto=format&fit=crop&w=1200&q=80",
        },
        {
          items: categorized.parks.slice(0, limitPerCategory),
          category: "PARK & NATURE",
          defaultVibe: "Chill" as const,
          defaultCrowd: "Low" as const,
          crowdStatus: "Relaxed green space • peaceful",
          bestTime: "Late Afternoon (4:30–6:30 PM)",
          descPrefix: "Scenic urban park featuring lush greenery and walking trails",
          fallbackImage: "https://images.unsplash.com/photo-1519331379826-f10be5486c6f?auto=format&fit=crop&w=1200&q=80",
        },
        {
          items: categorized.malls.slice(0, limitPerCategory),
          category: "SHOPPING & MALL",
          defaultVibe: "Lively" as const,
          defaultCrowd: "Medium" as const,
          crowdStatus: "Active shopping • steady flow",
          bestTime: "Afternoon (2–6 PM)",
          descPrefix: "Premier shopping and lifestyle destination with top brands",
          fallbackImage: "https://images.unsplash.com/photo-1567449303078-57ad995bd301?auto=format&fit=crop&w=1200&q=80",
        },
        {
          items: categorized.restaurants.slice(0, limitPerCategory),
          category: "RESTAURANT & DINING",
          defaultVibe: "Lively" as const,
          defaultCrowd: "Medium" as const,
          crowdStatus: "Popular dining • steady flow",
          bestTime: "Evening (7–10 PM)",
          descPrefix: "Acclaimed culinary spot serving chef-curated specialties",
          fallbackImage: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
        },
      ];

      // Interleave results from each category to eliminate bias and ensure diversity
      const maxCategoryLen = Math.max(...categoriesOrdered.map((c) => c.items.length));
      const seenPlaceNames = new Set<string>();
      const convertedPlaces: Place[] = [];

      for (let i = 0; i < maxCategoryLen; i++) {
        for (const cat of categoriesOrdered) {
          if (i < cat.items.length) {
            const place = cat.items[i];
            const placeName = place.displayName?.text || "Nearby Spot";
            const formattedAddress = place.formattedAddress || "";
            const normKey = `${placeName.toLowerCase()}-${formattedAddress.toLowerCase()}`;
            if (seenPlaceNames.has(normKey)) continue;
            seenPlaceNames.add(normKey);

            const placeLat = place.location?.latitude ?? lat;
            const placeLng = place.location?.longitude ?? lng;
            const distKm = getDistanceKm(lat, lng, placeLat, placeLng);
            const distanceStr = `${distKm.toFixed(1)} km`;
            const areaName = formattedAddress ? formattedAddress.split(",")[0] : city;
            const idKey = `${normKey}-${convertedPlaces.length}`;
            const numericId = hashStringToPositiveInt(idKey);

            // Construct photo URL from Places API (New)
            const photoName = place.photos && place.photos.length > 0 ? place.photos[0].name : undefined;
            const imageUrl = photoName
              ? `https://places.googleapis.com/v1/${photoName}/media?maxHeightPx=400&key=${apiKey}`
              : cat.fallbackImage;

            convertedPlaces.push({
              id: numericId,
              rank: convertedPlaces.length + 1,
              name: placeName,
              category: cat.category,
              city,
              price: cat.category === "RESTAURANT & DINING" || cat.category === "SHOPPING & MALL" ? "$$" : "$",
              distance: distanceStr,
              area: areaName,
              crowd: cat.defaultCrowd,
              crowdStatus: cat.crowdStatus,
              bestTime: cat.bestTime,
              vibe: cat.defaultVibe,
              description: `${cat.descPrefix} in ${areaName} offering a memorable visit.`,
              image: imageUrl,
              lat: placeLat,
              lng: placeLng,
              filterTags: [cat.defaultVibe, "Trending"],
            });
          }
        }
      }

      // Log diversity confirmation
      console.log(
        `Confirmed diversity in results: ${convertedPlaces.length} total places merged across 5 categories:`,
        convertedPlaces.map((p) => `${p.name} [${p.category}]`)
      );

      // 6. Send combined list to existing UI
      if (convertedPlaces.length > 0) {
        setPlacesList((prev) => {
          const others = prev.filter((p) => p.city.toLowerCase() !== city.toLowerCase());
          return [...convertedPlaces, ...others];
        });
        setSelectedMapPlace(convertedPlaces[0]);
      }
    } catch (error) {
      console.error("Error fetching categorized places with Places API (New):", error);
    }
  };

  // Automatically fetch nearby places for initial location on mount
  useEffect(() => {
    if (selectedLocationData.latitude && selectedLocationData.longitude) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      fetchNearbyPlaces(
        selectedLocationData.latitude,
        selectedLocationData.longitude,
        selectedLocationData.city || selectedLocationData.name || "Pune"
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 3) On selecting a location:
  // - Store name + latitude + longitude
  // - Update selected location in app
  // - Close modal
  const handleSelectLocation = (location: {
    name: string;
    fullName?: string;
    latitude?: number;
    longitude?: number;
    city?: string;
    place_id?: string;
    id?: string;
    address?: string;
  }) => {
    const resolvedCity = location.city || location.name;
    const resolvedFullName = location.fullName || location.address || location.name;

    const applySelection = (lat: number, lng: number, city: string) => {
      const newLocationData: SelectedLocationData = {
        name: location.name,
        fullName: resolvedFullName,
        latitude: lat,
        longitude: lng,
        city,
      };

      // Store name + latitude + longitude
      setSelectedLocationData(newLocationData);

      // Update selected location in app
      setSelectedLocation(resolvedFullName);
      setSelectedCity(city);

      // Reset queries & suggestions
      setSearchQuery("");
      setDebouncedSearchQuery("");
      setLocationSuggestions([]);
      setIsLoadingLocations(false);

      // Close dropdown
      setIsSearchDropdownOpen(false);

      // Sync active map place with first spot in the new city if exists
      const firstPlace = placesList.find(
        (p) => p.city.toLowerCase() === city.toLowerCase()
      );
      if (firstPlace) {
        setSelectedMapPlace(firstPlace);
      }

      // Automatically fetch nearby places using Google Places API (New)
      fetchNearbyPlaces(lat, lng, city);
    };

    // If coordinates are already provided (e.g. preset city or reverse geocode), apply immediately
    if (location.latitude && location.longitude) {
      applySelection(location.latitude, location.longitude, resolvedCity);
      return;
    }

    // Geocode place_id using Google Maps JS Geocoder to get accurate coordinates
    const placeId = location.place_id || location.id;
    const win = typeof window !== "undefined" ? (window as unknown as WindowWithGoogle) : null;
    if (win?.google?.maps?.Geocoder && placeId && !placeId.startsWith("local-")) {
      const geocoder = new win.google.maps.Geocoder();
      geocoder.geocode({ placeId }, (results, status) => {
        if (status === "OK" && results && results[0]?.geometry?.location) {
          const loc = results[0].geometry.location;
          const lat = typeof loc.lat === "function" ? loc.lat() : Number(loc.lat);
          const lng = typeof loc.lng === "function" ? loc.lng() : Number(loc.lng);

          let cityFromComponents = resolvedCity;
          if (results[0].address_components) {
            const locality = results[0].address_components.find((c) =>
              c.types.includes("locality")
            );
            if (locality?.long_name) {
              cityFromComponents = locality.long_name;
            }
          }

          applySelection(lat, lng, cityFromComponents);
        } else {
          applySelection(location.latitude || 18.5204, location.longitude || 73.8567, resolvedCity);
        }
      });
    } else {
      applySelection(location.latitude || 18.5204, location.longitude || 73.8567, resolvedCity);
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

  // Resolve custom freeform location or landmark and set as discovery location
  const handleResolveCustomLocation = async (queryText: string) => {
    const trimmed = queryText.trim();
    if (!trimmed) return;

    // 1. Check preset cities
    const matchedCity = CITIES.find(
      (c) =>
        c.name.toLowerCase() === trimmed.toLowerCase() ||
        c.badge.toLowerCase() === trimmed.toLowerCase()
    );
    if (matchedCity) {
      handleSelectCity(matchedCity);
      return;
    }

    // 2. Check if top location suggestion matches or is available
    if (locationSuggestions.length > 0) {
      handleSelectLocation(locationSuggestions[0]);
      return;
    }

    // 3. Geocode freeform custom location or landmark using Google Maps Geocoder
    try {
      setIsLoadingLocations(true);
      const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";
      if (!apiKey) {
        console.warn("Google Maps API key is not configured.");
        setIsLoadingLocations(false);
        return;
      }

      await ensureGoogleMapsLoaded(apiKey);
      const win = typeof window !== "undefined" ? (window as unknown as WindowWithGoogle) : null;
      if (!win?.google?.maps?.Geocoder) {
        throw new Error("Google Maps Geocoder is not available.");
      }

      const geocoder = new win.google.maps.Geocoder();
      geocoder.geocode({ address: trimmed }, (results, status) => {
        setIsLoadingLocations(false);
        if (status === "OK" && results && results[0]?.geometry?.location) {
          const loc = results[0].geometry.location;
          const lat = typeof loc.lat === "function" ? loc.lat() : Number(loc.lat);
          const lng = typeof loc.lng === "function" ? loc.lng() : Number(loc.lng);

          let locality = "";
          let state = "";
          let country = "";
          if (results[0].address_components) {
            for (const comp of results[0].address_components) {
              const types = comp.types || [];
              if (!locality && (types.includes("locality") || types.includes("postal_town"))) {
                locality = comp.long_name;
              }
              if (!state && types.includes("administrative_area_level_1")) {
                state = comp.short_name || comp.long_name;
              }
              if (!country && types.includes("country")) {
                country = comp.short_name || comp.long_name;
              }
            }
          }

          const resolvedCityName = locality || state || trimmed;
          const formattedLocation = results[0].formatted_address || (state ? `${resolvedCityName}, ${state}` : resolvedCityName);

          handleSelectLocation({
            name: trimmed,
            fullName: formattedLocation,
            latitude: lat,
            longitude: lng,
            city: resolvedCityName,
          });
        }
      });
    } catch (err) {
      console.error("Custom location resolution error:", err);
      setIsLoadingLocations(false);
    }
  };

  const handleUseCurrentLocation = () => {
    setIsDetectingLocation(true);

    if (typeof navigator === "undefined" || !("geolocation" in navigator)) {
      console.error("Geolocation API is not supported by this browser.");
      setIsDetectingLocation(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";

          if (!apiKey) {
            console.error("Google Maps API key is not configured.");
            setIsDetectingLocation(false);
            return;
          }

          // Ensure Google Maps JavaScript SDK is loaded
          await ensureGoogleMapsLoaded(apiKey);
          const win = window as unknown as WindowWithGoogle;

          if (!win.google?.maps?.Geocoder) {
            throw new Error("Google Maps JavaScript API Geocoder is unavailable.");
          }

          // 2. Use ONLY Google Maps JavaScript API: new google.maps.Geocoder()
          const geocoder = new win.google.maps.Geocoder();
          const results = await new Promise<GoogleGeocodeResult[]>((resolve, reject) => {
            geocoder.geocode({ location: { lat: latitude, lng: longitude } }, (res, status) => {
              if (status === "OK" && res && res.length > 0) {
                resolve(res);
              } else {
                reject(new Error(`Google Maps Geocoder failed with status: ${status}`));
              }
            });
          });

          // 3. Extract locality (city), administrative_area_level_1 (state), country
          let locality = "";
          let state = "";
          let country = "";

          for (const result of results) {
            if (!result.address_components) continue;
            for (const comp of result.address_components) {
              const types = comp.types || [];
              if (!locality && (types.includes("locality") || types.includes("postal_town"))) {
                locality = comp.long_name || comp.short_name;
              }
              if (!state && types.includes("administrative_area_level_1")) {
                state = comp.short_name || comp.long_name;
              }
              if (!country && types.includes("country")) {
                country = comp.short_name || comp.long_name;
              }
            }
            if (!locality) {
              const admin2 = result.address_components.find((c) =>
                c.types?.includes("administrative_area_level_2")
              );
              if (admin2?.long_name) {
                locality = admin2.long_name;
              }
            }
            if (locality && state) break;
          }

          const detectedCity = locality || state || country || "Pune";
          const formattedLocation = state
            ? `${detectedCity}, ${state}`
            : country
            ? `${detectedCity}, ${country}`
            : detectedCity;

          // 4. Update existing state ONLY: selectedCity, selectedLocation, selectedLocationData
          handleSelectLocation({
            name: detectedCity,
            fullName: formattedLocation,
            latitude,
            longitude,
            city: detectedCity,
          });
        } catch (err) {
          console.error("Location detection error:", err);
        } finally {
          setIsDetectingLocation(false);
        }
      },
      (geoError) => {
        console.error("Geolocation error:", geoError.message || geoError);
        setIsDetectingLocation(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000,
      }
    );
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
  const filteredPlaces = placesList.filter((place) => {
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
          pill: "bg-[#E7F7F1] text-[#16865C] border-[#16865C]/30",
          dot: "bg-[#16865C]",
        };
      case "medium":
      case "moderate":
        return {
          pill: "bg-[#C58A22]/10 text-[#C58A22] border-[#C58A22]/30",
          dot: "bg-[#C58A22]",
        };
      case "high":
      case "busy":
      default:
        return {
          pill: "bg-[#D64545]/10 text-[#D64545] border-[#D64545]/30",
          dot: "bg-[#D64545]",
        };
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F8FC] text-[#172B4D] font-['Poppins',sans-serif] px-4 py-6 sm:px-6 md:px-10 md:py-10 pb-28 sm:pb-32 antialiased selection:bg-[#1769E0]/15 selection:text-[#1769E0]">
      <main className="mx-auto w-full max-w-[1180px] flex flex-col gap-8 md:gap-10">
        {/* ============================================================ */}
        {/* HEADER SECTION                                               */}
        {/* ============================================================ */}
        <section className="flex flex-col gap-6">
          <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3.5 sm:gap-4 border-b border-[#DCE5EF] pb-4 sm:pb-6">
            {/* Left side: Logo + App name */}
            <div className="flex items-center min-w-0">
              <h1 className="flex items-center gap-3 text-xl sm:text-3xl font-extrabold tracking-tight text-[#172B4D] whitespace-nowrap">
                {/* Logo: Nearby Discovery App Icon */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/logo.png"
                  alt=""
                  aria-hidden="true"
                  className="h-[22px] w-[22px] sm:h-6 sm:w-6 shrink-0 object-contain"
                />
                <span>Nearby Discovery</span>
              </h1>
            </div>

            {/* Right side: 3) LIST ↔ MAP TOGGLE */}
            <div className="flex sm:inline-flex w-full sm:w-auto sm:self-auto shrink-0 items-center p-1 rounded-full bg-[#F5F8FC] border border-[#DCE5EF] shadow-inner">
              <button
                type="button"
                onClick={() => setViewMode("list")}
                className={`flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold transition-all duration-200 cursor-pointer ${
                  viewMode === "list"
                    ? "bg-[#1769E0] text-white shadow-[0_2px_8px_rgba(23,105,224,0.3)]"
                    : "bg-transparent text-[#5F6F82] hover:text-[#172B4D]"
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
                className={`flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold transition-all duration-200 cursor-pointer ${
                  viewMode === "map"
                    ? "bg-[#1769E0] text-white shadow-[0_2px_8px_rgba(23,105,224,0.3)]"
                    : "bg-transparent text-[#5F6F82] hover:text-[#172B4D]"
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

          {/* UNIFIED SEARCH BAR */}
          <div ref={searchContainerRef} className="relative w-full md:max-w-2xl md:mx-auto">
            <div className="relative flex items-center">
              {/* Left icon: Search magnifying glass */}
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

              {/* Input: Exact placeholder "Search anything" */}
              <input
                type="text"
                value={searchQuery}
                onFocus={() => setIsSearchDropdownOpen(true)}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setIsSearchDropdownOpen(true);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    const trimmed = searchQuery.trim();
                    if (!trimmed) return;

                    // Match preset city
                    const matchedCity = CITIES.find(
                      (c) =>
                        c.name.toLowerCase() === trimmed.toLowerCase() ||
                        c.badge.toLowerCase() === trimmed.toLowerCase()
                    );
                    if (matchedCity) {
                      handleSelectCity(matchedCity);
                      setIsSearchDropdownOpen(false);
                      return;
                    }

                    // If user typed a location suggestion and no local places match
                    if (filteredPlaces.length === 0 && locationSuggestions.length > 0) {
                      handleSelectLocation(locationSuggestions[0]);
                      setIsSearchDropdownOpen(false);
                      return;
                    }

                    // If local places match, keep place query active and close dropdown
                    if (filteredPlaces.length > 0) {
                      setIsSearchDropdownOpen(false);
                      return;
                    }

                    // Otherwise resolve custom location or landmark
                    handleResolveCustomLocation(trimmed);
                    setIsSearchDropdownOpen(false);
                  } else if (e.key === "Escape") {
                    setIsSearchDropdownOpen(false);
                  }
                }}
                placeholder="Search anything"
                className="w-full rounded-full border border-[#DCE5EF] bg-white py-3.5 pl-11 pr-24 text-sm text-[#172B4D] placeholder-[#8A99AB] shadow-[0_2px_8px_rgba(23,43,77,0.03)] outline-none transition duration-200 focus:border-[#1769E0] focus:ring-4 focus:ring-[#1769E0]/15"
                aria-label="Search anything"
                aria-autocomplete="list"
              />

              {/* Right Action Icons: Loading / Clear / Current Location */}
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 gap-1">
                {isLoadingLocations && (
                  <div className="flex items-center px-1 text-[#1769E0]">
                    <svg className="animate-spin h-3.5 w-3.5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                  </div>
                )}
                {searchQuery && (
                  <button
                    type="button"
                    onClick={handleClearSearch}
                    className="flex h-7 w-7 items-center justify-center rounded-full text-[#8A99AB] hover:text-[#172B4D] hover:bg-[#F5F8FC] transition cursor-pointer"
                    title="Clear search"
                    aria-label="Clear search"
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
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                )}
                <button
                  type="button"
                  onClick={handleUseCurrentLocation}
                  disabled={isDetectingLocation}
                  className="flex h-8 w-8 items-center justify-center rounded-full text-[#5F6F82] hover:text-[#1769E0] hover:bg-[#EAF4FF] transition cursor-pointer disabled:opacity-50"
                  title="Use current location"
                  aria-label="Use current location"
                >
                  {isDetectingLocation ? (
                    <svg
                      className="animate-spin h-4 w-4 text-[#1769E0]"
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
                  ) : (
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <circle cx="12" cy="12" r="3" />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 2v3m0 14v3M2 12h3m14 0h3"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Dropdown Suggestions Panel */}
            {isSearchDropdownOpen && (
              <div className="absolute left-0 right-0 top-full mt-2 z-50 rounded-2xl sm:rounded-3xl border border-[#DCE5EF] bg-white shadow-[0_12px_36px_rgba(23,43,77,0.12)] p-3 sm:p-4 max-h-[400px] overflow-y-auto flex flex-col gap-2.5 text-left">
                {/* 1. Quick Action: Use Current Location */}
                <button
                  type="button"
                  onClick={() => {
                    handleUseCurrentLocation();
                    setIsSearchDropdownOpen(false);
                  }}
                  disabled={isDetectingLocation}
                  className="w-full flex items-center gap-3 p-2.5 rounded-2xl bg-[#EAF4FF] hover:bg-[#1769E0] text-[#1769E0] hover:text-white border border-[#1769E0]/20 transition-all duration-150 cursor-pointer text-left group"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-white group-hover:bg-white/20 border border-[#1769E0]/20 group-hover:border-transparent transition-colors">
                    {isDetectingLocation ? (
                      <svg className="animate-spin h-4 w-4 text-[#1769E0] group-hover:text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                      </svg>
                    ) : (
                      <svg className="h-4 w-4 text-[#1769E0] group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <circle cx="12" cy="12" r="3" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v3m0 14v3M2 12h3m14 0h3" />
                      </svg>
                    )}
                  </div>
                  <div className="min-w-0">
                    <span className="text-xs sm:text-sm font-bold block truncate">
                      {isDetectingLocation ? "Detecting location..." : "Use current location"}
                    </span>
                    <span className="text-[11px] text-[#5F6F82] group-hover:text-white/80 block truncate">
                      Find spots and landmarks near you
                    </span>
                  </div>
                </button>

                {/* 2. Empty query: Show Suggested Cities */}
                {!searchQuery.trim() && (
                  <div className="flex flex-col gap-1 pt-1 border-t border-[#DCE5EF]">
                    <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#8A99AB] px-2 py-1">
                      Suggested Cities
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                      {CITIES.map((city) => {
                        const isSelected = selectedCity.toLowerCase() === city.name.toLowerCase();
                        return (
                          <button
                            key={city.id}
                            type="button"
                            onClick={() => {
                              handleSelectCity(city);
                              setIsSearchDropdownOpen(false);
                            }}
                            className={`flex items-center justify-between p-2 rounded-xl transition cursor-pointer text-left ${
                              isSelected
                                ? "bg-[#EAF4FF] text-[#1769E0] font-semibold"
                                : "hover:bg-[#F5F8FC] text-[#172B4D]"
                            }`}
                          >
                            <div className="flex items-center gap-2 min-w-0">
                              <svg className="h-3.5 w-3.5 shrink-0 text-[#8A99AB]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              </svg>
                              <span className="text-xs font-medium truncate">{city.name}</span>
                            </div>
                            <span className="text-[10px] text-[#8A99AB] font-mono">{city.badge}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* 3. With query: Show Location & Landmark Suggestions */}
                {searchQuery.trim() && locationSuggestions.length > 0 && (
                  <div className="flex flex-col gap-1 pt-1 border-t border-[#DCE5EF]">
                    <div className="flex items-center justify-between px-2 py-1">
                      <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#8A99AB]">
                        Cities, Locations & Landmarks
                      </span>
                      <span className="text-[10px] text-[#1769E0] font-semibold">
                        {locationSuggestions.length} found
                      </span>
                    </div>
                    {locationSuggestions.map((suggestion) => (
                      <button
                        key={suggestion.id}
                        type="button"
                        onClick={() => {
                          handleSelectLocation(suggestion);
                          setIsSearchDropdownOpen(false);
                        }}
                        className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-[#EAF4FF]/50 transition cursor-pointer text-left group"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#F5F8FC] group-hover:bg-[#1769E0] group-hover:text-white text-[#5F6F82] transition-colors">
                            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs sm:text-sm font-semibold text-[#172B4D] group-hover:text-[#1769E0] truncate">
                                {suggestion.name}
                              </span>
                              <span className="rounded bg-[#F5F8FC] px-1 py-0.2 text-[9px] font-semibold text-[#5F6F82] border border-[#DCE5EF]">
                                {suggestion.placeType}
                              </span>
                            </div>
                            <p className="text-[11px] text-[#5F6F82] truncate">
                              {suggestion.contextText || suggestion.fullName}
                            </p>
                          </div>
                        </div>
                        <span className="text-[11px] font-semibold text-[#1769E0] shrink-0 pl-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          Discover &rarr;
                        </span>
                      </button>
                    ))}
                  </div>
                )}

                {/* 4. With query: Matching places in current discovery list */}
                {searchQuery.trim() && filteredPlaces.length > 0 && (
                  <div className="flex flex-col gap-1 pt-1 border-t border-[#DCE5EF]">
                    <div className="flex items-center justify-between px-2 py-1">
                      <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#8A99AB]">
                        Places in {selectedCity}
                      </span>
                      <span className="text-[10px] text-[#5F6F82]">
                        {filteredPlaces.length} matching
                      </span>
                    </div>
                    {filteredPlaces.slice(0, 3).map((place) => (
                      <button
                        key={place.id}
                        type="button"
                        onClick={() => {
                          setSelectedModalPlace(place);
                          setIsSearchDropdownOpen(false);
                        }}
                        className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-[#F5F8FC] transition cursor-pointer text-left"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-lg bg-[#F5F8FC]">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={place.image} alt={place.name} className="h-full w-full object-cover" />
                          </div>
                          <div className="min-w-0">
                            <span className="text-xs sm:text-sm font-semibold text-[#172B4D] truncate block">
                              {place.name}
                            </span>
                            <span className="text-[10px] text-[#0F8B8D] font-semibold uppercase tracking-wider truncate block">
                              {place.category} &bull; {place.distance}
                            </span>
                          </div>
                        </div>
                        <span className="text-[11px] font-medium text-[#5F6F82] shrink-0 pl-2">
                          View details
                        </span>
                      </button>
                    ))}
                  </div>
                )}

                {/* 5. With query: Option to resolve custom location or landmark directly */}
                {searchQuery.trim() && (
                  <button
                    type="button"
                    onClick={() => {
                      handleResolveCustomLocation(searchQuery);
                      setIsSearchDropdownOpen(false);
                    }}
                    className="w-full flex items-center gap-2 p-2 rounded-xl text-xs font-semibold text-[#5F6F82] hover:text-[#1769E0] hover:bg-[#EAF4FF] transition cursor-pointer border-t border-[#DCE5EF]"
                  >
                    <svg className="h-3.5 w-3.5 text-[#1769E0] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                    <span className="truncate">Set &ldquo;{searchQuery.trim()}&rdquo; as discovery location</span>
                  </button>
                )}
              </div>
            )}
          </div>

          {/* 2) FILTERS: Interactive Pills */}
          <div className="w-full flex justify-start sm:justify-center overflow-x-auto no-scrollbar px-1 py-1">
            <div className="flex items-center gap-3 min-w-max mx-auto sm:mx-0">
              {FILTER_PILLS.map((pill) => {
                const isActive = isPillActive(pill);

                return (
                  <button
                    key={pill.id}
                    type="button"
                    onClick={() => handlePillClick(pill)}
                    className={`shrink-0 inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold border transition-all duration-200 cursor-pointer ${
                      isActive
                        ? "bg-[#1769E0] text-white shadow-[0_3px_10px_rgba(23,105,224,0.3)] border-[#1769E0] scale-[1.02]"
                        : "bg-white text-[#5F6F82] border-[#DCE5EF] hover:border-[#1769E0]/40 hover:text-[#172B4D] active:scale-95"
                    }`}
                  >
                    <span className={isActive ? "text-white" : "text-[#8A99AB]"}>
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
            <div className="flex items-center justify-between gap-3 sm:gap-4 border-b border-[#DCE5EF] pb-4">
              <div className="min-w-0 flex-1">
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#172B4D]">
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
                <p className="text-xs text-[#5F6F82] font-normal mt-0.5">
                  {debouncedSearchQuery.trim()
                    ? `Matching name, category, or vibe in ${selectedCity}`
                    : `Curated by proximity and local character • ${selectedLocation}`}
                </p>
              </div>

              {/* Result Count Badge */}
              <span className="inline-flex shrink-0 items-center justify-center rounded-full bg-[#EAF4FF] px-3.5 py-1 text-xs font-bold text-[#1247A8] border border-[#1769E0]/30 shadow-xs whitespace-nowrap text-center">
                {filteredPlaces.length} {filteredPlaces.length === 1 ? "place" : "places"}
              </span>
            </div>

            {/* 6) Active Nav Tab = "activity" View */}
            {activeNavTab === "activity" ? (
              <div className="rounded-3xl border border-[#DCE5EF] bg-white p-6 sm:p-8 flex flex-col gap-4 shadow-sm">
                <h3 className="text-base font-bold text-[#172B4D]">Real-Time Pune Activity</h3>
                <div className="flex flex-col gap-3">
                  <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#F5F8FC] border border-[#DCE5EF]">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#D64545]/10 text-[#D64545] font-bold text-xs">
                      🔥
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-[#172B4D]">High Morning Crowd at Vohuman Cafe</p>
                      <p className="text-xs text-[#5F6F82]">Estimated 15–20 min rush queue for bun maska & cheese omelettes.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#F5F8FC] border border-[#DCE5EF]">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#E7F7F1] text-[#16865C] font-bold text-xs">
                      🌿
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-[#172B4D]">Quiet Hours at Osho Teerth Park</p>
                      <p className="text-xs text-[#5F6F82]">Serene bamboo walk conditions with zero wait time right now.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#F5F8FC] border border-[#DCE5EF]">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#C58A22]/10 text-[#C58A22] font-bold text-xs">
                      🛍️
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-[#172B4D]">Evening Street Bazaar Active at FC Road</p>
                      <p className="text-xs text-[#5F6F82]">Bookstalls and food vendors opening along Fergusson College Road.</p>
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveNavTab("discover")}
                  className="self-start mt-2 inline-flex items-center gap-1.5 rounded-xl bg-[#1769E0] px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-[#1247A8] transition cursor-pointer"
                >
                  Browse All Places
                </button>
              </div>
            ) : activeNavTab === "profile" ? (
              /* 6) Active Nav Tab = "profile" View */
              <div className="rounded-3xl border border-[#DCE5EF] bg-white p-6 sm:p-8 flex flex-col gap-6 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#1769E0] text-white text-xl font-bold shadow-md">
                    RS
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#172B4D]">Pune City Explorer</h3>
                    <p className="text-xs text-[#5F6F82]">Active Discovery Member · Level 2</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div className="rounded-2xl border border-[#DCE5EF] bg-[#F5F8FC] p-4 text-center">
                    <span className="text-xl font-bold text-[#1769E0]">{bookmarkedIds.length}</span>
                    <p className="text-xs text-[#5F6F82] mt-0.5">Saved Places</p>
                  </div>
                  <div className="rounded-2xl border border-[#DCE5EF] bg-[#F5F8FC] p-4 text-center">
                    <span className="text-xl font-bold text-[#172B4D]">8</span>
                    <p className="text-xs text-[#5F6F82] mt-0.5">Curated Spots</p>
                  </div>
                  <div className="rounded-2xl border border-[#DCE5EF] bg-[#F5F8FC] p-4 text-center col-span-2 sm:col-span-1">
                    <span className="text-xl font-bold text-[#16865C]">MH-12</span>
                    <p className="text-xs text-[#5F6F82] mt-0.5">Home Territory</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveNavTab("discover")}
                  className="self-start mt-2 inline-flex items-center gap-1.5 rounded-xl bg-[#1769E0] px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-[#1247A8] transition cursor-pointer"
                >
                  Return to Discovery
                </button>
              </div>
            ) : (
              /* Compact Horizontal Cards List (Single-Column) */
              <div className="flex flex-col gap-3.5 sm:gap-4">
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
                      className="group relative flex flex-col sm:flex-row items-stretch overflow-hidden rounded-[8px] border border-[#DCE5EF] bg-white shadow-[0_2px_8px_rgba(23,43,77,0.04)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#1769E0]/40 hover:shadow-[0_10px_25px_rgba(23,43,77,0.08)] cursor-pointer text-left focus:outline-none focus:ring-2 focus:ring-[#1769E0]/30"
                    >
                      {/* Thumbnail: Mobile full-width 16:10 aspect ratio; Desktop fixed-width 200px 4:3 aspect ratio */}
                      <div className="relative w-full aspect-[16/10] sm:w-[200px] sm:aspect-[4/3] sm:self-stretch shrink-0 overflow-hidden bg-[#F5F8FC]">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={place.image}
                          alt={place.name}
                          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                          loading="lazy"
                        />

                        {/* Ambient gradient overlay */}
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/25" />

                        {/* Rank Badge */}
                        <span className="absolute top-2.5 left-2.5 sm:top-2.5 sm:left-2.5 inline-flex items-center rounded-full bg-black/60 backdrop-blur-md px-2.5 py-0.5 sm:px-2 text-[11px] sm:text-[11px] font-bold tracking-wider text-white border border-white/20 shadow-xs">
                          #{place.rank}
                        </span>

                        {/* Bookmark / Save Button */}
                        <button
                          type="button"
                          onClick={(e) => toggleBookmark(place.id, e)}
                          className={`absolute top-2.5 right-2.5 sm:top-2.5 sm:right-2.5 flex h-7 w-7 items-center justify-center rounded-full backdrop-blur-md border transition-all duration-200 active:scale-90 shadow-xs cursor-pointer ${
                            isBookmarked
                              ? "bg-[#1769E0] text-white border-[#1769E0]"
                              : "bg-black/45 text-white border-white/20 hover:bg-black/65"
                          }`}
                          title={isBookmarked ? "Saved to collection" : "Save location"}
                          aria-label="Save bookmark"
                        >
                          <svg
                            className="h-3.5 w-3.5"
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

                        {/* Mobile-only Distance Badge overlaid on thumbnail */}
                        <span className="sm:hidden absolute bottom-2.5 right-2.5 inline-flex items-center gap-1.5 rounded-full bg-black/60 backdrop-blur-md px-2.5 py-1 text-xs font-semibold text-white border border-white/20 shadow-xs">
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
                          {formatDistanceKm(place.distance)}
                        </span>
                      </div>

                      {/* Content Area: Middle & Right Columns */}
                      <div className="flex-1 min-w-0 flex flex-col sm:flex-row items-stretch justify-between">
                        {/* Middle: Place Information */}
                        <div className="flex-1 min-w-0 p-4 sm:p-4 flex flex-col justify-start gap-2">
                          {/* a. Category Label */}
                          <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.14em] uppercase text-[#0F8B8D] block">
                            {place.category}
                          </span>

                          {/* b. Place Title + Mobile-only Price Indicator */}
                          <div className="flex items-start justify-between gap-2">
                            <h3 className="text-base sm:text-base md:text-[1.05rem] font-bold tracking-tight text-[#172B4D] group-hover:text-[#1769E0] transition-colors leading-snug line-clamp-2">
                              {place.name}
                            </h3>
                            {/* Mobile-only Price Indicator */}
                            <span
                              className="sm:hidden shrink-0 font-bold text-xs tracking-wider text-[#172B4D] bg-[#F5F8FC] px-2.5 py-1 rounded-md border border-[#DCE5EF] self-start"
                              title={`Price level: ${place.price.replace(/\$/g, "₹")}`}
                            >
                              {place.price.replace(/\$/g, "₹")}
                            </span>
                          </div>

                          {/* c. Crowd/Vibe and Best-Time Badges */}
                          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                            {/* Crowd Status Badge */}
                            <span
                              className={`inline-flex items-center gap-1 sm:gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] sm:text-[11px] font-semibold border ${crowdStyle.pill}`}
                            >
                              <span className={`h-1.5 w-1.5 rounded-full ${crowdStyle.dot}`} />
                              {place.crowdStatus}
                            </span>

                            {/* Best-Time Recommendation */}
                            <span className="inline-flex items-center gap-1 sm:gap-1.5 rounded-full bg-[#F5F8FC] px-2.5 py-0.5 text-[10px] sm:text-[11px] font-medium text-[#5F6F82] border border-[#DCE5EF]">
                              <svg
                                className="h-3 w-3 text-[#8A99AB]"
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

                          {/* d. Short Description */}
                          <p className="text-xs sm:text-[13px] leading-relaxed text-[#5F6F82] font-normal line-clamp-2">
                            {place.description}
                          </p>

                          {/* e. Mobile-only Bottom Row: Vibe + Action Buttons */}
                          <div className="sm:hidden mt-1 pt-3 border-t border-[#DCE5EF] flex items-center justify-between gap-2">
                            {/* Vibe Line */}
                            <div className="text-xs text-[#5F6F82] min-w-0 truncate">
                              <span className="font-semibold text-[#172B4D] mr-1.5">Vibe:</span>
                              <span>{place.vibe}</span>
                            </div>

                            {/* Action Buttons: Compact "Map" and "Details" */}
                            <div className="flex items-center gap-2 shrink-0">
                              <button
                                type="button"
                                onClick={(e) => handleOpenMapWithPlace(place, e)}
                                className="inline-flex items-center gap-1 rounded-xl border border-[#DCE5EF] bg-white px-3 py-1.5 text-xs font-semibold text-[#172B4D] hover:bg-[#EAF4FF] hover:border-[#1769E0]/50 hover:text-[#1769E0] transition-all duration-200 cursor-pointer shadow-xs"
                              >
                                <svg
                                  className="h-3.5 w-3.5 text-[#5F6F82]"
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

                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedModalPlace(place);
                                }}
                                className="inline-flex items-center gap-1 rounded-xl bg-[#1769E0] px-3.5 py-1.5 text-xs font-semibold text-white shadow-xs hover:bg-[#1247A8] active:scale-95 transition-all duration-200 cursor-pointer"
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

                        {/* Right: Secondary Info & Action Buttons (Desktop only) */}
                        <div className="hidden sm:flex shrink-0 p-4 flex-col justify-between items-center border-l border-[#DCE5EF] gap-3 w-[220px]">
                          {/* Price Level & Distance (grouped near top on desktop) */}
                          <div className="flex items-center gap-2">
                            {/* Price Indicator (using ₹ symbol) */}
                            <span
                              className="font-bold text-xs tracking-wider text-[#172B4D] bg-[#F5F8FC] px-2.5 py-1 rounded-md border border-[#DCE5EF]"
                              title={`Price level: ${place.price.replace(/\$/g, "₹")}`}
                            >
                              {place.price.replace(/\$/g, "₹")}
                            </span>

                            {/* Distance Badge (in km) */}
                            <span className="inline-flex items-center gap-1 rounded-full bg-[#F5F8FC] px-2.5 py-1 text-xs font-semibold text-[#5F6F82] border border-[#DCE5EF]">
                              <svg
                                className="h-3.5 w-3.5 text-[#1769E0]"
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
                              {formatDistanceKm(place.distance)}
                            </span>
                          </div>

                          {/* Action Buttons: Compact "Map" and "Details" with equal horizontal padding */}
                          <div className="flex items-center justify-center gap-2">
                            {/* Map Button: Switches to map view with this place selected */}
                            <button
                              type="button"
                              onClick={(e) => handleOpenMapWithPlace(place, e)}
                              className="inline-flex items-center gap-1.5 rounded-xl border border-[#DCE5EF] bg-white px-3 py-1.5 text-xs font-semibold text-[#172B4D] hover:bg-[#EAF4FF] hover:border-[#1769E0]/50 hover:text-[#1769E0] transition-all duration-200 cursor-pointer shadow-xs"
                            >
                              <svg
                                className="h-3.5 w-3.5 text-[#5F6F82]"
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
                              className="inline-flex items-center gap-1 rounded-xl bg-[#1769E0] px-3.5 py-1.5 text-xs font-semibold text-white shadow-xs hover:bg-[#1247A8] active:scale-95 transition-all duration-200 cursor-pointer"
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
                  <div className="w-full py-14 text-center rounded-3xl border border-dashed border-[#DCE5EF] bg-white p-8">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#F5F8FC] text-[#8A99AB] mb-3 border border-[#DCE5EF]">
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
                    <p className="text-base font-semibold text-[#172B4D]">
                      {debouncedSearchQuery.trim()
                        ? `No results found for "${debouncedSearchQuery.trim()}"`
                        : "No matching places. Try changing filters."}
                    </p>
                    <p className="mt-1 text-xs text-[#5F6F82] max-w-md mx-auto">
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
                          className="inline-flex items-center rounded-xl bg-[#1769E0] px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-[#1247A8] transition cursor-pointer"
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
                          className="inline-flex items-center rounded-xl bg-[#F5F8FC] border border-[#DCE5EF] px-4 py-2 text-xs font-semibold text-[#5F6F82] hover:text-[#172B4D] hover:bg-[#EAF4FF] transition cursor-pointer"
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
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#172B4D]">
                  Interactive {selectedCity} Map
                </h2>
                <p className="text-xs text-[#5F6F82]">
                  Showing real lat/lng coordinates across {selectedCity} with OpenStreetMap tiles
                </p>
              </div>
              <button
                type="button"
                onClick={() => setViewMode("list")}
                className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 text-xs font-bold text-[#172B4D] shadow-xs border border-[#DCE5EF] hover:border-[#1769E0] hover:text-[#1769E0] transition cursor-pointer"
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
        <div className="pointer-events-auto inline-flex items-center gap-1.5 rounded-full bg-white/90 backdrop-blur-xl px-2.5 py-1.5 shadow-[0_12px_32px_rgba(23,43,77,0.12)] border border-[#DCE5EF]/80">
          {/* Discover Tab */}
          <button
            type="button"
            onClick={() => {
              setActiveNavTab("discover");
              setViewMode("list");
            }}
            className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold transition-all duration-200 cursor-pointer ${
              activeNavTab === "discover" && viewMode === "list"
                ? "bg-[#1769E0] text-white shadow-[0_2px_8px_rgba(23,105,224,0.3)]"
                : "text-[#5F6F82] hover:text-[#172B4D] hover:bg-black/5"
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
                ? "bg-[#1769E0] text-white shadow-[0_2px_8px_rgba(23,105,224,0.3)]"
                : "text-[#5F6F82] hover:text-[#172B4D] hover:bg-black/5"
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
                    ? "bg-white text-[#1769E0]"
                    : "bg-[#EAF4FF] text-[#1769E0]"
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
                ? "bg-[#1769E0] text-white shadow-[0_2px_8px_rgba(23,105,224,0.3)]"
                : "text-[#5F6F82] hover:text-[#172B4D] hover:bg-black/5"
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
                ? "bg-[#1769E0] text-white shadow-[0_2px_8px_rgba(23,105,224,0.3)]"
                : "text-[#5F6F82] hover:text-[#172B4D] hover:bg-black/5"
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
            className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white shadow-[0_24px_48px_rgba(23,43,77,0.18)] border border-[#DCE5EF] p-6 sm:p-8 flex flex-col gap-4 text-left"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              type="button"
              onClick={() => setSelectedModalPlace(null)}
              className="absolute top-5 right-5 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-[#F5F8FC] text-[#5F6F82] hover:bg-[#DCE5EF] hover:text-[#172B4D] transition cursor-pointer"
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
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-[#F5F8FC]">
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
                <span className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#0F8B8D]">
                  {selectedModalPlace.category}
                </span>
                <span className="font-semibold text-sm text-[#172B4D] bg-[#F5F8FC] px-2.5 py-0.5 rounded-md border border-[#DCE5EF]">
                  {selectedModalPlace.price.replace(/\$/g, "₹")}
                </span>
              </div>
              <h2 className="mt-1 text-2xl font-bold tracking-tight text-[#172B4D]">
                {selectedModalPlace.name}
              </h2>
              <div className="mt-3 flex flex-wrap items-center gap-2">
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
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F5F8FC] px-3 py-1 text-[11px] font-medium text-[#5F6F82] border border-[#DCE5EF]">
                  {selectedModalPlace.bestTime}
                </span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-[#5F6F82]">
                {selectedModalPlace.description}
              </p>
            </div>

            {/* Modal Vibe & Actions */}
            <div className="mt-4 pt-4 border-t border-[#DCE5EF] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="text-xs text-[#5F6F82]">
                <span className="font-semibold text-[#172B4D] mr-1.5">Vibe:</span>
                <span>{selectedModalPlace.vibe}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={(e) => toggleBookmark(selectedModalPlace.id, e)}
                  className={`inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-semibold border transition cursor-pointer ${
                    bookmarkedIds.includes(selectedModalPlace.id)
                      ? "bg-[#1769E0] text-white border-[#1769E0]"
                      : "bg-white text-[#172B4D] border-[#DCE5EF] hover:bg-[#F5F8FC]"
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
                  className="inline-flex items-center gap-1.5 rounded-xl border border-[#DCE5EF] bg-[#F5F8FC] px-4 py-2 text-xs font-semibold text-[#172B4D] hover:bg-[#EAF4FF] hover:border-[#1769E0]/50 hover:text-[#1769E0] transition cursor-pointer"
                >
                  View on Map
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedModalPlace(null)}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-[#1769E0] px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-[#1247A8] transition cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
