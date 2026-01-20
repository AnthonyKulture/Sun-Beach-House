'use client';

import React from 'react';

export default function MentionsLegales() {
    return (
        <main className="min-h-screen bg-sbh-cream">

            <div className="pt-32 pb-24 px-6 md:px-12 max-w-[1200px] mx-auto">
                <h1 className="font-serif text-4xl md:text-5xl text-sbh-darkgreen mb-12 text-center">
                    Mentions Légales
                </h1>

                <div className="space-y-12 font-sans text-sbh-darkgreen/80 leading-relaxed max-w-4xl mx-auto">

                    {/* Identité */}
                    <section>
                        <h2 className="font-serif text-2xl text-sbh-darkgreen mb-6">1. Identité de l&apos;entreprise</h2>
                        <div className="bg-white/50 p-8 rounded-sm space-y-4 shadow-sm border border-sbh-green/5">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <p className="font-bold text-sbh-darkgreen">Dénomination sociale</p>
                                    <p>SUN BEACH HOUSE</p>
                                </div>
                                <div>
                                    <p className="font-bold text-sbh-darkgreen">Forme Juridique</p>
                                    <p>Société à responsabilité limitée (SARL)</p>
                                </div>
                                <div>
                                    <p className="font-bold text-sbh-darkgreen">Capital Social</p>
                                    <p>1 000,00 Euros</p>
                                </div>
                                <div>
                                    <p className="font-bold text-sbh-darkgreen">Gérante</p>
                                    <p>Valérie KERCKHOFS</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Coordonnées & Immatriculation */}
                    <section>
                        <h2 className="font-serif text-2xl text-sbh-darkgreen mb-6">2. Coordonnées & Immatriculation</h2>
                        <div className="bg-white/50 p-8 rounded-sm space-y-4 shadow-sm border border-sbh-green/5">
                            <div className="space-y-4">
                                <div>
                                    <p className="font-bold text-sbh-darkgreen">Siège Social</p>
                                    <p>65 RUE DE LA PAIX GUSTAVIA<br />97133 SAINT BARTHELEMY</p>
                                </div>
                                <div>
                                    <p className="font-bold text-sbh-darkgreen">Immatriculation</p>
                                    <p>RCS Basse-terre 911 920 205</p>
                                    <p className="text-sm opacity-70">Date d&apos;immatriculation : 29/03/2022</p>
                                </div>
                                <div>
                                    <p className="font-bold text-sbh-darkgreen">SIREN</p>
                                    <p>911 920 205</p>
                                </div>
                                <div>
                                    <p className="font-bold text-sbh-darkgreen">Activité Principale</p>
                                    <p>Agence immobilière ; toutes activités se rapportant directement ou indirectement à l&apos;objet social.</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Hébergement */}
                    <section>
                        <h2 className="font-serif text-2xl text-sbh-darkgreen mb-6">3. Hébergement & Réalisation</h2>
                        <div className="bg-white/50 p-8 rounded-sm space-y-4 shadow-sm border border-sbh-green/5">
                            <div>
                                <p className="font-bold text-sbh-darkgreen">Hébergeur / Registrar</p>
                                <p>OVH SAS</p>
                                <p>2 rue Kellermann - 59100 Roubaix - France</p>
                            </div>
                            <div className="pt-4 border-t border-sbh-green/10 mt-4">
                                <p className="font-bold text-sbh-darkgreen">Réalisation du site</p>
                                <p>Kulture Com (Anthony PROFIT)</p>
                                <a href="https://www.kulturecom.fr" target="_blank" rel="noopener noreferrer" className="text-sbh-darkgreen underline hover:no-underline">www.kulturecom.fr</a>
                            </div>
                        </div>
                    </section>

                    {/* Propriété Intellectuelle */}
                    <section>
                        <h2 className="font-serif text-2xl text-sbh-darkgreen mb-6">4. Propriété Intellectuelle</h2>
                        <p className="mb-4">
                            L&apos;ensemble de ce site relève de la législation française et internationale sur le droit d&apos;auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.
                        </p>
                        <p>
                            La reproduction de tout ou partie de ce site sur un support électronique quel qu&apos;il soit est formellement interdite sauf autorisation expresse du directeur de la publication.
                        </p>
                    </section>
                </div>
            </div>

        </main>
    );
}
