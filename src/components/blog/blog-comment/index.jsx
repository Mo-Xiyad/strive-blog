import React from "react";
import { useEffect, useState } from "react";
import { Col, Image, Row } from "react-bootstrap";
import "./styles.css";

const BlogComment = ({ id }) => {
  const [comments, setComments] = useState(null);
  const [author, setAuthor] = useState(null);
  const getComments = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/posts/${id}/comments`
      );

      if (response.ok) {
        let data = await response.json();
        setComments(data.comments);
        setAuthor(data.author);
        // console.log(data.comments);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getComments();
  }, []);

  return (
    <>
      <div className="container">
        {comments &&
          author &&
          comments.map((comment) => (
            <Row>
              <Col md={8}>
                <div className="media g-mb-30 media-comment">
                  <Image
                    className="d-flex g-width-50 g-height-50 rounded-circle g-mt-3 g-mr-15"
                    src="https://source.unsplash.com/random/200x200?sig=1"
                    alt="Image Description"
                  />
                  <div className="media-body u-shadow-v18 g-bg-secondary g-pa-30">
                    <div className="g-mb-15 mb-3">
                      <h5 className="h5 g-color-gray-dark-v1 mb-0">
                        {author.name}
                      </h5>
                      <span className="g-color-gray-dark-v4 g-font-size-12">
                        5 days ago
                      </span>
                    </div>
                    <p>{comment.text}</p>
                    <ul className="list-inline d-sm-flex my-0">
                      <li className="list-inline-item g-mr-20">
                        <a
                          className="u-link-v5 g-color-gray-dark-v4 g-color-primary--hover"
                          href="#!"
                        >
                          <i className="fa fa-thumbs-up g-pos-rel g-top-1 g-mr-3" />
                          178
                        </a>
                      </li>
                      <li className="list-inline-item g-mr-20">
                        <a
                          className="u-link-v5 g-color-gray-dark-v4 g-color-primary--hover"
                          href="#!"
                        >
                          <i className="fa fa-thumbs-down g-pos-rel g-top-1 g-mr-3" />
                          34
                        </a>
                      </li>
                      <li className="list-inline-item ml-auto">
                        <a
                          className="u-link-v5 g-color-gray-dark-v4 g-color-primary--hover"
                          href="#!"
                        >
                          <i className="fa fa-reply g-pos-rel g-top-1 g-mr-3" />
                          Reply
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </Col>
            </Row>
          ))}
      </div>
    </>
  );
};

export default BlogComment;
/*  */
