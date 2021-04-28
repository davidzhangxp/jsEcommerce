import express from 'express'
import expressAsyncHandler from 'express-Async-Handler'
import Product from '../models/productModel';

const productRouter = express.Router();

productRouter.post(
    '/',
    expressAsyncHandler(async(req, res)=>{
        const product = new Product({
            name:req.body.name,
            category:req.body.category,
            image:req.body.image,
            price:req.body.price,
            brand:req.body.brand,
            rating:req.body.rating,
            numReviews:req.body.numReviews,
            countInStock:req.body.countInStock
        } )
        const createdProduct = await product.save()
        if(!createdProduct){
            res.status(401).send({message:'No product found'})
        }else{
            res.send(createdProduct)
        }
    })
)
productRouter.get(
    '/products',
    expressAsyncHandler(async(req,res)=>{
        const products = await Product.find()
        if(products){
            res.send(products)
        }else{
            res.status(404).send({message:'Products Not Found'})
        }
    })
)

productRouter.get(
    '/products/:id',
expressAsyncHandler(async(req,res)=>{
    const product = await Product.findById(req.params.id)
    if(product){
        res.send(product)
    }else{
        res.status(404).send(message,'Product Not Found')
    }
})
)

export default productRouter