import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav>
      <ul>
        <li>
          <Link to="./aboutUs">About us</Link>
        </li>
        <li
          onMouseEnter={() => setDropdownOpen(true)}
          onMouseLeave={() => setDropdownOpen(false)}
        >
          <Link to="#">Resources</Link>
          {dropdownOpen && (
            <ul className="dropdown">
              <li>
                <Link to="../questionForm">pyqs</Link>
              </li>
              <li>
                <Link to="../questions">paper format</Link>
              </li>
              <li>
                <Link to="./resource3">Syllabus</Link>
              </li>
            </ul>
          )}
        </li>
        <li>
          <Link to="./pyqs">PYQs</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
