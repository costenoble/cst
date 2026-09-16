// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/fonts',
  ],

  // Les composants sont rangés par dossier (layout/, sections/, ui/) pour
  // la lisibilité, mais on désactive le préfixage auto ("SectionsHeroSection")
  // pour garder des noms courts (<HeroSection />) dans les templates.
  components: [{ path: '~/components', pathPrefix: false }],

  css: ['~/assets/css/main.css'],

  app: {
    head: {
      title: 'CST — Tee-shirts graphiques en édition limitée',
      htmlAttrs: { lang: 'fr' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'CST — 5 designs de tee-shirts sérigraphiés à la main sur coton bio, produits en petites séries. RIOT, VOLT, STORM, FERAL, BLAZE.',
        },
      ],
    },
    // La transition de page ("bulle" qui grandit depuis le clic) est définie
    // directement sur <NuxtPage> dans app.vue plutôt qu'ici, car elle a besoin
    // du hook JS onBeforeEnter pour positionner --bubble-x/--bubble-y — un
    // objet de config non sérialisable que nuxt.config ne peut pas porter.
  },

  // Clé secrète Stripe (jamais exposée au client) + URL publique du site,
  // utilisées par server/api/checkout.post.ts pour construire les liens de
  // redirection Stripe Checkout. Bindées automatiquement depuis les variables
  // d'environnement NUXT_STRIPE_SECRET_KEY et NUXT_PUBLIC_SITE_URL (voir .env.example).
  runtimeConfig: {
    stripeSecretKey: '',
    public: {
      siteUrl: 'http://localhost:3000',
    },
  },

  fonts: {
    families: [
      { name: 'Clash Display', provider: 'fontshare', weights: [400, 500, 600, 700] },
      { name: 'Inter', provider: 'google', weights: [400, 500, 600, 700] },
    ],
  },

  tailwindcss: {
    cssPath: '~/assets/css/main.css',
    configPath: 'tailwind.config.ts',
  },
})
