import React, { Component } from "react";
import {
  Dropdown,
  DropdownButton,
  Container,
  Navbar,
  Button,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import "./styles.css";
import { useDispatch } from "react-redux";
import { checkLoggedInUser } from "../../redux/actions";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  const params = new URLSearchParams(window.location.search);
  const refToken = params.get("accessToken");

  const logOut = async () => {
    try {
      // localStorage.removeItem("TOKENS");
      // localStorage.removeItem("ACCESS_TOKEN");
      window.localStorage.clear();
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  const dispatch = useDispatch();
  const apiUrl = process.env.REACT_APP_BE_URL;
  return (
    <Navbar expand="lg" className="blog-navbar" fixed="top">
      <Container className="justify-content-between">
        <Navbar.Brand as={Link} to="/">
          <img className="blog-navbar-brand" alt="logo" src={logo} />
        </Navbar.Brand>
        <div className="d-flex">
          <Button
            as={Link}
            to="/new"
            className="blog-navbar-add-button bg-dark"
            size="lg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-plus-lg"
              viewBox="0 0 16 16"
            >
              <path d="M8 0a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2H9v6a1 1 0 1 1-2 0V9H1a1 1 0 0 1 0-2h6V1a1 1 0 0 1 1-1z" />
            </svg>
            Post Article
          </Button>
          <DropdownButton
            variant={"Secondary"}
            id="dropdown-basic-button"
            title="Options"
          >
            <Dropdown.Item href={`${apiUrl}/posts/downloadCSV-authos`}>
              {" "}
              Export authors as a CSV
            </Dropdown.Item>
            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
          </DropdownButton>
          <Button
            className="btn btn-danger mx-2"
            onClick={() => {
              dispatch(checkLoggedInUser(false));
              logOut();
            }}
          >
            sign Out
          </Button>
        </div>
      </Container>
    </Navbar>
  );
};
export default NavBar;
