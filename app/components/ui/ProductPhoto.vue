<script setup lang="ts">
import type { Product } from '~/data/products'

defineProps<{
  accent: Product['accent']
}>()

// Vraie photo produit (un tee-shirt blanc, packshot Unsplash, détouré —
// public/products/shirt-cutout.png, fond rendu transparent) plutôt qu'une
// illustration. Recoloré par accent en deux calques :
// 1. un aplat de couleur, masqué par la silhouette du détourage (mask-image)
//    pour ne colorer QUE le tee-shirt, jamais le fond ;
// 2. la photo elle-même par-dessus, en mix-blend-mode: multiply — le blanc
//    du tissu laisse la couleur en pleine saturation, les plis/ombres
//    l'assombrissent légèrement, ce qui donne le relief du vrai tissu.
// Les deux calques utilisent le même alignement "contain" (mask-size /
// object-fit) donc ça reste juste quel que soit le ratio du conteneur.
const ACCENT_COLORS: Record<Product['accent'], string> = {
  pink: '#FF3EBA',
  lime: '#CEFF00',
  blue: '#4A60FF',
  green: '#31A362',
  amber: '#FFB43D',
}

const CUTOUT_URL = '/products/shirt-cutout.png'
</script>

<template>
  <div class="relative h-full w-full overflow-hidden rounded-card border-2 border-ink bg-white">
    <div
      class="absolute inset-0"
      :style="{
        backgroundColor: ACCENT_COLORS[accent],
        maskImage: `url(${CUTOUT_URL})`,
        maskSize: 'contain',
        maskPosition: 'center',
        maskRepeat: 'no-repeat',
        WebkitMaskImage: `url(${CUTOUT_URL})`,
        WebkitMaskSize: 'contain',
        WebkitMaskPosition: 'center',
        WebkitMaskRepeat: 'no-repeat',
      }"
    />
    <img
      :src="CUTOUT_URL"
      alt=""
      class="absolute inset-0 h-full w-full object-contain"
      style="mix-blend-mode: multiply"
    />
  </div>
</template>
