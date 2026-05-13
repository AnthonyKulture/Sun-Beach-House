'use client';

import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

type FaqItem = { q: string; a: string };

interface FaqSectionProps {
    title: string;
    items: FaqItem[];
    /**
     * If true, the component emits a FAQPage JSON-LD block alongside the visible accordion.
     * Set to false when the JSON-LD is already emitted from the parent page (avoid duplicate schema).
     */
    emitSchema?: boolean;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ title, items, emitSchema = true }) => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const faqSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: items.map((item) => ({
            '@type': 'Question',
            name: item.q,
            acceptedAnswer: {
                '@type': 'Answer',
                text: item.a,
            },
        })),
    };

    return (
        <section className="max-w-[900px] mx-auto px-6 md:px-12 py-20 md:py-28">
            {emitSchema && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
                />
            )}

            <h2 className="font-serif text-2xl md:text-4xl italic text-sbh-charcoal mb-12 text-center">
                {title}
            </h2>

            <div className="divide-y divide-sbh-charcoal/10 border-t border-b border-sbh-charcoal/10">
                {items.map((item, index) => {
                    const isOpen = openIndex === index;
                    return (
                        <div key={index}>
                            <button
                                type="button"
                                onClick={() => setOpenIndex(isOpen ? null : index)}
                                className="w-full flex items-start justify-between gap-6 py-6 text-left group"
                                aria-expanded={isOpen}
                            >
                                <h3 className="font-serif text-lg md:text-xl text-sbh-charcoal group-hover:text-sbh-green transition-colors">
                                    {item.q}
                                </h3>
                                <span className="shrink-0 text-sbh-green mt-1">
                                    {isOpen ? <Minus size={20} strokeWidth={1.5} /> : <Plus size={20} strokeWidth={1.5} />}
                                </span>
                            </button>
                            <div
                                className={`grid transition-all duration-500 ease-in-out ${
                                    isOpen ? 'grid-rows-[1fr] opacity-100 pb-6' : 'grid-rows-[0fr] opacity-0'
                                }`}
                            >
                                <div className="overflow-hidden">
                                    <p className="font-sans font-light text-base text-sbh-charcoal/75 leading-relaxed pr-8">
                                        {item.a}
                                    </p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};
