//here we are making an express app

import express from 'express'
import cors from 'cors'
import cookieparser from 'cookie-parser'

const app = express()//initialising the express app

//here in the app file i import and make the configuration changes
//config changes of express,cors

app.use(cors()) 
    // this is the basic configuration of the cors
    //production base cors configuration takes objects within it
        // app.use(cors({
        //     // origin : 
        //     // credentials:true
        // }))

app.use(express.json({ 
    //here i am configuring the settings of json files that express should allow
    limit : '20kb'
}))

app.use(express.urlencoded({ 
    //for express it configures the url settings
    extended :true,
    limit :'20kb'
}))

app.use(express.static('public'))// here static is an predefined middleware manager for static files storage
app.use(cookieparser())//it alows our server to access the users browser cookies


//from here i import an router and do the routing by declaration of its base landing site
import {user_router} from './routes/user.route.js'

app.use('/api/v1/user',user_router)// i telling the express app to call user_router if /user landing page is entered
//standard url declaration
// ' http://localhost:3000/api/v1/---our-site--- '


export {app} //as it is exported it now has a superpower,
//can be accessed in any file