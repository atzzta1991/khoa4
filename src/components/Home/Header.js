import React from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";

export default function Header() {
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
      <a className="navbar-brand" href="/">
        Cyberlearn
      </a>
      <button
        className="navbar-toggler d-lg-none"
        type="button"
        data-toggle="collapse"
        data-target="#collapsibleNavId"
        aria-controls="collapsibleNavId"
        aria-expanded="false"
        aria-label="Toggle navigation"
      />
      <div className="collapse navbar-collapse" id="collapsibleNavId">
        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
          <li className="nav-item">
            <NavLink
              activeClassName="activeNavItem"
              className="nav-link"
              to="/home"
              activeStyle={{ fontWeight: "bold" }}
            >
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              activeClassName="activeNavItem"
              className="nav-link"
              to="/about"
              activeStyle={{ fontWeight: "bold" }}
            >
              About
            </NavLink>
          </li>{" "}
          <li className="nav-item">
            <NavLink
              activeClassName="activeNavItem"
              className="nav-link"
              to="/contact"
              activeStyle={{ fontWeight: "bold" }}
            >
              Contact
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              activeClassName="activeNavItem"
              className="nav-link"
              to="/login"
              activeStyle={{ fontWeight: "bold" }}
            >
              Login
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              activeClassName="activeNavItem"
              className="nav-link"
              to="/profile"
              activeStyle={{ fontWeight: "bold" }}
            >
              Profile
            </NavLink>
          </li>
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              data-toggle="dropdown"
              href="#"
              role="button"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Bai Tap
            </a>
            <div className="dropdown-menu">
              <NavLink
                className="dropdown-item"
                to="/todolistrcc"
                activeStyle={{ fontWeight: "bold" }}
              >
                ToDoListRCC
              </NavLink>
              <NavLink
                className="dropdown-item"
                to="/todolistrfc"
                activeStyle={{ fontWeight: "bold" }}
              >
                ToDoListRFC
              </NavLink>
              <NavLink
                className="dropdown-item"
                to="/todolistredux"
                activeStyle={{ fontWeight: "bold" }}
              >
                ToDoListRedux
              </NavLink>
              <NavLink
                className="dropdown-item"
                to="/todolistsaga"
                activeStyle={{ fontWeight: "bold" }}
              >
                ToDoListSaga
              </NavLink>
            </div>
          </li>
        </ul>
        <form className="form-inline my-2 my-lg-0">
          <input
            className="form-control mr-sm-2"
            type="text"
            placeholder="Search"
          />
          <button
            className="btn btn-outline-success my-2 my-sm-0"
            type="submit"
          >
            Search
          </button>
        </form>
      </div>
    </nav>
  );
}
