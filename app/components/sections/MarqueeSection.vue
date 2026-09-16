<script setup lang="ts">
import { marqueeWords } from '~/data/products'

// On duplique la liste pour boucler la translation en continu (0% -> -50%).
const loopedTags = [...marqueeWords, ...marqueeWords]
</script>

<template>
  <div class="overflow-hidden border-y-2 border-paper/20 bg-ink-soft py-4">
    <div class="flex w-max animate-marquee gap-8">
      <span
        v-for="(tag, i) in loopedTags"
        :key="i"
        class="flex items-center gap-8 whitespace-nowrap font-display text-sm font-bold uppercase tracking-wide text-paper/50"
      >
        {{ tag }}
        <span class="h-2 w-2 bg-accent-lime" />
      </span>
    </div>
  </div>
</template>
