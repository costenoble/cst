<script setup lang="ts">
const isMenuOpen = ref(false)
const { itemCount } = useCart()
</script>

<template>
  <header class="fixed inset-x-0 top-0 z-50 border-b-2 border-paper/15 bg-ink/90 backdrop-blur-sm">
    <div class="container-content flex items-center justify-between py-4">
      <NuxtLink to="/" class="font-display text-xl font-bold tracking-tight text-paper" @click="isMenuOpen = false">
        CST<span class="text-accent-lime">.</span>
      </NuxtLink>

      <div class="flex items-center gap-3">
        <NuxtLink
          to="/panier"
          class="flex items-center gap-2 rounded-card border-2 border-paper/30 px-4 py-2 text-sm font-bold uppercase tracking-widest text-paper transition-colors hover:border-paper"
          @click="isMenuOpen = false"
        >
          Panier
          <span
            v-if="itemCount > 0"
            class="flex h-5 min-w-5 items-center justify-center rounded-card bg-accent-lime px-1 text-xs font-bold text-ink"
          >
            {{ itemCount }}
          </span>
        </NuxtLink>

        <button
          type="button"
          class="flex h-11 w-11 flex-col items-center justify-center gap-[5px] rounded-card border-2 border-paper/30 transition-colors hover:border-paper"
          :aria-expanded="isMenuOpen"
          aria-label="Ouvrir le menu"
          @click="isMenuOpen = !isMenuOpen"
        >
          <span
            class="h-[2px] w-5 bg-paper transition-transform duration-200"
            :class="isMenuOpen ? 'translate-y-[3.5px] rotate-45' : ''"
          />
          <span
            class="h-[2px] w-5 bg-paper transition-transform duration-200"
            :class="isMenuOpen ? '-translate-y-[3.5px] -rotate-45' : ''"
          />
        </button>
      </div>
    </div>
  </header>

  <FullscreenMenu :open="isMenuOpen" @close="isMenuOpen = false" />
</template>
