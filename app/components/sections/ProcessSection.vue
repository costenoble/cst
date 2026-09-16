<script setup lang="ts">
interface ProcessStep {
  step: string
  title: string
  description: string
  accent: 'pink' | 'blue' | 'green' | 'amber'
  icon: 'thread' | 'print' | 'scissors' | 'check'
}

const steps: ProcessStep[] = [
  {
    step: '01',
    title: 'Sourcing coton',
    description:
      'Coton bio sélectionné auprès de filatures européennes, tissé en 220g/m² pour un tombé qui tient dans le temps.',
    accent: 'pink',
    icon: 'thread',
  },
  {
    step: '02',
    title: 'Sérigraphie',
    description:
      "Chaque print est sérigraphié à la main, encre après encre, dans un atelier en France — pas de transfert numérique.",
    accent: 'blue',
    icon: 'print',
  },
  {
    step: '03',
    title: 'Coupe & couture',
    description: 'Coupe et assemblage en petite série, avec des finitions renforcées aux coutures et au col.',
    accent: 'green',
    icon: 'scissors',
  },
  {
    step: '04',
    title: 'Contrôle qualité',
    description: 'Chaque pièce est vérifiée à la main avant expédition — print, coutures, tombé du tissu.',
    accent: 'amber',
    icon: 'check',
  },
]

const listRef = ref<HTMLElement | null>(null)
useScrollReveal(listRef, { stagger: 0.12, y: 30 })
</script>

<template>
  <section class="section-paper pb-24 md:pb-32">
    <div class="container-content">
      <div ref="listRef" class="border-t-2 border-ink/15">
        <article
          v-for="item in steps"
          :key="item.step"
          class="grid grid-cols-1 items-center gap-6 border-b-2 border-ink/15 py-10 md:grid-cols-[220px_72px_1fr] md:gap-10 md:py-14"
        >
          <span
            class="text-outline select-none font-display text-7xl font-bold leading-none sm:text-8xl md:text-9xl"
            :class="accentTextClass[item.accent]"
          >
            {{ item.step }}
          </span>

          <div
            class="hidden h-16 w-16 shrink-0 items-center justify-center rounded-card border-2 border-ink md:flex"
            :class="accentBgClass[item.accent]"
          >
            <svg viewBox="0 0 48 48" fill="none" class="h-8 w-8 text-ink" stroke="currentColor" stroke-width="3">
              <template v-if="item.icon === 'thread'">
                <circle cx="24" cy="24" r="14" />
                <path d="M12 18c8 4 16 4 24 0" />
                <path d="M12 30c8-4 16-4 24 0" />
              </template>
              <template v-else-if="item.icon === 'print'">
                <rect x="9" y="9" width="30" height="30" rx="2" stroke-linejoin="round" />
                <path d="M14 34l20-20" stroke-linecap="round" />
              </template>
              <template v-else-if="item.icon === 'scissors'">
                <circle cx="14" cy="14" r="5" />
                <circle cx="14" cy="34" r="5" />
                <path d="M18 17l22 22M18 31l22-22" stroke-linecap="round" />
              </template>
              <template v-else>
                <path
                  d="M24 6l16 7v11c0 10-6.5 17-16 19-9.5-2-16-9-16-19V13z"
                  stroke-linejoin="round"
                />
                <path d="M17 24l5 5 10-11" stroke-linecap="round" stroke-linejoin="round" />
              </template>
            </svg>
          </div>

          <div>
            <h2 class="font-display text-3xl font-bold uppercase leading-none sm:text-4xl">{{ item.title }}</h2>
            <p class="mt-3 max-w-lg text-sm leading-relaxed opacity-70 sm:text-base">{{ item.description }}</p>
          </div>
        </article>
      </div>

      <div class="mt-16 flex justify-center">
        <NuxtLink to="/collection" class="btn-outline-ink">Voir la collection</NuxtLink>
      </div>
    </div>
  </section>
</template>
