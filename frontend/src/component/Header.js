import { getUserInfo } from "../localStorage"

const Header = {
    render:()=>{
        const {name,isAdmin} = getUserInfo()
        return `
        <div class="brand">
        <a href="/#/">JS Amazona</a>
        </div>
        <div>
        ${
            name
            ? `<a href="/#/profile">${name}</a>`
            : `<a href="/#/signin">SignIn</a>`
        }
        
        <a href="/#/cart">Cart</a>
        ${isAdmin ? `<a href="/#/dashboard">Dashboard</a>` : ""}
        </div>
    `
    },
    after_render:()=>{

    }
}
export default Header