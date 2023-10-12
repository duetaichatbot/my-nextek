import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDesktop,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { faGraduationCap } from "@fortawesome/free-solid-svg-icons";
import { faCalendarWeek } from "@fortawesome/free-solid-svg-icons";
import { faComments } from "@fortawesome/free-solid-svg-icons";
import { faIdCard } from "@fortawesome/free-solid-svg-icons";
// import { faGear } from "@fortawesome/free-solid-svg-icons";
import { Container } from "react-bootstrap";
import styles from "./homeleft.module.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Toastify from "toastify-js";

function HomeLeft() {
  const sideBarStudentRoutes = [
    {
      path: "/newsfeed",
      name: "News Feed",
      icon: faDesktop,
      id: "13",
    },
    {
      path: "/search-students",
      name: "Search",
      icon: faGraduationCap,
      id: "14",
    },
    {
      path: "/my-jobs",
      name: "Find Jobs",
      icon: faCalendarWeek,
      id: "15",
    },
    {
      path: "/discussion",
      name: "Discussion",
      icon: faComments,
      id: "16",
    },
    {
      path: "/interstcard",
      name: "InterestCard",
      icon: faIdCard,
      id: "17",
    },
  ];
  const sideBarProfessionalRoutes = [
    {
      path: "/newsfeed",
      name: "News Feed",
      icon: faDesktop,
      id: "7",
    },
    {
      path: "/search-students",
      name: "Search Students",
      icon: faGraduationCap,
      id: "8",
    },
    {
      path: "/create-jobs",
      name: "Create Jobs",
      icon: faCalendarWeek,
      id: "9",
    },
    // {
    //   path: "/applicant",
    //   name: "Applicants",
    //   icon: faCalendarWeek,
    // },
    {
      path: "/discussion",
      name: "Discussion",
      icon: faComments,
      id: "10",
    },
    {
      path: "/your-jobs",
      name: "Yous Jobs",
      icon: faCalendarWeek,
      id: "11",
    },
    {
      path: "/interstcard",
      name: "InterestCard",
      icon: faIdCard,
      id: "12",
    },
  ];
  const sideBarPremiumRoutes = [
    {
      path: "/newsfeed",
      name: "News Feed",
      icon: faDesktop,
      id: "1",
    },
    {
      path: "/search-students",
      name: "Search Students",
      icon: faGraduationCap,
      id: "2",
    },
    {
      path: "/create-jobs",
      name: "Create Jobs",
      icon: faCalendarWeek,
      id: "3",
    },
    // {
    //   path: "/applicant",
    //   name: "Applicants",
    //   icon: faCalendarWeek,
    // },
    {
      path: "/your-jobs",
      name: "Yous Jobs",
      icon: faCalendarWeek,
      id: "4",
    },
    {
      path: "/discussion",
      name: "Discussion",
      icon: faComments,
      id: "5",
    },
    {
      path: "/interstcard",
      name: "InterestCard",
      icon: faIdCard,
      id: "6",
    },
  ];

  const navigate = useNavigate();

  let sidebarRoutes = [];

  const userData = JSON.parse(localStorage.getItem("user"));

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
        {sidebarRoutes.map((item, index) => (
          <NavLink
            className={({ isActive }) =>
              isActive ? `${styles.sideLinks_active}` : `${styles.sideLinks}`
            }
            to={item.path}
            key={item?.id}
          >
            <div className="d-flex align-items-center">
              <FontAwesomeIcon
                icon={item.icon}
                className={styles.homeleftSVG}
              />

              <h5 className={`${styles.HomeLeftName} m-0`}>{item.name}</h5>
            </div>
          </NavLink>
        ))}
        <Link className={styles.logout} onClick={logout}>
          <div
            className={`${styles.logOutlinks} d-flex align-items-center gap-3 `}
          >
            <FontAwesomeIcon
              icon={faRightFromBracket}
              className={styles.logoutSvg}
            />
            <h5 className={`${styles.logoutname} m-0`}>Log-out</h5>
          </div>
        </Link>
      </Container>
    </>
  );
}

export default HomeLeft;
