import DashboardMenu from "../component/DashboardMenu"
import axios from 'axios'
import { getProducts } from "../api"

const DashboardProductsScreen = {
    after_render:()=>{
        document.getElementById("addproduct-button").addEventListener("click",()=>{
            document.location.hash = '/addproduct'
        })
    },
    render:async()=>{

        const products = await getProducts();
        return `
        <div class="dashboard">
            ${DashboardMenu.render({selected:'products'})}
            <div class="dashboard-content">

                <h1>Products Management</h1>
                <div class="dashboard-content">
                
                <div class="cart">
                <div class="cart-list">
                    <ul class="cart-list-container">
                        <li>
                            <h3>Products List</h3>
                            <div>Price</div>
                        </li> 
                        ${products.length === 0 ? `<li>No product</li>` :
                            products.map(item =>`
                                <li>
                                    <div class= "cart-image">
                                        <img src="${item.image}" alt="${item.name}">
                                    </div>
                                    <div class= "cart-name">
                                        <div>
                                            <a href="/#/product/${item.product}">${item.name}</a>
                                        </div>
                                        <div>
                                            Qty: ${item.countInStock}
                                        </div>
                                    </div>
                                    <div class="cart-price">
                                        $${item.price}
                                    </div>
                                </li>
                                `).join('\n')
                        }   
                        <div>
                        <button class="primary" id="addproduct-button">Add New Product</button>
                        </div>
                    </ul>
                </div>
                
            </div>
                </div>
            </div>
        </div>
        `
    }
}

export default DashboardProductsScreen