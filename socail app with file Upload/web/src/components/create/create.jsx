// import '../home/home.css'
// import axios from 'axios';
// import { useRef, useState } from 'react';
// import Swal from 'sweetalert2';
// const baseUrl = "http://localhost:3005";

export const CreatePost = () => {


    // const postBodyInputRef = useRef(null);
    // const [toggleRefresh, setToggleRefresh] = useState(false);

    // const createPost = async (e) => {

    //     e.preventDefault();

    //     try {
    //         const response = await axios.post(`${baseUrl}/hlo/v1/post`, {
    //             text: postBodyInputRef.current.value
    //         }, {
    //             // withCredentials:true
    //         })
    //         Swal
    //             .fire
    //             ({
    //                 title: "Post Created",
    //                 timer: 1000,
    //                 icon: 'success',
    //                 showConfirmButton: false
    //             })
    //         console.log(response.data)
    //         setToggleRefresh(!toggleRefresh)
    //     }
    //     catch (err) {
    //         console.log(err)

    //     }
    //     // window.location.reload();
    //     postBodyInputRef.current.value = ""
    // }
    // function openNav() {
    //     document.getElementById("myNav").style.width = "100%";
    // }

    // function closeNav() {
    //     document.getElementById("myNav").style.width = "0%";
    // }

    return (
        <div className='main'>
            {/* <div id="myNav" class="overlay">
                <a href="javascript:void(0)" className="closebtn" onClick={closeNav}>&times;</a>
                <div class="overlay-content">
                    <a href="#">About</a>
                    <a href="#">Services</a>
                    <a href="#">Clients</a>
                    <a href="#">Contact</a>
                </div>
            </div> */}

            {/* <div className="h1-div">
                <h1>What Is Your Mind</h1>
            </div>
            <div className="form-div">
                <div className="media">
                    <form onSubmit={createPost}>


                        <textarea type="text" name="" id="text" minLength="10" placeholder="Write A Some Text" ref={postBodyInputRef} required autoComplete="off" rows="10" />
                        <br /><br />
                        <button type="submit">Submit</button>

                    </form>
                </div>
            </div> */}


        </div>
    )

}

