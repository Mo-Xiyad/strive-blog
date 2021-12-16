import React, { useEffect, useState } from "react";
import NavBar from "./components/navbar";
import Footer from "./components/footer";
import Home from "./views/home";
import Blog from "./views/blog";
import NewBlogPost from "./views/new";
import { BrowserRouter, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Login from "./views/login/Login";

function App() {
  const [authorisedUser, setAuthorisedUser] = useState();
  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const { isLoggedIn } = useSelector((state) => state.loggedInOrNot);
  // useEffect(() => {
  //   console.log(accessToken);
  //   console.log(loggedInOrNot);
  // }, [accessToken]);
  return (
    <div className="App">
      {!isLoggedIn ? (
        <BrowserRouter>
          <Route
            path="/"
            exact
            render={(props) => (
              <Login
                {...props}
                setAccessToken={setAccessToken}
                setRefreshToken={setRefreshToken}
              />
            )}
          />
        </BrowserRouter>
      ) : (
        <BrowserRouter>
          <NavBar />
          <Route path="/" exact component={Home} />
          <Route path="/posts/:_id" exact component={Blog} />
          <Route path="/new" exact component={NewBlogPost} />
          <Footer />
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
