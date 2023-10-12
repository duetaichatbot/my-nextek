import { Navigate } from "react-router-dom";
import Home from "../Pages/Home/Home";
import Payment from "../Pages/Payment/Payment";
import Myjobs from "../Pages/myJobs/Myjobs";
import Discussion from "../Pages/Discussion/Discussion";
import SearchStudent from "../Pages/SearchStudent/SearchStudent";
import Profile from "../Pages/Profile/Profile";
import Homecomments from "../Pages/Home/HomeComments/Homecomments";
import Notification from "../Pages/Notification/Notification";
// import ApplicantSinglePage from "../Pages/Applicants/ApplicantSinglePage/ApplicantSinglePage";
import InterestCard from "../Pages/InterestCard/InterestCard";
// import DiscussionProfileMid from "../Pages/Discussion/DiscussionComp/DiscussionProfile/DiscussionProfileMid/DiscussionProfileMid";
import DiscussionProfile from "../Pages/Discussion/DiscussionComp/DiscussionProfile/DiscussionProfile";
import Homeprofile from "../Pages/Home/HomeProfiles/Homeprofile";
import SeeAll from "../Pages/SeeAll/SeeAll";
import Questionaire from "../Pages/Questionaire/Questionaire";
import StudentQuestionaire from "../Pages/Questionaire/StudentQuestionaire";
import UpdateStudentQuestionaire from "../Pages/Questionaire/UpdateQuestion/UpdateStudentQuestionaire";

const UserRoutes = [
  {
    path: "/newsfeed",
    element: <Home />,
  },
  {
    path: "/payment",
    element: <Payment />,
  },
  {
    path: "/my-jobs",
    element: <Myjobs />,
  },
  {
    path: "/discussion",
    element: <Discussion />,
  },
  {
    path: "/search-students",
    element: <SearchStudent />,
  },
  {
    path: "/comments/:id",
    element: <Homecomments />,
  },
  {
    path: "/profile/:id",
    element: <Profile />,
  },
  {
    path: "/profile/:id",
    element: <Profile />,
  },
  {
    path: "/notification",
    element: <Notification />,
  },
  {
    path: "/interstcard",
    element: <InterestCard />,
  },
  {
    path: "/see-all",
    element: <SeeAll />,
  },
  {
    path: "/discussionprofile",
    element: <DiscussionProfile />,
  },
  {
    path: "/discussionprofile/:id",
    element: <DiscussionProfile />,
  },
  {
    path: "/questionaire",
    element: <StudentQuestionaire />,
  },
  {
    path: "/updatequestionaire",
    element: <UpdateStudentQuestionaire />,
  },
 
  {
    path: "/home-profile/:id",
    element: <Homeprofile />,
  },
  {
    path: "*",
    element: <Navigate to="/newsfeed" />,
  },
];

export default UserRoutes;
