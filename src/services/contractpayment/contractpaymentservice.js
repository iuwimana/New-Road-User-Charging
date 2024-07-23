import http from "../httpService";
import apiUrl from "../../config.json";
import { toast } from "react-toastify";
const apiEndpoint = apiUrl.apiUrl + "/contractpayment/contractpayment";
const apiEndpoints = apiUrl.apiUrl + "/contractpayment/contractpayments";
const paymentapiEndpoints = apiUrl.apiUrl + "/contractpayment/fiscalyearcontractpayment";
const paymentapprovalapiEndpoints = apiUrl.apiUrl + "/contractpayment/approvfiscalyearcontractpayment";
const updatepaymentapiEndpoints = apiUrl.apiUrl + "/contractpayment/contractpaymentupdatestatus";

const apiEndpointreport = apiUrl.apiUrl + "/contractpayment/contractpaymentreport";

export async function getcontractpayments() {
  try {
    const contractor = await http.get(apiEndpoint);
    return contractor;
  } catch (ex) {
    return null;
  }
}


export async function getcontractpaymentBycontract(contractid) {
  try {
    return await http.post(apiEndpoints, {contractid});
  } catch (ex) {
    return toast.error(
      "An Error Occured, while fetching contractpayment data, Please try again later" +
        ex
    );
  }
}
export async function approvfiscalyearcontractpayment(fiscalyearid) {
  try {
    return await http.post(paymentapprovalapiEndpoints, {fiscalyearid});
  } catch (ex) {
    return toast.error(
      "An Error Occured, while fetching contractpayment data, Please try again later" +
        ex
    );
  }
}
export async function contractpaymentupdatestatus(contractpaymentid,paymentstatus) {
  try {
    return await http.post(updatepaymentapiEndpoints, {contractpaymentid,paymentstatus});
  } catch (ex) {
    return toast.error(
      "An Error Occured, while fetching contractpayment data, Please try again later" +
        ex
    );
  }
}
export async function getcontractpaymentByFiscalyear(fiscalyearid) {
  try {
    return await http.post(paymentapiEndpoints, {fiscalyearid});
  } catch (ex) {
    return toast.error(
      "An Error Occured, while fetching contractpayment data, Please try again later" +
        ex
    );
  }
}
export async function getcontractpaymentreport(contractpaymentid) {
  try {
    return await http.post(apiEndpointreport, {contractpaymentid});
  } catch (ex) {
    return toast.error(
      "An Error Occured, while fetching contractpayment data, Please try again later" +
        ex
    );
  }
}
export async function deletecontractpayment(contractpaymentid) {
  try {
    await http.delete(apiEndpoint, {
      data: { contractpaymentid: contractpaymentid },
    });
  } catch (ex) {
    return toast.error(
      "An Error Occured, while deleting contractpayment Please try again later" +
        ex
    );
  }
}

export async function addcontractpayment(contractpaymentid,contractid,payedAmount,contractAmount,remainAmount,notes,paymenttypeid) {
  try {
    await http.post(apiEndpoint, {
      contractpaymentid,
      contractid,
      payedAmount,
      contractAmount,
      remainAmount,
      notes,
      paymenttypeid
    });
  } catch (ex) {
    return toast.error(
      "An Error Occured, while saving inspection of funds Please try again later" +
        ex
    );
  }
}
