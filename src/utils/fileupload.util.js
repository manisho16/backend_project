import {v2 as cloudinary} from 'cloudinary' //cloudinary is used for cloud based file uploading
import fs from 'fs' // this a inbuid node file system module used to access files
import dotenv from 'dotenv'
dotenv.config();


//i configure the cloudinary 
cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.CLOUD_API_KEY, 
    api_secret: process.env.CLOUD_API_SECRET // Click 'View API Keys' above to copy your API secret
});


//for uploading an image i use v2.uploader
//making a method for file upload
const fileuploader=async function(localfile){
    try {
        console.log("local file-> "+localfile)
        //i check if the file path is present
        if(!localfile || !fs.existsSync(localfile)){//if file is not present then i return null
            console.error('File does not exist');
            return null
        }
        //storing the uploaded file response in a variable
        const fileresponse= await cloudinary.uploader.upload(localfile).then((response)=>{
            console.log(response)
        })//here i upload the local file
        console.log("file uploaded successfully, url => ",fileresponse.url)
        return fileresponse;
    
    } catch (error) {
        //if i filed any error then i unlink the file from the server
        //using fs.unlink
        console.error("ERROR UPLOADING THE FILE",error)
        // if (fs.existsSync(localfile)) {
        //     fs.unlinkSync(localfile);
        // }
        throw error
        return null
    }
}

export {fileuploader}