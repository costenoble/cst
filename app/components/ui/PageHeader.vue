<script setup lang="ts">
defineProps<{
  kicker: string
  title: string
  description?: string
}>()
</script>

<template>
  <div class="container-content pb-16 pt-40 md:pt-48">
    <span class="tag mb-6 inline-block text-accent-lime">{{ kicker }}</span>
    <h1 class="max-w-3xl text-balance font-display text-5xl font-bold uppercase leading-[0.95] tracking-tight sm:text-6xl md:text-7xl">
      <BouncyText :text="title" />
    </h1>
    <p v-if="description" class="mt-6 max-w-lg text-balance text-base opacity-60 md:text-lg">
      {{ description }}
    </p>
  </div>
</template>
