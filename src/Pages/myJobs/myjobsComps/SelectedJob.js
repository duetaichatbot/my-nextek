import React from "react";
import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import ApplyModal from "../../Components/Modal/ApplyJobsModal/ApplyModal";
import style from "./myjobsmid.module.css";

function SelectedJob({ job, availableJobs }) {
  const [isJobOpen, setIsOpenJobs] = useState(false);

  return (
    <>
      {job !== null ? (
        <Container className={style.SelectedJobContainer}>
          <>
            <Row>
              <Col>
                <div className="text-center">
                  <img
                    src={job?.companyImg}
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
                  {job?.jobName}
                </h4>
                <h5
                  style={{
                    textTransform: "capitalize",
                    color: "#626973",
                    borderBottom: "1px solid darkgrey",
                  }}
                  className="text-center pt-1 pb-3"
                >
                  {job?.companyName}
                </h5>
                <div
                  className="text-start mt-4"
                  dangerouslySetInnerHTML={{ __html: job?.jobDesc }}
                ></div>

                {job?.qualification && (
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
                  dangerouslySetInnerHTML={{ __html: job?.qualification }}
                ></div>
                {job?.responsibilites && (
                  <h6 className="pt-2 pb-3">Responsibility :</h6>
                )}
                <div
                  dangerouslySetInnerHTML={{ __html: job?.responsibilites }}
                ></div>
              </Col>
            </Row>
            <button onClick={() => setIsOpenJobs(true)} className="mt-3 w-100">
              Apply Jobs
            </button>
            {isJobOpen && (
              <div className={style.modalDiv}>
                <span className={style.modalSpan}>
                  <ApplyModal setIsOpenJobs={setIsOpenJobs} jobID={job._id} />
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
            <button onClick={() => setIsOpenJobs(true)} className="mt-3 w-100">
              Apply Jobs
            </button>
            {isJobOpen && (
              <div className={style.modalDiv}>
                <span className={style.modalSpan}>
                  <ApplyModal
                    setIsOpenJobs={setIsOpenJobs}
                    jobID={availableJobs[0]?._id}
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
