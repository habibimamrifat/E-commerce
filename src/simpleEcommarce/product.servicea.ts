import { TOrder, TProduct } from './product.Interface'
import { orderModel, productModel } from './product.Model'

const saveProductInTheDb = async (product: TProduct) => {
  const result = await productModel.create(product)
  return result
}

const getAllProduct = async () => {
  const result = await productModel.find()
  return result
}

const findSingleProduct = async (id: string) => {
  const result = await productModel.find({ _id: id})
  return result
}

const updateSingleProduct = async (id: string, update: any) => {
  const result = await productModel.findOneAndUpdate({ _id: id }, update, {
    new: true,
    upsert: true,
  })
  return result
}
const deleteSingleProduct = async (id: string) => {
  const result = await productModel.findOneAndUpdate(
    { _id: id },
    { isDeleted: true },
  )
  if (result) {
    return null
  } else {
    return result
  }
}
const searchAproductFromDb = async (tag: string) => {
  console.log('taaaggggg', tag)
  const result = await productModel.aggregate([
    { $unwind: '$tags' },
    { $match: { tags: tag } },
  ])
  return result
}

const createOrderInTheDb = async (
  product: TOrder,
  productId: string,
  quantity: number,
) => {
  const targetProduct = await productModel.findOne({ _id: productId })

  if (targetProduct) {
    const newQuantity = targetProduct.inventory.quantity - quantity

    if (newQuantity >= 0) {
      const updateQuantity = async (_id: string, quantity: number) => {
        const updatequantityAction = await productModel.updateOne(
          { _id: _id },
          { $set: { 'inventory.quantity': quantity } },
        )

        if (updatequantityAction.modifiedCount > 0) {
          return 'Quantity updated'
        } else {
          throw new Error(
            'Could not update quantity; document not found or quantity unchanged',
          )
        }
      }

      const createOrder = async (orderData: TOrder) => {
        const result = await orderModel.create(orderData)
        return result
      }

      const [quantityUpdate, newOrder] = await Promise.all([
        updateQuantity(productId, newQuantity),
        createOrder(product),
      ])

      return {
        message: quantityUpdate,
        order: newOrder,
      }
    } else {
      throw new Error('This product is out of stock')
    }
  } else {
    throw new Error('The product is not found')
  }
}
const searchAnOrderFromDb = async (email: string) => {
    const result = await orderModel.find({email:email})
    return result
  }
const getAllOrderFromDb = async () => {
   
    const result = await orderModel.find()
    return result
  }

export const productServices = {
  saveProductInTheDb,
  getAllProduct,
  findSingleProduct,
  updateSingleProduct,
  deleteSingleProduct,
  searchAproductFromDb,
  createOrderInTheDb,
  searchAnOrderFromDb,
  getAllOrderFromDb
}
