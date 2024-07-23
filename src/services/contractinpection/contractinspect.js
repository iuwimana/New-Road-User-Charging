import http from "../httpService";
import apiUrl from "../../config.json";
import { toast } from "react-toastify";
const apiEndpoint = apiUrl.apiUrl + "/contractinspection/contractinspection";
const apiEndpoints = apiUrl.apiUrl + "/contractinspection/contractinspections";
const apiEndpointemmergency=apiUrl.apiUrl +"/contractinspection/emmergencycontractinspection";
const apiEndpointemmergencys=apiUrl.apiUrl +"/contractinspection/emmergencycontractinspections";
const apiEndpointapproval=apiUrl.apiUrl +"/contractinspection/contractinspectionsByFiscalyear";
const apiEndpointframeworkapproval=apiUrl.apiUrl +"/contractinspection/frameworkcontractinspectionsByFiscalyear";

const apiEndpointupdateemmergency=apiUrl.apiUrl +"/contractinspection/updateemmergencycontractinspectionstatus";
const apiEndpointupdateframework=apiUrl.apiUrl +"/contractinspection/updateframeworkcontractinspectionstatus";

export async function getcontractinspections() {
  try {
    const contractor = await http.get(apiEndpoint);
    return contractor;
  } catch (ex) {
    return null;
  }
}


export async function getframeworkcontractinspectionByfiscalyear(fiscalyearid) {
  try {
    return await http.post(apiEndpointframeworkapproval, {fiscalyearid});
  } catch (ex) {
    return toast.error(
      "An Error Occured, while fetching contractinspection data, Please try again later" +
        ex
    );
  }
}
export async function getcontractinspectionByserviceorder(serviceorderid) {
  try {
    return await http.post(apiEndpoints, {serviceorderid});
  } catch (ex) {
    return toast.error(
      "An Error Occured, while fetching contractinspection data, Please try again later" +
        ex
    );
  }
}
export async function deletecontractinspection(inspectionid) {
  try {
    await http.delete(apiEndpoint, {
      data: { inspectionid: inspectionid },
    });
  } catch (ex) {
    return toast.error(
      "An Error Occured, while deleting inspection Please try again later" +
        ex
    );
  }
}

export async function addcontractinspection(inspectionid, serviceorderid, inspectorname, purposeofinspection, observations) {
  try {
    await http.post(apiEndpoint, {
      inspectionid, 
      serviceorderid, 
      inspectorname, 
      purposeofinspection, 
      observations
    });
  } catch (ex) {
    return toast.error(
      "An Error Occured, while saving inspection of funds Please try again later" +
        ex
    );
  }
}

export async function updatefremeworkcontractinspectionstatus(inspectionid,inspectionstatus) {
  try {
    await http.post(apiEndpointupdateframework, {
      inspectionid,inspectionstatus
    });
  } catch (ex) {
    return toast.error(
      "An Error Occured, while saving inspection of funds Please try again later" +
        ex
    );
  }
}

//---------------------------------------------------Emmergency
export async function getemmergencycontractinspections() {
  try {
    const contractor = await http.get(apiEndpointemmergency);
    return contractor;
  } catch (ex) {
    return null;
  }
}

export async function getcontractinspectionByfiscalyear(fiscalyearid) {
  try {
    return await http.post(apiEndpointapproval, {fiscalyearid});
  } catch (ex) {
    return toast.error(
      "An Error Occured, while fetching contractinspection data, Please try again later" +
        ex
    );
  }
}
export async function getemmergencycontractinspectionByserviceorder(contractid) {
  try {
    return await http.post(apiEndpointemmergencys, {contractid});
  } catch (ex) {
    return toast.error(
      "An Error Occured, while fetching contractinspection data, Please try again later" +
        ex
    );
  }
}

export async function updateemmergencycontractinspectionstatus(inspectionid,inspectionstatus) {
  try {
    await http.post(apiEndpointupdateemmergency, {
      inspectionid,inspectionstatus
    });
  } catch (ex) {
    return toast.error(
      "An Error Occured, while saving inspection of funds Please try again later" +
        ex
    );
  }
}

export async function deleteemmergencycontractinspection(inspectionid) {
  try {
    await http.delete(apiEndpointemmergency, {
      data: { inspectionid: inspectionid },
    });
  } catch (ex) {
    return toast.error(
      "An Error Occured, while deleting inspection Please try again later" +
        ex
    );
  }
}

export async function addemmergencycontractinspection(inspectionid, contractid, inspectorfullname, purposeofinspection, observations) {
  try {
    await http.post(apiEndpointemmergency, {
      inspectionid, 
      contractid, 
      inspectorfullname, 
      purposeofinspection, 
      observations
    });
  } catch (ex) {
    return toast.error(
      "An Error Occured, while saving inspection of funds Please try again later" +
        ex
    );
  }
}