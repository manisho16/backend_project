import mongoose,{Schema} from 'mongoose'//by importing schema i dont will have to do mongoose.schema
import bcrypt from 'bcrypt'
import {jwt} from 'jsonwebtoken'


const user_schema= new Schema({
    userName :{
        type :String,
        required :true,
        trim :true,
        lowercase :true,
        unique :true,
        id :true
    },
    email :{
        type :String,
        required :true,
        trim :true,
        lowercase :true,
        unique :true
    },
    password :{
        type :String,
        required :true,
        trim :true
    },
    fullName :{
        type :String,
        required :true,
        trim :true
    },
    avatar :{
        type :String,
    },
    coverimg :{
        type :String
    },
    refreshtoken :{
        type :String,
        required :true,
        trim :true
    },
    watchhistory :[{
        type :mongoose.Schema.Types.ObjeactId,
        ref :'Video'
    }]
},{timestamps:true})

// middlewares
// 1-> to encrypt the password before letting it execute
user_schema.pre("save",async function(next){//as it is a middle-ware thus i pass 'next' in the fucntion
    //here pre shows that this mis=dlle ware makes changes before execution of the code
    if(!this.isModified("password")){
        return next();//if the password not modified i pass teh middle-ware to next
    }
    
    //else i encrypt yeh password using bcrypt
    this.password=bcrypt.hash(this.password,10);
    next()//i encrypt the password and pass it to the next

})

// methods
// 1-> validate my encrypted password
// 2-> generate access token and refresh token for my encrypted data

user_schema.methods.isCorrectPass= async function(password){//provides a boolean value 
    // using bcrypt i compare the users password and the curretn instances encrypted password 
    return await bcrypt.compare(password,this.password)
}

user_schema.methods.generateAccessToken=function(){
    //for generating token i use jwt.sign()
    //where i require 3 things, payload - token secret - expiry
    return jwt.sign(
        {
            _id :this._id,
            email :this.email,
            fullName :this.fullName,
            userName :this.userName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn :process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

user_schema.methods.generateRefreshToken=function(){
    //for generating token i use jwt.sign()
    //where i require 3 things, payload - token secret - expiry
    return jwt.sign(
        {
            _id :this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn :process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}


export const User = mongoose.model('User',user_schema)