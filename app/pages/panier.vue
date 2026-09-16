<script setup lang="ts">
import { formatPrice } from '~/data/products'

const { lines, itemCount, subtotalCents, updateQuantity, removeItem, items } = useCart()

const shipping = reactive({
  fullName: '',
  email: '',
  address: '',
  postalCode: '',
  city: '',
  country: 'France',
})

const isCheckingOut = ref(false)
const checkoutError = ref('')

async function handleCheckout() {
  checkoutError.value = ''
  isCheckingOut.value = true
  try {
    const { url } = await $fetch<{ url: string }>('/api/checkout', {
      method: 'POST',
      body: { items: items.value, shipping },
    })
    await navigateTo(url, { external: true })
  } catch {
    checkoutError.value =
      "Impossible de lancer le paiement pour le moment. Vérifiez que la clé Stripe est bien configurée côté serveur."
  } finally {
    isCheckingOut.value = false
  }
}
</script>

<template>
  <div class="min-h-screen">
    <PageHeader kicker="Étape finale" title="Votre panier" />

    <div class="container-content pb-24">
      <div v-if="lines.length === 0" class="card-block p-12 text-center text-paper">
        <p class="opacity-60">Votre panier est vide pour l'instant.</p>
        <NuxtLink to="/collection" class="btn-primary mt-6 inline-flex">Voir la collection</NuxtLink>
      </div>

      <form v-else class="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_360px]" @submit.prevent="handleCheckout">
        <div class="flex flex-col gap-10">
          <ul class="flex flex-col gap-4">
            <li
              v-for="line in lines"
              :key="`${line.slug}-${line.size}`"
              class="card-block grid grid-cols-[auto_1fr] gap-4 p-4 text-paper sm:gap-6 sm:p-5"
            >
              <div class="h-24 w-24 shrink-0">
                <ProductPhoto :accent="line.product.accent" />
              </div>

              <div class="flex min-w-0 flex-col">
                <div class="flex items-start justify-between gap-3">
                  <h2 class="font-display text-lg font-bold uppercase">{{ line.product.name }}</h2>
                  <span class="shrink-0 font-display text-base font-bold">{{ formatPrice(line.lineTotalCents) }}</span>
                </div>
                <p class="mt-1 text-sm opacity-50">
                  Taille {{ line.size }} · {{ formatPrice(line.product.priceCents) }} / unité
                </p>

                <div class="mt-auto flex items-center justify-between pt-3">
                  <button
                    type="button"
                    class="text-xs font-bold uppercase tracking-wide opacity-40 underline-offset-2 hover:opacity-80 hover:underline"
                    @click="removeItem(line.slug, line.size)"
                  >
                    Retirer
                  </button>
                  <QuantityStepper
                    :model-value="line.quantity"
                    @update:model-value="(value) => updateQuantity(line.slug, line.size, value)"
                  />
                </div>
              </div>
            </li>
          </ul>

          <div class="card-block p-6 text-paper">
            <h2 class="font-display text-xl font-bold uppercase">Ton adresse</h2>

            <div class="mt-6 flex flex-col gap-4">
              <label class="flex flex-col gap-1.5 text-xs font-bold uppercase tracking-wide opacity-60">
                Nom complet
                <input v-model="shipping.fullName" type="text" required class="input" placeholder="Jeanne Dupont" />
              </label>

              <label class="flex flex-col gap-1.5 text-xs font-bold uppercase tracking-wide opacity-60">
                E-mail
                <input v-model="shipping.email" type="email" required class="input" placeholder="vous@exemple.com" />
              </label>

              <label class="flex flex-col gap-1.5 text-xs font-bold uppercase tracking-wide opacity-60">
                Adresse
                <input
                  v-model="shipping.address"
                  type="text"
                  required
                  class="input"
                  placeholder="12 rue des Fleurs"
                />
              </label>

              <div class="grid grid-cols-2 gap-3">
                <label class="flex flex-col gap-1.5 text-xs font-bold uppercase tracking-wide opacity-60">
                  Code postal
                  <input v-model="shipping.postalCode" type="text" required class="input" placeholder="75011" />
                </label>
                <label class="flex flex-col gap-1.5 text-xs font-bold uppercase tracking-wide opacity-60">
                  Ville
                  <input v-model="shipping.city" type="text" required class="input" placeholder="Paris" />
                </label>
              </div>

              <label class="flex flex-col gap-1.5 text-xs font-bold uppercase tracking-wide opacity-60">
                Pays
                <input v-model="shipping.country" type="text" required class="input" />
              </label>
            </div>
          </div>
        </div>

        <aside class="card-block h-fit p-6 text-paper">
          <h2 class="font-display text-xl font-bold uppercase">Récapitulatif</h2>

          <div class="mt-6 flex items-center justify-between text-sm opacity-60">
            <span>{{ itemCount }} article{{ itemCount > 1 ? 's' : '' }}</span>
            <span>{{ formatPrice(subtotalCents) }}</span>
          </div>

          <div class="mt-4 flex items-center justify-between border-t-2 border-current/20 pt-4 font-display text-lg font-bold">
            <span>Total</span>
            <span>{{ formatPrice(subtotalCents) }}</span>
          </div>

          <button type="submit" class="btn-primary mt-6 w-full disabled:opacity-60" :disabled="isCheckingOut">
            {{ isCheckingOut ? 'Redirection…' : 'Passer la commande' }}
          </button>

          <p v-if="checkoutError" class="mt-4 text-sm text-accent-pink">{{ checkoutError }}</p>

          <p class="mt-4 text-xs opacity-40">
            Paiement sécurisé via Stripe. Livraison calculée à l'étape suivante.
          </p>
        </aside>
      </form>
    </div>
  </div>
</template>
