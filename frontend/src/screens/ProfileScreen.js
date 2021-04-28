import { getMyOrders, update, } from "../api";
import { clearUser, getUserInfo, setUserInfo } from "../localStorage";
import { hideLoading, showLoading, showMessage } from "../utils";

const ProfileScreen = {
    after_render:()=>{
        document.getElementById("signout-button").addEventListener('click',()=>{
            clearUser();
            document.location.hash = '/'
        })
        showLoading()
        document.getElementById("profile-form").addEventListener("submit",async(e)=>{
            e.preventDefault();
                const data = await update({
                    name: document.getElementById('name').value,
                    email: document.getElementById('email').value,
                    
                })
                if(data.error){
                    showMessage(data.error);
                }else{
                    setUserInfo(data)
                }
        })
        hideLoading()
    
    },
    render:async()=>{
        const {_id,name,email} = getUserInfo();
        
        if (!name){
            document.location.hash = "/"
        }
        const orders = await getMyOrders(_id);
        return `
            <div class="profile">
                <div class="profile-info">
                    <div class="form-container">
                    <form id="profile-form">
                    <ul class="form-items">
                        <li>
                            <h2>User Profile</h2>
                        </li>
                        <li>
                            <label for="name">Name</label>
                            <input type="name" name="name" id="name" value="${name}"/>
                        </li>
                        <li>
                            <label for="email">Email</label>
                            <input type="email" name="email" id="email" value="${email}"/>
                        </li>
                        <li>
                            <button type="submit" class="primary">Update</button>
                        </li>
                        <li>
                            <button type="button" id="signout-button">Sign out</button>
                        </li>
                    </ul>
                    </form>
                    </div>
                </div>
                <div class="profile-orders">
                    <h2>Order History</h2>
                    <table>
                        <thead>
                            <tr>
                                <th> ORDER ID</th>
                                <th> DATE </th>
                                <th> TOTAL</th>
                                <th> PAID</th>
                                <th> DELIVERED</th>
                                <th> ORDER DETAIL</th>
                            </tr>
                        </thead>
                        <tbody>
                        ${orders.length === 0 ? `<tr><td colspan="6">NO ORDER FOUND</td></tr>`
                        : orders.map( order => `
                        <tr>
                            <td>${order._id}</td>
                            <td>${order.paidAt || "not paid yet"}</td>
                            <td>${order.totalPrice}</td>
                            <td>${order.paidAt || "No"}</td>
                            <td>${order.deliveredAt || "No"}</td>
                            <td><a href="/#/orders/${order._id}">DETAIL</a></td>
                        </tr>
                        `).join('\n')
                    }

                        </tbody>
                    </table>
                </div>
            </div>`
    
    }
}
export default ProfileScreen