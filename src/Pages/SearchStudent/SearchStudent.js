import React from "react";
import Header from "../Components/Other/Header";
import { Col, Container, Row } from "react-bootstrap";
import HomeLeft from "../Components/Home/HomeLeft";
// import HomeRight from "../Components/Home/HomeRight";
import SearchStudentMid from "./SearchStudentComp/SearchStudentMid";
import style from "./searchstudent.module.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import FilterModal from "../Components/Modal/FilterModal";

const SearchStudent = () => {
  const [isFilter, setIsFilter] = useState(false);
  const [filteredData, setFilteredData] = useState({
    firstName: "",
    lastName: "",
    state: "",
    city: "",
    zipCode: "",
    institute:""
  });
  
console.log(filteredData)
  const handleOnChange = (e) => {
    setFilteredData({ ...filteredData, [e.target.name]: e.target.value });
  };

  const onApplyFilter = () => {
    setIsFilter(false);
  };

  return (
    <>
      <div className={style.searchstudentWrapper}>
        <Header />

        {/* <HomeHeader /> */}

        <Container fluid>
          <Row>
            <Col
              lg="2"
              style={{
                boxShadow: "1px 1px 5px -1px grey",
              }}
            >
              <HomeLeft />
            </Col>
            <Col lg="10" style={{ height: "90vh", overflowY: "scroll" }}>
              <SearchStudentMid
                filteredData={filteredData}
                setIsFilter={setIsFilter}
              />
            </Col>
          </Row>
          {isFilter && (
            <div className={style.modalDiv}>
              <span className={style.modalSpan}>
                <FilterModal
                  handleOnChange={handleOnChange}
                  filteredData={filteredData}
                  onApplyFilter={onApplyFilter}
                  setIsFilter={setIsFilter}
                  FilteredFields={setFilteredData}
                />
              </span>
            </div>
          )}
        </Container>
      </div>
    </>
  );
};

export default SearchStudent;
