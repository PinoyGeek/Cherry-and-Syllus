"use client"

import React, { useEffect, useState } from "react"
import Image from "next/image"
import { siteConfig } from "@/content/site"

interface LoadingScreenProps {
  onComplete: () => void
}

/** Splits a date string like "May 16, 2026" into ["05", "16", "26"] */
function getDateSegments(dateStr: string): string[] {
  const d = new Date(dateStr)
  return [
    String(d.getMonth() + 1).padStart(2, "0"),
    String(d.getDate()).padStart(2, "0"),
    String(d.getFullYear()).slice(-2),
  ]
}

const GHOST_NUMBERS = getDateSegments(siteConfig.wedding.date)

/** Fixed particle positions — avoids hydration mismatch */
const PARTICLES = [
  { id: 0, left: "7%",  bottom: "10%", delay: "0s",    dur: "5.2s", size: 3   },
  { id: 1, left: "17%", bottom: "28%", delay: "0.8s",  dur: "6.8s", size: 2   },
  { id: 2, left: "29%", bottom: "7%",  delay: "1.5s",  dur: "4.6s", size: 1.5 },
  { id: 3, left: "44%", bottom: "20%", delay: "2.2s",  dur: "7.1s", size: 2.5 },
  { id: 4, left: "57%", bottom: "5%",  delay: "0.4s",  dur: "5.7s", size: 2   },
  { id: 5, left: "69%", bottom: "23%", delay: "1.9s",  dur: "6.3s", size: 1.5 },
  { id: 6, left: "81%", bottom: "14%", delay: "1.0s",  dur: "4.2s", size: 3   },
  { id: 7, left: "91%", bottom: "32%", delay: "2.6s",  dur: "5.8s", size: 2   },
  { id: 8, left: "13%", bottom: "48%", delay: "3.3s",  dur: "7.6s", size: 1.5 },
  { id: 9, left: "74%", bottom: "42%", delay: "1.2s",  dur: "6.6s", size: 2.5 },
]

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [fadeOut, setFadeOut] = useState(false)
  const [progress, setProgress] = useState(0)
  const [monogramVisible, setMonogramVisible] = useState(false)
  const [nameVisible, setNameVisible] = useState(false)
  const [supportVisible, setSupportVisible] = useState(false)
  const [dateVisible, setDateVisible] = useState(false)
  const [progressVisible, setProgressVisible] = useState(false)

  const TOTAL_LOAD_MS = 8000
  const FADE_MS = 600

  useEffect(() => {
    const t0 = setTimeout(() => setMonogramVisible(true), 80)
    const t1 = setTimeout(() => setNameVisible(true),     300)
    const t2 = setTimeout(() => setSupportVisible(true),  520)
    const t3 = setTimeout(() => setDateVisible(true),     680)
    const t4 = setTimeout(() => setProgressVisible(true), 840)
    return () => {
      clearTimeout(t0); clearTimeout(t1); clearTimeout(t2)
      clearTimeout(t3); clearTimeout(t4)
    }
  }, [])

  useEffect(() => {
    let rafId = 0
    const start = performance.now()

    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)

    const tick = (now: number) => {
      const elapsed = now - start
      const t = Math.min(1, Math.max(0, elapsed / TOTAL_LOAD_MS))

      // Smooth, time-based progress (drift-free). Quantize to integer for the % label.
      const next = Math.round(easeOutCubic(t) * 100)
      setProgress((prev) => (next > prev ? next : prev))

      if (t < 1) rafId = requestAnimationFrame(tick)
    }

    rafId = requestAnimationFrame(tick)

    // Ensure the total loader duration is exactly TOTAL_LOAD_MS.
    const fadeTimer = setTimeout(() => setFadeOut(true), Math.max(0, TOTAL_LOAD_MS - FADE_MS))
    const completeTimer = setTimeout(() => {
      setProgress(100)
      onComplete()
    }, TOTAL_LOAD_MS)

    return () => {
      cancelAnimationFrame(rafId)
      clearTimeout(fadeTimer)
      clearTimeout(completeTimer)
    }
  }, [onComplete])

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center overflow-hidden transition-opacity duration-700 ease-out ${
        fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      role="progressbar"
      aria-valuenow={progress}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Loading invitation"
    >
      {/* ── Layer 1: solid motif-deep base ── */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: "var(--color-motif-deep)" }}
      />

      {/* ── Layer 2: radial vignette for depth ── */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 75% 65% at 50% 48%, transparent 25%, rgba(0,0,0,0.5) 100%)",
        }}
      />

      {/* ── Layer 3: floating particles ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
        {PARTICLES.map((p) => (
          <span
            key={p.id}
            className="absolute rounded-full animate-loader-float"
            style={
              {
                left: p.left,
                bottom: p.bottom,
                width: `${p.size}px`,
                height: `${p.size}px`,
                "--delay": p.delay,
                "--dur": p.dur,
                backgroundColor: "var(--color-motif-accent)",
                opacity: 0,
              } as React.CSSProperties
            }
          />
        ))}
      </div>

      {/* ── Layer 4: ghost date numbers (right side) ── */}
      <div
        className="absolute inset-0 pointer-events-none flex flex-col items-end justify-center pr-6 sm:pr-10 md:pr-14 lg:pr-20 select-none"
        aria-hidden
      >
        {GHOST_NUMBERS.map((num, i) => (
          <span
            key={num}
            className="text-[7rem] sm:text-[9rem] md:text-[11rem] lg:text-[13rem] font-bold leading-[0.85] transition-opacity duration-1000 ease-out"
            style={{
              fontFamily: '"Scope One", serif',
              color: "color-mix(in srgb, var(--color-motif-soft) 5%, transparent)",
              letterSpacing: "-0.03em",
              opacity: nameVisible ? 1 : 0,
              transitionDelay: `${i * 90}ms`,
            }}
          >
            {num}
          </span>
        ))}
      </div>

      {/* ── Main content ── */}
      <div className="relative z-10 w-full max-w-lg mx-auto px-6 sm:px-8 md:px-10 text-center">

        {/* Monogram + glow ring */}
        <div
          className={`mb-6 sm:mb-8 flex justify-center transition-all duration-700 ease-out ${
            monogramVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 -translate-y-5 scale-95"
          }`}
        >
          <div className="relative flex items-center justify-center">
            <div
              className="absolute rounded-full animate-loader-glow"
              style={{
                width: "160px",
                height: "160px",
                background:
                  "radial-gradient(circle, color-mix(in srgb, var(--color-motif-accent) 22%, transparent) 0%, transparent 72%)",
              }}
            />
            <Image
              src="/monogram/newMonogram.png"
              alt="Monogram"
              width={240}
              height={240}
              className="relative h-28 w-28 sm:h-32 sm:w-32 md:h-36 md:w-36 object-contain object-center brightness-0 invert"
              priority
            />
          </div>
        </div>

        {/* Botanical ornament */}
        <div
          className={`flex justify-center mb-5 sm:mb-6 transition-all duration-700 ease-out ${
            nameVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"
          }`}
          style={{ transitionDelay: "120ms" }}
          aria-hidden
        >
          <svg
            width="110" height="22" viewBox="0 0 110 22" fill="none"
            style={{ color: "var(--color-motif-cream)" }}
          >
            {/* left leaf */}
            <path
              d="M55 11 C46 4 28 1 6 9 C28 7 46 14 55 11Z"
              fill="currentColor" fillOpacity="0.3"
            />
            <path
              d="M55 11 C46 5 30 3 6 9"
              stroke="currentColor" strokeWidth="0.7" strokeOpacity="0.45" fill="none"
            />
            {/* right leaf */}
            <path
              d="M55 11 C64 4 82 1 104 9 C82 7 64 14 55 11Z"
              fill="currentColor" fillOpacity="0.3"
            />
            <path
              d="M55 11 C64 5 80 3 104 9"
              stroke="currentColor" strokeWidth="0.7" strokeOpacity="0.45" fill="none"
            />
            {/* center bloom */}
            <circle cx="55" cy="11" r="2.8" fill="currentColor" fillOpacity="0.55" />
            <circle cx="55" cy="11" r="1.2" fill="currentColor" fillOpacity="0.85" />
          </svg>
        </div>

        {/* Names */}
        <h1
          className={`transition-all duration-700 ease-out ${
            nameVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <span
            className="scope-one-regular text-3xl sm:text-4xl md:text-5xl tracking-[0.2em] uppercase"
            style={{ color: "#F6F4EF" }}
          >
            {siteConfig.couple.brideNickname.trim()}
          </span>
          <br />
          <span
            className="scope-one-regular text-2xl sm:text-3xl md:text-4xl mx-3 font-normal"
            style={{ color: "var(--color-motif-cream)" }}
          >
            &amp;
          </span>
          <br />
          <span
            className="scope-one-regular text-3xl sm:text-4xl md:text-5xl tracking-[0.2em] uppercase"
            style={{ color: "#F6F4EF" }}
          >
            {siteConfig.couple.groomNickname.trim()}
          </span>
        </h1>

        {/* Supporting line */}
        <p
          className={`font-[family-name:var(--font-imperial-script)] text-sm sm:text-base mt-6 sm:mt-8 transition-all duration-600 ease-out ${
            supportVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ color: "var(--color-motif-cream)", fontFamily: '"Rouge Script", cursive' }}
        >
          Together with their families
        </p>

        {/* Wedding date */}
        <p
          className={`scope-one-regular text-[10px] sm:text-[11px] md:text-[12px] tracking-[0.35em] uppercase mt-2 mb-10 sm:mb-12 leading-none transition-all duration-600 ease-out ${
            dateVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{
            color: "#F6F4EF",
            // Subtle glow so the line feels integrated with the loader’s lighting.
            textShadow: "0 0 14px rgba(238, 209, 213, 0.16)",
          }}
          aria-label={`${siteConfig.ceremony.day}, ${siteConfig.wedding.date} · ${siteConfig.ceremony.time}`}
        >
          <span>{siteConfig.ceremony.day}</span>
          <span className="mx-2 opacity-70" aria-hidden>
            ·
          </span>
          <span className="tabular-nums">{siteConfig.wedding.date}</span>
          <span className="mx-2 opacity-70" aria-hidden>
            ·
          </span>
          <span className="tabular-nums">{siteConfig.ceremony.time}</span>
        </p>

        {/* Progress section */}
        <div
          className={`transition-all duration-600 ease-out ${
            progressVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <p
            className="font-[family-name:var(--font-imperial-script)] text-base sm:text-lg mb-4 sm:mb-5"
            style={{ color: "var(--color-motif-cream)", fontFamily: '"Rouge Script", cursive' }}
          >
            Preparing your invitation
          </p>

          {/* Progress bar */}
          <div className="w-full max-w-[260px] mx-auto mb-3 relative">
            <div
              className="h-px sm:h-0.5 rounded-full overflow-hidden"
              style={{
                backgroundColor: "color-mix(in srgb, var(--color-motif-medium) 25%, transparent)",
              }}
              role="presentation"
            >
              <div
                className="h-full rounded-full min-w-[2px] transition-[width] duration-150 ease-linear"
                style={{
                  width: `${Math.max(progress, 2)}%`,
                  backgroundColor: "var(--color-motif-cream)",
                }}
              />
            </div>
          </div>

          <p
            className="scope-one-regular text-[10px] sm:text-xs tracking-[0.3em] tabular-nums mt-3"
            style={{ color: "var(--color-motif-cream)" }}
            aria-live="polite"
          >
            {progress}%
          </p>
        </div>
      </div>
    </div>
  )
}