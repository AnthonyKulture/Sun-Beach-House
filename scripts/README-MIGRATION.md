# Migration des Descriptions de Villas

## Contexte

Ce script migre les descriptions de villas du format bilingue (objet avec `fr` et `en`) vers le format français uniquement (string simple), car les traductions sont désormais gérées automatiquement par l'API Google Translate.

## Prérequis

- Node.js installé
- Variable d'environnement `SANITY_API_TOKEN` configurée dans `.env.local`

## Comment Exécuter

### Option 1 : Avec les variables d'environnement de .env.local

```bash
# Depuis la racine du projet
node scripts/migrate-descriptions-to-french.js
```

### Option 2 : En passant le token directement

```bash
SANITY_API_TOKEN=votre_token_ici node scripts/migrate-descriptions-to-french.js
```

## Ce que fait le script

1. ✅ Se connecte à Sanity avec le token d'écriture
2. ✅ Récupère toutes les villas
3. ✅ Pour chaque villa :
   - Vérifie si `description` est un objet `{ fr, en }`
   - Vérifie si `fullDescription` est un objet `{ fr, en }`
   - Si oui, extrait la valeur `.fr` et remplace l'objet par cette string
4. ✅ Affiche le progrès et un résumé final

## Exemple de transformation

### Avant
```json
{
  "description": {
    "fr": "Villa de luxe avec vue panoramique sur l'océan",
    "en": "Luxury villa with panoramic ocean view"
  },
  "fullDescription": {
    "fr": "Cette magnifique villa...",
    "en": "This magnificent villa..."
  }
}
```

### Après
```json
{
  "description": "Villa de luxe avec vue panoramique sur l'océan",
  "fullDescription": "Cette magnifique villa..."
}
```

## Sécurité

- ✅ Le script ne supprime rien, il remplace uniquement les champs
- ✅ Les villas déjà au bon format sont ignorées
- ✅ Chaque opération est loggée
- ✅ Un résumé est affiché à la fin

## En cas de problème

Si une erreur se produit :
1. Le script affichera l'erreur pour chaque villa concernée
2. Les autres villas continueront à être migrées
3. Un résumé des succès/erreurs sera affiché

## Après la migration

1. Déployez le nouveau schema Sanity :
   ```bash
   cd sbh-cms
   npm run deploy
   ```

2. Testez le site avec différentes langues

3. Vérifiez que les traductions automatiques fonctionnent
