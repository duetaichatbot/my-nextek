import { useRoutes } from "react-router-dom";
import "./App.css";
import "swiper/css/bundle";
import AdminRoutes from "./Routes/AdminRoutes";
import UserRoutes from "./Routes/UserRoutes";
import LoggedOutRoutes from "./Routes/LoggedOutRoutes";

function App() {
  const admin = useRoutes(AdminRoutes);
  const user = useRoutes(UserRoutes);
  const loggedout = useRoutes(LoggedOutRoutes);
  // const { warning, warningFalse } = useContext(myContext);
  // console.log(warning);
  let routes;

  const userData = JSON.parse(localStorage.getItem("user"));

  switch (userData?.user?.role[0]) {
    case "Student":
      routes = user;
      break;
    case "Professional":
      routes = admin;
      break;
    case "Premium Professionals":
      routes = admin;
      break;
    default:
      routes = loggedout;
      break;
  }

  return <>{routes}</>;
}
export default App;
