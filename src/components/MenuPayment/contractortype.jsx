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
import { BiSubdirectoryRight } from "react-icons/bi";
import * as ContractTypeData from "../../services/ContractManagement/ContractSetting/contractTypeService";
import { DiSqllite } from "react-icons/di";
import { FaHandPointRight } from "react-icons/fa";
import { Modal, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import * as FiscalYear from "../../services/RMFPlanning/fiscalYearService";
import * as FiscalYearContractType from "../../services/ContractManagement/ContractSetting/Fiscalyearcontracttypeservice";
import * as ContractModeData from "../../services/ContractManagement/ContractSetting/contractmodeservices";

import * as Projectdata from "../../services/ContractManagement/ContractSetting/projectservice";
import ContractModeMenu from "../MenuPayment/contractmode";

const ContractorType = ({ projectid, roadname ,cancreateserviceorder}) => {


  const { isOpen, toggle } = useOpenController(false);
  const { isOpenrec, togglerec } = useOpenController(false);
  const { isOpenplan, toggleplan } = useOpenController(false);
  const { isOpencont, toggleCont } = useOpenController(false);
  const { isOpenfiscalyear, togglefiscalyear } = useOpenController(false);
  const { isOpencontracttype, togglecontracttype } = useOpenController(false);
  const { isOpenproject, toggleproject } = useOpenController(false);
   //---------------------------------------
   const [contractmode, setcontractmode]=useState([])
    //---------------------------------------
    const [isopencontracttype, setOpencontracttypeState] = useState(false);

  //---------------------------------------
  try {
    useEffect(() => {
      const fetchProgram = async () => {
        const { data } = await ContractModeData.getcontractmodebyproject(projectid);
        setcontractmode(data);
      };
      fetchProgram();
    }, []);
  } catch (ex) {
    toast.error(
      "An Error Occured, while Loading contractmode year data.........." + ex
    );
  }

  //---------------------------------------
  function handleopencontracttypeclick() {
    setOpencontracttypeState(!isopencontracttype);
  }
  //-------------------------------------

  return (
    <>
    <div className="row" key={projectid}>
        {" "}
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <div className="col">
          <div className="card" style={{ width: 310 }}>
            <div className="vertical">
              <div className="toggle">
                <button
                  type="button"
                  className="collapsiblecontracttype"
                  style={{ height: 40 }}
                  onClick={handleopencontracttypeclick}
                >
                  <div className="cardssss ">
                    <span className="nav-link-inner--text">
                      Road - {roadname}
                    </span>
                  </div>
                </button>

                {isopencontracttype && (
                  <>
                    {contractmode.map((contractmode) => (
                      <ContractModeMenu
                        contractmodeid={contractmode.contractmodeid}
                        contractmode={contractmode.contractmode}
                        projectid={contractmode.projectid}
                        cancreateserviceorder={cancreateserviceorder}
                      />
                    ))}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

    {/** 
      <tr key={projectid}>
        <td colspan="3">
          <div class="row">
            <div class="col" >
              <br/>
               Road: - {roadname}
              <br/>
            </div>
          </div>
        </td>
        

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
      </tr>
      {isOpencontracttype && (
        <>
          <>
          {contractmode.map((contractmode) => (
            <ContractModeMenu
              contractmodeid={
                contractmode.contractmodeid
              }
              contractmode={contractmode.contractmode}
              projectid={contractmode.projectid}
              cancreateserviceorder={cancreateserviceorder}
            />
          ))}
        </>
        </>
      )}
      */}
      
    </>
  );

}
export default ContractorType;