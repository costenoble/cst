import type { Product } from '~/data/products'

// Classes Tailwind écrites en toutes lettres (et non construites dynamiquement
// via template literal) pour que le scanner JIT de Tailwind les détecte dans
// le code source et génère bien le CSS correspondant.
export const accentTextClass: Record<Product['accent'], string> = {
  pink: 'text-accent-pink',
  lime: 'text-accent-lime',
  blue: 'text-accent-blue',
  green: 'text-accent-green',
  amber: 'text-accent-amber',
}

export const accentBgClass: Record<Product['accent'], string> = {
  pink: 'bg-accent-pink',
  lime: 'bg-accent-lime',
  blue: 'bg-accent-blue',
  green: 'bg-accent-green',
  amber: 'bg-accent-amber',
}

export const accentGroupHoverTextClass: Record<Product['accent'], string> = {
  pink: 'group-hover:text-accent-pink',
  lime: 'group-hover:text-accent-lime',
  blue: 'group-hover:text-accent-blue',
  green: 'group-hover:text-accent-green',
  amber: 'group-hover:text-accent-amber',
}

export const accentHoverBgClass: Record<Product['accent'], string> = {
  pink: 'hover:bg-accent-pink',
  lime: 'hover:bg-accent-lime',
  blue: 'hover:bg-accent-blue',
  green: 'hover:bg-accent-green',
  amber: 'hover:bg-accent-amber',
}
