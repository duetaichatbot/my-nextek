import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import ProfileMidTop from "../../../Profile/ProfileMid/ProfileMidComp/ProfileMidTop/ProfileMidTop";
import ProfileLeft from "../../../Profile/ProfileMid/ProfileMidComp/ProfileMidLeft/ProfileLeft";
import style from "./homeprofilemid.module.css";
// import { useNavigate } from "react-router-dom";
// import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const HomeProfileMid = ({ HomeProfileMidData }) => {
  return (
    <>
      <Container
        fluid
        style={{
          height: "89vh",
          overflowY: "scroll",
          overflowX: "hidden",
          padding: "0rem",
        }}
      >
        <ProfileMidTop isSwiper={false} data={HomeProfileMidData?.singleUser} />
        <Row
          style={{
            position: "relative",
            bottom: "4rem",
            padding: "0rem 1rem",
          }}
        >
          <Col lg="4">
            <ProfileLeft
              isMedia={false}
              isButton={true}
              data={HomeProfileMidData?.singleUser}
              loadingBar={false}
            />
          </Col>
          <Col lg="8" className="d flex justify-content-center">
            <div className={`${style.jobType} d-flex justify-content-center `}>
              <div
                className="profile_contacts"
                style={{
                  border: "1px solid grey",
                  borderRadius: "10px",
                }}
              >
                <span className="profile_contacts_city">
                  <p>City</p>
                  <p>{HomeProfileMidData?.singleUser?.city}</p>
                </span>
                <span className="profile_contacts_email">
                  <p>Email</p>
                  <p>{HomeProfileMidData?.singleUser?.email}</p>
                </span>
                <span className="profile_contacts_zip">
                  <p>Zip code</p>
                  <p>{HomeProfileMidData?.singleUser?.zipCode}</p>
                </span>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default HomeProfileMid;
