import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import style from "./homecommentsMid.module.css";
import { Container, Row } from "react-bootstrap";
import { useState } from "react";
import {
  useDeleteCommentsMutation,
  useGetCommentQuery,
  usePostCommentMutation,
  useSinglePostQuery,
} from "../../../../Redux/posts/Posts";
import { Swiper, SwiperSlide } from "swiper/react";
import { DefaultPlayer as Video } from "react-html5video";
import "react-html5video/dist/styles.css";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import DeletePopup from "../../../Components/DeletePopup/DeletePopup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import HomeReplies from "./HomeReplies";

const HomecommentsMid = () => {
  const [isCommentDelete, setIsCommentDelete] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const userData = JSON.parse(localStorage.getItem("user"));
  const userID = userData.user._id;
  const profileImg = userData.user?.profileImg;
  const [comments, setComments] = useState("");
  const [commentID, setCommentID] = useState("");

  const singlePost = useSinglePostQuery(id, { skip: !id });
  const [deleteComments] = useDeleteCommentsMutation();
  const [postComment] = usePostCommentMutation();
  const getComment = useGetCommentQuery(id, { skip: !id });

  const handleCommentsDelete = async () => {
    try {
      const res = await deleteComments({
        userID,
        postID: id,
        commentID,
      });
      if (!res.error) {
        // alert("Comment deleted successfully");
        Toastify({
          text: "Comment deleted successfully",
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
        text: "Error While Deleting Comment",
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

  const getCommentID = (id) => {
    setIsCommentDelete(true);
    setCommentID(id);
  };

  const commentOnPost = async () => {
    if (comments !== "") {
      try {
        const { data } = await postComment({ postId: id, userID, comments });

        if (data) {
          Toastify({
            text: "Comment Posted Successfully",
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
          setComments("");
        }
      } catch (error) {
        Toastify({
          text: "Error While Posting Comment",
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
      // alert("Comment Field Is Required");
      Toastify({
        text: "Comment Field Is Required",
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

  const breakpoints = {
    320: {
      slidesPerView: 1,
      spaceBetween: 10,
    },
    480: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 1,
      spaceBetween: 30,
    },
    1024: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
  };

  return (
    <>
      <Container className={style.HomeFeedwrapper} fluid>
        <div
          className={style.homefeedmain}
          style={{
            overflow: "hidden",
          }}
        >
          <span>
            <button
              className={`${style.commentbackBTN} w-auto`}
              onClick={() => navigate("/")}
              style={{
                boxShadow: "none",
                margin: "0rem 0rem 1rem 0rem",
              }}
            >
              BACK
            </button>
          </span>
          <Row
            md="9"
            className={style.Postprofile}
            style={{
              position: "relative",
            }}
          >
            <span className="w-auto d-flex align-items-center gap-2">
              <img
                src={singlePost?.data?.user?.profileImg}
                className={style.profilePic}
                alt={singlePost?.data?.user?.profileImg}
              />
              <h5 className="w-auto">
                {singlePost?.data?.user?.firstName +
                  " " +
                  singlePost?.data?.user?.lastName}
              </h5>
            </span>
          </Row>
          <Row>
            {singlePost?.data?.post?.imageUrls.length !== 0 &&
            !singlePost?.data?.post?.videoUrls ? (
              <>
                <Row>
                  <p className="py-2">{singlePost?.data?.post?.content}</p>
                </Row>
                <Swiper breakpoints={breakpoints}>
                  {singlePost?.data?.post?.imageUrls.map((img, index) => (
                    <Row key={index}>
                      <SwiperSlide key={index}>
                        <div
                          style={{
                            overflow: "hidden",
                          }}
                        >
                          <img
                            alt="home page"
                            style={{
                              height: "30rem",
                              width: "90%",
                              objectFit: "cover",
                            }}
                            src={img}
                            className="py-1"
                          />
                        </div>
                      </SwiperSlide>
                    </Row>
                  ))}
                </Swiper>
              </>
            ) : singlePost?.data?.post?.videoUrls &&
              singlePost?.data?.post?.imageUrls.length === 0 ? (
              <div>
                <Row>
                  <p className="py-2">{singlePost?.data?.post?.content}</p>
                </Row>
                <Video
                  // muted
                  controls={[
                    "PlayPause",
                    "Seek",
                    "Time",
                    "Volume",
                    "Fullscreen",
                  ]}
                  style={{
                    height: "30rem",
                  }}
                >
                  <source
                    src={singlePost?.data?.post?.videoUrls}
                    type="video/mp4"
                  />
                  <track
                    label="English"
                    kind="subtitles"
                    srcLang="en"
                    src={singlePost?.data?.post?.videoUrls}
                    default
                  />
                </Video>
              </div>
            ) : (
              <Row>
                <p className="py-2">{singlePost?.data?.post?.content}</p>
              </Row>
            )}
          </Row>

          <div
            className={style.line}
            style={{
              width: "100%",
              height: "1px",
              backgroundColor: "grey",
              margin: "1rem 0rem",
            }}
          ></div>

          {/**************** Comments ************/}
          <div className="d-flex gap-2 align-items-center">
            <div className="d-flex justify-content-center p-0">
              <img
                src={profileImg}
                style={{
                  width: "3rem",
                  height: "3rem",
                  borderRadius: "50%",
                }}
                alt={profileImg}
                className={profileImg}
              />
            </div>
            <div
              className={`${style.commentInput} d-flex align-items-center px-1`}
            >
              <input
                type="text"
                value={comments}
                name="comments"
                onChange={(e) => setComments(e.target.value)}
                placeholder="Comments..."
                style={{
                  width: "100%",
                  outline: "none",
                  border: "1px solid grey",
                  padding: "0.5rem 0rem 0.5rem 1rem",
                  borderRadius: "10px",
                }}
                className={style.commentInputField}
              />
              <button
                style={{
                  boxShadow: "none",
                }}
                onClick={commentOnPost}
                className={style.commentInputBtn}
              >
                Post
              </button>
            </div>
          </div>

          {getComment?.data?.map((itme, index) => (
            <>
              <div className="d-flex gap-3" key={index}>
                <div className="d-flex gap-3 w-100" style={{ width: "100%" }}>
                  <div className="w-100">
                    <div
                      className="d-flex align-items-start justify-content-between"
                      style={{
                        width: "100%",
                      }}
                    >
                      <div className={`${style.replyArea} d-flex`}>
                        <img
                          src={itme.profileImg}
                          style={{
                            width: "3rem",
                            height: "3rem",
                            borderRadius: "50%",
                          }}
                          alt={itme.profileImg}
                          className={style.commentsProfileImg}
                        />
                        <div
                          className="ps-2 d-flex justify-content-center flex-column"
                          style={{
                            width: "85%",
                          }}
                        >
                          <p className={`${style.HomefeedDesc} m-0`}>
                            {itme.username}
                          </p>

                          <p className={style.commentPara}>{itme.comments}</p>
                        </div>
                      </div>
                      {userID === itme.userID && (
                        <FontAwesomeIcon
                          icon={faTrash}
                          onClick={() => getCommentID(itme._id)}
                          style={{
                            marginRight: "2rem",
                            cursor: "pointer",
                          }}
                        />
                      )}
                    </div>
                    <HomeReplies
                      id={id}
                      userID={userID}
                      commentID={itme._id}
                      itme={itme}
                    />
                  </div>
                </div>
              </div>
            </>
          ))}
        </div>
        {isCommentDelete && (
          <DeletePopup
            deleteFun={handleCommentsDelete}
            setDeletePopup={setIsCommentDelete}
          />
        )}
      </Container>
    </>
  );
};

export default HomecommentsMid;
