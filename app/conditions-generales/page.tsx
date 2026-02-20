'use client';

import React from 'react';

export default function ConditionsGenerales() {
    return (
        <main className="min-h-screen bg-sbh-cream">

            <div className="pt-32 pb-24 px-6 md:px-12 max-w-[1200px] mx-auto">
                <h1 className="font-serif text-4xl md:text-5xl text-sbh-darkgreen mb-12 text-center">
                    Conditions de réservation, d’annulation et informations générales
                </h1>

                <div className="space-y-12 font-sans text-sbh-darkgreen/80 leading-relaxed max-w-4xl mx-auto">

                    {/* Conditions de réservation */}
                    <section>
                        <h2 className="font-serif text-2xl text-sbh-darkgreen mb-6">1. Conditions de réservation</h2>
                        <div className="bg-white/50 p-8 rounded-sm space-y-6 shadow-sm border border-sbh-green/5">
                            <p>
                                Un acompte correspondant à 30 % du montant total du séjour (incluant le loyer, les taxes et les frais de dossier) est requis pour confirmer toute réservation.
                                La villa ne pourra être garantie tant que cet acompte n’aura pas été reçu. La réservation sera considérée comme ferme et définitive uniquement après réception du paiement (preuve de virement requise) et signature du contrat de location.
                            </p>

                            <div className="space-y-4 pt-4 border-t border-sbh-green/10">
                                <h3 className="font-bold text-lg text-sbh-darkgreen">Réservations hors périodes de fêtes (Noël et Nouvel An)</h3>
                                <div>
                                    <p className="font-semibold text-sbh-darkgreen">Réservation effectuée à plus de 60 jours de la date d’arrivée :</p>
                                    <p>acompte de 30 % à la réservation, solde payable au plus tard 60 jours avant l’arrivée.</p>
                                </div>
                                <div>
                                    <p className="font-semibold text-sbh-darkgreen">Réservation effectuée à 60 jours ou moins de la date d’arrivée :</p>
                                    <p>règlement de 100 % du montant total du séjour au moment de la réservation.</p>
                                </div>
                            </div>

                            <div className="space-y-4 pt-4 border-t border-sbh-green/10">
                                <h3 className="font-bold text-lg text-sbh-darkgreen">Réservations pendant les périodes de fêtes (Noël et Nouvel An)</h3>
                                <div>
                                    <p className="font-semibold text-sbh-darkgreen">Réservation effectuée à plus de 120 jours de la date d’arrivée :</p>
                                    <p>acompte de 30 % à la réservation, solde payable au plus tard 90 jours avant l’arrivée.</p>
                                </div>
                                <div>
                                    <p className="font-semibold text-sbh-darkgreen">Réservation effectuée à 90 jours ou moins de la date d’arrivée :</p>
                                    <p>règlement de 100 % du montant total du séjour au moment de la réservation.</p>
                                </div>
                            </div>

                            <p className="pt-4 text-sm font-medium italic text-sbh-darkgreen/90">
                                En cas de non-paiement du solde dans les délais indiqués, la réservation sera automatiquement annulée et les acomptes versés resteront acquis à l’Agence.
                            </p>
                        </div>
                    </section>

                    {/* Conditions d’annulation */}
                    <section>
                        <h2 className="font-serif text-2xl text-sbh-darkgreen mb-6">2. Conditions d’annulation</h2>
                        <div className="bg-white/50 p-8 rounded-sm space-y-6 shadow-sm border border-sbh-green/5">
                            <p className="mb-4 font-semibold text-sbh-darkgreen">
                                Toute demande d’annulation doit impérativement être adressée par écrit (email ou courrier).
                            </p>

                            <div className="space-y-4">
                                <h3 className="font-bold text-lg text-sbh-darkgreen">Réservations hors périodes de fêtes (Noël et Nouvel An)</h3>
                                <ul className="list-disc pl-5 space-y-2">
                                    <li><strong>Annulation à 61 jours ou plus avant la date d’arrivée :</strong> frais équivalents à 30 % du montant total du séjour.</li>
                                    <li><strong>Annulation entre 60 jours et 31 jours avant la date d’arrivée :</strong> frais équivalents à 50 % du montant total du séjour.</li>
                                    <li><strong>Annulation à 30 jours ou moins avant la date d’arrivée :</strong> frais équivalents à 100 % du montant total du séjour.</li>
                                </ul>
                            </div>

                            <div className="space-y-4 pt-4 border-t border-sbh-green/10">
                                <h3 className="font-bold text-lg text-sbh-darkgreen">Réservations pendant les périodes de fêtes (Noël et Nouvel An)</h3>
                                <ul className="list-disc pl-5 space-y-2">
                                    <li><strong>Annulation à 91 jours ou plus avant la date d’arrivée :</strong> frais équivalents à 30 % du montant total du séjour.</li>
                                    <li><strong>Annulation entre 90 jours et 61 jours avant la date d’arrivée :</strong> frais équivalents à 50 % du montant total du séjour.</li>
                                    <li><strong>Annulation à 60 jours ou moins avant la date d’arrivée :</strong> frais équivalents à 100 % du montant total du séjour.</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Assurance voyage */}
                    <section>
                        <h2 className="font-serif text-2xl text-sbh-darkgreen mb-6">3. Assurance voyage</h2>
                        <div className="bg-white/50 p-8 rounded-sm space-y-4 shadow-sm border border-sbh-green/5">
                            <p>
                                Le Client est vivement encouragé à souscrire une assurance voyage couvrant l’ensemble des risques liés à son séjour : annulation, interruption de voyage, retard de transport, perte ou vol de bagages, ainsi que toute dépense imprévue.
                            </p>
                            <p>
                                Sun Beach House ne pourra être tenue responsable des aléas liés au transport ou au voyage, incluant notamment les annulations ou retards de vols, pertes de bagages ou tout événement indépendant de sa volonté pouvant impacter le séjour.
                            </p>
                            <p>
                                Conformément à la réglementation en vigueur, les transferts éventuellement assurés par le personnel sont limités au trajet entre l’aéroport et la villa. Pour tout autre déplacement, des services de taxi ou de location de véhicule pourront être organisés sur demande.
                            </p>
                        </div>
                    </section>

                    {/* Taxe de séjour */}
                    <section>
                        <h2 className="font-serif text-2xl text-sbh-darkgreen mb-6">4. Taxe de séjour</h2>
                        <div className="bg-white/50 p-8 rounded-sm space-y-4 shadow-sm border border-sbh-green/5">
                            <p>
                                Une taxe de séjour de 5 % du montant total de la location est applicable.
                            </p>
                            <p>
                                Cette taxe est collectée pour le compte de la collectivité locale et est payable à l’arrivée.
                            </p>
                        </div>
                    </section>

                    {/* Visa et formalités d’entrée */}
                    <section>
                        <h2 className="font-serif text-2xl text-sbh-darkgreen mb-6">5. Visa et formalités d’entrée</h2>
                        <div className="bg-white/50 p-8 rounded-sm space-y-4 shadow-sm border border-sbh-green/5">
                            <p>
                                Il appartient au Client de vérifier auprès de son ambassade ou des autorités compétentes les conditions d’entrée à Saint-Barthélemy, notamment en matière de visa, de validité du passeport ou de toute autre formalité administrative.
                            </p>
                            <p>
                                Sun Beach House décline toute responsabilité en cas de refus d’entrée sur le territoire dû à des documents de voyage non conformes ou incomplets.
                            </p>
                        </div>
                    </section>

                    {/* Tarifs et conditions de séjour */}
                    <section>
                        <h2 className="font-serif text-2xl text-sbh-darkgreen mb-6">6. Tarifs et conditions de séjour</h2>
                        <div className="bg-white/50 p-8 rounded-sm space-y-6 shadow-sm border border-sbh-green/5">
                            <div className="space-y-2">
                                <p>Les tarifs sont indiqués par semaine et en dollars américains (USD).</p>
                                <p>Les prix n’incluent pas la taxe de séjour (+5 %) ni les frais de service (+10 %), sauf mention contraire.</p>
                                <p className="italic">Les tarifs peuvent être modifiés sans préavis, conformément aux présentes conditions de réservation.</p>
                            </div>

                            <div className="space-y-4 pt-4 border-t border-sbh-green/10">
                                <h3 className="font-bold text-lg text-sbh-darkgreen">Durée minimale de séjour</h3>
                                <ul className="list-disc pl-5 space-y-2">
                                    <li><strong>Séjour minimum :</strong> 7 nuits (séjours plus courts possibles sur demande, sous réserve d’acceptation)</li>
                                    <li><strong>Périodes Thanksgiving et Bucket Regatta :</strong> séjour minimum de 7 nuits.</li>
                                    <li><strong>Saison festive (Noël & Nouvel An) :</strong> séjour minimum de 14 nuits (séjours plus courts sur demande, sous réserve d’acceptation).</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Horaires d’arrivée et de départ */}
                    <section>
                        <h2 className="font-serif text-2xl text-sbh-darkgreen mb-6">7. Horaires d’arrivée et de départ</h2>
                        <div className="bg-white/50 p-8 rounded-sm space-y-4 shadow-sm border border-sbh-green/5 flex flex-col md:flex-row md:gap-12 gap-4">
                            <div>
                                <p className="font-bold text-sbh-darkgreen text-lg">Check-in</p>
                                <p>à partir de 15h</p>
                            </div>
                            <div>
                                <p className="font-bold text-sbh-darkgreen text-lg">Check-out</p>
                                <p>avant 12h (midi)</p>
                            </div>
                        </div>
                    </section>

                </div>
            </div>

        </main>
    );
}
