import React from "react";
import { Button, Container } from "react-bootstrap";
import styles from "./HomeRight.module.css";
import { useGetAllUsersQuery } from "../../../Redux/UserSlice/UserSlice";
import { useNavigate } from "react-router-dom";

function HomeRight() {
  const navigate = useNavigate();

  const getAllUsers = useGetAllUsersQuery();

  const userData = JSON.parse(localStorage.getItem("user"));
  const userID = userData.user._id;
  const userRole = userData.user.role[0];

  return (
    <>
      <div
        className={styles.homeRightWrapper}
        style={{
          overflowX: "hidden",
        }}
      >
        <div>
          <Container
            className={styles.profileWrapper}
            fluid
            style={{
              padding: "0rem",
            }}
          >
            <div className="pb-4 d-flex align-items-center justify-content-between">
              <h5 className={`${styles.homerightHeading} fw-bold`}>
                Recommended Profiles
              </h5>
            </div>

            {userRole === "Professional"
              ? getAllUsers?.data
                  ?.filter((item) => item._id !== userID)
                  .slice(0, 6)
                  .map((item, index) => (
                    <div
                      className={
                        item.role[0] === "Premium Professionals"
                          ? `${styles.studentProfileWrapperBlur} py-2 d-flex align-items-center gap-2`
                          : `${styles.studentProfileWrapper} py-2 d-flex align-items-center gap-2`
                      }
                      style={{
                        cursor: "pointer",
                      }}
                      onClick={
                        userRole === "Professional" &&
                        item.role[0] === "Premium Professionals"
                          ? () => navigate(`/payment`)
                          : () => navigate(`/home-profile/${item._id}`)
                      }
                      key={item._id}
                    >
                      <img
                        alt={item?.profileImg}
                        src={item?.profileImg}
                        className={styles.studentProfile}
                      />
                      <div className="d-flex flex-column justify-content-center align-items-start">
                        <h6>{item?.firstName + " " + item?.lastName}</h6>
                        <p className={`${styles.studentDate} m-0 `}>
                          12 April at 09.28 PM
                        </p>
                      </div>
                    </div>
                  ))
              : getAllUsers?.data
                  ?.filter((item) => item._id !== userID)
                  .slice(0, 6)
                  .map((item, index) => (
                    <div
                      className={`${styles.studentProfileWrapper} py-2 d-flex align-items-center gap-2`}
                      style={{
                        cursor: "pointer",
                      }}
                      onClick={() => navigate(`/home-profile/${item?._id}`)}
                      key={index + 1}
                    >
                      <img
                        alt={item?.profileImg}
                        src={item?.profileImg}
                        className={styles.studentProfile}
                      />

                      <div className="d-flex flex-column justify-content-center align-items-start">
                        <h6>{item?.firstName + " " + item?.lastName}</h6>
                        <p className={`${styles.studentDate} m-0 `}>
                          12 April at 09.28 PM
                        </p>
                      </div>
                    </div>
                  ))}
          </Container>

          <Button
            className={`${styles.studentBtn} mt-2`}
            onClick={() => navigate("/see-all")}
          >
            See All
          </Button>
        </div>
      </div>
    </>
  );
}

export default HomeRight;
