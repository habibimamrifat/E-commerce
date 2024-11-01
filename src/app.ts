import express, { Application, Request, Response } from "express"
import cors from "cors"
import { productRoute } from "./simpleEcommarce/product.routs"

const app: Application = express()

// perser 
app.use(express.json())
//middleware
app.use(cors())

app.use("/api/products",productRoute.router)
app.use("/api/orders",productRoute.orderRouts)

app.get('/', (req :Request , res:Response) => {
  res.send('Hello World yooooooooooo!')
})


export default app;