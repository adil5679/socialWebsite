import { useRef, useContext } from "react";
import axios from "axios";
import '../signup/signup.css'
import { GlobalContext } from '../../context/context';
import { Link } from "react-router-dom";
import Swal from "sweetalert2";


const baseUrl = "http://localhost:3005";

const Login = () => {
    let { state, dispatch } = useContext(GlobalContext);

    const emailInputRef = useRef();
    const passwordInputRef = useRef();

    const Loginhandler = async (e) => {

        e.preventDefault();
       

        try {
            const response = await axios.post(`${baseUrl}/hlo/v1/login`, {

                email: emailInputRef.current.value,
                password: passwordInputRef.current.value

            })
            dispatch({
                type: "USER_LOGIN",
                payload: response.data.data,
            })
            
            console.log("res", response)
            Swal
            .fire
            ({
                    title: "Login SucessFully",
                    timer: 1000,
                    icon: 'success',
                    showConfirmButton: false
                })
                
                // window.location.pathname = '/'
             
        }
        catch (e) {
            console.log(e);
        }

    }

    return (
        <div className="main-body">

            <div className="leftside-text">
                <div className="style-para">
                    <h2>welcome 💕</h2>

                    <h1>Social Vibe ✌</h1>

                </div>


            </div>

            <div className="rightside-body">

                <div className="form-body">
                    <div className="signup-div">
                        <h1 className="signup">Signin </h1>
                    </div>
                    <div className="form-div">
                        <form onSubmit={Loginhandler}>


                            <input
                                placeholder="example@gmail.com"
                                type="text"
                                name=""
                                className="input"
                                id="" ref={emailInputRef}
                            />


                            <input
                                placeholder="password"
                                type="password"
                                ref={passwordInputRef}
                                className="input"
                                minLength={4}
                                maxLength={8}
                            />



                            <div className="myclass">
                                {/* <p className={`passwordError ${passwordErrorClass}  `}>password Doe's Not Matched</p> */}
                                <button className="login-btn" id="login-btn" type="submit">Sign In</button>
                            </div>

                        </form>

                    </div>

                    <div className="new">

                        <p className="underline">
                            <Link to={`/signup`}>Create New Account</Link>
                        </p>
                    </div>

                </div>
            </div>

        </div>





    )
}


export default Login;