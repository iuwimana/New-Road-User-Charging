import http from "../../httpService";
import apiUrl from "../../../config.json";
import { toast } from "react-toastify";
const apiEndpoint = apiUrl.apiUrl + "/contracttype/contracttype";

export async function getcontracttypes() {
  try {
    const contracttype = await http.get(apiEndpoint);
    return contracttype;
  } catch (ex) {
    return null;
  }
}


export async function getcontracttypeById(contracttypeid) {
  try {
    return await http.get(apiEndpoint, contracttypeid);
  } catch (ex) {
    return toast.error(
      "An Error Occured, while fetching contracttype data, Please try again later" +
        ex
    );
  }
}
export async function deletecontracttype(contracttypeid) {
  try {
    await http.delete(apiEndpoint, {
      data: { contracttypeid: contracttypeid },
    });
  } catch (ex) {
    return toast.error(
      "An Error Occured, while deleting contracttype Please try again later" +
        ex
    );
  }
}
export async function addcontracttype(contracttypeid,	contracttypename) {
  try {
    await http.post(apiEndpoint, {
      contracttypeid,
      	contracttypename,
    });
  } catch (ex) {
    return toast.error(
      "An Error Occured, while saving contracttype of funds Please try again later" +
        ex
    );
  }
}
