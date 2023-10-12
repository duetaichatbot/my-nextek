import Card from "react-bootstrap/Card";
import style from "./Modal.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useGetAllUsersQuery } from "../../../Redux/UserSlice/UserSlice";

const FilterModal = ({
  setIsFilter,
  filteredData,
  handleOnChange,
  onApplyFilter,
  FilteredFields,
}) => {
  return (
    <>
      <Card
        style={{
          padding: "5rem",
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "35px",
          backgroundColor: "rgb(243 243 243)",
        }}
      >
        <h1
          style={{
            fontWeight: "bold",
          }}
        >
          Filter Your Data
        </h1>
        <button className={style.searchFilterBackButton}>
          <FontAwesomeIcon
            icon={faCircleXmark}
            onClick={() => setIsFilter(false)}
            style={{
              color: "#007fff",
              fontSize: "1.5rem",
              cursor: "pointer",
            }}
          />
        </button>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gridGap: "2rem",
          }}
          className={style.FilterWrapper}
        >
          <span className="d-flex flex-column gap-2">
            <label>Firstname</label>
            <input
              type="text"
              name="firstName"
              onChange={handleOnChange}
              placeholder="Firstname.."
              value={filteredData?.firstName}
            />
          </span>
          <span className="d-flex flex-column gap-2">
            <label>Lastname</label>
            <input
              type="text"
              name="lastName"
              onChange={handleOnChange}
              placeholder="Lastname.."
              value={filteredData?.lastName}
            />
          </span>

          <span className="d-flex flex-column gap-2">
            <label>State</label>
            <input
              type="text"
              value={filteredData?.state}
              onChange={handleOnChange}
              name="state"
              placeholder="State.."
            />
          </span>
          <span className="d-flex flex-column gap-2">
            <label>City</label>
            <input
              type="text"
              name="city"
              onChange={handleOnChange}
              value={filteredData?.city}
              placeholder="City.."
            />
          </span>
          <span className="d-flex flex-column gap-2">
            <label>Zip Code</label>
            <input
              value={filteredData?.zipCode}
              type="text"
              name="zipCode"
              onChange={handleOnChange}
              placeholder="Zip Code"
            />
          </span>
          <span className="d-flex flex-column gap-2">
            <label>Institute</label>

            <input
              value={filteredData?.institute}
              type="text"
              name="institute"
              onChange={handleOnChange}
              placeholder="Institute"
            />
          </span>
        </div>
        <div className="d-flex align-items-center justify-content-center gap-2 ">
          <button
            style={{
              width: "10rem",
              borderRadius: "10px",
            }}
            className={style.searchFilterButton}
            onClick={onApplyFilter}
          >
            Apply Filters
          </button>
          <button
            style={{
              width: "10rem",
              borderRadius: "10px",
            }}
            className={style.searchFilterButton}
            onClick={() => {
              FilteredFields({
                firstName: "",
                lastName: "",
                state: "",
                city: "",
                zipCode: "",
                institute: "",
              });
            }}
          >
            Clear Filters
          </button>
        </div>
      </Card>
    </>
  );
};

export default FilterModal;
