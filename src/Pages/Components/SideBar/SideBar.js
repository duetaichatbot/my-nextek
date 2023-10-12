import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDesktop,
  faRightFromBracket,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { faGraduationCap } from "@fortawesome/free-solid-svg-icons";
import { faCalendarWeek } from "@fortawesome/free-solid-svg-icons";
import { faComments } from "@fortawesome/free-solid-svg-icons";
import { faIdCard } from "@fortawesome/free-solid-svg-icons";
// import { faGear } from "@fortawesome/free-solid-svg-icons";
import { Container } from "react-bootstrap";
import styles from "./sidebar.module.css";
import { Link, useNavigate } from "react-router-dom";
import Toastify from "toastify-js";

const SideBar = () => {
  const userData = JSON.parse(localStorage.getItem("user"));

  const userID = userData?.user?._id;
  const sideBarStudentRoutes = [
    {
      path: `/profile/${userID}`,
      name: "Profile",
      icon: faUser,
    },
    {
      path: "/newsfeed",
      name: "News Feed",
      icon: faDesktop,
    },
    {
      path: "/search-students",
      name: "Search",
      icon: faGraduationCap,
    },
    {
      path: "/my-jobs",
      name: "Find Jobs",
      icon: faCalendarWeek,
    },
    {
      path: "/discussion",
      name: "Discussion",
      icon: faComments,
    },
    {
      path: "/interstcard",
      name: "InterestCard",
      icon: faIdCard,
    },
  ];
  const sideBarProfessionalRoutes = [
    {
      path: `/profile/${userID}`,
      name: "Profile",
      icon: faUser,
    },
    {
      path: "/newsfeed",
      name: "News Feed",
      icon: faDesktop,
    },
    {
      path: "/search-students",
      name: "Search Students",
      icon: faGraduationCap,
    },
    {
      path: "/create-jobs",
      name: "Create Jobs",
      icon: faCalendarWeek,
    },
    {
      path: "/applicant",
      name: "Applicants",
      icon: faCalendarWeek,
    },
    {
      path: "/discussion",
      name: "Discussion",
      icon: faComments,
    },
    {
      path: "/interstcard",
      name: "InterestCard",
      icon: faIdCard,
    },
  ];
  const sideBarPremiumRoutes = [
    {
      path: `/profile/${userID}`,
      name: "Profile",
      icon: faUser,
    },
    {
      path: "/newsfeed",
      name: "News Feed",
      icon: faDesktop,
    },
    {
      path: "/search-students",
      name: "Search Students",
      icon: faGraduationCap,
    },
    {
      path: "/create-jobs",
      name: "Create Jobs",
      icon: faCalendarWeek,
    },
    {
      path: "/applicant",
      name: "Applicants",
      icon: faCalendarWeek,
    },
    {
      path: "/discussion",
      name: "Discussion",
      icon: faComments,
    },
    {
      path: "/interstcard",
      name: "InterestCard",
      icon: faIdCard,
    },
  ];

  const navigate = useNavigate();

  let sidebarRoutes = [];

  if (userData?.user?.role[0] === "Student") {
    sidebarRoutes = sideBarStudentRoutes;
  } else if (userData?.user?.role[0] === "Professional") {
    sidebarRoutes = sideBarProfessionalRoutes;
  } else if (userData?.user?.role[0] === "Premium Professionals") {
    sidebarRoutes = sideBarPremiumRoutes;
  }

  const logout = () => {
    try {
      localStorage.removeItem("user");
      navigate("/");
    } catch (error) {
      Toastify({
        text: "Error While Logout",
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
      <Container className={styles.HomeLeftWrapper}>
        {sidebarRoutes.map((item) => (
          <React.Fragment key={item.name}>
            <Link className={styles.sideLinks} to={item.path}>
              <div className="d-flex align-items-center">
                <FontAwesomeIcon
                  icon={item.icon}
                  className={styles.homeleftSVG}
                />

                <h5 className={`${styles.HomeLeftName} m-0`}>{item.name}</h5>
              </div>
            </Link>
          </React.Fragment>
        ))}
        <Link className={styles.logout} onClick={() => navigate("/")}>
          <div className={`${styles.links} d-flex align-items-center gap-3 `}>
            <FontAwesomeIcon
              icon={faRightFromBracket}
              style={{
                color: "white",
              }}
            />
            <h5
              className="m-0"
              onClick={logout}
              style={{
                color: "white",
              }}
            >
              Log-out
            </h5>
          </div>
        </Link>
      </Container>
    </>
  );
};

export default SideBar;
