import { useState, useRef } from "react";
import style from "../Signup/otp.module.css";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import {
  useResendOtpMutation,
  useVerifyOtpMutation,
} from "../../Redux/UserSlice/UserSlice";
import Toastify from "toastify-js";

const VerifyOtp = () => {
  const navigate = useNavigate();

  const [otp, setOtp] = useState("");

  // eslint-disable-next-line
  const [verifyOtp, { isError }] = useVerifyOtpMutation();

  const [resendOtp] = useResendOtpMutation();

  const inputRefs = useRef([]);

  const location = useLocation();

  const email = location?.state?.data?.user?.email;
  const userID = location?.state?.data?.user?._id;

  const handleOtpChange = (event, index) => {
    const { value } = event.target;
    const otpArray = [...otp];
    otpArray[index] = value;
    const newOtp = otpArray.join("");
    setOtp(newOtp);

    if (value !== "") {
      const nextIndex = index + 1;
      if (inputRefs.current[nextIndex]) {
        inputRefs.current[nextIndex].focus();
      }
    }
  };

  const otpVerify = async () => {
    try {
      const res = await verifyOtp({ email: email, otpCode: otp });
      if (res.error) {
        // alert(`${res.error.data.message}`);
        Toastify({
          text: `${res.error.data.message}`,
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
      } else if (res.data.status === 200) {
        // alert("Verified Successfully");
        Toastify({
          text: "Verified Successfully",
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
        console.log(res.data, "otp page loaded successfully");
        // localStorage.setItem("user", JSON.stringify(res.data));

        navigate("/new-password", { state: { data: res.data } });
      }
    } catch (error) {
      Toastify({
        text: "Error While Verifing",
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

  const onResendOtp = async (e) => {
    e.preventDefault();
    try {
      const res = await resendOtp({ email: email });
    } catch (error) {
      Toastify({
        text: "Error While Sending code",
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
    <>
      {!email ? (
        <Navigate to="/" />
      ) : (
        <Container
          className={`${style.main} text-center`}
          style={{ height: "100vh" }}
        >
          <Row>
            <Col>
              <div className={style.heading}>
                <h2>OTP Verification</h2>
                <p>
                  We’ve just sent you 4 digits code to your email
                  example@gmail.com
                </p>
              </div>
            </Col>
          </Row>
          <Row>
            <Col className="py-3 d-flex flex-column justify-content-center align-items-center">
              <form className={style.inputFields}>
                {[...Array(6)].map((_, index) => (
                  <input
                    className={style.otpAuhtFields}
                    ref={(ref) => (inputRefs.current[index] = ref)}
                    key={index + 1}
                    type="number"
                    value={otp[index] || ""}
                    onChange={(event) => handleOtpChange(event, index)}
                    maxLength={1}
                  />
                ))}
              </form>

              <div className="pt-5 w-100">
                <button className={style.mainBtn} onClick={otpVerify}>
                  Submit
                </button>
              </div>

              <div
                className={`${style.footer} d-inline-flex py-5 w-100 justify-content-between`}
              >
                <div className="d-flex justify-content-center align-items-center">
                  <p className="text-start">Don’t received the code?</p>
                </div>
                <p>
                  <button className="px-3" onClick={onResendOtp}>
                    Resend Code
                  </button>
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};

export default VerifyOtp;
