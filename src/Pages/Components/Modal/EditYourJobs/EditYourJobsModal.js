import React from "react";
import { useState } from "react";
import style from "./editYourJobs.module.css";
// import DeleteYourJobs from "./DeleteYourJobs";

const EditYourJobsModal = ({ setIsOpoup }) => {
  const [isDeletePost, setIsDeletePost] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <div>
      <div
        style={{
          width: "auto",
        }}
        className={style.EditProfileWrapper}
      >
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
          Job
        </p>
      </div>
    </div>
  );
};

export default EditYourJobsModal;
