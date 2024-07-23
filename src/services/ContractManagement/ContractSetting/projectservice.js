import http from "../../httpService";
import apiUrl from "../../../config.json";
import { toast } from "react-toastify";
const apiEndpoint = apiUrl.apiUrl + "/project/project";
const apiEndpointps = apiUrl.apiUrl + "/project/projects";
const apiEndpoints = apiUrl.apiUrl + "/serviceorder/serviceorders";

export async function getprojects() {
  try {
    const project = await http.get(apiEndpoint);
    return project;
  } catch (ex) {
    return null;
  }
}

export async function getserviceorderBycontractId(contractid) {
  try {
    return await http.post(apiEndpoints, {contractid});
  } catch (ex) {
    return toast.error(
      "An Error Occured, while fetching project data, Please try again later" +
        ex
    );
  }
}



export async function getprojectById(projectid) {
  try {
    return await http.get(apiEndpoint, projectid);
  } catch (ex) {
    return toast.error(
      "An Error Occured, while fetching project data, Please try again later" +
        ex
    );
  }
}
export async function getprojectsbyfiscalyearcontracttypeid(fiscalyearcontracttypeid) {
  try {
    return await http.post(apiEndpointps, {fiscalyearcontracttypeid});
  } catch (ex) {
    return toast.error(
      "An Error Occured, while fetching project data, Please try again later" +
        ex
    );
  }
}
export async function deleteproject(projectid) {
  try {
    await http.delete(apiEndpoint, {
      data: { projectid: projectid },
    });
  } catch (ex) {
    return toast.error(
      "An Error Occured, while deleting project Please try again later" +
        ex
    );
  }
}
export async function addproject(projectid,projectdiscription,targetid,roodid,maintenancetypeid,budget,startdate,enddate,projectref,fiscalyearcontracttypeid,projectlength,measurementid) {
  try {
    await http.post(apiEndpoint, {
      projectid,
      projectdiscription,
      targetid,
      roodid,
      maintenancetypeid,
      budget,
      startdate,
      enddate,
      projectref,
      fiscalyearcontracttypeid,
      projectlength,
      measurementid
    });
  } catch (ex) {
    return toast.error(
      "An Error Occured, while saving project of funds Please try again later" +
        ex
    );
  }
}
