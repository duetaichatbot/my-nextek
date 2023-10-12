import Header from "../Components/Other/Header";
import HomeLeft from "../Components/Home/HomeLeft";
import { Container, Row, Col } from "react-bootstrap";
import MyjobsMid from "./myjobsComps/MyjobsMid";
import { useState } from "react";
import style from "./myjobs.module.css";
// import FilterModal from "../Components/Modal/FilterModal";
import ApplyModal from "../Components/Modal/ApplyJobsModal/ApplyModal";

function Myjobs() {
  const [isJobOpen, setIsOpenJobs] = useState(false);
  return (
    <>
      <Header />
      <Container
        className={style.myjobContainer}
        fluid
        // style={{
        //   overflow: "hidden",
        //   height: "88vh",
        // }}
      >
        <Row>
          <Col
            lg="2"
            style={{
              boxShadow: "1px 1px 5px -1px grey",
            }}
          >
            <HomeLeft />
          </Col>

          <Col lg="10">
            <MyjobsMid setIsOpenJobs={setIsOpenJobs} />
          </Col>
        </Row>
        {isJobOpen && (
          <div className={style.modalDiv}>
            <span className={style.modalSpan}>
              <ApplyModal setIsOpenJobs={setIsOpenJobs} />
            </span>
          </div>
        )}
      </Container>
    </>
  );
}

export default Myjobs;
