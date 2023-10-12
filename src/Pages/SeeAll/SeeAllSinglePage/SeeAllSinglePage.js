import React from "react";
import style from "./SeeAllSinglePage.module.css";
import Header from "../../Components/Other/Header";
import { Col, Container, Row } from "react-bootstrap";
import HomeLeft from "../../Components/Home/HomeLeft";
import SeeAllSinglePageMid from "./SeeAllSinglePageMidComp/SeeAllSinglePageMid";
// import ApplicantSinglePageMid from "./ApplicantSinglePageComp/ApplicantSinglePageMid";

const SeeAllSinglePage = () => {
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
              <SeeAllSinglePageMid />
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default SeeAllSinglePage;
