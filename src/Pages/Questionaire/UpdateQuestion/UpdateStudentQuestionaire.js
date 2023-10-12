import React, { useState } from "react";
import style from "./Questionaire.module.css";
import {
  useGetQuestionaireInfoQuery,
  useUpdate_QuestionaireMutation,
} from "../../../Redux/UserSlice/UserSlice";
import Toastify from "toastify-js";
import { Navigate,  useNavigate } from "react-router-dom";
import { useEffect } from "react";

const UpdateStudentQuestionaire = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const userID = user?.user?._id;
  const [Post_Student_Questionaire] = useUpdate_QuestionaireMutation();
  const questionaireData = useGetQuestionaireInfoQuery(userID);
  const navigate = useNavigate();
  const [questionFields, setQuestionFields] = useState({
    name: questionaireData?.data?.questionaire?.name,
    address: questionaireData?.data?.questionaire?.address,
    email: questionaireData?.data?.questionaire?.email,
    contact: questionaireData?.data?.questionaire?.contact,
    brand: questionaireData?.data?.questionaire?.brands,
  });

  const [questionBtn, setQuestionBtn] = useState({
    q1: questionaireData?.data?.questionaire?.dealership_long_term,
    q2: questionaireData?.data?.questionaire?.fast_paced_work,
    q3: questionaireData?.data?.questionaire?.learn_new_everyday,
    q4: questionaireData?.data?.questionaire?.system_of_an_automobile,
    q5: questionaireData?.data?.questionaire?.certain_partOF_an_automobile,
    q6: questionaireData?.data?.questionaire?.automotive_industry,
    q7: questionaireData?.data?.questionaire?.automotive_program,
    q8: questionaireData?.data?.questionaire?.high_school,
    q9: questionaireData?.data?.questionaire?.collage,
    q10: questionaireData?.data?.questionaire?.ASE_certoficate,
    q11: questionaireData?.data?.questionaire?.experience_outside_highschool,
    q12: questionaireData?.data?.questionaire?.experience_before_school,
    q13: questionaireData?.data?.questionaire?.tution_scholar_opportunities,
    q14: questionaireData?.data?.questionaire?.tool_scholar_opportunities,
    q15: questionaireData?.data?.questionaire?.loan_reimbursement_assistance,
    q16: questionaireData?.data?.questionaire?.tool_reimbursement_assistance,
    q17: questionaireData?.data?.questionaire?.work_life_balance,
    q18: questionaireData?.data?.questionaire?.paid_vacations,
    q19: questionaireData?.data?.questionaire?.sick_leave,
    q20: questionaireData?.data?.questionaire?.retirement_plan,
    q21: questionaireData?.data?.questionaire?.work_on_sat,
    q22: questionaireData?.data?.questionaire?.five_to_six_weekdays,
    q23: questionaireData?.data?.questionaire?.climate_control,
    q24: questionaireData?.data?.questionaire?.state_of_art_equipment,
    q25: questionaireData?.data?.questionaire?.air_conditioned_breakRoom,
    q26: questionaireData?.data?.questionaire?.ownToolBox,
  });

  useEffect(() => {
    setQuestionFields({
      name: questionaireData?.data?.questionaire?.name,
      address: questionaireData?.data?.questionaire?.address,
      email: questionaireData?.data?.questionaire?.email,
      contact: questionaireData?.data?.questionaire?.contact,
      brand: questionaireData?.data?.questionaire?.brand,
    });
    setQuestionBtn({
      q1: questionaireData?.data?.questionaire?.dealership_long_term,
      q2: questionaireData?.data?.questionaire?.fast_paced_work,
      q3: questionaireData?.data?.questionaire?.learn_new_everyday,
      q4: questionaireData?.data?.questionaire?.system_of_an_automobile,
      q5: questionaireData?.data?.questionaire?.certain_partOF_an_automobile,
      q6: questionaireData?.data?.questionaire?.automotive_industry,
      q7: questionaireData?.data?.questionaire?.automotive_program,
      q8: questionaireData?.data?.questionaire?.high_school,
      q9: questionaireData?.data?.questionaire?.collage,
      q10: questionaireData?.data?.questionaire?.ASE_certoficate,
      q11: questionaireData?.data?.questionaire?.experience_outside_highschool,
      q12: questionaireData?.data?.questionaire?.experience_before_school,
      q13: questionaireData?.data?.questionaire?.tution_scholar_opportunities,
      q14: questionaireData?.data?.questionaire?.tool_scholar_opportunities,
      q15: questionaireData?.data?.questionaire?.loan_reimbursement_assistance,
      q16: questionaireData?.data?.questionaire?.tool_reimbursement_assistance,
      q17: questionaireData?.data?.questionaire?.work_life_balance,
      q18: questionaireData?.data?.questionaire?.paid_vacations,
      q19: questionaireData?.data?.questionaire?.sick_leave,
      q20: questionaireData?.data?.questionaire?.retirement_plan,
      q21: questionaireData?.data?.questionaire?.work_on_sat,
      q22: questionaireData?.data?.questionaire?.five_to_six_weekdays,
      q23: questionaireData?.data?.questionaire?.climate_control,
      q24: questionaireData?.data?.questionaire?.state_of_art_equipment,
      q25: questionaireData?.data?.questionaire?.air_conditioned_breakRoom,
      q26: questionaireData?.data?.questionaire?.ownToolBox,
    });
  }, [questionaireData]);

  const handleQuestionnaireFields = (e) => {
    setQuestionFields({ ...questionFields, [e.target.name]: e.target.value });
  };

  const { name, address, email, contact, brand } = questionFields;
  const handleQuestionnaire = (e) => {
    const { name, value } = e.target;
    setQuestionBtn((prevFields) => ({
      ...prevFields,
      [name]: value === "true", // Set to true if value is 'true'
    }));
  };
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
    q25,
    q26,
  } = questionBtn;

  const handlePostQuestionnaire = async () => {
    try {
      if (
        name !== "" &&
        address !== "" &&
        email !== "" &&
        contact !== "" &&
        brand !== "" &&
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
        q24 !== null &&
        q25 !== null &&
        q26 !== null
      ) {
        console.log(name, address, email, "here data here");
        const res = await Post_Student_Questionaire({
          userID: userID,
          data: {
            name: name,
            address: address,
            email: email,
            contact: contact,
            brands: brand,
            dealership_long_term: String(q1),
            fast_paced_work: String(q2),
            learn_new_everyday: String(q3),
            system_of_an_automobile: String(q4),
            certain_partOF_an_automobile: String(q5),
            automotive_industry: String(q6),
            automotive_program: String(q7),
            high_school: String(q8),
            collage: String(q9),
            ASE_certoficate: String(q10),
            experience_outside_highschool: String(q11),
            experience_before_school: String(q12),
            tution_scholar_opportunities: String(q13),
            tool_scholar_opportunities: String(q14),
            loan_reimbursement_assistance: String(q15),
            tool_reimbursement_assistance: String(q16),
            work_life_balance: String(q17),
            paid_vacations: String(q18),
            sick_leave: String(q19),
            retirement_plan: String(q20),
            work_on_sat: String(q21),
            five_to_six_weekdays: String(q22),
            climate_control: String(q23),
            state_of_art_equipment: String(q24),
            air_conditioned_breakRoom: String(q25),
            ownToolBox: String(q26),
          },
        });
        if (!res.error) {
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
          questionaireData.refetch();
          navigate("/");
        }
      } else {
        Toastify({
          text: "All Fields required",
          duration: 10000,
          newWindow: true,
          close: true,
          gravity: "top",
          position: "center",
          stopOnFocus: true,
          style: {
            background: "#007fff",
            borderRadius: "10px",
            color: "white",
            fill: "white",
          },
          onClick: function () {},
        }).showToast();
      }
    } catch (error) {
      Toastify({
        text: "Error While Submitting",
        duration: 10000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "center",
        stopOnFocus: true,
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
      <div className={style.QuestionaireWrapper}>
        <h1>Dealership Questionnaire</h1>

        {/* General Questions */}
        <React.Fragment>
          <h4>Students/Technician Questionnaire</h4>
          <div className={style.GeneralQuestionsDiv}>
            <span className={style.GeneralQuestionsSpan}>
              <p>1. What is your name?</p>
              <input
                type="text"
                name="name"
                value={name}
                onChange={handleQuestionnaireFields}
              />
            </span>
            <span className={style.GeneralQuestionsSpan}>
              <p>2. What is your address?</p>
              <input
                type="text"
                name="address"
                value={address}
                onChange={handleQuestionnaireFields}
              />
            </span>
            <span className={style.GeneralQuestionsSpan}>
              <p>3. What is your email?</p>
              <input
                type="text"
                name="email"
                value={email}
                onChange={handleQuestionnaireFields}
              />
            </span>
            <span className={style.GeneralQuestionsSpan}>
              <p>4. What is your contact number?</p>
              <input
                type="number"
                name="contact"
                value={contact}
                onChange={handleQuestionnaireFields}
              />
            </span>

            <span className={style.GeneralQuestionsSpan}>
              <p>5. What Manufacturer brands are you interested in?</p>
              <input
                type="text"
                name="brand"
                value={brand}
                onChange={handleQuestionnaireFields}
              />
            </span>
          </div>
        </React.Fragment>

        {/* Technician Pay Plan */}
        <React.Fragment>
          <h4>Career Questions</h4>
          <div className={style.GeneralQuestionsDiv}>
            <span className={style.GeneralQuestionsSpan}>
              <p>
                1. Do you see yourself working in an automotive dealership long
                term?
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
              <p>Do you enjoy fast paced work?</p>
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
              <p> Do you have the desire to learn something new every day?</p>
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

            <span className={style.GeneralQuestionsSpan}>
              <p>
                {" "}
                Are you interested in working on every system of an automobile?
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
              <p>
                {" "}
                Are you interested in specializing in a certain part of the
                automobile? (Ex. Powertrain technician)
              </p>
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
              <p> Are you currently working in the Automotive Industry?</p>
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
          </div>
        </React.Fragment>

        {/* Technician Benefits */}
        <React.Fragment>
          <h4>Education Questions</h4>
          <div className={style.GeneralQuestionsDiv}>
            <span className={style.GeneralQuestionsSpan}>
              <p>1. Are you currently enrolled in an Automotive Program?</p>
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
              <p>Are you in High School?</p>
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
            <span className={style.GeneralQuestionsSpan}>
              <p>Are you in College?</p>
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
              <p>Do you have any ASE Certifications?</p>
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
              <p>Do you have any ASE Certifications?</p>
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
                2. Are you looking for dealerships that offer tuition
                scholarship opportunities?
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
            <span className={style.GeneralQuestionsSpan}>
              <p>
                3. Are you looking for dealerships that offer tool scholarship
                opportunities?
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
                4. Are you looking for dealerships that offer Student Loan
                reimbursement assistance?
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
                5. Are you looking for dealerships that offer tool reimbursement
                assistance?
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
          </div>
        </React.Fragment>

        {/* Technician Recruitment Strategy */}
        <React.Fragment>
          <h4>Benefits</h4>
          <div className={style.GeneralQuestionsDiv}>
            <span className={style.GeneralQuestionsSpan}>
              <p>1. Is work life balance important to you?</p>
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
              <p>Is paid vacation important to you?</p>
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
              <p>Is paid sick leave important to you?</p>
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
            <span className={style.GeneralQuestionsSpan}>
              <p>Is a 401K or some type of retirement plan important to you?</p>
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
              <p>Will you work on Saturday?</p>
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
              <p>6. Is a 5 day work week important to you?</p>
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
          </div>
        </React.Fragment>

        {/* Shop Amenities */}
        <React.Fragment>
          <h4>Amenities</h4>
          <div className={style.GeneralQuestionsDiv}>
            <span className={style.GeneralQuestionsSpan}>
              <p>1. Is a climate-controlled shop important to you?</p>
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
              <p>Is state-of-the-art equipment important to you?</p>
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
            <span className={style.GeneralQuestionsSpan}>
              <p>Is an air-conditioned break room important to you?</p>
              <div className={style.TechnicianPayPlanInnerSpan}>
                <button
                  name="q25"
                  value={true}
                  onClick={handleQuestionnaire}
                  className={q25 === true ? style.selected : ""}
                >
                  Yes
                </button>
                <button
                  name="q25"
                  value={false}
                  onClick={handleQuestionnaire}
                  className={q25 === false ? style.selected : ""}
                >
                  No
                </button>
              </div>
            </span>
            <span className={style.GeneralQuestionsSpan}>
              <p>Do you have your own toolbox?</p>
              <div className={style.TechnicianPayPlanInnerSpan}>
                <button
                  name="q26"
                  value={true}
                  onClick={handleQuestionnaire}
                  className={q26 === true ? style.selected : ""}
                >
                  Yes
                </button>
                <button
                  name="q26"
                  value={false}
                  onClick={handleQuestionnaire}
                  className={q26 === false ? style.selected : ""}
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
    </>
  );
};

export default UpdateStudentQuestionaire;
