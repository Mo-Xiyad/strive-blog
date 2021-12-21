import React, { useEffect, useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useSelector, useDispatch } from "react-redux";
import "./styles.css";
import { checkLoggedInUser } from "../../redux/actions";
import localStorage from "redux-persist/es/storage";
import { useNavigate } from "react-router-dom";
import Typed from "typed.js";

const Login = () => {
  const navigate = useNavigate();
  // Create Ref element.
  const typedText = useRef(null);

  useEffect(() => {
    const typed = new Typed(typedText.current, {
      strings: [
        "<h1>Welcome To </h1>",
        "<h4><strong>Strive</strong> Blog With</h4>",
        "<h5>Authentication &times; &copy;</h5>",
      ], // Strings to display

      // Speed settings, try diffrent values untill you get good results
      startDelay: 100,
      typeSpeed: 100,
      backSpeed: 100,
      backDelay: 100,
      smartBackspace: true,
      loop: true,
      showCursor: true,
      cursorChar: "|",
    });

    // Destropying;
    return () => {
      typed.destroy();
    };
  }, []);

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const { isLoggedIn } = useSelector((state) => state.loggedInOrNot);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(JSON.stringify(loginData));
      const response = await fetch("http://localhost:3001/users/login", {
        method: "POST",
        body: JSON.stringify(loginData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response);
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("TOKENS", JSON.stringify(data));
        navigate("/");
        dispatch(checkLoggedInUser(true));

        return data;
      } else {
        console.log(`Ooops we got an error while Login`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container login-form">
      {" "}
      <span ref={typedText}></span>
      <h5 className="head-label">Sing In</h5>
      <Form onSubmit={(event) => handleSubmit(event)}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={loginData.email}
            onChange={(e) =>
              setLoginData({
                ...loginData,
                email: e.target.value,
              })
            }
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={loginData.password}
            onChange={(e) =>
              setLoginData({
                ...loginData,
                password: e.target.value,
              })
            }
          />
        </Form.Group>

        <Button className="mt-4" variant="primary" type="submit">
          Sign In
        </Button>
      </Form>
      <a href="http://localhost:3001/users/googleLogin">
        <Button className="mt-4 mx-3" variant="warning" type="button">
          Login with Google
        </Button>
      </a>
    </div>
  );
};
export default Login;
