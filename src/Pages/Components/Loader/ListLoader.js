import React from "react";

const ListLoader = () => {
  return (
    <div className="text-center me-3">
      <div
        className="spinner-border text-primary"
        role="status"
        style={{
          width: "1.5rem",
          height: "1.5rem",
        }}
      ></div>
    </div>
  );
};

export default ListLoader;
