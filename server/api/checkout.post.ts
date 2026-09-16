import Stripe from 'stripe'
import { products, sizes } from '../../app/data/products'

interface CheckoutRequestItem {
  slug: string
  size: string
  quantity: number
}

interface ShippingInfo {
  fullName: string
  email: string
  address: string
  postalCode: string
  city: string
  country: string
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function isValidShipping(shipping: unknown): shipping is ShippingInfo {
  if (!shipping || typeof shipping !== 'object') return false
  const candidate = shipping as Record<string, unknown>
  const requiredFields: (keyof ShippingInfo)[] = ['fullName', 'email', 'address', 'postalCode', 'city', 'country']
  const hasAllFields = requiredFields.every(
    (field) => typeof candidate[field] === 'string' && (candidate[field] as string).trim().length > 0,
  )
  return hasAllFields && EMAIL_PATTERN.test((candidate.email as string).trim())
}

export default defineEventHandler(async (event) => {
  const body = await readBody<{ items?: CheckoutRequestItem[]; shipping?: unknown }>(event)
  const requestedItems = body?.items ?? []

  if (requestedItems.length === 0) {
    throw createError({ statusCode: 400, statusMessage: 'Le panier est vide.' })
  }

  if (!isValidShipping(body?.shipping)) {
    throw createError({ statusCode: 400, statusMessage: 'Adresse de livraison incomplète ou invalide.' })
  }

  const shipping = body.shipping

  const config = useRuntimeConfig()

  if (!config.stripeSecretKey) {
    throw createError({
      statusCode: 500,
      statusMessage:
        "Paiement non configuré : ajoutez NUXT_STRIPE_SECRET_KEY dans votre .env (voir .env.example).",
    })
  }

  const stripe = new Stripe(config.stripeSecretKey)

  // On ne fait jamais confiance aux quantités/prix envoyés par le client : on
  // ne garde que slug + taille, et on recalcule nom + prix depuis app/data/products.ts.
  const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = requestedItems.flatMap((item) => {
    const product = products.find((candidate) => candidate.slug === item.slug)
    const size = sizes.find((candidate) => candidate === item.size)
    const quantity = Math.floor(item.quantity)
    if (!product || !size || !Number.isFinite(quantity) || quantity <= 0) return []

    return [
      {
        quantity,
        price_data: {
          currency: 'eur',
          unit_amount: product.priceCents,
          product_data: {
            name: `CST — ${product.name} (Taille ${size})`,
            description: product.shortDescription,
          },
        },
      },
    ]
  })

  if (lineItems.length === 0) {
    throw createError({ statusCode: 400, statusMessage: 'Aucun article valide dans le panier.' })
  }

  const siteUrl = config.public.siteUrl

  // L'adresse est collectée sur /panier plutôt que sur la page Stripe elle-même
  // (voir la section "Ton adresse") : on l'attache en metadata de la session
  // (visible dans le dashboard Stripe) et on préremplit l'e-mail du reçu.
  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: lineItems,
    customer_email: shipping.email,
    metadata: {
      shipping_name: shipping.fullName,
      shipping_address: shipping.address,
      shipping_postal_code: shipping.postalCode,
      shipping_city: shipping.city,
      shipping_country: shipping.country,
    },
    success_url: `${siteUrl}/commande/succes?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${siteUrl}/commande/annulee`,
  })

  if (!session.url) {
    throw createError({ statusCode: 500, statusMessage: "Stripe n'a pas renvoyé de lien de paiement." })
  }

  return { url: session.url }
})
