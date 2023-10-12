import React from "react";
import styles from "./profilemidright.module.css";
import { Container, Row } from "react-bootstrap";
import likeIcon from "../../../../../assets/like.svg";
import commentIcon from "../../../../../assets/comment.svg";
import { useNavigate } from "react-router-dom";
import { useLikeMutation } from "../../../../../Redux/posts/Posts";
import { Swiper, SwiperSlide } from "swiper/react";
import EditIcon from "../../../../Components/Modal/Editprofile/EditIcon";
import { useGetSharedPostsQuery } from "../../../../../Redux/share/Share";
import { useState } from "react";
import { useEffect } from "react";
import Toastify from "toastify-js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDesktop, faHeart } from "@fortawesome/free-solid-svg-icons";

import { DefaultPlayer as Video } from "react-html5video";
import "react-html5video/dist/styles.css";

const ProfileMidRight = () => {
  const [isUpdatePost, setIsUpdatePost] = useState(false);
  const userData = JSON.parse(localStorage.getItem("user"));
  const userId = userData?.user?._id;
  const sharedPost = useGetSharedPostsQuery(userId, { skip: !userId });
  const [like] = useLikeMutation();

  const navigate = useNavigate();

  useEffect(() => {}, [isUpdatePost]);

  const onLike = async (postID) => {
    try {
      const res = await like({ userID: userId, postID: postID });
      if (!res.error) {
        sharedPost.refetch();
      }
      if (res.error) {
        Toastify({
          text: "Error While Liking This Post",
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
        text: "Error While Liking This Post",
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
      <div className={styles.feedWrapper}>
        <h3
          style={{
            fontWeight: "700",
            position: "relative",
          }}
        >
          Shared Profile
        </h3>
        <Container className="d-flex flex-column gap-4">
          {sharedPost?.data?.sharedPosts.length > 0 ? (
            <>
              {sharedPost?.data?.sharedPosts?.map((item, index) => (
                <div className={`${styles.postWrapper} py-3`} key={index + 1}>
                  <Row md="9" className={styles.Postprofile}>
                    <span className="w-auto d-flex align-items-center gap-2">
                      <img
                        alt="home page"
                        src={item?.user?.profileImg}
                        className={styles.postImage}
                      />
                      <h5 className="w-auto">
                        {item?.user?.firstName + " " + item?.user?.lastName}
                      </h5>
                    </span>
                    <EditIcon
                      isUpdatePost={isUpdatePost}
                      setIsUpdatePost={setIsUpdatePost}
                      item={item.post}
                    />
                  </Row>
                  {item?.post?.imageUrls?.length !== 0 &&
                  !item?.post?.videoUrls ? (
                    <>
                      <Row>
                        <p className="py-2">{item?.post?.content}</p>
                      </Row>
                      <Swiper breakpoints={breakpoints}>
                        {item?.post?.imageUrls?.map((img, index) => (
                          <Row key={index + 1}>
                            <SwiperSlide key={index + 1}>
                              <div>
                                <img
                                  alt="home page"
                                  style={{
                                    height: "30rem",
                                    width: "100%",
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
                  ) : item?.post?.videoUrls &&
                    item?.post?.imageUrls?.length === 0 ? (
                    <div>
                      <Row>
                        <p className="py-2">{item?.post?.content}</p>
                      </Row>
                      {console.log(
                        item?.post?.videoUrls,
                        "item item item item"
                      )}

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
                        <source src={item?.post?.videoUrls} type="video/mp4" />
                        <track
                          label="English"
                          kind="subtitles"
                          srcLang="en"
                          src={item?.post?.videoUrls}
                          default
                        />
                      </Video>
                    </div>
                  ) : (
                    <Row>
                      <p className="py-2" key={index + 1}>
                        {item?.post?.content}
                      </p>
                    </Row>
                  )}

                  <div className="pt-1 pb-1 d-flex gap-4 align-items-center">
                    <div
                      onClick={() => navigate(`/comments/${item?.post?._id}`)}
                      style={{ cursor: "pointer" }}
                    >
                      <div className="d-flex align-items-center gap-1">
                        <img
                          alt="home page"
                          src={commentIcon}
                          className={`${styles.icons} pt-1`}
                        />
                        <p className=" m-0">
                          {item?.post?.comments?.length}
                          <span className={`ps-1 ${styles.iconName}`}>
                            Comments
                          </span>
                        </p>
                      </div>
                    </div>

                    {item?.post?.likes?.some(
                      (like) => like.userID === userId
                    ) ? (
                      <div>
                        <div
                          onClick={() => onLike(item?.post?._id)}
                          className="d-flex align-items-center gap-1"
                          style={{
                            cursor: "pointer",
                          }}
                        >
                          <FontAwesomeIcon
                            icon={faHeart}
                            style={{ color: "#f02828", fontSize: "1.5rem" }}
                            className="pt-1"
                          />
                          <div>
                            <p className="m-0">
                              {item?.post?.likes?.length}{" "}
                              <span className={`ps-1 ${styles.iconName}`}>
                                Likes
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div
                          onClick={() => onLike(item?.post?._id)}
                          className="d-flex align-items-center gap-1"
                          style={{
                            cursor: "pointer",
                          }}
                        >
                          <img
                            alt="home page"
                            src={likeIcon}
                            className="pt-1"
                          />
                          <div>
                            <p className="m-0">
                              {item?.post?.likes?.length}{" "}
                              <span className={`ps-1 ${styles.iconName}`}>
                                Likes
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </>
          ) : (
            <div
              className={`${styles.postWrapper} `}
              style={{
                paddingBottom: "3rem",
                paddingTop: "3rem",
                marginTop: "25%",
              }}
            >
              <Row className="d-flex justify-content-center">
                <span className="d-flex w-auto align-items-center flex-column gap-3">
                  <FontAwesomeIcon
                    icon={faDesktop}
                    style={{
                      fontSize: "3rem",
                    }}
                  />
                  <p
                    className="m-0"
                    style={{
                      fontWeight: "700",
                    }}
                  >
                    No Shared Post Available
                  </p>
                </span>
              </Row>
            </div>
          )}
        </Container>
      </div>
    </>
  );
};

export default ProfileMidRight;
