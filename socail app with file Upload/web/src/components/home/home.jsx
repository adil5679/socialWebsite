import { useEffect, useRef, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { UilPen, UilTrashAlt } from '@iconscout/react-unicons'
import { Send, Chat, HeartFill, Heart } from 'react-bootstrap-icons';
import profileImg from '../../images/profile.png.jpg'
import Swal from 'sweetalert2';
import axios from 'axios';
import './home.css'



import { GlobalContext } from '../../context/context';


const baseUrl = "http://localhost:3005";
let Home = () => {

  let { state, dispatch } = useContext(GlobalContext);

  const postTitleInputRef = useRef(null);
  const postBodyInputRef = useRef(null);
  const [allposts, setallposts] = useState([])
  const [toggleRefresh, setToggleRefresh] = useState(false);
  const [like, setLike] = useState(false)
  const [postlike, setPostLike] = useState(false)



  const delPost = async (_id) => {
    try {
      const response = await axios.delete(`${baseUrl}/hlo/v1/post/${_id}`, {
        withCredentials: true
      })
    }
    catch (e) {
      console.log(e)
    }
    // console.log(_id)
    console.log('delete functio is runing')
    setToggleRefresh(!toggleRefresh)
  }

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(`${baseUrl}/hlo/v1/feed`)
        console.log("post", response.data)
        setallposts([...response.data])
      }
      catch (e) {
        console.log(e)
      }




    })();
  }, [toggleRefresh])
  
  let  theInteractor= state?.user?._id
  const likeHandler = async (theLikedpost) => {
    console.log(theLikedpost)
    console.log('therinteractor',theInteractor)
    try {
      const response = await axios.post(`${baseUrl}/hlo/v1/post/dolike`,{
        theUser : theInteractor,
        theLikedPost : theLikedpost
      });
      console.log(response.data);
      setPostLike(response.data)
      setToggleRefresh(!toggleRefresh);
    } catch (error) {
      console.log(error?.data);
    };
  }


  return (
    <div>
      <div id="posts">

        {allposts.map((eachpost, index) =>

          <div className='post' key={index}>
            <div className="title">
              <h1>{eachpost?.authorName}</h1>
              <div className="btn-div">
                <span>
                  {state.user._id === eachpost.loginUserId ? (

                    <><button className='edit'><UilPen color="#61DAFB" /></button>
                      <button className='del' onClick={(e) => { delPost(eachpost._id); }}> <UilTrashAlt color="#61DAFB" />   </button></>
                  ) : null
                  }
                </span>
              </div>
            </div>
            <div className="text">
              <img src={eachpost.imageUrl} className="img" alt="" />
            </div>

            <div className="like">
                {/* { ? (true) :(false) } */}
              <button onClick={() => { likeHandler(eachpost._id)}} > <i> < HeartFill color='red' /> : <Heart /> </i>   </button>
              <button><Chat size={23} /></button>
              <button><Send size={23} /></button>
            </div>
            <div className="section">
              <h3 className="likes-div"> {eachpost?.likes?.length} Like
              </h3>
              <p className='text-p'>{eachpost.text}
              </p>
              <Link to={'/comments'}>see all comments</Link>
              <div className="comment-box">
                <div className="com">
                  <input type="" placeholder='Add a Comment.....' name="" id="" />
                  <button> < Send /> </button>
                </div>
              </div>


            </div>
          </div>


        )
        }
      </div>



      <div className="container">
        <button onClick={() => {
          let a = document.querySelector('.container')
          a.classList.remove('show')
        }}>X</button>

      </div>
    </div>
  );

}

export default Home;