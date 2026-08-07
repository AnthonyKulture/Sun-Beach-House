# Brief — Comment venir à Saint-Barth : vols, ferries, jet privé

## Contexte
Article #2 du Plan éditorial 2026-08 (« Préparer la saison 2026-2027 »), publié le jeudi de la semaine 1, en alternance avec le pilier événementiel #1 (Fêtes patronales d'août). Sujet imposé, angle « guide de référence des accès à l'île ».

## Mots-clés
- Primaire : comment venir à saint barth
- Secondaires / LSI : aéroport saint-barthélemy, vols saint-martin saint-barth, ferry saint-martin saint-barth, aéroport rémy-de-haenen, jet privé saint-barth
- Intent : informationnel, avec une inflexion commercial-investigation vers la fin (le lecteur planifie concrètement un séjour en villa et évalue les options de transfert).

## Public cible
Voyageur qui prépare un premier séjour en villa haut de gamme à Saint-Barth et n'a jamais géré la logistique d'accès à l'île (piste courte, absence de vol direct, correspondances obligatoires). Profil : familles ou couples internationaux (Europe, États-Unis), habitués des voyages longue distance mais pas nécessairement des Caraïbes françaises.

## Pourquoi ce sujet maintenant
L'accès à l'île est la première question logistique — et souvent la première source d'inquiétude — de tout futur locataire de villa. Publier ce guide avant la haute saison 2026-2027 (article #1 du plan déjà en ligne sur la haute saison) permet de capter les recherches de planification qui commencent généralement plusieurs mois avant le séjour.

## Angle éditorial retenu
Guide pratique structuré : pourquoi il n'existe pas de vol direct (contrainte géographique et non marketing), les trois hubs de correspondance (Saint-Martin, San Juan, Antigua), les compagnies aériennes réellement identifiées avec leurs caractéristiques, l'option ferry, l'option jet privé/hélicoptère articulée avec le catalogue réel de services Sun Beach House (transferts et service VIP aéroport tels que décrits dans `i18n/translations.ts` namespace `conciergeriePage.travel` et `conciergeriePage.vip`), et des conseils pratiques.

## Analyse du gap de contenu
Le backlog contenait déjà plusieurs pistes voisines (« Service VIP aéroport », « Transferts privés », « St Barth Cata Cup » lié à Saint-Jean) mais aucun article de référence unique et vérifié sur l'ensemble des modes d'accès à l'île. Les guides tiers existants (agences de location, blogs de voyage) donnent des chiffres très divergents sur les fréquences et durées de traversée en ferry ; cet article reste volontairement plus prudent et qualitatif sur ces points précis, ce qui le distingue par sa rigueur plutôt que par l'exhaustivité chiffrée.

## Liens internes choisis
1. `/fr/conciergerie` — ancre « notre service de conciergerie » (section hubs complémentaires) et « notre équipe de conciergerie » (CTA final) — pour les transferts et le service VIP aéroport réellement proposés.
2. `/fr/blog/haute-saison-saint-barth-2026-2027` — ancre « notre guide complet de la haute saison à Saint-Barth » (article #1 du plan déjà en ligne) — pour la saisonnalité de la demande sur les vols.
3. `/fr/blog/gustavia-guide-saint-barth` — ancre « notre guide de Gustavia » (article déjà en ligne) — port d'arrivée du ferry.
4. `/fr/rentals` — ancre « notre sélection de villas à Saint-Barth » (CTA final).

Équivalents localisés utilisés dans les versions en/es/pt (slugs traduits identifiés dans les post.json existants : `st-barths-high-season-2026-2027` / `temporada-alta-saint-barth-2026-2027` / `alta-temporada-saint-barth-2026-2027` ; `gustavia-guide-saint-barthelemy` / `gustavia-guia-saint-barthelemy` / `gustavia-guia-saint-barthelemy`).

## relatedVillaSlugs
Laissé vide (`[]`) : aucune villa spécifique n'est citée dans l'article, et aucun slug de villa n'a été vérifié auprès de la collection Sanity actuelle pour ce sujet transversal (accès à l'île, non lié à un quartier ou une propriété en particulier).

## Catalogue de services vérifié avant rédaction
Lu `components/ConciergerieContent.tsx` et `i18n/translations.ts` (namespace `conciergeriePage`) : les services « Voyage, Transport & Arrivée » (`travel`) et « Services VIP Aéroport » (`vip`) existent réellement dans le catalogue Sun Beach House. Le texte confirme explicitement : vols privés (avions et hélicoptères), vols réguliers via Saint-Martin (SXM), San Juan (SJU), Antigua (ANU), Pointe-à-Pitre (PTP), transferts maritimes privés, et un service VIP aéroport optionnel et facturé séparément à SXM, SBH, SJU, ANU. L'article ne promet aucun service au-delà de ce catalogue réel et rappelle systématiquement le caractère optionnel et facturé séparément de ces prestations.
