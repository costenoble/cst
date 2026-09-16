<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    modelValue: number
    min?: number
    max?: number
  }>(),
  { min: 1, max: 99 },
)

const emit = defineEmits<{ 'update:modelValue': [value: number] }>()

function decrement() {
  emit('update:modelValue', Math.max(props.min, props.modelValue - 1))
}

function increment() {
  emit('update:modelValue', Math.min(props.max, props.modelValue + 1))
}
</script>

<template>
  <div class="inline-flex items-center gap-3 rounded-card border-2 border-current px-2 py-1.5">
    <button
      type="button"
      class="flex h-7 w-7 items-center justify-center text-lg font-bold leading-none transition-colors hover:bg-current/10 disabled:opacity-30"
      :disabled="modelValue <= min"
      aria-label="Diminuer la quantité"
      @click="decrement"
    >
      −
    </button>
    <span class="w-4 text-center text-sm font-bold tabular-nums">{{ modelValue }}</span>
    <button
      type="button"
      class="flex h-7 w-7 items-center justify-center text-lg font-bold leading-none transition-colors hover:bg-current/10 disabled:opacity-30"
      :disabled="modelValue >= max"
      aria-label="Augmenter la quantité"
      @click="increment"
    >
      +
    </button>
  </div>
</template>
