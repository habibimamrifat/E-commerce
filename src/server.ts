import mongoose from 'mongoose'
import config from './config'
import app from './app'

async function main() {
   
  try {
    await mongoose.connect(config.Mongoose_uri as string)
    app.listen(config.Port, () => {
      console.log(` app listening on port ${config.Port}`)
    })
  } catch (error) {
    console.log(error)
  }
}

main()
