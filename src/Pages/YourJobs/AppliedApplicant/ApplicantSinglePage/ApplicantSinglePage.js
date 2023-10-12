import React from "react";
import style from "./applicantsinglepage.module.css";
import { Col, Container, Row } from "react-bootstrap";
import ApplicantSinglePageMid from "./ApplicantSinglePageComp/ApplicantSinglePageMid";
import Header from "../../../Components/Other/Header";
import HomeLeft from "../../../Components/Home/HomeLeft";

const ApplicantSinglePage = () => {
  return (
    <>
      <div className={style.applicantSinglePageWrapper}>
        <Header />

        <Container fluid>
          <Row>
            <Col lg="3">
              <HomeLeft />
            </Col>
            <Col
              lg="9"
              className="d-flex justify-content-center align-items-center"
              style={{
                padding: "0rem",
              }}
            >
              <ApplicantSinglePageMid />
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default ApplicantSinglePage;
