# Configuration Guide: Google Cloud Translation API

## Étapes de Configuration

### 1. Créer un Projet Google Cloud

1. Aller sur https://console.cloud.google.com
2. Créer un nouveau projet ou sélectionner un existant
3. Noter le **Project ID**

### 2. Activer l'API Cloud Translation

1. Dans le menu, aller à **APIs & Services** → **Library**
2. Chercher "Cloud Translation API"
3. Cliquer sur **Enable**

### 3. Créer une Clé API

1. Aller à **APIs & Services** → **Credentials**
2. Cliquer sur **Create Credentials** → **API Key**
3. Copier la clé générée
4. (Recommandé) Cliquer sur **Restrict Key** :
   - Application restrictions: **None** (ou IP si statique)
   - API restrictions: **Cloud Translation API** uniquement

### 4. Ajouter la Clé dans .env.local

```env
# Google Cloud Translation API
GOOGLE_TRANSLATE_API_KEY=AIzaSy...votre_clé_ici

# Sanity Write Token (pour le cache des traductions)
SANITY_API_TOKEN=skXXX...votre_token_ici
```

### 5. Redémarrer le serveur

```bash
npm run dev
```

## Coûts

- **$20 par 1 million de caractères**
- Facturation au caractère exact
- Pas de tier gratuit, mais coûts minimes au départ

**Exemple**:
- 50 villas × 500 chars × 3 langues = 75,000 chars
- Coût initial: **$1.50**
- Une fois traduit → cache permanent (gratuit)

## Sécurité

⚠️ **Important**: Ne jamais commiter `.env.local` dans Git

Le fichier `.gitignore` doit contenir:
```
.env.local
.env*.local
```

## Déploiement (Vercel)

1. Aller dans **Project Settings** → **Environment Variables**
2. Ajouter:
   - `GOOGLE_TRANSLATE_API_KEY` = votre_clé
   - `SANITY_API_TOKEN` = votre_token
3. Redéployer

## Monitoring

Pour suivre votre usage:
1. Google Cloud Console → **APIs & Services** → **Dashboard**
2. Sélectionner **Cloud Translation API**
3. Voir les métriques d'utilisation

## Limites de Quota

Par défaut: **500,000 caractères/jour**

Pour augmenter:
1. **APIs & Services** → **Quotas**
2. Chercher "Cloud Translation API"
3. Demander une augmentation si nécessaire
