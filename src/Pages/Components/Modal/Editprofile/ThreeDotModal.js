import React from "react";
// import style from "./editprofile.module.css";
import { useState } from "react";
import style from "./editprofile.module.css";
import EditPostModal from "./EditPostModal";
import DeletePopup from "../../DeletePopup/DeletePopup";
import { useDeletePostMutation } from "../../../../Redux/posts/Posts";
import { useRemoveSharedPostsMutation } from "../../../../Redux/share/Share";
import Toastify from "toastify-js";

const ThreeDotModal = ({ item, setIsOpoup, postID, isSharedPost }) => {
  const [isEditPost, setIsEditPost] = useState(false);
  const [isDeletePost, setIsDeletePost] = useState(false);
  const [isRemoveShared, setIsRemoveShared] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const userID = user?.user?._id;
  const autherID = item?.authorID[0];

  // delete post
  const [deletePost] = useDeletePostMutation();

  const handleDelete = async () => {
    try {
      const res = await deletePost({ userID: userID, postID: postID });
      if (!res.error) {
        Toastify({
          text: "Post Delete Successfully",
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
        text: "Error While Deleting Post",
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

  // remove shared post
  const [deleteShared] = useRemoveSharedPostsMutation();
  const deleteSharedPost = async () => {
    try {
      const res = await deleteShared({ userID: userID, postID: postID });
      if (!res.error) {
        Toastify({
          text: "Post Shared Successfully",
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
  return (
    <div>
      <div
        style={{
          width: "auto",
        }}
        className={style.EditProfileWrapper}
      >
        {userID === autherID ? (
          <>
            <p
              className={style.EditProfileButton}
              onClick={() => {
                setIsEditPost(true);
                // setIsOpoup(false);
              }}
            >
              <span
                style={{
                  textTransform: "capitalize",
                }}
              >
                Edit
              </span>{" "}
              Post
            </p>

            <p
              className={style.EditProfileButton}
              onClick={() => setIsDeletePost(true)}
            >
              <span
                style={{
                  textTransform: "capitalize",
                }}
              >
                Delete
              </span>{" "}
              Post
            </p>
          </>
        ) : null}
        {isSharedPost && (
          <p
            className={style.EditProfileButton}
            onClick={() => setIsRemoveShared(true)}
          >
            <span
              style={{
                textTransform: "capitalize",
              }}
            >
              Remove
            </span>{" "}
            Shared Post
          </p>
        )}
      </div>

      {isEditPost && (
        <div className={style.modalDiv}>
          <span className={style.modalSpan}>
            <EditPostModal
              setIsEditPost={setIsEditPost}
              item={item}
              setIsOpoup={setIsOpoup}
            />
          </span>
        </div>
      )}
      {isDeletePost && (
        <div className={style.modalDiv}>
          <span className={style.modalSpan}>
            <DeletePopup
              deleteFun={handleDelete}
              setDeletePopup={setIsDeletePost}
            />
          </span>
        </div>
      )}
      {isRemoveShared && (
        <div className={style.modalDiv}>
          <span className={style.modalSpan}>
            <DeletePopup
              deleteFun={deleteSharedPost}
              setDeletePopup={setIsRemoveShared}
            />
          </span>
        </div>
      )}
    </div>
  );
};

export default ThreeDotModal;
