import gsap from 'gsap'
import type { Ref } from 'vue'

export interface ScrollRevealOptions {
  /** Décalage vertical de départ, en pixels. */
  y?: number
  /** Durée de l'animation, en secondes. */
  duration?: number
  /** Délai avant le départ, en secondes. */
  delay?: number
  /**
   * Décalage entre chaque enfant direct de la cible.
   * Si défini, l'animation porte sur `el.children` plutôt que sur `el`.
   */
  stagger?: number
  /** Position de déclenchement du ScrollTrigger (voir docs GSAP). */
  start?: string
}

/**
 * Anime l'apparition d'un élément (ou de ses enfants) lorsqu'il entre dans le
 * viewport, façon "reveal" utilisé sur la plupart des sites vitrine créatifs.
 *
 * Usage :
 *   const sectionRef = ref<HTMLElement | null>(null)
 *   useScrollReveal(sectionRef, { stagger: 0.08 })
 */
export function useScrollReveal(
  target: Ref<HTMLElement | null>,
  options: ScrollRevealOptions = {},
) {
  onMounted(() => {
    const el = target.value
    if (!el) return

    const animatedTargets = options.stagger ? Array.from(el.children) : el

    const ctx = gsap.context(() => {
      gsap.from(animatedTargets, {
        y: options.y ?? 40,
        opacity: 0,
        duration: options.duration ?? 0.9,
        delay: options.delay ?? 0,
        stagger: options.stagger,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: options.start ?? 'top 85%',
          once: true,
        },
      })
    }, el)

    onBeforeUnmount(() => ctx.revert())
  })
}
