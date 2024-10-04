import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const QuestionAnswerPage = () => {
  const location = useLocation();
  const { year, subject } = location.state || {}; // Get the year and subject from state

  const [questions, setQuestions] = useState([]);
  const [correctOptions, setCorrectOptions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        // Create query parameters based on filters
        let query = "";
        if (year) query += `year=${year}`;
        if (subject) {
          const capitalizedSubject =
            subject.charAt(0).toUpperCase() + subject.slice(1).toLowerCase();

          query += `${query ? "&" : ""}subject=${capitalizedSubject}`;
        }

        if (query) {
          console.log("Query is:", query);
          const response = await axios.get(
            `http://localhost:5000/questions?${query}` // Query using year/subject filters
          );
          const sortedQuestions = response.data
            .map((q) => ({ ...q, flag: 0 }))
            .sort((a, b) => a.id - b.id);

          setQuestions(sortedQuestions);
          const optionsArray = sortedQuestions.map((q) => q.correctOption);
          setCorrectOptions(optionsArray);
        } else {
          console.error("Filters are undefined");
        }
      } catch (err) {
        console.log("Error fetching questions:", err);
      }
    };

    fetchQuestions();
  }, [year, subject]); // Fetch based on year or subject

  const checkAnswer = (option, questionId) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((question) =>
        question.id === questionId
          ? { ...question, selectedOption: option, flag: 1 }
          : question
      )
    );
  };

  const displaySolution = (questionId) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((question) =>
        question.id === questionId
          ? { ...question, solutionVisible: !question.solutionVisible }
          : question
      )
    );
  };

  return (
    <div
      className="questions"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        margin: "0",
        textAlign: "left",
        width: "100%",
      }}
    >
      {questions.map((question, index) => (
        <div
          key={question.id}
          className={`question-${question.id}`}
          style={{
            width: "50%",
            textAlign: "center",
            margin: "10px auto",
          }}
        >
          <h3>
            Question {index + 1}: {question.question}
          </h3>
          <div className="options">
            {["A", "B", "C", "D"].map((option) => (
              <button
                key={option}
                id={option}
                className="option-button"
                onClick={() => {
                  if (question.flag === 0) {
                    checkAnswer(option, question.id);
                  } else {
                    alert("You can select only one option");
                  }
                }}
                style={{
                  backgroundColor:
                    question.selectedOption === option
                      ? option === correctOptions[index]
                        ? "green"
                        : "red"
                      : "",
                }}
              >
                {option}
              </button>
            ))}
          </div>
          <button
            className="answerToggle"
            onClick={() => {
              if (question.flag === 1) {
                displaySolution(question.id);
              } else {
                alert("You have to answer the question first");
              }
            }}
          >
            Toggle Solution
          </button>
          {question.solutionVisible && (
            <div className="answer">
              This is the solution to Question {question.id}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default QuestionAnswerPage;
