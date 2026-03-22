"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { siteConfig } from "@/content/site"

export function Hero() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="relative z-10 w-full min-h-screen flex items-center justify-center px-4 sm:px-6">
        <div
          className={`w-full max-w-xl sm:max-w-2xl rounded-[24px] sm:rounded-[28px] border border-[color-mix(in_srgb,var(--color-motif-silver)_22%,transparent)] bg-[color-mix(in_srgb,var(--color-motif-deep)_92%,black)] px-6 sm:px-10 py-10 sm:py-12 text-center text-balance shadow-2xl transition-all duration-700 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          {/* Monogram at top */}
          <div className="flex justify-center mb-8">
            <Image
              src="/monogram/newMonogram.png"
              alt={`${siteConfig.couple.brideNickname} & ${siteConfig.couple.groomNickname} monogram`}
              width={160}
              height={160}
              className="h-20 w-20 sm:h-24 sm:w-24 object-contain object-center brightness-0 invert"
              priority
            />
          </div>

          {/* Top line: parents / hosts */}
          <p
            className="font-body text-xs sm:text-sm"
            style={{ color: "color-mix(in srgb, var(--color-motif-cream) 72%, transparent)" }}
          >
            Together with their families
          </p>

          <p
            className="mt-3 text-2xl sm:text-3xl"
            style={{
              color: "color-mix(in srgb, var(--color-motif-cream) 88%, transparent)",
              fontFamily: '"Rouge Script", cursive',
            }}
          >
            to celebrate the marriage of
          </p>

          {/* Names */}
          <div className="mt-8 space-y-6">
            <p
              className="scope-one-regular text-3xl sm:text-4xl md:text-5xl tracking-[0.25em] uppercase"
              style={{ color: "var(--color-motif-cream)" }}
            >
              {siteConfig.couple.brideNickname.trim()}
            </p>

            <p
              className="scope-one-regular text-[11px] sm:text-xs tracking-[0.35em] uppercase"
              style={{ color: "color-mix(in srgb, var(--color-motif-cream) 70%, transparent)" }}
            >
             and
            </p>

            <p
              className="scope-one-regular text-3xl sm:text-4xl md:text-5xl tracking-[0.25em] uppercase"
              style={{ color: "var(--color-motif-cream)" }}
            >
              {siteConfig.couple.groomNickname.trim()}
            </p>
          </div>

          {/* Date line */}
          <p
            className="mt-10 scope-one-regular text-[11px] sm:text-xs tracking-[0.35em] uppercase"
            style={{ color: "color-mix(in srgb, var(--color-motif-cream) 80%, transparent)" }}
          >
            on {siteConfig.ceremony.day} {siteConfig.wedding.date.toUpperCase()}
          </p>

          {/* Ceremony details — formal serif */}
          <div className="mt-8 space-y-1">
            <p
              className="scope-one-regular text-sm sm:text-base tracking-[0.28em] uppercase"
              style={{
                color: "color-mix(in srgb, var(--color-motif-cream) 88%, transparent)",
              }}
            >
              Ceremony begins at {siteConfig.ceremony.time}
            </p>
            <p
              className="font-body text-xs sm:text-sm"
              style={{
                color: "color-mix(in srgb, var(--color-motif-cream) 80%, transparent)",
              }}
            >
              in {siteConfig.ceremony.location}
            </p>
          </div>

          {/* Reception line — formal accent */}
          <p
            className="mt-10 scope-one-regular text-sm sm:text-base tracking-[0.28em] uppercase"
            style={{
              color: "color-mix(in srgb, var(--color-motif-cream) 88%, transparent)",
            }}
          >
            reception to follow
          </p>

          <p
            className="mt-3 font-body text-xs sm:text-sm"
            style={{
              color: "color-mix(in srgb, var(--color-motif-cream) 80%, transparent)",
            }}
          >
            in {siteConfig.reception.location}
          </p>

          {/* Primary RSVP button */}
          <div className="mt-10 flex justify-center">
            <a
              href="#rsvp"
              className="inline-flex items-center justify-center px-10 py-3 rounded-sm scope-one-regular text-[11px] sm:text-xs tracking-[0.35em] uppercase transition-colors"
              style={{
                backgroundColor: "var(--color-motif-accent)",
                color: "var(--color-motif-cream)",
                boxShadow:
                  "0 16px 45px color-mix(in srgb, var(--color-motif-accent) 40%, transparent)",
              }}
            >
              RSVP
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}