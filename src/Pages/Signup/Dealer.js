import React, { useState } from "react";
import styles from "../Signup/Dealer.module.css";
import {
  Col,
  Container,
  Form,
  Row,
  FormCheck,
  InputGroup,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import {
  useRegisterMutation,
  useRegisterPremiumMutation,
  useRegister_PremiumMutation,
} from "../../Redux/UserSlice/UserSlice";
import { Link, useNavigate } from "react-router-dom";
import { useGetProfessionalInstituteQuery } from "../../Redux/institute/Institute";
import Toastify from "toastify-js";

function Dealer() {
  const getInstitute = useGetProfessionalInstituteQuery();

  const [formType, setFormType] = useState(false);

  const [fields, setFields] = useState({
    firstName: "",
    lastName: "",
    company: "",
    from: "",
    to: "",
    institute: "",
    email: "",
    password: "",
    state: "",
    city: "",
    zipCode: "",
    role: "Professional",
  });
  const [premiumFields, setPremiumFields] = useState({
    firstName: "",
    lastName: "",
    company: "",
    state: "",
    city: "",
    zipCode: "",
    institute: "",
    email: "",
    password: "",
    plan: "price_1NgWcNJ8CQqp3LxfiyLuvKFT",
    card_number: "",
    card_cvc: "",
    card_exp_month: "",
    card_exp_year: "",
    subType: "",
  });
  console.log(premiumFields);
  const [cPass, setCPass] = useState("");

  const navigate = useNavigate();

  const [subType, setSubType] = useState("monthly");

  // eslint-disable-next-line
  const [register, { isLoading, isError }] = useRegisterMutation();

  const [registerPremium] = useRegisterPremiumMutation();
  const [premium] = useRegister_PremiumMutation();
  const toggleFormType = () => {
    setFormType(!formType);
  };

  const onCpass = (e) => {
    setCPass(e.target.value);
  };

  const fieldHandler = (e) => {
    setFields({ ...fields, [e.target.name]: e.target.value });
  };

  const premiumFieldHandler = (e) => {
    setPremiumFields({ ...premiumFields, [e.target.name]: e.target.value });
  };

  const onSubmit = async () => {
    if (
      fields.firstName !== "" &&
      fields.lastName !== "" &&
      fields.company !== "" &&
      fields.state !== "" &&
      fields.city !== "" &&
      fields.zipCode !== "" &&
      fields.institute !== "" &&
      fields.email !== "" &&
      fields.password !== "" &&
      fields.password === cPass
    ) {
      try {
        const res = await register(fields);
        if (res?.data?.status === 200) {
          Toastify({
            text: "Signup successfully",
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
            firstName: "",
            lastName: "",
            company: "",
            state: "",
            city: "",
            zipCode: "",
            institute: "",
            email: "",
            password: "",
          });
          console.log(res.data);
          navigate("/verify-otp", {
            state: { email: fields.email, userID: res.data.user._id },
          });
        }

        // Nullify the fields object after successful submission
      } catch (error) {
        Toastify({
          text: "Error While Signup",
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
    } else if (fields.password !== cPass) {
      // alert("Passwords should be the same");
      Toastify({
        text: "Passwords should be the same",
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

  const onPremiumSubmit = async () => {
    if (
      premiumFields.firstName !== "" &&
      premiumFields.lastName !== "" &&
      premiumFields.company !== "" &&
      premiumFields.state !== "" &&
      premiumFields.city !== "" &&
      premiumFields.zipCode !== "" &&
      premiumFields.institute !== "" &&
      premiumFields.email !== "" &&
      premiumFields.card_exp_month !== "" &&
      premiumFields.card_number !== "" &&
      premiumFields.card_cvc !== "" &&
      premiumFields.card_exp_year !== "" &&
      premiumFields.password !== "" &&
      premiumFields.password === cPass
    ) {
      try {
        const res = await premium(premiumFields);
        if (res?.data?.status === 200) {
          Toastify({
            text: "Signup successfully",
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
          setPremiumFields({
            firstName: "",
            lastName: "",
            company: "",
            state: "",
            city: "",
            zipCode: "",
            institute: "",
            email: "",
            password: "",
          });

          navigate("/verify-otp", {
            state: { email: premiumFields.email, userID: res.data.user._id },
          });
        }

        // Nullify the fields object after successful submission
      } catch (error) {
        Toastify({
          text: "Error While Signup",
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
    } else if (fields.password !== cPass) {
      // alert("Passwords should be the same");
      Toastify({
        text: "Passwords should be the same",
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
              <div className="text-center d-flex justify-content-center">
                <p>Standard</p>
                <Form>
                  <FormCheck // prettier-ignore
                    type="switch"
                    id="custom-switch"
                    className="ps-5 pe-2"
                    value={formType}
                    onClick={toggleFormType}
                  />
                </Form>
                <p>Premium</p>
                <FontAwesomeIcon icon={faUser} className="text-white" />
              </div>
            </Row>

            {formType === false ? (
              <>
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
                  <Col md={!fields.institute ? "12" : "6"}>
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
                  {fields.institute && (
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
                              name="company"
                              onChange={fieldHandler}
                              value={fields.company}
                              placeholder={
                                fields.institute === "652048aa4d433eba773a0e56"
                                  ? "Dealership Name"
                                  : fields.institute ===
                                    "652048c24d433eba773a0e59"
                                  ? "Independent Shop Name"
                                  : null
                              }
                            />
                          </InputGroup>
                        </Form.Group>
                      </Form>
                    </Col>
                  )}
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
              </>
            ) : (
              <>
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
                            value={premiumFields.firstName}
                            onChange={premiumFieldHandler}
                            className={styles.fields}
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
                            type="text"
                            name="lastName"
                            value={premiumFields.lastName}
                            onChange={premiumFieldHandler}
                            placeholder="Last Name"
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
                          <Form.Control
                            className={styles.fields}
                            type="text"
                            name="state"
                            value={premiumFields.state}
                            onChange={premiumFieldHandler}
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
                            name="city"
                            onChange={premiumFieldHandler}
                            value={premiumFields.city}
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
                            onChange={premiumFieldHandler}
                            name="institute"
                            value={premiumFields.institute}
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
                        name="zipCode"
                        onChange={premiumFieldHandler}
                        value={premiumFields.zipCode}
                        placeholder="Zip Code"
                      />
                    </InputGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={!premiumFields.institute ? "12" : "6"}>
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
                            name="email"
                            value={premiumFields.email}
                            onChange={premiumFieldHandler}
                            placeholder="Email"
                          />
                        </InputGroup>
                      </Form.Group>
                    </Form>
                  </Col>
                  {premiumFields.institute && (
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
                              name="company"
                              value={premiumFields.company}
                              onChange={premiumFieldHandler}
                              placeholder={
                                premiumFields.institute ===
                                "652048aa4d433eba773a0e56"
                                  ? "Dealership Name"
                                  : premiumFields.institute ===
                                    "652048c24d433eba773a0e59"
                                  ? "Independent Shop Name"
                                  : null
                              }
                            />
                          </InputGroup>
                        </Form.Group>
                      </Form>
                    </Col>
                  )}
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
                            value={premiumFields.password}
                            onChange={premiumFieldHandler}
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
                            name="cPass"
                            value={cPass}
                            onChange={(e) => setCPass(e.target.value)}
                            placeholder="Repeat Password"
                          />

                          <InputGroup.Text>
                            <FontAwesomeIcon icon={faEye} />
                          </InputGroup.Text>
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
                          <Form.Control
                            className={styles.fields}
                            type="text"
                            name="card_number"
                            onChange={(e) => {
                              if (/^\d{0,16}$/.test(e.target.value)) {
                                premiumFieldHandler(e);
                              }
                            }}
                            maxLength="16"
                            value={premiumFields.card_number}
                            placeholder="Card Number"
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
                          <Form.Select
                            className={styles.dropdown}
                            aria-label="Select Institution/University"
                            onChange={premiumFieldHandler}
                            name="subType"
                            value={premiumFields.subType}
                          >
                            <option value="" disabled selected>
                              Select Plan
                            </option>
                            <option value="monthly">Monthly</option>
                            <option value="Yearly">Yearly</option>
                          </Form.Select>
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
                            name="card_cvc"
                            onChange={(e) => {
                              if (/^\d{0,3}$/.test(e.target.value)) {
                                premiumFieldHandler(e);
                              }
                            }}
                            maxLength="3"
                            value={premiumFields.card_cvc}
                            placeholder="CVC Number"
                          />
                        </InputGroup>
                      </Form.Group>
                    </Form>
                  </Col>
                  <Col md="3" className="">
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
                            name="card_exp_month"
                            value={premiumFields.card_exp_month}
                            onChange={(e) => {
                              if (/^\d{0,2}$/.test(e.target.value)) {
                                premiumFieldHandler(e);
                              }
                            }}
                            maxLength="2"
                            type="number"
                            placeholder="Month"
                          />
                        </InputGroup>
                      </Form.Group>
                    </Form>
                  </Col>
                  <Col md="3" className="">
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
                            name="card_exp_year"
                            value={premiumFields.card_exp_year}
                            onChange={(e) => {
                              if (/^\d{0,4}$/.test(e.target.value)) {
                                premiumFieldHandler(e);
                              }
                            }}
                            maxLength="4"
                            type="number"
                            placeholder="Year"
                          />
                        </InputGroup>
                      </Form.Group>
                    </Form>
                  </Col>
                </Row>

                <Row role="button" onClick={onPremiumSubmit} className="pt-3">
                  <button>Get Started - PREMIUM</button>
                </Row>

                <p className="pt-3 text-center">
                  By clicking "Get Started - Free!" I agree to Square’s Terms of
                  Service
                </p>
              </>
            )}
            <div className="text-center pb-2">
              Already have An Account <Link to="/login">LOGIN</Link>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}

export default Dealer;
