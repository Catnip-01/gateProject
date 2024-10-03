import React, { useState, useEffect } from "react";
import { json, useLocation } from "react-router-dom";
import axios from "axios";
// import question from "../../../server/models/question";

const QuestionAnswerPage = () => {
  const location = useLocation();
  const year = location.state.year;
  const correctAnswers = [];
  const [questions, setQuestions] = useState([]);
  const [correctOptions, setCorrectOptions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/questions?year=" + year
        );
        // Sort questions and set them
        const sortedQuestions = response.data
          .map((q) => ({ ...q, flag: 0 }))
          .sort((a, b) => a.id - b.id);

        setQuestions(sortedQuestions);
        console.log("Sorted questions: " + JSON.stringify(sortedQuestions));

        // Map correct options from sorted questions
        const optionsArray = sortedQuestions.map((q) => q.correctOption);
        setCorrectOptions(optionsArray);

        console.log("Correct options: " + JSON.stringify(optionsArray));
      } catch (err) {
        console.log("Error fetching questions:", err);
      }
    };

    fetchQuestions();
  }, [year]);

  console.log(
    "correct options : " + JSON.stringify(questions) + typeof correctOptions
  );

  console.log("here are your questions ! : " + JSON.stringify(questions));

  const checkAnswer = (option, questionId) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((question) =>
        question.id === questionId
          ? {
              ...question,
              selectedOption: option,
              flag: 1,
            }
          : question
      )
    );
  };

  const displaySolution = (questionId) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((question) =>
        question.id === questionId
          ? {
              ...question,
              solutionVisible: !question.solutionVisible,
            }
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
        textAlign: "left", // Center text within each question
        width: "100%", // Ensures full width of container
      }}
    >
      {questions.map((question, index) => (
        <div
          key={question.id}
          className={`question-${question.id}`}
          style={{
            width: "50%", // Limit the width of each question block
            textAlign: "center", // Center text within the block
            margin: "10px auto", // Center the question block within the parent
          }}
        >
          <h3>
            Question {question.id} : {question.question}
          </h3>
          <div className="options">
            {["A", "B", "C", "D"].map((option) => (
              <button
                key={option}
                id={option}
                className="option-button"
                onClick={() => {
                  if (question.flag === 0) {
                    checkAnswer(option, question.id); // Use question.id here
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
                displaySolution(question.id); // Use question.id here
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
// };

export default QuestionAnswerPage;
