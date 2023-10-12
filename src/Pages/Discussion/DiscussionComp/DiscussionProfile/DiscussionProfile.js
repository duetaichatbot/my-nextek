import React from "react";
import Header from "../../../Components/Other/Header";
import { Col, Container, Row } from "react-bootstrap";
import HomeLeft from "../../../Components/Home/HomeLeft";
import DiscussionProfileMid from "./DiscussionProfileMid/DiscussionProfileMid";
import { useParams } from "react-router-dom";

const DiscussionProfile = () => {
  const { id } = useParams();
  return (
    <div>
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
              <DiscussionProfileMid />
            </Col>
          </Row>
        </Container>
      </>
    </div>
  );
};

export default DiscussionProfile;
