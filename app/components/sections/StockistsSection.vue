<script setup lang="ts">
interface Category {
  title: string
  names: string[]
}

const categories: Category[] = [
  { title: 'Concept stores', names: ['La Trouvaille', 'Épicerie Fields', 'Comptoir Vert', 'Le Local'] },
  { title: 'Cafés & restaurants', names: ['Ground Store', 'Bureau', 'La Buvette', 'Ground Control'] },
  { title: 'En ligne', names: ['Boutique CST', 'Frenchy Market', 'Wave Store'] },
]

type Accent = 'pink' | 'lime' | 'blue' | 'green' | 'amber'

// Alternance sur les 5 couleurs de la marque, ligne par ligne (et non par
// catégorie), pour que le hover varie d'une enseigne à l'autre.
const ACCENT_CYCLE: Accent[] = ['pink', 'lime', 'blue', 'green', 'amber']

interface Row {
  name: string
  category: string
  accent: Accent
}

const rows = computed<Row[]>(() =>
  categories
    .flatMap((category) => category.names.map((name) => ({ name, category: category.title })))
    .map((row, index) => ({ ...row, accent: ACCENT_CYCLE[index % ACCENT_CYCLE.length] })),
)
</script>

<template>
  <section class="pb-24 md:pb-32">
    <div class="container-content">
      <div class="border-t-2 border-paper/15">
        <div
          v-for="(row, index) in rows"
          :key="row.name"
          class="group -mx-4 flex items-baseline gap-4 overflow-hidden border-b-2 border-paper/15 px-4 py-6 transition-colors duration-150 md:gap-8"
          :class="accentHoverBgClass[row.accent]"
        >
          <span
            class="font-display text-sm font-bold opacity-30 transition-all duration-300 group-hover:translate-x-2 group-hover:text-ink group-hover:opacity-60 md:text-base"
            >{{ String(index + 1).padStart(2, '0') }}</span
          >

          <div class="flex-1 transition-transform duration-300 ease-out group-hover:translate-x-4 md:group-hover:translate-x-10">
            <span
              class="block font-display text-3xl font-bold uppercase leading-none tracking-tight transition-colors group-hover:text-ink sm:text-4xl md:text-5xl"
            >
              {{ row.name }}
            </span>
            <span
              class="mt-2 block text-xs font-bold uppercase tracking-[0.14em] opacity-40 transition-colors group-hover:text-ink group-hover:opacity-60"
            >
              {{ row.category }}
            </span>
          </div>
        </div>
      </div>

      <div class="mt-16 flex justify-center">
        <a href="/#newsletter" class="btn-outline">Devenir revendeur</a>
      </div>
    </div>
  </section>
</template>
