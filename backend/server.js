// const express = require('express');
// const cors = require('cors')
// const data = require('./data.js');
import express from 'express';
import cors from 'cors';
import data from './data.js';
import mongoose from 'mongoose';
import config from './config.js';
import userRouter from './routes/userRouter.js';
import bodyParser from 'body-parser';
import orderRouter from './routes/orderRouter.js';
import productRouter from './routes/productRouter.js';

mongoose
.connect(config.MONGODB_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
}).then(()=>{
    console.log('Connected to mongodb.')
}) 
.catch((error)=>{
    console.log(error.reason)
    
})

const app = express()

app.use(cors())
app.use(bodyParser.json());
app.use('/api/users',userRouter)
app.use('/api/orders',orderRouter)
app.use('/api/products',productRouter)

app.get("/api/paypal/clientId",(req,res)=>{
    res.send({clientId:config.PAYPAL_CLIENT_ID})
})

app.use((err,req,res,next)=>{
    const status = err.name && err.name === 'Validation Error' ? 400:500;
    res.status(status).send({message:err.message})
})
app.listen(3000,()=>{
    console.log('server at http://localhost:3000')
})