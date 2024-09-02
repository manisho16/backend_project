//this is an api error handler class
class APIerror extends Error{
    //here i make a new constructor
    constructor(
        statuscode,
        message="something went wrong",
        errors=[],
        stacktree=""
    ){
        super(message)
        this.statuscode=statuscode
        this.message=message
        this.data=null
        this.success=false
        this.errors=errors
        if(stacktree){
            this.stack=stacktree
        }else{
            Error.captureStackTrace(this,this.constructor)
        }
    }
}

export {APIerror}