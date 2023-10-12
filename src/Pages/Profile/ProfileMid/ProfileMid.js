import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import ProfileMidTop from "./ProfileMidComp/ProfileMidTop/ProfileMidTop";
// import HomeFeed from "../../Components/Home/HomeFeed";
import ProfileMidRight from "./ProfileMidComp/ProfileMidRight/ProfileMidRight";
import style from "./profilemid.module.css";
import ProfileLeft from "./ProfileMidComp/ProfileMidLeft/ProfileLeft";


const ProfileMid = () => {
  return (
    <Container fluid>
      <ProfileMidTop />
      <Row
        style={{ position: "relative", bottom: "4rem" }}
        className={style.profileMidRow}
      >
        <Col lg="4" className={style.ProfileMidLeftCol}>
          <ProfileLeft />
        </Col>
        <Col lg="8" className={style.ProfileMidRightCol}>
          <ProfileMidRight />
        </Col>
      </Row>
    </Container>
  );
};

export default ProfileMid;
