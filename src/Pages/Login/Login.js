import React, { useState } from "react";
import styles from "./Login.module.css";
import { Col, Container, Form, Row, InputGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { useLoginMutation } from "../../Redux/UserSlice/UserSlice";
import { useNavigate } from "react-router-dom";
import Toastify from "toastify-js";

function Login() {
  const [fields, setFields] = useState({
    email: "",
    password: "",
  });

  const [show, setShow] = useState(false);

  const navigate = useNavigate();

  // eslint-disable-next-line
  const [login, { isLoading, isError }] = useLoginMutation();

  const fieldHandler = (e) => {
    setFields({ ...fields, [e.target.name]: e.target.value });
  };

  const onSubmit = async () => {
    if (fields.email !== "" && fields.password !== "") {
      try {
        const res = await login(fields);
        if (res?.data?.status === 200) {
          Toastify({
            text: "Login successfully",
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
          setFields({
            email: "",
            password: "",
          });
          localStorage.setItem("user", JSON.stringify(res.data));
          navigate("/");
        }
        // Nullify the fields object after successful submission
      } catch (error) {
        Toastify({
          text: "Error While Loign",
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
    } else {
      // alert("All Fields Are Required");
      Toastify({
        text: "All Fields Are Required",
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
              <h3 className="text-center pb-3">
                Apply for Million Chance <br /> to Get Dreams Job
              </h3>
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
                        name="password"
                        onChange={fieldHandler}
                        placeholder="Password"
                        value={fields.password}
                      />

                      <InputGroup.Text>
                        <FontAwesomeIcon onClick={changeVisible} icon={faEye} />
                      </InputGroup.Text>
                    </InputGroup>
                  </Form.Group>
                </Form>
              </Col>
              <button onClick={onSubmit} className="my-3">
                Login
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
}

export default Login;
