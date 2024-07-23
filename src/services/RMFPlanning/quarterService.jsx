import http from "../httpService";
import  apiUrl  from "../../config.json";
import { toast } from "react-toastify";
const apiEndpoint = apiUrl.apiUrl + "/quarter/quarter";


export async function getquarters() {
  try {
    const quarter = await http.get(apiEndpoint);
    return quarter
  } catch (ex) {
    return null;
  }

  

}

export async function getquarterById(QuarterId) {
  try {
    return await http.get(apiEndpoint,QuarterId);
  } catch (ex) {
    return toast.error("An Error Occured, while fetching quarter data, Please try again later"+ex);
  }
}
export async function deletequarter(QuarterId) {
  try {
       
     await http.delete(apiEndpoint,{ data: { QuarterId: QuarterId } });
     
    
  } catch (ex) {
    return toast.error("An Error Occured, while deleting quarter Please try again later"+ex);
  }
}
export async function addquarter(QuarterId,Quarter,StartPeriod,EndPeriod) {
  try {
  
  
     await http.post(apiEndpoint,{ QuarterId,Quarter,StartPeriod,EndPeriod});
    
  } catch (ex) {
    return toast.error("An Error Occured, while saving quarter of funds Please try again later" + ex );;
  }
}
 
   



 