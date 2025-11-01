import http from "../../httpService";
import apiUrl from "../../../config.json";
import { toast } from "react-toastify";

const apiEndpoint = apiUrl.apiUrl + "/inspectionplandetail/inspectionplandetail";
const apiEndpointa = apiUrl.apiUrl + "/inspectionplandetail/save";
const apiEndpointList = apiUrl.apiUrl + "/inspectionplandetail/inspectionplandetails";
const apiEndpointSummary = apiUrl.apiUrl + "/inspectionplandetail/inspectionplandetailsummary"; // aggregates
const apiEndpointByPlan = apiUrl.apiUrl + "/inspectionplandetail/inspectionplandetailbyplan";
const apiEndpointdescriptorByPlan = apiUrl.apiUrl + "/inspectionplandetail/descriptors";
const apiEndpointdescriptorserviceorderByPlan = apiUrl.apiUrl + "/inspectionplandetail//descriptorserviceorder";
const apiExportPDF = apiUrl.apiUrl + "/inspectionplandetail/inspectionplan/pdf";
const apiExportPDFS=apiUrl.apiUrl + "/inspectionplandetail/inspectionplanserviceorder/pdf"

// ✅ Get all details
export async function getInspectionPlanDetails() {
  try {
    return await http.get(apiEndpointList);
  } catch (ex) {
    return toast.error("Error while fetching inspection plan details " + ex);
  }
}
//apiExportPDFS
export async function getInspectionPlanPDF(inspectionplanid, contractid, startfrom_location, endat_location, expectedoutput, inspectiondate, status) {
  try {
    const response = await http.post(
      apiExportPDF,  // <-- define iyi constant yawe nk’uko wabikoze kuri apiExportPDF
      { inspectionplanid, contractid, startfrom_location, endat_location, expectedoutput, inspectiondate, status },
      { responseType: "blob" } // Important for binary PDF
    );

    // Create download link
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `inspectionplan_${inspectionplanid}.pdf`);
    document.body.appendChild(link);
    link.click();

    // Clean up
    setTimeout(() => {
      window.URL.revokeObjectURL(url);
      link.remove();
    }, 100);

    return true;
  } catch (ex) {
    toast.error(`PDF Export Failed: ${ex.message}`);
    console.error("Inspection Plan PDF export error:", ex);
    return false;
  }
}

//
export async function getInspectionPlanserviceorderPDF(inspectionplanid, contractid, startfrom_location, endat_location, expectedoutput, inspectiondate, status) {
  try {
    const response = await http.post(
      apiExportPDFS,  // <-- define iyi constant yawe nk’uko wabikoze kuri apiExportPDF
      { inspectionplanid, contractid, startfrom_location, endat_location, expectedoutput, inspectiondate, status },
      { responseType: "blob" } // Important for binary PDF
    );

    // Create download link
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `inspectionplan_${inspectionplanid}.pdf`);
    document.body.appendChild(link);
    link.click();

    // Clean up
    setTimeout(() => {
      window.URL.revokeObjectURL(url);
      link.remove();
    }, 100);

    return true;
  } catch (ex) {
    toast.error(`PDF Export Failed: ${ex.message}`);
    console.error("Inspection Plan PDF export error:", ex);
    return false;
  }
}


// ✅ Get details by inspection plan ID
export async function getInspectionPlanDetailsByPlan(inspectionplanId) {
  try {
    return await http.post(apiEndpointByPlan, { inspectionplanId });
  } catch (ex) {
    return toast.error("Error while fetching details by plan " + ex);
  }
}


// ✅ Get details with descriptors by inspection plan ID
export async function getInspectionPlanDetailswithdescriptorByPlan(inspectionplanId) {
  try {
    return await http.post(apiEndpointdescriptorByPlan, { inspectionplanId });
  } catch (ex) {
    return toast.error("Error while fetching details by plan " + ex);
  }
}
//apiEndpointdescriptorserviceorderByPlan
export async function getInspectionPlanDetailswithdescriptorserviceorderByPlan(inspectionplanId) {
  try {
    return await http.post(apiEndpointdescriptorserviceorderByPlan, { inspectionplanId });
  } catch (ex) {
    return toast.error("Error while fetching details by plan " + ex);
  }
}
// ✅ Get aggregates
export async function getInspectionPlanDetailsAggregates() {
  try {
    return await http.get(apiEndpointSummary);
  } catch (ex) {
    return toast.error("Error while fetching aggregates " + ex);
  }
}

// ✅ Add detail
export async function addInspectionPlanDetail(
  inspectiondetailid , inspectionplanId, activitytypeId
) {
  try {
    return await http.post(apiEndpointa, {
      inspectiondetailid , inspectionplanId, activitytypeId
    });
  } catch (ex) {
    return toast.error("Error while adding inspection plan detail " + ex);
  }
}

// ✅ Update detail
export async function updateInspectionPlanDetail(
  inspectionplandetailId,
  inspectionplanId,
  activity,
  assignedto,
  duedate,
  status
) {
  try {
    return await http.put(apiEndpoint, {
      inspectionplandetailId,
      inspectionplanId,
      activity,
      assignedto,
      duedate,
      status
    });
  } catch (ex) {
    return toast.error("Error while updating inspection plan detail " + ex);
  }
}

// ✅ Delete detail
export async function deleteInspectionPlanDetail(inspectiondetailid) {
  try {
    return await http.delete(apiEndpoint, {
      data: { inspectiondetailid }
    });
  } catch (ex) {
    return toast.error("Error while deleting inspection plan detail " + ex);
  }
}
