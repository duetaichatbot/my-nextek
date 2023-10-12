// import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useState } from "react";
import { Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Swiper, SwiperSlide } from "swiper/react";
import gallery from "../../../../assets/gallery.svg";
import video from "../../../../assets/video.svg";
import { DefaultPlayer as Video } from "react-html5video";
import "react-html5video/dist/styles.css";
import { useUpdatePostMutation } from "../../../../Redux/posts/Posts";
import Toastify from "toastify-js";
import ListLoader from "../../Loader/ListLoader";

const EditPostModal = ({ setIsEditPost, setIsOpoup, item }) => {
  const [isEditContent, setIsEditContent] = useState(item.content);
  // eslint-disable-next-line
  const [galleryImages, setGalleryImages] = useState([]);
  // eslint-disable-next-line
  const [postVideo, setPostVideo] = useState("");

  const postID = item?._id;
  const user = JSON.parse(localStorage.getItem("user"));
  const userID = user?.user?._id;

  const [updatePost, { isLoading }] = useUpdatePostMutation();

  const showToast = (text) => {
    Toastify({
      text,
      duration: 10000,
      newWindow: true,
      close: true,
      gravity: "top",
      position: "center",
      stopOnFocus: true,
      style: {
        background: "#007fff",
        borderRadius: "10px",
        color: "white",
        fill: "white",
      },
      onClick: function () {},
    }).showToast();
  };

  const handleUpdate = async () => {
    let formData = new FormData();
    formData.append("content", isEditContent);

    if (galleryImages.length > 0) {
      galleryImages.forEach((image) => {
        formData.append("imageUrls", image);
      });
    }

    if (postVideo) {
      formData.append("videoUrls", postVideo);
    }

    try {
      const res = await updatePost({
        userID,
        postID,
        data: formData,
      });

      if (!res.error) {
        showToast("Post Updated successfully");
        setIsEditPost(false);
        setIsOpoup(false);
      }
    } catch (error) {
      showToast("Error While Updating Post");
    }
  };

  const onChangeGalleryImage = (e) => {
    const files = e.target.files;
    const fileArray = Array.from(files);

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
    <div
      className="modal show"
      style={{ display: "block", position: "initial" }}
    >
      <Modal.Dialog>
        <Modal.Header
          closeButton
          onClick={() => {
            setIsEditPost(false);
            setIsOpoup(false);
          }}
        >
          <Modal.Title>Edit Post</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <h4 className="m-0" style={{ fontWeight: "bolder" }}>
            Edit content
          </h4>
          <div className="w-100 mt-3">
            <input
              type="text"
              style={{
                border: "none",
                outline: "none",
                borderRadius: "10px",
                width: "100%",
              }}
              value={isEditContent}
              onChange={(e) => setIsEditContent(e.target.value)}
            />
          </div>
          {item?.imageUrls.length !== 0 && !item.videoUrls ? (
            <Swiper breakpoints={breakpoints} className="mt-3">
              {item?.imageUrls?.map((img, index) => (
                <React.Fragment key={index + 1}>
                  <Row>
                    <SwiperSlide>
                      <div>
                        <img
                          alt="home page"
                          style={{ height: "100%", width: "100%" }}
                          src={img}
                          className="py-1"
                        />
                      </div>
                    </SwiperSlide>
                  </Row>
                </React.Fragment>
              ))}
            </Swiper>
          ) : item.videoUrls ? (
            <Video
              // muted
              controls={["PlayPause", "Seek", "Time", "Volume", "Fullscreen"]}
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
          ) : (
            ""
          )}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "0rem 1rem",
            }}
          >
            <label
              className="ps-3 mt-2 d-flex gap-2 align-items-center w-auto"
              style={{
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              <img alt="home page" src={gallery} style={{ width: "35px" }} />
              <input
                type="file"
                onChange={onChangeGalleryImage}
                name="imageUrls"
                id="imageUpload"
                multiple="multiple"
                accept="image/png, image/jpeg"
                style={{ display: "none" }}
              />
              Edit Image
              {galleryImages.length > 0 && (
                <p className="m-0 d-flex gap-1">
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
            </label>
            <label
              className="ps-3 mt-2 d-flex gap-2 align-items-center w-auto"
              style={{
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
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
              <img alt="home page" src={video} style={{ width: "35px" }} />
              <input
                type="file"
                onChange={onChangeVideo}
                id="videoUpload"
                accept="video/*"
                style={{ display: "none" }}
              />
              Edit Video
            </label>
          </div>
        </Modal.Body>

        <Modal.Footer>
          {isLoading ? (
            <ListLoader />
          ) : (
            <Button variant="primary" onClick={handleUpdate}>
              Save changes
            </Button>
          )}
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  );
};

export default EditPostModal;
