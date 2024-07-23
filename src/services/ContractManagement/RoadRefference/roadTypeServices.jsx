import http from "../../httpService";
import apiUrl from "../../../config.json";
import { toast } from "react-toastify";
const apiEndpoint = apiUrl.apiUrl + "/roadtype/roadtype";
const apiEndpoints = apiUrl.apiUrl + "/roadtype/roadtypes";

export async function getroadtypes() {
  try {
    const roadtype = await http.get(apiEndpoint);
    return roadtype;
  } catch (ex) {
    return null;
  }
}

export async function getroadtypeById(roadTypeid) {
  try {
    return await http.get(apiEndpoints, roadTypeid);
  } catch (ex) {
    return toast.error(
      "An Error Occured, while fetching roadType data, Please try again later" +
        ex
    );
  }
}
export async function deleteroadtype(roadTypeid) {
  try {
    await http.delete(apiEndpoint, {
      data: { roadTypeid: roadTypeid },
    });
  } catch (ex) {
    return toast.error(
      "An Error Occured, while deleting roadType Please try again later" + ex
    );
  }
}
export async function addroadtype(roadTypeid, roadTypeName) {
  try {
    await http.post(apiEndpoint, {
      roadTypeid,
      roadTypeName,
    });
  } catch (ex) {
    return toast.error(
      "An Error Occured, while saving roadType of funds Please try again later" +
        ex
    );
  }
}
