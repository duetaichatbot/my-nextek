import { Col, Container, Row } from "react-bootstrap";
import styles from "./myjobsmid.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function FetchJobs({ jobObj, selectedJob, handleJobClick }) {
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(4);

  const navigate = useNavigate();

  const previewProduct = () => {
    if (start === 0) {
      setStart(start);
      setEnd(end);
    } else {
      setStart(start - 4);
      setEnd(end - 4);
    }
  };

  const nextProduct = () => {
    if (end >= jobObj.length) {
      setStart(start);
      setEnd(end);
    } else {
      setStart(start + 4);
      setEnd(end + 4);
    }
  };
  console.log(jobObj);
  return (
    <Container className={styles.fetchJobsContainer}>
      {jobObj?.length === 0 ? (
        <>
          <div className={`${styles.messageContainer}`}>
            <p className={`${styles.message}`}>Currently No Job Available</p>
            <button onClick={() => navigate("/create-jobs")}>
              Click Here To Create Job
            </button>
          </div>
        </>
      ) : (
        <Row className={styles.fetchJobs}>
          {jobObj?.slice(start, end)?.map((item, i) => (
            <Col
              xxl="6"
              className={`${styles.jobsCardsWrapper} py-2 d-flex flex-wrap wrap flex-column`}
              key={i}
            >
              <div>
                <button
                  className={`${styles.card} ${
                    selectedJob === item.id ? styles.showData : ""
                  }`}
                  onClick={() => handleJobClick(item)}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "1rem",
                      padding: "1rem",
                      alignItems: "self-start",
                    }}
                    className={styles.cardDiv}
                  >
                    <img
                      width="120px"
                      height="100px"
                      alt="job"
                      src={item.companyImg}
                      className={styles.companyImg}
                    />
                    <h4
                      style={{
                        fontWeight: "bold",
                        color: "black",
                        textTransform: "capitalize",
                        marginBottom: "0rem",
                      }}
                    >
                      {item.companyName}
                    </h4>
                    <p
                      style={{
                        textAlign: "start",
                        textTransform: "capitalize",
                        color: "#999FA9",
                        marginBottom: "0rem",
                      }}
                      className={styles.fetchJobsPara}
                      dangerouslySetInnerHTML={{
                        __html: item.jobDesc,
                      }}
                    ></p>
                    <div
                      className={`${styles.requirements} d-flex justify-content-evenly w-100`}
                    >
                      <p className={styles.requiremens}>{item.jobType[0]}</p>
                      <p className={styles.requiremens}>{item.jobExp[0]}</p>
                    </div>

                    <h2
                      className="fw-bold m-0"
                      style={{
                        color: "black",
                      }}
                    >
                      ${item.salaryPerYear}
                      <span
                        className={`h5 ${styles.salary}`}
                        style={{
                          color: "#999FA9",
                        }}
                      >
                        / Year
                      </span>
                    </h2>
                  </div>
                </button>
              </div>
            </Col>
          ))}
          <div
            className={`py-4 d-flex justify-content-between`}
            style={{
              width: "85%",
            }}
          >
            <button
              className={styles.paginationBtn}
              onClick={previewProduct}
              // onClick={() => setCurrentPage(currentPage - 1)}
            >
              Prev
            </button>
            <button
              className={styles.paginationBtn}
              onClick={nextProduct}
              // onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next
            </button>
          </div>
        </Row>
      )}
    </Container>
  );
}

export default FetchJobs;
