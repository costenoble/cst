<script setup lang="ts">
import { products } from '~/data/products'

const gridRef = ref<HTMLElement | null>(null)
useScrollReveal(gridRef, { stagger: 0.08, y: 30 })
</script>

<template>
  <section class="pb-24 md:pb-32">
    <div class="container-content">
      <div ref="gridRef" class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <ProductCard v-for="product in products" :id="product.slug" :key="product.slug" :product="product" />
      </div>
    </div>
  </section>
</template>
