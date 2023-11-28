import { Routes, Route, Link, Navigate } from "react-router-dom";
import { useEffect, useContext } from "react";
import { GlobalContext } from './context/context';
import axios from "axios";
import Splash from './images/Vanilla.gif'


import Home from "./components/home/home";
import Signup from "./components/signup/signup";
import Comments from "./components/allComments/allComments";
import Login from "./components/login/login";
import AuthNavbar from "./components/authNavbar/authnavbar";
import Profile from "./components/profile/profile";
// import { CreatePost } from "./components/create/create";

import Notifi from "./components/notification/notification";
import SearchBar from "./components/searchBar/search";

let baseUrl = 'http://localhost:3005'

const App = () => {
  let { state, dispatch } = useContext(GlobalContext);



  const userCheckLogin = async () => {
    try {
      const response = await axios.get(`${baseUrl}/ping`, {
        withCredentials: true
      })
      if (response.status === 200) {
        dispatch({
          type: "USER_LOGIN",
          payload: response.data.data
        })
        // console.log("State in try: ", JSON.stringify(state))

      }

    }
    catch (e) {
      console.log(e)
      dispatch({
        type: "USER_LOGOUT"
      })
      // console.log("State in catch: ", JSON.stringify(state))

    }
  }


  useEffect(() => {
    axios.interceptors.request.use(function (config) {
      config.withCredentials = true
      return config;
    }, function (error) {
      return Promise.reject(error);
    });
    userCheckLogin();
  }, [])






  return <div>
    {state.isLogin === true ?
      (
        <AuthNavbar />
      ) : (null)}


    {state.isLogin === true ? (

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="notification" element={<Notifi />} />
        <Route path="search" element={<SearchBar />} />
        {/* <Route path="create" element={<CreatePost />} /> */}
        <Route path="comments" element={<Comments />} />
        <Route path="profile" element={<Profile />} />
        <Route path="profile/:userId" element={<Profile />} />

        <Route path="*" element={<Navigate to="/" replace={true} />} />
      </Routes>)
      : (null)
    }

    {state.isLogin === false ? (
      <Routes>
        <Route path="signup" element={<Signup />} />
        <Route path="login" element={<Login />} />
        <Route path="*" element={<Navigate to="/login" replace={true} />} />
      </Routes>
    ) : (null)
    }

    {state.isLogin === null ? (
      <h1>Loading.....</h1>
    )
      : (null)

    }
  </div>

};

export default App;
