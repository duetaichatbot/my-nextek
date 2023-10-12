import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import styles from "./payment.module.css";
import Form from "react-bootstrap/Form";
import masterCardImg from "../../assets/mastercard-logo.png";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import API_BASE_URL from "../../Config";
import { useYearlySubsMutation } from "../../Redux/stripeSlice/Striple";

function Payment() {
  const [paymentTime, setPaymentTime] = useState(false);
  const [cardNumber, setCardNumber] = useState("");

  const [yearlySubs] = useYearlySubsMutation();
  const handlePaymentTime = () => {
    setPaymentTime(!paymentTime);
  };

  const location = useLocation();
  const data = location?.state?.data;

  console.log(data);

  const formatCardNumber = (e) => {
    const input = e.target.value;
    const sanitizedInput = input.replace(/[^0-9]/g, ""); // Remove any non-numeric characters

    let truncatedInput = sanitizedInput; // Variable to store the truncated input

    if (sanitizedInput.length > 16) {
      // If input exceeds 16 digits, truncate it to 16 digits
      truncatedInput = sanitizedInput.slice(0, 16);
    }

    const cardNumberFormatted = truncatedInput
      .split("")
      .map((char, index) => {
        if (
          index > 0 &&
          index % 4 === 0 &&
          index !== truncatedInput.length - 0
        ) {
          return `-${char}`;
        }
        return char;
      })
      .join("");

    setCardNumber(cardNumberFormatted);
  };

  const navigate = useNavigate();

  // form Fields
  const [email, setEmail] = useState("");
  // const [token, setToken] = useState("tok_visa");
  const [card_exp_month, setCard_exp_month] = useState("");
  const [card_exp_year, setCard_exp_year] = useState("");
  const [card_cvc, setCard_cvc] = useState("");

  const userData = JSON.parse(localStorage.getItem("user"));

  console.log(userData.user._id);

  // const handleCheckout = async () => {
  //   try {
  //     const response = await fetch(
  //       `${API_BASE_URL}/api/create-payment-intent/${userData.user._id}`,
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           userID: "64aef52e08e4c601cbb7c4b2",
  //           email: "user@example.com",
  //           amount: 1000, // Replace with the actual amount
  //           card_number: "4242424242424242",
  //           card_exp_month: 12,
  //           card_exp_year: 2023,
  //           card_cvc: "123",
  //         }),
  //       }
  //     );
  //     alert("Payment Success");
  //     navigate("/newsfeed");
  //     // Navigate To Thank You Page
  //     console.log(response, "Response Of Checkout");
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // Assuming you have a form with inputs for the required subscription details
  const handleSubscribeMonthly = async () => {
    const userID = userData.user._id; // Replace with the actual user ID
    const email = userData.user.email; // Replace with the user's email

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/create-monthly-subscription/${userID}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: userData.user.email,
            plan: "price_1NgWcNJ8CQqp3LxfiyLuvKFT",
            card_number: cardNumber.split("-").join(""),
            card_exp_month,
            card_exp_year,
            card_cvc,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        console.log("Subscription successful:", data.message);
        alert(`Monthly ${data.message}`);
        // localStorage.clear();
        localStorage.setItem("user", JSON.stringify(userData));
        navigate("/newsfeed");
        // Handle success, e.g., update UI or redirect to a success page
      } else {
        console.log("Subscription failed:", data.error);
        // Handle error, e.g., display an error message to the user
      }
    } catch (error) {
      console.log("An error occurred:", error);
      // Handle general error, e.g., display a generic error message
    }
  };

  const handleSubscribeYearly = async () => {
    const userID = userData?.user?._id;
    const email = userData?.user?.email;

    try {
      // const res = await yearlySubs({
      //   userID: userID,
      //   data: {
      //     email,
      //     plan: "price_1NgWcNJ8CQqp3LxfiyLuvKFT",
      //     card_number: cardNumber.split("-").join(""),
      //     card_exp_month,
      //     card_exp_year,
      //     card_cvc,
      //   },
      // });

      const response = await fetch(
        `${API_BASE_URL}/api/create-yearly-subscription/${userID}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: userData.user.email,
            plan: "price_1NgWcNJ8CQqp3LxfiyLuvKFT",
            card_number: cardNumber.split("-").join(""),
            card_exp_month,
            card_exp_year,
            card_cvc,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        console.log("Subscription successful:", data.message);
        alert(`Yearly ${data.message}`);
        // localStorage.clear();
        localStorage.setItem("user", JSON.stringify(userData));
        navigate("/newsfeed");
      } else {
        console.log("Subscription failed:", data.error);
      }
    } catch (error) {
      console.log("An error occurred:", error);
    }
  };

  return (
    <>
      <div className={styles.paymentWrapper}>
        <Container className={styles.cardWrapper}>
          <Row>
            <div className="d-flex align-items-center justify-content-between">
              {!paymentTime ? (
                <h4>Yearly Package</h4>
              ) : (
                <h4>Monthly Package</h4>
              )}
              <div class="form-check form-switch">
                <input
                  class="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="flexSwitchCheckDefault"
                  style={{
                    fontSize: "1.3rem",
                  }}
                  onChange={handlePaymentTime}
                />
              </div>
            </div>
            <Col m="12">
              <h5 className="fw-bold">Card Number</h5>
              <p>Enter the 16-digit card number on the card</p>
            </Col>
          </Row>
          <Row className={`gx-0 ${styles.masterCardWrapper}`}>
            <div
              className={`text-center d-flex justify-content-center align-items-center`}
            >
              <img
                alt="mastercard"
                width="30px"
                height="20px"
                src={masterCardImg}
              />

              <Form.Control
                className={styles.fields}
                type="text"
                placeholder="Card Number"
                value={cardNumber}
                onChange={formatCardNumber}
              />
            </div>
          </Row>
          <Row className="py-4 gx-0">
            <Col
              md="6"
              className="d-flex justify-content-center align-items-start flex-column"
            >
              <h6 className="fw-bold">CVV Number</h6>
              <p>Enter the 3 to 4 digit number on the card</p>
            </Col>
            <Col md="6" className="d-flex align-items-center ">
              <Form.Control
                type="text"
                className={styles.inputfields}
                value={card_cvc}
                onChange={(e) => setCard_cvc(e.target.value)}
                placeholder="CVV Number"
              />
            </Col>
          </Row>

          <Row className="pb-4 gx-0">
            <Col
              md="7"
              className="d-flex justify-content-center align-items-start flex-column"
            >
              <h6 className="fw-bold">Expiry Date </h6>
              <p>Enter the Expiration date of the card</p>
            </Col>
            <Col md="2" xs="5" className="d-flex align-items-center ">
              <Form.Control
                placeholder="Month"
                type="text"
                value={card_exp_month}
                onChange={(e) => setCard_exp_month(e.target.value)}
                className={styles.inputfields}
              />
            </Col>
            <Col
              md="1"
              xs="2"
              className="d-flex justify-content-center align-items-center "
            >
              <h3 className="fw-bold">/</h3>
            </Col>
            <Col md="2" xs="5" className="d-flex align-items-center ">
              <Form.Control
                placeholder="Year"
                value={card_exp_year}
                onChange={(e) => setCard_exp_year(e.target.value)}
                type="text"
                className={styles.inputfields}
              />
            </Col>
          </Row>

          <Row className="py-4">
            {paymentTime ? (
              <button onClick={handleSubscribeMonthly}>Pay Now</button>
            ) : (
              <button onClick={handleSubscribeYearly}>Pay Now</button>
            )}
          </Row>
        </Container>
      </div>
    </>
  );
}

export default Payment;

// import React, { useState, useEffect } from "react";
// import API_BASE_URL from "../../Config";
// import { useNavigate } from "react-router-dom";

// const CheckOut = () => {
//   const navigate = useNavigate();

//   // form Fields
//   const [email, setEmail] = useState("");
//   // const [token, setToken] = useState("tok_visa");
//   const [card_number, setCard_number] = useState("");
//   const [card_exp_month, setCard_exp_month] = useState("");
//   const [card_exp_year, setCard_exp_year] = useState("");
//   const [card_cvc, setCard_cvc] = useState("");

//   const userData = JSON.parse(localStorage.getItem("user"));

//   console.log(userData.user);

//   const handleCheckout = async () => {
//     try {
//       const response = await fetch(
//         `${API_BASE_URL}/api/create-payment-intent/${userData.user._id}`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             userID: "64aef52e08e4c601cbb7c4b2",
//             email: "user@example.com",
//             amount: 1000, // Replace with the actual amount
//             card_number: "4242424242424242",
//             card_exp_month: 12,
//             card_exp_year: 2023,
//             card_cvc: "123",
//           }),
//         }
//       );
//       alert("Payment Success");
//       navigate("/newsfeed");
//       // Navigate To Thank You Page
//       console.log(response, "Response Of Checkout");
//     } catch (error) {
//       console.error(error);
//     }
//   };
//   // Assuming you have a form with inputs for the required subscription details
//   const handleSubscribeMonthly = async () => {
//     const userID = userData.user._id; // Replace with the actual user ID
//     const email = userData.user.email; // Replace with the user's email

//     try {
//       const response = await fetch(
//         `${API_BASE_URL}/api/create-monthly-subscription/${userID}`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             email,
//             plan: "price_1NgWZHJ8CQqp3LxfvJ8w87hh",
//             card_number,
//             card_exp_month,
//             card_exp_year,
//             card_cvc,
//           }),
//         }
//       );

//       const data = await response.json();

//       if (response.ok) {
//         console.log("Subscription successful:", data.message);
//         alert(`Monthly ${data.message}`);
//         // Handle success, e.g., update UI or redirect to a success page
//       } else {
//         console.log("Subscription failed:", data.error);
//         // Handle error, e.g., display an error message to the user
//       }
//     } catch (error) {
//       console.log("An error occurred:", error);
//       // Handle general error, e.g., display a generic error message
//     }
//   };

//   const handleSubscribeYearly = async () => {
//     const userID = userData.user._id;
//     const email = userData.user.email;

//     try {
//       const response = await fetch(
//         `${API_BASE_URL}/api/create-yearly-subscription/${userID}`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             email,
//             plan: "price_1NgWcNJ8CQqp3LxfiyLuvKFT",
//             card_number,
//             card_exp_month,
//             card_exp_year,
//             card_cvc,
//           }),
//         }
//       );

//       const data = await response.json();

//       if (response.ok) {
//         console.log("Subscription successful:", data.message);
//         alert(`Yearly ${data.message}`);
//         // Handle success, e.g., update UI or redirect to a success page
//       } else {
//         console.log("Subscription failed:", data.error);
//         // Handle error, e.g., display an error message to the user
//       }
//     } catch (error) {
//       console.log("An error occurred:", error);
//       // Handle general error, e.g., display a generic error message
//     }
//   };

//   useEffect(() => {}, []);

//   return (
//     <>
//       <div>
//         <form>
//           <input
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />

//           {/* <input placeholder='Token' value={token} onChange={(e) => setToken(e.target.value)} />
//            */}

//           <input
//             placeholder="card_number"
//             value={card_number}
//             onChange={(e) => setCard_number(e.target.value)}
//           />

//           <input
//             placeholder="card_exp_month"
//             value={card_exp_month}
//             onChange={(e) => setCard_exp_month(e.target.value)}
//           />

//           <input
//             placeholder="card_exp_year"
//             value={card_exp_year}
//             onChange={(e) => setCard_exp_year(e.target.value)}
//           />

//           <input
//             placeholder="card_cvc"
//             value={card_cvc}
//             onChange={(e) => setCard_cvc(e.target.value)}
//           />
//         </form>
//         <button onClick={handleCheckout}>Checkout</button>
//         <button onClick={handleSubscribeMonthly}>Monthly Subscription</button>
//         <button onClick={handleSubscribeYearly}>Yearly Subscription</button>
//       </div>
//     </>
//   );
// };

// export default CheckOut;
