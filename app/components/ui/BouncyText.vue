<script setup lang="ts">
interface Segment {
  text: string
  class?: string
}

// Deux façons de l'utiliser : `text="La collection"` pour un titre uni, ou
// `segments="[...]"` quand une partie du titre a sa propre classe (ex. le
// "du caractère" en accent-lime du hero).
const props = withDefaults(defineProps<{ text?: string; segments?: Segment[] }>(), {
  text: undefined,
  segments: undefined,
})

const resolvedSegments = computed<Segment[]>(() => props.segments ?? [{ text: props.text ?? '' }])
const fullText = computed(() => resolvedSegments.value.map((segment) => segment.text).join(''))

// Chaque mot est regroupé dans un même bloc (voir le template) plutôt que de
// laisser chaque lettre livrée à elle-même : sinon le retour à la ligne du
// navigateur peut couper au milieu d'un mot (ex. "ONT" → "ON" + "T" tout
// seul sur la ligne suivante), puisque chaque lettre est un <span> distinct.
type Token = { type: 'word'; chars: string[]; class?: string } | { type: 'space' }

const tokens = computed<Token[]>(() => {
  const result: Token[] = []
  resolvedSegments.value.forEach((segment) => {
    const words = segment.text.split(' ')
    words.forEach((word, index) => {
      if (word.length > 0) {
        result.push({ type: 'word', chars: word.split(''), class: segment.class })
      }
      if (index < words.length - 1) {
        result.push({ type: 'space' })
      }
    })
  })
  return result
})
</script>

<template>
  <span :aria-label="fullText" role="text">
    <span aria-hidden="true">
      <template v-for="(token, index) in tokens" :key="index">
        <span v-if="token.type === 'word'" class="inline-block whitespace-nowrap" :class="token.class">
          <span v-for="(char, cIndex) in token.chars" :key="cIndex" class="bouncy-letter inline-block">{{
            char
          }}</span>
        </span>
        <template v-else>{{ ' ' }}</template>
      </template>
    </span>
  </span>
</template>
