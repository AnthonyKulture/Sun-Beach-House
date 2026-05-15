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

## Cadence automatisée

**2 articles par semaine, totalement automatisés**, via 2 routines Claude Code cloud :

- `sbh-editorial-monday` — Lundi 09:00 Europe/Paris (cron `0 7 * * 1` UTC)
- `sbh-editorial-thursday` — Jeudi 09:00 Europe/Paris (cron `0 7 * * 4` UTC)

Pilotage : https://claude.ai/code/routines

À chaque exécution :
1. Le sandbox cloud clone le repo, lit `topics-backlog.md`, prend le sujet suivant du « Plan 2026-05 ».
2. Recherche web + rédaction 4 langues + écriture des 5 fichiers `editorial/posts/{slug}/`.
3. Marque le sujet en `[~]` dans le backlog, commit, push sur `main`.
4. Le push déclenche le workflow GitHub Actions `import-editorial-post.yml` qui importe le `post.json` dans Sanity en brouillon.

Aucune action utilisateur jusqu'à ce point.

## Pré-requis : GitHub Secret

Le workflow GHA a besoin du secret **`SANITY_WRITE_TOKEN`** (rôle Editor).

Configuration unique :
1. https://www.sanity.io/manage → projet `i6dkdu7j` → API → Tokens → créer un token role `Editor`
2. https://github.com/AnthonyKulture/Sun-Beach-House/settings/secrets/actions → **New repository secret** → nom : `SANITY_WRITE_TOKEN`, valeur : le token Sanity.

Sans ce secret, le workflow GHA échoue avec un message clair.

## Cibles de ranking

Voir `topics-backlog.md` section « Cibles de ranking primaires ».

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

### Workflow complet (automatisé)

**Côté agent / GHA (automatique)** :
1. Routine cron exécute l'agent → produit `editorial/posts/<slug>/post.json` + 4 fichiers d'accompagnement
2. Agent commit + push sur `main`
3. GitHub Actions importe le post.json dans Sanity comme brouillon (`drafts.post-<slug>`)

**Côté humain (3 actions, ~10 min par article)** :
4. Ouvrir Sanity Studio → Blog / Magazine → trouver le brouillon
5. Uploader une image principale + relire le `verificationNotes`
6. Cliquer **Publish** → article visible sur `/[lang]/blog` (ISR 5 min après publish)

### Mode manuel (si besoin de redéclencher)

```bash
# Lancer le workflow GHA manuellement sur un post.json donné
gh workflow run import-editorial-post.yml -f file=editorial/posts/<slug>/post.json
```

Ou en local :
```bash
cd sbh-cms
npm run import-post -- --file=../editorial/posts/<slug>/post.json
```

## Garde-fous anti-hallucination

L'agent refuse de rédiger si moins de 3 sources fiables sont trouvées. Si vous voyez :

- `[À VÉRIFIER]` dans le corps de l'article → vérifier ou supprimer avant publication
- Un nom de villa, un prix, ou une date qui semble suspect → cross-check avec Sanity / sources officielles
- Une affirmation sans footnote `[^N]` → demander à l'agent de citer ou supprimer

L'agent est instruit de refuser les demandes du type "remplis les blancs", "fais sonner ça mieux", "ajoute des détails plausibles".
