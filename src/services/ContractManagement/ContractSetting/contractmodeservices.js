import http from "../../httpService";
import apiUrl from "../../../config.json";
import { toast } from "react-toastify";
const apiEndpoints = apiUrl.apiUrl + "/contractMode/contractModes";




export async function getcontractmodebyproject(projectid ) {
  try {
    const contractmode =await http.post(apiEndpoints, {
      projectid 
    });
    return contractmode
  } catch (ex) {
    return toast.error(
      "An Error Occured, while fetching contractmode data  Please try again later" +
        ex
    );
  }
}
