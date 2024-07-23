import React from "react";

//import { Link } from "react-router-dom";
// reactstrap components

import { NavItem, Nav, Row, Col } from "reactstrap";
import "bootstrap/dist/css/bootstrap.css";
//import "../../components/component.css";

const Autmenu = () => {
  return (
    <footer className="footer">
      
      <Row className="align-items-center justify-content-xl-between">
        <Col className="col-xs-auto col-sm-auto col-md-auto justify-content-md-left">
          <div className="copyright text-center text-xl-left text-muted">
            © {new Date().getFullYear()} rmf
          </div>
        </Col>

        <Col className="col-xs-auto col-sm-auto col-md-auto justify-content-md-left">
          <Nav className="nav-footer justify-content-center justify-content-xl-end ">
            <NavItem>RUCS-</NavItem>

            <NavItem>Road User Charging System</NavItem>
          </Nav>
        </Col>
      </Row>
    </footer>
  );
};

export default Autmenu;
