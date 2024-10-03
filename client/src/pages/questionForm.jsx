import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const QuestionForm = () => {
  const [year, setYear] = useState("");
  // const [subject, setSubject] = useState("");
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);

  const fetchQuestions = async (e) => {
    e.preventDefault();
    try {
      // if (item === "year") {
      //   navigate("../questions", { state: { year } });
      // } else if (item === "subject") {
      //   navigate("../questions", { state: { subject } });
      // }
      navigate("../questions", { state: { year } });
    } catch (error) {
      console.error("Error in navigating:", error);
    }
  };

  return (
    <div className="formDiv">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh", // Full viewport height
        }}
      >
        <form
          onSubmit={fetchQuestions}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "#f8f8f8", // Light background color
            padding: "20px",
            borderRadius: "5px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Soft shadow
          }}
        >
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            placeholder="Enter Year"
            required
            style={{
              marginBottom: "10px",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc", // Light border
              width: "200px", // Fixed width for input
            }}
          />
          <h1>{year}</h1>
          <button
            type="submit"
            style={{
              padding: "10px 20px",
              borderRadius: "5px",
              border: "none",
              backgroundColor: "#007BFF", // Bootstrap primary color
              color: "white",
              cursor: "pointer",
              transition: "background-color 0.3s",
            }}
          >
            Get Questions
          </button>
        </form>
        <ul
          style={{
            marginTop: "30px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {questions.map((question) => (
            <li key={question._id}>
              {"Qn" + question.id + ". " + question.question}
            </li>
          ))}
        </ul>
      </div>

      {/* <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh", // Full viewport height
        }}
      >
        <form
          onSubmit={fetchQuestions(subject)}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "#f8f8f8", // Light background color
            padding: "20px",
            borderRadius: "5px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Soft shadow
          }}
        >
          <input
            type="number"
            value={subject}
            onChange={(e) => setYear(e.target.value)}
            placeholder="Enter subject"
            required
            style={{
              marginBottom: "10px",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc", // Light border
              width: "200px", // Fixed width for input
            }}
          />
          <h1>{year}</h1>
          <button
            type="submit"
            style={{
              padding: "10px 20px",
              borderRadius: "5px",
              border: "none",
              backgroundColor: "#007BFF", // Bootstrap primary color
              color: "white",
              cursor: "pointer",
              transition: "background-color 0.3s",
            }}
          >
            Get Questions
          </button>
        </form>
        <ul
          style={{
            marginTop: "30px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {questions.map((question) => (
            <li key={question._id}>
              {"Qn" + question.id + ". " + question.question}
            </li>
          ))}
        </ul>
      </div> */}
    </div>
  );
};

export default QuestionForm;
