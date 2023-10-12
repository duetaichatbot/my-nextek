import { Navigate } from "react-router-dom";
import Dealer from "../Pages/Signup/Dealer";
import Welcome from "../Pages/Welcome/Welcome";
import LoginSignUpChoose from "../Pages/loginSignupChoice/LoginSignUpChoose";
import Login from "../Pages/Login/Login";
import Student from "../Pages/Signup/Student";
import Otp from "../Pages/Signup/Otp";
import Questionaire from "../Pages/Questionaire/Questionaire";
import Payment from "../Pages/Payment/Payment";
import StudentQuestionaire from "../Pages/Questionaire/StudentQuestionaire";
import ForgetPass from "../Pages/forgetPass/ForgetPass";
import NewPassword from "../Pages/forgetPass/NewPassword";
import VerifyOtp from "../Pages/forgetPass/VerifyOtp";

const LoggedOutRoutes = [
  {
    path: "/",
    element: <Welcome />,
  },
  {
    path: "/sign-up-choice",
    element: <LoginSignUpChoose />,
  },
  {
    path: "/sign-up-student",
    element: <Student />,
  },
  {
    path: "/sign-up-dealer",
    element: <Dealer />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/verify-otp",
    element: <Otp />,
  },
  {
    path: "/questionaire",
    element: <Questionaire />,
  },
  {
    path: "/student-questionaire",
    element: <StudentQuestionaire />,
  },
  {
    path: "/forget-password",
    element: <ForgetPass />,
  },
  {
    path: "/forget-password-verify-otp",
    element: <VerifyOtp />,
  },
  {
    path: "/new-password",
    element: <NewPassword />,
  },
  {
    path: "*",
    element: <Navigate to="/" />,
  },
  {
    path: "/payment",
    element: <Payment />,
  },
];

export default LoggedOutRoutes;
