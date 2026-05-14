# Style guide — Sun Beach House editorial

Référence pour l'agent `sbh-editorial`. À lire avant chaque rédaction.

## Voix de la marque

Sun Beach House est une agence à taille humaine fondée par Valérie Kerckhofs, présente à Saint-Barthélemy depuis 1996. La voix éditoriale doit refléter :

- **Connaissance intime de l'île** : on ne décrit pas un lieu touristique vu de loin, on parle d'un quartier qu'on traverse à pied.
- **Précision concrète** : "le sentier qui descend vers Colombier" plutôt que "des paysages à couper le souffle".
- **Chaleur sans familiarité** : vouvoiement systématique en FR, usted en ES, registre soutenu.
- **Discrétion** : on ne nomme pas les clients, on ne raconte pas leurs séjours sans accord.
- **Pas de superlatifs vides** : interdiction de "exceptionnel", "incroyable", "magique", "ultime", "à couper le souffle", "luxe absolu" sauf si appuyé par un fait spécifique.

## Tonalité de référence

Lire `i18n/translations.ts` namespace `aboutPage` (l'histoire de Valérie) — c'est le ton cible. Extrait :

> "La première fois que j'ai posé le pied à Saint-Barth, c'était en 1993. J'étais jeune, libre, curieuse… et je suis tombée amoureuse de cette île avant même de comprendre pourquoi."

Pour les articles de blog, on garde ce ton sur les hooks d'intro, puis on bascule en mode structuré (H2/H3, listes, tableaux) pour le corps utile au SEO et à la citation par IA.

## Règles d'écriture

### FR
- Vouvoiement.
- Pas d'inclusif (.e, ·e) — registre traditionnel.
- "Saint-Barthélemy" (forme officielle), "Saint-Barth" (forme familière acceptée), jamais "St-Barth" en corps de texte.
- Heures au format 24h ("18h30"), pas "6:30 PM".
- Dates en prose : "15 décembre 2026". En tableau : "15/12/2026".
- Prix : "12 500 USD / semaine", espace insécable.
- Italique pour les mots étrangers : *fast track*, *beach club*.

### EN
- US English, sauf si le sujet est européen.
- Sentence case for headings (not Title Case).
- Oxford comma off (UK preference) — but consistent within an article.
- Prices : "$12,500 / week" or "USD 12,500 / week" for international audience.

### ES
- Castellano internacional, vouvoiement (usted).
- "Saint-Barthélemy" gardé tel quel (pas hispanisé "San Bartolomé" dans le corps — le nom courant à Saint-Barth est le français).
- Prix : "12 500 USD / semana".

### PT
- Português europeu (pas brésilien).
- "Saint-Barthélemy" tel quel.
- Prix : "12 500 USD / semana".

## Structure d'article type

Pour un article de 1 800 mots (FR de référence) :

1. **H1** : intègre le mot-clé principal naturellement. Pas de "Le Guide Ultime de…".
2. **Hook narratif** (2-3 paragraphes, ~150 mots) : ancré dans un fait vérifiable, une scène, une saison.
3. **H2 #1** — pose le contexte (qui, quoi, où). 200-300 mots.
4. **H2 #2-4** — corps utile : faits, données, listes, sous-sections H3. ~250-300 mots chacun.
5. **H2 #5** : section pratique (comment réserver, à savoir avant, calendrier). Souvent en tableau ou liste.
6. **H2 "Questions fréquentes"** : 3-5 Q&A. Aligné sur les "People Also Ask" trouvés en recherche.
7. **H2 "Notre recommandation"** : 1 paragraphe + CTA descriptif (lien vers `/rentals`, `/conciergerie`, ou `/contact`).
8. **Bibliographie / Sources** : liste numérotée, footnotes Markdown `[^1]`.

## Internal linking

Chaque article a 3-5 liens internes :

- Toujours 1 lien vers une page de service (`/rentals`, `/sales`, ou `/conciergerie`).
- Toujours 1 lien vers la page About (`/about`) si on cite Valérie ou l'historique.
- 1-3 liens vers villas spécifiques (`/villas/{slug}`), pages quartier (`/destinations`), ou autres articles du blog si pertinent.
- Anchor text : descriptif, jamais "cliquez ici", "voir plus", "ce lien". Exemple : "[notre sélection de villas à Pointe Milou](/fr/rentals?location=Pointe+Milou)".

## Citation des sources

Format footnote Markdown :

```markdown
La Bucket Regatta réunit chaque année en mars une flotte de yachts de plus de 30 mètres[^1].

…

[^1]: Bucket Regatta — site officiel — https://bucketregatta.com — consulté le 14/05/2026
```

Bibliographie complète dans `post.sources` du JSON Sanity (titre, URL, éditeur, date pub, date consult).

## Mots et expressions à bannir

- "Exceptionnel" / "exceptional"
- "Magique" / "magical"
- "À couper le souffle" / "breathtaking"
- "Incontournable" sans justification
- "Le luxe absolu"
- "Cliquez ici" / "click here" / "haga clic aquí" / "clique aqui"
- "Ultime guide" / "ultimate guide"
- "Le rêve" / "a dream"
- "Wow", "OMG"
- Emoji (aucun)

## Mots et expressions recommandés (FR)

- "À taille humaine"
- "Sélection visitée"
- "Hors-ligne / off-market"
- "Confidentiel"
- "Sur-mesure"
- "Conciergerie incluse"
- "Saison basse / haute / Noël / Nouvel An / Bucket"
- "Quartier" (préféré à "zone")

## Currency / unités

- Locations : USD / semaine
- Ventes : EUR
- Surfaces : m² (jamais sqft sauf en EN si international)
- Distances : km
