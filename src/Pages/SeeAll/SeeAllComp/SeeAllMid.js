import React from "react";
import style from "./SeeAllMid.module.css";
import { Col, Row } from "react-bootstrap";
// import { useAllInstructorsQuery } from "../../../Redux/InstructorSlices/Instructor";
import Alpha_Profile from "../../../assets/cardImg1.png";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faCity,
  faPhoneVolume,
} from "@fortawesome/free-solid-svg-icons";
import { useGetAllUsersQuery } from "../../../Redux/UserSlice/UserSlice";

const SeeAllMid = () => {
  const getAllUsers = useGetAllUsersQuery();
  const navigate = useNavigate();

  const userData = JSON.parse(localStorage.getItem("user"));
  const userID = userData.user._id;
  const userRole = userData?.user?.role[0];

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
          All Students
        </h1>
        {userRole === "Professional"
          ? getAllUsers?.data
              ?.filter((item) => item._id !== userID)
              .map((card, index) => (
                <Col
                  lg="6"
                  key={index + 1}
                  className={
                    card.role[0] === "Premium Professionals"
                      ? style.mainblur
                      : style.main
                  }
                  style={{ background: "#f3f3f396" }}
                  onClick={
                    userRole === "Professional" &&
                    card.role[0] === "Premium Professionals"
                      ? () => navigate(`/payment`)
                      : null
                  }
                >
                  <div className={`${style.card} p-3`}>
                    <div
                      className={`${style.imgRow} d-flex justify-content-center`}
                    >
                      {card.profileImg ? (
                        <img src={card?.profileImg} alt={index} />
                      ) : (
                        <img src={Alpha_Profile} alt={index} />
                      )}
                    </div>
                    <Row
                      className="d-flex justify-content-center mt-2"
                      style={{ fontWeight: "bold" }}
                    >
                      {card?.firstName + " " + card?.lastName}
                    </Row>
                    <Row
                      className={`d-flex gap-2 justify-content-center align-items-center mt-1 mb-2 ${style.professionRow}`}
                      style={{ color: "#A098A" }}
                    >
                      <Col
                        className={`${style.profession} w-auto gap-2 d-flex justify-content-center align-items-center`}
                      >
                        <FontAwesomeIcon icon={faEnvelope} />
                        {card?.email}
                      </Col>
                      <div className="d-flex gap-2 p-0">
                        <Col
                          className={`${style.profession} w-auto gap-2 d-flex justify-content-center align-items-center`}
                        >
                          <FontAwesomeIcon icon={faCity} />
                          {/* {card?.city} */}
                          san francisco
                        </Col>
                        {card?.phone && (
                          <Col
                            className={`${style.profession} w-auto gap-2 d-flex justify-content-center align-items-center`}
                          >
                            <FontAwesomeIcon icon={faPhoneVolume} />
                            {card?.phone}
                          </Col>
                        )}
                      </div>
                    </Row>
                    <Row className={`${style.instructorAssign} mt-4`}>
                      {card.role[0] === "Premium Professionals" ? (
                        <button style={{ cursor: "default" }}>
                          View Profile
                        </button>
                      ) : (
                        <button
                          onClick={() => navigate(`/home-profile/${card?._id}`)}
                        >
                          View Profile
                        </button>
                      )}
                    </Row>
                  </div>
                </Col>
              ))
          : getAllUsers?.data
              ?.filter((item) => item._id !== userID)
              .map((card, index) => (
                <Col
                  lg="6"
                  key={index + 1}
                  className={style.main}
                  style={{ background: "#f3f3f396" }}
                >
                  <div className={`${style.card} p-3`}>
                    <div
                      className={`${style.imgRow} d-flex justify-content-center`}
                    >
                      {card.profileImg ? (
                        <img src={card?.profileImg} alt={index} />
                      ) : (
                        <img src={Alpha_Profile} alt={index} />
                      )}
                    </div>
                    <Row
                      className="d-flex justify-content-center mt-2"
                      style={{ fontWeight: "bold" }}
                    >
                      {card?.firstName + " " + card?.lastName}
                    </Row>
                    <Row
                      className={`d-flex gap-2 justify-content-center align-items-center mt-1 mb-2 ${style.professionRow}`}
                      style={{ color: "#A098A" }}
                    >
                      <Col
                        className={`${style.profession} w-auto gap-2 d-flex justify-content-center align-items-center`}
                      >
                        <FontAwesomeIcon icon={faEnvelope} />
                        {card?.email}
                      </Col>
                      <div className="d-flex gap-2 p-0">
                        <Col
                          className={`${style.profession} w-auto gap-2 d-flex justify-content-center align-items-center`}
                        >
                          <FontAwesomeIcon icon={faCity} />
                          {/* {card?.city} */}
                          san francisco
                        </Col>
                        {card?.phone && (
                          <Col
                            className={`${style.profession} w-auto gap-2 d-flex justify-content-center align-items-center`}
                          >
                            <FontAwesomeIcon icon={faPhoneVolume} />
                            {card?.phone}
                          </Col>
                        )}
                      </div>
                    </Row>
                    <Row className={`${style.instructorAssign} mt-4`}>
                      <button
                        onClick={() => navigate(`/home-profile/${card?._id}`)}
                      >
                        View Profile
                      </button>
                    </Row>
                  </div>
                </Col>
              ))}
      </Row>
    </>
  );
};

export default SeeAllMid;
