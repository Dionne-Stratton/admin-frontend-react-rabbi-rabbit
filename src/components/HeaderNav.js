import React from "react";
import { NavLink } from "react-router-dom";

const HeaderNav = () => {
  return (
    <div className="headernav">
      <header>
        <div className="container">
          <div className="text-box">
            <h1>Rabbi Rabbit Database</h1>
          </div>
        </div>

        <nav id="hnavbuttons">
          <NavLink className="main-nav" activeClassName="active" to="/">
            View
          </NavLink>
          <NavLink className="main-nav" activeClassName="active" to="/add">
            Add
          </NavLink>
          <NavLink
            className="main-nav"
            activeClassName="active"
            to="/dangerzone"
          >
            Danger Zone
          </NavLink>
        </nav>
      </header>
    </div>
  );
};

export default HeaderNav;
