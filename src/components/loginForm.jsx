import React from "react";
//import { Redirect } from "react-router-dom";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import Form from "../common/form";

import * as auth from "../../services/authService";
import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";


  const LoginForm = () => {
 



    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Col lg="5" md="7">
          <Card className=" shadow border-0">
            <CardHeader className="bg-transparent pb-5">
              <div className="text-muted text-center mt-2 mb-3">
                <h1>
                  <big>Sign in with</big>
                </h1>
              </div>
              <div className="btn-wrapper text-center"></div>
            </CardHeader>
            <CardBody className="px-lg-5 py-lg-5">
              
            </CardBody>
          </Card>
          <Row className="mt-3">
            <Col xs="6">
              <small>Forgot password?</small>
            </Col>
            <Col className="text-right" xs="6">
              <small>Create new account</small>
            </Col>
          </Row>
        </Col>
      </div>
    );
  }


export default LoginForm;
