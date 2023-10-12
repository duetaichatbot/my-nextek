import React, { useEffect, useState } from "react";
import student from "../../../assets/Search/searchedStudent.png";
import style from "./searchstudent.module.css";
import SearchBar from "../../Components/SearchBar/SearchBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { useGetAllUsersQuery } from "../../../Redux/UserSlice/UserSlice";
import { useNavigate } from "react-router-dom";

const SearchStudentMid = ({ setIsFilter, filteredData }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const userID = user?.user?._id;

  // const [isFilter, setIsFilter] = useState(true);

  const [nameFilter, setNameFilter] = useState("");
  useEffect(() => {
    const handleContextMenu = (event) => {
      event.preventDefault(); // Prevent the default right-click context menu
    };
    // Attach the event listener when the component mounts
    document.addEventListener("contextmenu", handleContextMenu);
    // Remove the event listener when the component unmounts
    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
    };
  }, []);

  const userData = JSON.parse(localStorage.getItem("user"));
  const userRole = userData.user.role[0];

  const getAllUsers = useGetAllUsersQuery();
  const navigate = useNavigate();

  const filteredUsers = getAllUsers?.data?.filter((item) => {
    const fullName = item.firstName + " " + item.lastName;
    const stateMatches =
      !filteredData.state || item.state === filteredData.state;
    const cityMatches = !filteredData.city || item.city === filteredData.city;
    const zipCodeMatches =
      !filteredData.zipCode || item.zipCode === filteredData.zipCode;
    const InstituteMatch =
      !filteredData.institute ||
      item?.institute?.institute === filteredData.institute;

    return (
      fullName.toLowerCase().includes(filteredData.firstName.toLowerCase()) &&
      fullName.toLowerCase().includes(filteredData.lastName.toLowerCase()) &&
      stateMatches &&
      cityMatches &&
      zipCodeMatches &&
      InstituteMatch
    );
  });

  const filterByName = filteredUsers?.filter((item) => {
    const fullName = item.firstName + " " + item.lastName;
    return (
      fullName.toLowerCase().includes(nameFilter.toLowerCase()) &&
      fullName.toLowerCase().includes(nameFilter.toLowerCase())
    );
  });

  return (
    <>
      <div className={style.searchStudentWrapper}>
        <SearchBar
          btnname="Filter"
          placeholder="search"
          setIsFilter={setIsFilter}
          setNameFilter={setNameFilter}
          nameFilter={nameFilter}
          width="45rem"
          height="4rem"
        />
        {userRole === "Professional"
          ? filterByName
              ?.filter((item) => item?._id !== userID)
              ?.map((item, index) => (
                <div
                  className={
                    item.role[0] === "Student"
                      ? style.searchedStudentWrapperWithBlur
                      : style.searchedStudentWrapper
                  }
                  role="button"
                  key={index}
                  onClick={
                    userRole === "Professional" && item.role[0] === "Student"
                      ? () => navigate(`/role-subscription`)
                      : () => navigate(`/home-profile/${item._id}`)
                  }
                >
                  <div className={style.searchedStudentDiv}>
                    <div className="d-flex align-items-start gap-3">
                      <img
                        src={item.profileImg}
                        width="100px"
                        style={{
                          width: "100px",
                          borderRadius: "50%",
                          height: "100px",
                        }}
                        alt={student}
                      />
                      <span className={style.searchedStudentDivSpan}>
                        <h3 style={{ userSelect: "none" }}>
                          {item.firstName + " " + item.lastName}
                        </h3>
                        <h5 style={{ userSelect: "none" }}>{item.role[0]}</h5>
                        <span className={style.Mobilelocation}>
                          <FontAwesomeIcon icon={faLocationDot} />
                          <p
                            style={{ userSelect: "none" }}
                            className={`${style.MobilelocationPara} w-auto `}
                          >
                            {item?.city}
                          </p>
                        </span>
                      </span>
                    </div>
                    <span className={style.location}>
                      <FontAwesomeIcon icon={faLocationDot} />
                      <p style={{ userSelect: "none" }}>{item?.city}</p>
                    </span>
                  </div>
                  <p style={{ userSelect: "none" }}>
                    {item?.about ? item?.about?.substring(0, 30) + "..." : ""}
                  </p>
                </div>
              ))
          : filterByName
              ?.filter((item) => item?._id !== userID)
              ?.map((item, index) => (
                <div
                  onClick={
                    userRole === "Professional" &&
                    item.role[0] === "Premium Professionals"
                      ? () => navigate(`/role-subscription`)
                      : () => navigate(`/home-profile/${item._id}`)
                  }
                  key={index}
                  role="button"
                  className={style.searchedStudentWrapper}
                >
                  <div className={style.searchedStudentDiv}>
                    <div className="d-flex align-items-start gap-3">
                      <img
                        src={item.profileImg}
                        width="100px"
                        style={{
                          width: "100px",
                          borderRadius: "50%",
                          height: "100px",
                        }}
                        alt={student}
                      />
                      <span className={style.searchedStudentDivSpan}>
                        <h3>{item.firstName + " " + item.lastName}</h3>
                        <h5>{item.role[0]}</h5>
                        <span className={style.Mobilelocation}>
                          <FontAwesomeIcon icon={faLocationDot} />
                          <p className={`${style.MobilelocationPara} w-auto `}>
                            {item?.city}
                          </p>
                        </span>
                      </span>
                    </div>
                    <span className={style.location}>
                      <FontAwesomeIcon icon={faLocationDot} />
                      <p>{item?.city}</p>
                    </span>
                  </div>
                  <p className={`${style.SearchStudentAbout}`}>
                    {item?.about ? item?.about?.substring(0, 30) + "..." : ""}
                  </p>
                </div>
              ))}
      </div>
    </>
  );
};

export default SearchStudentMid;
