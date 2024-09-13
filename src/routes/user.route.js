import { Router } from 'express'
import {user_controller} from '../controllers/user.controller.js'
import {local_upload} from '../middleware/multer.middleware.js'

const user_router =Router();// making a new router

user_router.route("/register").post(
    local_upload.fields(//adding the upload middleware, which is multer middleware
        [//data is being added as array of objects
            {//here i specify the quantity and filed-name from which the documnet will get uploaded
                //it should be same as with the postman field
                name : 'avatar',
                maxcount :1
            },
            {
                name : 'cover_img',
                maxcount :1
            }
        ]
    )
    ,user_controller.user_register)//making a route to direct it to user_register


export {user_router}