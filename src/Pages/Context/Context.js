import { createContext, useState } from "react";

const myContext = createContext();

export const AppProvider = ({ children }) => {
  const userData = JSON.parse(localStorage.getItem("user"));
  const about = userData?.user?.about;
  const phone = userData?.user?.phone;

  // Set default initial state based on the existence of about and phone
  const initialWarningState =
    about !== undefined && phone !== undefined ? false : true;
  const [warning, setWarning] = useState(initialWarningState);
  console.log(initialWarningState, warning);

  const warningFalse = () => {
    setWarning(false);
  };

  const warningTrue = () => {
    setWarning(true);
  };

  return (
    <myContext.Provider
      value={{
        warning,
        warningTrue,
        warningFalse,
      }}
    >
      {children}
    </myContext.Provider>
  );
};

export default myContext;
