<script setup lang="ts">
import { motion } from 'motion-v'

const props = defineProps<{ open: boolean }>()
const emit = defineEmits<{ close: [] }>()

// Chaque lien reprend un accent de la gamme (même ordre que app/data/products.ts :
// pink, lime, blue, green, amber) pour que les 5 couleurs de marque infusent
// jusque dans la navigation, pas seulement les tee-shirts.
const links: { label: string; to: string; accent: 'pink' | 'lime' | 'blue' | 'green' | 'amber' }[] = [
  { label: 'Accueil', to: '/', accent: 'pink' },
  { label: 'Collection', to: '/collection', accent: 'lime' },
  { label: 'Fabrication', to: '/fabrication', accent: 'blue' },
  { label: 'Où nous trouver', to: '/points-de-vente', accent: 'green' },
  { label: 'Panier', to: '/panier', accent: 'amber' },
]

function close() {
  emit('close')
}

// Fermeture instantanée (pas de fondu) quand on clique un lien : la bulle de
// transition de page (voir app.vue) démarre au même instant, et si le menu
// mettait 150ms à s'estomper par-dessus, elle restait invisible tout ce
// temps-là. Le fondu normal reste pour une fermeture "manuelle" (Échap,
// ré-appui sur le hamburger).
const isNavigatingAway = ref(false)

function handleLinkClick() {
  isNavigatingAway.value = true
  close()
}

watch(
  () => props.open,
  (isOpen) => {
    if (isOpen) isNavigatingAway.value = false
    if (import.meta.client) {
      document.documentElement.style.overflow = isOpen ? 'hidden' : ''
    }
  },
)

function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') close()
}

onMounted(() => window.addEventListener('keydown', handleKeydown))
onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown)
  if (import.meta.client) document.documentElement.style.overflow = ''
})
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity duration-200 ease-out"
      enter-from-class="opacity-0"
      :leave-active-class="isNavigatingAway ? '' : 'transition-opacity duration-150 ease-in'"
      leave-to-class="opacity-0"
    >
      <div v-if="open" class="fixed inset-0 z-40 flex flex-col bg-ink">
        <!--
          overflow-y-auto : sur les petits écrans / avec le libellé le plus
          long ("Où nous trouver"), les 5 lignes peuvent dépasser la hauteur
          de la fenêtre — on scrolle dans le menu plutôt que de couper le bas
          (le dernier lien, "Panier", devenait invisible et inatteignable).
        -->
        <nav class="container-content flex-1 overflow-y-auto pb-6 pt-28">
          <motion.div
            v-for="(link, index) in links"
            :key="link.to"
            :initial="{ opacity: 0, y: 28 }"
            :animate="open ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }"
            :transition="{ duration: 0.5, delay: 0.07 * index, ease: 'easeOut' }"
          >
            <NuxtLink
              :to="link.to"
              class="group relative flex items-baseline gap-4 border-b-2 border-paper/15 py-5 transition-colors first:border-t-2 md:gap-8 md:py-6"
              @click="handleLinkClick"
            >
              <span
                class="font-display text-lg font-bold text-paper/25 transition-all duration-300 ease-out group-hover:scale-125"
                :class="accentGroupHoverTextClass[link.accent]"
              >
                0{{ index + 1 }}
              </span>
              <span
                class="font-display text-4xl font-bold uppercase leading-none tracking-tight text-paper transition-colors sm:text-5xl md:text-6xl"
                :class="accentGroupHoverTextClass[link.accent]"
              >
                {{ link.label }}
              </span>
            </NuxtLink>
          </motion.div>
        </nav>

        <p class="container-content shrink-0 pb-8 pt-4 text-xs font-semibold uppercase tracking-[0.2em] text-paper/40">
          5 designs. Zéro compromis.
        </p>
      </div>
    </Transition>
  </Teleport>
</template>
