import React, { Component } from "react";
import { Button, Container, Image } from "react-bootstrap";
// import { withRouter } from "react-router";
import BlogAuthor from "../../components/blog/blog-author";
import BlogLike from "../../components/likes/BlogLike";
import "./styles.css";
import { useState, useEffect } from "react";
import BlogComment from "../../components/blog/blog-comment";

import { useParams } from "react-router-dom";
import useAuthGuard from "../../hooks/useAuthGuard";

const Blog = () => {
  useAuthGuard();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const { _id: id } = params;
  const apiUrl = process.env.REACT_APP_BE_URL;

  const getData = async (id) => {
    try {
      const tokens = JSON.parse(localStorage.getItem("TOKENS"));
      const response = await fetch(`${apiUrl}/posts/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
        },
      });
      // const { accessToken } = JSON.parse(localStorage.getItem("TOKENS"));

      // const response = await fetch(`${apiUrl}/posts/${id}`, {
      //   headers: {
      //     Authorization: `Bearer ${accessToken}`,
      //   },
      // });
      if (response.ok) {
        const data = await response.json();

        setBlog(data);
        setLoading(false);
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
    getData(id);
  }, []);

  if (loading) {
    return <div>loading</div>;
  } else {
    return (
      <div className="blog-details-root">
        {
          <Container>
            <Image className="blog-details-cover" src={blog.cover} fluid />
            <a
              className="btn-primary btn-sm mt-5 pt-5"
              href={`${apiUrl}/posts/${blog._id}/downloadPostPDF`}
            >
              download pdf
            </a>
            <h1 className="blog-details-title">{blog.title}</h1>

            <div className="blog-details-container">
              <div className="blog-details-author">
                <BlogAuthor {...blog.author} />
              </div>
              <div className="blog-details-info">
                <div>{blog.createdAt}</div>
                <div>{`${blog.readTime.value} ${blog.readTime.unit} read`}</div>
                <div style={{ marginTop: 20 }}>
                  <BlogLike defaultLikes={["123"]} onChange={console.log} />
                </div>
              </div>
            </div>

            <div dangerouslySetInnerHTML={{ __html: blog.content }}></div>

            <BlogComment id={blog._id} />
          </Container>
        }
      </div>
    );
  }
};

export default Blog;
