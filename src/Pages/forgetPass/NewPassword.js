import React, { useState } from "react";
import styles from "../Login/Login.module.css";
import { Col, Container, Form, Row, InputGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import {
  useForget_passMutation,
  useLoginMutation,
} from "../../Redux/UserSlice/UserSlice";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import Toastify from "toastify-js";

const NewPassword = () => {
  const [fields, setFields] = useState({
    new_password: "",
    confirm_password: "",
  });

  const [show, setShow] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const otpcode = location?.state?.data?.user?.otpCode;
  const email = location?.state?.data?.user?.email;
  const fieldHandler = (e) => {
    setFields({ ...fields, [e.target.name]: e.target.value });
  };

  const [updatePass] = useForget_passMutation();

  const handleUpdatePass = async () => {
    try {
      if (fields.confirm_password !== fields.new_password) {
        Toastify({
          text: "Password Doesn't Match",
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
      } else {
        const res = await updatePass({
          email: email,
          otpCode: otpcode,
          password: fields.new_password,
        });
        if (!res.error) {
          Toastify({
            text: "Password updated successfully",
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
          navigate("/login");
        }
      }
    } catch (error) {
      Toastify({
        text: "Error While updating password",
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
  };

  const changeVisible = () => {
    setShow(!show);
  };
  return (
    <>
      {email ? (
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
                <h6 className="text-center py-2">GET STARTED</h6>
                <h3 className="text-center pb-3">Update Your Password</h3>
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
                          type={show ? "text" : "password"}
                          name="new_password"
                          value={fields.new_password}
                          className={styles.fields}
                          onChange={fieldHandler}
                          placeholder="New password"
                        />
                        <InputGroup.Text>
                          <FontAwesomeIcon
                            onClick={changeVisible}
                            icon={faEye}
                          />
                        </InputGroup.Text>
                      </InputGroup>
                    </Form.Group>
                  </Form>
                </Col>
              </Row>
              <Row>
                <Col md="12">
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
                          className={styles.fields}
                          type={show ? "text" : "password"}
                          name="confirm_password"
                          onChange={fieldHandler}
                          placeholder="Confirm Password"
                          value={fields.confirm_password}
                        />

                        <InputGroup.Text>
                          <FontAwesomeIcon
                            onClick={changeVisible}
                            icon={faEye}
                          />
                        </InputGroup.Text>
                      </InputGroup>
                    </Form.Group>
                  </Form>
                </Col>
                <button className="my-3" onClick={handleUpdatePass}>
                  Sumbit
                </button>
              </Row>
            </div>
          </div>
        </Container>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
};

export default NewPassword;
