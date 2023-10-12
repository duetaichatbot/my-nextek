import React, { useState } from "react";
import style from "./interestCardMid.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useUpdateProfileMutation } from "../../../Redux/interestCard/InterestCards";
import Toastify from "toastify-js";
import myContext from "../../Context/Context";
import { useContext } from "react";
import ListLoader from "../../Components/Loader/ListLoader";

const InterestCardMid = ({ setUpdateWarning }) => {
  // const [about, setAbout] = useState("");
  const { warningFalse } = useContext(myContext);
  const [onChangeProfileImg, setOnChangeProfileImg] = useState("");
  const [onChangeBannerImg, setOnChangeBannerImg] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.user?.role[0];
  const userID = user?.user?._id;
  const userAbout = user?.user?.about;
  const userPhone = user?.user?.phone;
  const userCity = user?.user?.city;
  const userZipCode = user?.user?.zipCode;
  const userState = user?.user?.state;

  const [fields, setFields] = useState({
    city: userCity,
    phone: userPhone,
    zipCode: userZipCode,
    state: userState,
    about: userAbout,
  });
  // console.log(profileImg[0]);
  const handleOnchange = (e) => {
    setFields({ ...fields, [e.target.name]: e.target.value });
  };

  const handleImgSelector = (e) => {
    const files = e.target.files[0];
    setOnChangeProfileImg(files);
  };
  const handleBannerImg = (e) => {
    const files = e.target.files[0];
    setOnChangeBannerImg(files);
  };

  const { city, phone, state, zipCode, about } = fields;

  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  // console.log(userPhone);

  const handleUpdateProfile = async () => {
    try {
      const formData = new FormData();
      formData.append("city", city);
      formData.append("phone", phone);
      formData.append("state", state);
      formData.append("zipCode", zipCode);
      formData.append("about", about);
      formData.append("profileImg", onChangeProfileImg);
      formData.append("bannerImg", onChangeBannerImg);
      const res = await updateProfile({
        userID,
        data: formData,
      });
      console.log(res.data);
      // window.location.reload(false);
      if (!res.error) {
        Toastify({
          text: "Profile updated successfully",
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
        localStorage.setItem("user", JSON.stringify(res.data));
        setFields({
          city: "",
          phone: "",
          zipCode: "",
          state: "",
          about: "",
        });
        warningFalse();
      }
    } catch (error) {
      Toastify({
        text: "Error While Updating Profile",
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

  const handleEmptyFields = () => {
    Toastify({
      text: "All fields are Required",
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
  };

  return (
    <div
      className={`${style.Comp1Wrapper} d-flex flex-column justify-content-center align-items-center gap-5`}
    >
      <h2>Interest Card</h2>

      <label htmlFor="bannerUpload" className={style.profilePiclabel}>
        <div className={style.profilePicDiv}>
          <img
            src={user?.user?.profileImg}
            alt={user?.user?.profileImg}
            className={style.InterestCardMidImg}
          />

          <label>
            Edit Profile
            <FontAwesomeIcon icon={faPenToSquare} className="w-auto" />
            <input
              onChange={handleImgSelector}
              type="file"
              style={{ display: "none" }}
            />
          </label>
        </div>
      </label>

      <label htmlFor="bannerUpload" className={style.bannerPiclabel}>
        <div className={style.bannerPicDiv}>
          <img
            src={user?.user?.bannerImg}
            alt={user?.user?.bannerImg}
            className={style.InterestCardMidBannerImg}
          />

          <label>
            Edit Profile
            <FontAwesomeIcon icon={faPenToSquare} className="w-auto" />
            <input
              onChange={handleBannerImg}
              type="file"
              style={{ display: "none" }}
            />
          </label>
        </div>
      </label>

      <div className={style.innerMainWrapper}>
        <div className={`${style.Comp1InnerWrapper} `}>
          <label>
            <p className="m-0">Firstname</p>
            <input
              type="text"
              placeholder="Firstname..."
              disabled
              value={user?.user?.firstName}
            />
          </label>

          <label>
            <p className="m-0">Lastname</p>
            <input
              type="text"
              placeholder="Lastname..."
              value={user?.user?.lastName}
              disabled
            />
          </label>
          <label>
            <p className="m-0">City</p>
            <input
              type="text"
              placeholder="City..."
              onChange={handleOnchange}
              name="city"
              value={city}
            />
          </label>

          <label>
            <p className="m-0">Phone Number</p>
            <input
              type="number"
              placeholder="phone number"
              onChange={handleOnchange}
              value={phone}
              name="phone"
              maxLength={20}
            />
          </label>

          <label>
            <p className="m-0">Email</p>
            <input
              type="email"
              placeholder="Email..."
              disabled
              value={user?.user?.email}
            />
          </label>
          <label>
            <p className="m-0">ZipCode</p>
            <div>
              <input
                type="number"
                placeholder="Zipcode..."
                onChange={handleOnchange}
                name="zipCode"
                value={zipCode}
              />
            </div>
          </label>

          <label>
            <p className="m-0">State</p>
            <input
              type="text"
              placeholder="state..."
              onChange={handleOnchange}
              name="state"
              value={state}
            />
          </label>

          <label>
            <p className="m-0">Role</p>
            <select name="roles" id="" value={role} disabled>
              <option value="Premium">Premium</option>
              <option value="Professional">Professional</option>
              <option value="Student">Student</option>
            </select>
            {/* <input type="text" placeholder="City..." /> */}
          </label>
        </div>
        <label className={style.InterestCardMidTextArea}>
          <p className="m-0">About</p>
          <textarea
            id="about"
            name="about"
            rows="4"
            cols="50"
            value={about}
            onChange={handleOnchange}
            placeholder="About Yourself..."
            maxLength={250}
          />
        </label>
      </div>
      {isLoading ? (
        <ListLoader />
      ) : city !== "" &&
        phone !== "" &&
        state !== "" &&
        zipCode !== "" &&
        about !== "" ? (
        <button
          style={{
            background: "#0d6efd",
            padding: "0.5rem 1rem",
          }}
          onClick={handleUpdateProfile}
        >
          Complete Profile
        </button>
      ) : (
        <button
          style={{
            background: "#0d6efd",
            padding: "0.5rem 1rem",
          }}
          onClick={handleEmptyFields}
        >
          Complete Profile
        </button>
      )}
    </div>
  );
};

export default InterestCardMid;
