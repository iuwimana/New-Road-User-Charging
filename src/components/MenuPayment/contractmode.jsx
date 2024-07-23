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
import ContractorMenu from "../MenuPayment/contract";
import * as ContractData from "../../services/ContractManagement/ContractSetting/contractservice";


const ContractMode= ({ contractmodeid, contractmode,projectid ,cancreateserviceorder}) => {
 //---------------------------------------------
  const [isopencontracttype, setOpencontracttypeState] = useState(false);
  //---------------------------------------

   //---------------------------------------
   const { isOpen, toggle } = useOpenController(false);
  const { isOpenrec, togglerec } = useOpenController(false);
  const { isOpenplan, toggleplan } = useOpenController(false);
  const { isOpencont, toggleCont } = useOpenController(false);
  const { isOpenfiscalyear, togglefiscalyear } = useOpenController(false);
  const { isOpencontracttype, togglecontracttype } = useOpenController(false);
  const { isOpenproject, toggleproject } = useOpenController(false);
  //---------------------------------------
const [contractsmodeid,setcontractmodeid]= useState(0);
const [contracts, setcontracts]=useState([]);
  //---------------------------------------

  //const { data: business } = await ContractData.getcontractBycontractmode(state.contractmodeid);
  try {
    useEffect(() => {
      const fetchProgram = async () => {
        const { data } = await ContractData.getcontractBycontractmode(contractmodeid);
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
   const handleshowcontractor=async()=>{
     try {
      <NavLink
            className="nav-item nav-link"
              to={{
                pathname:
                  "/ContractManagemenrt/contract/contract",
                state: { contractmodeid: contractmodeid },
              }}        
              
              >
                {window.location.reload(false)}
              </NavLink>
    } catch (ex) {
      toast.error(
        "An Error Occured, while Loading contracttype data.........." + ex
      );
    }
   }
  //-----------------------------------------------------------
  function handleopencontracttypeclick() {
    setOpencontracttypeState(!isopencontracttype);
  }

   return (
    <>
    <div className="row" key={contractmodeid}>
        {" "}
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <div className="col" >
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
                        Contract Mode: - {contractmode}
                      </span>
                    </div>
                  </button>
                

                {isopencontracttype && (
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
              </div>
            </div>
          </div>
        </div>
      </div>


  {/** 
      <tr key={contractmodeid}>
        <td colspan="3">
          
          <div class="row" >
            
            
  
            
            <div class="col"onClick={handleshowcontractor} >
              <br/>
               Contract mode: - {contractmode}
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
          {contracts.map((contracts) => (
            <ContractorMenu
              contractid={
                contracts.contractid
              }
              contractorname={contracts.contractorname}
              
              projectid={projectid}
              cancreateserviceorder={cancreateserviceorder}
              contractbudget={contracts.contractbudget}
              refnumber={contracts.refnumber}
            />
          ))}
          </>
          )}

      */}
     
      
    </>
  );
}
export default ContractMode;