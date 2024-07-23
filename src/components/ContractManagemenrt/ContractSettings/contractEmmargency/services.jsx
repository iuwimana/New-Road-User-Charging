import React, { useEffect, useState } from "react";
import { ExpendableButton } from "./ExpendableButton";
import { FcPlus, FcSynchronize } from "react-icons/fc";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { toast } from "react-toastify";
//import { TableRow } from "./TableRow";
import * as ServiceData from "../../../../services/ContractManagement/ContractSetting/servicesService";

import useOpenController from "./Hooks/useOpenController";
import * as SubProgram from "../../../../services/RMFPlanning/subProgramService";
import { BiSubdirectoryRight } from "react-icons/bi";
import * as Program from "../../../../services/RMFPlanning/programServices";
import { DiSqllite } from "react-icons/di";
import { FaHandPointRight } from "react-icons/fa";
//import Modal from "./modal";
import EditForm from "./EditForm";
import Addcontract from "./addcontract";
import Updatecontract from "./updatecontract";
import ServiceOrder from "./serviceorder";

import AddModal from "./addroleModal";
import AddSubProgramModal from "../../../rmfplannings/Program/addSubProgramModal";
import { Modal, Button, OverlayTrigger, Tooltip } from "react-bootstrap";

export const Services = ({
  contractorid,
  contractorname,
  islocal,
  contractoraddress,
  contractoremail,
  contractorphonenumber,
  tinnumber,
  contactpersonfirstname,
  contactpersonmiddlename,
  contactpersonlastname,
  contactpersonemail,
  contactpersonphonenumber,
}) => {

  return (
    <tbody>
      <tr key={contractorid}>
        <td className="button-td">
          <small>
            <b>View contract </b>
            <br />
          </small>
          <DiSqllite isOpen={isOpen} toggle={toggle} />

          <ExpendableButton isOpen={isOpen} toggle={toggle} />
        </td>
        <td>
          <small>{contractorname}</small>
        </td>
        <td>
          <small>{contractoraddress}</small>
        </td>
        <td>
          <small>{contractoremail}</small>
        </td>
        <td>
          <small>{contractorphonenumber}</small>
        </td>
        <td>
          <small>{tinnumber}</small>
        </td>
        <td>
          <small>{islocal.toString()}</small>
        </td>
        <td>
          <small>{contactpersonfirstname}</small>
        </td>
        <td>
          <small>{contactpersonmiddlename}</small>{" "}
        </td>
        <td>
          <small>{contactpersonlastname}</small>
        </td>
        <td>
          <small>{contactpersonemail}</small>
        </td>
        <td>
          <small>{contactpersonphonenumber}</small>
        </td>
        <td>
          <button
            onClick={handleShow}
            className="btn text-warning btn-act"
            data-toggle="modal"
          >
            <AiFillEdit />
            Update
          </button>
        </td>
        <td>
          <button
            className="btn btn-danger"
            onClick={() => replaceModalItem(contractorid)}
          >
            <AiFillDelete />
            Delete
          </button>
         
        </td>
      </tr>

      {isOpen && (
        <>
          <tr className=" bg-info text-white !outline-none  -mb-[1px] block rounded p-3.5 py-2 before:inline-block hover:bg-info hover:text-white">
            <td colSpan="2">
              <small>
                <b>{contractorname + " " + "contracts"}</b>
              </small>
            </td>

            <td>
              <big>Contract type name</big>
            </td>
            <td>
              <big>Contract discription</big>
            </td>
            <td>
              <big>Rood name</big>
            </td>
            <td>
              <big>Rood distance</big>
            </td>
            <td>
              <big>Budget</big>
            </td>
            <td>
              <big>Maintenance type name</big>
            </td>
            <td>
              <big>Source of fund name</big>
            </td>
            <td>
              <big>Start date</big>
            </td>
            <td>
              <big>End date</big>
            </td>
            <td></td>
            <td></td>
            <td>
              <div
                style={{
                  textAlign: "center",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                Add New Contract
                <button
                  className="btn btn-secondar"
                  data-toggle="modal"
                  onClick={handleShowcontract}
                >
                  <FcPlus />
                </button>
              </div>
            </td>
          </tr>
          
        </>
      )}
    </tbody>
  );

}