import { Col, Container, Row } from "react-bootstrap";
import styles from "./jobform.module.css";
import JoditEditor from "jodit-react";
import { useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";
// import axios from "axios";
// import API_BASE_URL from "../../../Config";
import { useCreateJobMutation } from "../../../Redux/jobs/Jobs";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import ListLoader from "../Loader/ListLoader";
import { useNavigate } from "react-router-dom";

function JobForm() {
  const qualificationEditor = useRef(null);
  const responsibilitesEditor = useRef(null);
  const jobDescEditor = useRef(null);

  const userData = JSON.parse(localStorage.getItem("user"));
  const about = userData?.user?.about;
  const phone = userData?.user?.phone;
  const role = userData?.user?.role[0];
  const [qualification, setQualification] = useState("");
  const [responsibilites, setResponsibilites] = useState("");
  const [jobDesc, setJobDesc] = useState("");

  const [fields, setFields] = useState({
    companyName: "",
    jobName: "",
    salaryPerYear: "",
    jobType: "",
    jobExp: "",
  });

  console.log(role);

  const navigate = useNavigate();

  const [companyImg, setCompanyImg] = useState("");

  const onChangeImg = (e) => {
    setCompanyImg(e.target.files[0]);
  };

  const onChangeHandler = (e) => {
    setFields({ ...fields, [e.target.name]: e.target.value });
  };

  const [createJob, { isLoading }] = useCreateJobMutation();

  const onCreateJob = async () => {
    try {
      if (about && phone) {
        const formData = new FormData();

        formData.append("companyImg", companyImg);
        Object.entries(fields).forEach(([key, value]) => {
          formData.append(key, value);
        });
        formData.append("qualification", qualification);
        formData.append("responsibilites", responsibilites);
        formData.append("jobDesc", jobDesc);
        formData.append("authorID", userData.user._id);

        const res = await createJob(formData);

        if (!res.error) {
          setFields({
            companyName: "",
            jobName: "",
            salaryPerYear: "",
            jobType: "",
            jobExp: "",
          });
          setCompanyImg("");
          setQualification("");
          setResponsibilites("");
          setJobDesc("");

          Toastify({
            text: "Job Has been Posted Successfully",
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
        Toastify({
          text: "Please Complete Your Interest Card First",
          duration: 10000,
          newWindow: true,
          close: true,
          gravity: "top", // `top` or `bottom`
          position: "center", // `left`, `center` or `right`
          stopOnFocus: true, // Prevents dismissing of toast on hover
          style: {
            background: "#ffc107",
            borderRadius: "10px",
            color: "white",
            fill: "white",
          },
          onClick: function () {}, // Callback after click
        }).showToast();
      }
    } catch (error) {
      // alert("Some Error Occured Please Try Again");
      Toastify({
        text: "Some Error Occured Please Try Again",
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

  const onJobPostHandler = () => {
    if (role === "Professional") {
      navigate("/job-payment", {
        state: {
          fields,
          role,
          about,
          phone,
          companyImg,
          qualification,
          responsibilites,
          jobDesc,
        },
      });
    } else {
      onCreateJob();
    }
  };

  return (
    <>
      <Container className={styles.jobFromWrapper}>
        <Row>
          <Col className="text-center py-4">
            <h2>CREATE JOB</h2>
          </Col>
        </Row>
        <Row>
          <Col md="6" className="my-sm-3 my-lg-0">
            <p className={styles.createjoblabel}> Company Name </p>
            <Form.Control
              type="text"
              name="companyName"
              value={fields.companyName}
              onChange={onChangeHandler}
              placeholder="Company Name"
            />
          </Col>
          <Col md="6" className="mt-3 my-lg-0">
            <p className={styles.createjoblabel}> Job Name </p>
            <Form.Control
              type="text"
              name="jobName"
              onChange={onChangeHandler}
              placeholder="Job Name"
              value={fields.jobName}
            />
          </Col>
        </Row>
        <Row className="py-3">
          <Col md="4" className=" my-lg-0">
            <p className={styles.createjoblabel}>Job Type</p>
            <select
              onChange={onChangeHandler}
              name="jobType"
              className="form-control"
              id="country"
            >
              <option defaultValue="" disabled value="">
                Select Job Type
              </option>
              <option value="Part Time">Part Time</option>
              <option value="Full Time">Full Time</option>
              <option value="Remote">Remote</option>
            </select>
          </Col>
          <Col md="4" className="my-3 my-lg-0">
            <p className={styles.createjoblabel}>Experience</p>
            <select
              onChange={onChangeHandler}
              name="jobExp"
              className="form-control"
              id="country"
            >
              <option defaultValue="" disabled value="">
                Select Experience Level
              </option>
              <option value="Internmediate">Internmediate</option>
              <option value="Mid-Level">Mid-Level</option>
              <option value="Experienced">Experienced</option>
            </select>
          </Col>
          <Col md="4">
            <p className={styles.createjoblabel}>Salary</p>
            <Form.Control
              type="Number"
              name="salaryPerYear"
              value={fields.salaryPerYear}
              onChange={onChangeHandler}
              placeholder="Salary Per Year"
            />
          </Col>
        </Row>
        <Row className="py-3">
          <Col>
            <p className={styles.createjoblabel}>Job Description</p>
            <JoditEditor
              ref={jobDescEditor}
              value={jobDesc}
              // config={config}
              onChange={(newContent) => setJobDesc(newContent)}
            />
          </Col>
        </Row>
        <Row className="py-3">
          <Col>
            <p className={styles.createjoblabel}>Job Responsibilities</p>
            <JoditEditor
              ref={responsibilitesEditor}
              value={responsibilites}
              // config={config}
              onChange={(newContent) => setResponsibilites(newContent)}
              // onChange={(newContent) => {}}
            />
          </Col>
        </Row>
        <Row className="py-3">
          <Col>
            <p className={styles.createjoblabel}>Job Qualification</p>
            <JoditEditor
              ref={qualificationEditor}
              value={qualification}
              // config={config}
              onChange={(newContent) => setQualification(newContent)}
              // onChange={(newContent) => {}}
            />
          </Col>
        </Row>
        <Row className="py-3">
          <Col className="d-flex gap-3">
            <label htmlFor="companyImg" style={{ cursor: "pointer" }}>
              <span className={styles.uploadBtn}>
                Company Image
                <FontAwesomeIcon icon={faCloudArrowUp} className="fa-lg ps-2" />
              </span>
              {/* </button> */}
            </label>

            <Form.Control
              id="companyImg"
              style={{ display: "none" }}
              type="file"
              onChange={onChangeImg}
              name="jobName"
              placeholder="Job Name"
            />
            {companyImg && (
              <p className="m-0" style={{ fontWeight: "700" }}>
                Image Selected
              </p>
            )}
          </Col>
        </Row>
        <Row className="py-3" style={{ width: "fit-content" }}>
          <Col className="">
            {isLoading ? (
              <ListLoader />
            ) : (
              <button
                className={`${styles.createJobBtn} w-auto`}
                onClick={onJobPostHandler}
              >
                Post Job
              </button>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default JobForm;
