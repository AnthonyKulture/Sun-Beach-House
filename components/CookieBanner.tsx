'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Settings, ShieldCheck, X } from 'lucide-react';

declare global {
    interface Window {
        gtag: (...args: any[]) => void;
    }
}

export const CookieBanner: React.FC = () => {
    const { t } = useLanguage();
    const [isVisible, setIsVisible] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [preferences, setPreferences] = useState({
        analytics: true,
        marketing: true,
    });

    useEffect(() => {
        const saved = localStorage.getItem('google-consent');
        if (!saved) {
            // Force a small delay to avoid hydration mismatches and allow user to see the page first
            const timer = setTimeout(() => setIsVisible(true), 2000);
            return () => clearTimeout(timer);
        }
    }, []);

    const updateConsent = (consents: { analytics: boolean, marketing: boolean }) => {
        const consentData = {
            'ad_storage': consents.marketing ? 'granted' : 'denied',
            'analytics_storage': consents.analytics ? 'granted' : 'denied',
            'ad_user_data': consents.marketing ? 'granted' : 'denied',
            'ad_personalization': consents.marketing ? 'granted' : 'denied',
        };

        if (typeof window.gtag === 'function') {
            window.gtag('consent', 'update', consentData);
        }

        localStorage.setItem('google-consent', JSON.stringify(consentData));
        setIsVisible(false);
        setShowSettings(false);
    };

    const handleAcceptAll = () => {
        updateConsent({ analytics: true, marketing: true });
    };

    const handleDeclineAll = () => {
        updateConsent({ analytics: false, marketing: false });
    };

    const handleSaveSettings = () => {
        updateConsent(preferences);
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-6 right-6 left-6 md:left-auto md:w-[450px] z-[9999] animate-slide-up">
            <div className="bg-white/95 backdrop-blur-md border border-gray-100 shadow-2xl rounded-sm p-8 flex flex-col gap-6 ring-1 ring-black/5">
                {!showSettings ? (
                    <>
                        <div className="flex gap-4 items-start">
                            <div className="p-3 bg-sbh-cream rounded-full text-sbh-green shrink-0">
                                <ShieldCheck size={24} strokeWidth={1.5} />
                            </div>
                            <div className="space-y-2">
                                <h3 className="font-serif text-2xl italic text-sbh-charcoal">{t.cookies.title}</h3>
                                <p className="font-sans text-xs text-gray-600 leading-relaxed">
                                    {t.cookies.description}
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3">
                            <button
                                onClick={handleAcceptAll}
                                className="flex-1 bg-sbh-green text-white px-6 py-3 text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-sbh-charcoal transition-colors duration-300"
                            >
                                {t.cookies.accept}
                            </button>
                            <button
                                onClick={() => setShowSettings(true)}
                                className="flex-1 border border-gray-200 text-sbh-charcoal px-6 py-3 text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-sbh-cream transition-colors duration-300 flex items-center justify-center gap-2"
                            >
                                <Settings size={14} /> {t.cookies.customize}
                            </button>
                        </div>
                        <button
                            onClick={handleDeclineAll}
                            className="text-[10px] uppercase tracking-[0.2em] text-gray-400 hover:text-sbh-charcoal transition-colors self-center border-b border-transparent hover:border-gray-300 pb-1"
                        >
                            {t.cookies.decline}
                        </button>
                    </>
                ) : (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center border-b border-gray-100 pb-4">
                            <h3 className="font-serif text-xl italic text-sbh-charcoal">{t.cookies.settings.title}</h3>
                            <button onClick={() => setShowSettings(false)} className="text-gray-400 hover:text-sbh-charcoal">
                                <X size={20} />
                            </button>
                        </div>

                        <div className="space-y-4 pr-2">
                            {/* Necessary */}
                            <div className="flex items-start gap-4">
                                <div className="pt-1 text-sbh-green">
                                    <div className="w-4 h-4 rounded-sm border-2 border-sbh-green bg-sbh-green flex items-center justify-center">
                                        <div className="w-1.5 h-1.5 bg-white rounded-full" />
                                    </div>
                                </div>
                                <div>
                                    <p className="font-sans font-bold text-[10px] uppercase tracking-widest text-sbh-charcoal mb-1">
                                        {t.cookies.settings.necessary.title}
                                    </p>
                                    <p className="font-sans text-[10px] text-gray-500 leading-relaxed">
                                        {t.cookies.settings.necessary.desc}
                                    </p>
                                </div>
                            </div>

                            {/* Analytics */}
                            <label className="flex items-start gap-4 cursor-pointer group">
                                <div className="pt-1">
                                    <input 
                                        type="checkbox" 
                                        checked={preferences.analytics}
                                        onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                                        className="w-4 h-4 rounded-sm border-2 border-gray-200 accent-sbh-green cursor-pointer"
                                    />
                                </div>
                                <div>
                                    <p className="font-sans font-bold text-[10px] uppercase tracking-widest text-sbh-charcoal mb-1 group-hover:text-sbh-green transition-colors">
                                        {t.cookies.settings.analytics.title}
                                    </p>
                                    <p className="font-sans text-[10px] text-gray-500 leading-relaxed">
                                        {t.cookies.settings.analytics.desc}
                                    </p>
                                </div>
                            </label>

                            {/* Marketing */}
                            <label className="flex items-start gap-4 cursor-pointer group">
                                <div className="pt-1">
                                    <input 
                                        type="checkbox" 
                                        checked={preferences.marketing}
                                        onChange={(e) => setPreferences({ ...preferences, marketing: e.target.checked })}
                                        className="w-4 h-4 rounded-sm border-2 border-gray-200 accent-sbh-green cursor-pointer"
                                    />
                                </div>
                                <div>
                                    <p className="font-sans font-bold text-[10px] uppercase tracking-widest text-sbh-charcoal mb-1 group-hover:text-sbh-green transition-colors">
                                        {t.cookies.settings.marketing.title}
                                    </p>
                                    <p className="font-sans text-[10px] text-gray-500 leading-relaxed">
                                        {t.cookies.settings.marketing.desc}
                                    </p>
                                </div>
                            </label>
                        </div>

                        <button
                            onClick={handleSaveSettings}
                            className="w-full bg-sbh-green text-white px-6 py-3 text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-sbh-charcoal transition-colors duration-300"
                        >
                            {t.cookies.settings.save}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};
