'use client';

import React from 'react';

export default function PolitiqueConfidentialite() {
    return (
        <main className="min-h-screen bg-sbh-cream">

            <div className="pt-32 pb-24 px-6 md:px-12 max-w-[1200px] mx-auto">
                <h1 className="font-serif text-4xl md:text-5xl text-sbh-darkgreen mb-12 text-center">
                    Politique de Confidentialité
                </h1>

                <div className="space-y-12 font-sans text-sbh-darkgreen/80 leading-relaxed max-w-4xl mx-auto text-justify">

                    <p className="text-lg">
                        Chez Sun Beach House, nous accordons une grande importance à la protection de vos données personnelles. Cette politique de confidentialité détaille la manière dont nous collectons, utilisons et protégeons vos informations.
                    </p>

                    <section>
                        <h2 className="font-serif text-2xl text-sbh-darkgreen mb-4">1. Collecte des données</h2>
                        <p className="mb-4">
                            Nous collectons les informations que vous nous fournissez directement, notamment lorsque vous :
                        </p>
                        <ul className="list-disc pl-6 space-y-2 mb-4">
                            <li>Remplissez un formulaire de contact ou de réservation.</li>
                            <li>Vous inscrivez à notre newsletter.</li>
                            <li>Nous contactez par email ou téléphone.</li>
                        </ul>
                        <p>
                            Les données collectées peuvent inclure : votre nom, prénom, adresse email, numéro de téléphone, et toute autre information pertinente pour votre projet immobilier ou de location.
                        </p>
                    </section>

                    <section>
                        <h2 className="font-serif text-2xl text-sbh-darkgreen mb-4">2. Utilisation des données</h2>
                        <p className="mb-4">Vos données sont utilisées pour :</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Répondre à vos demandes de renseignements et de réservations.</li>
                            <li>Vous envoyer des informations sur nos services et propriétés (si vous avez accepté de recevoir notre newsletter).</li>
                            <li>Améliorer nos services et votre expérience sur notre site.</li>
                            <li>Respecter nos obligations légales et réglementaires.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="font-serif text-2xl text-sbh-darkgreen mb-4">3. Protection et Partage</h2>
                        <p>
                            Nous mettons en œuvre des mesures de sécurité appropriées pour protéger vos données contre tout accès, modification, divulgation ou destruction non autorisés.
                            Vos données ne sont jamais vendues à des tiers. Elles peuvent être partagées avec des prestataires de confiance uniquement dans le cadre de l&apos;exécution de nos services (ex: gestionnaire de mailing, partenaires de services conciergerie avec votre accord), qui sont tenus de respecter la confidentialité de vos données.
                        </p>
                    </section>

                    <section>
                        <h2 className="font-serif text-2xl text-sbh-darkgreen mb-4">4. Cookies</h2>
                        <p className="mb-4">
                            Notre site utilise des cookies pour améliorer votre expérience de navigation et analyser le trafic.
                            Nous utilisons la solution <strong>Tarteaucitron</strong> pour la gestion de votre consentement aux cookies.
                        </p>
                        <p>
                            Vous pouvez à tout moment modifier vos préférences en matière de cookies via le panneau de gestion accessible en bas de page.
                        </p>
                    </section>

                    <section>
                        <h2 className="font-serif text-2xl text-sbh-darkgreen mb-4">5. Vos Droits</h2>
                        <p className="mb-4">
                            Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez d&apos;un droit d&apos;accès, de rectification, d&apos;effacement, et de portabilité de vos données. Vous pouvez également vous opposer au traitement de vos données ou en demander la limitation.
                        </p>
                        <p>
                            Pour exercer ces droits, veuillez nous contacter à l&apos;adresse suivante : <strong>hello@sunbeachhouse.com</strong>
                        </p>
                    </section>

                    <section className="bg-sbh-green/10 p-8 rounded-sm mt-8">
                        <h2 className="font-serif text-xl text-sbh-darkgreen mb-2">Contact DPO</h2>
                        <p>
                            Pour toute question concernant notre politique de confidentialité, vous pouvez nous écrire à :<br />
                            SUN BEACH HOUSE - 65 RUE DE LA PAIX GUSTAVIA 97133 SAINT BARTHELEMY
                        </p>
                    </section>

                </div>
            </div>

        </main>
    );
}
