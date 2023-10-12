import React from "react";
import style from "./appliedapplicantMid.module.css";
import { Col, Row } from "react-bootstrap";
// import { useAllInstructorsQuery } from "../../../Redux/InstructorSlices/Instructor";
import Alpha_Profile from "../../../../assets/cardImg1.png";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faCity,
  faPhoneVolume,
  faEye,
  faDownload,
} from "@fortawesome/free-solid-svg-icons";

// const applicants = [
//   {
//     id: "a1b2c3d4e5",
//     profileImg: "https://randomuser.me/api/portraits/men/5.jpg",
//     username: "John Smith",
//     email: "johnsmith@gmail.com",
//     phone: "07000000000",
//     city: "San Francisco",
//     profession: "Software Engineer",
//   },
//   {
//     id: "f6g7h8i9j0",
//     profileImg: "https://randomuser.me/api/portraits/women/2.jpg",
//     username: "Emily Johnson",
//     email: "emily.johnson@example.com",
//     phone: "07111111111",
//     city: "New York",
//     profession: "Graphic Designer",
//   },
//   {
//     id: "k1l2m3n4o5",
//     profileImg: "https://randomuser.me/api/portraits/men/12.jpg",
//     username: "Michael Brown",
//     email: "michael.brown@example.com",
//     phone: "07222222222",
//     city: "Los Angeles",
//     profession: "Marketing Manager",
//   },
//   {
//     id: "p6q7r8s9t0",
//     profileImg: "https://randomuser.me/api/portraits/women/5.jpg",
//     username: "Olivia Davis",
//     email: "olivia.davis@example.com",
//     phone: "07333333333",
//     city: "Chicago",
//     profession: "Teacher",
//   },
//   {
//     id: "u1v2w3x4y5",
//     profileImg: "https://randomuser.me/api/portraits/men/17.jpg",
//     username: "William Wilson",
//     email: "william.wilson@example.com",
//     phone: "07444444444",
//     city: "Houston",
//     profession: "Architect",
//   },
//   {
//     id: "z6a7b8c9d0",
//     profileImg: "https://randomuser.me/api/portraits/women/8.jpg",
//     username: "Sophia Lee",
//     email: "sophia.lee@example.com",
//     phone: "07555555555",
//     city: "Miami",
//     profession: "Photographer",
//   },
//   {
//     id: "e1f2g3h4i5",
//     profileImg: "https://randomuser.me/api/portraits/men/21.jpg",
//     username: "James Miller",
//     email: "james.miller@example.com",
//     phone: "07666666666",
//     city: "Seattle",
//     profession: "Data Analyst",
//   },
//   {
//     id: "j6k7l8m9n0",
//     profileImg: "https://randomuser.me/api/portraits/women/15.jpg",
//     username: "Ava Martinez",
//     email: "ava.martinez@example.com",
//     phone: "07777777777",
//     city: "Boston",
//     profession: "Accountant",
//   },
//   {
//     id: "o1p2q3r4s5",
//     profileImg: "https://randomuser.me/api/portraits/men/31.jpg",
//     username: "Alexander Anderson",
//     email: "alexander.anderson@example.com",
//     phone: "07888888888",
//     city: "Atlanta",
//     profession: "Sales Manager",
//   },
//   {
//     id: "t6u7v8w9x0",
//     profileImg: "https://randomuser.me/api/portraits/women/23.jpg",
//     username: "Isabella Thomas",
//     email: "isabella.thomas@example.com",
//     phone: "07999999999",
//     city: "Dallas",
//     profession: "Writer",
//   },
// ];
// useGetApplicantsJobsQuery
const AppliedApplicantMid = ({ applicants }) => {
  const navigate = useNavigate();
  return (
    <>
      <Row
        className={`${style.applicantWrapper} d-flex justify-content-center mt-5`}
        style={{ gap: "2rem", paddingLeft: "1rem", paddingRight: "1rem" }}
      >
        <h1
          style={{
            fontWeight: "bolder",
            textAlign: "center",
          }}
        >
          Applied Applicants
        </h1>
        {applicants?.map((card, index) => (
          <Col
            lg="6"
            key={index + 1}
            className={style.main}
            style={{ background: "#f3f3f396" }}
          >
            <div className={`${style.card} p-3`}>
              <div className={`${style.imgRow} d-flex justify-content-center`}>
                {card?.applicant?.profileImg ? (
                  <img src={card?.applicant?.profileImg} alt={index} />
                ) : (
                  <img src={Alpha_Profile} alt={index} />
                )}
              </div>
              <Row
                className="d-flex justify-content-center mt-2"
                style={{ fontWeight: "bold" }}
              >
                {/* {card?.firstName + " " + card?.lastName} */}
                {card?.applicant?.firstName + " " + card?.applicant?.lastName}
              </Row>
              <Row
                className={`d-flex gap-2 justify-content-center align-items-center mt-1 mb-2 ${style.professionRow}`}
                style={{ color: "#A098A" }}
              >
                <Col
                  className={`${style.profession} w-auto gap-2 d-flex justify-content-center align-items-center`}
                >
                  <FontAwesomeIcon icon={faEnvelope} />
                  {/* {card?.email} */}
                  {card?.applicant?.email}
                </Col>
                <div className="d-flex gap-2 p-0">
                  <Col
                    className={`${style.profession} w-auto gap-2 d-flex justify-content-center align-items-center`}
                  >
                    <FontAwesomeIcon icon={faCity} />
                    {card?.applicant?.city
                      ? card?.applicant?.city
                      : "San Francisco"}
                  </Col>
                  <Col
                    className={`${style.profession} w-auto gap-2 d-flex justify-content-center align-items-center`}
                  >
                    <FontAwesomeIcon icon={faPhoneVolume} />
                    {card?.applicant?.phone ? card?.applicant?.phone : ""}
                  </Col>
                </div>
              </Row>
              <div className={`${style.instructorAssign} mt-4`}>
                <FontAwesomeIcon
                  icon={faEye}
                  onClick={() =>
                    navigate(`/home-profile/${card?.applicant?._id}`)
                  }
                  className={style.instructorAssignIcon}
                />
                <Link to={card.cv} target="_blank">
                  <FontAwesomeIcon
                    icon={faDownload}
                    className={style.instructorAssignIcon}
                  />
                </Link>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default AppliedApplicantMid;
