<script setup lang="ts">
const email = ref('')
const status = ref<'idle' | 'success'>('idle')

function handleSubmit() {
  if (!email.value) return
  // Démo front-only : à brancher sur votre provider (Resend, Brevo, Supabase...).
  status.value = 'success'
}
</script>

<template>
  <section id="newsletter" class="px-4 pb-24">
    <div class="container-content">
      <div class="grain relative overflow-hidden rounded-card border-2 border-ink bg-accent-lime px-8 py-16 text-center text-ink shadow-[8px_8px_0_0_#141414] md:py-24">
        <h2 class="mx-auto max-w-2xl text-balance font-display text-4xl font-bold uppercase leading-[0.95] md:text-6xl">
          Le prochain drop arrive bientôt
        </h2>
        <p class="mx-auto mt-4 max-w-md text-sm text-ink/70 md:text-base">
          Inscrivez-vous pour être prévenu·e des prochains drops CST et des offres en avant-première.
        </p>

        <form
          class="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
          @submit.prevent="handleSubmit"
        >
          <input
            v-model="email"
            type="email"
            required
            placeholder="vous@exemple.com"
            class="flex-1 rounded-card border-2 border-ink bg-white px-5 py-3 text-sm text-ink placeholder:text-ink/40 focus:outline-none focus:ring-2 focus:ring-ink/30"
          />
          <button type="submit" class="btn-outline-ink bg-ink text-paper">
            S'inscrire
          </button>
        </form>

        <p v-if="status === 'success'" class="mt-4 text-sm font-bold text-ink/80">
          Merci ! Vous recevrez bientôt de nos nouvelles.
        </p>

        <p class="mx-auto mt-6 max-w-md text-xs text-ink/50">
          En vous inscrivant, vous acceptez de recevoir nos actualités, conformément à notre
          politique de confidentialité.
        </p>
      </div>
    </div>
  </section>
</template>
