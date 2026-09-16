import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Enregistré une seule fois côté client (suffixe .client.ts) car GSAP
// et ScrollTrigger touchent le DOM et n'ont rien à faire pendant le SSR.
export default defineNuxtPlugin(() => {
  gsap.registerPlugin(ScrollTrigger)
})
