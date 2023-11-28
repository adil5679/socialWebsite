import { Link } from "react-router-dom";
import './authNavbar.css'
import { Bell, ChatDots, House, Heart, PlusCircle, Search, Justify, FileImage } from 'react-bootstrap-icons';
import LogoImg from '../../images/socailVibeLogo.png'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import '../home/home.css'
import axios from 'axios';
import { useRef, useState } from 'react';
import Swal from 'sweetalert2';
const baseUrl = "http://localhost:3005";
const AuthNavbar = () => {


    const postBodyInputRef = useRef(null);
    const postFileInputRef = useRef(null);
    const [toggleRefresh, setToggleRefresh] = useState(false);
    const [selectedImage, setSelectedImage] = useState("");

    const createPost = async (e) => {

        e.preventDefault();


        try {
            const formData = new FormData()
            formData.append("text", postBodyInputRef.current.value);
            formData.append("image", postFileInputRef.current.files[0]);

            const response = await axios.post(`${baseUrl}/hlo/v1/post`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            })
            Swal
                .fire
                ({
                    title: "Post Created",
                    timer: 1000,
                    icon: 'success',
                    showConfirmButton: false
                })
            console.log(response.data)
            setToggleRefresh(!toggleRefresh)
        }
        catch (err) {
            console.log(err)

        }
        // window.location.reload();
        postBodyInputRef.current.value = ""
    }

    function openNav() {
        document.getElementById("myNav").style.width = "100%";
    }

    function closeNav() {
        document.getElementById("myNav").style.width = "0%";
        // window.location.pathname = "/home" .toggleRefresh
    }

    return (


        <>

            <div id="myNav" className="overlay">
                <a href={`javascript:void(0)`} className="closebtn" onClick={closeNav}>&times;</a>
                <div className="overlay-content">

                    <div className="form-div">
                        <div className="media">
                            <form onSubmit={createPost}>
                                <div className="preveiw-div">

                                    <div className="preveiw-text">
                                        <textarea type="text" name="" id="text" minLength="10" placeholder="Write A Some Text" ref={postBodyInputRef} required autoComplete="off"></textarea>
                                        <button id="post-btn" type="submit">Post</button>
                                    </div>
                                    <div className="preveiw-image">
                                        <div className="image">
                                            {selectedImage ? <img  src={selectedImage} alt="selected image" /> : < FileImage />}
                                        </div>
                                        <label for="images" class="drop-container" id="dropcontainer">                                  
                                            <input type="file" id="images" accept="image/*" required
                                                ref={postFileInputRef}
                                                name="image"
                                                onChange={(e) => {
                                                    const base64Url = URL.createObjectURL(e.target.files[0])
                                                    setSelectedImage(base64Url)
                                                    console.log(e.target.files[0])
                                                }}
                                            />
                                        </label>
                                    </div>
                                </div>

                            </form>
                        </div>
                    </div>

                </div>
            </div>

            <div className="sidebar">
                <div className="upper-div">
                    <div className="logo m-2  flex items-center">
                        <img src={LogoImg} width={120} alt="" />

                    </div>
                </div>
                <div className="links">

                    <Link id="search-btn" to={`/`} >     <i><House size={25} /> </i>             <p className="nav-p"> home</p>            </Link>
                    <Link id="search-btn" to={`search`}>                     <i> <Search size={25} />    </i>                    <p className="nav-p"> Search</p>      </Link>
                    <Link id="not-btn" to={`/notification`}> <i><Heart size={25} /></i>         <p className="nav-p">Notification</p>           </Link>
                    <Link id="msg-btn" to={`search`}>        <i>< ChatDots size={25} /></i>                          <p className="nav-p"> Message</p>       </Link>

                    <div id="create-btn" onClick={openNav} className="more">
                        <PlusCircle size={25} />  <p className="nav-p">Create</p>
                    </div>
                    <Link className="link" to={`/profile`}> <i><AccountCircleIcon size={25} />  </i>       <p className="nav-p"> Profile</p>     </Link>



                </div>
            </div >
        </>



        // </div>
    );
}

export default AuthNavbar;
