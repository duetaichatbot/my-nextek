import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import style from "./applicantsinglepagemid.module.css";
// import { useNavigate } from "react-router-dom";
// import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProfileMidTop from "../../../../Profile/ProfileMid/ProfileMidComp/ProfileMidTop/ProfileMidTop";
import ProfileLeft from "../../../../Profile/ProfileMid/ProfileMidComp/ProfileMidLeft/ProfileLeft";

const ApplicantSinglePageMid = () => {
  // const navigate = useNavigate();
  return (
    <>
      <Container
        fluid
        style={{
          height: "89vh",
          overflowY: "scroll",
          overflowX: "hidden",
          padding: "0rem",
        }}
      >
        <ProfileMidTop isSwiper={false} />
        <Row
          style={{
            position: "relative",
            bottom: "4rem",
            padding: "0rem 1rem",
          }}
        >
          <Col lg="4">
            <ProfileLeft isMedia={false} />
          </Col>
          <Col lg="8" className="d flex justify-content-center">
            <div className={`${style.jobType} d-flex justify-content-center `}>
              <div
                className="d-flex"
                style={{
                  border: "1px solid grey",
                  borderRadius: "10px",
                }}
              >
                <span>
                  <p>Job Type</p>
                  <p>Full Time</p>
                </span>
                <span>
                  <p>Experience</p>
                  <p>Min.1 Year</p>
                </span>
                <span>
                  <p>Month Salary</p>
                  <p>$200</p>
                </span>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ApplicantSinglePageMid;
