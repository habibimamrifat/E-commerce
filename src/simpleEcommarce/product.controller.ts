import { Request, Response } from 'express'
import {productSchema,orderValidationSchema} from './product .validation'
import { productServices } from './product.servicea'

const createNewproductInDb = async (req: Request, res: Response) => {
  const product = req.body

  try {
    const validatedProductByZod = productSchema.parse(product)
    const result = await productServices.saveProductInTheDb(
      validatedProductByZod,
    )

    res.status(200).json({
      success: true,
      message: 'prodact created successfully',
      body: result,
    })
  } catch (err: any) {
    res.status(500).json({
      success: true,
      message: 'prodact created successfully',
      body: err.message || 'creating product failed',
    })
  }
}

const getAllProduct = async (req: Request, res: Response) => {
  const searchTerm= req.query.searchTerm as string
  console.log(searchTerm)

  if(searchTerm)
  {
    try {
      const result = await productServices.searchAproductFromDb(searchTerm)
  
      res.status(200).json({
        success: true,
        message: 'Product search successfully!',
        body: result,
      })
    } catch (err: any) {
      res.status(500).json({
        success: true,
        message: 'Product search failed!',
        body: err.message || 'delation product failed',
      })
    }
  }
  else{
    try {
      const result = await productServices.getAllProduct()
  
      res.status(200).json({
        success: true,
        message: 'Products fetched successfully!',
        body: result,
      })
    } catch (err: any) {
      res.status(500).json({
        success: true,
        message: 'Products fetched failed!',
        body: err.message || 'fetching product failed',
      })
    }
  }
}

const findSingleProduct = async (req: Request, res: Response) => {
  const id = req.params.productId
  try {
    const result = await productServices.findSingleProduct(id)

    res.status(200).json({
      success: true,
      message: 'Products found successfully!',
      body: result,
    })
  } catch (err: any) {
    res.status(500).json({
      success: true,
      message: 'Products findinng failed!',
      body: err.message || 'fetching product failed',
    })
  }
}

const updateSingleProduct = async (req: Request, res: Response) => {
  const id = req.params.productId
  const update = req.body

  try {
    const result = await productServices.updateSingleProduct(id, update)

    res.status(200).json({
      success: true,
      message: 'Product updated successfully!',
      body: result,
    })
  } catch (err: any) {
    res.status(500).json({
      success: true,
      message: 'Product upddte failed!',
      body: err.message || 'fetching product failed',
    })
  }
}

const deleteSingleProduct = async (req: Request, res: Response) => {
  const id = req.params.productId
  

  try {
    const result = await productServices.deleteSingleProduct(id)

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully!',
      body: result,
    })
  } catch (err: any) {
    res.status(500).json({
      success: true,
      message: 'Product delation failed!',
      body: err.message || 'delation product failed',
    })
  }
}

const createOrder = async(req:Request, res:Response)=>{
  const order = req.body
  try {
    const orderValidetedByZod = orderValidationSchema.parse(order)
    const {productId, quantity}=orderValidetedByZod
    const result = await productServices.createOrderInTheDb(orderValidetedByZod, productId, quantity)

    res.status(200).json({
      success: true,
      message: 'Order created successfully',
      body: result,
    })
  } catch (err: any) {
    res.status(500).json({
      success: true,
      message: 'Order created successfully',
      body: err.message || 'creating product failed',
    })
  }
}

const getAllOrders = async (req: Request, res: Response) => {
  const email= req.query.email as string
  console.log(email)

  if(email)
  {
    try {
      const result = await productServices.searchAnOrderFromDb(email)
  
      res.status(200).json({
        success: true,
        message: 'Product search successfully!',
        body: result,
      })
    } catch (err: any) {
      res.status(500).json({
        success: true,
        message: 'Product search failed!',
        body: err.message || 'delation product failed',
      })
    }
  }
  else{
    try {
      const result = await productServices.getAllOrderFromDb()
  
      res.status(200).json({
        success: true,
        message: 'Products fetched successfully!',
        body: result,
      })
    } catch (err: any) {
      res.status(500).json({
        success: true,
        message: 'Products fetched failed!',
        body: err.message || 'fetching product failed',
      })
    }
  }
}

export const ProductController = {
  createNewproductInDb,
  getAllProduct,
  findSingleProduct,
  updateSingleProduct,
  deleteSingleProduct,
  createOrder,
  getAllOrders
}
