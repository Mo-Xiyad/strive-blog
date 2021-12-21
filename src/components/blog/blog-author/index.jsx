import React, { Component, useEffect, useState } from "react";
import { Row, Col, Image } from "react-bootstrap";
import useAuthGuard from "../../../hooks/useAuthGuard";
import "./styles.css";
const BlogAuthor = (author) => {
  useAuthGuard();
  const [userData, setUserData] = useState();
  const apiUrl = process.env.REACT_APP_BE_URL;
  const getData = async (id) => {
    try {
      const { accessToken } = JSON.parse(localStorage.getItem("TOKENS"));
      const response = await fetch(`${apiUrl}/users/${author._id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log(response);
      if (response.ok) {
        const data = await response.json();
        // console.log(data.avatar);
        setUserData(data);
      } else {
        // tru to refresth token........
        //if token refresh is ok.....
        // if not, then it is a real error
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      {userData && (
        <Row>
          <Col xs={2}>
            <Image
              className="blog-author"
              src={userData.avatar}
              roundedCircle
            />
          </Col>
          <Col>
            <div>by</div>
            <h6>{userData.name}</h6>
          </Col>
        </Row>
      )}
    </>
  );
};

export default BlogAuthor;
