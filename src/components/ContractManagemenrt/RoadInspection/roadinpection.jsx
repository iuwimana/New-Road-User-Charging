import React, { useEffect, useState } from "react";
import { ExpendableButton } from "../ContractSettings/contractor/ExpendableButton";
import { FcPlus, FcSynchronize } from "react-icons/fc";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { toast } from "react-toastify";
import useOpenController from "../ContractSettings/contractor/Hooks/useOpenController";
import * as Contract from "../../../services/ContractManagement/ContractSetting/contractservice";
import { BiSubdirectoryRight } from "react-icons/bi";
import * as ContractType from "../../../services/ContractManagement/ContractSetting/contractTypeService";
import { DiSqllite } from "react-icons/di";
import { FaHandPointRight } from "react-icons/fa";
import ContractView from "./contractview";
import { Modal, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import "./inspection.css";
const RoadInspection = () => {
  //--------------------------------------------------------
  const [contractType, setContractType] = useState([]);
  const [contract, setContract] = useState([]);
  const [cancreateserviceorder, setCancreateserviceorder] = useState("");
  const [contracttypeid, setContracttypeid] = useState(0);

  //-----------------------------------------------
  const { isOpen, toggle } = useOpenController(false);
  const [subProgram, setSubProgram] = useState([]);
  const [requiredItem, setrequiredItem] = useState([]);

  //-------------------------------------
  const handlereadserviceorder = async (
    contracttypeid,
    cancreateserviceorder
  ) => {
    toast.error(
      `contracttypeid:${contracttypeid} cancreateserviceorder:${cancreateserviceorder}`
    );
    setCancreateserviceorder(cancreateserviceorder);
    setContracttypeid(contracttypeid);

    const { data } = await Contract.getcontractBycontracttypeId(contracttypeid);
    setContract(data);
  };
  //-----------------------------------------------------------------------------------
  useEffect(() => {
    const fetchProgram = async () => {
      const { data } = await Contract.getcontractBycontracttypeId(
        contracttypeid
      );
      setContract(data);
    };
    fetchProgram();
  }, []);

  //-------------------------------------------------------------------------------
  useEffect(() => {
    const fetchProgram = async () => {
      const { data } = await ContractType.getcontracttypes();
      setContractType(data);
    };
    fetchProgram();
  }, []);
  //---------------------------------------

  return (
    <>
      <div id="Menu">
        <div id="Group_16_tu">
          <svg class="Rectangle_25_tv"></svg>
          <div className="mb-5">
            <div className="max-w-[320px] md:max-w-[990px] mx-auto">
              <div className="md:flex justify-between space-y-4 md:space-y-0 md:space-x-4 rtl:space-x-reverse">
                <div className="table-responsive mb-5">
                  <table
                    border="0"
                    cellspacing="0"
                    cellpadding="0"
                    className="table-hover table-borderless table-condensed table-hover"
                  >
                    <thead>
                      <th></th>
                      <th></th>
                      <th></th>
                      <th></th>
                    </thead>
                    {contractType.map((contractType) => (
                      <ContractView
                        contracttypeid={contractType.contracttypeid}
                        cancreateserviceorder={
                          contractType.cancreateserviceorder
                        }
                        contracttypename={contractType.contracttypename}
                      />
                    ))}
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default RoadInspection;
