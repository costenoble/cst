<script setup lang="ts">
import { motion } from 'motion-v'
import { products } from '~/data/products'
</script>

<template>
  <section class="grain relative overflow-hidden pb-16 pt-40 md:pt-48">
    <!-- Décor plat façon poster : aplats de couleur, pas de flou -->
    <div class="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <span
        aria-hidden="true"
        class="absolute left-1/2 top-16 -translate-x-1/2 select-none whitespace-nowrap font-display text-[16rem] font-bold uppercase leading-none text-outline opacity-40 sm:text-[22rem] md:text-[28rem]"
      >
        CST
      </span>
      <div class="absolute -right-16 top-24 h-40 w-40 rotate-12 bg-accent-lime md:h-56 md:w-56" />
      <div class="absolute -left-10 bottom-16 h-28 w-28 -rotate-6 bg-accent-pink md:h-40 md:w-40" />
    </div>

    <div class="container-content text-center">
      <motion.p
        class="tag mx-auto mb-6 inline-block"
        :initial="{ opacity: 0, y: 12 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.6 }"
      >
        5 designs · coton bio · édition limitée
      </motion.p>

      <motion.h1
        class="mx-auto max-w-4xl text-balance font-display text-4xl font-bold uppercase leading-[0.92] tracking-tight min-[400px]:text-5xl sm:text-7xl md:text-8xl"
        :initial="{ opacity: 0, y: 24 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.7, delay: 0.1 }"
      >
        <BouncyText
          :segments="[{ text: 'Des tees qui ont ' }, { text: 'du caractère', class: 'text-accent-lime' }]"
        />
      </motion.h1>

      <motion.p
        class="mx-auto mt-6 max-w-xl text-balance text-base opacity-60 md:text-lg"
        :initial="{ opacity: 0, y: 16 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.7, delay: 0.2 }"
      >
        CST, ce sont cinq designs sérigraphiés à la main sur du coton bio — pensés pour durer,
        produits en petites séries.
      </motion.p>

      <motion.div
        class="mt-10 flex flex-wrap items-center justify-center gap-4"
        :initial="{ opacity: 0, y: 16 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.7, delay: 0.3 }"
      >
        <NuxtLink to="/collection" class="btn-primary">Voir la collection</NuxtLink>
        <NuxtLink to="/fabrication" class="btn-outline">Notre fabrication</NuxtLink>
      </motion.div>
    </div>

    <motion.div
      class="container-content mt-16 flex flex-wrap items-end justify-center gap-6 md:gap-10"
      :initial="{ opacity: 0, y: 40 }"
      :animate="{ opacity: 1, y: 0 }"
      :transition="{ duration: 0.8, delay: 0.4 }"
    >
      <div
        v-for="(product, i) in products"
        :key="product.slug"
        class="h-32 w-32 animate-float sm:h-40 sm:w-40"
        :style="{ animationDelay: `${i * 0.4}s` }"
      >
        <ProductPhoto :accent="product.accent" />
      </div>
    </motion.div>
  </section>
</template>
