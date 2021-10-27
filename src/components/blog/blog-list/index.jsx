import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import BlogItem from "../blog-item";
// import posts from "../../../data/posts.json";
import { useEffect, useState } from "react";

const BlogList = () => {
  const [posts, setPost] = useState(null);

  const apiUrl = process.env.REACT_APP_BE_URL;

  const getData = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
    };
    try {
      const response = await fetch(`${apiUrl}/posts/`, requestOptions);

      if (response.ok) {
        const data = await response.json();
        console.log("----- HOME PAGE ------");
        // console.log(data);
        setPost(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <Row>
      {posts &&
        posts.map((post) => (
          <Col key={post._id} md={4} style={{ marginBottom: 50 }}>
            <div className="d-flex justify-content-end">
              <i className="fa fa-trash" />
            </div>
            <BlogItem {...post} />
          </Col>
        ))}
    </Row>
  );
};

export default BlogList;
