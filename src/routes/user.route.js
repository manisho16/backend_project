import { Router } from 'express'
import {user_controller} from '../controllers/user.controller.js'


const user_router =Router();// making a new router

user_router.route("/register").post(user_controller.user_register)//making a route to direct it to user_register
user_router.route("/home_p").get(user_controller.user_page)
export {user_router}