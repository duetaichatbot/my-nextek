import React, { useEffect } from "react";
import styles from "../Welcome/welcome.module.css";
import { useNavigate } from "react-router-dom";

function Welcome() {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/sign-up-choice");
    }, 2000);
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.welcomeText}>MY NEXTEK</h1>
    </div>
  );
}

export default Welcome;
