import React, { useEffect, useState } from "react";
import { ExpendableButton } from "./ExpendableButton";
import { FcPlus, FcSynchronize } from "react-icons/fc";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { toast } from "react-toastify";
//import { TableRow } from "./TableRow";
import * as ContractData from "../../../../services/ContractManagement/ContractSetting/contractservice";
import * as ContractorData from "../../../../services/ContractManagement/ContractSetting/ContractorService";

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

export const Contract = ({
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
  const { isOpen, toggle } = useOpenController(false);
  const [contract, setcontract] = useState([]);
  const [requiredItem, setrequiredItem] = useState([]);

  //------------------------------------
  const [show, setShow] = useState(false);
  const [showcontract, setShowcontract] = useState(false);
  const [showcontractupdate, setShowcontractupdate] = useState(false);
  const [Showserviceorder, setShowserviceorder] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  //-------------------------------------------
  useEffect(() => {
    const fetchProgram = async () => {
      const { data } = await ContractData.getcontractById(contractorid);
      setcontract(data);
    };
    fetchProgram();
  }, []);
  /////////////////////////////////////////////////////////////////////////////////
  const handleShow = () => setShow(true);
  const handleShowcontract = () => setShowcontract(true);
  const handleClosecontract = () => setShowcontract(false);
  const handleShowcontractupdate = () => setShowcontractupdate(true);
  const handleShowserviceorder = () => setShowserviceorder(true);
  const handleCloseserviceorder = () => setShowserviceorder(false);
  const handleClosecontractupdate = () => setShowcontractupdate(false);
  const handleClose = () => setShow(false);
  useEffect(() => {
    handleClose();
    handleClosecontract();
    handleClosecontractupdate();
    handleCloseserviceorder();
  }, []);
  ////////////////////////////////////////////////////////////////////////////
  const replaceModalItem = async (contractorid) => {
    try {
      await ContractorData.deletecontractor(contractorid);
      toast.success(`contractor data has been delete successful`);
      window.location.reload(false);
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.rolename = ex.response.data;
        toast.error("Error:" + errors.rolename);
        this.setState({ errors });
      } else if (ex.response && ex.response.status === 409) {
        const errors = { ...this.state.errors };
        errors.rolename = ex.response.data;
        toast.error("Error:" + errors.rolename);
        this.setState({ errors });
      } else {
        toast.error(
          "An Error Occured, while saving Program data Please try again later"
        );
      }
    }
  };
  ////////////////////////////////////////////////////////////////////////////
  const replaceModalItemDelete = async (contractid) => {
    try {
      await ContractData.deletecontract(contractid);
      toast.success(`contract data has been delete successful`);
      window.location.reload(false);
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.rolename = ex.response.data;
        toast.error("Error:" + errors.rolename);
        this.setState({ errors });
      } else if (ex.response && ex.response.status === 409) {
        const errors = { ...this.state.errors };
        errors.rolename = ex.response.data;
        toast.error("Error:" + errors.rolename);
        this.setState({ errors });
      } else {
        toast.error(
          "An Error Occured, while saving Program data Please try again later"
        );
      }
    }
  };
  //---------------------------------------------------

  const brochure = contract.map((contract, index) => {
    return (
      <>
        <tr></tr>
        <tr key={contract.contractid}>
          <td></td>
          <td>
            <FaHandPointRight />
          </td>

          <td>
            <small>{contract.contracttypename}</small>
          </td>
          <td>
            <small>{contract.contractdiscription}</small>
          </td>
          <td>
            <small>{contract.roodname}</small>
          </td>
          <td>
            <small>{contract.rooddistance}</small>
          </td>
          <td>
            <small>{contract.budget}</small>
          </td>
          <td>
            <small>{contract.maintenancetypename}</small>
          </td>
          <td>
            <small>{contract.sourceoffundname}</small>
          </td>
          <td>
            <small>{contract.startdate}</small>
          </td>
          <td>
            <small>{contract.enddate}</small>
          </td>

          <td>
            <button
              className="btn btn-primary"
              data-toggle="modal"
              onClick={handleShowserviceorder}
            >
              <AiFillEdit />
              Service order
            </button>
          </td>
          <td>
            <button
              className="btn btn-primary"
              data-toggle="modal"
              onClick={handleShowcontractupdate}
            >
              <AiFillEdit />
              Update
            </button>{" "}
          </td>
          <td>
            <button
              className="btn btn-danger"
              onClick={() => replaceModalItemDelete(contract.contractid)}
            >
              <AiFillDelete />
              Delete
            </button>
          </td>

          <Modal
            dialogClassName="my-modal"
            show={showcontractupdate}
            onHide={handleClosecontractupdate}
          >
            <Modal.Header closeButton>
              <Modal.Title> Contract settings</Modal.Title>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={handleClosecontractupdate}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </Modal.Header>

            <Modal.Body>
              <Updatecontract
                contractorid={contractorid}
                enddate={contract.enddate}
                startdate={contract.startdate}
                activitysourceoffundid={contract.activitysourceoffundid}
                sourceoffundname={contract.sourceoffundname}
                maintenancetypeidid={contract.maintenancetypeidid}
                maintenancetypename={contract.maintenancetypename}
                budget={contract.budget}
                rooddistance={contract.rooddistance}
                roodid={contract.roodid}
                roodname={contract.roodname}
                contractdiscription={contract.contractdiscription}
                ontracttypeid={contract.ontracttypeid}
                contracttypename={contract.contracttypename}
                contractid={contract.contractid}
              />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClosecontractupdate}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>

          <Modal
            dialogClassName="my-modal"
            show={Showserviceorder}
            onHide={handleCloseserviceorder}
          >
            <Modal.Header closeButton>
              <Modal.Title>Contract Service Order</Modal.Title>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={handleCloseserviceorder}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </Modal.Header>

            <Modal.Body>
              <ServiceOrder
                contractorid={contractorid}
                enddate={contract.enddate}
                startdate={contract.startdate}
                activitysourceoffundid={contract.activitysourceoffundid}
                sourceoffundname={contract.sourceoffundname}
                maintenancetypeidid={contract.maintenancetypeidid}
                maintenancetypename={contract.maintenancetypename}
                budget={contract.budget}
                rooddistance={contract.rooddistance}
                roodid={contract.roodid}
                roodname={contract.roodname}
                contractdiscription={contract.contractdiscription}
                contracttypeid={contract.contracttypeid}
                contracttypename={contract.contracttypename}
                contractid={contract.contractid}
              />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseserviceorder}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </tr>
        <tr></tr>
        <tr></tr>
        <tr></tr>
      </>
    );
  });

  return (
    <tbody>
      <tr key={contractorid}>
        <td className="button-td">
          <small>
            <b>View contract </b>
            <br />
          </small>
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
          <Modal dialogClassName="my-modal" show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Update Contractor data</Modal.Title>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={handleClose}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </Modal.Header>

            <Modal.Body>
              <EditForm
                contractorid={contractorid}
                contractorname={contractorname}
                islocal={islocal}
                contractoraddress={contractoraddress}
                contractoremail={contractoremail}
                contractorphonenumber={contractorphonenumber}
                tinnumber={tinnumber}
                contactpersonfirstname={contactpersonfirstname}
                contactpersonmiddlename={contactpersonmiddlename}
                contactpersonlastname={contactpersonlastname}
                contactpersonemail={contactpersonemail}
                contactpersonphonenumber={contactpersonphonenumber}
              />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>

          <Modal
            dialogClassName="my-modal"
            show={showcontract}
            onHide={handleClosecontract}
          >
            <Modal.Header closeButton>
              <Modal.Title>Contract settings</Modal.Title>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={handleClosecontract}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </Modal.Header>

            <Modal.Body>
              <Addcontract contractorid={contractorid} />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClosecontract}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </td>
      </tr>
    </tbody>
  );
};
