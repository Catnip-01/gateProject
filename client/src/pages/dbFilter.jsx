import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function DbFilter({ type }) {
  const [value, setValue] = useState("");
  const navigate = useNavigate();

  const fetchQuestions = async (e) => {
    e.preventDefault();
    try {
      console.log(`Selected ${type}: ${value}`);
      // Navigate to the questions page and pass the filter type and value
      navigate("../questions", { state: { [type]: value } });
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
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
        onSubmit={fetchQuestions}
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
    </div>
  );
}

export default DbFilter;
