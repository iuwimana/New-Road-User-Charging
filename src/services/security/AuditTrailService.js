import http from "../httpService";
import  apiUrl  from "../../config.json";
import { toast } from "react-toastify";
const apiEndpoint = apiUrl.apiUrl + "/securable/securable";

export async function getsecurables() {
  try {
    return await http.get(apiEndpoint);
  } catch (ex) {
    return null;
  }
}

export async function getsecurableId(SecurableID) {
  try {
    return await http.get(apiEndpoint,SecurableID);
  } catch (ex) {
    return toast.error("An Error Occured, while fetching securable data, Please try again later"+ex);
  }
}
export async function deletesecurable(SecurableID) {
  try {
     await http.delete(apiEndpoint,{ data: { SecurableID: SecurableID } });
    
  } catch (ex) {
    return toast.error("An Error Occured, while deleting role Please try again later"+ex);
  }
}



export async function addsecurables(SecurableID,SecurableName) {
  try {
    
  
     await http.post(apiEndpoint,{ SecurableID,SecurableName});
    
  } catch (ex) {
    return toast.error("An Error Occured, while saving securable Please try again later" + ex );;
  }
}
 
   



 