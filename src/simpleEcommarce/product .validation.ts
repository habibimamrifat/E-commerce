import { z } from 'zod'

// Define Zod schema for TVariant
const variantSchema = z.object({
  type: z.string(),
  value: z.string(),
})

// Define Zod schema for TInventory
const inventorySchema = z.object({
  quantity: z.number().nonnegative(),
  inStock: z.boolean().default(true),
})

// Define Zod schema for TProduct
const productSchema = z.object({
  name: z.string().max(30),
  description: z.string().max(320),
  price: z.number().min(1),
  category: z.string(),
  tags: z.array(z.string()),
  variants: z.array(variantSchema).default([]),
  inventory: inventorySchema,
  isDeleted: z.boolean().default(false),
})

const orderValidationSchema = z.object({
  email: z.string().email('Invalid email format'),
  productId: z.string(),
  price: z.number().min(0, 'Price must be a non-negative number').nonnegative(),
  quantity: z.number().min(1, 'Quantity must be at least 1').int(),
})

export {productSchema,orderValidationSchema}
