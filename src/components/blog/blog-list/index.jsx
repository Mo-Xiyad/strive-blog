import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import BlogItem from "../blog-item";
import { useEffect, useState } from "react";
import useAuthGuard from "../../../hooks/useAuthGuard";

const BlogList = () => {
  useAuthGuard();
  const [posts, setPost] = useState(null);
  const [newData, setNewData] = useState(false);

  const apiUrl = process.env.REACT_APP_BE_URL;

  const getData = async () => {
    const tokens = JSON.parse(localStorage.getItem("TOKENS"));
    // console.log("TOKEN WHEN IM TRYING TO GET", tokens.accessToken);
    try {
      const response = await fetch(`${apiUrl}/posts/`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("----- HOME PAGE ------");
        console.log(data.post);
        setPost(data.post);
        setNewData(false);
      } else if (response.status === 401) {
        // fetch refresh token
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deletePost = async (postId) => {
    const tokens = JSON.parse(localStorage.getItem("TOKENS"));
    // console.log("TOKEN WHEN IM TRYING TO GET", tokens.accessToken);
    try {
      const response = await fetch(`${apiUrl}/posts/${postId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
        },
      });
      if (response.ok) {
        console.log("DELETED");
        setNewData(true);
      } else if (response.status === 401) {
        // fetch refresh token
      }
    } catch (error) {
      console.log(error);
    }
  };

  // const deletePost = async (postId) => {
  //   try {
  //     const response = await fetch(`${apiUrl}/posts/${postId}`, {
  //       method: "DELETE",
  //     });
  //     if (response.ok) {
  //       console.log("DELETED");
  //       setNewData(true);
  //     } else if (response.status === 401) {
  //       const { error } = await response.json();
  //       if (error === "SESSION_EXPIRED") {
  //         const response = await fetch("REFRESH_URL");
  //         if (!response.ok) {
  //           throw new Error("Session is really expired");
  //         }
  //         const { tokens } = await response.json();
  //         //saving the tokens...
  //         deletePost(postId);
  //       }
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

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
