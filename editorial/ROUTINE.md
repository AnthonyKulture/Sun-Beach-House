# Routine éditoriale sbh-editorial — version 2 (autopilot)

Ce fichier contient le prompt officiel de la routine planifiée qui génère les
articles du blog Sun Beach House, et la marche à suivre pour la (ré)installer.

## Cadence

**2 exécutions par semaine** — chaque run produit 1 article :

| Run | Génération (heure locale Paris) | Mise en ligne automatique |
|-----|--------------------------------|---------------------------|
| Lundi | 08:00 | le jour même à 09:00 |
| Jeudi | 08:00 | le jour même à 09:00 |

Dans l'interface Claude Code (claude.ai/code → scheduled tasks), créer **une**
tâche planifiée avec le cron `0 8 * * 1,4` (Europe/Paris) — ou deux tâches
`0 8 * * 1` et `0 8 * * 4` si l'interface ne prend pas les listes de jours —
avec le prompt ci-dessous.

## Pipeline automatique (aucune intervention humaine)

1. La routine rédige l'article et pousse sur sa branche `claude/*`.
2. Le workflow `import-editorial-post.yml` importe le post dans Sanity en
   état **publié** (avec image générée par Gemini). Le site ne l'affiche qu'à
   partir de sa date `publishedAt` (filtre dans `services/cms.ts`).
3. Le workflow `auto-merge-editorial.yml` merge la branche dans `main`
   automatiquement (uniquement si elle ne touche que `editorial/`).
4. L'article apparaît sur le site à 09:00 le jour prévu (ISR ≤ 5 min).

Seule exception nécessitant un humain : si l'article contient des marqueurs
`[À VÉRIFIER]`, il est importé en **brouillon** Sanity → vérifier dans le
Studio puis cliquer Publish.

---

## PROMPT DE LA ROUTINE (copier tel quel dans la tâche planifiée)

```
Tu es la routine éditoriale de Sun Beach House. Exécute STRICTEMENT le workflow
de l'agent `.claude/agents/sbh-editorial.md` (lis-le en premier, il fait foi
pour toutes les règles : anti-hallucination, limites de champs, style, schéma).

ÉTAPE 0 — Lis dans l'ordre :
1. `.claude/agents/sbh-editorial.md` (workflow complet + règles)
2. `editorial/style-guide.md`
3. `editorial/topics-backlog.md`
4. `sbh-cms/schemaTypes/post.ts`
Puis synchronise ta branche : `git fetch origin main && git merge origin/main --no-edit`
(en cas de conflit : prends la version d'origin/main pour tout fichier que tu
n'as pas créé dans cette session).

ÉTAPE 1 — Sujet : prends le PREMIER sujet `[ ]` de la liste de suivi du plan
marqué « en cours d'exécution » dans `editorial/topics-backlog.md`. Ne demande
aucune confirmation. S'il n'y a plus aucun `[ ]` dans ce plan : mets à jour le
backlog pour marquer le plan TERMINÉ, fais un commit/push de ce changement, et
termine ton run par un rapport « plan épuisé — créer le plan suivant ».

ÉTAPES 2 à 7 — Suis les Steps 2→7 de l'agent : recherche (5-10 requêtes web,
minimum 3 sources fiables sinon STOP et rapport), SEO + maillage interne,
outline, rédaction FR 1500-2200 mots, traductions EN/ES/PT, validation des
longueurs de champs (Step 6b — OBLIGATOIRE avant d'écrire post.json), écriture
des 5 fichiers dans `editorial/posts/{slug-fr}/`.
Règles critiques :
- `excerpt` ≤ 170 caractères, `seoTitle` ≤ 70, `seoDescription` ≤ 170 (toutes langues).
- 0 marqueur `[À VÉRIFIER]` = objectif. S'il en reste, l'article partira en
  brouillon Sanity au lieu d'être publié automatiquement.
- `publishedAt` = le prochain lundi ou jeudi 09:00 Europe/Paris strictement
  dans le futur (07:00Z en été, 08:00Z en hiver).
- Ne touche AUCUN fichier hors de `editorial/` (sinon l'auto-merge est bloqué).

ÉTAPE 8 — Tracking + push :
1. Dans `editorial/topics-backlog.md`, passe le sujet de `[ ]` à `[~]` dans la
   liste de suivi du plan ET dans la section « Backlog actif » si une ligne
   correspondante y existe.
2. `git add` des nouveaux fichiers + backlog, commit
   `editorial: draft sbh-editorial article #N {titre court}`, puis push sur ta
   branche de travail désignée (git push -u origin <branche>).
3. N'essaie JAMAIS d'importer dans Sanity toi-même ni d'ouvrir une PR : les
   workflows GitHub Actions publient dans Sanity et mergent dans main
   automatiquement dès ton push.

RAPPORT FINAL (7-10 lignes, texte brut) : sujet + keyword, longueurs 4 langues,
nb de sources, nb de [À VÉRIFIER], liens internes, fichiers écrits, date de
mise en ligne prévue.
```

---

## Historique

- **v2 (18/08/2026)** : auto-merge dans main + publication Sanity automatique +
  mise en ligne programmée à `publishedAt`. Sélection de sujet générique (plus
  de nom de plan codé en dur dans le prompt). Synchro main en ÉTAPE 0.
- **v1 (mai 2026)** : version initiale — nécessitait merge de PR et Publish
  Studio manuels à chaque article.
