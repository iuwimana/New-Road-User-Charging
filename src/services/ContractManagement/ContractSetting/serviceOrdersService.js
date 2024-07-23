import http from "../../httpService";
import apiUrl from "../../../config.json";
import { toast } from "react-toastify";
const apiEndpoint = apiUrl.apiUrl + "/serviceorder/serviceorder";
const apiEndpoints = apiUrl.apiUrl + "/serviceorder/serviceorders";
const apiEndpointa = apiUrl.apiUrl + "/serviceorder/approveserviceorder";
const apiEndpointr = apiUrl.apiUrl + "/serviceorder/rejectServiceOrder";
const apiEndfiscalyear = apiUrl.apiUrl + "/serviceorder/serviceorderbyfiscalyear";

export async function getserviceorders() {
  try {
    const serviceorder = await http.get(apiEndpoint);
    return serviceorder;
  } catch (ex) {
    return null;
  }
}

export async function getserviceorderBycontractId(contractid) {
  try {
    return await http.post(apiEndpoints, {contractid});
  } catch (ex) {
    return toast.error(
      "An Error Occured, while fetching serviceorder data, Please try again later" +
        ex
    );
  }
}
export async function getserviceorderByfiscalyear(fiscalyearid) {
  try {
    return await http.post(apiEndfiscalyear, {fiscalyearid});
  } catch (ex) {
    return toast.error(
      "An Error Occured, while fetching serviceorder data, Please try again later" +
        ex
    );
  }
}

export async function Approveserviceorder(serviceorderid) {
  try {
    return await http.post(apiEndpointa, {serviceorderid});
  } catch (ex) {
    return toast.error(
      "An Error Occured, while fetching serviceorder data, Please try again later" +
        ex
    );
  }
}
export async function rejectserviceorder(serviceorderid,rejectionmessage) {
  try {
    return await http.post(apiEndpointr, {serviceorderid,rejectionmessage});
  } catch (ex) {
    return toast.error(
      "An Error Occured, while fetching serviceorder data, Please try again later" +
        ex
    );
  }
}

export async function getserviceorderById(serviceorderid) {
  try {
    return await http.get(apiEndpoint, serviceorderid);
  } catch (ex) {
    return toast.error(
      "An Error Occured, while fetching serviceorder data, Please try again later" +
        ex
    );
  }
}
export async function deleteserviceorder(serviceorderid) {
  try {
    await http.delete(apiEndpoint, {
      data: { serviceorderid: serviceorderid },
    });
  } catch (ex) {
    return toast.error(
      "An Error Occured, while deleting serviceorder Please try again later" +
        ex
    );
  }
}
export async function addserviceorder(serviceorderid,damagedlevel,serviceorderdescription,projectid,contractid,Amount) {
  try {
    await http.post(apiEndpoint, {
      serviceorderid,
      damagedlevel,
      serviceorderdescription,
      projectid,
      contractid,
      Amount
    });
  } catch (ex) {
    return toast.error(
      "An Error Occured, while saving serviceorder of funds Please try again later" +
        ex
    );
  }
}
