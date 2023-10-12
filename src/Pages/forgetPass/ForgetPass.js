import React, { useState } from "react";
import styles from "../Login/Login.module.css";
import { Col, Container, Form, Row, InputGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from "react-router-dom";
import Toastify from "toastify-js";
import {
  useResendOtpMutation,
  useVerifyOtpMutation,
} from "../../Redux/UserSlice/UserSlice";

const ForgetPass = () => {
  const [fields, setFields] = useState({
    email: "",
  });
  console.log(fields.email);
  const fieldHandler = (e) => {
    setFields({ ...fields, [e.target.name]: e.target.value });
  };

  const [forgotPass] = useResendOtpMutation();

  const handlePass = async () => {
    try {
      const res = await forgotPass({
        email: fields.email,
      });
      if (!res.error) {
        Toastify({
          text: "Email verification succeeded",
          duration: 10000,
          newWindow: true,
          close: true,
          gravity: "top", // `top` or `bottom`
          position: "center", // `left`, `center` or `right`
          stopOnFocus: true, // Prevents dismissing of toast on hover
          style: {
            background: "#007fff",
            borderRadius: "10px",
            color: "white",
            fill: "white",
          },
          onClick: function () {}, // Callback after click
        }).showToast();
        console.log(res.data);
        navigate("/forget-password-verify-otp", { state: { data: res.data } });
      } else {
        console.log(res.error);
        Toastify({
          text: "Email verification failed",
          duration: 10000,
          newWindow: true,
          close: true,
          gravity: "top", // `top` or `bottom`
          position: "center", // `left`, `center` or `right`
          stopOnFocus: true, // Prevents dismissing of toast on hover
          style: {
            background: "#007fff",
            borderRadius: "10px",
            color: "white",
            fill: "white",
          },
          onClick: function () {}, // Callback after click
        }).showToast();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const navigate = useNavigate();

  return (
    <>
      <Container fluid className={styles.signupWrapper}>
        <Row>
          <Col className={styles.wrapper}>
            <h1 className={`text-center`}>
              Welcome To The <br /> Nextek
            </h1>
            <p className="text-center">
              Find thousand opportunities and ready to hire students.
            </p>
          </Col>
        </Row>
        <div className={`${styles.formWrapper}`}>
          <div className={styles.formCard}>
            <Row>
              <h3 className="text-center pb-3">Reset Your Password</h3>
            </Row>

            <Row>
              <Col md="12" className="">
                <Form>
                  <Form.Group
                    className={`mb-3 ${styles.inputFieldsWrap}`}
                    controlId="formBasicEmail"
                  >
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faUser} />
                      </InputGroup.Text>
                      <Form.Control
                        type="email"
                        name="email"
                        value={fields.email}
                        className={styles.fields}
                        onChange={fieldHandler}
                        placeholder="Email"
                      />
                    </InputGroup>
                  </Form.Group>
                </Form>
              </Col>
              <button className="my-3" onClick={handlePass}>
                Sumbit
              </button>
            </Row>

            <p
              className="text-center"
              role="button"
              onClick={() => navigate("/forget-password")}
            >
              Forget Password?
            </p>
          </div>
        </div>
      </Container>
    </>
  );
};

export default ForgetPass;
