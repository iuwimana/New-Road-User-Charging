import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardBody, Col } from "reactstrap";
import { FcPlus } from "react-icons/fc";
import useOpenController from "./Hooks/useOpenController";
import { Contract } from "./contract";
import * as ContractorData from "../../../../services/ContractManagement/ContractSetting/ContractorService";
import * as SubProgram from "../../../../services/RMFPlanning/subProgramService";
import AddModal from "./addroleModal";
import { toast } from "react-toastify";

const Contractor = () => {
  const { isOpen, toggle } = useOpenController(false);
  const { isLoading, setIsLoading } = useState(true);
  const [contractor, setcontractor] = useState([]);
  const [isHidden, setIsHidden] = useState(true);
  try {
    useEffect(() => {
      const fetchProgram = async () => {
        try {
          const { data } = await ContractorData.getcontractors();
          setcontractor(data);
        } catch (ex) {
          toast.error("Loading issues......");
        }
      };
      fetchProgram();
    }, []);
  } catch (ex) {
    toast.error("Loading issues......");
  }

  const hideRow = (contractorid) => {
    const contractorfetch = contractor.map((contractor, index) => {
      if (contractor.contractorid === contractorid) {
        return contractor;
      }

      return { ...contractor, isHidden: true };
    });
    setcontractor(contractor);
  };

  return (
    <div
      style={{
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Col
        style={{
          textAlign: "center",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Col
          style={{
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
          }}
        ></Col>

        <Card className=" shadow border-0">
          <CardHeader className="bg-transparent ">
            <div className="text-muted text-center mt-2 mb-3">
              <h1>
                <div style={{ textAlign: "center" }}>
                  <h1>RMF Contract Settings- Contractor</h1>
                </div>
              </h1>
            </div>
            <div className="btn-wrapper text-center">
              <div
                style={{
                  textAlign: "center",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                Add Contractor
                <button
                  className="btn btn-secondar"
                  data-toggle="modal"
                  data-target="#exampleAddModal"
                >
                  <FcPlus />
                </button>
              </div>
              <AddModal />
            </div>
          </CardHeader>
          <CardBody className="px-lg-5 py-lg-5">
            <div className="table-responsive mb-5">
              <table>
                <thead>
                  <th></th>
                  <th>Contractor name</th>
                  <th>Contractor address</th>
                  <th>Contractor email</th>
                  <th>Contractor phonenumber</th>
                  <th>Tin number</th>
                  <th>is local</th>
                  <th>contact person firstname</th>
                  <th>contact person middlename</th>
                  <th>contact person lastname</th>
                  <th>contact person phonenumber</th>
                  <th>contact person email</th>
                  <th>Update Contractor</th>
                  <th>Delete Contractor</th>
                </thead>
                {contractor.map((contractor) => (
                  <Contract
                    contractorid={contractor.contractorid}
                    contractorname={contractor.contractorname}
                    islocal={contractor.islocal}
                    contractoraddress={contractor.contractoraddress}
                    contractoremail={contractor.contractoremail}
                    contractorphonenumber={contractor.contractorphonenumber}
                    tinnumber={contractor.tinnumber}
                    contactpersonfirstname={contractor.contactpersonfirstname}
                    contactpersonmiddlename={contractor.contactpersonmiddlename}
                    contactpersonlastname={contractor.contactpersonlastname}
                    contactpersonemail={contractor.contactpersonemail}
                    contactpersonphonenumber={
                      contractor.contactpersonphonenumber
                    }
                  />
                ))}
              </table>
            </div>
          </CardBody>
        </Card>
      </Col>
    </div>
  );
};

export default Contractor;
