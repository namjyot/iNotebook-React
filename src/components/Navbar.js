import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  const getUser = async () => {
    const response = await fetch("http://localhost:5000/api/auth/getuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    setUsername(json.user.email);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setTimeout(() => {
      navigate("/login");
    }, 1);
  }

  if (localStorage.getItem("token")) {
    getUser();
  }

  return (
    <nav className={`navbar navbar-expand-lg navbar-dark bg-dark`}>
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          iNotebook
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="/navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/" ? "active" : ""
                }`}
                aria-current="page"
                to="/"
              >
                Home{" "}
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/about" ? "active" : ""
                }`}
                to="/about"
              >
                About
              </Link>
            </li>
          </ul>
          {!localStorage.getItem("token") ? (
            <>
              <Link className="btn btn-primary" to="/login" role="button">
                Login
              </Link>
              <Link className="btn btn-primary ms-2" to="/signup" role="button">
                Signup
              </Link>
            </>
          ) : (
            <>
              <span>
                <i
                  className="fa-solid fa-user"
                  style={{ color: "#ffffff", cursor: "pointer" }}
                ></i>
              </span>
              <span className="navbar-text ms-2" style={{ cursor: "pointer" }}>
                {username}
              </span>
              <Link
                className="btn btn-outline-danger ms-3"
                onClick={handleLogout}
              >
                Logout
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
