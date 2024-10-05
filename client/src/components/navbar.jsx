import React, { useState } from "react";
import { Link } from "react-router-dom";
import LoginButton from "./login";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="./aboutUs">About us</Link>
          </li>
          <li
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <Link to="#" aria-haspopup="true" aria-expanded={dropdownOpen}>
              Resources
            </Link>
            {dropdownOpen && (
              <ul className="dropdown">
                <li>
                  <Link to="../questionForm">PYQs</Link>
                </li>
                <li>
                  <Link to="../questions">Paper Format</Link>
                </li>
                <li>
                  <Link to="./resource3">Syllabus</Link>
                </li>
              </ul>
            )}
          </li>
          {/* <li>
            <Link to="./pyqs">PYQs</Link>
          </li> */}
          <li>
            <LoginButton />
          </li>
        </ul>
      </nav>
      {/* <div
        style={{
          paddingTop: "30px",
        }}
      >
        <LoginButton />
      </div> */}
    </div>
  );
};

export default Navbar;
