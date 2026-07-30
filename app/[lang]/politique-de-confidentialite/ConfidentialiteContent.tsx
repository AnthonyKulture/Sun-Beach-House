'use client';

import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function ConfidentialiteContent() {
    const { t } = useLanguage();

    return (
        <main className="min-h-screen bg-sbh-cream">
            <div className="pt-32 pb-24 px-6 md:px-12 max-w-[1200px] mx-auto">
                <h1 className="font-serif text-4xl md:text-5xl text-sbh-darkgreen mb-12 text-center">
                    {t.privacyPage.title}
                </h1>

                <div className="space-y-12 font-sans text-sbh-darkgreen/80 leading-relaxed max-w-4xl mx-auto text-justify">
                    <p className="text-lg">
                        {t.privacyPage.intro}
                    </p>

                    <section>
                        <h2 className="font-serif text-2xl text-sbh-darkgreen mb-4">{t.privacyPage.dataCollection.title}</h2>
                        <p className="mb-4">
                            {t.privacyPage.dataCollection.intro}
                        </p>
                        <ul className="list-disc pl-6 space-y-2 mb-4">
                            {t.privacyPage.dataCollection.items.map((item, i) => (
                                <li key={i}>{item}</li>
                            ))}
                        </ul>
                        <p>
                            {t.privacyPage.dataCollection.details}
                        </p>
                    </section>

                    <section>
                        <h2 className="font-serif text-2xl text-sbh-darkgreen mb-4">{t.privacyPage.dataUsage.title}</h2>
                        <p className="mb-4">{t.privacyPage.dataUsage.intro}</p>
                        <ul className="list-disc pl-6 space-y-2">
                            {t.privacyPage.dataUsage.items.map((item, i) => (
                                <li key={i}>{item}</li>
                            ))}
                        </ul>
                    </section>

                    <section>
                        <h2 className="font-serif text-2xl text-sbh-darkgreen mb-4">{t.privacyPage.protectionSharing.title}</h2>
                        <p>
                            {t.privacyPage.protectionSharing.text}
                        </p>
                    </section>

                    <section>
                        <h2 className="font-serif text-2xl text-sbh-darkgreen mb-4">{t.privacyPage.cookies.title}</h2>
                        <p className="mb-4" dangerouslySetInnerHTML={{ __html: t.privacyPage.cookies.p1 }} />
                        <p>
                            {t.privacyPage.cookies.p2}
                        </p>
                    </section>

                    <section>
                        <h2 className="font-serif text-2xl text-sbh-darkgreen mb-4">{t.privacyPage.rights.title}</h2>
                        <p className="mb-4">
                            {t.privacyPage.rights.p1}
                        </p>
                        <p dangerouslySetInnerHTML={{ __html: t.privacyPage.rights.p2 }} />
                    </section>

                    <section className="bg-sbh-green/10 p-8 rounded-sm mt-8">
                        <h2 className="font-serif text-xl text-sbh-darkgreen mb-2">{t.privacyPage.dpo.title}</h2>
                        <p dangerouslySetInnerHTML={{ __html: t.privacyPage.dpo.text }} />
                    </section>
                </div>
            </div>
        </main>
    );
}
