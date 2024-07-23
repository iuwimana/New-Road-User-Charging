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
import * as Projectdata from "../../services/ContractManagement/ContractSetting/projectservice";
import ProjectMenu from "../MenuPayment/projector";


const ContractType = ({ fiscalyearid, fiscalyear }) => {
  const { isOpen, toggle } = useOpenController(false);
  const { isOpenrec, togglerec } = useOpenController(false);
  const { isOpenplan, toggleplan } = useOpenController(false);
  const { isOpencont, toggleCont } = useOpenController(false);
  const { isOpenfiscalyear, togglefiscalyear } = useOpenController(false);
  const { isOpencontracttype, togglecontracttype } = useOpenController(false);
  const { isOpenproject, toggleproject } = useOpenController(false);
 //--------------------------------------------------------------------
  const [isopenfiscalyear, setOpenfiscalyearState] = useState(false);
  const [isopencontracttype, setOpencontracttypeState] = useState(false);

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
            fiscalyearid
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
  //-----------------------------------------------------------
  function handleopencontracttypeclick() {
    setOpenfiscalyearState(!isopenfiscalyear);
  }
  return (
    <>

    <div className="row" key={fiscalyearid}>
        {" "}
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <div className="col">
          <div className="card" style={{ width: 370 }}>
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
                       
                        &nbsp;Fiscal Year -{fiscalyear}
                      </span>
                    </div>
                  </button>
                
                {isopenfiscalyear && (
                  <>
                    {fiscalYearcontracttype.map((fiscalYearcontracttype) => (
                      <ProjectMenu
                        fiscalyearcontracttypeid={
                          fiscalYearcontracttype.fiscalyearcontracttypeid
                        }
                        contracttypename={
                          fiscalYearcontracttype.contracttypename
                        }
                        cancreateserviceorder={
                          fiscalYearcontracttype.cancreateserviceorder
                        }
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
      <tr key={fiscalyearid}>
        <td colspan="3">
          <div class="row">
            
            
              <div class="col">
                <br/>
               Fiscal year:- {fiscalyear}
               <br/>
                </div>
           
          </div>
        </td>
        <td>
          {" "}
          <div
            className="whitespace-nowrap"
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
      {isOpenfiscalyear && (
        <> 
          {fiscalYearcontracttype.map((fiscalYearcontracttype) => (
            <ProjectMenu
              fiscalyearcontracttypeid={
                fiscalYearcontracttype.fiscalyearcontracttypeid
              }
              contracttypename={fiscalYearcontracttype.contracttypename}
              cancreateserviceorder={fiscalYearcontracttype.cancreateserviceorder}
            />
          ))}
        </>
      )}
      */}
    </>
  );
};
export default ContractType;
