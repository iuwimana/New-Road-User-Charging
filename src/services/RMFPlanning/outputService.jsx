import http from "../httpService";
import  apiUrl  from "../../config.json";
import { toast } from "react-toastify";
const apiEndpoint = apiUrl.apiUrl + "/output/output";
const apiEndpoints = apiUrl.apiUrl + "/output/outputs";


export async function getoutputs() {
  try {
    const output = await http.get(apiEndpoint);
    return output
  } catch (ex) {
    return null;
  }

  

}

export async function getoutputById(OutcomeId) {
  try {
    
    const output = await http.post(apiEndpoints,{OutcomeId});
    return output
  } catch (ex) {
    return toast.error("An Error Occured, while fetching output data, Please try again later"+ex);
  }
}
export async function deleteoutput(OutPutId) {
  try {
      await http.delete(apiEndpoint,{ data: { OutPutId: OutPutId } });
    
  } catch (ex) {
    return toast.error("An Error Occured, while deleting output Please try again later"+ex);
  }
}
export async function addoutput(OutPutId,OutComeId,OutPutName) {
  try {
    //fetch(apiEndpoint, {
      //method: 'POST',
     // body: JSON.stringify({
       //  RoleID: RoleID,
      //   RoleName: RoleName,
       //  Description: Description,
      //   IsSystemRole: IsSystemRole,
     // }),
     // headers: {
      //   'Content-type': 'application/json; charset=UTF-8',
     // },
  // })
  
     await http.post(apiEndpoint,{OutPutId,OutComeId,OutPutName});
    
  } catch (ex) {
    return toast.error("An Error Occured, while saving output of funds Please try again later" + ex );;
  }
}
 
   



 