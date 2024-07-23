import React from "react";
import { ToastContainer } from "react-toastify";
//import { Route, Redirect, Switch } from "react-router-dom";
import Joi from "joi-browser";
import * as auth from "../../services/authService";
import Form from "../common/form";
import Resetpassword from "./resetpasswordModal";
import Verify from "./verifyOTP";
import { Modal, Button, OverlayTrigger, Tooltip } from "react-bootstrap";


import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import "./welcome.css";
import myLogo from "./Rwanda_Coat0fArm.png";

class Index extends Form {
  state = {
    data: { username: "", password: "" },
    openModal: false,
    openOTP: false,
    errors: {},
  };
  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  componentDidMount() {}

  usernameHandler(e) {
    this.setState({ username: e.target.value });
  }
  passwordHandler(e) {
    this.setState({ password: e.target.value });
  }

  onClickButton = () => this.setState({ openModal: true });

  onCloseModal = () => this.setState({ openModal: false });

  handleOpenOTP = () => this.setState({ openOTP: true });

  handleCloseOTP = () => this.setState({ openOTP: false });

  handleClick = async (e) => {
    try {
      const { data } = this.state;
      if (this.state.username === "" && this.state.password === "") {
        toast.info(
          `Those Field are Required, Please fill it!! ${this.state.username} and ${this.state.password}`
        );
      } else if (this.state.username === "") {
        toast.info("Email is Required, Please fill it!!");
      } else if (this.state.password === "") {
        toast.info("password is Required, Please fill it!!");
      } else {
        await auth.login(this.state.username, this.state.password);
        this.handleOpenOTP()
        //const { state } = this.props.location;
        
        //window.location = state ? state.from.pathname : "/welcome";
        toast.success(`Dear  ${this.state.username} you are login successful`);
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
    //if (auth.getCurrentUser()) return <Redirect to="/" />;
    return (
      <div className="App">
        <div className="byose">
          <div className="emblem">
            <img src={myLogo} className="myLogo" alt="logo" />
            <h1>
              Welcome to Road User Charging System <br />{" "}
              <big>
                <b>RUCS</b>
              </big>
            </h1>
          </div>
          <div className="form">
            <h2>Signin to Your Account</h2>
            <div className="input-box">
              <div className="mb-3">
                <div className="row">
                  <div className="col">
                    <div className="col-auto">
                      <input
                        type="text"
                        className="form-control"
                        name="username"
                        id="username"
                        placeholder="Enter username"
                        value={this.state.username}
                        onChange={(e) => this.usernameHandler(e)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter")
                          this.handleClick();
                          }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="input-box">
              <div className="row">
                <div className="col">
                  <div className="col-auto">
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      id="password"
                      placeholder="Enter Password"
                      value={this.state.password}
                      onChange={(e) => this.passwordHandler(e)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter")
                        this.handleClick();
                        }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <br />
            <div className="modal-footer">
              <div className="logcard">
              <button
                type="button"
                className="btn btn-primaries text-white"
                data-dismiss="modal"
                onClick={this.handleClick} 
                onKeyDown={(e) => {
                  if (e.key === "Enter")
                  this.handleClick();
                  }}
              >
                Login
              </button>
            </div>
            </div>
            <div className="register">
              
                Do you forgot your password?{" "}
                <p>
                <div className="btn" onClick={() => this.onClickButton()}>
                  Reset it Here
                </div>
              </p>
            </div>

            <Modal
              dialogClassName="my-modal"
              show={this.state.openModal}
              onHide={this.onCloseModal}
            >
              <Modal.Header closeButton>
                <Modal.Title>Reset Password</Modal.Title>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={this.onCloseModal}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </Modal.Header>

              <Modal.Body>
                <Resetpassword />
              </Modal.Body>
              <Modal.Footer></Modal.Footer>
            </Modal>

            <Modal
              dialogClassName="my-modal"
              show={this.state.openOTP}
              onHide={this.handleCloseOTP}
            >
              <Modal.Header closeButton>
                <Modal.Title>Verify Account</Modal.Title>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={this.handleCloseOTP}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </Modal.Header>

              <Modal.Body>
                <Verify 
                 
                username={this.state.username}
                password={this.state.password}
                />
              </Modal.Body>
              <Modal.Footer></Modal.Footer>
            </Modal>
          </div>
        </div>
      </div>
    );
  }
}

export default Index;
