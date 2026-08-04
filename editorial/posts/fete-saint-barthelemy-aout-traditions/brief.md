# Brief — Fête de Saint-Barthélemy et Saint-Louis : deux jours de traditions (24-25 août)

## Contexte
Article #1 du Plan éditorial 2026-08 (« Préparer la saison 2026-2027 »), premier des articles « Jeudi = événement culturel réel de la saison ». Publié en tête de plan et positionné pour sortir avant le 24 août 2026, date de la fête. Slug fixé par le plan : `fete-saint-barthelemy-aout-traditions`.

## Pourquoi ce sujet maintenant
- Le week-end du 24-25 août est un événement récurrent, documenté chaque année par la presse locale, mais peu couvert par les contenus destinés aux visiteurs anglophones/hispanophones/lusophones.
- Fin août correspond à la basse saison touristique à Saint-Barthélemy — un angle utile pour Sun Beach House afin de valoriser une période creuse sans décrédibiliser l'offre haute saison déjà couverte par d'autres articles du site (`haute-saison-saint-barth-2026-2027`, `louer-villa-saint-barth-noel-reservation`).
- Complète le maillage interne avec l'article `gustavia-guide-saint-barth` déjà publié et prépare le terrain pour l'article #10 du même plan (Carnaval de Saint-Barth 2027), qui réutilisera vraisemblablement les mêmes quartiers et références historiques.

## Mots-clés
- **Primaire** : fête saint barthélemy août
- **Secondaires / LSI** : fête de la Saint-Barthélemy Gustavia, fête Saint-Louis Corossol, traditions Saint-Barthélemy, 24 août Saint-Barth, basse saison villa Saint-Barth

## Intention de recherche
Principalement informationnelle (comprendre ce que sont ces deux fêtes, leur déroulé, leur histoire), avec une composante commercial-investigation pour les lecteurs qui envisagent un séjour en villa fin août et cherchent à savoir si la période vaut le déplacement.

## Audience cible
Visiteurs internationaux (FR/EN/ES/PT) envisageant un séjour à Saint-Barthélemy en basse saison, en particulier autour du 24-25 août ; lecteurs francophones curieux du patrimoine culturel de l'île ; voyageurs cherchant une expérience plus authentique que la haute saison.

## Analyse du vide de contenu (content gap)
La couverture existante de cet événement (Le Journal de Saint-Barth, Routard, Petit Futé) est en français et orientée « agenda local », sans mise en perspective pour un visiteur international envisageant un séjour en villa. Sun Beach House peut combler ce vide avec un contenu multilingue qui relie la fête à une réflexion pratique sur le choix de la période de séjour, tout en respectant scrupuleusement les faits publiés par la presse et l'office de tourisme.

## Liens internes choisis (5)
1. « notre guide de Gustavia » → `/{lang}/blog/gustavia-guide-saint-barth(-elemy|-guia-saint-barthelemy)` — approfondissement du quartier hôte de la fête du 24 août.
2. « le quartier de Corossol » → `/{lang}/location-villa-corossol` — page quartier existante (confirmée dans `data/neighborhoods.ts`).
3. page « destinations » → `/{lang}/destinations` — vue d'ensemble des quartiers.
4. « notre sélection de villas » → `/{lang}/rentals` — CTA principal.
5. « notre service de conciergerie » → `/{lang}/conciergerie` — CTA secondaire (organisation logistique autour des festivités).

## Décisions éditoriales notables
- Aucune invention de programme 2026 : le déroulé s'appuie explicitement sur les éditions 2019, 2024 et 2025, avec une phrase de transparence dans le corps de l'article et dans la FAQ précisant que le programme 2026 n'est pas encore publié à la date de rédaction.
- Le tournoi de dominos et la petite régate du 24 août sont présentés comme des traditions documentées mais non garanties chaque année (absentes du programme 2025 selon la source [^1]) — formulation volontairement prudente pour éviter toute promesse non vérifiable.
- Le nom du président de la Collectivité, cité dans un article source de 2019, a été volontairement omis (information non vérifiable pour 2026).
- Les détails biographiques trouvés sur l'introduction du latanier à Corossol (nom d'un prêtre, dates précises 1890/1925) provenaient uniquement de sources non trusted et ont été écartés ; seul le fait générique confirmé par l'office de tourisme officiel a été conservé.
- Aucun `[À VÉRIFIER]` dans le texte final (objectif atteint).

## Contrainte technique rencontrée
WebFetch a été indisponible pendant toute la session (HTTP 403 systématique sur tous les domaines testés, y compris Wikipédia) — panne d'outil confirmée via les journaux du proxy agent (`connect_rejected` sur `journaldesaintbarth.com` notamment), et non un blocage propre à ces sources. La recherche a donc reposé sur l'extraction côté serveur de WebSearch, qui a fourni un contenu substantiel et attribuable. Recommandation : si WebFetch redevient fonctionnel avant publication, revérifier en lecture directe les sources [^1], [^2] et [^5], qui portent le programme détaillé des deux fêtes.
