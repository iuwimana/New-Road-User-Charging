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


const Contract = ({
  contractid,
  contractorname,
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
  //---------------------------------------
  const handleshowproject = async () => {
    <NavLink
      className="nav-item nav-link"
      to={{
        pathname: "/ContractManagemenrt/contract/contractinspection",
        state: { contractid: contractid, projectid: projectid },
      }}
    >
      {window.location.reload(false)}
    </NavLink>;
  };
  //---------------------------------------
  return (
    <>
      {cancreateserviceorder && (
        <div className="row" key={contractid}>
          {" "}
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <div className="col" onClick={handleshowproject}>
            <div className="card" style={{ width: 310 }}>
              <div className="vertical">
                <br />
                <div className="toggle">
                  <NavLink
                    className="nav-item nav-link"
                    to={{
                      pathname:
                        "/ContractManagemenrt/contract/contractinspection",
                      state: { contractid: contractid, projectid: projectid },
                    }}
                  >
                    <div className="cardssss ">
                      <span className="nav-link-inner--text">
                        Contractor: - {contractorname}
                      </span>
                    </div>
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {!cancreateserviceorder && (
        <div className="row" key={contractid}>
          {" "}
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <div className="col" onClick={handleshowproject}>
            <div className="card" style={{ width: 310 }}>
              <div className="vertical">
                <br />
                <div className="toggle">
                  <NavLink
                    className="nav-item nav-link"
                    to={{
                      pathname:
                        "/ContractManagemenrt/contract/emmergencycontractinspection",
                      state: { contractid: contractid, projectid: projectid },
                    }}
                  >
                    <div className="cardssss ">
                      <span className="nav-link-inner--text">
                        Contractor: - {contractorname}
                      </span>
                    </div>
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/** 
      {cancreateserviceorder && (
        <tr key={contractid}>
          <td colspan="3">
            <div class="row">
              <div class="col" onClick={handleshowproject}>
                <NavLink
                  className="nav-item nav-link"
                  to={{
                    pathname:
                      "/ContractManagemenrt/contract/contractinspection",
                    state: { contractid: contractid, projectid: projectid },
                  }}
                >
                  <br />
                  Contractor: - {contractorname}
                  <br />
                </NavLink>
              </div>
            </div>
          </td>
        </tr>
      )}
      {!cancreateserviceorder && (
        <tr key={contractid}>
          <td colspan="3">
            <div class="row">
              <div class="col" onClick={handleshowproject}>
                <NavLink
                  className="nav-item nav-link"
                  to={{
                    pathname:
                      "/ContractManagemenrt/contract/emmergencycontractinspection",
                    state: { contractid: contractid, projectid: projectid },
                  }}
                >
                  <br />
                  Contractor: - {contractorname}
                  <br />
                </NavLink>
              </div>
            </div>
          </td>
        </tr>
      )}
      */}
    </>
  );
};
export default Contract;
