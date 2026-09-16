export const sizes = ['S', 'M', 'L', 'XL'] as const
export type Size = (typeof sizes)[number]

export interface Product {
  slug: string
  name: string
  tagline: string
  /** Couleur accent Tailwind associée (voir tailwind.config.ts → colors.accent). */
  accent: 'pink' | 'lime' | 'blue' | 'green' | 'amber'
  priceCents: number
  shortDescription: string
  longDescription: string
  material: string
}

// Contenu de démonstration — à remplacer par vos propres designs.
export const products: Product[] = [
  {
    slug: 'riot',
    name: 'RIOT',
    tagline: 'Le print qui ne passe pas inaperçu',
    accent: 'pink',
    priceCents: 3900,
    shortDescription: 'Graphique bold en sérigraphie, coupe oversize.',
    longDescription:
      "RIOT, c'est le tee qu'on remarque avant même d'avoir dit un mot. Sérigraphie épaisse, coupe oversize assumée, un rose qui ne s'excuse jamais.",
    material: '100% coton bio 220g/m², sérigraphie française',
  },
  {
    slug: 'volt',
    name: 'VOLT',
    tagline: 'Une pièce qui décharge',
    accent: 'lime',
    priceCents: 3900,
    shortDescription: 'Coloris électrique, coupe droite classique.',
    longDescription:
      "VOLT prend le lime qu'on n'ose jamais porter et en fait une évidence. Coupe droite, tombé net, pensé pour être la pièce qui réveille le reste de la tenue.",
    material: '100% coton bio 220g/m², sérigraphie française',
  },
  {
    slug: 'storm',
    name: 'STORM',
    tagline: "L'orage avant l'éclaircie",
    accent: 'blue',
    priceCents: 3900,
    shortDescription: 'Bleu profond, coupe oversize, col renforcé.',
    longDescription:
      'STORM joue la carte du bleu profond et du col renforcé — une pièce qui tient dans le temps, pensée pour être portée bien après la première lessive.',
    material: '100% coton bio 220g/m², sérigraphie française',
  },
  {
    slug: 'feral',
    name: 'FERAL',
    tagline: 'Brut, sans filtre',
    accent: 'green',
    priceCents: 3900,
    shortDescription: 'Vert profond, coupe droite, print craquelé.',
    longDescription:
      "FERAL mise sur un print craquelé volontairement imparfait, sur un vert profond qui ne ressemble à aucun autre. Pensé pour ceux qui n'attendent pas la tendance suivante.",
    material: '100% coton bio 220g/m², sérigraphie française',
  },
  {
    slug: 'blaze',
    name: 'BLAZE',
    tagline: 'La chaleur en édition limitée',
    accent: 'amber',
    priceCents: 3900,
    shortDescription: 'Ambre chaud, coupe oversize, série limitée.',
    longDescription:
      "BLAZE referme la collection sur un ambre chaud, produit en série volontairement limitée. Une fois écoulé, ce coloris ne revient pas.",
    material: '100% coton bio 220g/m², sérigraphie française',
  },
]

// Mots défilant dans le bandeau marquee.
export const marqueeWords: string[] = [
  'COTON BIO',
  'SÉRIGRAPHIE FRANÇAISE',
  'ÉDITION LIMITÉE',
  'COUPE UNISEXE',
  'PETITES SÉRIES',
  '5 DESIGNS',
  'FABRIQUÉ EN FRANCE',
  'SANS COMPROMIS',
]

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug)
}

export function formatPrice(cents: number): string {
  return (cents / 100).toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })
}
