//this is a controller where i make the method thath are required by the user
//i import async handler to wrap up my method inside an async function

import async_handler from '../utils/AsyncHandler.util.js'
import {APIerror} from '../utils/APIerror.util.js'
import {APIresponse} from '../utils/APIresponse.util.js'
import {User} from '../models/user.model.js'
import {fileuploader} from '../utils/fileupload.util.js'

//i am passing an async function to our handler function
//if it runs successful i return an response
const user_register=async_handler(async (req,res)=>{
    //now i have to take the data from frontend and reurn the required response
    // 1-> get user data
    // 2-> validate and check already existance
    // 3-> check img, avatar while uploading them 
    // 4-> create user object w/o password and refresh token
    // 5-> check user creation
    // 6-> return the response

    //1
    const {userName, email, password, fullName}=req.body
    
    //2
    if(
        [userName, email, password, fullName].some(data=>data.trim()==="")//givem me a boolean value      
    ){
        //if any the field is empty i reurn an APIerror
        throw new APIerror(400,'DATA FIELDS SENT EMPTY');
    }
    const user_exist= User.findOne({
        $or : [ {email} , { userName}] //here i check for the first occurance of either email or username
    })
    if(!user_exist){
        throw new APIerror(400,'USER ALREADY EXISTS')
    }

    //3 
        //first in routers i use the multer middle-ware to upload the files in the local repo
        //then i check here if the files have been successfull uploaded or not
        //if yes then i upload the files from local repo to cloudnary
    let avatarLocalPath="12"//it is important 
    let coverimgLocalPath=""//it can be ignored

    if(req.files && req.files.avatar && req.files.avatar.length>0){
        //here i am trying to get the path property from my avatar object, only if it exists
        avatarLocalPath=await req.files.avatar[0].path
    }
    // avatarLocalPath=await req.files?.avatar[0]?.path
    if(req.files && req.files.cover_img && req.files.cover_img.length>0){
        coverimgLocalPath=await req.files.cover_img[0].path
    }
    if(!avatarLocalPath){
        throw new APIerror(400,'AVATAR DOES NOT EXISTS')
    }
        //now i upload files to cloudinary
    avatarLocalPath=`.\\${avatarLocalPath}`
    console.log(avatarLocalPath)
    const avatar= await fileuploader(avatarLocalPath)
    const coverimg= await fileuploader(coverimgLocalPath)
    if(!avatar){
        throw new APIerror(500,'AVATAR UPLOADING FAILED')
    }

    //4
    const newUser = User.create(//i am making a user object in the database that contains user details
        {
            userName,
            email,
            password,
            fullName,
            avatar :avatar.url,
            cover_img :coverimg.url || "",//either the coverimg url or empty
        }
    )

    //5
    const createdUser=newUser.findbyId(createdUser._id).select(//here i exclude those fields i dont want to include int he response i want to return to user
        "-password -refreshtoken"
    )
    if(!createdUser){
        throw new APIerror(500,"USER NOT CREATED")
    }

    //6
    return res.status(200).json(
        new APIresponse(200,createdUser,"REPONSE SUCCESSFULLT RETURNED")

    )




})


export const user_controller={ // i am exporting an object of methods
    user_register,
}


