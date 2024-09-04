import mongoose from 'mongoose'
import connection from './db/index.js'
import {app} from './app.js'
import dotenv from 'dotenv'
dotenv.config({
    path :'./.env'
})

//calling the connection function to setup connection with database
//here we get a promise with the connection as it is within an async await
connection()
.then(()=>{
    //we make sure if the server is listining
    app.listen(process.env.PORT || 3000,()=>{
        console.log(`sun raha hai server, port no hai =-> ${process.env.PORT}`)
    })
})
.catch((error)=>{
    console.log("databse connection FAILED, koi ni sun raha HAI")
    throw error
}) 

//making connection with databse in the index file only
    // import mongoose from 'mongoose';
    // import express from 'express';
    // import { dbname } from './constants.js';
    // import dotenv from 'dotenv'

    // dotenv.config()

    // const app=express()//making a new new request app

    // ;(async()=>{   
    //     try{
    //         console.log("requested connection")
    //         await mongoose.connect(`${process.env.MONGODB_URL}/${dbname}`)//we have requested fro the connection from the databse
    //         console.log("await is over")
    //         app.on("error",()=>{ //we check if we are able to connect to the server or not
    //             console.log("not able to connect to server")
    //             throw error;
    //         })
    //         app.listen(process.env.PORT,()=>{
    //             console.log(`server is listining on port = > ${process.env.PORT}`)
    //         })
    //         console.log('exited')

    //     }catch(error){
    //         console.log("DATABSE CONNETION FAILED -> ")
    //         throw error
    //     }
    // })()

//making databse connection by importing the file 
