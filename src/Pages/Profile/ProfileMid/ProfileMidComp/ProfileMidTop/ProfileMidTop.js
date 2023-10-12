import React from "react";
import bgPic from "../../../../../assets/profileBG.png";
import profilePic from "../../../../../assets/profilePic.png";
import style from "./profilemidtop.module.css";
import { useParams } from "react-router-dom";
// import Swiper from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
// import { Swiper, SwiperSlide } from "swiper/react";

const Data = [
  {
    name: "Post",
    value: "10,3K",
  },
  {
    name: "Followers",
    value: "2,315",
  },
  {
    name: "Following",
    value: "3,012",
  },
  {
    name: "Likes",
    value: "12,5k",
  },
  {
    name: "Photo",
    value: "16",
  },
  {
    name: "Video",
    value: "56",
  },
  {
    name: "Saved",
    value: "12",
  },
];

const breakpoints = {
  280: {
    slidesPerView: 4,
    spaceBetween: 5,
  },
  320: {
    slidesPerView: 5,
    spaceBetween: 10,
  },
  480: {
    slidesPerView: 6,
    spaceBetween: 10,
  },
  768: {
    slidesPerView: 4,
    spaceBetween: 10,
  },
  1024: {
    slidesPerView: 5,
    spaceBetween: 5,
  },
};

const user = JSON.parse(localStorage.getItem("user"));

const ProfileMidTop = ({ isSwiper = true, data }) => {
  const { id } = useParams();

  return (
    <>
      <div className={style.profileTopWrapper}>
        <img
          src={id !== user?.user?._id ? data?.bannerImg : user?.user?.bannerImg}
          alt={bgPic}
          className={style.bgpic}
        />
        <span className={style.profileSpan}>
          <span className="d-flex align-items-center gap-3">
            <img
              src={
                id !== user?.user?._id
                  ? data?.profileImg
                  : user?.user?.profileImg
              }
              alt={"no Img found"}
              className={style.profilePic}
            />
            <div className={style.profileSpanDiv}>
              <h2>
                {id !== user?.user?._id
                  ? data?.firstName
                  : user?.user?.firstName}
              </h2>
              <p>
                {id !== user?.user._id ? data?.role[0] : user?.user?.company}
              </p>
            </div>
          </span>
          {isSwiper && (
            <div className={`${style.swiperDiv}`}>
              {Data.map((item, index) => (
                <span
                  className={`${style.swiper} d-flex flex-column justify-content-center align-items-center`}
                  tabIndex="0"
                  key={index + 1}
                >
                  <p className={style.swiperPara}>{item.name}</p>
                  <p className={style.swiperPara}>{item.value}</p>
                </span>
              ))}
            </div>
          )}
        </span>
        {isSwiper && (
          <div className={`${style.swiperDivSecond}`}>
            <Swiper
              breakpoints={breakpoints}
              className={style.swiperDivSecondSlider}
            >
              {Data.map((item, index) => (
                <SwiperSlide key={index + 1}>
                  <span
                    className={`${style.swiper} d-flex flex-column justify-content-center align-items-center`}
                    tabIndex="0"
                  >
                    <p className={style.swiperPara}>{item.name}</p>
                    <p className={style.swiperPara}>{item.value}</p>
                  </span>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
      </div>
    </>
  );
};

export default ProfileMidTop;
