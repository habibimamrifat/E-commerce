import dotenv, { config } from "dotenv"
import path from "path"
dotenv.config({path :( path.join( process.cwd(),".env"))})

export default{
    Port:process.env.Port,
     Mongoose_uri:process.env.mongoesUri
}