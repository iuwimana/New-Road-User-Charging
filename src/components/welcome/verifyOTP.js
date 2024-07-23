import React, {  useState } from "react";
import OtpInput from "react-otp-input";
import * as auth from "../../services/authService";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import Form from "../common/form";

//import * as auth from "../../services/authService";
import * as userService from "../../services/userService";
import { Card,  CardBody,  Col } from "reactstrap";
import "./styledVerify.css";
import { async } from './../../services/security/userServices';

const VerifyOTP = ({username,password})=> {
 

  const [OTP, setOTP] = useState("");
 
  
  function handleChange(OTP) {
    setOTP(OTP);
  }
 async function resendtoken(){
  try {
    await auth.resendtoken(username);
    toast.success(`OTP Resend successfull`)
  }catch (ex) {
    toast.error(
        `an error occured while resending OTP`
      );
  }
 }
  async function doSubmit()  { 
    try {
      
       //toast.success(`the OTP data:${OTP} on the email:${username} and password ${password} `);
      const verify = await auth.verify(username,OTP);
      const verified=JSON.stringify(verify.data.verified)
      if(verify.data.verified){
            
       await auth.logins(username,password);    
      window.location.reload(false);
       const { state } = this.props.location;   
      window.location = state ? state.from.pathname : "/welcome";
      toast.success(
        `Your OTP has been verified: }`
      );

      }else{   
       toast.error(
        `verification failed, check email OTP and try again ${verified}`
      ); 
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

 
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Col lg="9" md="9" >
          <Card className=" shadow border-0">
            <CardBody className="px-lg-5 py-lg-5">
              <div className="verifyDiv">
                <p className="p1">Verify Account</p>
                <p className="p2">
                  An OTP has been sent to your entered email:{" "}<h6>{username}</h6>
                </p>
                <div className="otpElements">
                  <p className="p3">Enter OTP Code here</p>
                  <div className="otp">
                    
                    <OtpInput style={{boxsizing: 1}}
                      inputStyle="inputStyle"
                      value={OTP}
                      onChange={handleChange}
                      numInputs={7}
                      separator={<span>-</span>}
                      renderInputs={(props) => <input {...props} />}
                    />
                  </div>

                  <p className="p3">Didn't receive the code?</p>
                  <div className="btn" onClick={resendtoken}>Resend</div>
                </div>
                <button 
                className="btn btn-primary text-white"
                onClick={doSubmit}>Verify</button>
              </div>
            </CardBody>
          </Card>
        </Col>
      </div>
    );
  }


export default VerifyOTP;
