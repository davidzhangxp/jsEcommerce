import axios from "axios"
import {apiUrl} from "./config"
import { getUserInfo } from "./localStorage"

export const getProduct = async(id) => {
    try{
        const response = await axios({
            url: `${apiUrl}/api/products/products/${id}`,
            method: 'GET',
            headers:{
                'Content-Type': 'application/json'
            }
        })
        if (response.statusText !== 'OK'){
            throw new Error(response.data.message)
        }
        return response.data;
    }
    catch(err){
        return {error:err.message}
    }
}

export const signin = async({email,password})=>{
    try{
        const response = await axios({
            url:`${apiUrl}/api/users/signin`,
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            data:{
                email,password,
            }
        })
        if (response.statusText !== 'OK'){
            throw new Error(response.data.message)
        }
        return response.data;
    }catch(err){
        console.log(err)
        return {error:err.message || err.response.data.message}
    }
}

export const register = async({name,email,password})=>{
    try{
        const response = await axios({
            url:`${apiUrl}/api/users/register`,
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            data:{
                name,email,password,
            }
        })
        if (response.statusText !== 'OK'){
            throw new Error(response.data.message)
        }
        return response.data;
    }catch(err){
        console.log(err)
        return {error:err.message || err.response.data.message}
    }
}

export const update = async({name,email,password})=>{
    try{
        const {_id,token} = getUserInfo()
        const response = await axios({
            url:`${apiUrl}/api/users/${_id}`,
            method:'PUT',
            headers:{
                'Content-Type': 'application/json',
                Authorization:`Bearer ${token}`
            },
            data:{
                name,email,password,
            }
        })
        if (response.statusText !== 'OK'){
            throw new Error(response.data.message)
        }
        return response.data;
    }catch(err){
        console.log(err)
        return {error:err.message || err.response.data.message}
    }
}

export const createOrder = async(order)=>{
    try {
        const {token} = getUserInfo()
        const response = await axios({
            url:`${apiUrl}/api/orders`,
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
                Authorization:`Bearer ${token}`,
            },
            data:order,
        })
        if (response.statusText !== 'Created'){
            throw new Error(response.data.message)
        }
        return response.data;
    }catch(err){
        console.log(err)
        return {error:err.response? err.response.data.message : err.message}
    }
}

export const getOrder = async(id)=>{
    try{
        const {token} = getUserInfo()
        const response = await axios({
            url:`${apiUrl}/api/orders/detail/${id}`,
            headers:{
                'Content-Type': 'application/json',
                Authorization:`Bearer ${token}`,
            }
        })
        if (response.statusText !== 'OK'){
            throw new Error(response.data.message)
        }
        return response.data;
    }catch(err){
        return {error:err.message}
    }
}

export const getPaypalClientId = async()=>{
    try {
        const response = await axios({
            url:`${apiUrl}/api/paypal/clientId`,
            headers:{
                'Content-Type': 'application/json'
            }
        })
        if(response.statusText !== 'OK'){
            throw new Error(response.data.message)
        }
        return response.data.clientId;
    } catch (err) {
        return {error:err.message}
    }

}

export const payOrder = async(orderId,paymentResult)=>{
    try {
        const {token} = getUserInfo()
        const response = await axios({
            url:`${apiUrl}/api/orders/${orderId}/pay`,
            method:'PUT',
            headers:{
                'Content-Type': 'application/json',
                Authorization:`Bearer ${token}`,
            },
            data:paymentResult,
        })
        if(response.statusText !== 'OK'){
            throw new Error(response.data.message)
        }
        return response.data
    } catch (err) {
        return {error: err.response? err.response.data.message : err.message}
    }
}


export const getMyOrders = async(id)=>{
    try {
        const {token} = getUserInfo()
        const response = await axios({
            url:`${apiUrl}/api/orders/mine/${id}`,
            headers:{
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            
        })
        if(response.statusText !== 'OK'){
            throw new Error(response.data.message)
        }
        return response.data;
    } catch (err) {
        return {error: err.response? err.response.data.message : err.message}
    }
}

export const getAllOrders = async()=>{
    try {
        const {token} = getUserInfo()
        const response = await axios({
            url:`${apiUrl}/api/orders/all`,
            headers:{
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            
        })
        if(response.statusText !== 'OK'){
            throw new Error(response.data.message)
        }
        return response.data;
    } catch (err) {
        return {error: err.response? err.response.data.message : err.message}
    }
}

export const addNewProduct = async(product)=>{
    try {
        const {token} = getUserInfo()
        const response = await axios({
            url:`${apiUrl}/api/products`,
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
                Authorization:`Bearer ${token}`,
            },
            data:product,
        })
        if(response.statusText !== 'OK'){
            throw new Error(response.data.message)
        }
        return response.data
    } catch (err) {
        return {error: err.response? err.response.data.message : err.message}
    }
}

export const getProducts = async()=>{
    try{
        const {token} = getUserInfo()
        const response = await axios({
            url:`${apiUrl}/api/products/products`,
            headers:{
                'Content-Type': 'application/json',
                Authorization:`Bearer ${token}`,
            }
        })
        if(response.statusText !== 'OK'){
            throw new Error(response.data.message)
        }
        return response.data
    }catch(err){
        return {error: err.response? err.response.data.message : err.message}
    }
}