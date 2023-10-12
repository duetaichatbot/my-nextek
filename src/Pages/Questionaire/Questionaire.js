import React, { useState } from "react";
import style from "./Questionaire.module.css";
import { usePost_QuestionaireMutation } from "../../Redux/UserSlice/UserSlice";
import Toastify from "toastify-js";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

const Questionaire = () => {
  const [Post_Questionaire] = usePost_QuestionaireMutation();

  const location = useLocation();
  const userId = location.state.userID;
  const user = location.state.user;
  const navigate = useNavigate();
  console.log(user?.user?.role[0]);

  const [questionFields, setQuestionFields] = useState({
    name: "",
    number: "",
  });
  const [questionBtn, setQuestionBtn] = useState({
    q1: null,
    q2: null,
    q3: null,
    q4: null,
    q5: null,
    q6: null,
    q7: null,
    q8: null,
    q9: null,
    q10: null,
    q11: null,
    q12: null,
    q13: null,
    q14: null,
    q15: null,
    q16: null,
    q17: null,
    q18: null,
    q19: null,
    q20: null,
    q21: null,
    q22: null,
    q23: null,
    q24: null,
  });

  const handleQuestionnaireFields = (e) => {
    setQuestionFields({ ...questionFields, [e.target.name]: e.target.value });
  };
  const { name, number } = questionFields;
  const handleQuestionnaire = (e) => {
    const { name, value } = e.target;
    setQuestionBtn((prevFields) => ({
      ...prevFields,
      [name]: value === "true", // Set to true if value is 'true'
    }));
  };
  console.log(questionFields);
  const {
    q1,
    q2,
    q3,
    q4,
    q5,
    q6,
    q7,
    q8,
    q9,
    q10,
    q11,
    q12,
    q13,
    q14,
    q15,
    q16,
    q17,
    q18,
    q19,
    q20,
    q21,
    q22,
    q23,
    q24,
  } = questionBtn;

  // const user = JSON.parse(localStorage.getItem("user"));
  // const userID = user?.user?._id;

  const handlePostQuestionnaire = async () => {
    try {
      if (
        name !== "" &&
        number !== "" &&
        q1 !== null &&
        q2 !== null &&
        q3 !== null &&
        q4 !== null &&
        q5 !== null &&
        q6 !== null &&
        q7 !== null &&
        q8 !== null &&
        q9 !== null &&
        q10 !== null &&
        q11 !== null &&
        q12 !== null &&
        q13 !== null &&
        q14 !== null &&
        q15 !== null &&
        q16 !== null &&
        q17 !== null &&
        q18 !== null &&
        q19 !== null &&
        q20 !== null &&
        q21 !== null &&
        q22 !== null &&
        q23 !== null &&
        q24 !== null
      ) {
        const res = await Post_Questionaire({
          userID: userId,
          data: {
            manufacturerName: name,
            managerContact: number,
            payscale_for_certification_levels: q1,
            ASE_testing: q2,
            Bonus_pay: q3,
            career_path: q4,
            Work_and_Life_Balance: q5,
            offer_Paid_Vacation_days: q6,
            Paid_Sick_leave: q7,
            hands_on_experience_outside_of_high: q8,
            desire_to_go_to_college_before_starting: q9,
            tuition_scholarship_opportunities: q10,
            tool_scholarship_opportunities: q11,
            Student_Loan_reimbursement_assistance: q12,
            offer_tool_reimbursement_assistance: q13,
            Opportunities_for_graduating_High_School: q14,
            career_without_attending_college: q15,
            interested_in_working_at_your_dealership: q16,
            purpose_of_accelerated_learning_and_development: q17,
            advancement_outside_of_the_shop: q18,
            _5_day_work_week_important_to_you: q19,
            climate_controlled: q20,
            equipment_that_is_up_to_date_and_well_maintained: q21,
            perform_specialized_repairs: q22,
            techs_can_go_for_breaks: q23,
            water_during_season_changes: q24,
          },
        });
        console.log(res.data);
        if (!res.error) {
          // alert("Questionnaire sumbit successfully")
          localStorage.setItem("user", JSON.stringify(user));
          Toastify({
            text: "Questionnaire sumbit successfully",
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
          // if (
          //   user?.user?.role[0] === "Professional" ||
          //   user?.user?.role[0] === "Student"
          // ) {
          navigate("/newsfeed");
          // } else {
          //   navigate("/payment", { state: { userData: res.data } });
          // }
        }
      } else {
        Toastify({
          text: "All Fields required",
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
    } catch (error) {
      Toastify({
        text: "Error While Submitting",
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
      {userId && user?.user?.role[0] !== "Student" ? (
        <div className={style.QuestionaireWrapper}>
          <h1>Dealership Questionnaire</h1>

          {/* General Questions */}
          <React.Fragment>
            <h4>General Questions</h4>
            <div className={style.GeneralQuestionsDiv}>
              <span className={style.GeneralQuestionsSpan}>
                <p>
                  1. What is the name and manufacturer of the dealership? (Ex.
                  John Doe Ford)
                </p>
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={handleQuestionnaireFields}
                />
              </span>
              <span className={style.GeneralQuestionsSpan}>
                <p>
                  Please provide the Service Manager’s name, email and phone
                  number for contact.
                </p>
                <input
                  type="text"
                  name="number"
                  value={number}
                  onChange={handleQuestionnaireFields}
                />
              </span>
            </div>
          </React.Fragment>

          {/* Technician Pay Plan */}
          <React.Fragment>
            <h4>Technician Pay Plan</h4>
            <div className={style.GeneralQuestionsDiv}>
              <span className={style.GeneralQuestionsSpan}>
                <p>
                  1. Do you have a defined pay scale for certification levels –
                  Entry level thru Master level? (Need a check box for Yes and
                  one for No)
                </p>
                <div className={style.TechnicianPayPlanInnerSpan}>
                  <button
                    name="q1"
                    value={true}
                    onClick={handleQuestionnaire}
                    className={q1 === true ? style.selected : ""}
                  >
                    Yes
                  </button>
                  <button
                    name="q1"
                    value={false}
                    onClick={handleQuestionnaire}
                    className={q1 === false ? style.selected : ""}
                  >
                    No
                  </button>
                </div>
              </span>
              <span className={style.GeneralQuestionsSpan}>
                <p>Do you pay for ASE testing?</p>
                <div className={style.TechnicianPayPlanInnerSpan}>
                  <button
                    name="q2"
                    value={true}
                    onClick={handleQuestionnaire}
                    className={q2 === true ? style.selected : ""}
                  >
                    Yes
                  </button>
                  <button
                    name="q2"
                    value={false}
                    onClick={handleQuestionnaire}
                    className={q2 === false ? style.selected : ""}
                  >
                    No
                  </button>
                </div>
              </span>
              <span className={style.GeneralQuestionsSpan}>
                <p>Do you offer a Bonus pay plan?</p>
                <div className={style.TechnicianPayPlanInnerSpan}>
                  <button
                    name="q3"
                    value={true}
                    onClick={handleQuestionnaire}
                    className={q3 === true ? style.selected : ""}
                  >
                    Yes
                  </button>
                  <button
                    name="q3"
                    value={false}
                    onClick={handleQuestionnaire}
                    className={q3 === false ? style.selected : ""}
                  >
                    No
                  </button>
                </div>
              </span>
            </div>
          </React.Fragment>

          {/* Technician Benefits */}
          <React.Fragment>
            <h4>Technician Benefits</h4>
            <div className={style.GeneralQuestionsDiv}>
              <span className={style.GeneralQuestionsSpan}>
                <p>
                  1. Do you have a defined career path from entry level
                  technician to Master technician?
                </p>
                <div className={style.TechnicianPayPlanInnerSpan}>
                  <button
                    name="q4"
                    value={true}
                    onClick={handleQuestionnaire}
                    className={q4 === true ? style.selected : ""}
                  >
                    Yes
                  </button>
                  <button
                    name="q4"
                    value={false}
                    onClick={handleQuestionnaire}
                    className={q4 === false ? style.selected : ""}
                  >
                    No
                  </button>
                </div>
              </span>
              <span className={style.GeneralQuestionsSpan}>
                <p>2. Is Work and Life Balance important to the dealership?</p>
                <div className={style.TechnicianPayPlanInnerSpan}>
                  <button
                    name="q5"
                    value={true}
                    onClick={handleQuestionnaire}
                    className={q5 === true ? style.selected : ""}
                  >
                    Yes
                  </button>
                  <button
                    name="q5"
                    value={false}
                    onClick={handleQuestionnaire}
                    className={q5 === false ? style.selected : ""}
                  >
                    No
                  </button>
                </div>
              </span>
              <span className={style.GeneralQuestionsSpan}>
                <p>3. Do you offer Paid Vacation days?</p>
                <div className={style.TechnicianPayPlanInnerSpan}>
                  <button
                    name="q6"
                    value={true}
                    onClick={handleQuestionnaire}
                    className={q6 === true ? style.selected : ""}
                  >
                    Yes
                  </button>
                  <button
                    name="q6"
                    value={false}
                    onClick={handleQuestionnaire}
                    className={q6 === false ? style.selected : ""}
                  >
                    No
                  </button>
                </div>
              </span>
              <span className={style.GeneralQuestionsSpan}>
                <p>4. Do you offer Paid Sick leave?</p>
                <div className={style.TechnicianPayPlanInnerSpan}>
                  <button
                    name="q7"
                    value={true}
                    onClick={handleQuestionnaire}
                    className={q7 === true ? style.selected : ""}
                  >
                    Yes
                  </button>
                  <button
                    name="q7"
                    value={false}
                    onClick={handleQuestionnaire}
                    className={q7 === false ? style.selected : ""}
                  >
                    No
                  </button>
                </div>
              </span>
              <span className={style.GeneralQuestionsSpan}>
                <p>
                  5. Do you have any hands-on experience outside of high school
                  or college?
                </p>
                <div className={style.TechnicianPayPlanInnerSpan}>
                  <button
                    name="q8"
                    value={true}
                    onClick={handleQuestionnaire}
                    className={q8 === true ? style.selected : ""}
                  >
                    Yes
                  </button>
                  <button
                    name="q8"
                    value={false}
                    onClick={handleQuestionnaire}
                    className={q8 === false ? style.selected : ""}
                  >
                    No
                  </button>
                </div>
              </span>
            </div>
          </React.Fragment>

          {/* Assistance */}
          <React.Fragment>
            <h4>Assistance</h4>
            <div className={style.GeneralQuestionsDiv}>
              <span className={style.GeneralQuestionsSpan}>
                <p>
                  1. Do you have a desire to go to college before starting at a
                  dealership?
                </p>
                <div className={style.TechnicianPayPlanInnerSpan}>
                  <button
                    name="q9"
                    value={true}
                    onClick={handleQuestionnaire}
                    className={q9 === true ? style.selected : ""}
                  >
                    Yes
                  </button>
                  <button
                    name="q9"
                    value={false}
                    onClick={handleQuestionnaire}
                    className={q9 === false ? style.selected : ""}
                  >
                    No
                  </button>
                </div>
              </span>
              <span className={style.GeneralQuestionsSpan}>
                <p>
                  2. Are you looking for dealerships that offer tuition
                  scholarship opportunities?
                </p>
                <div className={style.TechnicianPayPlanInnerSpan}>
                  <button
                    name="q10"
                    value={true}
                    onClick={handleQuestionnaire}
                    className={q10 === true ? style.selected : ""}
                  >
                    Yes
                  </button>
                  <button
                    name="q10"
                    value={false}
                    onClick={handleQuestionnaire}
                    className={q10 === false ? style.selected : ""}
                  >
                    No
                  </button>
                </div>
              </span>
              <span className={style.GeneralQuestionsSpan}>
                <p>
                  3. Are you looking for dealerships that offer tool scholarship
                  opportunities?
                </p>
                <div className={style.TechnicianPayPlanInnerSpan}>
                  <button
                    name="q11"
                    value={true}
                    onClick={handleQuestionnaire}
                    className={q11 === true ? style.selected : ""}
                  >
                    Yes
                  </button>
                  <button
                    name="q11"
                    value={false}
                    onClick={handleQuestionnaire}
                    className={q11 === false ? style.selected : ""}
                  >
                    No
                  </button>
                </div>
              </span>
              <span className={style.GeneralQuestionsSpan}>
                <p>
                  4. Are you looking for dealerships that offer Student Loan
                  reimbursement assistance?
                </p>
                <div className={style.TechnicianPayPlanInnerSpan}>
                  <button
                    name="q12"
                    value={true}
                    onClick={handleQuestionnaire}
                    className={q12 === true ? style.selected : ""}
                  >
                    Yes
                  </button>
                  <button
                    name="q12"
                    value={false}
                    onClick={handleQuestionnaire}
                    className={q12 === false ? style.selected : ""}
                  >
                    No
                  </button>
                </div>
              </span>
              <span className={style.GeneralQuestionsSpan}>
                <p>
                  5. Are you looking for dealerships that offer tool
                  reimbursement assistance?
                </p>
                <div className={style.TechnicianPayPlanInnerSpan}>
                  <button
                    name="q13"
                    value={true}
                    onClick={handleQuestionnaire}
                    className={q13 === true ? style.selected : ""}
                  >
                    Yes
                  </button>
                  <button
                    name="q13"
                    value={false}
                    onClick={handleQuestionnaire}
                    className={q13 === false ? style.selected : ""}
                  >
                    No
                  </button>
                </div>
              </span>
            </div>
          </React.Fragment>

          {/* Technician Recruitment Strategy */}
          <React.Fragment>
            <h4>Technician Recruitment Strategy</h4>
            <div className={style.GeneralQuestionsDiv}>
              <span className={style.GeneralQuestionsSpan}>
                <p>
                  1. Do you offer Scholarship Opportunities for graduating High
                  School students to help with college expenses?
                </p>
                <div className={style.TechnicianPayPlanInnerSpan}>
                  <button
                    name="q14"
                    value={true}
                    onClick={handleQuestionnaire}
                    className={q14 === true ? style.selected : ""}
                  >
                    Yes
                  </button>
                  <button
                    name="q14"
                    value={false}
                    onClick={handleQuestionnaire}
                    className={q14 === false ? style.selected : ""}
                  >
                    No
                  </button>
                </div>
              </span>
              <span className={style.GeneralQuestionsSpan}>
                <p>
                  2. Do you offer any tool scholarships to students attending
                  college or any graduating high school student who wants to
                  start their career without attending college?
                </p>
                <div className={style.TechnicianPayPlanInnerSpan}>
                  <button
                    name="q15"
                    value={true}
                    onClick={handleQuestionnaire}
                    className={q15 === true ? style.selected : ""}
                  >
                    Yes
                  </button>
                  <button
                    name="q15"
                    value={false}
                    onClick={handleQuestionnaire}
                    className={q15 === false ? style.selected : ""}
                  >
                    No
                  </button>
                </div>
              </span>
              <span className={style.GeneralQuestionsSpan}>
                <p>
                  3. Would you consider offering Student Loan payment
                  reimbursement for college students graduating and interested
                  in working at your dealership?
                </p>
                <div className={style.TechnicianPayPlanInnerSpan}>
                  <button
                    name="q16"
                    value={true}
                    onClick={handleQuestionnaire}
                    className={q16 === true ? style.selected : ""}
                  >
                    Yes
                  </button>
                  <button
                    name="q16"
                    value={false}
                    onClick={handleQuestionnaire}
                    className={q16 === false ? style.selected : ""}
                  >
                    No
                  </button>
                </div>
              </span>
              <span className={style.GeneralQuestionsSpan}>
                <p>
                  4. Do you have in place an apprentice program that would
                  include a Master Technician mentoring entry-level technicians
                  for the purpose of accelerated learning and development?
                </p>
                <div className={style.TechnicianPayPlanInnerSpan}>
                  <button
                    name="q17"
                    value={true}
                    onClick={handleQuestionnaire}
                    className={q17 === true ? style.selected : ""}
                  >
                    Yes
                  </button>
                  <button
                    name="q17"
                    value={false}
                    onClick={handleQuestionnaire}
                    className={q17 === false ? style.selected : ""}
                  >
                    No
                  </button>
                </div>
              </span>
              <span className={style.GeneralQuestionsSpan}>
                <p>
                  5. Is the opportunity for advancement outside of the shop?
                  (Ex. Service Advisor or Management)
                </p>
                <div className={style.TechnicianPayPlanInnerSpan}>
                  <button
                    name="q18"
                    value={true}
                    onClick={handleQuestionnaire}
                    className={q18 === true ? style.selected : ""}
                  >
                    Yes
                  </button>
                  <button
                    name="q18"
                    value={false}
                    onClick={handleQuestionnaire}
                    className={q18 === false ? style.selected : ""}
                  >
                    No
                  </button>
                </div>
              </span>
              <span className={style.GeneralQuestionsSpan}>
                <p>6. Is a 5-day work week important to you?</p>
                <div className={style.TechnicianPayPlanInnerSpan}>
                  <button
                    name="q19"
                    value={true}
                    onClick={handleQuestionnaire}
                    className={q19 === true ? style.selected : ""}
                  >
                    Yes
                  </button>
                  <button
                    name="q19"
                    value={false}
                    onClick={handleQuestionnaire}
                    className={q19 === false ? style.selected : ""}
                  >
                    No
                  </button>
                </div>
              </span>
            </div>
          </React.Fragment>

          {/* Shop Amenities */}
          <React.Fragment>
            <h4>Shop Amenities</h4>
            <div className={style.GeneralQuestionsDiv}>
              <span className={style.GeneralQuestionsSpan}>
                <p>1. Is your shop climate controlled?</p>
                <div className={style.TechnicianPayPlanInnerSpan}>
                  <button
                    name="q20"
                    value={true}
                    onClick={handleQuestionnaire}
                    className={q20 === true ? style.selected : ""}
                  >
                    Yes
                  </button>
                  <button
                    name="q20"
                    value={false}
                    onClick={handleQuestionnaire}
                    className={q20 === false ? style.selected : ""}
                  >
                    No
                  </button>
                </div>
              </span>
              <span className={style.GeneralQuestionsSpan}>
                <p>
                  2. Does the dealer have state-of-the-art equipment that is
                  up-to-date and well-maintained?
                </p>
                <div className={style.TechnicianPayPlanInnerSpan}>
                  <button
                    name="q21"
                    value={true}
                    onClick={handleQuestionnaire}
                    className={q21 === true ? style.selected : ""}
                  >
                    Yes
                  </button>
                  <button
                    name="q21"
                    value={false}
                    onClick={handleQuestionnaire}
                    className={q21 === false ? style.selected : ""}
                  >
                    No
                  </button>
                </div>
              </span>
              <span className={style.GeneralQuestionsSpan}>
                <p>
                  3. Does the dealer provide all Special Service Tools required
                  to perform specialized repairs?
                </p>
                <div className={style.TechnicianPayPlanInnerSpan}>
                  <button
                    name="q22"
                    value={true}
                    onClick={handleQuestionnaire}
                    className={q22 === true ? style.selected : ""}
                  >
                    Yes
                  </button>
                  <button
                    name="q22"
                    value={false}
                    onClick={handleQuestionnaire}
                    className={q22 === false ? style.selected : ""}
                  >
                    No
                  </button>
                </div>
              </span>
              <span className={style.GeneralQuestionsSpan}>
                <p>
                  4. Is there an Air-Conditioned employee breakroom where techs
                  can go for breaks?
                </p>
                <div className={style.TechnicianPayPlanInnerSpan}>
                  <button
                    name="q23"
                    value={true}
                    onClick={handleQuestionnaire}
                    className={q23 === true ? style.selected : ""}
                  >
                    Yes
                  </button>
                  <button
                    name="q23"
                    value={false}
                    onClick={handleQuestionnaire}
                    className={q23 === false ? style.selected : ""}
                  >
                    No
                  </button>
                </div>
              </span>
              <span className={style.GeneralQuestionsSpan}>
                <p>
                  5. Does the dealer provide any coffee, tea, Gatorade, or water
                  during season changes? (Ex. Summer and Winter)
                </p>
                <div className={style.TechnicianPayPlanInnerSpan}>
                  <button
                    name="q24"
                    value={true}
                    onClick={handleQuestionnaire}
                    className={q24 === true ? style.selected : ""}
                  >
                    Yes
                  </button>
                  <button
                    name="q24"
                    value={false}
                    onClick={handleQuestionnaire}
                    className={q24 === false ? style.selected : ""}
                  >
                    No
                  </button>
                </div>
              </span>
            </div>
          </React.Fragment>

          <button onClick={handlePostQuestionnaire} className="mt-4 w-25">
            Sumbit Questionnaire{" "}
          </button>
        </div>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
};

export default Questionaire;
