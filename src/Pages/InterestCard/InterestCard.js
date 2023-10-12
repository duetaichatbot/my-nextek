import { Col, Container, Row } from "react-bootstrap";
import Header from "../Components/Other/Header";
import HomeLeft from "../Components/Home/HomeLeft";
import InterestCardMid from "./interestCardComp/InterestCardMid";
import style from "./interestcard.module.css";
import { useNavigate } from "react-router";

const InterestCard = () => {
  const navigation = useNavigate();

  return (
    <Container
      fluid
      style={{
        height: "100vh",
        overflow: "hidden",
        padding: "0rem",
      }}
      className={style.interestcardwrapper}
    >
      <Header />
      <Row>
        <Col
          lg="2"
          style={{
            boxShadow: "1px 1px 5px -1px grey",
            paddingLeft: "1.5rem",
          }}
        >
          <HomeLeft />
        </Col>
        <Col
          lg="10"
          className="d-flex justify-content-center align-items-center"
          style={{
            padding: "1rem",
          }}
        >
          <div className={style.interestcardMidWrapper}>
            <div className="text-center my-5">
              <button
                style={{
                  background: "#0d6efd",
                  padding: "0.5rem 1rem",
                }}
                onClick={() => navigation("/updatequestionaire")}
              >
                Edit Your Questionaire
              </button>
            </div>
            <InterestCardMid />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default InterestCard;
