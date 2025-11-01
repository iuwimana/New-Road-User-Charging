import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardBody, Col, Button } from "reactstrap";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { FcPlus, FcViewDetails } from "react-icons/fc";
import { toast } from "react-toastify";
import Pagination from '../../../common/pagination';
import { paginate } from '../../../../utils/paginate';
import SearchBox from '../../../searchBox';

import AddInspectionPlanModal from "./addinspectionPlanModal";
import UpdateInspectionPlanModal from "./updateinspectionPlanModal";
import ViewInspectionPlanModal from "./viewInspectionPlanModal";
import * as InspectionPlanService from "../../../../services/ContractManagement/ContractSetting/inspectionPlanService";

const InspectionPlanMain = () => {
  const [plans, setPlans] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  useEffect(() => {
    populatePlans();
  }, []);

  const populatePlans = async () => {
    try {
      const result = await InspectionPlanService.getInspectionPlans();
      // Extract nested array from response
      setPlans(result?.[0]?.get_inspection_planss || []);
    } catch (ex) {
      toast.error("Failed to load inspection plans.");
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const getPagedData = () => {
    let filtered = plans;
    if (searchQuery)
      filtered = plans.filter((p) =>
        p.inspection_plan.contractdiscription.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const pagedPlans = paginate(filtered, currentPage, pageSize);
    return { totalCount: filtered.length, data: pagedPlans };
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure to delete this inspection plan?")) return;
    try {
      await InspectionPlanService.deleteInspectionPlan(id);
      toast.success("Inspection plan deleted successfully.");
      populatePlans();
    } catch (ex) {
      toast.error("Error deleting inspection plan.");
    }
  };

  const { totalCount, data: pagedPlans } = getPagedData();

  return (
    <div>
      <Col>
        <Card className="shadow border-0">
          <CardHeader className="bg-transparent">
            <Button color="success" onClick={() => setShowAddModal(true)}>
              <FcPlus /> Add Inspection Plan
            </Button>
          </CardHeader>
          <CardBody>
            <SearchBox value={searchQuery} onChange={handleSearch} />
            <div className="table-responsive mt-3">
              <table className="table table-striped table-hover align-middle">
                <thead className="table-dark text-center">
                  <tr>
                    <th>ID</th>
                    <th>Contract</th>
                    <th>Planned Date</th>
                    <th>Location</th>
                    <th>Status</th>
                    <th>View</th>
                    <th>Update</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {pagedPlans.map((plan) => (
                    <tr key={plan.inspection_plan.inspection_plan_id}>
                      <td>{plan.inspection_plan.inspection_plan_id}</td>
                      <td>{plan.inspection_plan.contractdiscription}</td>
                      <td>{plan.inspection_plan.planned_date}</td>
                      <td>{plan.inspection_plan.location}</td>
                      <td>{plan.inspection_plan.status}</td>
                      <td>
                        <Button
                          color="info"
                          size="sm"
                          onClick={() => {
                            setSelectedPlan(plan);
                            setShowViewModal(true);
                          }}
                        >
                          <FcViewDetails /> View
                        </Button>
                      </td>
                      <td>
                        <Button
                          color="primary"
                          size="sm"
                          onClick={() => {
                            setSelectedPlan(plan);
                            setShowUpdateModal(true);
                          }}
                        >
                          <AiFillEdit /> Update
                        </Button>
                      </td>
                      <td>
                        <Button
                          color="danger"
                          size="sm"
                          onClick={() =>
                            handleDelete(plan.inspection_plan.inspection_plan_id)
                          }
                        >
                          <AiFillDelete /> Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <Pagination
              itemsCount={totalCount}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
          </CardBody>
        </Card>
      </Col>

      {showAddModal && (
        <AddInspectionPlanModal
          isOpen={showAddModal}
          toggle={() => setShowAddModal(false)}
          refresh={populatePlans}
        />
      )}
      {showUpdateModal && selectedPlan && (
        <UpdateInspectionPlanModal
          show={showUpdateModal}
          handleClose={() => setShowUpdateModal(false)}
          refresh={populatePlans}
          plan={selectedPlan}
        />
      )}
      {showViewModal && selectedPlan && (
        <ViewInspectionPlanModal
          show={showViewModal}
          handleClose={() => setShowViewModal(false)}
          plan={selectedPlan}
        />
      )}
    </div>
  );
};

export default InspectionPlanMain;