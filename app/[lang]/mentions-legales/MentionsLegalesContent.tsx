'use client';

import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function MentionsLegalesContent() {
    const { t } = useLanguage();

    return (
        <main className="min-h-screen bg-sbh-cream">
            <div className="pt-32 pb-24 px-6 md:px-12 max-w-[1200px] mx-auto">
                <h1 className="font-serif text-4xl md:text-5xl text-sbh-darkgreen mb-12 text-center">
                    {t.legalPage.title}
                </h1>

                <div className="space-y-12 font-sans text-sbh-darkgreen/80 leading-relaxed max-w-4xl mx-auto">
                    {/* Identité */}
                    <section>
                        <h2 className="font-serif text-2xl text-sbh-darkgreen mb-6">{t.legalPage.companyIdentity.title}</h2>
                        <div className="bg-white/50 p-8 rounded-sm space-y-4 shadow-sm border border-sbh-green/5">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <p className="font-bold text-sbh-darkgreen">{t.legalPage.companyIdentity.companyName.label}</p>
                                    <p>{t.legalPage.companyIdentity.companyName.value}</p>
                                </div>
                                <div>
                                    <p className="font-bold text-sbh-darkgreen">{t.legalPage.companyIdentity.legalForm.label}</p>
                                    <p>{t.legalPage.companyIdentity.legalForm.value}</p>
                                </div>
                                <div>
                                    <p className="font-bold text-sbh-darkgreen">{t.legalPage.companyIdentity.shareCapital.label}</p>
                                    <p>{t.legalPage.companyIdentity.shareCapital.value}</p>
                                </div>
                                <div>
                                    <p className="font-bold text-sbh-darkgreen">{t.legalPage.companyIdentity.manager.label}</p>
                                    <p>{t.legalPage.companyIdentity.manager.value}</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Coordonnées & Immatriculation */}
                    <section>
                        <h2 className="font-serif text-2xl text-sbh-darkgreen mb-6">{t.legalPage.contactRegistration.title}</h2>
                        <div className="bg-white/50 p-8 rounded-sm space-y-4 shadow-sm border border-sbh-green/5">
                            <div className="space-y-4">
                                <div>
                                    <p className="font-bold text-sbh-darkgreen">{t.legalPage.contactRegistration.headOffice.label}</p>
                                    <p dangerouslySetInnerHTML={{ __html: t.legalPage.contactRegistration.headOffice.value }} />
                                </div>
                                <div>
                                    <p className="font-bold text-sbh-darkgreen">{t.legalPage.contactRegistration.registration.label}</p>
                                    <p>{t.legalPage.contactRegistration.registration.value}</p>
                                    <p className="text-sm opacity-70">{t.legalPage.contactRegistration.registration.date}</p>
                                </div>
                                <div>
                                    <p className="font-bold text-sbh-darkgreen">{t.legalPage.contactRegistration.siren.label}</p>
                                    <p>{t.legalPage.contactRegistration.siren.value}</p>
                                </div>
                                <div>
                                    <p className="font-bold text-sbh-darkgreen">{t.legalPage.contactRegistration.mainActivity.label}</p>
                                    <p>{t.legalPage.contactRegistration.mainActivity.value}</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Hébergement */}
                    <section>
                        <h2 className="font-serif text-2xl text-sbh-darkgreen mb-6">{t.legalPage.hosting.title}</h2>
                        <div className="bg-white/50 p-8 rounded-sm space-y-4 shadow-sm border border-sbh-green/5">
                            <div>
                                <p className="font-bold text-sbh-darkgreen">{t.legalPage.hosting.host.label}</p>
                                <p>{t.legalPage.hosting.host.name}</p>
                                <p>{t.legalPage.hosting.host.address}</p>
                            </div>
                            <div className="pt-4 border-t border-sbh-green/10 mt-4">
                                <p className="font-bold text-sbh-darkgreen">{t.legalPage.hosting.realization.label}</p>
                                <p>{t.legalPage.hosting.realization.name}</p>
                                <a href="https://www.kulturecom.fr" target="_blank" rel="noopener noreferrer" className="text-sbh-darkgreen underline hover:no-underline">www.kulturecom.fr</a>
                            </div>
                        </div>
                    </section>

                    {/* Propriété Intellectuelle */}
                    <section>
                        <h2 className="font-serif text-2xl text-sbh-darkgreen mb-6">{t.legalPage.intellectualProperty.title}</h2>
                        <p className="mb-4">{t.legalPage.intellectualProperty.p1}</p>
                        <p>{t.legalPage.intellectualProperty.p2}</p>
                    </section>
                </div>
            </div>
        </main>
    );
}
