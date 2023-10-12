import React, { useState } from "react";
import style from "./discussionchat.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import {
  useGetChatsQuery,
  useSendMessageMutation,
} from "../../../../Redux/chat/Chat";
import Toastify from "toastify-js";

const DiscussionChat = (connectionChat) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const userID = user.user._id;
  const connectionID = connectionChat.connectionChat._id;

  const [message, setMessage] = useState("");
  const getChats = useGetChatsQuery(
    { userID, connectionID },
    { skip: !userID || !connectionID, pollingInterval: 1000 }
  );

  const [sendMessage, { isLoading }] = useSendMessageMutation();

  const onSendMessage = async () => {
    try {
      const res = await sendMessage({
        userID: userID,
        connectionID: connectionID,
        message,
      });
      // setA(res.data);

      if (!res.error) {
        // alert("Message Sent");
        setMessage("");
      }
    } catch (error) {
      Toastify({
        text: "Error While Sending Message",
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
    <div className={style.DiscussionChatWrapper}>
      <div className={style.chatbox}>
        <span className={style.chatHeader}>
          <FontAwesomeIcon
            icon={faArrowLeft}
            style={{
              color: "white",
              cursor: "pointer",
            }}
          />
          <img
            src={connectionChat.connectionChat.profileImg}
            alt={user?.user?.profileImg}
            style={{
              borderRadius: "50%",
            }}
          />
          <p className="m-0">
            {" "}
            {connectionChat.connectionChat.firstName +
              " " +
              connectionChat.connectionChat.lastName}{" "}
          </p>
        </span>
        {/* message sendBy  */}
        {getChats?.data?.chats.map((message, index) => (
          <div
            style={{
              border: "none",
              display: "flex",
              flexDirection: "column",
            }}
            key={index}
          >
            {message.connectionID === user?.user?._id ? (
              <span className={style.sentBy}>
                <div
                  style={{
                    border: "none",
                  }}
                >
                  <p className="m-0">{message?.message}</p>
                  <span className="w-100">
                    <p className="m-0">{message.timestamp}</p>
                  </span>
                </div>
              </span>
            ) : (
              <>
                {/* message sendTo  */}
                <span className={style.sentTo}>
                  <div
                    style={{
                      border: "none",
                    }}
                  >
                    <p className="m-0">{message?.message}</p>
                    <span>
                      <p className="m-0">{message.timestamp}</p>
                    </span>
                  </div>
                </span>
              </>
            )}
          </div>
        ))}
      </div>
      <div>
        {/* <EmojiPicker /> */}
        <input
          type="text"
          placeholder="Send your message…"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        {isLoading === false && message !== "" ? (
          <FontAwesomeIcon
            onClick={onSendMessage}
            icon={faPaperPlane}
            className={style.DiscussionChatIcon}
          />
        ) : (
          <FontAwesomeIcon
            // onClick={onSendMessage}
            icon={faPaperPlane}
            className={style.DiscussionChatIcon}
          />
        )}
      </div>
    </div>
  );
};

export default DiscussionChat;
