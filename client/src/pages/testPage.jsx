import React from "react";
import LoginButton from "../components/login";

function TestPage() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        paddingTop: "20px",
      }}
    >
      <div></div>
      <div></div>
      <div></div>
      <div>
        <LoginButton />
      </div>
    </div>
  );
}

export default TestPage;
