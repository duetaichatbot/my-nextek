import React from "react";
// import styles from "./createJob.module.css";
import { Col, Container, Row } from "react-bootstrap";
import HomeLeft from "../Components/Home/HomeLeft";
import JobForm from "../Components/CreateJobForm/JobForm";
import Header from "../Components/Other/Header";

function CreateJobs() {
  return (
    <>
      <Header />
      <Container fluid>
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
            <JobForm />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default CreateJobs;
