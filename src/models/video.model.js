import mongoose,{Schema} from 'mongoose'//by importing schema i dont will have to do mongoose.schema
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2' //this is used for making aggregate queries and aggregation pipeline

const video_schema= new Schema({
    file :{
        type :String,
    },
    thumbnail :{
        type :String,
    },
    title :{
        type :String,
        required :true,
    },
    description :{
        type :String,
        required :true,
    },
    duration :{
        type :String,
    },
    views :{
        type :Number,
        default :0
    },
    isPublished :{
        type :Boolean,
        default :true
    },
    owner :[{
        type :mongoose.Schema.Types.ObjeactId,
        ref :'User'
    }]
},{timestamps:true})

video_schema.plugin(mongooseAggregatePaginate)//for writing aggregate queries
export const Video = mongoose.model('Video',video_schema)