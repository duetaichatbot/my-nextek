import React from "react";
import style from "./profile.module.css";
import Header from "../Components/Other/Header";
import { Col, Container, Row } from "react-bootstrap";
import HomeLeft from "../Components/Home/HomeLeft";
import ProfileMid from "./ProfileMid/ProfileMid";

const Profile = () => {
  return (
    <div className={style.profileWrapper}>
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
          <Col lg="10" className={style.profileMidCol}>
            <ProfileMid />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Profile;
