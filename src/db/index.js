import mongoose from 'mongoose'
import {dbname} from '../constants.js'

const connection = async()=>{
    try{
        console.log("requested connection")
        const connection_instance=await mongoose.connect(`${process.env.MONGODB_URL}/${dbname}`)
        console.log(`CONNETION SUCCESSFULL,
             host => ${connection_instance.connection.host}`)//to get the host of the connection
            
        console.log("ended")
    }catch(error){
        console.log("DATABaSE CONNECTION FAILED")
        throw error
    }
}

//exporting the connection initialized here
export default connection