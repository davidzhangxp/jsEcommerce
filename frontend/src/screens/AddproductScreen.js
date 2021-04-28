import { addNewProduct,  } from "../api";
import { showMessage } from "../utils";

const AddproductScreen = {
    after_render:()=>{
        
        document.getElementById("register-form").addEventListener("submit",async(e)=>{
            e.preventDefault();
            
                const data = await addNewProduct({
                    name: document.getElementById('name').value,
                    category: document.getElementById('category').value,
                    image: document.getElementById('image').value,
                    price: document.getElementById('price').value,
                    brand: document.getElementById('brand').value,
                    rating: document.getElementById('rating').value,
                    countInStock: document.getElementById('countInStock').value,
                })
                if(data.error){
                    showMessage(data.error);
                }else{
                    document.location.hash = '/productlist'
                }
            })
    },
    render:()=>{
        
        return`
            <div class="form-container">
                <form id="register-form">
                    <ul class="form-items">
                        <li>
                            <h2>Product Information</h2>
                        </li>
                        <li>
                            <label for="name">Name</label>
                            <input type="name" name="name" id="name"/>
                        </li>
                        <li>
                            <label for="category">category</label>
                            <input type="text" name="category" id="category"/>
                        </li>
                        <li>
                            <label for="image">image</label>
                            <input type="text" name="image" id="image"/>
                        </li>
                        <li>
                            <label for="price">price</label>
                            <input type="number" step=0.01 name="price" id="price"/>
                        </li>
                        <li>
                            <label for="brand">brand</label>
                            <input type="text" name="brand" id="brand"/>
                        </li>
                        <li>
                            <label for="rating">rating</label>
                            <input type="number" step= 0.1 name="rating" id="rating"/>
                        </li>
                        <li>
                        <label for="countInStock">countInStock</label>
                            <input type="number" name="countInStock" id="countInStock"/>
                        </li>
                        <li>
                            <button type="submit" class="primary">submit</button>
                        </li>
           
                    </ul>
                </form>
            </div>`
    }
}
export default AddproductScreen