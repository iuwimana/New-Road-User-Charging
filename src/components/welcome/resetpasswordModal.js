import React from "react";
//import { Redirect } from "react-router-dom";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import Form from "../common/form";

//import * as auth from "../../services/authService";
import * as userService from "../../services/userService";
import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";

class ResetPasswordModal extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().min(5).max(15).required().label("Password"),
    confirmPassword: Joi.any().valid(Joi.ref('password')).required().options({ language: { any: { allowOnly: 'must match password' } } })
  };

  doSubmit = async (e) => {
    try {
      const { data } = this.state;
     
        await userService.resetpassword(data.username, data.password);
        window.location.reload(false);
        toast.success(`Dear  ${data.username} you are reset your password successfull`);
      
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
            
            <CardBody className="px-lg-5 py-lg-5">
              <form onSubmit={this.handleSubmit}>
                {this.renderInput("username", "Username")}
                {this.renderInput("password", "Password", "password")}
                {this.renderInput("confirmPassword", "confirmPassword", "password")}
                {this.renderButton("Reset")}
              </form>
            </CardBody>
          </Card>
          
        </Col>
      </div>
    );
  }
}

export default ResetPasswordModal;
