'use server'

import { stripe } from '@/lib/stripe'
import { products } from '@/data/products'

export interface CartItemForCheckout {
  productId: string
  quantity: number
  selectedSize?: string
  selectedColor?: string
}

export async function startCheckoutSession(cartItems: CartItemForCheckout[]) {
  if (!cartItems || cartItems.length === 0) {
    throw new Error('Cart is empty')
  }

  // Build line items from cart, validating prices server-side
  const lineItems = cartItems.map((cartItem) => {
    const product = products.find((p) => p.id === cartItem.productId)
    if (!product) {
      throw new Error(`Product with id "${cartItem.productId}" not found`)
    }

    // Build product name with options
    let productName = product.name
    const options: string[] = []
    if (cartItem.selectedSize) options.push(`Size: ${cartItem.selectedSize}`)
    if (cartItem.selectedColor) options.push(`Color: ${cartItem.selectedColor}`)
    if (options.length > 0) {
      productName = `${product.name} (${options.join(', ')})`
    }

    return {
      price_data: {
        currency: 'kes',
        product_data: {
          name: productName,
          description: product.description.substring(0, 500),
        },
        unit_amount: product.price, // Already in cents/smallest unit
      },
      quantity: cartItem.quantity,
    }
  })

  // Calculate if shipping is needed
  const hasPhysicalItems = cartItems.some((item) => {
    const product = products.find((p) => p.id === item.productId)
    return product?.type === 'physical'
  })

  const subtotal = cartItems.reduce((sum, item) => {
    const product = products.find((p) => p.id === item.productId)
    return sum + (product?.price || 0) * item.quantity
  }, 0)

  // Add shipping if needed (500 KES for orders under 5000 KES)
  if (hasPhysicalItems && subtotal < 5000) {
    lineItems.push({
      price_data: {
        currency: 'kes',
        product_data: {
          name: 'Shipping',
          description: 'Standard shipping within Kenya',
        },
        unit_amount: 500,
      },
      quantity: 1,
    })
  }

  // Create Checkout Session with embedded UI mode
  const session = await stripe.checkout.sessions.create({
    ui_mode: 'embedded',
    redirect_on_completion: 'never',
    line_items: lineItems,
    mode: 'payment',
  })

  return session.client_secret
}

export async function getCheckoutSession(sessionId: string) {
  const session = await stripe.checkout.sessions.retrieve(sessionId)
  return {
    status: session.status,
    customerEmail: session.customer_details?.email,
  }
}
