import http from "../../httpService";
import apiUrl from "../../../config.json";
import { toast } from "react-toastify";
const apiEndpoint = apiUrl.apiUrl + "/expensetype/expensetype";

export async function getexpensetypes() {
  try {
    const classification = await http.get(apiEndpoint);
    return classification;
  } catch (ex) {
    return null;
  }
}


export async function getexpensetypeById(expensetypeid) {
  try {
    return await http.get(apiEndpoint, expensetypeid);
  } catch (ex) {
    return toast.error(
      "An Error Occured, while fetching expensetype data, Please try again later" +
        ex
    );
  }
}
export async function deleteexpensetype(expensetypeid) {
  try {
    await http.delete(apiEndpoint, {
      data: { expensetypeid: expensetypeid },
    });
  } catch (ex) {
    return toast.error(
      "An Error Occured, while deleting expensetype Please try again later" +
        ex
    );
  }
}
export async function addexpensetype(expensetypeid,expensetypename,measurementid) {
  try {
    await http.post(apiEndpoint, {
      expensetypeid,
      expensetypename,
      measurementid
    });
  } catch (ex) {
    return toast.error(
      "An Error Occured, while saving expensetype of funds Please try again later" +
        ex
    );
  }
}
