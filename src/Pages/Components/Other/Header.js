import React, { useState } from "react";
import { Alert, Col, Container, Row } from "react-bootstrap";
import img from "../../../assets/logo.png";
import styles from "./header.module.css";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import logo from "../../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import SideBar from "../SideBar/SideBar";
import myContext from "../../Context/Context";
import { useContext } from "react";

function Header() {
  // console.log(warning);
  const [openSidebar, setOpenSidebar] = useState(false);
  const [showA, setShowA] = useState(false);
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("user"));
  const about = userData?.user?.about;
  const phone = userData?.user?.phone;
  const initialWarningState =
    about !== undefined && phone !== undefined ? false : true;
  const { warning, warningTrue, warningFalse } = useContext(myContext);
  const toggleShowA = () => setShowA(!showA);
  console.log(initialWarningState, warning);

  if (initialWarningState) {
    warningTrue();
  } else {
    warningFalse();
  }
  console.log(warning);
  return (
    <>
      <Container fluid className={styles.mobileHeader}>
        <Row className="py-3">
          <Col xs="8">
            <img src={img} alt="profile" width="150px" />
          </Col>
          <Col xs="2" className="text-end pe-4">
            <div className="d-flex flex-row justify-content-end align-items-center text-end">
              <div
                style={{ position: "relative" }}
                className={styles.notificationWrapper2}
              >
                <div
                  style={{ position: "relative" }}
                  onClick={() => navigate("/notification")}
                >
                  <FontAwesomeIcon
                    onClick={toggleShowA}
                    icon={faBell}
                    role="button"
                    className={`${styles.mobileBell} fa-2x`}
                    style={{ color: "#7c7979b2" }}
                  />
                  {/* <div className={styles.notif_Counter2}>8</div> */}
                </div>
              </div>
            </div>
          </Col>

          <Col
            xs="2"
            className="text-end ps-3"
            onClick={() => {
              setOpenSidebar(!openSidebar);
            }}
          >
            <FontAwesomeIcon
              className={`${styles.mobileBars} fa-2x`}
              icon={faBars}
              role="button"
            />
          </Col>
        </Row>
        <div>{openSidebar && <SideBar />}</div>
      </Container>

      <Container
        fluid
        className={styles.pc}
        style={{
          borderBottom: "1px solid #e7e2e2",
          boxShadow: "1px 1px 9px -5px grey",
        }}
      >
        <Row className={styles.wrapper}>
          <Col md="4" className="d-flex align-items-center">
            <img
              src={logo}
              className={styles.logo}
              alt="logo"
              onClick={() => navigate("/newsfeed")}
              style={{ cursor: "pointer" }}
            />
          </Col>
          <Col md="4">
            {warning ? (
              <Alert key={"warning"} variant={"warning"}>
                Please Complete Your Interest Card First
              </Alert>
            ) : (
              ""
            )}
          </Col>
          <Col md="4" className="d-flex justify-content-end flex-column">
            <div className="d-flex flex-row justify-content-end align-items-center text-end">
              <div
                style={{ position: "relative" }}
                className={styles.notificationWrapper}
                onClick={() => navigate("/notification")}
              >
                <div style={{ position: "relative" }}>
                  <FontAwesomeIcon
                    onClick={toggleShowA}
                    icon={faBell}
                    className="fa-2x"
                    style={{ cursor: "pointer", color: "#7c7979b2s" }}
                  />
                  <div
                    className={styles.notif_Counter}
                    onClick={() => navigate("/notification")}
                    style={{ cursor: "pointer" }}
                  >
                    8
                  </div>
                </div>
              </div>

              <div
                className="d-flex pe-3"
                style={{ cursor: "pointer" }}
                onClick={() => navigate(`/profile/${userData.user._id}`)}
              >
                <div>
                  <img
                    alt="profile"
                    src={userData?.user?.profileImg}
                    className={styles.profile_img}
                  />
                </div>
                <div
                  className={`${styles.headeruserdata} d-flex flex-column justify-content-center align-items-start`}
                >
                  <h6 className={`fw-bold ${styles.profile_name}`}>
                    {userData?.user?.firstName + " " + userData?.user?.lastName}
                  </h6>
                  <p className={styles.profile_mail}>{userData?.user?.email}</p>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Header;
