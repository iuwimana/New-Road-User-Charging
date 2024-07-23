import http from "../httpService";
import  apiUrl  from "../../config.json";
import { toast } from "react-toastify";
const apiEndpoint = apiUrl.apiUrl + "/baseline/baseline";
const apiEndpoints = apiUrl.apiUrl + "/baseline/baselines";


export async function getbaselines() {
  try {
    const baseline = await http.get(apiEndpoint);
    return baseline
  } catch (ex) {
    return null;
  }

  

}

export async function getbaselineById(OutPutId) {
  try {
    
    const baseline = await http.post(apiEndpoints,{OutPutId});
    return baseline
  } catch (ex) {
    return toast.error("An Error Occured, while fetching baseline data, Please try again later"+ex);
  }
}
export async function deletebaseline(BaselineId) {
  try {
    await http.delete(apiEndpoint,{ data: { BaselineId: BaselineId } });
    
  } catch (ex) {
    return toast.error("An Error Occured, while deleting baseline Please try again later"+ex);
  }
}
export async function addbaseline(BaselineId,OutPutId,BaselineName) {
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
  
     await http.post(apiEndpoint,{BaselineId,OutPutId,BaselineName});
    
  } catch (ex) {
    return toast.error("An Error Occured, while saving baseline of funds Please try again later" + ex );;
  }
}
 
   



 