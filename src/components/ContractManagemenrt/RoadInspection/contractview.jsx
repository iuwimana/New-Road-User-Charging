import React, { useEffect, useState } from "react";
import { ExpendableButton } from "../ContractSettings/contractor/ExpendableButton";
import { FcPlus, FcSynchronize } from "react-icons/fc";
//import { AiFillEdit, AiFillDelete,BsChevronDoubleDown } from "react-icons/ai";
import {BiSolidShoppingBag} from "react-icons/bi";
import { toast } from "react-toastify";
import useOpenController from "../ContractSettings/contractor/Hooks/useOpenController";
import * as Contract from "../../../services/ContractManagement/ContractSetting/contractservice";
import { BiSubdirectoryRight } from "react-icons/bi";
import * as ContractType from "../../../services/ContractManagement/ContractSetting/contractTypeService";
import { DiSqllite } from "react-icons/di";
import { FaHandPointRight } from "react-icons/fa";
import ServiceOrderView from "./serviceorderview";
import { Modal, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import "./inspection.css";
const ContractView = ({
  contracttypeid,
  cancreateserviceorder,
  contracttypename,
}) => {
  //--------------------------------------------------------
  const [contractType, setContractType] = useState([]);
  const [contract, setContract] = useState([]);

  //-----------------------------------------------
  const { isOpen, toggle } = useOpenController(false);
  const [subProgram, setSubProgram] = useState([]);
  const [requiredItem, setrequiredItem] = useState([]);

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

  
  //---------------------------------------

  return (
    <>
      <tbody>
        <tr key={contracttypeid}>
          <td className="button-td">
            <div className="whitespace-nowrap">
              <DiSqllite isOpen={isOpen} toggle={toggle} />
              <ExpendableButton isOpen={isOpen} toggle={toggle} />
            </div>
          </td>
          <td colSpan="4" id="contractcolor">
            <div className="whitespace-nowrap" id="tableborder">
              {contracttypename}
            </div>
          </td>
        </tr>

        {isOpen && (
          <>
            {contract.map((contract) => (
              <ServiceOrderView
                contractid={contract.contractid}
                contractdiscription={contract.contractdiscription}
                startdate={contract.startdate}
                enddate={contract.enddate}
                cancreateserviceorder={cancreateserviceorder}
              />
            ))}
          </>
        )}
      </tbody>
    </>
  );
};
export default ContractView;
