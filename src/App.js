import React, { useEffect, useState } from "react";
import NavBar from "./components/navbar";
import Footer from "./components/footer";
import Home from "./views/home";
import Blog from "./views/blog";
import NewBlogPost from "./views/new";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Login from "./views/login/Login";
import useAuthGuard from "./hooks/useAuthGuard";

import { useNavigate } from "react-router-dom";
import { LOGGED_IN_USERS_DATA } from "./redux/actions";

function App() {
  useAuthGuard();
  const apiUrl = process.env.REACT_APP_BE_URL;
  const tokens = JSON.parse(localStorage.getItem("TOKENS"));
  const dispatch = useDispatch();
  const getCurrentUser = async () => {
    try {
      let response = await fetch(`${apiUrl}/users/me`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
        },
      });
      if (response.ok) {
        let data = await response.json();
        console.log(data);
        dispatch({ type: LOGGED_IN_USERS_DATA, payload: data });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const { isLoggedIn } = useSelector((state) => state.loggedInOrNot);

  const __accessToken = !!tokens && tokens.accessToken;
  useEffect(() => {
    getCurrentUser();
  }, [__accessToken]);

  useEffect(() => {
    console.log(isLoggedIn);
    console.log("isLoggedIn");
  }, []);

  return (
    <div className="App">
      <div>
        <NavBar />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/posts/:_id" exact element={<Blog />} />
          <Route path="/new" exact element={<NewBlogPost />} />
        </Routes>
        <Footer />
      </div>
      {/* )} */}
    </div>
  );
}

export default App;
