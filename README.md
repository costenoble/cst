# CST — site vitrine + boutique Nuxt 3

Site de marque pour CST, tee-shirts graphiques sérigraphiés à la main sur coton bio
(5 designs : RIOT, VOLT, STORM, FERAL, BLAZE). Vitrine créative + vrai panier (avec choix
de taille) + paiement Stripe. Contenu (descriptions, revendeurs) en partie factice — à
remplacer par le vôtre.

## Stack

- **Nuxt 3/4** (Vue 3, TypeScript)
- **Tailwind CSS** (`@nuxtjs/tailwindcss`) — design tokens dans `tailwind.config.ts`
- **@nuxt/fonts** — polices self-hostées automatiquement (Clash Display + Inter)
- **motion-v** — animations et micro-interactions déclaratives (port Vue de Motion)
- **GSAP + ScrollTrigger** — reveal au scroll (`useScrollReveal`)
- **Stripe** — paiement via Checkout Session, créée côté serveur (`server/api/checkout.post.ts`)

## Installation

```bash
pnpm install   # ou npm install / yarn install
pnpm dev       # http://localhost:3000
```

```bash
pnpm build     # build de production dans .output/
pnpm preview   # prévisualiser le build de prod
```

> **Node** : ce projet nécessite **Node.js 22+**. Nuxt 4.5 / Vite 8 utilisent en interne
> `Set.prototype.difference` (API récente du moteur JS), absente de Node 20 — le build
> échoue avec `trustedFunctions.difference is not a function` sur des versions plus
> anciennes. Vérifiez avec `node -v`, et utilisez `nvm use 22` si besoin.

> **Note réseau** : au premier `dev`/`build`, `@nuxt/fonts` télécharge les
> polices (Google Fonts, Fontshare) et les self-host. Ça nécessite un accès
> internet normal — si le build tourne dans un environnement au réseau
> restreint, il continue quand même (fallback sur les polices système), mais
> les vraies polices n'apparaîtront qu'avec un accès complet.

## Paiement (Stripe)

Le panier (`/panier`) déclenche une vraie **Stripe Checkout Session**, créée côté serveur.
Sans clé configurée, le site fonctionne normalement (vitrine + panier local) mais le clic
sur "Passer la commande" affiche une erreur claire au lieu de planter.

1. Copiez `.env.example` en `.env`.
2. Créez un compte sur [dashboard.stripe.com](https://dashboard.stripe.com), récupérez une
   **clé secrète de test** (`sk_test_...`) dans *Développeurs > Clés API*, collez-la dans
   `NUXT_STRIPE_SECRET_KEY`.
3. Relancez `pnpm dev`. Depuis `/panier`, "Passer la commande" redirige vers une page
   Stripe Checkout hébergée. Payez avec la carte de test `4242 4242 4242 4242` (date future,
   CVC quelconque) pour finir sur `/commande/succes` (le panier est alors vidé). Le lien
   retour de Stripe mène à `/commande/annulee` (panier conservé).

Les prix ne sont **jamais** envoyés par le client : le serveur les recalcule depuis
`app/data/products.ts` avant de créer la session, pour éviter toute manipulation du panier.

## Structure

```
app/
  assets/css/main.css       Design tokens Tailwind, classes utilitaires (.btn-primary, .tag...)
  components/
    layout/                 Header (avec badge panier), menu plein écran, footer
    sections/                Hero, Marquee, Products, Process, Stockists, Newsletter
    ui/                      ProductShirt (tee SVG), ProductCard, QuantityStepper, PageHeader
  composables/
    useCart.ts               Panier partagé (useState) : ajout, retrait, quantités, totaux
    useScrollReveal.ts       Reveal au scroll basé sur GSAP ScrollTrigger
  data/
    products.ts               Les 5 designs (nom, accent, prix, tailles, description)
  pages/
    index.vue                 Accueil (teaser)
    collection.vue             Catalogue complet
    fabrication.vue            Process de fabrication
    points-de-vente.vue        Revendeurs
    panier.vue                 Page panier
    commande/succes.vue        Retour Stripe après paiement réussi
    commande/annulee.vue       Retour Stripe après annulation
  plugins/
    gsap.client.ts            Enregistrement de ScrollTrigger (client only)
    cart-persistence.client.ts Persistance du panier dans localStorage (après hydratation)
  utils/
    accent.ts                 Classes Tailwind par accent, écrites en toutes lettres pour le JIT
server/
  api/checkout.post.ts        Crée la Stripe Checkout Session (jamais de clé côté client)
```

## Personnaliser

- **Couleurs / rayons** : `tailwind.config.ts` (`colors.ink`, `colors.paper`, `colors.accent.*`
  — un accent par design)
- **Police display** : `nuxt.config.ts` → bloc `fonts.families`
- **Designs, prix, descriptions** : tout est dans `app/data/products.ts` — modifier ce fichier
  suffit à mettre à jour cartes, illustrations et Stripe
- **Tailles** : la liste `sizes` dans `app/data/products.ts` (S/M/L/XL par défaut)
- **Illustrations produit** : les tee-shirts sont des SVG générés
  (`app/components/ui/ProductShirt.vue`), pas des photos — pour de vraies photos produit,
  remplacez ce composant par une `<img>`

## Déploiement

Le build produit un serveur Node autonome dans `.output/` (`node .output/server/index.mjs`),
compatible avec Vercel, Netlify, Node classique, etc. Pensez à configurer
`NUXT_STRIPE_SECRET_KEY` et `NUXT_PUBLIC_SITE_URL` (URL réelle du site en prod) dans les
variables d'environnement de votre hébergeur. Voir la
[doc de déploiement Nuxt](https://nuxt.com/docs/getting-started/deployment).
