import React from "react";
import { Link } from "react-router-dom";
import { UncontrolledCollapse, Row, Col, NavLink } from "reactstrap";

import "bootstrap/dist/css/bootstrap.css";
import "../components/component.css";
import "../components/navbar.css";


const Autmenu = ({ user }) => {
  return (
    <div class="menu">
      {!user && (
        <label id="show-menu" for="toggle">
          <div>
            <NavLink className="nav-link-icon" to="/login" tag={Link}>
              <i className="ni ni-key-25" />
              <span className="nav-link-inner--text" style={{ color: "white" }}>
                <i className="material-icons md-36 toggleBtn menuBtn">Login</i>
              </span>
            </NavLink>
          </div>
        </label>
      )}
      {user && (
        <>
          <div>
            <NavLink className="nav-item nav-link" to="/profile" tag={Link}>
              <i className="ni ni-key-25" />

              <i className="material-icons md-36">{user.username}</i>
            </NavLink>
          </div>
          <div>
            <NavLink className="nav-item nav-link" to="/logout" tag={Link}>
              <i className="material-icons md-36">Logout</i>
            </NavLink>
          </div>
        </>
      )}
    </div>
  );
};

export default Autmenu;
