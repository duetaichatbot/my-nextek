import React from "react";
import style from "./appliedapplicant.module.css";
import { Col, Container, Row } from "react-bootstrap";
import Header from "../../Components/Other/Header";
import HomeLeft from "../../Components/Home/HomeLeft";
import AppliedApplicantMid from "./AppliedApplicantsComp/AppliedApplicantMid";
import { useParams } from "react-router-dom";
import { useGetApplicantsJobsQuery } from "../../../Redux/jobs/Jobs";

const AppliedApplicant = () => {
  const { id } = useParams();
  const getApplications = useGetApplicantsJobsQuery(id, {
    skip: !id,
  });

  const applicants = getApplications?.data;

  return (
    <div className={style.applicantWrapper}>
      <Header />

      <Container
        fluid
        style={{
          height: "89vh",
          overflowY: "hidden",
          overflowX: "hidden",
        }}
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
          <Col
            lg="10"
            className="d-flex justify-content-center align-items-center"
            style={{
              padding: "0rem",
            }}
          >
            <AppliedApplicantMid applicants={applicants} />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AppliedApplicant;
