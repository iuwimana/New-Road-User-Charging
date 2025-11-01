import http from "../httpService";
import  apiUrl  from "../../config.json";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
//import { useHistory } from 'react-router-dom';  
// Import useHistory for routing
const apiEndpoint = apiUrl.apiUrl + "/ifmispayments/ifmispayments";
const apiEndpointf = apiUrl.apiUrl + "/ifmispayments/ifmispaymentsbyfiscalyear";




export async function getifmispayments() {
  try {
    const getifmispayment = await http.get(apiEndpoint);
    return getifmispayment
  } catch (ex) {
    
    return null;
  }

  

}



export async function getifmispaymentbyfiscalyear(fiscalyearid) {
  try {
    const ifmispaymentbyfiscalyearget = await http.post(apiEndpointf,{fiscalyearid});
    return ifmispaymentbyfiscalyearget
     
  } catch (ex) {
    
    return toast.error("An Error Occured, while fetching ifmispayments data, Please try again later"+ex);
  }
}

export async function deleteifmispayment(IFMISPaymentid ) {
  try {
     await http.delete(apiEndpoint, {
       data: { IFMISPaymentid: IFMISPaymentid },
     });
   } catch (ex) {
    
     return toast.error(
       "An Error Occured, while deleting ifmispayment Please try again later" +
         ex
     );
   }
}
export async function addifmispayments( IFMISPaymentid, RevenuePaymentId, loadData) {
  try {
      
        //loadData=JSON.stringify(loadData)
     await http.post(apiEndpoint,{ IFMISPaymentid, RevenuePaymentId, loadData});
     //toast.error("wow");
    
    
     
  } catch (ex) {
   
    return toast.error("An Error Occured, while uploading ifmispayments  Please try again later" + ex );
  }
}
 
   



 