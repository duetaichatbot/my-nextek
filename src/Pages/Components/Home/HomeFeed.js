import React, { useState } from "react";
import styles from "./homefeed.module.css";
import { Col, Container, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import gallery from "../../../assets/gallery.svg";
import video from "../../../assets/video.svg";
import { DefaultPlayer as Video } from "react-html5video";
import "react-html5video/dist/styles.css";
import {
  faDesktop,
  faHeart,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import shareIcon from "../../../assets/share.svg";
import likeIcon from "../../../assets/like.svg";
import commentIcon from "../../../assets/comment.svg";
// import savedIcon from "../../../assets/saved.svg";
import { useNavigate } from "react-router-dom";
import {
  useCreatePostMutation,
  useGetAllPostsQuery,
  useLikeMutation,
} from "../../../Redux/posts/Posts";
import { Swiper, SwiperSlide } from "swiper/react";
import { useShareMutation } from "../../../Redux/share/Share";
import EditIcon from "../Modal/Editprofile/EditIcon";
// import Swal from "sweetalert2";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import ListLoader from "../Loader/ListLoader";

function HomeFeed() {
  const [isUpdatePost, setIsUpdatePost] = useState(false);

  const userData = JSON.parse(localStorage.getItem("user"));
  const autherName = userData?.user?.firstName + " " + userData?.user?.lastName;
  const userId = userData?.user?._id;

  const navigate = useNavigate();

  const date = new Date();

  const options = {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };

  const [createPost, { isLoading }] = useCreatePostMutation();
  const formattedDate = `Today ${date.toLocaleString("en-US", options)}`;

  const [postContent, setPostContent] = useState("");

  const [galleryImages, setGalleryImages] = useState([]);

  const [postVideo, setPostVideo] = useState("");

  const handlePost = async () => {
    try {
      const id = userData?.user?._id;
      const formData = new FormData();
      if (galleryImages.length > 0 && postVideo === "") {
        formData.append("content", postContent);
        galleryImages.forEach((image, index) => {
          formData.append("imageUrls", image, image.name);
        });
        setPostVideo("");
      } else if (galleryImages.length === 0 && postVideo !== "") {
        formData.append("content", postContent);
        formData.append("videoUrls", postVideo);
      } else {
        formData.append("content", postContent);
        setPostVideo("");
        setGalleryImages([]);
      }
      const res = await createPost({ userID: id, data: formData });

      if (!res.error) {
        // "post Created successfully");
        Toastify({
          text: "post Created successfully",
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
        setPostContent("");
        setGalleryImages([]);
        setPostVideo("");
      }
    } catch (error) {
      Toastify({
        text: "Error While Creating Post",
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

  const onChangeGalleryImage = (e) => {
    const files = e.target.files;
    const fileArray = Array.from(files); // Convert FileList to an array

    if (fileArray?.length <= 3) {
      setPostVideo("");
      setGalleryImages(fileArray);
    } else {
      // alert("You can't select more than 3 images");
      Toastify({
        text: "You can't select more than 3 images",
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

  const onChangeVideo = (e) => {
    setGalleryImages([]);
    setPostVideo(e.target.files[0]);
  };

  const allPosts = useGetAllPostsQuery();
  // console.log(allPosts?.data?.allPosts);
  const [share] = useShareMutation();
  const [like] = useLikeMutation();

  const onShare = async (postID) => {
    try {
      const res = await share({
        userId: userId,
        postID: postID,
      });

      if (!res.error) {
        Toastify({
          text: "Post shared successfully",
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
        text: "Error While Sharing Post",
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

  const onLike = async (postID) => {
    try {
      const res = await like({ userID: userId, postID: postID });
    } catch (error) {
      Toastify({
        text: "Error While Like This Post",
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

  const emptyContent = () => {
    Toastify({
      text: "Add some content",
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

  console.log(allPosts?.data, "sdfsfsf");
  return (
    <>
      <div className={`${styles.feedWrapper} mt-5`}>
        <Container
          fluid
          style={{
            padding: "0rem",
          }}
        >
          <Row>
            <Col xs="12">
              <div>
                <h1 className={styles.welcomeh1}>
                  Welcome Home,{" "}
                  <span className={styles.feedName}>
                    {userData?.user?.firstName}
                  </span>
                </h1>
                <h4 className={styles.welcomeh4}>{formattedDate}</h4>
                {/* <button className="px-3" onClick={onClick}>
                  LOGOUT
                </button> */}
              </div>
            </Col>
          </Row>
        </Container>

        <Container className={`pt-3 ${styles.contentWrapper}`}>
          <Row>
            <Col xs="12">
              <div
                className="d-flex align-items-center"
                style={{
                  border: "1px solid #d3cdcd",
                  borderRadius: "5px",
                }}
              >
                <Form.Control
                  className={styles.postField}
                  name="postContent"
                  value={postContent}
                  onChange={(e) => setPostContent(e.target.value)}
                  size="lg"
                  type="text"
                  placeholder="What's On Your Mind?"
                />
                {isLoading === true ? (
                  <ListLoader />
                ) : postContent !== "" ? (
                  <FontAwesomeIcon
                    icon={faPaperPlane}
                    className={`fa-lg px-4 ${styles.postComment}`}
                    onClick={handlePost}
                    role="button"
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faPaperPlane}
                    className={`fa-lg px-4 ${styles.postComment}`}
                    onClick={emptyContent}
                    role="button"
                  />
                )}
              </div>
            </Col>
          </Row>
          <Row className="py-3 d-flex align-items-center justify-content-around">
            <Col xs="4" className="text-center">
              <label
                htmlFor="imageUpload"
                style={{ color: "var(--btn-color)", cursor: "pointer" }}
              >
                <div className="d-flex justify-content-center align-items-center">
                  <img
                    alt="home page"
                    src={gallery}
                    style={{ width: "35px" }}
                    className={styles.contentIcons}
                  />
                  <h6 className="ps-3 pt-1">Photos</h6>
                  {galleryImages.length > 0 && (
                    <p className="m-0 ms-3 d-flex gap-1">
                      (
                      <p
                        className="m-0"
                        style={{
                          fontWeight: "bolder",
                        }}
                      >
                        {galleryImages.length}
                      </p>{" "}
                      Image Selected)
                    </p>
                  )}
                </div>
              </label>
              <input
                type="file"
                onChange={onChangeGalleryImage}
                name="imageUrls"
                id="imageUpload"
                multiple="multiple"
                accept="video/png/jpeg*"
                style={{ display: "none" }}
              />
            </Col>
            <Col xs="4" className="text-center">
              <label
                htmlFor="videoUpload"
                style={{ color: "var(--btn-color)", cursor: "pointer" }}
              >
                <div className="d-flex justify-content-start align-items-center">
                  <img
                    alt="home page"
                    src={video}
                    style={{ width: "35px" }}
                    className={styles.contentIcons}
                  />
                  <h6 className="ps-3 pt-1">Video</h6>
                  {postVideo !== "" && (
                    <p className="m-0 ms-3 d-flex gap-1">
                      <p
                        className="m-0"
                        style={{
                          fontWeight: "bolder",
                        }}
                      ></p>
                      (Video Selected)
                    </p>
                  )}
                </div>
              </label>
              <input
                type="file"
                onChange={onChangeVideo}
                id="videoUpload"
                name="postVideo"
                accept="video/*"
                style={{ display: "none" }}
              />
            </Col>
          </Row>
        </Container>
        <Container className="p-0 d-flex flex-column gap-4">
          {allPosts.isLoading ? (
            <h3 className="text-primary text-center">Loading posts...</h3>
          ) : allPosts?.data?.allPosts?.length > 0 ? (
            <>
              {allPosts?.data?.allPosts?.map((item, index) => (
                <div className={`${styles.postWrapper} py-3`} key={item._id}>
                  {item.mergedAuthor.map((name, i) => (
                    <Row
                      md="9"
                      className={styles.Postprofile}
                      style={{
                        position: "relative",
                      }}
                      key={index}
                    >
                      <span className="w-auto d-flex align-items-center gap-2">
                        <img
                          alt="home page"
                          src={name?.profileImg}
                          className={styles.postImage}
                        />
                        <div>
                          <h5 className="w-auto m-0">
                            {name?.firstName + " " + name?.lastName}
                          </h5>
                          {name?.company ? (
                            <div className="d-flex align-items-center gap-1">
                              <strong>Company Name | </strong>
                              <p className="w-auto m-0">{name.company}</p>
                            </div>
                          ) : (
                            <p className="m-0">Student</p>
                          )}
                        </div>
                      </span>
                      {userId === item?.authorID?.[0]?._id ? (
                        <EditIcon
                          item={item}
                          isSharedPost={false}
                          isUpdatePost={isUpdatePost}
                          setIsUpdatePost={setIsUpdatePost}
                        />
                      ) : null}
                    </Row>
                  ))}
                  {item.imageUrls?.length !== 0 && !item.videoUrls ? (
                    <>
                      <Row>
                        <p className="py-2">{item?.content}</p>
                      </Row>
                      <Swiper breakpoints={breakpoints}>
                        {item.imageUrls.map((img, index) => (
                          <Row key={index}>
                            <SwiperSlide key={index}>
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
                  ) : item.videoUrls && item.imageUrls.length === 0 ? (
                    <>
                      <Row>
                        <p className="py-2">{item.content}</p>
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
                        <source src={item.videoUrls} type="video/mp4" />
                        <track
                          label="English"
                          kind="subtitles"
                          srcLang="en"
                          src={item.videoUrls}
                          default
                        />
                      </Video>
                    </>
                  ) : (
                    <Row>
                      <p className="py-2">{item.content}</p>
                    </Row>
                  )}

                  <div className="pt-1 pb-1 d-flex gap-4 align-items-center">
                    <div
                      onClick={() => navigate(`/comments/${item._id}`)}
                      style={{ cursor: "pointer" }}
                    >
                      <div className="d-flex align-items-center gap-1">
                        <img
                          alt="home page"
                          src={commentIcon}
                          className={`${styles.icons} pt-1`}
                        />
                        <p className=" m-0">
                          {item.comments.length}
                          <span className={`ps-1 ${styles.iconName}`}>
                            Comments
                          </span>
                        </p>
                      </div>
                    </div>

                    {item.likes.some((like) => like.userID === userId) ? (
                      <div>
                        <div
                          onClick={() => onLike(item._id)}
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
                              {item.likes.length}{" "}
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
                          onClick={() => onLike(item._id)}
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
                              {item.likes.length}{" "}
                              <span className={`ps-1 ${styles.iconName}`}>
                                Likes
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    <div>
                      <div
                        className={` d-flex align-items-center gap-1`}
                        onClick={() => onShare(item._id)}
                        style={{
                          cursor: "pointer",
                        }}
                      >
                        <img
                          alt="home page"
                          src={shareIcon}
                          className={`${styles.icons} pt-1`}
                        />

                        <div>
                          <p className=" m-0">
                            <span className={`ps-1 ${styles.iconName}`}>
                              Share
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div
                className={`${styles.postWrapper} `}
                style={{
                  paddingBottom: "3rem",
                  paddingTop: "3rem",
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
                      There Is No More Post Available
                    </p>
                  </span>
                </Row>
              </div>
            </>
          ) : (
            <div
              className={`${styles.postWrapper} `}
              style={{
                paddingBottom: "3rem",
                paddingTop: "3rem",
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
                    No Post Available
                  </p>
                </span>
              </Row>
            </div>
          )}
        </Container>
      </div>
    </>
  );
}

export default HomeFeed;
