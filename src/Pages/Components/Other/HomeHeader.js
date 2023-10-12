import React, { useState } from "react";
import {
  Col,
  Container,
  Form,
  Row,
  FormCheck,
  InputGroup,
} from "react-bootstrap";
import logo from "../../../assets/logo.png";
import styles from "./HomeHeader.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Toast from "react-bootstrap/Toast";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import profile_img from "../../../assets/profile_img.png";

function HomeHeader() {
  const [showA, setShowA] = useState(false);

  const toggleShowA = () => setShowA(!showA);

  const userData = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      <Container fluid>
        <Row className={styles.wrapper}>
          <Col md="4" className="d-flex align-items-center">
            <img src={logo} className={styles.logo} alt="logo" />
          </Col>
          <Col md="4">
            <Form>
              <Form.Group
                className={`mb-3 ${styles.inputFieldsWrap}`}
                controlId="formBasicEmail"
              >
                <InputGroup>
                  <InputGroup.Text className={styles.fieldIcon}>
                    <FontAwesomeIcon icon={faSearch} />
                  </InputGroup.Text>
                  <Form.Control
                    className={styles.fields}
                    type="text"
                    name="to"
                    placeholder="... Search"
                  />
                </InputGroup>
              </Form.Group>
            </Form>
          </Col>
          <Col md="4" className="d-flex justify-content-end flex-column">
            <div className="d-flex flex-row justify-content-end align-items-center text-end">
              <div
                style={{ position: "relative" }}
                className={styles.notificationWrapper}
              >
                <div style={{ position: "relative" }}>
                  <FontAwesomeIcon
                    onClick={toggleShowA}
                    icon={faBell}
                    className="fa-2x"
                  />
                  <div className={styles.notif_Counter}>8</div>

                  <div className={styles.toastsContainer}>
                    <Toast
                      show={showA}
                      className={styles.toasts}
                      onClose={toggleShowA}
                    >
                      <Toast.Header className="d-flex justify-content-between">
                        Notifications
                      </Toast.Header>
                      <Toast.Body>
                        Woohoo, you're reading this text in a Toast!
                      </Toast.Body>
                    </Toast>
                  </div>
                </div>
              </div>

              <div className="d-flex pe-4">
                <div>
                  <img src={profile_img} className={styles.profile_img} />
                </div>
                <div className="ps-3 d-flex flex-column justify-content-center align-items-start">
                  <h6 className={`fw-bold ${styles.profile_name}`}>
                    {userData?.user?.firstName + userData?.user?.lastName}
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

export default HomeHeader;
