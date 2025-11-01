import http from "../../httpService";
import apiUrl from "../../../config.json";
import { toast } from "react-toastify";

// Base endpoints for inspection plans
const apiEndpoint = apiUrl.apiUrl + "/inspectionplan/inspection-plan";      // POST for insert/update and DELETE
const apiEndpoints = apiUrl.apiUrl + "/inspectionplan/inspection-plans";    // GET all plans
const apiEndpointAggregates = apiUrl.apiUrl + "/inspection-plans/aggregates"; // GET aggregates

// === Fetch all inspection plans ===
export async function getInspectionPlans() {
  try {
    const response = await http.get(apiEndpoints);
    return response.data;
  } catch (ex) {
    toast.error(
      "An error occurred while fetching inspection plans. Please try again later. " + ex
    );
    return null;
  }
}

// === Fetch aggregate values ===
export async function getInspectionPlanAggregates() {
  try {
    const response = await http.get(apiEndpointAggregates);
    return response.data;
  } catch (ex) {
    toast.error(
      "An error occurred while fetching inspection plan aggregates. Please try again later. " + ex
    );
    return null;
  }
}

// === Save (Insert / Update) an inspection plan ===
export async function saveInspectionPlan(planData) {
  try {
    const response = await http.post(apiEndpoint, planData);
    return {
      success: true,
      message: response.data.message,
      operation: planData.plan_id === 0 || !planData.plan_id ? "inserted" : "updated",
    };
  } catch (ex) {
    const errorMsg =
      ex.response?.data?.error ||
      "An error occurred while saving the inspection plan. Please try again later.";
    console.error("API Error:", ex.response?.data || ex.message);
    toast.error(errorMsg);
    return { success: false, error: errorMsg };
  }
}

// === Delete an inspection plan ===
export async function deleteInspectionPlan(plan_id) {
  try {
    await http.delete(apiEndpoint, { data: { plan_id } });
    toast.success("Inspection plan deleted successfully.");
    return { success: true };
  } catch (ex) {
    const errorMsg =
      "An error occurred while deleting the inspection plan. Please try again later.";
    toast.error(errorMsg);
    return { success: false, error: errorMsg };
  }
}

// === Fetch a single inspection plan by ID (optional) ===
export async function getInspectionPlanById(plan_id) {
  try {
    const response = await http.get(`${apiEndpoints}/${plan_id}`);
    return response.data;
  } catch (ex) {
    toast.error(
      "An error occurred while fetching the inspection plan details. Please try again later. " + ex
    );
    return null;
  }
}
