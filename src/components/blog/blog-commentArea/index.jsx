import "./styles.css";
import React from "react";
import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";

const CommentForm = ({ id }) => {
  const [comment, setComment] = useState({
    text: "",
  });

  const apiUrl = process.env.REACT_APP_BE_URL;
  const postComments = async () => {
    try {
      // "http://localhost:3001/posts/sktwi19x8kv1ixzqf/comments";
      console.log(id);
      let response = await fetch(`${apiUrl}/posts/${id}/comments`, {
        method: "POST",
        body: JSON.stringify(comment),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        // console.log(response.ok);
        let data = await response.json();
        console.log(response);
        setComment({ text: "" });
      } else {
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log("posting comments component");
  }, []);

  //   defaultValue={coment.text}
  return (
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
  );
};

export default CommentForm;
