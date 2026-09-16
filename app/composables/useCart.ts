import { getProductBySlug, type Product } from '~/data/products'

export interface CartItem {
  slug: string
  size: string
  quantity: number
}

export interface CartLine extends CartItem {
  product: Product
  lineTotalCents: number
}

function isSameLine(item: CartItem, slug: string, size: string) {
  return item.slug === slug && item.size === size
}

/**
 * Panier partagé entre toutes les pages/composants via `useState` (état Nuxt
 * réutilisable côté SSR comme côté client, sans dépendance externe type Pinia).
 * Une ligne de panier est identifiée par la paire (slug, taille) : le même
 * produit dans deux tailles différentes fait deux lignes distinctes.
 * La persistance entre rechargements est gérée par le plugin
 * `plugins/cart-persistence.client.ts`, qui lit/écrit ce même état dans
 * `localStorage` uniquement côté client.
 */
export function useCart() {
  const items = useState<CartItem[]>('cart-items', () => [])

  function addItem(slug: string, size: string, quantity = 1) {
    const existing = items.value.find((item) => isSameLine(item, slug, size))
    if (existing) {
      existing.quantity += quantity
    } else {
      items.value.push({ slug, size, quantity })
    }
  }

  function removeItem(slug: string, size: string) {
    items.value = items.value.filter((item) => !isSameLine(item, slug, size))
  }

  function updateQuantity(slug: string, size: string, quantity: number) {
    if (quantity <= 0) {
      removeItem(slug, size)
      return
    }
    const existing = items.value.find((item) => isSameLine(item, slug, size))
    if (existing) existing.quantity = quantity
  }

  function clearCart() {
    items.value = []
  }

  const lines = computed<CartLine[]>(() =>
    items.value.flatMap((item) => {
      const product = getProductBySlug(item.slug)
      if (!product) return []
      return [{ ...item, product, lineTotalCents: product.priceCents * item.quantity }]
    }),
  )

  const itemCount = computed(() => items.value.reduce((sum, item) => sum + item.quantity, 0))
  const subtotalCents = computed(() => lines.value.reduce((sum, line) => sum + line.lineTotalCents, 0))

  return { items, lines, itemCount, subtotalCents, addItem, removeItem, updateQuantity, clearCart }
}
