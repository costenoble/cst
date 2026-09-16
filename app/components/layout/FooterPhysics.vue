<script setup lang="ts">
import type { Product } from '~/data/products'

interface Shape {
  id: number
  kind: 'circle' | 'square'
  size: number
  accent: Product['accent']
  startXPercent: number
  startRotationDeg: number
}

const ACCENTS: Product['accent'][] = ['pink', 'lime', 'blue', 'green', 'amber']

// Tailles/positions/rotations dérivées de l'index (pas de Math.random) pour un
// rendu déterministe, même si le composant n'est de toute façon monté que
// côté client (ClientOnly dans TheFooter.vue).
const shapes: Shape[] = Array.from({ length: 14 }, (_, i) => ({
  id: i,
  kind: i % 3 === 0 ? 'square' : 'circle',
  size: 42 + ((i * 37) % 64),
  accent: ACCENTS[i % ACCENTS.length]!,
  startXPercent: (i * 71) % 100,
  startRotationDeg: (i * 53) % 360,
}))

const containerRef = ref<HTMLElement | null>(null)
const shapeEls: (HTMLElement | null)[] = []

function setShapeRef(el: Element | null, index: number) {
  shapeEls[index] = el instanceof HTMLElement ? el : null
}

let cleanup: (() => void) | null = null

onMounted(async () => {
  const container = containerRef.value
  if (!container) return

  const Matter = await import('matter-js')
  const { Engine, World, Bodies, Runner, Mouse, MouseConstraint, Events } = Matter

  const width = container.clientWidth
  const height = container.clientHeight

  const engine = Engine.create()
  engine.gravity.y = 1

  const wallOptions = { isStatic: true, restitution: 0.4, friction: 0.5 }
  const ground = Bodies.rectangle(width / 2, height + 30, width * 2, 60, wallOptions)
  const leftWall = Bodies.rectangle(-30, height / 2, 60, height * 2, wallOptions)
  const rightWall = Bodies.rectangle(width + 30, height / 2, 60, height * 2, wallOptions)

  const bodies = shapes.map((shape) => {
    const x = (shape.startXPercent / 100) * width
    const y = -160 - shape.id * 70
    const options = {
      restitution: 0.5,
      friction: 0.35,
      frictionAir: 0.008,
      angle: (shape.startRotationDeg * Math.PI) / 180,
    }
    return shape.kind === 'circle'
      ? Bodies.circle(x, y, shape.size / 2, options)
      : Bodies.rectangle(x, y, shape.size, shape.size, options)
  })

  World.add(engine.world, [ground, leftWall, rightWall, ...bodies])

  const mouse = Mouse.create(container)
  mouse.pixelRatio = window.devicePixelRatio || 1
  const mouseConstraint = MouseConstraint.create(engine, {
    mouse,
    constraint: { stiffness: 0.25, damping: 0.15, render: { visible: false } },
  })
  World.add(engine.world, mouseConstraint)

  // Empêche Matter de capter la molette (sinon le scroll de la page se
  // bloque dès que le curseur survole la zone des formes).
  mouse.element.removeEventListener('mousewheel', mouse.mousewheel)
  mouse.element.removeEventListener('DOMMouseScroll', mouse.mousewheel)
  mouse.element.removeEventListener('wheel', mouse.mousewheel)

  function syncDom() {
    bodies.forEach((body, i) => {
      const el = shapeEls[i]
      const shape = shapes[i]!
      if (!el) return
      const half = shape.size / 2
      el.style.transform = `translate(${body.position.x - half}px, ${body.position.y - half}px) rotate(${body.angle}rad)`
    })
  }
  syncDom()

  const runner = Runner.create()
  let running = false

  function start() {
    if (running) return
    running = true
    Runner.run(runner, engine)
  }
  function stop() {
    if (!running) return
    running = false
    Runner.stop(runner)
  }

  Events.on(engine, 'afterUpdate', syncDom)

  let hasEnteredOnce = false
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (!entry) return
      if (entry.isIntersecting) {
        hasEnteredOnce = true
        start()
      } else if (hasEnteredOnce) {
        stop()
      }
    },
    { threshold: 0.15 },
  )
  observer.observe(container)

  cleanup = () => {
    observer.disconnect()
    stop()
    Events.off(engine, 'afterUpdate', syncDom)
    World.clear(engine.world, false)
    Engine.clear(engine)
  }
})

onBeforeUnmount(() => cleanup?.())
</script>

<template>
  <div
    ref="containerRef"
    class="relative h-72 overflow-hidden border-b-2 border-paper/15 bg-ink sm:h-80 md:h-96"
  >
    <p
      class="pointer-events-none absolute left-4 top-4 z-10 text-[10px] font-bold uppercase tracking-[0.2em] text-paper/30 sm:left-6 sm:top-6"
    >
      Glisse-les
    </p>

    <div
      v-for="(shape, i) in shapes"
      :key="shape.id"
      :ref="(el) => setShapeRef(el, i)"
      class="absolute left-0 top-0 cursor-grab touch-none border-2 border-ink shadow-[3px_3px_0_0_rgba(0,0,0,0.35)] will-change-transform active:cursor-grabbing"
      :class="[accentBgClass[shape.accent], shape.kind === 'circle' ? 'rounded-full' : 'rounded-none']"
      :style="{ width: `${shape.size}px`, height: `${shape.size}px` }"
    />
  </div>
</template>
