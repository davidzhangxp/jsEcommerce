import HomeScreen from './screens/HomeScreen.js'
import ProductScreen from './screens/ProductScreen.js'
import CartScreen from './screens/CartScreen.js'
import Error404Screen from './screens/Error404Screen.js'
import { parseRequestUrl } from './utils.js'
import SigninScreen from './screens/SigninScreen.js'
import Header from './component/Header.js'
import RegisterScreen from './screens/RegisterScreen.js'
import ProfileScreen from './screens/ProfileScreen.js'
import ShippingScreen from './screens/ShippingScreen.js'
import PaymentScreen from './screens/PaymentScreen.js'
import PlaceOrderScreen from './screens/PlaceOrderScreen.js'
import OrderScreen from './screens/OrderScreen.js'
import DashboardScreen from './screens/DashboardScreen.js'
import DashboardOrdersScreen from './screens/DashboardOrdersScreen.js'
import DashboardProductsScreen from './screens/DashboardProductsScreen.js'
import AddproductScreen from './screens/AddproductScreen.js'

const routes = {
    '/':HomeScreen,
    '/product/:id':ProductScreen,
    '/cart/:id':CartScreen,
    '/cart':CartScreen,
    '/signin':SigninScreen,
    '/register':RegisterScreen,
    '/profile':ProfileScreen,
    '/shipping':ShippingScreen,
    '/payment':PaymentScreen,
    '/placeorder':PlaceOrderScreen,
    '/orders/:id':OrderScreen,
    '/dashboard':DashboardScreen,
    '/orderlist':DashboardOrdersScreen,
    '/productlist':DashboardProductsScreen,
    '/addproduct':AddproductScreen,
}

const router = async() =>{
    const request = parseRequestUrl();
    const parseUrl = (request.resource? `/${request.resource}` : '/') +
    (request.id ? '/:id' : '') + 
    (request.verb ? `/${request.verb}` : '');
    const header = document.getElementById("header-container")
    header.innerHTML = await Header.render();
    await Header.after_render();

    const screen = routes[parseUrl] ? routes[parseUrl] : Error404Screen
    const main = document.getElementById("main-container")
    main.innerHTML = await screen.render();
    if (screen.after_render) await screen.after_render();

};

window.addEventListener('load', router);
window.addEventListener('hashchange',router);