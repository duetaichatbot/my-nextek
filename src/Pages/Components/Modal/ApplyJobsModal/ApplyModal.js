import Card from "react-bootstrap/Card";
import style from "./applymodal.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import styles from "./applymodal.module.css";
import { useApplyForJobMutation } from "../../../../Redux/jobs/Jobs";
import { useState } from "react";
import Toastify from "toastify-js";

const ApplyModal = ({ setIsOpenJobs, jobID }) => {
  const userData = JSON.parse(localStorage.getItem("user"));
  const applicantID = userData.user._id;

  const [cv, setCv] = useState();

  const cvUploadHandler = (e) => {
    const files = e.target.files[0];
    setCv(files);
  };
  console.log(cv);
  const [applyForJob, { isLoading }] = useApplyForJobMutation();

  const onApply = async () => {
    try {
      const formData = new FormData();

      formData.append("cv", cv);

      const res = await applyForJob({ applicantID, jobID, data: formData });
      if (!res.error) {
        // alert("Application Sent");
        Toastify({
          text: "Application Sent",
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
        setIsOpenJobs(false);
      }
    } catch (error) {
      Toastify({
        text: "Error While Application Sending",
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

  const emptyCv = () => {
    Toastify({
      text: "Please Upload your CV First",
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

  return (
    <>
      <Card
        style={{
          padding: "5rem",
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "35px",
          backgroundColor: "rgb(243 243 243)",
        }}
      >
        <h1
          style={{
            fontWeight: "bold",
          }}
        >
          Apply Job
        </h1>
        <button className={style.searchFilterBackButton}>
          <FontAwesomeIcon
            icon={faCircleXmark}
            onClick={() => setIsOpenJobs(false)}
            style={{
              color: "#007fff",
              fontSize: "1.5rem",
              cursor: "pointer",
            }}
          />
        </button>

        <span className="d-flex flex-column gap-2">
          <label htmlFor="resume" className={styles.uploadResume}>
            Upload Your Updated Resume Here
            <input
              type="file"
              name="cv"
              accept="application/pdf"
              onChange={cvUploadHandler}
              id="resume"
              style={{ display: "none" }}
            />
          </label>
        </span>
        {cv !== undefined ? (
          <button
            style={{
              width: "10rem",
              borderRadius: "10px",
            }}
            onClick={
              isLoading
                ? () => {
                    Toastify({
                      text: "CV is already uploading...",
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
                : onApply
            }
            className={style.searchFilterButton}
          >
            {isLoading ? "Uploading CV..." : "Apply"}
          </button>
        ) : (
          <button
            style={{
              width: "10rem",
              borderRadius: "10px",
            }}
            onClick={emptyCv}
            className={style.searchFilterButton}
          >
            Apply
          </button>
        )}
      </Card>
    </>
  );
};

export default ApplyModal;
