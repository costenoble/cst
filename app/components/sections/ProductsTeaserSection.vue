<script setup lang="ts">
import { products } from '~/data/products'
</script>

<template>
  <section class="py-24 md:py-32">
    <div class="container-content">
      <div class="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <h2 class="font-display text-4xl font-bold uppercase leading-[0.95] tracking-tight md:text-5xl">
          5 designs.<br />
          0 compromis.
        </h2>
        <NuxtLink to="/collection" class="btn-outline w-fit">Voir toute la collection</NuxtLink>
      </div>

      <div class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
        <NuxtLink
          v-for="product in products"
          :key="product.slug"
          :to="`/collection#${product.slug}`"
          class="card-block group flex flex-col items-center gap-4 p-4 text-paper"
        >
          <div class="h-28 w-28 transition-transform duration-300 group-hover:-translate-y-1">
            <ProductPhoto :accent="product.accent" />
          </div>
          <span class="font-display text-sm font-bold uppercase">{{ product.name }}</span>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
