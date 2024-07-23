import http from "../../httpService";
import apiUrl from "../../../config.json";
import { toast } from "react-toastify";
const apiEndpoint = apiUrl.apiUrl + "/maintenance/maintenance";

export async function getmaintenances() {
  try {
    const maintenance = await http.get(apiEndpoint);
    return maintenance;
  } catch (ex) {
    return null;
  }
}


export async function getmaintenanceById(roadclassificationid) {
  try {
    return await http.get(apiEndpoint, roadclassificationid);
  } catch (ex) {
    return toast.error(
      "An Error Occured, while fetching maintenance data, Please try again later" +
        ex
    );
  }
}
export async function deletemaintenance(roadclassificationid) {
  try {
    await http.delete(apiEndpoint, {
      data: { roadclassificationid: roadclassificationid },
    });
  } catch (ex) {
    return toast.error(
      "An Error Occured, while deleting maintenance Please try again later" +
        ex
    );
  }
}
export async function addmaintenance(roadclassificationid, roadclass) {
  try {
    await http.post(apiEndpoint, {
      roadclassificationid,
      roadclass,
    });
  } catch (ex) {
    return toast.error(
      "An Error Occured, while saving maintenance of funds Please try again later" +
        ex
    );
  }
}
