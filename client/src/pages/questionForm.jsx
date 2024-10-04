import React from "react";
import { useNavigate } from "react-router-dom";
import DbFilter from "./dbFilter";

const QuestionForm = () => {
  const navigate = useNavigate();

  // Handle form submission and navigation to the questions page
  const fetchQuestions = async (filters) => {
    try {
      // Pass filters (year and subject) to the questions page via state
      navigate("../questions", { state: filters });
    } catch (error) {
      console.error("Error in navigating:", error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        height: "100vh", // Full viewport height
        alignItems: "center",
      }}
    >
      {/* Handle changes directly in DbFilter and pass the updated values */}
      <DbFilter type="year" onSubmit={fetchQuestions} />
      <DbFilter type="subject" onSubmit={fetchQuestions} />
    </div>
  );
};

export default QuestionForm;
