import React from "react";
import DbFilter from "./dbFilter";

const QuestionForm = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
      }}
    >
      <DbFilter type="year" />
      <DbFilter type="subject" />
    </div>
  );
};

export default QuestionForm;
