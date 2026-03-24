"use client"

import { useState } from "react"
import Image from "next/image"
import { Section } from "@/components/section"
import { Cinzel, Cormorant_Garamond, Montserrat } from "next/font/google"
import { siteConfig } from "@/content/site"

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "600"],
})

const GCASH_QR = [
  { id: "gcash1", src: "/QR/gcash.png", label: "GCash 1" },
  { id: "gcash2", src: "/QR/gcash2.png", label: "GCash 2" },
] as const

// Colors sourced from globals.css @theme inline — edit there to update everywhere

export function Registry() {
  const [activeQr, setActiveQr] = useState<"gcash1" | "gcash2">("gcash1")

  return (
    <Section
      id="registry"
      className="relative overflow-hidden py-10 sm:py-12 md:py-16 lg:py-20"
    >
      <div className="relative z-10 text-center mb-6 sm:mb-8 md:mb-10 px-3 sm:px-4">
        <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
          <div className="w-8 sm:w-12 md:w-16 h-px bg-motif-cream/60" />
          <div className="w-1.5 h-1.5 bg-motif-cream/80 rounded-full" />
          <div className="w-1.5 h-1.5 bg-motif-cream/60 rounded-full" />
          <div className="w-1.5 h-1.5 bg-motif-cream/80 rounded-full" />
          <div className="w-8 sm:w-12 md:w-16 h-px bg-motif-cream/60" />
        </div>
        
        <h2 className="style-script-regular text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal text-motif-cream mb-2 sm:mb-3 md:mb-4">
          Gift Guide
        </h2>
        
        <p className="text-xs sm:text-sm md:text-base lg:text-lg text-motif-cream/90 font-light max-w-2xl mx-auto leading-relaxed px-2">
        With grateful hearts, we feel truly blessed with all that we have. Your presence and prayers are the greatest gifts we could ask for. However, if you wish to give something more, a monetary gift would be sincerely appreciated.
        </p>
        
        <div className="flex items-center justify-center gap-2 mt-3 sm:mt-4">
          <div className="w-1.5 h-1.5 bg-motif-cream/80 rounded-full" />
          <div className="w-1.5 h-1.5 bg-motif-cream/60 rounded-full" />
          <div className="w-1.5 h-1.5 bg-motif-cream/80 rounded-full" />
        </div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
  {/* GCASH QR toggle */}
  <div className="flex items-center justify-center mb-4">
  <Image src="/QR/QR.png" alt="GCash QR" width={200} height={200} className="mx-auto" />
  </div>

      <div className="relativ
      e z-10 max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center">
          <p className="text-xs sm:text-sm text-motif-cream/90 italic">
            Thank you from the bottom of our hearts.
          </p>
        </div>
        <p className="text-xs sm:text-sm text-motif-cream/90 italic text-center">
            With love,
            <br />
            {siteConfig.couple.brideNickname} and {siteConfig.couple.groomNickname}
          </p>
        </div>
      </div>
    </Section>
  );
}
