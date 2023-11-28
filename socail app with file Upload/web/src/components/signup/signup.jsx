import { useRef, useState } from "react";
import axios from "axios";
import './signup.css'
import { Link } from "react-router-dom";
import socail from '../../images/socailVibeLogo.png'

import Swal from "sweetalert2";


const baseUrl = "http://localhost:3005";

const Signup = () => {

    const firstNameInputRef = useRef();
    const lastNameInputRef = useRef();
    const emailInputRef = useRef();
    const userNameInputRef = useRef();
    const passwordInputRef = useRef();
    const confirmpasswordInputRef = useRef();

    // USE STATE     
    const [passwordErrorClass, setpasswordErrorClass] = useState("hidden")

    const Signuphandler = async (e) => {
        e.preventDefault();
        console.log('jadnaknda')
        if (passwordInputRef.current.value !== confirmpasswordInputRef.current.value) {
            console.log('password donsaljn')
            setpasswordErrorClass("");
            setInterval(() => {
                setpasswordErrorClass("hidden")
            }, 6000)
            return;
        }
        else {
            setpasswordErrorClass("hidden")
        }

        try {


            const response = await axios.post(`${baseUrl}/hlo/v1/signup`, {

                firstName: firstNameInputRef.current.value,
                lastName: lastNameInputRef.current.value,
                email: emailInputRef.current.value,
                password: passwordInputRef.current.value,
                username: userNameInputRef.current.value

            })

            Swal
            .fire
            ({
                title: "Signup SucessFully",
                timer: 1000,
                icon: 'success',
                showConfirmButton: false
            })
            console.log("res", response)

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
                    <h3>Create New Account</h3>
                </div>


            </div>

            <div className="rightside-body">

                <div className="form-body">
                    <div className="signup-div">
                        <h1 className="signup">Signup </h1>
                    </div>

                    <form onSubmit={Signuphandler}>

                        <input
                            className="input"
                            placeholder="First"
                            minLength={3}
                            maxLength={10}
                            type="text"
                            name="firstname"
                            ref={firstNameInputRef} id="" />



                        <input
                            placeholder="Last"
                            type="text"
                            name=""
                            className="input"
                            minLength={3}
                            maxLength={10}
                            id="" ref={lastNameInputRef}
                        />

                        <input
                            placeholder="username"
                            type="text"
                            name=""
                            id="" ref={userNameInputRef}
                            className="input"
                            minLength={3}
                            maxLength={10}
                        />

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
                        <input
                            type="password"
                            ref={confirmpasswordInputRef}
                            className="input"
                            placeholder="Confirm password"
                            minLength={3}
                            maxLength={10}
                        />


                        <div className="sign-btn">
                            <p className={`passwordError ${passwordErrorClass}  `}>password Doe's Not Matched</p>
                            <button type="submit">Signup</button>
                        </div>

                    </form>

                    <p className="underline">
                        <Link to={`/login`}>already have account ?</Link>
                    </p>
                </div>
            </div>

        </div>
    )
}


export default Signup;