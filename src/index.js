// require('dotenv').config({path: './env'})
import dotenv from "dotenv";
dotenv.config({
    path: "./env"
})

// import mongoose from "mongoose";
// import { DB_NAME } from "./constants";


import connectDB from "./db/index.js";


connectDB()





// First Approach 
// function connectDB(){}
// connectDB()

/*
import express from "express";
const app = express();
// second approach
// IIFE (Immediately Invoked Function Experssion)
;( async () => {
    try {
        await mongoose.connect(`$(process.env.MONGODB_URI)/${DB_NAME}`)

        // optional (Another Approach available)
        app.on("error", (error) => {
            console.log("ERROR: ", error);
            throw error;
        })

        app.listen(process.env.PORT, () => {
            console.log(`App is listening on Port ${process.env.PORT}`);
        })

    } catch (err) {
        console.log("ERROR: ",err);
        throw err;
    }
} )()

*/
