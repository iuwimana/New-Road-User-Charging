import React from "react";
//import { Redirect } from "react-router-dom";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import Form from "../common/form";

import * as auth from "../../services/authService";
import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  doSubmit = async (e) => {
    try {
      const { data } = this.state;
      if (data.username === "" && data.password === "") {
        toast.info(
          `Those Field are Required, Please fill it!! ${data.username} and ${data.password}`
        );
      } else if (data.username === "") {
        toast.info("Email is Required, Please fill it!!");
      } else if (data.password === "") {
        toast.info("password is Required, Please fill it!!");
      } else {
        await auth.login(data.username, data.password);
        const { state } = this.props.location;
        window.location = state ? state.from.pathname : "/";
        toast.success(`Dear  ${data.username} you are login successful`);
      }
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        toast.error("Error:" + errors.username);
        this.setState({ errors });
      } else if (ex.response && ex.response.status === 409) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        toast.error("Error:" + errors.username);
        this.setState({ errors });
      }
    }
  };

  render() {
    if (auth.getCurrentUser()) return <Redirect to="/" />;

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
              <form onSubmit={this.handleSubmit}>
                {this.renderInput("username", "Username")}
                {this.renderInput("password", "Password", "password")}
                {this.renderButton("Login")}
              </form>
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
}

export default LoginForm;
