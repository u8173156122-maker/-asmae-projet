# Guide de Déploiement - ASMAE EL GASMI

Ce projet peut être déployé sur **10 plateformes différentes**.

---

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      FRONTEND (React/Vite)                   │
│  Vercel | Netlify | Cloudflare Pages | GitHub Pages         │
└─────────────────────────────────────────────────────────────┘
                              ↓ API
┌─────────────────────────────────────────────────────────────┐
│                      BACKEND (Express/Node)                  │
│  Render | Railway | Fly.io | Heroku | DigitalOcean | Docker │
└─────────────────────────────────────────────────────────────┘
```

---

## 1. VERCEL (Frontend) ⭐ Recommandé

```bash
# Installation CLI
npm i -g vercel

# Déploiement
vercel --prod
```

**Variables d'environnement:**
- `VITE_API_URL` = URL de votre backend

---

## 2. NETLIFY (Frontend)

```bash
# Installation CLI
npm i -g netlify-cli

# Déploiement
netlify deploy --prod
```

**Variables d'environnement:** Configurer dans Netlify Dashboard

---

## 3. CLOUDFLARE PAGES (Frontend)

```bash
# Installation CLI
npm i -g wrangler

# Login
wrangler login

# Déploiement
npm run build && wrangler pages deploy dist
```

---

## 4. GITHUB PAGES (Frontend)

```bash
# Déploiement
npm run build && npm run deploy
```

**Note:** Configuré via le script `deploy` dans package.json

---

## 5. RENDER (Backend) ⭐ Recommandé

1. Connectez votre repo GitHub sur [render.com](https://render.com)
2. Créez un **Web Service**
3. Le fichier `render.yaml` configure automatiquement tout

**Variables d'environnement à configurer:**
- `OPENAI_API_KEY` (requis)
- `ALLOWED_ORIGINS`

---

## 6. RAILWAY (Backend)

```bash
# Installation CLI
npm i -g @railway/cli

# Login et déploiement
railway login
railway init
railway up
```

**Variables d'environnement:** Configurer dans Railway Dashboard

---

## 7. FLY.IO (Backend)

```bash
# Installation CLI (voir fly.io/docs)
curl -L https://fly.io/install.sh | sh

# Login
fly auth login

# Déploiement
fly launch
fly deploy
```

**Secrets:**
```bash
fly secrets set OPENAI_API_KEY=sk-xxx
fly secrets set ALLOWED_ORIGINS=https://elgasmiweb.vercel.app
```

---

## 8. HEROKU (Backend)

```bash
# Installation CLI
npm i -g heroku

# Login et déploiement
heroku login
heroku create asmae-api
git push heroku main
```

**Variables d'environnement:**
```bash
heroku config:set OPENAI_API_KEY=sk-xxx
heroku config:set NODE_ENV=production
```

---

## 9. DIGITALOCEAN (Backend)

1. Allez sur [cloud.digitalocean.com/apps](https://cloud.digitalocean.com/apps)
2. Créez une nouvelle App depuis GitHub
3. Le fichier `.do/app.yaml` configure automatiquement

---

## 10. DOCKER (Universel)

```bash
# Build et run local
docker-compose up -d

# Ou build image seule
docker build -t asmae-api .
docker run -p 3001:3001 --env-file .env asmae-api
```

**Déploiement sur n'importe quel service Docker:**
- AWS ECS
- Google Cloud Run
- Azure Container Apps
- Kubernetes

---

## Variables d'environnement requises

### Frontend
| Variable | Description |
|----------|-------------|
| `VITE_API_URL` | URL du backend API |
| `VITE_SENTRY_DSN` | (Optionnel) Sentry DSN |

### Backend
| Variable | Description |
|----------|-------------|
| `OPENAI_API_KEY` | **Requis** - Clé API OpenAI |
| `ALLOWED_ORIGINS` | URLs autorisées CORS |
| `NODE_ENV` | `production` ou `development` |
| `PORT` | Port du serveur (défaut: 3001) |

---

## Commandes rapides

```bash
# Développement local
npm run dev          # Frontend
npm run dev:server   # Backend

# Build
npm run build        # Frontend
npm run build:server # Backend

# Production locale
npm run preview      # Frontend
npm run start:server # Backend

# Docker
docker-compose up -d # Tout lancer
```

---

## Support

**Contact:** contact@elgasmi-eu.com | WhatsApp: +4368120460618
