import http from "../../httpService";
import apiUrl from "../../../config.json";
import { toast } from "react-toastify";

// Base endpoints for evaluation descriptors
const apiEndpoint = apiUrl.apiUrl + "/evaluationDescriptors/descriptor";    // POST for insert/update, DELETE
const apiEndpoints = apiUrl.apiUrl + "/evaluationDescriptors/descriptors";  // GET all 
const apiEndpointA = apiUrl.apiUrl +"/evaluationDescriptors/descriptors/aggregates";//  aggregates

// === Fetch all evaluationDescriptors ===
export async function getevaluationDescriptors() {
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

export async function getDescriptorsWithAggregates() {
  try {
    const response = await http.get(apiEndpointA);
    // response.data should include: existing descriptors + aggregate values
    return response.data;
  } catch (ex) {
    toast.error(
      "An error occurred while fetching evaluation descriptors. Please try again later. " + ex
    );
    return null;
  }
}
export async function saveDescriptor(descriptorData) {
  try {
    const response = await http.post(apiEndpoint, descriptorData);
    return {
      success: true,
      message: response.data.message,
      operation: descriptorData.descriptor_id === 0 ? "inserted" : "updated",
    };
  } catch (ex) {
    const errorMsg =
      ex.response?.data?.error ||
      "An error occurred while saving the descriptor. Please try again later.";
    console.error("API Error:", ex.response?.data || ex.message);
    toast.error(errorMsg);
    return { success: false, error: errorMsg };
  }
}
export async function deleteDescriptor(descriptor_id) {
  try {
    await http.delete(apiEndpoint, { data: { descriptor_id } });
    toast.success("Descriptor deleted successfully.");
    return { success: true };
  } catch (ex) {
    const errorMsg =
      "An error occurred while deleting the descriptor. Please try again later.";
    toast.error(errorMsg);
    return { success: false, error: errorMsg };
  }
}

