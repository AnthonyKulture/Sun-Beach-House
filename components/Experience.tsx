'use client';

import React from 'react';
import { SunStamp } from './Decorations';
import { useLanguage } from '../contexts/LanguageContext';
import Image from 'next/image';

export const Experience: React.FC = () => {
  const { t } = useLanguage();

  // Generate experiences array from translations
  const experiences = [
    {
      id: 1,
      title: t.experience.morning.title,
      subtitle: t.experience.morning.subtitle,
      description: t.experience.morning.description,
      img: "/images/optimized-morning-st-barth.jpg",
      color: "bg-sbh-cream"
    },
    {
      id: 2,
      title: t.experience.blueInfinity.title,
      subtitle: t.experience.blueInfinity.subtitle,
      description: t.experience.blueInfinity.description,
      img: "/images/optimized-lagoon-st-barth.jpg",
      color: "bg-sbh-cream"
    },
    {
      id: 3,
      title: t.experience.goldenHour.title,
      subtitle: t.experience.goldenHour.subtitle,
      description: t.experience.goldenHour.description,
      img: "/images/optimized-golden-hour-st-barth.jpg",
      color: "bg-sbh-cream"
    }
  ];

  return (
    <section className="bg-sbh-green text-sbh-charcoal z-20">

      {/* Intro Section */}
      <div className="py-24 px-6 md:py-32 w-full text-center flex flex-col items-center justify-center">
        <SunStamp className="w-16 h-16 md:w-24 md:h-24 mb-6 md:mb-12 text-sbh-charcoal/20 animate-spin-slow" />
        <h2 className="font-serif text-3xl md:text-6xl italic text-sbh-charcoal mb-4 drop-shadow-sm max-w-3xl">{t.experience.islandRhythm}</h2>
        <p className="font-sans text-xs md:text-sm tracking-[0.3em] uppercase mt-4 md:mt-6 text-sbh-charcoal/60">{t.experience.scrollToExplore}</p>
        <div className="w-12 h-px bg-sbh-charcoal/20 mx-auto mt-8 md:mt-12"></div>
      </div>

      {/* Vertical Stack */}
      <div className="flex flex-col w-full">
        {experiences.map((exp, index) => (
          <div key={exp.id} className={`w-full py-16 md:py-32 flex items-center justify-center px-6 md:px-12 lg:px-20 relative border-b border-sbh-charcoal/5 last:border-0 ${exp.color}`}>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 w-full max-w-7xl items-center z-10">

              {/* Text Content */}
              <div className={`space-y-6 md:space-y-8 order-2 ${index % 2 === 1 ? 'md:order-2' : 'md:order-1'}`}>
                <div className="animate-fade-in md:px-8">
                  {/* Subtitle */}
                  <span className="block font-sans text-xs md:text-sm tracking-[0.2em] text-sbh-stone mb-4 uppercase border-l-2 border-sbh-stone pl-4">
                    {exp.subtitle}
                  </span>
                  <h3 className="font-serif text-3xl md:text-5xl text-sbh-charcoal mb-6 leading-tight">
                    {exp.title}
                  </h3>
                  <p className="font-sans text-base md:text-lg font-light leading-relaxed text-gray-600 max-w-md text-balance">
                    {exp.description}
                  </p>
                </div>
              </div>

              {/* Image Content */}
              <div className={`relative aspect-[3/4] md:aspect-[4/5] overflow-hidden rounded-sm shadow-xl shadow-sbh-charcoal/5 group order-1 ${index % 2 === 1 ? 'md:order-1' : 'md:order-2'} w-full max-w-lg mx-auto md:max-w-none`}>
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
            <div className={`hidden md:block absolute bottom-12 ${index % 2 === 1 ? 'right-12 lg:right-24' : 'left-12 lg:left-24'} font-serif text-[8rem] text-sbh-charcoal opacity-[0.03] italic select-none pointer-events-none`}>
              0{index + 1}
            </div>

          </div>
        ))}
      </div>
    </section>
  );
};