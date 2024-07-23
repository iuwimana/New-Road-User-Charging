import http from "../../httpService";
import apiUrl from "../../../config.json";
import { toast } from "react-toastify";
const apiEndpoint = apiUrl.apiUrl + "/contract/contract";
const apiEndpoints = apiUrl.apiUrl + "/contract/contracts";
const apiEndpointcontractmodes =apiUrl.apiUrl +"/contract/contractmodes"
const apiEndpointt = apiUrl.apiUrl + "/contract/contracttype";
const apiEndpointprojectcontract = apiUrl.apiUrl + "/contractproject/contractproject";
const apiEndpointprojectcontracts = apiUrl.apiUrl + "/contractproject/contractprojects";
const apiEndpointcontractid = apiUrl.apiUrl + "/contract/contractbycontractid";
const apiEndpointcontractfiscalyear = apiUrl.apiUrl + "/contract/contractfiscalyear";
const apiEndpointcontractstatus = apiUrl.apiUrl + "/contract/contractstatus";

export async function getcontracts() {
  try {
    const contract = await http.get(apiEndpoint);
    return contract;
  } catch (ex) {
    return null;
  }
}

export async function getcontractprojects() {
  try {
    const contract = await http.get(apiEndpointprojectcontract);
    return contract;
  } catch (ex) {
    return null;
  }
}

export async function getcontractBycontractmode(ContractModeid) {
  try {
    return await http.post(apiEndpointcontractmodes, {ContractModeid});
  } catch (ex) {
    return toast.error(
      "An Error Occured, while fetching contract data, Please try again later" +
        ex
    );
  }
}

export async function getcontractByfiscalyear(fiscalyearid) {
  try {
    return await http.post(apiEndpointcontractfiscalyear, {fiscalyearid});
  } catch (ex) {
    return toast.error(
      "An Error Occured, while fetching contract data, Please try again later" +
        ex
    );
  }
}
export async function updatecontractstatus(contractid,statusmsg) {
  try {
    return await http.post(apiEndpointcontractstatus, {contractid,statusmsg});
  } catch (ex) {
    return toast.error(
      "An Error Occured, while fetching contract data, Please try again later" +
        ex
    );
  }
}

export async function getcontractBycontractID(contractid) {
  try {
    return await http.post(apiEndpointcontractid, {contractid});
  } catch (ex) {
    return toast.error(
      "An Error Occured, while fetching contract data, Please try again later" +
        ex
    );
  }
}


export async function getcontractById(contractorId) {
  try {
    return await http.post(apiEndpoints, {contractorId});
  } catch (ex) {
    return toast.error(
      "An Error Occured, while fetching contract data, Please try again later" +
        ex
    );
  }
}

export async function getcontractprojectByprojectId(projectid) {
  try {
    return await http.post(apiEndpointprojectcontracts, {projectid});
  } catch (ex) {
    return toast.error(
      "An Error Occured, while fetching contractproject data, Please try again later" +
        ex
    );
  }
}


export async function getcontractBycontracttypeId(contracttypeid) {
  try {
    return await http.post(apiEndpointt, {contracttypeid});
  } catch (ex) {
    return toast.error(
      "An Error Occured, while fetching contract data, Please try again later" +
        ex
    );
  }
}

export async function deletecontract(contractid) {
  try {
    await http.delete(apiEndpoint, {
      data: { contractid: contractid },
    });
  } catch (ex) {
    return toast.error(
      "An Error Occured, while deleting contract Please try again later" +
        ex
    );
  }
}
export async function deletecontractproject(contractprojectid) {
  try {
    await http.delete(apiEndpointprojectcontract, {
      data: { contractprojectid: contractprojectid },
    });
  } catch (ex) {
    return toast.error(
      "An Error Occured, while deleting contractproject Please try again later" +
        ex
    );
  }
}

export async function addcontract(contractid,contractdiscription,budget,ContractModeid,ContractorId,startdate,enddate) {
  try {
    await http.post(apiEndpoint, {
      contractid,
      contractdiscription,
      budget,
      ContractModeid,
      ContractorId,
      startdate,
      enddate
    });
  } catch (ex) {
    return toast.error(
      "An Error Occured, while saving contract of funds Please try again later" +
        ex
    );
  }
}

export async function addcontractproject(contractprojectid,projectid,contractid,contractorid,startdate,enddate, contracttypeid,
	          contractdiscription,roodid,maintenancetypeidid,budget,activitysourceoffundid) {
  try {
    await http.post(apiEndpointprojectcontract, {
      contractprojectid,
      projectid,
      contractid,
      contractorid,
      startdate,
      enddate, 
      contracttypeid,
      contractdiscription,
      roodid,
      maintenancetypeidid,
      budget,
      activitysourceoffundid
    });
  } catch (ex) {
    return toast.error(
      "An Error Occured, while saving contractproject of funds Please try again later" +
        ex
    );
  }
}
