"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import {
  CheckCircle,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { getStrapiMedia } from "../../lib/api";

export default function AiTechnologiesSection({ aiTechnologies }) {
  const [activeTechId, setActiveTechId] = useState("predictive-analytics");
  const [isHovered, setIsHovered] = useState(false); 

  const activeIndex = useMemo(
    () =>
      Math.max(
        0,
        aiTechnologies.findIndex((t) => t.slug === activeTechId)
      ),
    [activeTechId]
  );

  const activeTech = aiTechnologies[activeIndex];

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") {
        setActiveTechId(
          aiTechnologies[(activeIndex + 1) % aiTechnologies.length].slug
        );
      } else if (e.key === "ArrowLeft") {
        setActiveTechId(
          aiTechnologies[
            (activeIndex - 1 + aiTechnologies.length) % aiTechnologies.length
          ].id
        );
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeIndex]);

  useEffect(() => {
     if (isHovered) return;
    const interval = setInterval(() => {
      setActiveTechId(
        aiTechnologies[(activeIndex + 1) % aiTechnologies.length].slug
      );
    }, 5000); 

    return () => clearInterval(interval);
  }, [activeIndex, isHovered]);

  const cardRef = useRef(null);
  const bgParallaxRef = useRef(null);
  const sectionHeader = "Our AI Expertise at a Glance";
  const sectionParagraph= "AI tailored to your needs — scalable, reliable, multilingual"

  return (
    <section className="py-16 md:py-24 shadow-md bg-gradient-to-l from-white to-backgroundColor">
      <div className="container mx-auto px-4 md:px-8 font-poppins text-center">
        <h2 className="heading-text text-textColor ">
          {sectionHeader}
        </h2>
        <p className="section-description">
          {sectionParagraph}
        </p>

        {/* Tabs */}
        <div
          role="tablist"
          aria-label="AI Technologies"
          className="flex flex-row flex-wrap justify-start xl:justify-between border-b-2 mt-10 mb-10"
        >
          {aiTechnologies.map((tech) => {
            const isActive = tech?.slug === activeTechId;
            return (
              <button
                key={tech?.slug}
                onClick={() => setActiveTechId(tech.slug)}
                className={`relative flex items-center justify-center gap-2 md:gap-3 rounded-md p-3 md:p-4 font-poppins text-sm md:text-lg font-medium 
                  transition-all duration-500 ease-in-out
                  ${
                    isActive
                      ? "bg-white shadow-md scale-105 text-primary"
                      : "text-gray-600 hover:text-primary"
                  }
                `}
              >
                <div className="w-6 h-6 md:w-8 md:h-8 relative">
                  <Image
                    src= {getStrapiMedia(tech?.icon?.url)}
                    alt={`${tech.name} icon`}
                    width={32}
                    height={32}
                    className="object-contain"
                  />
                </div>
                <span className="whitespace-nowrap">{tech.name}</span>
              </button>
            );
          })}
        </div>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTech.id}
              ref={cardRef}
              role="tabpanel"
              id={`panel-${activeTech.id}`}
              aria-labelledby={activeTech.id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="group relative overflow-hidden rounded-xl shadow-xl mx-auto min-h-[520px] md:min-h-[560px] text-left"
              style={{
                background:
                  "radial-gradient(220px circle at var(--spot-x) var(--spot-y), rgba(255,255,255,0.10), transparent 60%)",
              }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <motion.div
                ref={bgParallaxRef}
                className="absolute inset-0 will-change-transform"
                initial={{ scale: 1.08, opacity: 0.85 }}
                animate={{ scale: 1.05, opacity: 0.95 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
              >
                <Image
                  src={getStrapiMedia(activeTech?.backgroundImage?.url)}
                  // {getStrapiMedia(activeTech?.backgroundImage?.url)}
                  alt={`${activeTech.name} background`}
                  fill
                  priority
                  className="object-cover object-center"
                />
              </motion.div>

              {/* Dark gradient overlays for readability */}
              <div className="absolute inset-0 bg-black/30" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/60 to-transparent" />

              {/* Content */}
              <div className="relative z-10 p-6 md:p-12 flex h-full transform-gpu will-change-transform">
                <div className="w-full  self-center">
                  <motion.h3
                    className="text-2xl md:text-3xl xl:text-4xl font-medium tracking-wide font-poppins text-white mb-4"
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.15, duration: 0.35 }}
                  >
                    {activeTech.name}
                  </motion.h3>

                  <motion.p
                    className="text-white/90 text-base md:text-lg leading-relaxed tracking-wide mb-6"
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.15, duration: 0.35 }}
                  >
                    {activeTech.description}
                  </motion.p>

                  <motion.ul
                    className="space-y-3 mb-8"
                    initial="hidden"
                    animate="show"
                    variants={{
                      hidden: {
                        transition: {
                          staggerChildren: 0.05,
                          staggerDirection: -1,
                        },
                      },
                      show: { transition: { staggerChildren: 0.08 } },
                    }}
                  >
                    {activeTech.bullets.map((service, i) => (
                      <motion.li
                        key={i}
                        className="flex items-center text-white text-base md:text-lg"
                        variants={{
                          hidden: { opacity: 0, x: -10 },
                          show: { opacity: 1, x: 0 },
                        }}
                      >
                        <CheckCircle className="w-5 h-5 text-emerald-400 mr-3 flex-shrink-0" />
                        {service.description}
                      </motion.li>
                    ))}
                  </motion.ul>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
