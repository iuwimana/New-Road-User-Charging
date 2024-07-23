import http from "../../httpService";
import apiUrl from "../../../config.json";
import { toast } from "react-toastify";
const apiEndpoint = apiUrl.apiUrl + "/expensecontract/expensecontract";
const apiEndpoints = apiUrl.apiUrl + "/expensecontract/expensecontracts";
export async function getexpensecontracts() {
  try {
    const classification = await http.get(apiEndpoint);
    return classification;
  } catch (ex) {
    return null;
  }
}


export async function getexpensecontractById(expensecontractid) {
  try {
    return await http.get(apiEndpoint, expensecontractid);
  } catch (ex) {
    return toast.error(
      "An Error Occured, while fetching expensecontract data, Please try again later" +
        ex
    );
  }
}
export async function getexpensecontractBycontractId(projectid) {
  try {
    return await http.post(apiEndpoints, {projectid});
  } catch (ex) {
    return toast.error(
      "An Error Occured, while fetching expensecontract data, Please try again later" +
        ex
    );
  }
}
export async function deleteexpensecontract(expensecontractid) {
  try {
    await http.delete(apiEndpoint, {
      data: { expensecontractid: expensecontractid },
    });
  } catch (ex) {
    return toast.error(
      "An Error Occured, while deleting expensecontract Please try again later" +
        ex
    );
  }
}
export async function addexpensecontract(expensecontractid,projectid,expensetypeid,number,totalbudget) {
  try {
    await http.post(apiEndpoint, {
      expensecontractid,
      projectid,
      expensetypeid,
      number,
      totalbudget
    });
  } catch (ex) {
    return toast.error(
      "An Error Occured, while saving expensecontract of funds Please try again later" +
        ex
    );
  }
}
