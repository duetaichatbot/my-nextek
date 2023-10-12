import React, { useState } from "react";
import { Container, Col, Row } from "react-bootstrap";
import HomecommentsMid from "./Homecommentscomp/HomecommentsMid";
import HomeLeft from "../../Components/Home/HomeLeft";
import Header from "../../Components/Other/Header";

const Homecomments = () => {
  return (
    <>
      <Container fluid>
        <Header />
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
            <HomecommentsMid />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Homecomments;
