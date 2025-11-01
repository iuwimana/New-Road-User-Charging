import http from "../../httpService";
import apiUrl from "../../../config.json";
import { toast } from "react-toastify";

const apiEndpoint = apiUrl.apiUrl + "/inspectionplan/inspectionplan";
const apiEndpointa = apiUrl.apiUrl + "/inspectionplan/save";
const apiEntpointcontract=apiUrl.apiUrl + "/inspectionplan/inspectionplanbycontract"
const apiEndpointList = apiUrl.apiUrl + "/inspectionplandetail/list";
const apiEndpointSummary = apiUrl.apiUrl + "/inspectionplan/inspectionplansummary"; // aggregates
const apiEndpointView = apiUrl.apiUrl + "/inspectionplan/inspectionplan/view"; // single by id

// ✅ Get all inspection plans
export async function getInspectionPlans(inspectionplanId) {
  try {
    return await http.post(apiEndpointList,{inspectionplanId});
  } catch (ex) {
    return toast.error("Error while fetching inspection plans " + ex);
  }
}

export async function getInspectionPlansbycontract(contractid) {
  try {
    return await http.post(apiEntpointcontract,{contractid});
  } catch (ex) {
    return toast.error("Error while fetching inspection plans " + ex);
  }
}

// ✅ Get inspection plan by ID
export async function getInspectionPlanById(inspectionplanId) {
  try {
    return await http.post(apiEndpointView, { inspectionplanId });
  } catch (ex) {
    return toast.error("Error while fetching inspection plan " + ex);
  }
}

// ✅ Get aggregates (summary)
export async function getInspectionPlansAggregates() {
  try {
    return await http.get(apiEndpointSummary);
  } catch (ex) {
    return toast.error("Error while fetching aggregates " + ex);
  }
}

// ✅ Add inspection plan
export async function addInspectionPlan(
  inspectionplanid,
  contractid,
  startfrom_location,
  endat_location,
  expectedoutput,
  inspectiondate,
  status
) {
  try {
    return await http.post(apiEndpointa, {
      inspectionplanid,
      contractid,
      startfrom_location,
      endat_location,
      expectedoutput,
      inspectiondate,
      status
    });
  } catch (ex) {
    return toast.error("Error while adding inspection plan " + ex);
  }
}

// ✅ Update inspection plan
export async function updateInspectionPlan(
  inspectionplanid,
  contractid,
  startfrom_location,
  endat_location,
  expectedoutput,
  inspectiondate,
  status
) {
  try {
    return await http.post(apiEndpointa, {
      inspectionplanid,
  contractid,
  startfrom_location,
  endat_location,
  expectedoutput,
  inspectiondate,
  status
    });
  } catch (ex) {
    return toast.error("Error while updating inspection plan " + ex);
  }
}

// ✅ Delete inspection plan
export async function deleteInspectionPlan(inspectionplanId) {
  try {
    return await http.delete(apiEndpoint, {
      data: { inspectionplanId }
    });
  } catch (ex) {
    return toast.error("Error while deleting inspection plan " + ex);
  }
}
