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

function App() {
  useAuthGuard();

  const { isLoggedIn } = useSelector((state) => state.loggedInOrNot);

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
