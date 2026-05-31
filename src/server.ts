import {Request, Response} from "express"
import {app} from "./app";
import { configDotenv } from "dotenv";
import { connectDB } from "./config/db.config";

configDotenv();

const PORT =process.env.PORT;

connectDB().then(
    ()=>{
        app.listen(PORT || 1500, ()=>{
            console.log(`Server is running on http://localhost:${PORT}`)
        } )
    }
).catch(
    (error)=>{
        console.log("Mongo DB Connection failed---", error)
    }
)
