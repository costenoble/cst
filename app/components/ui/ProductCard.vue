<script setup lang="ts">
import { motion } from 'motion-v'
import { formatPrice, sizes, type Product } from '~/data/products'

const props = defineProps<{ product: Product }>()

const quantity = ref(1)
const selectedSize = ref<(typeof sizes)[number]>(sizes[1])
const justAdded = ref(false)
const { addItem } = useCart()

function handleAdd() {
  addItem(props.product.slug, selectedSize.value, quantity.value)
  quantity.value = 1
  justAdded.value = true
  setTimeout(() => {
    justAdded.value = false
  }, 1600)
}
</script>

<template>
  <motion.article
    class="card-block group flex scroll-mt-24 flex-col p-6 text-paper"
    :while-hover="{ y: -6 }"
    :transition="{ type: 'spring', stiffness: 300, damping: 20 }"
  >
    <div class="mx-auto h-48 w-48 transition-transform duration-500 group-hover:-translate-y-1">
      <ProductPhoto :accent="product.accent" />
    </div>

    <div class="mt-6 flex-1">
      <span class="tag" :class="accentTextClass[product.accent]">{{ product.tagline }}</span>
      <h3 class="mt-4 font-display text-2xl font-bold uppercase">{{ product.name }}</h3>
      <p class="mt-2 text-sm leading-relaxed opacity-60">{{ product.shortDescription }}</p>
    </div>

    <div class="mt-6 flex flex-wrap gap-2">
      <button
        v-for="size in sizes"
        :key="size"
        type="button"
        class="flex h-9 w-9 items-center justify-center rounded-card border-2 text-xs font-bold transition-colors"
        :class="selectedSize === size ? 'border-current bg-paper text-ink' : 'border-current/30 hover:border-current'"
        @click="selectedSize = size"
      >
        {{ size }}
      </button>
    </div>

    <div class="mt-6 flex items-center justify-between gap-3">
      <span class="font-display text-lg font-bold">{{ formatPrice(product.priceCents) }}</span>
      <QuantityStepper v-model="quantity" />
    </div>

    <button type="button" class="btn-primary mt-4 w-full" @click="handleAdd">
      {{ justAdded ? 'Ajouté ✓' : 'Ajouter au panier' }}
    </button>
  </motion.article>
</template>
