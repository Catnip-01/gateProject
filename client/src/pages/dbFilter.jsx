import React, { useState } from "react";

function DbFilter({ type }) {
  const [value, setValue] = useState("");
  const [questions, setQuestions] = useState([]);

  const fetchQuestions = async (parameter) => {
    try {
      const response = await fetch(
        `http://localhost:5000/questions?${type}=${parameter}`
      );
      const data = await response.json();
      setQuestions(data);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchQuestions(value);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "#f8f8f8",
          padding: "20px",
          borderRadius: "5px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        }}
      >
        <input
          type={type === "year" ? "number" : "text"}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={`Enter ${type}`}
          required
          style={{
            marginBottom: "10px",
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            width: "200px",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            borderRadius: "5px",
            border: "none",
            backgroundColor: "#007BFF",
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
  );
}

export default DbFilter;
