import React, { Component } from "react";
import { Container, Image } from "react-bootstrap";
import { withRouter } from "react-router";
import BlogAuthor from "../../components/blog/blog-author";
import BlogLike from "../../components/likes/BlogLike";
import posts from "../../data/posts.json";
import "./styles.css";
import { useState, useEffect } from "react";
import BlogComment from "../../components/blog/blog-comment";
// import { useParams } from "react-router-dom";

const Blog = ({ match }) => {
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  const id = match.params._id;

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
      const response = await fetch(
        `http://localhost:3001/posts/${id}`,
        requestOptions
      );

      if (response.ok) {
        const data = await response.json();
        console.log("----- inside------");
        console.log(data);
        setBlog(data);
        setLoading(false);
        console.log(match);
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

export default withRouter(Blog);
