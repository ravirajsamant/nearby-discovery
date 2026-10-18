"use client";

import React, { useState } from "react";
import Link from "next/link";

interface Swatch {
  name: string;
  variable: string;
  hex: string;
  description: string;
  textColor: string;
}

const BRAND_ACCENT_SWATCHES: Swatch[] = [
  {
    name: "Primary Blue",
    variable: "--color-primary",
    hex: "#1769E0",
    description: "Main actions, navigation active states, primary buttons, links",
    textColor: "#FFFFFF",
  },
  {
    name: "Deep Blue",
    variable: "--color-primary-hover",
    hex: "#1247A8",
    description: "Hover state for primary actions, active pressed states",
    textColor: "#FFFFFF",
  },
  {
    name: "Sky Blue",
    variable: "--color-primary-light",
    hex: "#EAF4FF",
    description: "Informational badge wash, subtle highlights, active row tint",
    textColor: "#172B4D",
  },
  {
    name: "Teal",
    variable: "--color-teal",
    hex: "#0F8B8D",
    description: "Discovery accent, spot categories, explore pills, landmarks",
    textColor: "#FFFFFF",
  },
  {
    name: "Deep Teal",
    variable: "--color-teal-deep",
    hex: "#086F73",
    description: "Teal hover state, high-contrast discovery text",
    textColor: "#FFFFFF",
  },
  {
    name: "Soft Mint",
    variable: "--color-mint",
    hex: "#E7F7F1",
    description: "Low crowd wash, verified indicators, fresh spot highlights",
    textColor: "#172B4D",
  },
  {
    name: "Success Green",
    variable: "--color-success",
    hex: "#16865C",
    description: "Positive crowd status, confirmation states, verified indicators",
    textColor: "#FFFFFF",
  },
];

const NEUTRAL_SWATCHES: Swatch[] = [
  {
    name: "Canvas",
    variable: "--color-canvas",
    hex: "#F5F8FC",
    description: "App page background, cool neutral foundation for low eye strain",
    textColor: "#172B4D",
  },
  {
    name: "Surface White",
    variable: "--color-surface",
    hex: "#FFFFFF",
    description: "Card containers, modals, dropdown menus, sheets",
    textColor: "#172B4D",
  },
  {
    name: "Border",
    variable: "--color-border",
    hex: "#DCE5EF",
    description: "Dividers, container borders, subtle hairline separators",
    textColor: "#172B4D",
  },
  {
    name: "Text Primary",
    variable: "--color-text-primary",
    hex: "#172B4D",
    description: "Headings, titles, high-emphasis text, primary values",
    textColor: "#FFFFFF",
  },
  {
    name: "Text Secondary",
    variable: "--color-text-secondary",
    hex: "#5F6F82",
    description: "Body copy, descriptions, secondary metadata, subtitles",
    textColor: "#FFFFFF",
  },
  {
    name: "Muted",
    variable: "--color-muted",
    hex: "#8A99AB",
    description: "Icons, placeholders, timestamps, disabled elements",
    textColor: "#FFFFFF",
  },
];

const SEMANTIC_SWATCHES: Swatch[] = [
  {
    name: "Warning Amber",
    variable: "--color-warning",
    hex: "#C58A22",
    description: "Moderate crowd warning, approaching closing times, queue alert",
    textColor: "#FFFFFF",
  },
  {
    name: "Error Red",
    variable: "--color-error",
    hex: "#D64545",
    description: "Busy status, closed venues, connection failure, destructive actions",
    textColor: "#FFFFFF",
  },
];

