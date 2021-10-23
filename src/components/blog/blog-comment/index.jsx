import React from "react";
import { useEffect, useState } from "react";
import { Col, Image, Row } from "react-bootstrap";
import "./styles.css";

const BlogComment = ({ id }) => {
  const [comments, setComments] = useState(null);
  const [author, setAuthor] = useState(null);

  const [showDelete, setShowDelete] = useState({ display: "none" });

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

  const deleteComment = async (commeId) => {
    const response = await fetch(
      `http://localhost:3001/posts/${id}/comments/${commeId}`,
      {
        method: "DELETE",
      }
    );
    if (response.ok) {
      console.log("DELETE");
    }
  };

  const editComment = async (commeId) => {};

  useEffect(() => {
    getComments();
  }, []);

  return (
    <>
      <div className="container">
        {comments &&
          author &&
          comments.map((comment) => (
            <Row key={comment._id}>
              <Col md={8}>
                <div className="media g-mb-30 media-comment">
                  <Image
                    className="d-flex g-width-50 g-height-50 rounded-circle g-mt-3 g-mr-15"
                    src="https://source.unsplash.com/random/200x200?sig=1"
                    alt="Image Description"
                  />
                  <div
                    className="media-body u-shadow-v18 g-bg-secondary g-pa-30"
                    onMouseLeave={(e) => {
                      setShowDelete({ display: "none" });
                    }}
                    onMouseOver={(e) => {
                      setShowDelete({ display: "block", display: "inline" });
                    }}
                  >
                    <div className="d-flex justify-content-between">
                      <div className="g-mb-15 mb-3">
                        <h5 className="h5 g-color-gray-dark-v1 mb-0">
                          {author.name}
                        </h5>
                        <span className="g-color-gray-dark-v4 g-font-size-12">
                          5 days ago
                        </span>
                      </div>
                      <div className="g-color-gray-dark-v4">
                        <span
                          style={showDelete}
                          onClick={(e) => deleteComment(comment._id)}
                        >
                          <i className="fa fa-trash g-pos-rel g-top-1 g-mr-3 px-3" />
                        </span>
                        <span>
                          <i className="fa fa-edit g-pos-rel g-top-1 g-mr-3 px-3" />
                        </span>
                      </div>
                    </div>
                    <p>{comment.text}</p>
                    <div className="d-flex flex-row fs-12">
                      <div className="like p-2 cursor">
                        <i className="fa fa-thumbs-o-up" />
                        <span className="ml-1">Like</span>
                      </div>
                      <div className="like p-2 cursor">
                        <i className="fa fa-commenting-o" />
                        <span className="ml-1">Comment</span>
                      </div>
                      <div className="like p-2 cursor">
                        <i className="fa fa-share" />
                        <span className="ml-1">Share</span>
                      </div>
                    </div>
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
