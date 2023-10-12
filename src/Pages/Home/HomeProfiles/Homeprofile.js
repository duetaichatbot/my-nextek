import React from "react";
import Header from "../../Components/Other/Header";
import { Col, Container, Row } from "react-bootstrap";
import HomeLeft from "../../Components/Home/HomeLeft";
import HomeProfileMid from "./HomeProfileComp/HomeProfileMid";
import style from "./homeprofile.moduel.css";
import { useParams } from "react-router-dom";
import { useGetSingleUserQuery } from "../../../Redux/UserSlice/UserSlice";

const Homeprofile = () => {
  const { id } = useParams();

  const getSingleUser = useGetSingleUserQuery(id, {
    skip: !id,
  });

  return (
    <div className={style.homeprofileWrapper}>
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
            <HomeProfileMid HomeProfileMidData={getSingleUser.data} />
          </Col>
        </Row>
      </Container>
    </div>
  );
};


export default Homeprofile;