import React, { useEffect, useState } from "react";
import { Line } from "rc-progress";
import style from "./profileleft.module.css";
import media1 from "../../../../../assets/media/Media 1.png";
import media2 from "../../../../../assets/media/Media 2.png";
import media3 from "../../../../../assets/media/Media 3.png";
import media4 from "../../../../../assets/media/Media 4.png";
import media5 from "../../../../../assets/media/Media 5.png";
import media6 from "../../../../../assets/media/Media 6.png";
import {
  useAcceptInterestCardsMutation,
  useCancelRequestMutation,
  useDeleteFriendMutation,
  useGetCardIDQuery,
  useRejectInterestCardsMutation,
  useSendInterestCardQuery,
  useSendInterestCardsMutation,
} from "../../../../../Redux/interestCard/InterestCards";
import { useParams } from "react-router-dom";
import Toastify from "toastify-js";
import { useGetSingleUserQuery } from "../../../../../Redux/UserSlice/UserSlice";

const mediaPics = [
  media1,
  media2,
  media3,
  media4,
  media5,
  media6,
  media1,
  media2,
  media3,
  media4,
  media5,
  media6,
];

const ProfileLeft = ({
  isMedia = true,
  isButton = false,
  data,
  loadingBar = true,
}) => {
  const [sendInterestCards, { isLoading }] = useSendInterestCardsMutation();
  const userData = JSON.parse(localStorage.getItem("user"));
  const about = userData?.user?.about;
  const phone = userData?.user?.phone;
  const sentByID = userData?.user?._id;
  const { id } = useParams();
  const userID = userData?.user?._id;

  const [acceptInterestCards] = useAcceptInterestCardsMutation();
  const [rejectInterestCards] = useRejectInterestCardsMutation();

  const singleUser = useGetSingleUserQuery(sentByID, {
    skip: !sentByID,
    pollingInterval: 1000,
  });

  const [cancelRequest, { isLoading: cancleCardLoading }] =
    useCancelRequestMutation();

  const [removeConnection] = useDeleteFriendMutation();

  const interestCards = useSendInterestCardQuery(
    {
      userID: sentByID,
      sendTo: id,
    },
    { skip: !sentByID || !id, pollingInterval: 3000 }
  );

  const getCardID = useGetCardIDQuery(
    { userID: userID, sendTo: id },
    {
      skip: !userID || !id,
      pollingInterval: 3000,
    }
  );

  useEffect(() => {}, [id, sentByID, data, interestCards?.data]);
  const onSendCard = async () => {
    try {
      if (about && phone) {
        const res = await sendInterestCards({ sentBy: sentByID, sentTo: id });

        if (!res.error) {
          Toastify({
            text: "Interest Card Sent Successfully",
            duration: 10000,
            newWindow: true,
            close: true,
            gravity: "top",
            position: "center",
            stopOnFocus: true,
            style: {
              background: "#007fff",
              borderRadius: "10px",
              color: "white",
              fill: "white",
            },
            onClick: function () {},
          }).showToast();
          interestCards.refetch();
        }
      } else {
        Toastify({
          text: "Please Complete Your Interest Card First",
          duration: 10000,

          newWindow: true,
          close: true,
          gravity: "top",
          position: "center",
          stopOnFocus: true,
          style: {
            background: "#ffc107",
            borderRadius: "10px",
            color: "white",
            fill: "white",
          },
          onClick: function () {},
        }).showToast();
      }
    } catch (error) {
      Toastify({
        text: "Error While Sending Interest Card",
        duration: 10000,

        newWindow: true,
        close: true,
        gravity: "top",
        position: "center",
        stopOnFocus: true,
        style: {
          background: "#007fff",
          borderRadius: "10px",
          color: "white",
          fill: "white",
        },
        onClick: function () {},
      }).showToast();
    }
  };

  const onCancelCard = async () => {
    try {
      const res = await cancelRequest({
        sendtoId: id,
        userId: sentByID,
      });

      if (!res.error) {
        Toastify({
          text: "Interest Card Cancle Successfully",
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
    } catch (error) {
      Toastify({
        text: "Error While Cancling Interest Card",
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

  const onRemoveFriend = async () => {
    try {
      const res = await removeConnection({
        friendID: id,
        userID: sentByID,
      });
      if (!res.error) {
        Toastify({
          text: "Connection Removed Successfully",
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
    } catch (error) {
      Toastify({
        text: "Error While Removing Connection",
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

  const [percentage, setPercentage] = useState(0);
  const user = JSON.parse(localStorage.getItem("user"));
  const userAbout = user?.user?.about;
  const userPhone = user?.user?.phone;
  const userCity = user?.user?.city;
  const userZipCode = user?.user?.zipCode;
  const userState = user?.user?.state;

  const cardId = getCardID?.data?.map((item) => {
    return item?._id;
  });
  console.log(cardId?.[0]);
  // console.log(percentage);

  useEffect(() => {
    if (userState) {
      setPercentage(20);
    }
    if (userZipCode) {
      setPercentage(40);
    }
    if (userCity) {
      setPercentage(60);
    }
    if (userPhone) {
      setPercentage(80);
    }
    if (userAbout) {
      setPercentage(100);
    }
  }, [userAbout, userPhone, userCity, userZipCode, userState]);

  console.log(interestCards.data, "card");

  const userSide = singleUser?.data?.singleUser?.interestCard?.map((item) => {
    if (item.sentBy === id) {
      return true;
    } else if (item.sentBy === userID) {
      return false;
    }
  });

  const onAcceptHandler = async () => {
    try {
      const res = await acceptInterestCards({
        userID: userID,
        sentById: id,
        cardId: cardId?.[0],
      });
      if (!res.error) {
        // alert("Accepted Successful");
        Toastify({
          text: "Accepted Successful",
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
    } catch (error) {
      Toastify({
        text: "Error While Accepting",
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

  const onRejectHandler = async () => {
    try {
      const res = await rejectInterestCards({
        userID: userID,
        cardId: cardId?.[0],
      });
      if (!res.error) {
        Toastify({
          text: "Rejected Successful",
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
    } catch (error) {
      Toastify({
        text: "Error while Rejecting",
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
    <div className="d-flex flex-column gap-5 mt-5">
      {isButton === true ? (
        interestCards?.data === false ? (
          <span onClick={onSendCard} className={style.sendCard}>
            <button className="w-100">
              {" "}
              {isLoading ? "Sending..." : "Send Card"}{" "}
            </button>
          </span>
        ) : interestCards?.data === "Connected" ? (
          <span onClick={onRemoveFriend} className={style.sendCard}>
            <button className="w-100">
              {" "}
              {cancleCardLoading ? "Removing..." : "Remove Friend"}{" "}
            </button>
          </span>
        ) : interestCards?.data === true && userSide[0] !== true ? (
          <span onClick={onCancelCard} className={style.sendCard}>
            <button className="w-100">
              {" "}
              {cancleCardLoading ? "Canceling..." : "Cancel Card"}{" "}
            </button>
          </span>
        ) : interestCards?.data === true && userSide[0] === true ? (
          <div className="d-flex justify-content-around">
            <span className={style.sendCard} onClick={onAcceptHandler}>
              <button className="w-100 px-4">
                {" "}
                {cancleCardLoading ? "Accepting..." : "Accept"}{" "}
              </button>
            </span>

            <span className={style.sendCard} onClick={onRejectHandler}>
              <button className="w-100 px-4">
                {" "}
                {cancleCardLoading ? "Declining..." : "Decline"}{" "}
              </button>
            </span>
          </div>
        ) : (
          <span className={style.sendCard}>
            <button className="w-100">
              {" "}
              {cancleCardLoading ? "Please Wait...." : "Please Wait...."}{" "}
            </button>
          </span>
        )
      ) : (
        ""
      )}

      {loadingBar && (
        <span>
          {percentage < 100 ? (
            <p style={{ color: "black" }}>Complete Your Profile</p>
          ) : (
            <p style={{ color: "black" }}>Your Profile Is Completed</p>
          )}
          <Line percent={percentage} strokeWidth={4} strokeColor="#007FFF" />
        </span>
      )}

      {/*** about me ***/}
      <div className="d-flex flex-column gap-3">
        <span className="d-flex align-items-center justify-content-between">
          <p
            style={{
              fontWeight: "700",
              margin: "0",
            }}
          >
            About me
          </p>
        </span>
        <div className={style.line}></div>
        <p style={{ wordWrap: "break-word", overflowWrap: "break-word" }}>
          {about}
        </p>
      </div>
      {/***** Photos and videos ****/}
      {isMedia && (
        <div className="d-flex flex-column gap-3">
          <span
            className={`${style.mediaSpan}`}
            style={{
              padding: "0rem 1rem",
            }}
          >
            <p style={{ fontWeight: "700", margin: "0" }}>Photos and Videos</p>
          </span>
          <div className={style.mediaMain}>
            <div className={style.mediawrapper}>
              {mediaPics.map((pics, index) => (
                <img
                  src={pics}
                  alt={pics}
                  key={index}
                  className={style.mediaImg}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileLeft;
