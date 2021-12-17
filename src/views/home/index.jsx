import React, { Component } from "react";
import { Container } from "react-bootstrap";
import BlogList from "../../components/blog/blog-list";
import "./styles.css";
// import useAuthGuard from "../../hooks/useAuthGuard";
export default function Home() {
  // useAuthGuard();
  return (
    <Container fluid="sm">
      <h1 className="blog-main-title">Welcome to the Strive Blog!</h1>
      <BlogList />
    </Container>
  );
}
