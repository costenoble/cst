<script setup lang="ts">
const { clearCart } = useCart()

onMounted(() => {
  clearCart()
})
</script>

<template>
  <section class="grain flex min-h-screen items-center justify-center px-4 pb-24 pt-40 text-center md:pt-48">
    <div class="container-content max-w-lg">
      <span class="tag mx-auto inline-block text-accent-lime">Commande confirmée</span>
      <h1 class="mt-6 font-display text-5xl font-bold uppercase leading-[0.95] md:text-6xl">Merci !</h1>
      <p class="mt-4 opacity-60">
        Votre paiement a bien été reçu. Un e-mail de confirmation va suivre — votre commande part
        en préparation.
      </p>
      <NuxtLink to="/" class="btn-primary mt-10 inline-flex">Retour à l'accueil</NuxtLink>
    </div>
  </section>
</template>
