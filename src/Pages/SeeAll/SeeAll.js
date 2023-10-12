import React from "react";
import Header from "../Components/Other/Header";
import { Col, Container, Row } from "react-bootstrap";
import HomeLeft from "../Components/Home/HomeLeft";
import style from "./seeall.module.css";
import SeeAllMid from "./SeeAllComp/SeeAllMid";

const SeeAll = () => {
  return (
    <div className={style.seeallWrapper}>
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
              paddingLeft: "1.5rem",
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
            <SeeAllMid />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SeeAll;
