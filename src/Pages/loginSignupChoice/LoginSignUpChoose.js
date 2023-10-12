import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import styles from "../loginSignupChoice/LoginSignUpChoose.module.css";
import { useNavigate } from "react-router-dom";

function LoginSignUpChoose() {
  const navigate = useNavigate();

  return (
    <>
      <Container fluid>
        <Row className={`${styles.container}`}>
          <Col
            md="6"
            role="button"
            onClick={() => navigate("/sign-up-dealer")}
            className={styles.column1}
          >
            <h1 className={`text-center ${styles.choiceText}`}>
              Sign up
              <br />
              As A Professional
            </h1>
          </Col>
          <Col
            md="6"
            role="button"
            onClick={() => navigate("/sign-up-student")}
            className={`${styles.column2}`}
          >
            <h1 className={`text-center ${styles.choiceText}`}>
              Sign up
              <br />
              As A Student
            </h1>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default LoginSignUpChoose;
