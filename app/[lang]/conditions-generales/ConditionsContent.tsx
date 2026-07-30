'use client';

import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function ConditionsContent() {
    const { t } = useLanguage();

    return (
        <main className="min-h-screen bg-sbh-cream">
            <div className="pt-32 pb-24 px-6 md:px-12 max-w-[1200px] mx-auto">
                <h1 className="font-serif text-4xl md:text-5xl text-sbh-darkgreen mb-12 text-center">
                    {t.conditionsPage.title}
                </h1>

                <div className="space-y-12 font-sans text-sbh-darkgreen/80 leading-relaxed max-w-4xl mx-auto">
                    {/* Conditions de réservation */}
                    <section>
                        <h2 className="font-serif text-2xl text-sbh-darkgreen mb-6">{t.conditionsPage.booking.title}</h2>
                        <div className="bg-white/50 p-8 rounded-sm space-y-6 shadow-sm border border-sbh-green/5">
                            <p>
                                {t.conditionsPage.booking.intro}
                            </p>

                            <div className="space-y-4 pt-4 border-t border-sbh-green/10">
                                <h3 className="font-bold text-lg text-sbh-darkgreen">{t.conditionsPage.booking.nonHoliday.title}</h3>
                                <div>
                                    <p className="font-semibold text-sbh-darkgreen">{t.conditionsPage.booking.nonHoliday.over60.label}</p>
                                    <p>{t.conditionsPage.booking.nonHoliday.over60.desc}</p>
                                </div>
                                <div>
                                    <p className="font-semibold text-sbh-darkgreen">{t.conditionsPage.booking.nonHoliday.under60.label}</p>
                                    <p>{t.conditionsPage.booking.nonHoliday.under60.desc}</p>
                                </div>
                            </div>

                            <div className="space-y-4 pt-4 border-t border-sbh-green/10">
                                <h3 className="font-bold text-lg text-sbh-darkgreen">{t.conditionsPage.booking.holiday.title}</h3>
                                <div>
                                    <p className="font-semibold text-sbh-darkgreen">{t.conditionsPage.booking.holiday.over120.label}</p>
                                    <p>{t.conditionsPage.booking.holiday.over120.desc}</p>
                                </div>
                                <div>
                                    <p className="font-semibold text-sbh-darkgreen">{t.conditionsPage.booking.holiday.under90.label}</p>
                                    <p>{t.conditionsPage.booking.holiday.under90.desc}</p>
                                </div>
                            </div>

                            <p className="pt-4 text-sm font-medium italic text-sbh-darkgreen/90">
                                {t.conditionsPage.booking.warning}
                            </p>
                        </div>
                    </section>

                    {/* Conditions d’annulation */}
                    <section>
                        <h2 className="font-serif text-2xl text-sbh-darkgreen mb-6">{t.conditionsPage.cancellation.title}</h2>
                        <div className="bg-white/50 p-8 rounded-sm space-y-6 shadow-sm border border-sbh-green/5">
                            <p className="mb-4 font-semibold text-sbh-darkgreen">
                                {t.conditionsPage.cancellation.intro}
                            </p>

                            <div className="space-y-4">
                                <h3 className="font-bold text-lg text-sbh-darkgreen">{t.conditionsPage.cancellation.nonHoliday.title}</h3>
                                <ul className="list-disc pl-5 space-y-2">
                                    {t.conditionsPage.cancellation.nonHoliday.items.map((item, i) => (
                                        <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
                                    ))}
                                </ul>
                            </div>

                            <div className="space-y-4 pt-4 border-t border-sbh-green/10">
                                <h3 className="font-bold text-lg text-sbh-darkgreen">{t.conditionsPage.cancellation.holiday.title}</h3>
                                <ul className="list-disc pl-5 space-y-2">
                                    {t.conditionsPage.cancellation.holiday.items.map((item, i) => (
                                        <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Assurance voyage */}
                    <section>
                        <h2 className="font-serif text-2xl text-sbh-darkgreen mb-6">{t.conditionsPage.insurance.title}</h2>
                        <div className="bg-white/50 p-8 rounded-sm space-y-4 shadow-sm border border-sbh-green/5">
                            <p>{t.conditionsPage.insurance.p1}</p>
                            <p>{t.conditionsPage.insurance.p2}</p>
                            <p>{t.conditionsPage.insurance.p3}</p>
                        </div>
                    </section>

                    {/* Taxe de séjour */}
                    <section>
                        <h2 className="font-serif text-2xl text-sbh-darkgreen mb-6">{t.conditionsPage.touristTax.title}</h2>
                        <div className="bg-white/50 p-8 rounded-sm space-y-4 shadow-sm border border-sbh-green/5">
                            <p>{t.conditionsPage.touristTax.p1}</p>
                            <p>{t.conditionsPage.touristTax.p2}</p>
                        </div>
                    </section>

                    {/* Visa et formalités d’entrée */}
                    <section>
                        <h2 className="font-serif text-2xl text-sbh-darkgreen mb-6">{t.conditionsPage.visa.title}</h2>
                        <div className="bg-white/50 p-8 rounded-sm space-y-4 shadow-sm border border-sbh-green/5">
                            <p>{t.conditionsPage.visa.p1}</p>
                            <p>{t.conditionsPage.visa.p2}</p>
                        </div>
                    </section>

                    {/* Tarifs et conditions de séjour */}
                    <section>
                        <h2 className="font-serif text-2xl text-sbh-darkgreen mb-6">{t.conditionsPage.pricing.title}</h2>
                        <div className="bg-white/50 p-8 rounded-sm space-y-6 shadow-sm border border-sbh-green/5">
                            <div className="space-y-2">
                                <p>{t.conditionsPage.pricing.priceInfo}</p>
                                <p>{t.conditionsPage.pricing.taxInfo}</p>
                                <p className="italic">{t.conditionsPage.pricing.priceNote}</p>
                            </div>

                            <div className="space-y-4 pt-4 border-t border-sbh-green/10">
                                <h3 className="font-bold text-lg text-sbh-darkgreen">{t.conditionsPage.pricing.minStay.title}</h3>
                                <ul className="list-disc pl-5 space-y-2">
                                    {t.conditionsPage.pricing.minStay.items.map((item, i) => (
                                        <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Horaires d’arrivée et de départ */}
                    <section>
                        <h2 className="font-serif text-2xl text-sbh-darkgreen mb-6">{t.conditionsPage.checkInOut.title}</h2>
                        <div className="bg-white/50 p-8 rounded-sm space-y-4 shadow-sm border border-sbh-green/5 flex flex-col md:flex-row md:gap-12 gap-4">
                            <div>
                                <p className="font-bold text-sbh-darkgreen text-lg">{t.conditionsPage.checkInOut.checkIn.label}</p>
                                <p>{t.conditionsPage.checkInOut.checkIn.value}</p>
                            </div>
                            <div>
                                <p className="font-bold text-sbh-darkgreen text-lg">{t.conditionsPage.checkInOut.checkOut.label}</p>
                                <p>{t.conditionsPage.checkInOut.checkOut.value}</p>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </main>
    );
}
