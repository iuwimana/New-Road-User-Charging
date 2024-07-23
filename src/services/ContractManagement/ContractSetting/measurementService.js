import http from "../../httpService";
import apiUrl from "../../../config.json";
import { toast } from "react-toastify";
const apiEndpoint = apiUrl.apiUrl + "/measurement/measurement";

export async function getmeasurements() {
  try {
    const measurement = await http.get(apiEndpoint);
    return measurement;
  } catch (ex) {
    return null;
  }
}


export async function getmeasurementById(measurementid) {
  try {
    return await http.get(apiEndpoint, measurementid);
  } catch (ex) {
    return toast.error(
      "An Error Occured, while fetching measurement data, Please try again later" +
        ex
    );
  }
}
export async function deletemeasurement(measurementid) {
  try {
    await http.delete(apiEndpoint, {
      data: { measurementid: measurementid },
    });
  } catch (ex) {
    return toast.error(
      "An Error Occured, while deleting measurement Please try again later" +
        ex
    );
  }
}
export async function addmeasurement(measurementid,measurementname) {
  try {
    await http.post(apiEndpoint, {
      measurementid,
      measurementname
    });
  } catch (ex) {
    return toast.error(
      "An Error Occured, while saving measurement of funds Please try again later" +
        ex
    );
  }
}
