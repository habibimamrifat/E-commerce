import express from "express"
import { ProductController } from "./product.controller";
const router = express.Router();
const orderRouts = express.Router()
router.post("/", ProductController.createNewproductInDb)
router.get("/", ProductController.getAllProduct)
router.get("/:productId", ProductController.findSingleProduct)
router.put("/:productId", ProductController.updateSingleProduct)
router.delete("/:productId", ProductController.deleteSingleProduct)
orderRouts.post("/",ProductController.createOrder)
orderRouts.get("/",ProductController.getAllOrders)



export const  productRoute={router,orderRouts};