import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import style from "./searchbar.module.css";

const SearchBar = ({
  btnname,
  placeholder,
  setIsFilter,
  setNameFilter,
  nameFilter,
  width = "35rem",
  height = "4rem",
}) => {
  return (
    <>
      <div className={style.searchStudentinputArea}>
        <span
          className={style.searchStudentSpan}
          style={{ width: width, height: height }}
        >
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className={style.searchIcon}
          />
          <input
            type="text"
            name="nameFilter"
            value={nameFilter}
            onChange={(e) => setNameFilter(e.target.value)}
            placeholder={placeholder}
          />
        </span>
        <button onClick={() => setIsFilter(true)}>{btnname}</button>
      </div>
    </>
  );
};

export default SearchBar;
