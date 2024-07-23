import React from 'react';
//import * as Role from "../../services/security/roleServices";
import Joi from "joi-browser";
//import { toast } from "react-toastify";
import Form from "../common/form";
//import * as role from "../../services/security/roleServices";
import {
  Card,
  CardHeader,
  CardBody,
  Col,
} from "reactstrap";
class UpdateRole extends Form {
 
  state = {
    
    data: { 
      RoleID:"",
      rolename: "",
       description: "", 
       isSystemRole: false },
    
    errors: {}
  };

  schema = {
    rolename: Joi.string()
      .required()
      .label("rolename"),
      description: Joi.string()
      .label("description"),
      isSystemRole: Joi.bool()
      .label("isSystemRole"),
   
  };
   // schema = {
   // RoleID: Joi.string(),
   // rolename: Joi.string()
   //   .required()
   //   .label("Title"),
   // description: Joi.string()
   //   .label("description"),
   // isSystemRole: Joi.bool()
   //   .label("isSystemRole"),
  //};


  
  doSubmit = async(e) => {
   
  }

  
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
          <CardHeader className="bg-transparent pb-5">
            <div className="text-muted text-center mt-2 mb-3">
              <h1>
                <small>Add New Role</small>
              </h1>
            </div>
            
          </CardHeader>
          <CardBody className="px-lg-5 py-lg-5">
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("RoleID", "RoleID")}
          {this.renderInput("rolename", "Rolename")}
          {this.renderInput("description", "Description")}
          {this.renderChackBox("isSystemRole", "IsSystemRole")}
          {this.rendernodisabledButton("UpdateRole")}
        </form>
      </CardBody>
        </Card>
        
      </Col>
    </div>

      );
  }
}
 
export default UpdateRole;
