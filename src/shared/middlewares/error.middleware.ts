import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/ApiError";

const errorMiddleware = (err:Error, req:Request, res:Response, next:NextFunction)=>{
    if(err instanceof ApiError){
        return res.status(err.statusCode).json({
            success: false,
            message: err.message,
            errors: err.errors
        })
    }
    const message = err instanceof Error ? err.message : String(err)
    console.log("Unexpected Error: ", err);

    return res.status(500).json({
        success:false,
        message:"Internal Server Error",
        errors:[message]
    })
}

export {errorMiddleware}