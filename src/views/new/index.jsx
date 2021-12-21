import React, { useState } from "react";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import { Container, Form, Button } from "react-bootstrap";
import "./styles.css";
import { useNavigate, useParams } from "react-router-dom";
import useAuthGuard from "../../hooks/useAuthGuard";

const NewBlogPost = () => {
  useAuthGuard();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    category: "ARTICLE CATEGORY",
    title: "",
    cover: "ARTICLE COVER (IMAGE LINK)",
    readTime: {
      value: 2,
      unit: "minute",
    },
    comments: [],
    author: "61c11e824cbe74394971fc45",
    content: "",
  });

  const [postImg, setPostImg] = useState(null);
  const apiUrl = process.env.REACT_APP_BE_URL;
  const postBlogData = async () => {
    const tokens = JSON.parse(localStorage.getItem("TOKENS"));
    try {
      let response = await fetch(`${apiUrl}/posts`, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        // console.log(response);
        let data = await response.json();
        // upload image
        // console.log(data);
        try {
          let formDataImg = new FormData();
          formDataImg.append("cover", postImg);
          console.log(formDataImg);
          console.log(postImg);
          const res = await fetch(`${apiUrl}/posts/${data._id}/uploadImage`, {
            method: "PUT",
            body: formDataImg,
            headers: {
              Authorization: `Bearer ${tokens.accessToken}`,
            },
          });
          if (res.ok) {
            console.log("img post success");
            navigate("/");
          } else {
            console.log("img post upload failed", res);
          }
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container className="new-blog-container">
      <div className="mt-5">
        <Form.Group controlId="blog-form" className="mt-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            size="lg"
            placeholder="Title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
        </Form.Group>
        <Form.Group controlId="blog-category" className="mt-3">
          <Form.Label>Category</Form.Label>
          <Form.Control size="lg" as="select">
            <option>Category1</option>
            <option>Category2</option>
            <option>Category3</option>
            <option>Category4</option>
            <option>Category5</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="blog-content" className="mt-3">
          <Form.Label>Blog Content</Form.Label>
          <Form.Control
            as="textarea"
            rows={20}
            value={formData.content}
            onChange={(e) =>
              setFormData({ ...formData, content: e.target.value })
            }
            className="new-blog-content"
          />
        </Form.Group>
        <Form.Control
          type="file"
          onChange={(e) => {
            setPostImg(e.target.files[0]);
          }}
        />
        <Form.Group className="d-flex mt-3 justify-content-end">
          <Button type="reset" size="lg" variant="outline-dark">
            Reset
          </Button>
          <Button
            size="lg"
            variant="dark"
            style={{ marginLeft: "1em" }}
            onClick={() => postBlogData()}
          >
            Submit
          </Button>
        </Form.Group>
      </div>
    </Container>
  );
};

export default NewBlogPost;
