import http from "../httpService";
import  apiUrl  from "../../config.json";
import { toast } from "react-toastify";
const apiEndpoint = apiUrl.apiUrl + "/userapproval/userapproval";
const approvalapiEndpoint = apiUrl.apiUrl + "/userapproval/userapprovallevel";

export async function getuserapprovals() {
  try {
    return await http.get(apiEndpoint);
  } catch (ex) {
    return null;
  }
}


export async function getuserapprovalevel(email,approvalitem) {
  try {
    
  
     return await http.post(approvalapiEndpoint,{ email,approvalitem});
    
  } catch (ex) {
    return toast.error("An Error Occured, while saving userapproval Please try again later" + ex );;
  }
}
 


export async function deleteuserapproval(userapprovalid) {
  try {
     await http.delete(apiEndpoint,{ data: { userapprovalid: userapprovalid } });
    
  } catch (ex) {
    return toast.error("An Error Occured, while deleting userapproval Please try again later"+ex);
  }
}



export async function adduserapprovals(userapprovalid,  userid, email, approvallevel, approvalitem) {
  try {
    
  
     await http.post(apiEndpoint,{ userapprovalid,  userid, email, approvallevel, approvalitem});
    
  } catch (ex) {
    return toast.error("An Error Occured, while saving userapproval Please try again later" + ex );;
  }
}
 



 


 