import { Schema, model } from 'mongoose'
import { TInventory, TOrder, TProduct, TVariant } from './product.Interface'

const variantSchema = new Schema<TVariant>({
  type: { type: String,required: true },
  value: { type: String,required: true },
})
const inventorySchema = new Schema<TInventory>({
  quantity: { type: Number,required: true },
  inStock: { type: Boolean, default: true },
})
const productSchema = new Schema<TProduct>({
  name: { type: String, max: 30, required: true },
  description: { type: String, max: 320, required: true },
  price: {
    type: Number,
    required: true,
    min: [1, 'Price must be at least 1'],
  },
  category: { type: String, required: true },
  tags: {
    type: [String],
    default: [],
    required:true
  },
  variants: {
    type: [variantSchema],
    default: [],
  },
  inventory: {type:inventorySchema, required:true},
  isDeleted:{type:Boolean, default:false}
})

const orderSchema = new Schema<TOrder>({
  email: {
    type: String,
    required: true,
    match: /.+\@.+\..+/
},
productId: {
    type: String,
    required: true
},
price: {
    type: Number,
    required: true,
    min: 0
},
quantity: {
    type: Number,
    required: true,
    min: 1 
}
})

export const productModel = model<TProduct>('Product', productSchema)
export const orderModel = model<TOrder>("Order", orderSchema)