import React from "react";
import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import style from "./myjobsmid.module.css";
import { useNavigate } from "react-router-dom";
import {
  useDeleteJobsMutation,
  useSingleJobQuery,
} from "../../../Redux/jobs/Jobs";
import DeletePopup from "../../Components/DeletePopup/DeletePopup";
import Toastify from "toastify-js";

function SelectedJob({ job, availableJobs }) {
  const [jobID, setJobID] = useState("");
  const [isJobExpire, setJobExpire] = useState(false);
  const navigate = useNavigate();
  const jobId = job?._id;

  const singleJobAPI = useSingleJobQuery(jobId, {
    skip: !jobId,
  });

  // expire jobs
  const [deleteJob] = useDeleteJobsMutation();

  const handleJobID = (id) => {
    setJobID(id);
    setJobExpire(true);
  };

  const handleDeleteJobs = async () => {
    try {
      const res = await deleteJob({ jobID: jobId });
      if (!res.error) {
        Toastify({
          text: "Job Has Been Deleted Successfully",
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
        window.location.reload(false);
      }
    } catch (error) {
      Toastify({
        text: "Error While Deleting Job",
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

  const handleDeleteSingleJobs = async () => {
    try {
      const res = await deleteJob({ jobID: jobID });
      if (!res.error) {
        Toastify({
          text: "Job Has Been Deleted Successfully",
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
        window.location.reload(false);
      }
    } catch (error) {
      Toastify({
        text: "Error While Deleting Job",
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

  const singleJob = singleJobAPI?.data?.singleJob;

  return (
    <>
      {job !== null ? (
        <Container className={style.SelectedJobContainer}>
          <>
            <Row>
              <Col>
                <div className="text-center">
                  <img
                    src={singleJob?.companyImg}
                    style={{
                      borderRadius: "50%",
                      backgroundSize: "contain",
                    }}
                    alt="job"
                    width="200px"
                    height="200px"
                    className={style.SelectedJobImg}
                  />
                </div>
                <h4
                  className={`text-center ${style.SelectedJobName} `}
                  style={{
                    textTransform: "capitalize",
                  }}
                >
                  {singleJob?.jobName}
                </h4>
                <h5
                  style={{
                    textTransform: "capitalize",
                    color: "#626973",
                    borderBottom: "1px solid darkgrey",
                  }}
                  className="text-center pt-1 pb-3"
                >
                  {singleJob?.companyName}
                </h5>
                <div
                  className="text-start mt-4"
                  dangerouslySetInnerHTML={{ __html: singleJob?.jobDesc }}
                ></div>

                {singleJob?.qualification && (
                  <h6
                    className="pt-2 pb-3"
                    style={{
                      fontWeight: "bolder",
                      fontSize: "1.3rem",
                    }}
                  >
                    Qualifications :
                  </h6>
                )}
                <div
                  dangerouslySetInnerHTML={{ __html: singleJob?.qualification }}
                ></div>
                {singleJob?.responsibilites && (
                  <h6
                    className="pt-2 pb-3"
                    style={{
                      fontWeight: "bolder",
                      fontSize: "1.3rem",
                    }}
                  >
                    Responsibility :
                  </h6>
                )}
                <div
                  dangerouslySetInnerHTML={{
                    __html: singleJob?.responsibilites,
                  }}
                ></div>
              </Col>
            </Row>
            <div className="d-flex gap-5 pe-5 ps-5">
              <button
                onClick={() => navigate(`/applied-applicant/${singleJob?._id}`)}
                className="mt-3 w-100"
              >
                View Applicants
              </button>
              <button onClick={() => setJobExpire(true)} className="mt-3 w-100">
                Expire Job
              </button>
            </div>
            {isJobExpire && (
              <div className={style.modalDiv}>
                <span className={style.modalSpan}>
                  <DeletePopup
                    deleteFun={handleDeleteJobs}
                    setDeletePopup={setJobExpire}
                  />
                </span>
              </div>
            )}
          </>
        </Container>
      ) : availableJobs && availableJobs.length > 0 ? (
        <Container className={style.SelectedJobContainer}>
          <>
            <Row>
              <Col>
                <div className="text-center">
                  <img
                    src={availableJobs[0]?.companyImg}
                    style={{
                      borderRadius: "50%",
                      backgroundSize: "contain",
                    }}
                    alt="job"
                    width="200px"
                    height="200px"
                    className={style.SelectedJobImg}
                  />
                </div>
                <h4
                  className={`text-center ${style.SelectedJobName} `}
                  style={{
                    textTransform: "capitalize",
                  }}
                >
                  {availableJobs[0]?.jobName}
                </h4>
                <h5
                  style={{
                    textTransform: "capitalize",
                    color: "#626973",
                    borderBottom: "1px solid darkgrey",
                  }}
                  className="text-center pt-1 pb-3"
                >
                  {availableJobs[0]?.companyName}
                </h5>
                <div
                  className="text-start mt-4"
                  dangerouslySetInnerHTML={{
                    __html: availableJobs[0]?.jobDesc,
                  }}
                ></div>

                {availableJobs[0]?.qualification && (
                  <h6
                    className="pt-2 pb-3"
                    style={{
                      fontWeight: "bolder",
                      fontSize: "1.3rem",
                    }}
                  >
                    Qualifications :
                  </h6>
                )}
                <div
                  dangerouslySetInnerHTML={{
                    __html: availableJobs[0]?.qualification,
                  }}
                ></div>
                {availableJobs[0]?.responsibilites && (
                  <h6 className="pt-2 pb-3">Responsibility :</h6>
                )}
                <div
                  dangerouslySetInnerHTML={{
                    __html: availableJobs[0]?.responsibilites,
                  }}
                ></div>
              </Col>
            </Row>
            <div className={`${style.buttons} d-flex gap-5`}>
              <button
                onClick={() =>
                  navigate(`/applied-applicant/${availableJobs[0]?._id}`)
                }
                className="mt-3 w-100"
              >
                View Applicants
              </button>
              <button
                onClick={() => handleJobID(availableJobs[0]?._id)}
                className="mt-3 w-100"
              >
                Expire Job
              </button>
            </div>
            {isJobExpire && (
              <div className={style.modalDiv}>
                <span className={style.modalSpan}>
                  <DeletePopup
                    deleteFun={handleDeleteSingleJobs}
                    setDeletePopup={setJobExpire}
                  />
                </span>
              </div>
            )}
          </>
        </Container>
      ) : null}
    </>
  );
}

export default SelectedJob;
