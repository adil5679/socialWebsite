import '../home/home.css'
import { useEffect, useRef, useState,PA } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import profileImg from '../../images/profile.png.jpg'
import { UilPen, UilTrashAlt } from '@iconscout/react-unicons'
// import {  } from '@iconscout/react-unicons'
import 'primeicons/primeicons.css';
import '../profile/profile.css'
import Swal from 'sweetalert2';



const baseUrl = "http://localhost:3005";
let Profile = () => {

  const [allposts, setallposts] = useState([])
  const [profile, setProfile] = useState([])
  const [toggleRefresh, setToggleRefresh] = useState(false);
  const {userId} = useParams()

  const getProfilePosts = async () => {
    try {
      const response = await axios.get(`${baseUrl}/hlo/v1/posts?_id=${userId || ''}`)
      setallposts([...response.data])
    }
    catch (e) {
      console.log(e)
    }
    console.log(userId);
  };

  const getProfile = async () => {
    try {
      const response = await axios.get(`${baseUrl}/hlo/v1/profile/${userId || ''}`)
      setProfile(response.data.data)
      console.log(response.data.data)
    }
    catch (e) {
      console.log(e)
    }
  };


  useEffect(() => {
    getProfilePosts()
    getProfile()
  }, [])



  const delPost = async (_id) => {
    try {
      const response = await axios.delete(`${baseUrl}/hlo/v1/post/${_id}`)
    }
    catch (e) {
      console.log(e)
    }
    setToggleRefresh(!toggleRefresh)
  }


  return (<div className='profile-body bg-white  h-screen float-right  ' >

    <div className='banner-div w-max'>
      <div className="banner-card">
        <div className="profile-image-div">

          <img src={profileImg} className='profileImg' alt="" />

        </div>
        <div className="profile-info-div">
          <div className="name">
            <div className="name">
              <h1>{profile.firstName}</h1> <h1>{profile.lastName}</h1>
            </div>
            
            <div className="profile-Button">
             <button>edit profile</button>
            </div>

          </div>

        </div>
      </div>
    </div>


    <div id="posts">

      {allposts.map((eachpost, index) =>
        <div className='post' key={index}>
          <div className="title">
            <h1>{eachpost.authorName}</h1>
            <div className="btn-div">
              <button className='edit' ><UilPen color="#61DAFB" /></button>
              <button className='del' onClick={(e) => { delPost(eachpost._id) }}  > <UilTrashAlt color="#61DAFB" />   </button>
            </div>
          </div>
          <div className="text">
            <p>{eachpost.text}</p>
          </div>
        </div>
      )}
    </div>
    {/* <br /> */}




  </div>

  );

}


export default Profile;