import multer from 'multer';

//i make a middle ware using multer to store the file in the diskstoreage
const storage =multer.diskStorage({
    destination :function(req,file,cb){
        cb(null,'./public/temp')//i specify the temporary destination for the file storage
    },
    filename :function(req,file,cb){
        cb(null,file.originalname)
    }
})

//i export the store method
export const local_upload =multer({ //exporting it as upload
    storage
})