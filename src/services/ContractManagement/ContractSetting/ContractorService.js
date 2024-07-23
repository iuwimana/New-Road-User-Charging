import http from "../../httpService";
import apiUrl from "../../../config.json";
import { toast } from "react-toastify";
const apiEndpoint = apiUrl.apiUrl + "/contractor/contractor";

const apicontractorreport = apiUrl.apiUrl + "/contractor/contractorreport";
const apicontractreport = apiUrl.apiUrl + "/contractor/contractreport";
const apiserviceorderreport = apiUrl.apiUrl + "/contractor/serviceorderreport";
const apinumberofpaymentreport = apiUrl.apiUrl + "/contractor/numberofpaymentreport";
const apipayedcontractreport= apiUrl.apiUrl + "/contractor/payedcontractreport";
const apipaymentprogressreport = apiUrl.apiUrl + "/contractor/paymentprogressreport";

export async function getcontractors() {
  try {
    const contractor = await http.get(apiEndpoint);
    return contractor;
  } catch (ex) {
    return null;
  }
}
//--------------------------------------------------------
export async function getcontractorreport() {
  try {
    const contractor = await http.get(apicontractorreport);
    return contractor;
  } catch (ex) {
    return null;
  }
}

export async function getcontractreport() {
  try {
    const contractor = await http.get(apicontractreport);
    return contractor;
  } catch (ex) {
    return null;
  }
}

export async function getserviceorderreport() {
  try {
    const contractor = await http.get(apiserviceorderreport);
    return contractor;
  } catch (ex) {
    return null;
  }
}

export async function getnumberofpaymentreport() {
  try {
    const contractor = await http.get(apinumberofpaymentreport);
    return contractor;
  } catch (ex) {
    return null;
  }
}

export async function getpayedcontractreport() {
  try {
    const contractor = await http.get(apipayedcontractreport);
    return contractor;
  } catch (ex) {
    return null;
  }
}

export async function getpaymentprogressreport() {
  try {
    const contractor = await http.get(apipaymentprogressreport);
    return contractor;
  } catch (ex) {
    return null;
  }
}

//-------------------------------------------------------

export async function getcontractorById(Contractorid) {
  try {
    return await http.get(apiEndpoint, Contractorid);
  } catch (ex) {
    return toast.error(
      "An Error Occured, while fetching contractor data, Please try again later" +
        ex
    );
  }
}
export async function deletecontractor(Contractorid) {
  try {
    await http.delete(apiEndpoint, {
      data: { Contractorid: Contractorid },
    });
  } catch (ex) {
    return toast.error(
      "An Error Occured, while deleting contractor Please try again later" +
        ex
    );
  }
}

export async function addcontractor(Contractorid ,ContractorName ,islocal,contractoraddress ,contractoremail,contractorphonenumber,TinNumber,contactpersonFirstName,contactpersonMiddleName,contactpersonLastName,contactpersonemail,contactpersonphonenumber) {
  try {
    await http.post(apiEndpoint, {
      Contractorid ,
      ContractorName ,
      islocal,
      contractoraddress ,
      contractoremail,
      contractorphonenumber,
      TinNumber,
      contactpersonFirstName,
      contactpersonMiddleName,
      contactpersonLastName,
      contactpersonemail,
      contactpersonphonenumber,
    });
  } catch (ex) {
    return toast.error(
      "An Error Occured, while saving contractor of funds Please try again later" +
        ex
    );
  }
}
