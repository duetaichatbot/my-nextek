import { Navigate } from "react-router-dom";
import Home from "../Pages/Home/Home";
// import Myjobs from "../Pages/myJobs/Myjobs";
import CreateJobs from "../Pages/CreateJobs/CreateJobs";
import Discussion from "../Pages/Discussion/Discussion";
import SearchStudent from "../Pages/SearchStudent/SearchStudent";
// import Applicant from "../Pages/Applicants/Applicant";
import Profile from "../Pages/Profile/Profile";
import Notification from "../Pages/Notification/Notification";
import Questionaire from "../Pages/Questionaire/Questionaire";
import InterestCard from "../Pages/InterestCard/InterestCard";
// import npmDiscussionProfileMid from "../Pages/Discussion/DiscussionComp/DiscussionProfile/DiscussionProfileMid/DiscussionProfileMid";
import DiscussionProfile from "../Pages/Discussion/DiscussionComp/DiscussionProfile/DiscussionProfile";
import Homeprofile from "../Pages/Home/HomeProfiles/Homeprofile";
import SeeAll from "../Pages/SeeAll/SeeAll";
import SeeAllSinglePage from "../Pages/SeeAll/SeeAllSinglePage/SeeAllSinglePage";
import Yourjobs from "../Pages/YourJobs/Yourjobs";
import AppliedApplicant from "../Pages/YourJobs/AppliedApplicant/AppliedApplicant";
import ApplicantSinglePage from "../Pages/YourJobs/AppliedApplicant/ApplicantSinglePage/ApplicantSinglePage";
import Homecomments from "../Pages/Home/HomeComments/Homecomments";
import Payment from "../Pages/Payment/Payment";
import JobPayment from "../Pages/Components/CreateJobForm/JobPayment";
import UpdateQuestionaire from "../Pages/Questionaire/UpdateQuestion/UpdateQuestionaire";
import RolePayment from "../Pages/RolePayment/RolePayment";
// eslint-disable-next-line
const AdminRoutes = [
  {
    path: "/newsfeed",
    element: <Home />,
  },

  {
    path: "/create-jobs",
    element: <CreateJobs />,
  },
  {
    path: "/search-students",
    element: <SearchStudent />,
  },
  {
    path: "/discussion",
    element: <Discussion />,
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
    path: "/your-jobs",
    element: <Yourjobs />,
  },
  {
    path: "/interstcard",
    element: <InterestCard />,
  },
  {
    path: "/discussionprofile/:id",
    element: <DiscussionProfile />,
  },
  {
    path: "/applied-applicant/:id",
    element: <AppliedApplicant />,
  },
  {
    path: "/applicant-singlePage/:id",
    element: <ApplicantSinglePage />,
  },
  {
    path: "/see-all",
    element: <SeeAll />,
  },
  {
    path: "/seeall-singlePage/:id",
    element: <SeeAllSinglePage />,
  },
  {
    path: "/comments/:id",
    element: <Homecomments />,
  },
  {
    path: "/home-profile/:id",
    element: <Homeprofile />,
  },
  {
    path: "/payment",
    element: <Payment />,
  },
  {
    path: "/role-subscription",
    element: <RolePayment />,
  },
  {
    path: "/questionaire",
    element: <Questionaire />,
  },
  {
    path: "/updatequestionaire",
    element: <UpdateQuestionaire />,
  },
  {
    path: "/job-payment",
    element: <JobPayment />,
  },
  ,
  {
    path: "*",
    element: <Navigate to="/newsfeed" />,
  },
];

export default AdminRoutes;
