import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import BlogItem from "../blog-item";
// import posts from "../../../data/posts.json";
import { useEffect, useState } from "react";

const BlogList = () => {
  const [posts, setPost] = useState(null);
  const [newData, setNewData] = useState(false);

  const apiUrl = process.env.REACT_APP_BE_URL;

  const getData = async () => {
    try {
      const response = await fetch(`${apiUrl}/posts/`);

      if (response.ok) {
        const data = await response.json();
        console.log("----- HOME PAGE ------");
        // console.log(data);
        setPost(data);
        setNewData(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deletePost = async (postId) => {
    try {
      const response = await fetch(`${apiUrl}/posts/${postId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        console.log("DELETED");
        setNewData(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, [newData]);
  return (
    <Row>
      {posts &&
        posts.map((post) => (
          <Col key={post._id} md={4} style={{ marginBottom: 50 }}>
            <div
              className="d-flex justify-content-end"
              onClick={() => deletePost(post._id)}
            >
              <i className="fa fa-trash" />
            </div>
            <BlogItem {...post} />
          </Col>
        ))}
    </Row>
  );
};

export default BlogList;
