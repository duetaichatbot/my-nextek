import React, { useState } from "react";
import styles from "./Student.module.css";
import { Col, Container, Form, Row, InputGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { useRegisterStudentMutation } from "../../Redux/UserSlice/UserSlice";
import { Link, useNavigate } from "react-router-dom";
import { useGetInstituteQuery } from "../../Redux/institute/Institute";
import Toastify from "toastify-js";

function Student() {
  const getInstitute = useGetInstituteQuery();

  // eslint-disable-next-line
  const [formType, setFormType] = useState(false);

  const [fields, setFields] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    institute: "",
    state: "",
    city: "",
    zipCode: "",
    email: "",
    password: "",
    role: "Student",
  });

  const [cPass, setCPass] = useState("");

  const navigate = useNavigate();

  // eslint-disable-next-line
  const [registerStudent, { isLoading, isError }] =
    useRegisterStudentMutation();

  // const toggleFormType = () => {
  //   setFormType(!formType);
  // };

  const onCpass = (e) => {
    setCPass(e.target.value);
  };

  const fieldHandler = (e) => {
    setFields({ ...fields, [e.target.name]: e.target.value });
  };

  const onSubmit = async () => {
    if (
      fields.firstName !== "" &&
      fields.lastName !== "" &&
      // fields.company !== "" &&
      fields.state !== "" &&
      fields.city !== "" &&
      fields.zipCode !== "" &&
      fields.institute !== "" &&
      fields.email !== "" &&
      fields.password !== "" &&
      fields.password === cPass
    ) {
      try {
        const res = await registerStudent(fields);
        if (res?.data?.status === 200) {
          Toastify({
            text: "Signup successfully",
            duration: 3000,
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
            firstName: "",
            lastName: "",
            phone: "",
            institute: "",
            state: "",
            city: "",
            zipCode: "",
            email: "",
            password: "",
          });

          navigate("/verify-otp", {
            state: {
              email: fields.email,
              userID: res.data.user._id,
              role: res.data.user.role[0],
            },
          });
        }
        // Nullify the fields object after successful submission
      } catch (error) {
        Toastify({
          text: "Error While Signup",
          duration: 3000,
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
    } else if (fields.password !== cPass) {
      // alert("Passwords should be the same");
      Toastify({
        text: "Passwords should be the same",
        duration: 3000,
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
      // alert("All Fields Are Required");
      Toastify({
        text: "All Fields Are Required",
        duration: 3000,
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

  return (
    <>
      <Container
        fluid
        className={
          formType === false ? styles.signupWrapper : styles.signupWrapper2
        }
      >
        <Row>
          <Col className={styles.wrapper}>
            <h1 className={`text-center`}>
              Welcome To The <br /> MyNextek
            </h1>
            <p className="text-center">
              Find thousand opportunities and ready to hire students.
            </p>
          </Col>
        </Row>
        <div className={`${styles.formWrapper}`}>
          <div className={styles.formCard}>
            <Row>
              <h6 className="text-center py-3">GET STARTED</h6>
              <h3 className="text-center pb-3">
                Apply for Million Chance <br /> to Get Dreams Job
              </h3>
            </Row>

            <Row>
              <Col md="6" className="">
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
                        type="text"
                        name="firstName"
                        value={fields.firstName}
                        className={styles.fields}
                        onChange={fieldHandler}
                        placeholder="First Name"
                      />
                    </InputGroup>
                  </Form.Group>
                </Form>
              </Col>
              <Col md="6" className="">
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
                        name="lastName"
                        value={fields.lastName}
                        onChange={fieldHandler}
                        type="text"
                        placeholder="Last Name"
                      />
                    </InputGroup>
                  </Form.Group>
                </Form>
              </Col>
            </Row>
            <Row>
              {/* <Col md="6">
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
                        type="text"
                        name="company"
                        onChange={fieldHandler}
                        value={fields.company}
                        placeholder="Company"
                      />
                    </InputGroup>
                  </Form.Group>
                </Form>
              </Col> */}
              <Col md="6">
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
                        type="text"
                        value={fields.state}
                        name="state"
                        onChange={fieldHandler}
                        placeholder="State"
                      />
                    </InputGroup>
                  </Form.Group>
                </Form>
              </Col>
              <Col md="6">
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
                        type="text"
                        value={fields.city}
                        onChange={fieldHandler}
                        name="city"
                        placeholder="City"
                      />
                    </InputGroup>
                  </Form.Group>
                </Form>
              </Col>
            </Row>
            <Row>
              <Col md="6">
                <Form>
                  <Form.Group
                    className={`mb-3 ${styles.inputFieldsWrap}`}
                    controlId="formBasicEmail"
                  >
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faUser} />
                      </InputGroup.Text>
                      <Form.Select
                        className={styles.dropdown}
                        aria-label="Select Institution/University"
                        onChange={fieldHandler}
                        name="institute"
                        value={fields.institute}
                      >
                        <option value="" disabled selected>
                          Select
                        </option>
                        {getInstitute?.data?.data?.map((item) => (
                          <option key={item._id} value={item._id}>
                            {item.institute}
                          </option>
                        ))}
                      </Form.Select>
                    </InputGroup>
                  </Form.Group>
                </Form>
              </Col>
              <Col md="6">
                <InputGroup>
                  <InputGroup.Text>
                    <FontAwesomeIcon icon={faUser} />
                  </InputGroup.Text>
                  <Form.Control
                    className={styles.fields}
                    type="text"
                    value={fields.zipCode}
                    onChange={fieldHandler}
                    name="zipCode"
                    placeholder="Zip Code"
                  />
                </InputGroup>
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
                        type="email"
                        name="email"
                        value={fields.email}
                        onChange={fieldHandler}
                        placeholder="Email"
                      />
                    </InputGroup>
                  </Form.Group>
                </Form>
              </Col>
            </Row>
            <Row>
              <Col md="6" className="">
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
                        type="text"
                        name="password"
                        onChange={fieldHandler}
                        value={fields.password}
                        placeholder="Create Password"
                      />

                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faEye} />
                      </InputGroup.Text>
                    </InputGroup>
                  </Form.Group>
                </Form>
              </Col>
              <Col md="6" className="">
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
                        type="text"
                        placeholder="Repeat Password"
                        name="cPass"
                        onChange={onCpass}
                        value={cPass}
                      />

                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faEye} />
                      </InputGroup.Text>
                    </InputGroup>
                  </Form.Group>
                </Form>
              </Col>
            </Row>
            <Row className="pt-3">
              <button onClick={onSubmit}>Get Started - FREE</button>
            </Row>

            <p className="pt-3 text-center">
              By clicking "Get Started - Free!" I agree to Square’s Terms of
              Service
            </p>
            <div className="text-center pb-2">
              Already have An Account <Link to="/login">LOGIN</Link>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}

export default Student;
