import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import ProfileMidTop from "../../../../Profile/ProfileMid/ProfileMidComp/ProfileMidTop/ProfileMidTop";
import style from "./DiscussionProfileMid.module.css";
import ProfileLeft from "../../../../Profile/ProfileMid/ProfileMidComp/ProfileMidLeft/ProfileLeft";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const DiscussionProfileMid = () => {
  const navigate = useNavigate();
  return (
    <Container
      fluid
      style={{
        height: "89vh",
        overflowY: "scroll",
        overflowX: "hidden",
        padding: "0rem",
      }}
    >
      <p
        style={{
          //   paddingBottom: "4rem",
          display: "flex",
          gap: "0.5rem",
          alignItems: "center",
          cursor: "pointer",
        }}
        className={style.singleprofileBack}
        onClick={() => navigate("/discussion")}
      >
        <FontAwesomeIcon icon={faArrowLeft} />
        Back
      </p>
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
  );
};

export default DiscussionProfileMid;
