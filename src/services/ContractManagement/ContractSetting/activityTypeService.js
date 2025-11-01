import http from "../../httpService";
import apiUrl from "../../../config.json";
import { toast } from "react-toastify";

// Base endpoints
const apiEndpoint = apiUrl.apiUrl + "/activityTypes/activitytype";   // POST, DELETE
const apiEndpoints = apiUrl.apiUrl + "/activityTypes/activitytypes"; // GET

// === Fetch all activity types ===
export async function getActivityTypes() {
  try {
    const response = await http.get(apiEndpoints);
    return response.data;
  } catch (ex) {
    toast.error(
      "An Error Occurred while fetching activity types. Please try again later."+ex
    );
    return null;
  }
}

// === Insert or Update Activity Type ===
export async function saveActivityType(activityTypeData) {
  
  try {
    
    const response = await http.post(apiEndpoint, activityTypeData);
    return {
      success: true,
      message: response.data,
      operation:
        activityTypeData.activitytypeid === 0 ? "inserted" : "updated",
    };
  } catch (ex) {
    const errorMsg =
      ex.response?.data?.error ||
      "An Error Occurred while saving activity type. Please try again later.";
    console.error("API Error:", ex.response?.data || ex.message);
    toast.error(errorMsg);
    return { success: false, error: errorMsg };
  }
}

// === Delete Activity Type ===
export async function deleteActivityType(activitytypeid) {
  try {
    await http.delete(apiEndpoint, {
      data: { activitytypeid },
    });
    toast.success("Activity type deleted successfully.");
    return { success: true };
  } catch (ex) {
    const errorMsg =
      "An Error Occurred while deleting activity type. Please try again later.";
    toast.error(errorMsg);
    return { success: false, error: errorMsg };
  }
}
