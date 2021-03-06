import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name:{type:String,required:true},
    category:{type:String,required:true},
    image:{type:String,required:true},
    price:{type:Number,required:true},
    brand:{type:String,required:true},
    rating:{type:Number,required:true,default:5.0},
    numReviews:{type:Number},
    countInStock:{type:Number,required:true,default:0}
})

const Product = mongoose.model('Product',productSchema)

export default Product