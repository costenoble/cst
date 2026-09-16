<script setup lang="ts">
const year = new Date().getFullYear()

const pages = [
  { label: 'Accueil', to: '/' },
  { label: 'Collection', to: '/collection' },
  { label: 'Fabrication', to: '/fabrication' },
  { label: 'Où nous trouver', to: '/points-de-vente' },
  { label: 'Panier', to: '/panier' },
]

const socials = [
  { label: 'Instagram', href: '#' },
  { label: 'LinkedIn', href: '#' },
]
</script>

<template>
  <footer class="border-t-2 border-paper/15">
    <div class="container-content flex flex-col gap-12 py-16">
      <div class="grid grid-cols-1 gap-10 sm:grid-cols-3">
        <div>
          <NuxtLink to="/" class="font-display text-2xl font-bold uppercase text-paper">
            CST<span class="text-accent-lime">.</span>
          </NuxtLink>
          <p class="mt-4 max-w-[24ch] text-sm text-paper/50">
            Streetwear brut, séries limitées. 5 designs, zéro compromis.
          </p>
        </div>

        <div>
          <p class="text-xs font-bold uppercase tracking-[0.2em] text-paper/40">Navigation</p>
          <nav class="mt-4 flex flex-col gap-2.5 text-sm font-bold uppercase tracking-wide">
            <NuxtLink v-for="page in pages" :key="page.to" :to="page.to" class="w-fit text-paper/60 hover:text-paper">
              {{ page.label }}
            </NuxtLink>
          </nav>
        </div>

        <div>
          <p class="text-xs font-bold uppercase tracking-[0.2em] text-paper/40">Suivez-nous</p>
          <div class="mt-4 flex flex-col gap-2.5 text-sm font-bold uppercase tracking-wide">
            <a v-for="social in socials" :key="social.label" :href="social.href" class="w-fit text-paper/60 hover:text-paper">
              {{ social.label }}
            </a>
          </div>
        </div>
      </div>

      <div class="flex flex-col items-center justify-between gap-4 border-t-2 border-paper/15 pt-6 text-sm text-paper/50 md:flex-row">
        <p>© {{ year }} CST. Tous droits réservés.</p>
        <a href="#" class="hover:text-paper">Mentions légales</a>
      </div>
    </div>

    <ClientOnly>
      <FooterPhysics />
    </ClientOnly>
  </footer>
</template>
