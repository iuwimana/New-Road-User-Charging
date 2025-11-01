import http from "../../httpService";
import apiUrl from "../../../config.json";
import { toast } from "react-toastify";

// API Endpoints
const apiEndpointPlans = apiUrl.apiUrl + "/inspectionplanserviceorder/inspection-plans/serviceorder";
const apiEndpointPlanUpsert = apiUrl.apiUrl + "/inspectionplanserviceorder/inspection-plan/serviceorder";
const apiEndpointDetailUpsert = apiUrl.apiUrl + "/inspectionplanserviceorder/inspection-plan/serviceorder/detail";
const apiEndpointDetailsByPlan = apiUrl.apiUrl + "/inspectionplanserviceorder/inspection-plan/serviceorder/details";
const apiEndpointDeletePlan = apiUrl.apiUrl + "/inspectionplanserviceorder/inspection-plan/serviceorder";
const apiEndpointDeleteDetail = apiUrl.apiUrl + "/inspectionplanserviceorder/inspection-plan/serviceorder/detail";
const apiExportPDF = apiUrl.apiUrl + "/inspectionplanserviceorder/inspection-plan/serviceorder/pdf";

// === Get all inspection plans
export async function getInspectionPlansServiceorder() {
  try {
    return await http.get(apiEndpointPlans);
  } catch (ex) {
    toast.error("Error while fetching inspection plans (serviceorder): " + ex);
  }
}

export async function getInspectionPlansServiceorderbyserviceorder(serviceorderid) {
  try {
    return await http.post(apiEndpointPlans,{serviceorderid});
  } catch (ex) {
    toast.error("Error while fetching inspection plans (serviceorder): " + ex);
  }
}

// === Add or update inspection plan
export async function saveInspectionPlanServiceorder(planData) {
  try {
    return await http.post(apiEndpointPlanUpsert, planData);
  } catch (ex) {
    toast.error("Error while saving inspection plan (serviceorder): " + ex);
  }
}

// === Get inspection plan details by plan ID
export async function getInspectionPlanDetailsByPlan(inspectionplanId) {
  try {
    return await http.post(apiEndpointDetailsByPlan, { inspectionplanId });
  } catch (ex) {
    toast.error("Error while fetching inspection plan details by plan: " + ex);
  }
}

// === Add or update inspection plan detail
export async function saveInspectionPlanDetailServiceorder(detailData) {
  try {
    return await http.post(apiEndpointDetailUpsert, detailData);
  } catch (ex) {
    toast.error("Error while saving inspection plan detail (serviceorder): " + ex);
  }
}

// === Delete inspection plan
export async function deleteInspectionPlanServiceorder(plan_id) {
  try {
    return await http.delete(apiEndpointDeletePlan, { data: { plan_id } });
  } catch (ex) {
    toast.error("Error while deleting inspection plan (serviceorder): " + ex);
  }
}

// === Delete inspection plan detail
export async function deleteInspectionPlanDetailServiceorder(inspectiondetailid) {
  try {
    return await http.delete(apiEndpointDeleteDetail, { data: { inspectiondetailid } });
  } catch (ex) {
    toast.error("Error while deleting inspection plan detail (serviceorder): " + ex);
  }
}

// === Export inspection plan PDF
export async function exportInspectionPlanPDF(planData) {
  try {
    const response = await http.post(apiExportPDF, planData, { responseType: "blob" });

    // Create download link
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `inspectionplan_${planData.inspectionplanid}.pdf`);
    document.body.appendChild(link);
    link.click();

    // Cleanup
    setTimeout(() => {
      window.URL.revokeObjectURL(url);
      link.remove();
    }, 100);

    return true;
  } catch (ex) {
    toast.error("PDF Export Failed: " + ex.message);
    console.error("Inspection Plan PDF export error:", ex);
    return false;
  }
}
