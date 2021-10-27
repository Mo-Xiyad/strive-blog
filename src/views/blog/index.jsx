import React, { Component } from "react";
import { Button, Container, Image } from "react-bootstrap";
import { withRouter } from "react-router";
import BlogAuthor from "../../components/blog/blog-author";
import BlogLike from "../../components/likes/BlogLike";
import posts from "../../data/posts.json";
import "./styles.css";
import { useState, useEffect } from "react";
import BlogComment from "../../components/blog/blog-comment";
import CommentForm from "../../components/blog/blog-commentArea";

// import { useParams } from "react-router-dom";

const Blog = ({ match }) => {
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  const id = match.params._id;
  const apiUrl = process.env.REACT_APP_BE_URL;

  const getData = async (id) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      // body: raw,
      redirect: "follow",
    };
    try {
      const response = await fetch(`${apiUrl}/posts/${id}`, requestOptions);

      if (response.ok) {
        const data = await response.json();

        setBlog(data);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(match);
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

            <CommentForm id={blog._id} />
            <BlogComment id={blog._id} />
          </Container>
        }
      </div>
    );
  }
};

export default withRouter(Blog);
