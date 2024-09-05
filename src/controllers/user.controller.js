//this is a controller where i make the method thath are required by the user
//i import async handler to wrap up my method inside an async function

import async_handler from '../utils/AsyncHandler.util.js'

//i am passing an async function to our handler function
//if it runs successful i return an response
const user_register=async_handler(async (req,res)=>{
    res.status(200).json({
        message : 'ho jayega register'
    })
})

const user_page=async_handler(async (req,res)=>{
    res.status(200).json({
        message :'home page pe swagat hai'
    })
})

export const user_controller={ // i am exporting an object of methods
    user_register,
    user_page
}


