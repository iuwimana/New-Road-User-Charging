import http from "../../httpService";
import apiUrl from "../../../config.json";
import { toast } from "react-toastify";

// Base endpoints
const apiEndpoint = apiUrl.apiUrl + "/contractactivity/contractactivity";   // POST, DELETE
const apiEndpoints = apiUrl.apiUrl + "/contractactivity/contractactivities"; // GET

// === Fetch all contract activities ===
export async function getContractActivities() {
  try {
    const response = await http.get(apiEndpoints);
    return response.data;
  } catch (ex) {
    toast.error(
      "An error occurred while fetching contract activities. Please try again later. " + ex
    );
    return null;
  }
}

// === Insert or Update Contract Activity ===
export async function saveContractActivity(activityData) {
  try {
    const response = await http.post(apiEndpoint, activityData);
    return {
      success: true,
      message: response.data,
      operation:
        activityData.contractactivityid === 0 ? "inserted" : "updated",
    };
  } catch (ex) {
    const errorMsg =
      ex.response?.data?.error ||
      "An error occurred while saving contract activity. Please try again later.";
    console.error("API Error:", ex.response?.data || ex.message);
    toast.error(errorMsg);
    return { success: false, error: errorMsg };
  }
}

// === Delete Contract Activity ===
export async function deleteContractActivity(contractactivityid) {
  try {
    await http.delete(apiEndpoint, {
      data: { contractactivityid },
    });
    toast.success("Contract activity deleted successfully.");
    return { success: true };
  } catch (ex) {
    const errorMsg =
      "An error occurred while deleting contract activity. Please try again later.";
    toast.error(errorMsg);
    return { success: false, error: errorMsg };
  }
}
