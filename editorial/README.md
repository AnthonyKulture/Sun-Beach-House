# Editorial pipeline — Sun Beach House

Infrastructure pour la production d'articles de blog via l'agent `sbh-editorial`.

## Structure

```
editorial/
├── README.md              # ce fichier
├── style-guide.md         # voix, règles d'écriture, mots bannis
├── topics-backlog.md      # queue de sujets à traiter
└── posts/
    └── {slug}/
        ├── post.json      # document Sanity prêt à importer
        ├── sources.md     # bibliographie complète
        ├── brief.md       # mots-clés, audience, contexte
        ├── _research.md   # notes de recherche (internes)
        └── _outline.md    # plan validé avant rédaction
```

## Comment lancer l'agent

L'agent est défini dans `.claude/agents/sbh-editorial.md`.

### Mode automatique (sujet suivant du backlog)
```
@sbh-editorial Prends le sujet suivant du backlog et produis l'article complet.
```

### Mode sujet imposé
```
@sbh-editorial Rédige un article sur "Bucket Regatta 2027 : dates et villas disponibles". Mot-clé principal : "bucket regatta saint barth 2027".
```

### Mode recherche seule (pas de rédaction)
```
@sbh-editorial Recherche uniquement : 8 sources fiables sur la taxe de séjour à Saint-Barthélemy en 2026. Ne rédige pas.
```

## Cadence cible

2 articles par semaine. Suggestion de planning :

- **Lundi** : sujet "actualité / saisonnier" (événements à venir, saison qui s'ouvre).
- **Jeudi** : sujet "evergreen" (guide pratique, quartier, service).

Programmation possible avec `/schedule` ou `/loop` une fois la pipeline rodée.

## Quality gates avant import dans Sanity

Pour chaque article, vérifier :

- [ ] ≥ 3 sources fiables citées
- [ ] 0 ou très peu de marqueurs `[À VÉRIFIER]`
- [ ] Slug en kebab-case, mots-clé inclus
- [ ] Meta description ≤ 155 caractères
- [ ] 4 langues présentes (fr/en/es/pt)
- [ ] 3-5 liens internes
- [ ] Pas de villa inventée (cross-check avec Sanity)
- [ ] Image principale identifiée (URL ou photo à fournir)
- [ ] Catégorie cohérente

## Import dans Sanity

Script automatisé : `sbh-cms/scripts/import-post.js`.

### Pré-requis (une seule fois)

Token d'écriture Sanity dans `sbh-cms/.env.local` :
```
SANITY_WRITE_TOKEN=skXXXXXX...
```
Génération : https://www.sanity.io/manage → projet `i6dkdu7j` → API → Tokens → "Editor" role.

### Dry-run (validation seule, aucune écriture)

```bash
cd sbh-cms
npm run import-post -- --file=../editorial/posts/<slug>/post.json --dry-run
```

Affiche : validation schéma, lookup des villas liées, structure du doc final. Aucun appel d'écriture à Sanity.

### Import réel (en brouillon — recommandé)

```bash
cd sbh-cms
npm run import-post -- --file=../editorial/posts/<slug>/post.json
```

Crée un **brouillon Sanity** (`_id = drafts.post-<slug>`). L'article n'est PAS visible sur le site tant que vous n'avez pas cliqué "Publish" dans le Studio Sanity. Idempotent : ré-exécuter met à jour le même brouillon.

### Avec image principale

```bash
cd sbh-cms
npm run import-post -- --file=../editorial/posts/<slug>/post.json --image=../path/to/hero.jpg
```

Upload l'image en asset Sanity, l'attache à `mainImage`, et reprend les `alt` fields déjà présents dans `post.json`.

### Publication directe (déconseillé)

```bash
cd sbh-cms
npm run import-post -- --file=../editorial/posts/<slug>/post.json --publish
```

Crée directement un document publié (`_id = post-<slug>`). À éviter tant que la relecture humaine n'est pas faite — l'article apparaîtra immédiatement sur `/[lang]/blog`.

### Garde-fous du script

- Refuse si le `post.json` contient au moins un `[À VÉRIFIER]` dans le body.
- Refuse si `title.fr` > 120 caractères, `excerpt.fr` > 170, ou `category` hors liste.
- Logue les `relatedVillaSlugs` introuvables dans Sanity (non bloquant — les références manquantes sont simplement omises).
- N'écrit RIEN en mode `--dry-run`.

### Workflow complet recommandé

1. Agent produit `editorial/posts/<slug>/post.json`
2. Relire le `verificationNotes` et corriger si besoin
3. `npm run import-post -- --file=... --dry-run` pour valider
4. `npm run import-post -- --file=... --image=...` pour importer (en brouillon)
5. Ouvrir le doc dans Studio (URL imprimée par le script)
6. Vérification finale visuelle dans le studio
7. Cliquer **Publish** dans Sanity Studio → l'article devient visible sur `/[lang]/blog` (ISR 5 min)

## Garde-fous anti-hallucination

L'agent refuse de rédiger si moins de 3 sources fiables sont trouvées. Si vous voyez :

- `[À VÉRIFIER]` dans le corps de l'article → vérifier ou supprimer avant publication
- Un nom de villa, un prix, ou une date qui semble suspect → cross-check avec Sanity / sources officielles
- Une affirmation sans footnote `[^N]` → demander à l'agent de citer ou supprimer

L'agent est instruit de refuser les demandes du type "remplis les blancs", "fais sonner ça mieux", "ajoute des détails plausibles".
