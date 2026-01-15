'use client';

import React, { useRef, useEffect } from 'react';
import { SunStamp } from './Decorations';
import { useLanguage } from '../contexts/LanguageContext';
import Image from 'next/image';

export const Experience: React.FC = () => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const animationFrameId = useRef<number | null>(null);

  // Generate experiences array from translations
  const experiences = [
    {
      id: 1,
      title: t.experience.morning.title,
      subtitle: t.experience.morning.subtitle,
      description: t.experience.morning.description,
      img: "https://storage.googleapis.com/images-sbh/image-r-aliste-cin-matique-de-st-barth-au-petit-ma.jpg",
      color: "bg-sbh-cream"
    },
    {
      id: 2,
      title: t.experience.blueInfinity.title,
      subtitle: t.experience.blueInfinity.subtitle,
      description: t.experience.blueInfinity.description,
      img: "https://storage.googleapis.com/images-sbh/image-r-aliste-cin-matique-de-st-barth-.jpg",
      color: "bg-sbh-cream"
    },
    {
      id: 3,
      title: t.experience.goldenHour.title,
      subtitle: t.experience.goldenHour.subtitle,
      description: t.experience.goldenHour.description,
      img: "https://storage.googleapis.com/images-sbh/golden-hour.jpg",
      color: "bg-sbh-cream"
    }
  ];

  useEffect(() => {
    // Only run the sticky scroll logic on desktop (md and up)
    const mediaQuery = window.matchMedia('(min-width: 768px)');

    const animateScroll = () => {
      if (!sectionRef.current || !trackRef.current) return;

      const section = sectionRef.current;
      const { top, height } = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Calculate raw progress (0 to 1) based on scroll position within section
      const scrollDistance = -top;
      const maxScroll = height - viewportHeight;
      let rawProgress = scrollDistance / maxScroll;

      // Clamp between 0 and 1
      rawProgress = Math.max(0, Math.min(1, rawProgress));

      // --- LOGIC: DELAY SCROLL ---
      // 0.0 to 0.1: Fade out title
      // 0.1 to 1.0: Move track

      const fadeThreshold = 0.1;

      // 1. Handle Title Fade
      if (titleRef.current) {
        // Faster fade
        const fadeProgress = Math.min(1, rawProgress / fadeThreshold);
        titleRef.current.style.opacity = (1 - fadeProgress).toString();
        titleRef.current.style.pointerEvents = fadeProgress > 0.8 ? 'none' : 'auto';
        // Slight scale down effect for title
        titleRef.current.style.transform = `scale(${1 - (fadeProgress * 0.1)})`;
      }

      // 2. Handle Horizontal Move (Starts after fadeThreshold)
      let moveProgress = 0;
      if (rawProgress > fadeThreshold) {
        moveProgress = (rawProgress - fadeThreshold) / (1 - fadeThreshold);
      }

      // We have 3 slides, so we need to move 2 full viewport widths (approx 66.666%)
      // Using exactly 200vw allows strict alignment
      const percentageToMove = (100 / 3) * 2; // ~66.666% of the 300% width container
      const translateX = moveProgress * -percentageToMove;

      trackRef.current.style.transform = `translate3d(${translateX}%, 0, 0)`;
    };

    const handleScroll = () => {
      if (!mediaQuery.matches) return;

      // Use Request Animation Frame for smooth 60fps scrolling
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      animationFrameId.current = requestAnimationFrame(animateScroll);
    };

    // Initial check and event listener
    if (mediaQuery.matches) {
      window.addEventListener('scroll', handleScroll, { passive: true });
      // Run once initially to set positions
      requestAnimationFrame(animateScroll);
    }

    // Reset style if resizing to mobile
    const handleResize = () => {
      if (!mediaQuery.matches && trackRef.current) {
        trackRef.current.style.transform = 'none';
        if (titleRef.current) {
          titleRef.current.style.opacity = '1';
          titleRef.current.style.transform = 'none';
        }
      } else {
        handleScroll(); // Recalculate on desktop resize
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative md:h-[350vh] bg-sbh-green text-sbh-charcoal z-20">

      {/* Sticky Container - Active only on desktop */}
      <div className="md:sticky md:top-0 md:h-screen w-full overflow-hidden flex flex-col md:flex-row items-start md:items-center">

        {/* Intro Overlay - Desktop Only - Solid background that fades out */}
        <div
          ref={titleRef}
          className="hidden md:flex absolute top-0 left-0 w-full h-full z-40 flex-col items-center justify-center bg-sbh-green origin-center will-change-transform"
        >
          <SunStamp className="w-24 h-24 mb-8 text-white/50 animate-spin-slow" />
          <h2 className="font-serif text-6xl italic text-sbh-charcoal drop-shadow-sm text-center">{t.experience.islandRhythm}</h2>
          <p className="font-sans text-xs tracking-[0.3em] uppercase mt-4 text-sbh-charcoal/60 animate-bounce">{t.experience.scrollToExplore}</p>
        </div>

        {/* Mobile Title */}
        <div className="md:hidden py-24 px-6 w-full text-center bg-sbh-green">
          <h2 className="font-serif text-3xl italic text-sbh-charcoal mb-4">{t.experience.islandRhythm}</h2>
          <div className="w-12 h-px bg-sbh-charcoal/20 mx-auto"></div>
        </div>

        {/* Horizontal Moving Track (Desktop) / Vertical Stack (Mobile) */}
        <div ref={trackRef} className="flex flex-col md:flex-row h-auto md:h-full w-full md:w-[300%] will-change-transform">
          {experiences.map((exp, index) => (
            <div key={exp.id} className={`w-full md:w-screen h-auto py-16 md:py-0 md:h-full flex items-center justify-center px-6 md:px-20 relative border-b border-sbh-charcoal/5 md:border-b-0 md:border-r border-sbh-charcoal/10 ${exp.color}`}>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 w-full max-w-7xl items-center z-10">

                {/* Text Content */}
                <div className={`${index === 1 ? 'order-1 md:order-1' : 'order-2 md:order-1'} space-y-6 md:space-y-8`}>
                  <div className="animate-fade-in">
                    {/* Subtitle in Charcoal/Stone */}
                    <span className="block font-sans text-xs md:text-sm tracking-[0.2em] text-sbh-stone mb-4 uppercase border-l-2 border-sbh-stone pl-4">
                      {exp.subtitle}
                    </span>
                    <h3 className="font-serif text-2xl md:text-5xl text-sbh-charcoal mb-6 leading-tight">
                      {exp.title}
                    </h3>
                    {/* Increased text size to base (18px) */}
                    <p className="font-sans text-base md:text-lg font-light leading-relaxed text-gray-600 max-w-md text-balance">
                      {exp.description}
                    </p>
                  </div>
                </div>

                {/* Image Content */}
                <div className={`${index === 1 ? 'order-2 md:order-2' : 'order-1 md:order-2'} relative aspect-[3/4] md:aspect-[4/5] overflow-hidden rounded-sm shadow-xl shadow-sbh-charcoal/5 group`}>
                  <Image
                    src={exp.img}
                    alt={exp.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-[1.5s] group-hover:scale-105"
                  />
                  <div className="absolute inset-0 ring-1 ring-inset ring-black/5 pointer-events-none"></div>
                </div>
              </div>

              {/* Index Number */}
              <div className="hidden md:block absolute bottom-12 right-12 md:right-24 font-serif text-[8rem] text-sbh-charcoal opacity-[0.03] italic select-none pointer-events-none">
                0{index + 1}
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
};