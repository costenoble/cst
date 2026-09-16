import type { CartItem } from '~/composables/useCart'

const STORAGE_KEY = 'cst-cart'

// Client-only (suffixe .client.ts, même trick que dotlottie.client.ts) : le
// panier démarre vide côté serveur ET au premier rendu client pour éviter
// tout mismatch d'hydratation. La restauration depuis localStorage est
// repoussée après l'hydratation via `onNuxtReady` — sinon, sur une navigation
// complète avec un panier déjà rempli, le client afficherait le badge panier
// avant même que Vue ait fini de comparer son rendu à celui du serveur (qui,
// lui, ne connaît jamais le contenu de localStorage), d'où un mismatch.
export default defineNuxtPlugin(() => {
  const { items } = useCart()

  onNuxtReady(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw) as CartItem[]
        if (Array.isArray(parsed)) items.value = parsed
      }
    } catch {
      // localStorage indisponible ou contenu corrompu : on repart d'un panier vide.
    }

    watch(
      items,
      (value) => {
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(value))
        } catch {
          // Stockage plein ou bloqué (navigation privée) : le panier reste utilisable en mémoire.
        }
      },
      { deep: true },
    )
  })
})
