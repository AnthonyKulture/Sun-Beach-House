# Brief éditorial — Statut fiscal de Saint-Barthélemy

**Slug FR** : `statut-fiscal-saint-barthelemy`
**Catégorie Sanity** : `immobilier`
**Plan 2026-08** : sujet #7
**Publication** : 20/08/2026, 09h00 Europe/Paris (`2026-08-20T07:00:00Z`)
**Note de calendrier** : ce créneau était initialement attribué au sujet #4 (St Barth Cata Cup 2026), retiré du
calendrier par le propriétaire du dépôt car déjà traité. L'article #7 prend ce créneau ; la règle habituelle de
calcul de la date de publication n'a donc pas été appliquée.

## Mots-clés

- **Primaire** : `fiscalité saint barthélemy`
  - Placé dans : H1 (« Statut fiscal de Saint-Barthélemy »), première phrase du corps, H2 n° 1
    (« Fiscalité de Saint-Barthélemy : une compétence propre, un code à part »), slug, meta description.
- **Secondaires / LSI** :
  - `statut fiscal saint barth`
  - `résidence fiscale saint barthélemy`
  - `droits d'enregistrement saint barth`
  - `taxe de séjour saint barthélemy`
  - `droit de quai saint barth`

**Intention de recherche** : informationnelle dominante, avec une forte composante
*commercial-investigation* — l'internaute compare des juridictions avant un achat, et cherche à savoir ce qui
s'appliquera à lui. Requêtes voisines détectées en recherche : « Saint-Barthélemy fait-elle partie de l'UE »,
« taxe foncière Saint-Barth », « devenir résident fiscal Saint-Barthélemy », « TVA Saint-Barthélemy ».

## Public visé

Acquéreur étranger ou métropolitain en phase de recherche, souvent en amont de tout contact avec un notaire.
Profil analytique : il veut comprendre un cadre avant d'engager une démarche. Il arrive avec deux idées reçues à
corriger — que l'achat d'un bien ouvrirait un statut fiscal local, et que « pas d'impôts » signifierait
« aucun prélèvement ». L'article répond aux deux, sans jamais glisser vers le conseil personnalisé.

## Pourquoi ce sujet maintenant

1. **Article pilier manquant.** Le Plan 2026-08 a publié le 07/08/2026 « Acheter une villa à Saint-Barthélemy :
   démarches, notaire, financement » (#3), qui traite volontairement la fiscalité de façon prudente et renvoie à
   un article dédié. Ce texte comble ce vide et devient la page de référence du cluster immobilier.
2. **Saisonnalité d'acquisition.** Les recherches immobilières s'intensifient à l'approche de la saison
   2026-2027 ; l'article se positionne avant le pic de décembre.
3. **Sujet à fort risque de désinformation.** Le champ est dominé par des contenus commerciaux imprécis. Un texte
   sourcé sur Légifrance, le Code des contributions, la douane et la presse locale a une valeur E-E-A-T élevée.

## Analyse du *content gap*

Les pages qui se positionnent aujourd'hui sur `fiscalité saint barthélemy` sont majoritairement des pages de
cabinets (comptables, avocats, gestion de patrimoine) et de portails d'annonces. Trois manques récurrents :

- **La règle des cinq ans est mentionnée mais rarement expliquée** : critères alternatifs du Code des
  contributions, appréciation au 1er janvier, déclenchement à l'issue de la cinquième année de date à date,
  applicabilité depuis le 15 juillet 2007, cas des personnes morales. Notre article détaille les cinq points.
- **La fiscalité de détention est réduite à « pas de taxe foncière »**, en omettant les prélèvements qui touchent
  réellement un propriétaire : TED et surtout CFAE, due par les SCI — point décisif pour un acquéreur qui
  structure son achat via une société civile immobilière.
- **La taxe de séjour et le droit de quai sont traités séparément du sujet immobilier**, alors qu'ils pèsent
  concrètement sur un projet locatif ou un chantier de rénovation.

Différenciateur assumé : nous publions un barème de plus-value **uniquement** là où deux sources indépendantes le
corroborent, et nous signalons explicitement les points à faire chiffrer par un notaire.

## Maillage interne retenu (5)

| Phrase d'ancrage (FR) | Cible |
|---|---|
| démarches d'acquisition d'une villa à Saint-Barthélemy | `/fr/blog/acheter-villa-saint-barthelemy` |
| notre sélection de villas à la vente à Saint-Barthélemy | `/fr/sales` |
| villas que nous proposons en location saisonnière | `/fr/rentals` |
| conciergerie sur place | `/fr/conciergerie` |
| Valérie Kerckhofs, fondatrice de Sun Beach House | `/fr/about` |

Équivalents traduits : `/en/blog/buying-villa-saint-barthelemy`, `/es/blog/comprar-villa-saint-barthelemy`,
`/pt/blog/comprar-villa-saint-barthelemy`, puis `/xx/sales`, `/xx/rentals`, `/xx/conciergerie`, `/xx/about`.

`relatedVillaSlugs` : `[]`. Aucun slug de villa n'est versionné dans `sbh-cms/` (les documents villa vivent dans le
jeu de données Sanity) ; conformément à la règle « ne jamais inventer de slug », le tableau reste vide.

## Garde-fous appliqués

- Aucun conseil fiscal personnalisé. L'article décrit un cadre normatif et renvoie explicitement, dans le corps
  (fin de la section « Ce qui relève encore de la France et de l'Union européenne ») et dans la conclusion, vers un
  notaire et un conseil fiscal habilité — dans les quatre langues.
- Tout taux publié est corroboré par deux sources indépendantes. Les chiffres à source unique ont été retirés
  plutôt que reformulés de façon vague (liste dans `sources.md`).
- Zéro marqueur `[À VÉRIFIER]`.
- Longueur FR : 2 163 mots (hors bibliographie). EN 2 029, ES 2 255, PT 2 195 — l'expansion es/pt est naturelle et
  ne correspond à aucun ajout de contenu.
