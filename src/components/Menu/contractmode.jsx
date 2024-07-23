import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FcHome } from "react-icons/fc";
import {
  FcPlanner,
  FcTimeline,
  FcTodoList,
  FcNeutralTrading,
  FcParallelTasks,
  FcComboChart,
} from "react-icons/fc";
import { FaPeopleCarry } from "react-icons/fa";
import {
  FcFeedIn,
  FcMoneyTransfer,
  FcSalesPerformance,
  FcConferenceCall,
  FcServices,
  FcDebt,
  FcCurrencyExchange,
} from "react-icons/fc";
import {
  FcBusinessman,
  FcPodiumWithSpeaker,
  FcBiotech,
  FcUnlock,
} from "react-icons/fc";
import { BiSolidShoppingBag } from "react-icons/bi";
import * as FisclaYearData from "../../services/RMFPlanning/fiscalYearService";
import { MdPermContactCalendar, MdManageAccounts } from "react-icons/md";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Dropdown, DropdownButton } from "react-bootstrap";
import NavDropdown from "react-bootstrap/NavDropdown";
import { ExpendableButton } from "../../components/ContractManagemenrt/ContractSettings/contractor/ExpendableButton";
import { FcPlus, FcSynchronize } from "react-icons/fc";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { toast } from "react-toastify";
import useOpenController from "../../components/ContractManagemenrt/ContractSettings/contractor/Hooks/useOpenController";
import * as Contract from "../../services/ContractManagement/ContractSetting/contractservice";
import Contractcomponent from "../ContractManagemenrt/ContractSettings/contract/contract"
import { BiSubdirectoryRight } from "react-icons/bi";
import * as ContractTypeData from "../../services/ContractManagement/ContractSetting/contractTypeService";
import { DiSqllite } from "react-icons/di";
import { FaHandPointRight } from "react-icons/fa";
import { Modal, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import * as FiscalYear from "../../services/RMFPlanning/fiscalYearService";
import * as FiscalYearContractType from "../../services/ContractManagement/ContractSetting/Fiscalyearcontracttypeservice";
import * as ContractModeData from "../../services/ContractManagement/ContractSetting/contractmodeservices";

import * as Projectdata from "../../services/ContractManagement/ContractSetting/projectservice";
import ContractorMenu from "../Menu/contract";
import * as ContractData from "../../services/ContractManagement/ContractSetting/contractservice";


import ServiceOrder from './../ContractManagemenrt/ContractSettings/contractor/serviceorder';
const ContractMode = ({
  contractmodeid,
  contractmode,
  projectid,
  cancreateserviceorder,
}) => {
  //---------------------------------------
  const { isOpen, toggle } = useOpenController(false);
  const { isOpenrec, togglerec } = useOpenController(false);
  const { isOpenplan, toggleplan } = useOpenController(false);
  const { isOpencont, toggleCont } = useOpenController(false);
  const { isOpenfiscalyear, togglefiscalyear } = useOpenController(false);
  const { isOpencontracttype, togglecontracttype } = useOpenController(false);
  const { isOpenproject, toggleproject } = useOpenController(false);
  //---------------------------------------
  const [contractsmodeid, setcontractmodeid] = useState(0);
  const [contracts, setcontracts] = useState([]);

  //---------------------------------------------
  const [isopencontracttype, setOpencontracttypeState] = useState(false);
  //---------------------------------------

  //const { data: business } = await ContractData.getcontractBycontractmode(state.contractmodeid);
  try {
    useEffect(() => {
      const fetchProgram = async () => {
        const { data } = await ContractData.getcontractBycontractmode(
          contractmodeid 
        );
        setcontracts(data);
      };
      fetchProgram();
    }, []);
  } catch (ex) {
    toast.error(
      "An Error Occured, while Loading contractmode year data.........." + ex
    );
  }
  //---------------------------------------
  const handleshowcontractor = async () => {
    try {
      
      <NavLink
        className="nav-item nav-link"
        to={{
          pathname: "/ContractManagemenrt/contract/contract",
          state: { contractmodeid: contractmodeid,contractmode:contractmode  },
        }}
      >
        {/**{window.location.reload(false)}**/}
      </NavLink>
    } catch (ex) {
      toast.error(
        "An Error Occured, while Loading contracttype data.........." + ex
      );
    }
  };
  //-----------------------------------------------------------
   function handleopencontracttypeclick() {
    setOpencontracttypeState(!isopencontracttype);
    
  }

  return (
    <>
      

      
      {cancreateserviceorder && (<tr key={contractmodeid}>
        <td>
          {" "}
          <div className="whitespace-nowrap">
            <DiSqllite
              isOpencontracttype={isOpencontracttype}
              toggle={togglecontracttype}
            /> <small><small><small><small>Open</small></small></small></small>
            <ExpendableButton
              isOpencontracttype={isOpencontracttype}
              toggle={togglecontracttype}
            />
          </div>
        </td>
        <td colspan="2">
          <div class="row">
            <div class="col" onClick={handleshowcontractor}>
              
              <NavLink
                className="nav-item nav-link"
                to={{
                  pathname: "/ContractManagemenrt/contract/contract",
                  state: { contractmodeid: contractmodeid,contractmode:contractmode },
                }}
              >
                <div className="cardssss ">
                <span className="nav-link-inner--text">
                <br />
                Contract for - {contractmode}
                <br />
                </span>
                </div>
              </NavLink>
              
            </div>
          </div>
        </td>

        
      </tr>)}
      {!cancreateserviceorder &&(
        <tr key={contractmodeid}>
          {/** 
          <td>
          {" "}
          <div className="whitespace-nowrap">
            <DiSqllite
              isOpencontracttype={isOpencontracttype}
              toggle={togglecontracttype}
            />
            <ExpendableButton
              isOpencontracttype={isOpencontracttype}
              toggle={togglecontracttype}
            />
          </div>
        </td>
        */}
        <td colspan="3">
          <div class="row">
            <div class="col" onClick={handleshowcontractor}>
              <NavLink
                className="nav-item nav-link"
                to={{
                  pathname: "/ContractManagemenrt/contract/contractemmergency",
                  state: { contractmodeid: contractmodeid ,contractmode:contractmode},
                }}
              >
                <div className="cardssss ">
                <span className="nav-link-inner--text">
                <br />
                Contract for - {contractmode}
                <br />
                </span>
                </div>
              </NavLink>
            </div>
          </div>
        </td>

        
      </tr>
      )}
      {isOpencontracttype && (
        <>
          {contracts.map((contracts) => (
            <ContractorMenu
              contractid={contracts.contractid}
              contractorname={contracts.contractorname}
              projectid={projectid}
              cancreateserviceorder={cancreateserviceorder}
            />
          ))}
        </>
      )}
 
     

      
    </>
  );
};
export default ContractMode;
