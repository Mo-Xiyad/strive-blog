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
        console.log("----- inside------");
        console.log(data);
        setPost(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const some = () => {
    console.log("heloooo");
  };
  useEffect(() => {
    some();
    getData();
  }, []);
  return (
    <Row>
      {posts &&
        posts.map((post) => (
          <Col md={4} style={{ marginBottom: 50 }}>
            <BlogItem key={post.title} {...post} />
          </Col>
        ))}
    </Row>
  );
};

export default BlogList;