export default function DesignSystemPreviewPage() {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [selectedLocation, setSelectedLocation] = useState<string>("Pune, Maharashtra");
  const [isBookmarked, setIsBookmarked] = useState<boolean>(true);

  return (
    <div
      style={{
        backgroundColor: "var(--color-canvas)",
        color: "var(--color-text-primary)",
        minHeight: "100vh",
      }}
      className="font-['Poppins',sans-serif] pb-24 selection:bg-[#EAF4FF] selection:text-[#1769E0]"
    >
      {/* ==================================================================== */}
      {/* TOP HEADER / APP BAR                                                 */}
      {/* ==================================================================== */}
      <header
        style={{
          backgroundColor: "var(--color-surface)",
          borderBottom: "1px solid var(--color-border)",
        }}
        className="sticky top-0 z-30 px-4 py-3.5 sm:px-8 transition-colors"
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div
              style={{
                background: "var(--gradient-primary)",
              }}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-white shadow-xs"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <circle cx="12" cy="12" r="3" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v3m0 14v3M2 12h3m14 0h3" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm sm:text-base tracking-tight" style={{ color: "var(--color-text-primary)" }}>
                  Nearby Discovery
                </span>
                <span
                  style={{
                    backgroundColor: "var(--color-primary-light)",
                    color: "var(--color-primary)",
                    borderColor: "var(--color-border)",
                  }}
                  className="text-[10px] font-bold px-2 py-0.5 rounded-full border tracking-wide uppercase"
                >
                  Design System v1.0
                </span>
              </div>
              <p className="text-[11px]" style={{ color: "var(--color-text-secondary)" }}>
                Cool-Neutral & Oceanic Palette Preview Sandbox
              </p>
            </div>
          </div>

          <Link
            href="/"
            style={{
              borderColor: "var(--color-border)",
              color: "var(--color-text-secondary)",
              backgroundColor: "var(--color-surface)",
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium hover:border-[#1769E0] hover:text-[#1769E0] transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Back to Main App</span>
          </Link>
        </div>
      </header>

      {/* ==================================================================== */}
      {/* HERO BANNER                                                          */}
      {/* ==================================================================== */}
      <section className="max-w-6xl mx-auto px-4 sm:px-8 pt-8 sm:pt-12">
        <div
          style={{
            background: "var(--gradient-subtle)",
            borderColor: "var(--color-border)",
          }}
          className="rounded-2xl p-6 sm:p-10 border shadow-xs relative overflow-hidden"
        >
          <div className="relative z-10 max-w-2xl">
            <span
              style={{
                backgroundColor: "rgba(15, 139, 141, 0.12)",
                color: "var(--color-teal-deep)",
                borderColor: "rgba(15, 139, 141, 0.25)",
              }}
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full border mb-3"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#0F8B8D]" />
              Evaluation Specification
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight" style={{ color: "var(--color-text-primary)" }}>
              Understated Oceanic & Cool-Neutral Palette
            </h1>
            <p className="mt-2.5 text-sm sm:text-base leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
              A premium travel product design language replacing high-energy orange with confident ocean blues,
              architectural teals, and soft mint accents. Designed for optimal visual scanning, reduced eye strain, and clear semantic distinction.
            </p>

            <div className="mt-5 flex flex-wrap gap-2 text-xs">
              <span className="px-2.5 py-1 rounded-md bg-white/80 border border-[#DCE5EF] text-[#172B4D] font-mono">
                Primary: #1769E0
              </span>
              <span className="px-2.5 py-1 rounded-md bg-white/80 border border-[#DCE5EF] text-[#0F8B8D] font-mono">
                Teal: #0F8B8D
              </span>
              <span className="px-2.5 py-1 rounded-md bg-white/80 border border-[#DCE5EF] text-[#16865C] font-mono">
                Green: #16865C
              </span>
              <span className="px-2.5 py-1 rounded-md bg-white/80 border border-[#DCE5EF] text-[#172B4D] font-mono">
                Canvas: #F5F8FC
              </span>
            </div>
          </div>

          {/* Decorative subtle pattern in background */}
          <div className="pointer-events-none absolute -right-12 -bottom-12 w-64 h-64 rounded-full bg-gradient-to-tr from-[#0F8B8D]/10 to-[#1769E0]/15 blur-2xl" />
        </div>
      </section>

      {/* ==================================================================== */}
      {/* MAIN CONTENT SECTIONS                                                */}
      {/* ==================================================================== */}
      <main className="max-w-6xl mx-auto px-4 sm:px-8 mt-10 space-y-12">
        {/* ================================================================== */}
        {/* SECTION A: COLOR SWATCHES                                          */}
        {/* ================================================================== */}
        <section
          style={{
            backgroundColor: "var(--color-surface)",
            borderColor: "var(--color-border)",
          }}
          className="rounded-2xl p-6 sm:p-8 border shadow-xs"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#DCE5EF] pb-4 mb-6">
            <div>
              <h2 className="text-xl font-bold tracking-tight" style={{ color: "var(--color-text-primary)" }}>
                A. Color Tokens Specification
              </h2>
              <p className="text-xs sm:text-sm mt-0.5" style={{ color: "var(--color-text-secondary)" }}>
                Core design tokens defined as CSS variables in <code>app/globals.css</code>
              </p>
            </div>

            {/* Filter buttons */}
            <div className="flex items-center gap-1.5 bg-[#F5F8FC] p-1 rounded-lg border border-[#DCE5EF]">
              {(["all", "brand", "neutrals", "semantics"] as const).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`text-xs font-medium px-3 py-1 rounded-md capitalize transition-all cursor-pointer ${
                    activeTab === tab
                      ? "bg-white text-[#1769E0] font-semibold shadow-xs"
                      : "text-[#5F6F82] hover:text-[#172B4D]"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Swatches Grid */}
          <div className="space-y-8">
            {/* 1. Brand & Accent */}
            {(activeTab === "all" || activeTab === "brand") && (
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#0F8B8D] mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#0F8B8D]" />
                  Brand & Accent Colors
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5">
                  {BRAND_ACCENT_SWATCHES.map((swatch) => (
                    <div
                      key={swatch.variable}
                      style={{ borderColor: "var(--color-border)" }}
                      className="rounded-xl border overflow-hidden bg-white shadow-xs hover:border-[#1769E0]/40 transition-colors"
                    >
                      <div
                        style={{ backgroundColor: swatch.hex }}
                        className="h-20 w-full p-3 flex flex-col justify-between border-b border-[#DCE5EF]/60 relative"
                      >
                        <span
                          style={{
                            color: swatch.textColor,
                            backgroundColor: "rgba(0,0,0,0.15)",
                          }}
                          className="text-[10px] font-mono px-2 py-0.5 rounded backdrop-blur-xs self-start"
                        >
                          {swatch.hex}
                        </span>
                      </div>
                      <div className="p-3">
                        <div className="flex items-baseline justify-between gap-2">
                          <span className="font-bold text-xs" style={{ color: "var(--color-text-primary)" }}>
                            {swatch.name}
                          </span>
                          <span className="text-[10px] font-mono text-[#5F6F82]">
                            {swatch.variable}
                          </span>
                        </div>
                        <p className="text-[11px] leading-snug mt-1 text-[#5F6F82]">
                          {swatch.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 2. Neutrals & Text */}
            {(activeTab === "all" || activeTab === "neutrals") && (
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#5F6F82] mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#5F6F82]" />
                  Neutrals & Typography Surfaces
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-3.5">
                  {NEUTRAL_SWATCHES.map((swatch) => (
                    <div
                      key={swatch.variable}
                      style={{ borderColor: "var(--color-border)" }}
                      className="rounded-xl border overflow-hidden bg-white shadow-xs hover:border-[#1769E0]/40 transition-colors"
                    >
                      <div
                        style={{ backgroundColor: swatch.hex }}
                        className="h-16 w-full p-3 flex items-start justify-between border-b border-[#DCE5EF]"
                      >
                        <span
                          style={{
                            color: swatch.textColor,
                            backgroundColor: swatch.hex === "#FFFFFF" || swatch.hex === "#F5F8FC" ? "#172B4D" : "rgba(255,255,255,0.2)",
                          }}
                          className="text-[10px] font-mono px-2 py-0.5 rounded text-white"
                        >
                          {swatch.hex}
                        </span>
                      </div>
                      <div className="p-3">
                        <div className="flex items-baseline justify-between gap-2">
                          <span className="font-bold text-xs" style={{ color: "var(--color-text-primary)" }}>
                            {swatch.name}
                          </span>
                          <span className="text-[10px] font-mono text-[#5F6F82]">
                            {swatch.variable}
                          </span>
                        </div>
                        <p className="text-[11px] leading-snug mt-1 text-[#5F6F82]">
                          {swatch.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 3. Semantic Colors */}
            {(activeTab === "all" || activeTab === "semantics") && (
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#C58A22] mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#C58A22]" />
                  Semantic Status Indicators
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {SEMANTIC_SWATCHES.map((swatch) => (
                    <div
                      key={swatch.variable}
                      style={{ borderColor: "var(--color-border)" }}
                      className="rounded-xl border overflow-hidden bg-white shadow-xs"
                    >
                      <div
                        style={{ backgroundColor: swatch.hex }}
                        className="h-16 w-full p-3 flex items-start justify-between"
                      >
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/20 text-white">
                          {swatch.hex}
                        </span>
                      </div>
                      <div className="p-3">
                        <div className="flex items-baseline justify-between gap-2">
                          <span className="font-bold text-xs" style={{ color: "var(--color-text-primary)" }}>
                            {swatch.name}
                          </span>
                          <span className="text-[10px] font-mono text-[#5F6F82]">
                            {swatch.variable}
                          </span>
                        </div>
                        <p className="text-[11px] leading-snug mt-1 text-[#5F6F82]">
                          {swatch.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ================================================================== */}
        {/* SECTION B: BUTTONS                                                 */}
        {/* ================================================================== */}
        <section
          style={{
            backgroundColor: "var(--color-surface)",
            borderColor: "var(--color-border)",
          }}
          className="rounded-2xl p-6 sm:p-8 border shadow-xs"
        >
          <div className="border-b border-[#DCE5EF] pb-4 mb-6">
            <h2 className="text-xl font-bold tracking-tight" style={{ color: "var(--color-text-primary)" }}>
              B. Buttons & Interactive States
            </h2>
            <p className="text-xs sm:text-sm mt-0.5" style={{ color: "var(--color-text-secondary)" }}>
              Buttons structured with comfortable touch targets, subtle border radiuses (8–12px), and clear active/hover visual cues.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* 1. Primary Blue Button */}
            <div className="flex flex-col gap-2.5">
              <span className="text-xs font-semibold text-[#172B4D]">Primary Blue</span>
              <button
                type="button"
                style={{
                  backgroundColor: "var(--color-primary)",
                  color: "#FFFFFF",
                }}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-medium text-xs shadow-xs hover:bg-[#1247A8] active:scale-[0.98] transition-all cursor-pointer"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
                <span>Discover Spots</span>
              </button>
              <span className="text-[11px] text-[#5F6F82]">
                Key CTA: <code>#1769E0</code> with <code>#1247A8</code> hover
              </span>
            </div>

            {/* 2. Secondary Outlined Button */}
            <div className="flex flex-col gap-2.5">
              <span className="text-xs font-semibold text-[#172B4D]">Secondary Outlined</span>
              <button
                type="button"
                style={{
                  borderColor: "var(--color-border)",
                  color: "var(--color-text-primary)",
                  backgroundColor: "var(--color-surface)",
                }}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border font-medium text-xs hover:bg-[#EAF4FF] hover:border-[#1769E0]/40 hover:text-[#1769E0] active:scale-[0.98] transition-all cursor-pointer"
              >
                <svg className="w-4 h-4 text-[#5F6F82]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                <span>View On Map</span>
              </button>
              <span className="text-[11px] text-[#5F6F82]">
                Hairline border: <code>#DCE5EF</code>
              </span>
            </div>

            {/* 3. Teal Accent Button */}
            <div className="flex flex-col gap-2.5">
              <span className="text-xs font-semibold text-[#172B4D]">Teal Accent</span>
              <button
                type="button"
                style={{
                  backgroundColor: "var(--color-teal)",
                  color: "#FFFFFF",
                }}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-medium text-xs shadow-xs hover:bg-[#086F73] active:scale-[0.98] transition-all cursor-pointer"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
                <span>Curated Heritage</span>
              </button>
              <span className="text-[11px] text-[#5F6F82]">
                Discovery action: <code>#0F8B8D</code>
              </span>
            </div>

            {/* 4. Disabled State */}
            <div className="flex flex-col gap-2.5">
              <span className="text-xs font-semibold text-[#172B4D]">Disabled Button</span>
              <button
                type="button"
                disabled
                style={{
                  backgroundColor: "#E8EEF5",
                  color: "var(--color-muted)",
                  borderColor: "var(--color-border)",
                }}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border font-medium text-xs cursor-not-allowed opacity-75"
              >
                <span>Action Unavailable</span>
              </button>
              <span className="text-[11px] text-[#5F6F82]">
                Muted text: <code>#8A99AB</code>
              </span>
            </div>
          </div>
        </section>

        {/* ================================================================== */}
        {/* SECTION C: FORM ELEMENTS                                           */}
        {/* ================================================================== */}
        <section
          style={{
            backgroundColor: "var(--color-surface)",
            borderColor: "var(--color-border)",
          }}
          className="rounded-2xl p-6 sm:p-8 border shadow-xs"
        >
          <div className="border-b border-[#DCE5EF] pb-4 mb-6">
            <h2 className="text-xl font-bold tracking-tight" style={{ color: "var(--color-text-primary)" }}>
              C. Form Elements & Inputs
            </h2>
            <p className="text-xs sm:text-sm mt-0.5" style={{ color: "var(--color-text-secondary)" }}>
              Search inputs and interactive location controls with refined focus states and quiet resting aesthetics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Search Input Demo */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-[#172B4D]">
                Unified Search Input (Default)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#8A99AB]">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m1.85-5.15a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  readOnly
                  value="Search anything"
                  style={{
                    backgroundColor: "var(--color-canvas)",
                    borderColor: "var(--color-border)",
                    color: "var(--color-text-secondary)",
                  }}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border text-xs font-medium focus:outline-none"
                />
              </div>
              <span className="text-[11px] text-[#5F6F82]">
                Canvas background (<code>#F5F8FC</code>) with border <code>#DCE5EF</code>
              </span>
            </div>

            {/* Focused State Demo */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-[#172B4D]">
                Search Input (Active Focused State)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#1769E0]">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m1.85-5.15a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  readOnly
                  value="Shaniwar Wada, Pune"
                  style={{
                    backgroundColor: "var(--color-surface)",
                    borderColor: "var(--color-primary)",
                    boxShadow: "0 0 0 3px rgba(23, 105, 224, 0.15)",
                    color: "var(--color-text-primary)",
                  }}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border text-xs font-medium focus:outline-none"
                />
              </div>
              <span className="text-[11px] text-[#1769E0]">
                Active primary ring: <code>#1769E0</code> focus ring with surface white
              </span>
            </div>

            {/* Dropdown-Style Location Field */}
            <div className="flex flex-col gap-2 md:col-span-2">
              <label className="text-xs font-semibold text-[#172B4D]">
                Dropdown-Style Location Selector
              </label>
              <div className="relative max-w-md">
                <button
                  type="button"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  style={{
                    backgroundColor: "var(--color-surface)",
                    borderColor: dropdownOpen ? "var(--color-primary)" : "var(--color-border)",
                    boxShadow: dropdownOpen ? "0 0 0 3px rgba(23, 105, 224, 0.15)" : "none",
                  }}
                  className="w-full flex items-center justify-between p-2.5 rounded-xl border text-xs font-medium transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-[#EAF4FF] flex items-center justify-center text-[#1769E0]">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div className="text-left">
                      <span className="text-[10px] text-[#5F6F82] block leading-none">Discovery Region</span>
                      <span className="font-bold text-xs text-[#172B4D]">{selectedLocation}</span>
                    </div>
                  </div>
                  <svg
                    className={`w-4 h-4 text-[#8A99AB] transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown Menu Preview */}
                {dropdownOpen && (
                  <div
                    style={{
                      backgroundColor: "var(--color-surface)",
                      borderColor: "var(--color-border)",
                    }}
                    className="absolute top-full left-0 right-0 mt-1.5 p-1.5 rounded-xl border shadow-lg z-20 space-y-1"
                  >
                    {["Pune, Maharashtra", "Mumbai, Maharashtra", "Bangalore, Karnataka", "Delhi, NCR"].map((city) => (
                      <button
                        key={city}
                        type="button"
                        onClick={() => {
                          setSelectedLocation(city);
                          setDropdownOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs transition cursor-pointer text-left ${
                          selectedLocation === city
                            ? "bg-[#EAF4FF] text-[#1769E0] font-semibold"
                            : "text-[#172B4D] hover:bg-[#F5F8FC]"
                        }`}
                      >
                        <span>{city}</span>
                        {selectedLocation === city && (
                          <svg className="w-3.5 h-3.5 text-[#1769E0]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================== */}
        {/* SECTION D: PLACE-CARD PREVIEW                                      */}
        {/* ================================================================== */}
        <section
          style={{
            backgroundColor: "var(--color-surface)",
            borderColor: "var(--color-border)",
          }}
          className="rounded-2xl p-6 sm:p-8 border shadow-xs"
        >
          <div className="border-b border-[#DCE5EF] pb-4 mb-6">
            <h2 className="text-xl font-bold tracking-tight" style={{ color: "var(--color-text-primary)" }}>
              D. Place-Card Preview (Design System v1.0)
            </h2>
            <p className="text-xs sm:text-sm mt-0.5" style={{ color: "var(--color-text-secondary)" }}>
              Compact horizontal place card demonstrating 8px corner radius, oceanic blue actions, teal category labeling, ₹ rupee price level, and km distance formatting.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            {/* The v1.0 Card */}
            <article
              style={{
                backgroundColor: "var(--color-surface)",
                borderColor: "var(--color-border)",
                borderRadius: "8px",
              }}
              className="group relative flex flex-col sm:flex-row items-stretch overflow-hidden border shadow-[0_2px_8px_rgba(23,43,77,0.04)] hover:shadow-[0_8px_24px_rgba(23,43,77,0.08)] hover:border-[#1769E0]/40 transition-all cursor-pointer text-left"
            >
              {/* Left Column: 4:3 Landscape Thumbnail with 8px clipping */}
              <div
                style={{ backgroundColor: "var(--color-canvas)" }}
                className="relative w-full sm:w-[200px] shrink-0 aspect-[4/3] self-stretch overflow-hidden"
              >
                {/* CSS Illustration Placeholder for Heritage Landmark */}
                <div
                  style={{
                    background: "linear-gradient(135deg, #1769E0 0%, #0F8B8D 100%)",
                  }}
                  className="w-full h-full flex flex-col items-center justify-center text-white p-4 relative"
                >
                  <svg className="w-12 h-12 opacity-85" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  <span className="text-[10px] uppercase tracking-widest font-semibold mt-1 opacity-90">
                    Aga Khan Palace
                  </span>
                </div>

                {/* Subtle ambient overlay */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />

                {/* Rank Badge */}
                <span className="absolute top-2 left-2 inline-flex items-center rounded-full bg-black/60 backdrop-blur-md px-2 py-0.5 text-[10px] font-bold tracking-wider text-white border border-white/20 shadow-xs">
                  #1
                </span>

                {/* Bookmark Button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsBookmarked(!isBookmarked);
                  }}
                  className={`absolute top-2 right-2 flex h-6 w-6 items-center justify-center rounded-full backdrop-blur-md border transition-all duration-200 active:scale-90 shadow-xs cursor-pointer ${
                    isBookmarked
                      ? "bg-[#1769E0] text-white border-[#1769E0]"
                      : "bg-black/45 text-white border-white/20 hover:bg-black/65"
                  }`}
                  title={isBookmarked ? "Saved" : "Save spot"}
                >
                  <svg className="h-3 w-3" fill={isBookmarked ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                  </svg>
                </button>
              </div>

              {/* Content Area */}
              <div className="flex-1 min-w-0 flex flex-col sm:flex-row items-stretch justify-between">
                {/* Middle: Place Information */}
                <div className="flex-1 min-w-0 p-3 sm:p-4 flex flex-col justify-start gap-1.5 sm:gap-2">
                  {/* Category in Teal */}
                  <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.14em] uppercase text-[#0F8B8D] block">
                    HERITAGE LANDMARK
                  </span>

                  {/* Title */}
                  <h3 className="text-sm sm:text-base md:text-[1.05rem] font-bold tracking-tight text-[#172B4D] group-hover:text-[#1769E0] transition-colors leading-snug line-clamp-2">
                    Aga Khan Palace & Memorial Gardens
                  </h3>

                  {/* Badges */}
                  <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                    {/* Low crowd pill in mint */}
                    <span className="inline-flex items-center gap-1 sm:gap-1.5 rounded-full px-2 sm:px-2.5 py-0.5 text-[10px] sm:text-[11px] font-semibold bg-[#E7F7F1] text-[#16865C] border border-[#16865C]/30">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#16865C]" />
                      Low crowd • No wait
                    </span>

                    {/* Best-time pill */}
                    <span className="inline-flex items-center gap-1 sm:gap-1.5 rounded-full bg-[#F5F8FC] px-2 sm:px-2.5 py-0.5 text-[10px] sm:text-[11px] font-medium text-[#5F6F82] border border-[#DCE5EF]">
                      <svg className="h-3 w-3 text-[#8A99AB]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Afternoon (3–5:30 PM)
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-[13px] leading-relaxed text-[#5F6F82] font-normal line-clamp-2">
                    Italianate landmark featuring tranquil cloistered colonnades, landscaped gardens, and the Mahatma Gandhi memorial.
                  </p>
                </div>

                {/* Right: Secondary Info & Actions */}
                <div
                  style={{ borderColor: "var(--color-border)" }}
                  className="shrink-0 p-3 sm:p-4 flex flex-wrap sm:flex-col justify-between items-center sm:items-center border-t sm:border-t-0 sm:border-l gap-2.5 sm:gap-3 sm:w-[220px] bg-[#F5F8FC]/50 sm:bg-transparent"
                >
                  {/* Top secondary: Price in ₹ and Distance in km */}
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <span className="font-bold text-xs tracking-wider text-[#172B4D] bg-[#F5F8FC] px-2.5 py-1 rounded-md border border-[#DCE5EF]">
                      ₹₹
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-[#F5F8FC] px-2.5 py-1 text-xs font-semibold text-[#5F6F82] border border-[#DCE5EF]">
                      <svg className="h-3.5 w-3.5 text-[#1769E0]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      1.3 km
                    </span>
                  </div>

                  {/* Bottom: Equal-spaced Map and Details buttons */}
                  <div className="flex items-center justify-center gap-1.5 sm:gap-2">
                    <button
                      type="button"
                      className="inline-flex items-center gap-1.5 rounded-xl border border-[#DCE5EF] bg-white px-3 py-1.5 text-xs font-semibold text-[#172B4D] hover:bg-[#EAF4FF] hover:border-[#1769E0]/50 hover:text-[#1769E0] transition-colors shadow-xs"
                    >
                      <svg className="h-3.5 w-3.5 text-[#5F6F82]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                      </svg>
                      Map
                    </button>

                    <button
                      type="button"
                      style={{
                        backgroundColor: "var(--color-primary)",
                      }}
                      className="inline-flex items-center gap-1 rounded-xl px-3.5 py-1.5 text-xs font-semibold text-white shadow-xs hover:bg-[#1247A8] active:scale-95 transition-all"
                    >
                      <span>Details</span>
                      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </section>

        {/* ================================================================== */}
        {/* SECTION E: BADGES & STATUS PILLS                                   */}
        {/* ================================================================== */}
        <section
          style={{
            backgroundColor: "var(--color-surface)",
            borderColor: "var(--color-border)",
          }}
          className="rounded-2xl p-6 sm:p-8 border shadow-xs"
        >
          <div className="border-b border-[#DCE5EF] pb-4 mb-6">
            <h2 className="text-xl font-bold tracking-tight" style={{ color: "var(--color-text-primary)" }}>
              E. Badges & Status Pills
            </h2>
            <p className="text-xs sm:text-sm mt-0.5" style={{ color: "var(--color-text-secondary)" }}>
              Semantically consistent badge styles for crowd levels, timing, curated categories, and system states.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* 1. Neutral Badge */}
            <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium bg-[#F5F8FC] text-[#5F6F82] border border-[#DCE5EF]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8A99AB]" />
              Neutral Metadata
            </span>

            {/* 2. Informational Blue Badge */}
            <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold bg-[#EAF4FF] text-[#1247A8] border border-[#1769E0]/30">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1769E0]" />
              Informational Blue
            </span>

            {/* 3. Teal Discovery Badge */}
            <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold bg-[#0F8B8D]/10 text-[#086F73] border border-[#0F8B8D]/30">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0F8B8D]" />
              Curated Discovery
            </span>

            {/* 4. Positive Mint/Green Badge */}
            <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold bg-[#E7F7F1] text-[#16865C] border border-[#16865C]/30">
              <span className="w-1.5 h-1.5 rounded-full bg-[#16865C]" />
              Low Crowd • No Wait
            </span>

            {/* 5. Warning Amber Badge */}
            <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold bg-[#C58A22]/10 text-[#C58A22] border border-[#C58A22]/30">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C58A22]" />
              Moderate Wait • 15 min
            </span>

            {/* 6. Error Red Badge */}
            <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold bg-[#D64545]/10 text-[#D64545] border border-[#D64545]/30">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D64545]" />
              Busy • Peak Hours
            </span>
          </div>
        </section>

        {/* ================================================================== */}
        {/* SECTION F: GRADIENTS                                               */}
        {/* ================================================================== */}
        <section
          style={{
            backgroundColor: "var(--color-surface)",
            borderColor: "var(--color-border)",
          }}
          className="rounded-2xl p-6 sm:p-8 border shadow-xs"
        >
          <div className="border-b border-[#DCE5EF] pb-4 mb-6">
            <h2 className="text-xl font-bold tracking-tight" style={{ color: "var(--color-text-primary)" }}>
              F. Gradient Tokens Specification
            </h2>
            <p className="text-xs sm:text-sm mt-0.5" style={{ color: "var(--color-text-secondary)" }}>
              Intentional linear blends providing modern visual depth without visual clutter or contrast issues.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Primary Gradient */}
            <div
              style={{ borderColor: "var(--color-border)" }}
              className="rounded-xl border p-5 flex flex-col justify-between gap-4 bg-white"
            >
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#1769E0]">
                  --gradient-primary
                </span>
                <h4 className="text-sm font-bold text-[#172B4D] mt-0.5">
                  Oceanic Primary Gradient
                </h4>
                <p className="text-xs text-[#5F6F82] mt-1 font-mono">
                  linear-gradient(135deg, #1769E0 0%, #278CCB 50%, #0F8B8D 100%)
                </p>
              </div>

              <div
                style={{ background: "var(--gradient-primary)" }}
                className="h-16 w-full rounded-lg shadow-xs flex items-center justify-center text-white text-xs font-semibold tracking-wide"
              >
                Hero Highlights & Primary Accent
              </div>

              <p className="text-xs text-[#5F6F82] leading-relaxed">
                <strong>Intended Use:</strong> Discovery hero banner backgrounds, feature spotlight badges, app icons, and high-impact travel milestones.
              </p>
            </div>

            {/* Subtle Gradient */}
            <div
              style={{ borderColor: "var(--color-border)" }}
              className="rounded-xl border p-5 flex flex-col justify-between gap-4 bg-white"
            >
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#0F8B8D]">
                  --gradient-subtle
                </span>
                <h4 className="text-sm font-bold text-[#172B4D] mt-0.5">
                  Sky to Mint Subtle Wash
                </h4>
                <p className="text-xs text-[#5F6F82] mt-1 font-mono">
                  linear-gradient(135deg, #EAF4FF 0%, #E7F7F1 100%)
                </p>
              </div>

              <div
                style={{ background: "var(--gradient-subtle)", borderColor: "var(--color-border)" }}
                className="h-16 w-full rounded-lg border flex items-center justify-center text-[#172B4D] text-xs font-semibold tracking-wide"
              >
                Soft Ambient Canvas Accent
              </div>

              <p className="text-xs text-[#5F6F82] leading-relaxed">
                <strong>Intended Use:</strong> Section container backdrops, quiet card washes, active filter bar pill backgrounds, and empty-state illustrations.
              </p>
            </div>
          </div>
        </section>

        {/* ================================================================== */}
        {/* SECTION G: DESIGN GUIDELINES & RATIONALE                           */}
        {/* ================================================================== */}
        <section
          style={{
            backgroundColor: "var(--color-surface)",
            borderColor: "var(--color-border)",
          }}
          className="rounded-2xl p-6 sm:p-8 border shadow-xs"
        >
          <div className="border-b border-[#DCE5EF] pb-4 mb-6">
            <h2 className="text-xl font-bold tracking-tight" style={{ color: "var(--color-text-primary)" }}>
              G. Architectural Design Guidelines
            </h2>
            <p className="text-xs sm:text-sm mt-0.5" style={{ color: "var(--color-text-secondary)" }}>
              Clear rules ensuring consistency and semantic clarity before any global application.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* 1. When to use Blue */}
            <div className="p-4 rounded-xl bg-[#F5F8FC] border border-[#DCE5EF]">
              <div className="w-6 h-6 rounded-md bg-[#1769E0] text-white flex items-center justify-center text-xs font-bold mb-2.5">
                B
              </div>
              <h4 className="font-bold text-xs text-[#172B4D]">When to use Blue</h4>
              <p className="text-xs text-[#5F6F82] mt-1 leading-relaxed">
                Primary navigation, essential action buttons (&ldquo;Details&rdquo;, &ldquo;Apply&rdquo;), input focus indicators, active tab indicator bars, and hyperlinked text.
              </p>
            </div>

            {/* 2. When to use Teal */}
            <div className="p-4 rounded-xl bg-[#F5F8FC] border border-[#DCE5EF]">
              <div className="w-6 h-6 rounded-md bg-[#0F8B8D] text-white flex items-center justify-center text-xs font-bold mb-2.5">
                T
              </div>
              <h4 className="font-bold text-xs text-[#172B4D]">When to use Teal</h4>
              <p className="text-xs text-[#5F6F82] mt-1 leading-relaxed">
                Discovery highlights, place category labels (e.g. &ldquo;HERITAGE LANDMARK&rdquo;), curated recommendations, and regional spot exploration badges.
              </p>
            </div>

            {/* 3. When to use Green */}
            <div className="p-4 rounded-xl bg-[#F5F8FC] border border-[#DCE5EF]">
              <div className="w-6 h-6 rounded-md bg-[#16865C] text-white flex items-center justify-center text-xs font-bold mb-2.5">
                G
              </div>
              <h4 className="font-bold text-xs text-[#172B4D]">When to use Green / Mint</h4>
              <p className="text-xs text-[#5F6F82] mt-1 leading-relaxed">
                &ldquo;Low crowd / No wait&rdquo; indicators, verified location checkmarks, open-status timings, and positive confirmation toasts.
              </p>
            </div>

            {/* 4. Neutral Surfaces */}
            <div className="p-4 rounded-xl bg-[#F5F8FC] border border-[#DCE5EF]">
              <div className="w-6 h-6 rounded-md bg-[#5F6F82] text-white flex items-center justify-center text-xs font-bold mb-2.5">
                N
              </div>
              <h4 className="font-bold text-xs text-[#172B4D]">Neutral Surface Hierarchy</h4>
              <p className="text-xs text-[#5F6F82] mt-1 leading-relaxed">
                Use Canvas (<code>#F5F8FC</code>) as the page base. Use Surface White (<code>#FFFFFF</code>) for interactive cards. Separate with 1px border (<code>#DCE5EF</code>).
              </p>
            </div>

            {/* 5. Gradients Usage */}
            <div className="p-4 rounded-xl bg-[#F5F8FC] border border-[#DCE5EF]">
              <div className="w-6 h-6 rounded-md bg-gradient-to-r from-[#1769E0] to-[#0F8B8D] text-white flex items-center justify-center text-xs font-bold mb-2.5">
                ✦
              </div>
              <h4 className="font-bold text-xs text-[#172B4D]">Appropriate Gradients</h4>
              <p className="text-xs text-[#5F6F82] mt-1 leading-relaxed">
                Restricted to hero headers and subtle wash containers. Never applied to body text, standard form inputs, or small navigation buttons.
              </p>
            </div>

            {/* 6. Semantic Distinctions */}
            <div className="p-4 rounded-xl bg-[#F5F8FC] border border-[#DCE5EF]">
              <div className="w-6 h-6 rounded-md bg-[#C58A22] text-white flex items-center justify-center text-xs font-bold mb-2.5">
                !
              </div>
              <h4 className="font-bold text-xs text-[#172B4D]">Semantic Distinction</h4>
              <p className="text-xs text-[#5F6F82] mt-1 leading-relaxed">
                Amber (<code>#C58A22</code>) and Red (<code>#D64545</code>) remain strictly reserved for crowd warnings, peak hours, and connection alerts—never used as decoration.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* ==================================================================== */}
      {/* FOOTER                                                               */}
      {/* ==================================================================== */}
      <footer className="max-w-6xl mx-auto px-4 sm:px-8 mt-12 pt-6 border-t border-[#DCE5EF] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#5F6F82]">
        <span>Nearby Discovery Design System Specification v1.0 • Isolated Preview</span>
        <Link href="/" className="text-[#1769E0] font-medium hover:underline">
          Return to Production Application &rarr;
        </Link>
      </footer>
    </div>
  );
}
