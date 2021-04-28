import { parseRequestUrl } from "../utils"
import {getProduct} from '../api'
import Rating from '../component/Rating'

const ProductScreen = {
    render: async() =>{
        const request = parseRequestUrl()
        const product = await getProduct(request.id)
        
        if(product.error){
            return `<div>${product.error}</div>`
        }
        return `
        <div class="content">
            <div class="back-to-result">
                <a href="/#/"> Back to Result </a>
            </div>
            <div class="details">
                <div class="details-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="details-info">
                    <ul>
                        <li><h2>${product.name}</h2></li>
                        <li>
                        ${Rating.render({
                            value: product.rating,
                            text:` ${product.numReviews} reviews`
                        })}
                        </li>
                        <li>
                            Price: <strong>$${product.price}</strong>
                        </li>
                        <li>
                            Description:
                            <div>
                            ${product.description}
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="details-action">
                    <ul>
                        <li>$${product.price}</li>
                        <li>
                            Status :
                            ${product.countInStock > 0 ? `<span class="success">In Stock` : `<span class="error">unavailable</span>` }
                        </li>
                        <li>
                        <button id="add-button" class="fw primary">Add to cart</button>
                        </li>
                    </ul>
                </div>
            </div>

        </div>
        `
    },

    after_render:()=>{
        const request = parseRequestUrl()
        document.getElementById("add-button").addEventListener('click',()=>{
            document.location.hash = `/cart/${request.id}`
        })
    }
}

export default ProductScreen