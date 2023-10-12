import React from "react";
import style from "./DiscussionRight.module.css";
import DiscussionChat from "./DiscussionChat/DiscussionChat";
import { useNavigate } from "react-router-dom";
import {
  useAcceptInterestCardsMutation,
  useDeleteFriendMutation,
  useRejectInterestCardsMutation,
} from "../../../Redux/interestCard/InterestCards";
import Toastify from "toastify-js";

const DiscussionRight = ({
  isChat,
  setIsChat,
  cardData,
  connectionChat,
  isDirectMessage,
  isAllusers,
  removeData,
}) => {
  const navigate = useNavigate();
  console.log(connectionChat?._id);
  const userData = JSON.parse(localStorage.getItem("user"));
  const userID = userData?.user?._id;
  const friendID = connectionChat?._id;

  const sentById = cardData?.sentBy?._id;

  const [acceptInterestCards] = useAcceptInterestCardsMutation();
  const [rejectInterestCards] = useRejectInterestCardsMutation();
  const [removeFriends] = useDeleteFriendMutation();

  const handleDeleteFriends = async () => {
    try {
      const res = await removeFriends({
        userID,
        friendID,
      });
      if (!res.error) {
        Toastify({
          text: "Friend Remove successfully",
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
        await removeData();
      }
    } catch (error) {
      Toastify({
        text: "Error While deleting friend",
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

  const onAcceptHandler = async (cardId) => {
    try {
      const res = await acceptInterestCards({ userID, sentById, cardId });

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
        window.location.reload(false);
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

  const onRejectHandler = async (cardId) => {
    try {
      const res = await rejectInterestCards({ userID, cardId });
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
        window.location.reload(false);
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
    <div className={style.DiscussionRightWrapper}>
      <div className="d-flex justify-content-between">
        {isDirectMessage === true && <h1>Interest Card</h1>}
        {connectionChat?._id && <h1>Interest Card</h1>}
        {isAllusers && connectionChat?._id && (
          <button onClick={handleDeleteFriends}>Remove Friends</button>
        )}
      </div>
      {isAllusers && connectionChat?._id ? (
        <>
          <div className={style.DiscussionRightWrapperDiv}>
            <h2>
              {connectionChat?.firstName + " " + connectionChat?.lastName}
            </h2>
            <p>
              @Jonbovi created this private channel on January 17th, 2020. This
              is the very beginning of the designspace-square channel.
            </p>
          </div>
          <div
            style={{ padding: "0rem 5rem" }}
            className={style.DiscussionRightBottom}
          >
            <p>
              I am interested in learning about the career opportunities at your
              dealership. Please let me know when you would have time to
              connect.
            </p>
            <div style={{ padding: "3rem 0rem" }}>
              <div className={style.discussionProfile}>
                <div className={style.overlay}></div>
                <div
                  className={`${style.DiscussionRightprofile} d-flex align-items-center justify-content-between`}
                >
                  <span className="d-flex align-items-center gap-2">
                    <img
                      src={connectionChat?.profileImg}
                      width="110px"
                      style={{
                        width: "7rem",
                        height: "7rem",
                        borderRadius: "50%",
                      }}
                      alt={connectionChat?.profileImg}
                    />
                    <h3 style={{ color: "white" }}>
                      {connectionChat?.firstName +
                        " " +
                        connectionChat?.lastName}
                    </h3>
                  </span>
                  <button
                    onClick={() =>
                      navigate(`/home-profile/${connectionChat?._id}`)
                    }
                  >
                    View Profile
                  </button>
                </div>
              </div>
              <div className={`${style.jobType} d-flex justify-content-end `}>
                <span>
                  <p>City</p>
                  <p>{connectionChat?.city}</p>
                </span>
                <span>
                  <p>Phone</p>
                  <p>{connectionChat?.phone}</p>
                </span>
                <span>
                  <p>Zip code</p>
                  <p>{connectionChat?.zipCode}</p>
                </span>
              </div>
            </div>
            <div className={style.DiscussionRightBTN}>
              {isChat === "true" ? (
                "Now You Can Start Chatting"
              ) : (
                <>
                  <button onClick={() => setIsChat("false")}>Decline</button>
                  <button onClick={() => setIsChat("true")}>Accept</button>
                </>
              )}
            </div>
          </div>
        </>
      ) : null}

      {/* Direct Message */}
      {isDirectMessage === true ? (
        <>
          <div className={style.DiscussionRightWrapperDiv}>
            <h2>
              {cardData?.sentBy?.firstName + " " + cardData?.sentBy?.lastName}
            </h2>
            <p>
              @Jonbovi created this private channel on January 17th, 2020. This
              is the very beginning of the designspace-square channel.
            </p>
          </div>
          <div
            style={{ padding: "0rem 5rem" }}
            className={style.DiscussionRightBottom}
          >
            <p>
              I am interested in learning about the career opportunities at your
              dealership. Please let me know when you would have time to
              connect.
            </p>
            <div style={{ padding: "3rem 0rem" }}>
              <div className={style.discussionProfile}>
                <div className={style.overlay}></div>
                <div
                  className={`${style.DiscussionRightprofile} d-flex align-items-center justify-content-between`}
                >
                  <span className="d-flex align-items-center gap-2">
                    <img
                      src={cardData?.sentBy?.profileImg}
                      width="110px"
                      style={{
                        width: "7rem",
                        height: "7rem",
                        borderRadius: "50%",
                      }}
                      alt={cardData?.sentBy?.profileImg}
                    />
                    <h3 style={{ color: "white" }}>
                      {cardData?.sentBy?.firstName +
                        " " +
                        cardData?.sentBy?.lastName}
                    </h3>
                  </span>
                  <button
                    onClick={() =>
                      navigate(`/home-profile/${cardData?.sentBy?._id}`)
                    }
                  >
                    View Profile
                  </button>
                </div>
              </div>
              <div className={`${style.jobType} d-flex justify-content-end `}>
                <span>
                  <p>Job Type</p>
                  <p>Full Time</p>
                </span>
                <span>
                  <p>Experience</p>
                  <p>Min.1 Year</p>
                </span>
                <span>
                  <p>Month Salary</p>
                  <p>$200</p>
                </span>
              </div>
            </div>
            <div className={style.DiscussionRightBTN}>
              {isChat === "true" ? (
                "Now You Can Start Chatting"
              ) : (
                <>
                  <button onClick={() => onRejectHandler(cardData?._id)}>
                    Decline
                  </button>
                  <button onClick={() => onAcceptHandler(cardData?._id)}>
                    Accept
                  </button>
                </>
              )}
            </div>
          </div>
        </>
      ) : (
        ""
      )}

      {isChat && <DiscussionChat connectionChat={connectionChat} />}
    </div>
  );
};

export default DiscussionRight;
