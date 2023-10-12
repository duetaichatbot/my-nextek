import React from "react";
import {
  useDeleteReplyMutation,
  useReplyCommentMutation,
} from "../../../../Redux/posts/Posts";
import Toastify from "toastify-js";
import profileImg from "../../../../assets/cardImg1.png";
import style from "./homecommentsMid.module.css";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import DeletePopup from "../../../Components/DeletePopup/DeletePopup";

const HomeReplies = ({ id, userID, commentID, itme }) => {
  const [isReply, setIsReply] = useState(false);
  const [replies, setReplies] = useState("");
  const [isReplyDelete, setIsReplyDelete] = useState(false);
  const [replyID, setReplyID] = useState("");
  const [replyComment] = useReplyCommentMutation();

  const replyOnComment = async () => {
    if (replies !== "") {
      try {
        const { data } = await replyComment({
          postId: id,
          userID,
          commentId: commentID,
          comments: replies,
        });

        if (data) {
          setReplies("");
          setIsReply(false);
          // alert("Reply Posted Successfully");
          Toastify({
            text: "Reply Posted Successfully",
            duration: 10000,
            newWindow: true,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "center", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
              background: "#007fff",
              borderRadius: "10px",
              color: "white",
              fill: "white",
            },
            onClick: function () {}, // Callback after click
          }).showToast();
          //   setComments("");
        }
      } catch (error) {
        Toastify({
          text: "Error While Posting Reply",
          duration: 10000,
          newWindow: true,
          close: true,
          gravity: "top", // `top` or `bottom`
          position: "center", // `left`, `center` or `right`
          stopOnFocus: true, // Prevents dismissing of toast on hover
          style: {
            background: "#007fff",
            borderRadius: "10px",
            color: "white",
            fill: "white",
          },
          onClick: function () {}, // Callback after click
        }).showToast();
      }
    } else {
      // alert("");
      Toastify({
        text: "Reply Field Is Required",
        duration: 10000,
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "center", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "#007fff",
          borderRadius: "10px",
          color: "white",
          fill: "white",
        },
        onClick: function () {}, // Callback after click
      }).showToast();
    }
  };

  const [deleteReply] = useDeleteReplyMutation();

  const handleReplyDelete = async () => {
    try {
      const res = await deleteReply({
        userID,
        postID: id,
        commentID,
        replyID,
      });
      if (!res.error) {
        Toastify({
          text: "Reply deleted successfully",
          duration: 10000,
          newWindow: true,
          close: true,
          gravity: "top", // `top` or `bottom`
          position: "center", // `left`, `center` or `right`
          stopOnFocus: true, // Prevents dismissing of toast on hover
          style: {
            background: "#007fff",
            borderRadius: "10px",
            color: "white",
            fill: "white",
          },
          onClick: function () {}, // Callback after click
        }).showToast();
      }
    } catch (error) {
      Toastify({
        text: "Error While Deleting Reply",
        duration: 10000,
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "center", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "#007fff",
          borderRadius: "10px",
          color: "white",
          fill: "white",
        },
        onClick: function () {}, // Callback after click
      }).showToast();
    }
  };

  const getReplyID = (replyId) => {
    setIsReplyDelete(true);
    setReplyID(replyId);
  };

  return (
    <>
      <span className="d-flex ms-5">
        <p
          style={{
            fontWeight: isReply ? "bolder" : "",
            cursor: "pointer",
          }}
          onClick={() => setIsReply(!isReply)}
          className={style.commentReplybtn}
        >
          Reply
        </p>
      </span>
      {isReply && (
        <div
          className="d-flex flex-column gap-3 mb-3"
          style={{
            paddingLeft: "2.5rem",
          }}
        >
          <div className="d-flex gap-3">
            <div className="d-flex justify-content-center ps-3 p-0">
              <img
                src={itme?.profileImg}
                style={{
                  width: "3rem",
                  height: "3rem",
                  borderRadius: "50%",
                }}
                alt={profileImg}
                className={style.commentsProfileImg}
              />
            </div>
            <div
              className={`${style.commentInput} d-flex align-items-center px-1`}
            >
              <input
                type="text"
                placeholder="Reply..."
                style={{
                  width: "100%",
                  outline: "none",
                  border: "1px solid grey",
                  padding: "0.5rem 0rem 0.5rem 1rem",
                  borderRadius: "10px",
                }}
                value={replies}
                name="replies"
                onChange={(e) => setReplies(e.target.value)}
                className={style.commentInputField}
              />
              <button
                style={{
                  boxShadow: "none",
                }}
                className={style.commentInputBtn}
                onClick={replyOnComment}
              >
                Post
              </button>
            </div>
          </div>
        </div>
      )}
      <div
        className="d-flex flex-column gap-3"
        style={{
          paddingLeft: "2.5rem",
        }}
      >
        {/* Replies */}
        {itme.replies.map((replies, index) => (
          <div
            className="d-flex gap-3 ms-0 ps-3 mb-4"
            style={{ borderLeft: "solid 2px #007FFF", width: "99%" }}
            key={index}
          >
            <div
              className="d-flex justify-content-between p-0 "
              style={{
                width: "100%",
              }}
            >
              <div className={`${style.commentArea} d-flex gap-2`}>
                <img
                  src={replies.profileImg}
                  style={{
                    width: "3rem",
                    height: "3rem",
                    borderRadius: "50%",
                  }}
                  alt={replies.profileImg}
                  className={style.commentsProfileImg}
                />
                <div
                  style={{
                    width: "85%",
                  }}
                >
                  <p className={`${style.HomefeedDesc} pb-1 m-0`}>
                    {replies.username}
                  </p>
                  <p className={style.commentPara}>{replies.comments}</p>
                </div>
              </div>
              {userID === replies.userID && (
                <FontAwesomeIcon
                  icon={faTrash}
                  onClick={() => getReplyID(replies._id)}
                  style={{
                    marginRight: "3rem",
                    cursor: "pointer",
                  }}
                />
              )}
            </div>
          </div>
        ))}
      </div>
      {isReplyDelete && (
        <DeletePopup
          deleteFun={handleReplyDelete}
          setDeletePopup={setIsReplyDelete}
        />
      )}
    </>
  );
};

export default HomeReplies;
