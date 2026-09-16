<template>
  <section class="flex min-h-screen items-center justify-center px-4 pb-24 pt-40 text-center md:pt-48">
    <div class="container-content max-w-lg">
      <span class="tag mx-auto inline-block opacity-60">Paiement annulé</span>
      <h1 class="mt-6 font-display text-5xl font-bold uppercase leading-[0.95] md:text-6xl">
        Pas de souci
      </h1>
      <p class="mt-4 opacity-60">
        Votre commande n'a pas été validée et votre panier est toujours là, tel que vous
        l'aviez laissé.
      </p>
      <NuxtLink to="/panier" class="btn-primary mt-10 inline-flex">Revenir à mon panier</NuxtLink>
    </div>
  </section>
</template>
