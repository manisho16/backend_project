//this ia a utility function for handling async function
//there are 2 ways of doing it

// 1 -> using promise 
// this is a higher order function which takes function as a parameter
// and return the resolve or catch for the promise
    // const asyncPromise = (fun)=>{
    //     (req,res,next)=>{
    //         Promise
    //         .resolve(fun(req,res,next))
    //         .catch((error)=>next(error))
    //     }
    // }

// 2 -> using try and catch
// here also i use the high order function
    // const asyncHandler = (fun) => 
    //     async ()=>{
    //         try {
    //             await (req,res,next)
    //         } catch (error) {
    //             //i send the error code in the response
    //             res.status(error.code || 400).json({
    //                 success :false,
    //                 message :error.message
    //             })
    //         }
    //     }