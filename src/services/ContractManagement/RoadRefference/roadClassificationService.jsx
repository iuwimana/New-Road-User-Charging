import http from "../../httpService";
import apiUrl from "../../../config.json";
import { toast } from "react-toastify";
const apiEndpoint = apiUrl.apiUrl + "/classification/classification";
const apiEndpoints = apiUrl.apiUrl + "/classification/classifications";
const apiEndpointpavettype = apiUrl.apiUrl + "/classification/pavettype";
const apiEndpointshoulder = apiUrl.apiUrl + "/classification/shoulder";

export async function getclassifications() {
  try {
    const classification = await http.get(apiEndpoint);
    return classification;
  } catch (ex) {
    return null;
  }
}
export async function getshoulders() {
  try {
    const shoulder = await http.get(apiEndpointshoulder);
    return shoulder;
  } catch (ex) {
    return null;
  }
}
export async function getpavettypes() {
  try {
    const pavettype = await http.get(apiEndpointpavettype);
    return pavettype;
  } catch (ex) {
    return null;
  }
}

export async function getclassificationById(roadclassificationid) {
  try {
    return await http.get(apiEndpoints, roadclassificationid);
  } catch (ex) {
    return toast.error(
      "An Error Occured, while fetching roadclassification data, Please try again later" +
        ex
    );
  }
}
export async function deleteclassification(roadclassificationid) {
  try {
    await http.delete(apiEndpoint, {
      data: { roadclassificationid: roadclassificationid },
    });
  } catch (ex) {
    return toast.error(
      "An Error Occured, while deleting roadclassification Please try again later" +
        ex
    );
  }
}
export async function addclassification(roadclassificationid, roadclass) {
  try {
    await http.post(apiEndpoint, {
      roadclassificationid,
      roadclass,
    });
  } catch (ex) {
    return toast.error(
      "An Error Occured, while saving roadclassification of funds Please try again later" +
        ex
    );
  }
}
