import { getAllOrders } from "../api"
import DashboardMenu from "../component/DashboardMenu"

const DashboardOrdersScreen = {
    after_render:()=>{},
    render:async()=>{
        const orders = await getAllOrders()
        return `
        <div class="dashboard">
            ${DashboardMenu.render({selected:'order'})}
            <div class="dashboard-content">

                <h1>Orders Management</h1>
                <div class="dashboard-content">
                <div class="profile-orders">
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
                </div>
            </div>
        </div>
        `
    }
}

export default DashboardOrdersScreen