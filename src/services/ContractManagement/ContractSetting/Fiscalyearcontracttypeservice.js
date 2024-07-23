import http from "../../httpService";
import apiUrl from "../../../config.json";
import { toast } from "react-toastify";
const apiEndpoint = apiUrl.apiUrl + "/fiscalyearcontracttype/fiscalyearcontracttype";
const apiEndpoints = apiUrl.apiUrl + "/fiscalyearcontracttype/fiscalyearcontracttypes";

export async function getfiscalyearcontracttypes() {
  try {
    const fiscalyearcontracttype = await http.get(apiEndpoint);
    return fiscalyearcontracttype;
  } catch (ex) {
    return null;
  }
}


export async function getfiscalyearcontracttypeByfiscalyearId(fiscalyearid) {
  try {
    return await http.post(apiEndpoints, {fiscalyearid});
  } catch (ex) {
    return toast.error(
      "An Error Occured, while fetching fiscalyearcontracttype data, Please try again later" +
        ex
    );
  }
}
export async function deletefiscalyearcontracttype(fiscalyearcontracttypeid) {
  try {
    await http.delete(apiEndpoint, {
      data: { fiscalyearcontracttypeid: fiscalyearcontracttypeid },
    });
  } catch (ex) {
    return toast.error(
      "An Error Occured, while deleting fiscalyearcontracttype Please try again later" +
        ex
    );
  }
}
export async function addfiscalyearcontracttype(fiscalyearcontracttypeid,fiscalyearid,contracttypeid) {
  try {
    await http.post(apiEndpoint, {
      fiscalyearcontracttypeid,
      fiscalyearid,
      contracttypeid
    });
  } catch (ex) {
    return toast.error(
      "An Error Occured, while saving fiscalyearcontracttype of funds Please try again later" +
        ex
    );
  }
}
