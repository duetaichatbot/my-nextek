import { Col, Container, Row } from "react-bootstrap";
import { useState } from "react";
import SelectedJob from "./SelectedJob";
import FetchJobs from "./FetchJobs";
import { useGetAllJobsQuery } from "../../../Redux/jobs/Jobs";
import style from "./myjobsmid.module.css";

function MyjobsMid({ setIsOpenJobs }) {
  const getAllJobs = useGetAllJobsQuery();

  const jobs = getAllJobs?.data?.allJobs;

  const [selectedJob, setSelectedJob] = useState(null);

  const handleJobClick = (job) => {
    setSelectedJob(job);
  };

  return (
    <>
      <Container
        className={style.MyjobsMidContainer}
        fluid
        style={{
          height: "87vh",
          overflowY: "scroll",
          marginTop: "2rem",
          paddingBottom: "2rem",
        }}
      >
        <div className="">
          <Row className="w-100">
            <Col>
              <FetchJobs
                jobObj={jobs}
                handleJobClick={handleJobClick}
                selectedJob={selectedJob}
              />
            </Col>
            <Col
              lg="6"
              style={{
                padding: "0rem",
              }}
              className={style.Selected_job_main}
            >
              <SelectedJob
                job={selectedJob}
                setIsOpenJobs={setIsOpenJobs}
                availableJobs={jobs}
              />
            </Col>
          </Row>
        </div>
      </Container>
    </>
  );
}

export default MyjobsMid;
