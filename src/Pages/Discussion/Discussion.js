import React, { useState } from "react";
import styles from "./discussion.module.css";
import { Col, Container, Row } from "react-bootstrap";
import HomeLeft from "../Components/Home/HomeLeft";
import Header from "../Components/Other/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
// import cardImg1 from "../../assets/cardImg1.png";
// import cardImg2 from "../../assets/cardImg2.png";
// import cardImg3 from "../../assets/cardImg3.png";
import DiscussionRight from "./DiscussionComp/DiscussionRight";
import {
  useGetConnectionsQuery,
  useGetInterestCardsQuery,
} from "../../Redux/interestCard/InterestCards";

function Discussion() {
  const [filterChat, setFilterChat] = useState("");
  const [isChat, setIsChat] = useState("");
  const [isDiscussion, setIsDiscussion] = useState(false);
  const [isDirectMessage, setIsDirectMessage] = useState(false);
  const [isAllusers, setIsAllusers] = useState(false);

  const [selectedChat, setSelectedChat] = useState({});

  const [connectionChat, setConnectionChat] = useState({});
  console.log(connectionChat);
  const userData = JSON.parse(localStorage.getItem("user"));
  const userID = userData.user._id;

  const getInterestCards = useGetInterestCardsQuery(userID, {
    skip: !userID,
  });
  const getConnections = useGetConnectionsQuery(userID, {
    skip: !userID,
  });

  const chatSelector = (id) => {
    setSelectedChat(id);
    setIsDirectMessage(true);
    setIsAllusers(false);
    setIsDiscussion(true);
    setIsChat("");
  };
  
  const removeData = () => {
    setConnectionChat({});
    setIsChat("");
  };

  const connectionChatSelector = (item) => {
    setConnectionChat(item);
    setIsDiscussion(true);
    setIsAllusers(true);
    setIsChat("true");
    setIsDirectMessage(false);
  };

  return (
    <>
      <Header />
      <Container
        fluid
        className={styles.discussionWrapper}
        style={{
          height: "88vh",
          overflow: "hidden",
        }}
      >
        <Row>
          <Col
            lg="2"
            style={{
              boxShadow: "1px 1px 5px -1px grey",
            }}
          >
            <HomeLeft />
          </Col>
          <Col
            lg="3"
            className={styles.discussionMid}
            style={{
              height: "100%",
              marginLeft: "1rem",
              marginTop: "1rem",
            }}
          >
            <div className="d-flex justify-content-between align-items-center">
              <h5 style={{ fontWeight: "700" }}>Discussion</h5>
              <FontAwesomeIcon icon={faSearch} className="fa-lg" />
            </div>
            <h6 className="pt-4 pb-3" style={{ color: "#84818A" }}>
              Pending Cards
            </h6>
            <div className={styles.interestCardWrapper}>
              {/* <input type="text" placeholder="Search..." /> */}
              {getInterestCards?.data?.interestCards.length !== 0 ? (
                getInterestCards?.data?.interestCards.map((item, index) => (
                  <div
                    className={`${styles.interstCards} d-flex justify-content-between align-items-center`}
                    style={{ position: "relative" }}
                    onClick={() => chatSelector(item)}
                    role="button"
                    key={index + 1}
                  >
                    <div className="d-flex align-items-center">
                      <img
                        src={item.sentBy.profileImg}
                        className={styles.reqImg}
                        alt="card"
                      />
                      <div className="ps-3 fw-bold">
                        {item?.sentBy?.firstName + " " + item?.sentBy?.lastName}
                      </div>
                    </div>
                    <div className={styles.textCounter}>{item.textCount}</div>
                  </div>
                ))
              ) : (
                <span className="pt-3 text-center">No Cards Yet</span>
              )}
            </div>

            <h6 className="pt-4 pb-3" style={{ color: "#84818A" }}>
              Your Chats
            </h6>
            <div className={styles.interestCardWrapper}>
              <input
                type="text"
                placeholder="Search..."
                onChange={(e) => setFilterChat(e.target.value)}
              />
              {getConnections?.data?.allConnections
                ?.filter((item) =>
                  item.firstName
                    .toLowerCase()
                    .includes(filterChat.toLowerCase())
                )
                .map((item, index) => (
                  <div
                    key={index + 1}
                    role="button"
                    className={`${styles.interstCards} d-flex justify-content-between align-items-center`}
                    style={{ position: "relative" }}
                    onClick={() => {
                      connectionChatSelector(item);
                    }}
                  >
                    <div className="d-flex align-items-center">
                      <img
                        src={item.profileImg}
                        className={styles.reqImg}
                        alt="card"
                      />
                      <div className="ps-3 fw-bold">
                        {item.firstName + " " + item.lastName}
                      </div>
                    </div>
                    <div className={styles.textCounter}>{item.textCount}</div>
                  </div>
                ))}
            </div>
          </Col>
          <Col
            lg="6"
            className={styles.DiscussionRight}
            style={{
              height: "87vh",
              overflowY: "scroll",
            }}
          >
            {isDiscussion && (
              <DiscussionRight
                isChat={isChat}
                cardData={selectedChat}
                connectionChat={connectionChat}
                isDirectMessage={isDirectMessage}
                isAllusers={isAllusers}
                setIsChat={setIsChat}
                removeData={removeData}
              />
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Discussion;
