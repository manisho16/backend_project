import mongoose from 'mongoose'
import connection from './db/index.js'
import dotenv from 'dotenv'
dotenv.config({
    path :'./.env'
})

connection(); //calling the connection function to setup connection with database

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
