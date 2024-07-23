import React, { useEffect, useState } from "react";
import { ExpendableButton } from "../ContractSettings/contractor/ExpendableButton";
import { FcPlus, FcSynchronize } from "react-icons/fc";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { toast } from "react-toastify";
import useOpenController from "../ContractSettings/contractor/Hooks/useOpenController";
import * as Contract from "../../../services/ContractManagement/ContractSetting/contractservice";
import { BiSubdirectoryRight } from "react-icons/bi";
import * as ServiceOrderData from "../../../services/ContractManagement/ContractSetting/serviceOrdersService";
import { DiSqllite } from "react-icons/di";
import { FaHandPointRight } from "react-icons/fa"; 
//import Modal from "./modal";
import { Modal, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import "./inspection.css";

const ServiceOrderView = ({contractid,contractdiscription,startdate,enddate,cancreateserviceorder}) => {
  //--------------------------------------------------------
  const [contractType, setContractType] = useState([]);
  const [contract, setContract] = useState([]);

  //-----------------------------------------------
  const { isOpen, toggle } = useOpenController(false);
  const [serviceOrder, setServiceOrder] = useState([]);
  const [requiredItem, setrequiredItem] = useState([]);

 
  //-------------------------------------------------------------------------------
  useEffect(() => {
    const fetchProgram = async () => {
      const { data } = await ServiceOrderData.getserviceorderBycontractId(contractid);
      setServiceOrder(data);
    };
    fetchProgram();
  }, []);
  //---------------------------------------

  return (
    
    <>
    {!cancreateserviceorder &&(

     <>
      <tr key={contractid}>
                            <td></td>
                            <td></td>
                            
                            <td colSpan="4">
                              <div id="#Employee_Progress">
                                <div className="row">
                                  <div className="col">
                                    {contractdiscription}
                                    <hr id="Path_24"></hr>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col">
                                    <small>
                                      <b>startdate: </b>
                                      {startdate}
                                    </small>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col">
                                    <small>
                                      <b>enddate: </b>
                                      {enddate}
                                    </small>
                                  </div>
                                </div>
                              </div>
                            </td>
                          </tr>
    </>
     )}
    {cancreateserviceorder &&(

     <>
      <tr key={contractid}>
                            <td></td>
                            <td className="button-td">
                              <DiSqllite isOpen={isOpen} toggle={toggle} />
                              <ExpendableButton
                                isOpen={isOpen}
                                toggle={toggle}
                              />
                            </td>
                            
                            <td colSpan="4">
                              <div id="#Employee_Progress">
                                <div className="row">
                                  <div className="col">
                                    {contractdiscription}
                                    <hr id="Path_24"></hr>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col">
                                    <small>
                                      <b>startdate: </b>
                                      {startdate}
                                    </small>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col">
                                    <small>
                                      <b>enddate: </b>
                                      {enddate}
                                    </small>
                                  </div>
                                </div>
                              </div>
                            </td>
                          </tr>
    </>
     )}  {isOpen && (
                      <>
                        {serviceOrder.map((serviceOrder) => (
                          <tr key={serviceOrder.serviceorderid}>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>
                              <div id="#Employee_Progress">
                                <div className="row">
                                  <div className="col">
                                    {serviceOrder.damagedlevel}
                                    <hr id="Path_24"></hr>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col">
                                    <small>
                                      <b>startdate: </b>
                                      {serviceOrder.startdate}
                                    </small>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col">
                                    <small>
                                      <b>enddate: </b>
                                      {serviceOrder.enddate}
                                    </small>
                                  </div>
                                </div>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </>
                    )}       
    </>
    
  );
};
export default ServiceOrderView;
