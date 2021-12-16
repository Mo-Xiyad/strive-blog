import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useSelector, useDispatch } from "react-redux";
import "./styles.css";
import { checkLoggedInUser } from "../../redux/actions";

const Login = ({ setAccessToken, setRefreshToken }) => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const { isLoggedIn } = useSelector((state) => state.loggedInOrNot);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log(isLoggedIn);
    // console.log(loginData.email);
    // console.log(loginData.password);
  }, [loginData.email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(JSON.stringify(loginData));
      const response = await fetch("http://localhost:3001/usersFromDb/login", {
        method: "POST",
        body: JSON.stringify(loginData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response);
      if (response.ok) {
        const data = await response.json();
        // console.log(`Here is the USERDATA`, data);
        setAccessToken(data.accessToken);
        setRefreshToken(data.refreshToken);

        localStorage.setItem("TOKENS", JSON.stringify(data));

        dispatch(checkLoggedInUser(true));
        // console.log(data);
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
    </div>
  );
};
export default Login;
