import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import style from "./notification.module.css";
import NotificationMid from "./NotificationMid/NotificationMid";
import HomeLeft from "../Components/Home/HomeLeft";
import Header from "../Components/Other/Header";

function Notification() {
  return (
    <>
      <div className={style.NotificationWrapper}>
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
            <Col
              style={{
                marginTop: "2rem",
                height: "87vh",
                overflowY: "scroll",
                paddingBottom: "6rem",
              }}
              lg="10"
            >
              <NotificationMid />
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default Notification;
