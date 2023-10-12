import React from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
// import ThreeDotModal from "./ThreeDotModal";
// import DeleteYourJobs from "./DeleteYourJobs";
import EditYourJobsModal from "./EditYourJobsModal";

const EditYourJobsIcon = ({ item, isSharedPost = true, jobID }) => {
  const [isPopUp, setIsOpoup] = useState(false);
  return (
    <>
      <FontAwesomeIcon
        icon={faEllipsis}
        className="fa-lg w-auto"
        onClick={() => setIsOpoup(!isPopUp)}
        style={{
          cursor: "pointer",
          color: "black",
        }}
      />
      {isPopUp && (
        <EditYourJobsModal
          // postID={item?._id}
          // item={item}
          setIsOpoup={setIsOpoup}
          isSharedPost={isSharedPost}
        />
      )}
    </>
  );
};

export default EditYourJobsIcon;
