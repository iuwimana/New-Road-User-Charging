// services/ContractManagement/serviceOrderService.js
import http from "../../httpService";
import apiUrl from "../../../config.json";
import { toast } from "react-toastify";

// Base endpoints for service orders
const apiEndpoint = apiUrl.apiUrl + "/serviceorders/serviceorder";    // POST insert/update, DELETE
const apiEndpoints = apiUrl.apiUrl + "/serviceorders/serviceorders";  // GET all
const apiEndpointA = apiUrl.apiUrl + "/serviceorders/serviceorders/summary"; // aggregates

// === Fetch all service orders ===
export async function getServiceOrders(contractid) {
  try {
    const response = await http.post(apiEndpoints,{contractid});
    return response.data;
  } catch (ex) {
    toast.error(
      "An error occurred while fetching service orders. Please try again later. " + ex
    );
    return null;
  }
}

// === Fetch service orders with aggregates (optional) ===
export async function getServiceOrdersWithAggregates(fiscalyearcontracttypeid) {
  try {
    const response = await http.post(apiEndpointA,{fiscalyearcontracttypeid});
    // response.data should include: existing orders + aggregate values
    return response.data;
  } catch (ex) {
    toast.error(
      "An error occurred while fetching service order aggregates. Please try again later. " + ex
    );
    return null;
  }
}

// === Insert or Update Service Order ===
//  If serviceorder_id == 0 → insert, else update
export async function saveServiceOrder(orderData) {
  try {
    const response = await http.post(apiEndpoint, orderData);
    return {
      success: true,
      message: response.data.message,
      operation: orderData.serviceorder_id === 0 ? "inserted" : "updated",
    };
  } catch (ex) {
    const errorMsg =
      ex.response?.data?.error ||
      "An error occurred while saving the service order. Please try again later.";
    console.error("API Error:", ex.response?.data || ex.message);
    toast.error(errorMsg);
    return { success: false, error: errorMsg };
  }
}

// === Delete Service Order ===
export async function deleteServiceOrder(serviceorderid) {
  try {
    await http.delete(apiEndpoint, { data: { serviceorderid } });
    toast.success("Service order deleted successfully.");
    return { success: true };
  } catch (ex) {
    const errorMsg =
      "An error occurred while deleting the service order. Please try again later.";
    toast.error(errorMsg);
    return { success: false, error: errorMsg };
  }
}
