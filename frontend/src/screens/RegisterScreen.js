import { register } from "../api";
import { getUserInfo, setUserInfo } from "../localStorage";
import { hideLoading, redirectUser, showLoading, showMessage } from "../utils";

const RegisterScreen = {
    after_render:()=>{
        showLoading()
        document.getElementById("register-form").addEventListener("submit",async(e)=>{
            e.preventDefault();
            if (document.getElementById("password").value !== document.getElementById("repassword").value){
                showMessage('Please check your password')
            }else{
                const data = await register({
                    name: document.getElementById('name').value,
                    email: document.getElementById('email').value,
                    password: document.getElementById('password').value,
                })
                if(data.error){
                    showMessage(data.error);
                }else{
                    setUserInfo(data)
                    redirectUser();
                }
            }
        })
        hideLoading()
    
    },
    render:()=>{
        if (getUserInfo().name){
            redirectUser()
        }
        return`
            <div class="form-container">
                <form id="register-form">
                    <ul class="form-items">
                        <li>
                            <h2>Register</h2>
                        </li>
                        <li>
                            <label for="name">Name</label>
                            <input type="name" name="name" id="name"/>
                        </li>
                        <li>
                            <label for="email">Email</label>
                            <input type="email" name="email" id="email"/>
                        </li>
                        <li>
                            <label for="password">Password</label>
                            <input type="password" name="password" id="password"/>
                        </li>
                        <li>
                        <label for="repassword">Re-enter Password</label>
                        <input type="password" name="repassword" id="repassword"/>
                    </li>
                        <li>
                            <button type="submit" class="primary">register</button>
                        </li>
                        <li>
                            <div>
                                Already have an account?
                                <a href="/#/signin">Login</a>
                            </div>
                        </li>
                    </ul>
                </form>
            </div>`
    }
}
export default RegisterScreen