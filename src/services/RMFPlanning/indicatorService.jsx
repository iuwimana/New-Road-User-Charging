import http from "../httpService";
import  apiUrl  from "../../config.json";
import { toast } from "react-toastify";
const apiEndpoint = apiUrl.apiUrl + "/indicator/indicator";
const apiEndpoints = apiUrl.apiUrl + "/indicator/indicators";


export async function getindicators() {
  try {
    const indicator = await http.get(apiEndpoint);
    return indicator
  } catch (ex) {
    return null;
  }

  

}

export async function getindicatorById(OutPutId) {
  try {
    
    const indicator = await http.post(apiEndpoints,{OutPutId});
    return indicator
  } catch (ex) {
    return toast.error("An Error Occured, while fetching indicator data, Please try again later"+ex);
  }
}
export async function deleteindicator(IndicatorId) {
  try {
    await http.delete(apiEndpoint,{ data: { IndicatorId: IndicatorId } });
    
  } catch (ex) {
    return toast.error("An Error Occured, while deleting indicator Please try again later"+ex);
  }
}
export async function addindicator(IndicatorId,OutPutId,IndicatorName) {
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
  
     await http.post(apiEndpoint,{IndicatorId,OutPutId,IndicatorName});
    
  } catch (ex) {
    return toast.error("An Error Occured, while saving indicator of funds Please try again later" + ex );;
  }
}
 
   



 