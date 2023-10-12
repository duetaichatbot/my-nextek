import React from "react";
import HomeFeed from "../Components/Home/HomeFeed";
// import { useNavigate } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import HomeLeft from "../Components/Home/HomeLeft";
import HomeRight from "../Components/Home/HomeRight";
import styles from "./home.module.css";
import Header from "../Components/Other/Header";

function Home() {
  // const [isCommentsOpen, setIsCommetnsOpen] = useState(false);
  return (
    <>
      <div className={styles.homeWrapper}>
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
            <Col lg="7">
              <HomeFeed />
            </Col>
            <Col
              lg="3"
              style={{
                padding: "0",
              }}
            >
              <HomeRight />
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default Home;
