import {v2 as cloudinary} from cloudinary //cloudinary is used for cloud based file uploading
import fs from 'fs' // this a inbuid node file system module used to access files

//i configure the cloudinary 
cloudinary.config({ 
    cloud_name: 'dfmfxub3s', 
    api_key: process.env.CLOUD_API_KEY, 
    api_secret: process.env.CLOUD_API_SECRET // Click 'View API Keys' above to copy your API secret
});

//for uploading an image i use v2.uploader
//making a method for file upload
const fileuploader=async function(localfile){
    try {
        //i check if the file path is present
        if(!localfile){//if file is not present then i return null
            return null
        }
        //storing the uploaded file response in a variable
        const fileresponse=cloudinary.uploader.upload(localfile)//here i upload the local file
        console.log("file uploaded successfully, url => ",fileresponse.url)
        return fileresponse;
    
    } catch (error) {
        //if i filed any error then i unlink the file from the server
        //using fs.unlink
        fs.unlinkSync(localfile)
        return null
    }
}

export {fileuploader}