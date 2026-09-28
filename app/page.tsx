"use client";

import { useState, useEffect, useRef } from "react";

interface Place {
  id: number;
  rank: number;
  name: string;
  category: string;
  price: "$" | "$$" | "$$$";
  distance: string;
  area: string;
  crowd: "low" | "moderate" | "busy";
  crowdStatus: string;
  bestTime: string;
  vibe: string;
  description: string;
  image: string;
  lat: number;
  lng: number;
  filterTags: string[];
}

const FILTER_PILLS = [
  {
    id: "Trending",
    label: "Trending",
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
  {
    id: "Chill",
    label: "Chill",
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
] as const;

type FilterPillId = (typeof FILTER_PILLS)[number]["id"];

const PLACES: Place[] = [
  {
    id: 1,
    rank: 1,
    name: "Aga Khan Palace",
    category: "HERITAGE LANDMARK",
    distance: "0.8 mi",
    area: "Yerawada",
    price: "$",
    crowd: "low",
    crowdStatus: "Low crowd • No wait",
    bestTime: "Best: Afternoon (3–5:30 PM)",
    vibe: "Quiet • good for conversations",
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
    distance: "1.4 mi",
    area: "Near Pune Station",
    price: "$",
    crowd: "busy",
    crowdStatus: "Busy • 15 min wait",
    bestTime: "Best: Morning (7:30–10 AM)",
    vibe: "Lively • classic breakfast buzz",
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
    distance: "1.8 mi",
    area: "Fergusson College Rd",
    price: "$",
    crowd: "busy",
    crowdStatus: "Busy • high energy",
    bestTime: "Best: Evening (5:30–9 PM)",
    vibe: "Social • great for street shopping",
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
    distance: "2.1 mi",
    area: "Shaniwar Peth",
    price: "$",
    crowd: "moderate",
    crowdStatus: "Moderate crowd • 5 min wait",
    bestTime: "Best: Morning (9–11:30 AM)",
    vibe: "Historic • monumental stone ramparts",
    description:
      "18th-century Maratha Peshwa fortification featuring massive spiked Dilli Darwaza gates, stone bastions, and fountain gardens.",
    image:
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80",
    lat: 18.5196,
    lng: 73.8553,
    filterTags: ["Trending", "Hidden Gems"],
  },
  {
    id: 5,
    rank: 5,
    name: "Osho Teerth Park",
    category: "ZEN GARDEN",
    distance: "2.5 mi",
    area: "Koregaon Park",
    price: "$",
    crowd: "low",
    crowdStatus: "Low crowd • No wait",
    bestTime: "Best: Early morning (6–8:30 AM)",
    vibe: "Quiet • meditative bamboo walk",
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
    distance: "2.8 mi",
    area: "Deccan Gymkhana",
    price: "$$",
    crowd: "moderate",
    crowdStatus: "Moderate crowd • 10 min wait",
    bestTime: "Best: Morning (8–11 AM)",
    vibe: "Lively • bustling 1935 cafe",
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
    distance: "3.2 mi",
    area: "Baner",
    price: "$",
    crowd: "low",
    crowdStatus: "Low crowd • No wait",
    bestTime: "Best: Afternoon (2–5 PM)",
    vibe: "Quiet • reading & acoustic music",
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
    distance: "3.5 mi",
    area: "Camp",
    price: "$",
    crowd: "busy",
    crowdStatus: "Busy • short rush queue",
    bestTime: "Best: Morning (8–10:30 AM)",
    vibe: "Lively • iconic bakery rush",
    description:
      "Iconic 1955 bakery renowned across India for freshly baked Shrewsbury butter biscuits and warm mawa cakes.",
    image:
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=80",
    lat: 18.5135,
    lng: 73.8784,
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

export default function Home() {
  const [viewMode, setViewMode] = useState<"list" | "map">("list");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterPillId | null>("Trending");
  const [bookmarkedIds, setBookmarkedIds] = useState<number[]>([1, 4]);
  const [selectedModalPlace, setSelectedModalPlace] = useState<Place | null>(null);
  const [selectedMapPlace, setSelectedMapPlace] = useState<Place | null>(PLACES[0]);
  const [activeNavTab, setActiveNavTab] = useState<"discover" | "saved" | "activity" | "profile">("discover");

  // 5) Persist saved items using localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("nearby_pune_saved_places");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
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

  // 2) Filter Click Handler
  const handleFilterClick = (filterId: FilterPillId) => {
    setActiveFilter((prev) => (prev === filterId ? null : filterId));
  };

  // 3) Switch to Map view focusing on a specific place
  const handleOpenMapWithPlace = (place: Place, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSelectedMapPlace(place);
    setViewMode("map");
  };

  // 7) Search & Filter calculation
  const filteredPlaces = PLACES.filter((place) => {
    // 6) Bottom Nav Saved Tab filter
    if (activeNavTab === "saved" && !bookmarkedIds.includes(place.id)) {
      return false;
    }

    const matchesFilter =
      !activeFilter || place.filterTags.includes(activeFilter);

    const query = searchQuery.toLowerCase().trim();
    if (!query) return matchesFilter;

    // Search by name or category
    const matchesSearch =
      place.name.toLowerCase().includes(query) ||
      place.category.toLowerCase().includes(query) ||
      place.area.toLowerCase().includes(query) ||
      place.vibe.toLowerCase().includes(query) ||
      place.description.toLowerCase().includes(query);

    return matchesFilter && matchesSearch;
  });

  const getCrowdBadgeStyle = (level: "low" | "moderate" | "busy") => {
    switch (level) {
      case "low":
        return {
          pill: "bg-emerald-50 text-emerald-700 border-emerald-200/90",
          dot: "bg-emerald-500",
        };
      case "moderate":
        return {
          pill: "bg-amber-50 text-amber-700 border-amber-200/90",
          dot: "bg-amber-500",
        };
      case "busy":
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
            {/* Left: Location icon + Title + Subtext */}
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#FF5B00] text-white shadow-[0_4px_12px_rgba(255,91,0,0.3)] ring-4 ring-[#FF5B00]/10">
                <svg
                  className="h-5 w-5"
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
                  <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#1A1A1A] truncate">
                    Nearby in Pune
                  </h1>
                  <span className="shrink-0 rounded-full bg-[#FF5B00]/10 px-2 py-0.5 text-[10px] font-bold text-[#FF5B00] tracking-wider uppercase">
                    MH-12
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#6B6B6B] truncate font-normal">
                  Curated places around you
                </p>
              </div>
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
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, vibe, or category (e.g. cafes, heritage, markets)"
                className="w-full rounded-full border border-[#EAEAEA] bg-white py-3.5 pl-11 pr-11 text-sm text-[#1A1A1A] placeholder-[#8A8A8A] shadow-[0_2px_8px_rgba(0,0,0,0.03)] outline-none transition duration-200 focus:border-[#FF5B00] focus:ring-4 focus:ring-[#FF5B00]/10"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute inset-y-0 right-0 flex items-center pr-4 text-[#8A8A8A] hover:text-[#FF5B00] transition-colors"
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
                const isActive = activeFilter === pill.id;

                return (
                  <button
                    key={pill.id}
                    type="button"
                    onClick={() => handleFilterClick(pill.id)}
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
                    : activeFilter === null
                    ? "Popular Selections"
                    : `${activeFilter} Places`}
                </h2>
                <p className="text-xs text-[#6B6B6B] font-normal mt-0.5">
                  Curated by proximity and local character
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
                    <p className="text-base font-semibold text-[#1A1A1A]">
                      {activeNavTab === "saved"
                        ? "No saved places yet"
                        : `No entries found matching "${searchQuery || activeFilter}"`}
                    </p>
                    <p className="mt-1 text-xs text-[#6B6B6B]">
                      {activeNavTab === "saved"
                        ? "Click the bookmark icon on any card to save places to your personal list."
                        : "Try adjusting your search terms or picking another category filter."}
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setSearchQuery("");
                        setActiveFilter(null);
                        setActiveNavTab("discover");
                      }}
                      className="mt-4 inline-flex items-center rounded-xl bg-[#FF5B00] px-4 py-2 text-xs font-semibold text-white shadow-[0_2px_8px_rgba(255,91,0,0.3)] hover:bg-[#E05000] transition cursor-pointer"
                    >
                      {activeNavTab === "saved" ? "Explore Places" : "Reset all filters"}
                    </button>
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
                  Interactive Pune Map
                </h2>
                <p className="text-xs text-[#6B6B6B]">
                  Showing real lat/lng coordinates across Pune with OpenStreetMap tiles
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
              selectedPlace={selectedMapPlace}
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
    </div>
  );
}
