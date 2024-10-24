import React from "react";

function Header() {
  return (
    <header style={{ display: "flex", alignItems: "center", padding: "10px" }}>
      <img
        src="/path-to-your-logo.png"
        alt="Website Logo"
        style={{ width: "50px", marginRight: "10px" }}
      />
      <h1>My Website Title</h1>
    </header>
  );
}
export default Header;
