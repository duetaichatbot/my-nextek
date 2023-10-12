import React from "react";
// import EditProfile from "./EditProfile";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
// import EditProfileThreeDots from "./ThreeDotModal";
// import EditProfileModal from "./EditPostModal";
// import style from "./editprofile.module.css";
import ThreeDotModal from "./ThreeDotModal";
// import { useEffect } from "react";
// import EditPostModal from "./EditPostModal";

const EditIcon = ({
  item,
  isSharedPost = true,
  setIsUpdatePost,
  isUpdatePost,
}) => {
  const [isPopUp, setIsOpoup] = useState(false);

  const handlePopupUpadate = () => {
    setIsOpoup(!isPopUp);
    setIsUpdatePost(!isUpdatePost);
  };

  return (
    <>
      <FontAwesomeIcon
        icon={faEllipsis}
        className="fa-lg w-auto"
        onClick={handlePopupUpadate}
        style={{
          cursor: "pointer",
        }}
      />
      {isPopUp && (
        <ThreeDotModal
          postID={item?._id}
          item={item}
          setIsOpoup={setIsOpoup}
          isSharedPost={isSharedPost}
        />
      )}
    </>
  );
};

export default EditIcon;
