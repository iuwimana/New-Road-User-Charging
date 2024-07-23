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
import * as FisclaYearData from "../services/RMFPlanning/fiscalYearService";
import { MdPermContactCalendar, MdManageAccounts } from "react-icons/md";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Dropdown, DropdownButton } from "react-bootstrap";
import NavDropdown from "react-bootstrap/NavDropdown";
import { ExpendableButton } from "../components/ContractManagemenrt/ContractSettings/contractor/ExpendableButton";
import { FcPlus, FcSynchronize } from "react-icons/fc";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { toast } from "react-toastify";
import useOpenController from "../components/ContractManagemenrt/ContractSettings/contractor/Hooks/useOpenController";
import * as Contract from "../services/ContractManagement/ContractSetting/contractservice";
import { BiSubdirectoryRight } from "react-icons/bi";
import * as ContractType from "../services/ContractManagement/ContractSetting/contractTypeService";
import { DiSqllite } from "react-icons/di";
import { FaHandPointRight } from "react-icons/fa";
import { Modal, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import * as FiscalYear from "../services/RMFPlanning/fiscalYearService";
import * as FiscalYearContractType from "../services/ContractManagement/ContractSetting/Fiscalyearcontracttypeservice";
import * as Projectdata from "../services/ContractManagement/ContractSetting/projectservice";

import "../home.css";

const ContractType = ({ user }) => {
  const { isOpen, toggle } = useOpenController(false);
  const { isOpenrec, togglerec } = useOpenController(false);
  const { isOpenplan, toggleplan } = useOpenController(false);
  const { isOpencont, toggleCont } = useOpenController(false);
  const { isOpenfiscalyear, togglefiscalyear } = useOpenController(false);
  const { isOpencontracttype, togglecontracttype } = useOpenController(false);
  const { isOpenproject, toggleproject } = useOpenController(false);

  //-----------------------------------------------------------------------------------
  const [fiscalYear, setFiscalYear] = useState([]);
  const [fiscalYearid, setFiscalYearid] = useState(0);
  const [fiscalyearcontracttypeid, setfiscalyearcontracttypeid] = useState(0);
  const [fiscalYearcontracttype, setFiscalYearcontracttype] = useState([]);
  const [project, setproject] = useState([]);
  //-----------------------------------------------------------------------------------
  const handleshowproject = async () => {
    <NavLink
      className="nav-item nav-link"
      to={{
        pathname: "/ContractManagemenrt/contract/Project",
        state: {
          fiscalyearcontracttypeid:
            fiscalYearcontracttype.fiscalyearcontracttypeid,
        },
      }}
    >
      {toast.error(
        "An Error Occured, while Loading contracttype data.........."
      )}
      {window.location.reload(false)}
    </NavLink>;
  };

  //--------------------------------------------------------------
  const handleClick = async (fiscalyearid) => {
    try {
      setFiscalYearid(fiscalyearid);

      const { data } =
        await FiscalYearContractType.getfiscalyearcontracttypeByfiscalyearId(
          fiscalYearid
        );
      setFiscalYearcontracttype(data);
    } catch (ex) {
      toast.error(
        "An Error Occured, while Loading contracttype data.........." + ex
      );
    }
  };
  //--------------------------------------------------------------
  const handleprojectClick = async (fiscalyearcontracttypeid) => {
    try {
      setfiscalyearcontracttypeid(fiscalyearcontracttypeid);

      const { data } = await Projectdata.getprojectsbyfiscalyearcontracttypeid(
        fiscalyearcontracttypeid
      );
      setproject(data);
    } catch (ex) {
      toast.error(
        "An Error Occured, while Loading contracttype data.........." + ex
      );
    }
  };
  //--------------------------------------------------------------------------------
  try {
    useEffect(() => {
      const fetchProgram = async () => {
        const { data } =
          await FiscalYearContractType.getfiscalyearcontracttypeByfiscalyearId(
            fiscalYearid
          );
        setFiscalYearcontracttype(data);
      };
      fetchProgram();
    }, []);
  } catch (ex) {
    toast.error(
      "An Error Occured, while Loading Fiscal Year Contract Type data.........." +
        ex
    );
  }
  //--------------------------------------------------------------------------------
  try {
    useEffect(() => {
      const fetchProgram = async () => {
        const { data } =
          await Projectdata.getprojectsbyfiscalyearcontracttypeid(
            fiscalyearcontracttypeid
          );
        setproject(data);
      };
      fetchProgram();
    }, []);
  } catch (ex) {
    toast.error(
      "An Error Occured, while Loading Fiscal Year Contract Type data.........." +
        ex
    );
  }

  //---------------------------------------
  try {
    useEffect(() => {
      const fetchProgram = async () => {
        const { data } = await FiscalYear.getFiscalyears();
        setFiscalYear(data);
      };
      fetchProgram();
    }, []);
  } catch (ex) {
    toast.error(
      "An Error Occured, while Loading fiscal year data.........." + ex
    );
  }

  //---------------------------------------
  const brochure = fiscalYear.map((fiscalYear, index) => {
    return (
      <>
        <div className="row" key={fiscalYear.fiscalyearid}>
          <div className="col">{fiscalYear.fiscalyear}</div>
        </div>
      </>
    );
  });
  //---------------------------------------

  const FiscalYearContracttype = fiscalYearcontracttype.map(
    (fiscalYearcontracttype, index) => {
      return (
        <>
          <div
            className="row"
            key={fiscalYearcontracttype.fiscalyearcontracttypeid}
          >
            <div className="col">{fiscalYearcontracttype.contracttypename}</div>
          </div>
        </>
      );
    }
  );
   return (
    <div
      style={{
        display: "flex",
        height: 850,
        alignItems: "right",
        justifyContent: "right",
      }}
    >
      <div data-layer="7570bda7-476f-4e0d-b059-fd3abdfde7be" class="group16">
        {" "}
        <div className="table-responsive mb-5" style={{ width: 400 }}>

        </div>

        {isOpencont && (
                <>
                  {fiscalYear.map((fiscalYear) => (
                    <tr key={fiscalYear.fiscalyearid}>
                      <td colspan="3">
                        <div class="row">
                          <NavLink
                            className="nav-item nav-link"
                            to={{
                              pathname:
                                "/ContractManagemenrt/contract/fiscalyearcontracttype",
                              state: { fiscalyearid: fiscalYear.fiscalyearid },
                            }}
                          >
                            <div class="col">{fiscalYear.fiscalyear}</div>
                          </NavLink>
                        </div>
                      </td>
                      <td>
                        {" "}
                        <div
                          className="whitespace-nowrap"
                          onClick={() => handleClick(fiscalYear.fiscalyearid)}
                        >
                          <DiSqllite
                            isOpenfiscalyear={isOpenfiscalyear}
                            toggle={togglefiscalyear}
                          />
                          <ExpendableButton
                            isOpenfiscalyear={isOpenfiscalyear}
                            toggle={togglefiscalyear}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                  {isOpenfiscalyear && (
                    <>
                      {fiscalYearcontracttype.map((fiscalYearcontracttype) => (
                        <tr
                          key={fiscalYearcontracttype.fiscalyearcontracttypeid}
                        >
                          <td colspan="3">
                            <div class="row">
                              <div class="col" onClick={handleshowproject}>
                                <NavLink
                                  className="nav-item nav-link"
                                  to={{
                                    pathname:
                                      "/ContractManagemenrt/contract/Project",
                                    state: {
                                      fiscalyearcontracttypeid:
                                        fiscalYearcontracttype.fiscalyearcontracttypeid,
                                    },
                                  }}
                                >
                                  {fiscalYearcontracttype.contracttypename}
                                </NavLink>
                              </div>
                            </div>
                          </td>

                          <td>
                            {" "}
                            <div
                              className="whitespace-nowrap"
                              onClick={() =>
                                handleprojectClick(
                                  fiscalYearcontracttype.fiscalyearcontracttypeid
                                )
                              }
                            >
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
                      ))}
                    </>
                  )}
                </>
              )}



        </div>
        </div>
   );

}
export default ContractType;