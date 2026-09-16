<script setup lang="ts">
const year = new Date().getFullYear()

const pages = [
  { label: 'Accueil', to: '/' },
  { label: 'Collection', to: '/collection' },
  { label: 'Fabrication', to: '/fabrication' },
  { label: 'Où nous trouver', to: '/points-de-vente' },
  { label: 'Panier', to: '/panier' },
]
</script>

<template>
  <footer class="border-t-2 border-paper/15 py-10">
    <div class="container-content flex flex-col gap-8">
      <nav class="flex flex-wrap gap-x-6 gap-y-2 text-sm font-bold uppercase tracking-wide">
        <NuxtLink v-for="page in pages" :key="page.to" :to="page.to" class="text-paper/60 hover:text-paper">
          {{ page.label }}
        </NuxtLink>
      </nav>

      <div class="flex flex-col items-center justify-between gap-4 border-t-2 border-paper/15 pt-6 text-sm text-paper/50 md:flex-row">
        <p>© {{ year }} CST. Tous droits réservés.</p>
        <div class="flex items-center gap-6">
          <a href="#" class="hover:text-paper">Instagram</a>
          <a href="#" class="hover:text-paper">LinkedIn</a>
          <a href="#" class="hover:text-paper">Mentions légales</a>
        </div>
      </div>
    </div>
  </footer>
</template>
