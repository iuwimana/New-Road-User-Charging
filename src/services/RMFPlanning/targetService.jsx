import http from "../httpService";
import  apiUrl  from "../../config.json";
import { toast } from "react-toastify";
const apiEndpoint = apiUrl.apiUrl + "/target/target";
const apiEndpoints = apiUrl.apiUrl + "/target/targets";


export async function gettargets() {
  try {
    const target = await http.get(apiEndpoint);
    return target
  } catch (ex) {
    return null;
  }

  

}


export async function gettargetById(OutPutId) {
  try {
    
    const target = await http.post(apiEndpoints,{OutPutId});
    return target
  } catch (ex) {
    return toast.error("An Error Occured, while fetching target data, Please try again later"+ex);
  }
}
export async function deletetarget(TargetId) {
  try {
    await http.delete(apiEndpoint,{ data: { TargetId: TargetId } });
    
  } catch (ex) {
    return toast.error("An Error Occured, while deleting target Please try again later"+ex);
  }
}
export async function addtarget(TargetId,OutPutId,TargetName,StartQuarter,EndQuarter) {
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
  
     await http.post(apiEndpoint,{TargetId,OutPutId,TargetName,StartQuarter,EndQuarter});
    
  } catch (ex) {
    return toast.error("An Error Occured, while saving target of funds Please try again later" + ex );;
  }
}
 
   



 