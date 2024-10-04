import "./index.css";

import React from "react";
import { Link } from "react-router-dom";

import "../../App";

export default function Navbar() {
  return (
    <nav>
      <div>
        <div className="navbar-container">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                HOME
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/godolphin" className="nav-link">
                GODOLPHIN
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/horses" className="nav-link">
                HORSES
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/savedhorses" className="nav-link">
                SAVED HORSES
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/account" className="nav-link">
                ACCOUNT
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/login" className="nav-link">
                LOGIN
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/register" className="nav-link">
                SIGNUP
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
