import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import BlogAuthor from "../blog-author";
import { Link } from "react-router-dom";
import "./styles.css";
import useAuthGuard from "../../../hooks/useAuthGuard";

const BlogItem = ({ title, cover, author, _id }) => {
  useAuthGuard();
  return (
    <Link to={`/posts/${_id}`} className="blog-link">
      <Card className="blog-card" key={_id}>
        <Card.Img variant="top" src={cover} className="blog-cover" />

        <Card.Body>
          <Card.Title>{title}</Card.Title>
        </Card.Body>
        <Card.Footer>
          <BlogAuthor {...author} />
        </Card.Footer>
      </Card>
    </Link>
  );
};
export default BlogItem;
