import React from "react";
import { useEffect, useState } from "react";
import { Col, Image, Row } from "react-bootstrap";
import "./styles.css";

const BlogComment = ({ id }) => {
  const [comments, setComments] = useState(null);
  const [author, setAuthor] = useState(null);
  const [currentId, setCurrentId] = useState(null);

  const [posted, setPosted] = useState(false);
  const [comment, setComment] = useState({
    text: "",
  });

  const [showDelete, setShowDelete] = useState({ display: "none" });

  const apiUrl = process.env.REACT_APP_BE_URL;

  const getComments = async () => {
    try {
      const response = await fetch(`${apiUrl}/posts/${id}/comments`);

      if (response.ok) {
        let data = await response.json();
        setComments(data.comments.reverse());
        setAuthor(data.author);
        setPosted(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const postComments = async () => {
    try {
      let response = await fetch(`${apiUrl}/posts/${id}/comments`, {
        method: "POST",
        body: JSON.stringify(comment),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        setPosted(true);
        setComment({ text: "" });
      } else {
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteComment = async (commeId) => {
    const response = await fetch(`${apiUrl}/posts/${id}/comments/${commeId}`, {
      method: "DELETE",
    });
    if (response.ok) {
      console.log("DELETED");
      setPosted(true);
    }
  };

  const editComment = async (commeId) => {};

  useEffect(() => {
    getComments();
  }, [posted]);

  return (
    <>
      <div className="container">
        <div className="panel">
          <div className="panel-body">
            <textarea
              className="form-control"
              type="textarea"
              rows={2}
              placeholder="What are you thinking?"
              value={comment.text}
              onChange={(e) => setComment({ ...comment, text: e.target.value })}
            />
            <div className="mar-top clearfix">
              <button
                className="btn btn-sm btn-dark pull-right subtim-btn"
                onClick={(e) => postComments(e)}
              >
                <i className="fa fa-pencil fa-fw" /> Share
              </button>
              <a
                className="btn btn-trans btn-icon fa fa-video-camera add-tooltip"
                href="#"
              />
              <a
                className="btn btn-trans btn-icon fa fa-camera add-tooltip"
                href="#"
              />
              <a
                className="btn btn-trans btn-icon fa fa-file add-tooltip"
                href="#"
              />
            </div>
          </div>
        </div>
        {comments &&
          author &&
          comments.map((comment) => (
            <Row
              key={comment._id}
              onMouseOver={(e) => setCurrentId(console.log(comment._id))}
              onMouseLeave={(e) => {
                setCurrentId(null);
              }}
            >
              <Col md={8}>
                <div className="media g-mb-30 media-comment">
                  <Image
                    className="d-flex g-width-50 g-height-50 rounded-circle g-mt-3 g-mr-15"
                    src={author.avatar}
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
                        {comments._id == currentId && (
                          <span
                            style={showDelete}
                            onClick={(e) => deleteComment(comment._id)}
                          >
                            <i className="fa fa-trash g-pos-rel g-top-1 g-mr-3 px-3" />
                          </span>
                        )}
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
