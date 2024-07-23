import http from "../httpService";
import  apiUrl  from "../../config.json";
import { toast } from "react-toastify";
const apiEndpoint = apiUrl.apiUrl + "/revenucorrection/revenucorrection";
const apiEndpointtotal = apiUrl.apiUrl + "/revenucorrection/revenucorrectiontotal";
const apiEndpointproduct = apiUrl.apiUrl + "/revenucorrection/RevenueCorrectiontotalperrevenueproduct";
const apiEndpointpercentage = apiUrl.apiUrl + "/revenucorrection/RevenueCorrectionpercentage";
const apiEndpointrevbyfiscalyear = apiUrl.apiUrl+"/revenucorrection/revenucorrectionbyfiscalyear";
const apiEndpointnarativeD = apiUrl.apiUrl+"/revenucorrection/narativedashboardrevenuecorrection";

export async function getrevenucorrections() {
  try {
    const revenucorrectionget = await http.get(apiEndpoint);
    return revenucorrectionget
  } catch (ex) {
    return null;
  }

  

}

export async function getrevenucorrectiontotal() {
  try {
    const revenucorrectionget = await http.get(apiEndpointtotal);
    return revenucorrectionget
  } catch (ex) {
    return null;
  }  

}

export async function getrevenucorrectionperproduct() {
  try {
    const revenucorrectionget = await http.get(apiEndpointproduct);
    return revenucorrectionget
  } catch (ex) {
    return null;
  }  

}

export async function getrevenucorrectionpercentage() {
  try {
    const revenucorrectionget = await http.get(apiEndpointpercentage);
    return revenucorrectionget
  } catch (ex) {
    return null;
  }  

}
export async function getrevenucorrectionById(RevenueCorrectionId) {
  try {
    return await http.get(apiEndpoint,RevenueCorrectionId);
  } catch (ex) {
    return toast.error("An Error Occured, while fetching revenucorrection data, Please try again later"+ex);
  }
}

export async function getrevenucorrectionByFiscalYearID(fiscalyearid) {
  try {
    const revenucorrectionget = await http.post(apiEndpointrevbyfiscalyear,{fiscalyearid});
    return revenucorrectionget
     
  } catch (ex) {
    return toast.error("An Error Occured, while fetching revenucorrection data, Please try again later"+ex);
  }
}
export async function getnarativedashboardrevenuecorrection(revenueproductid,startdate,enddate,fiscalyearid) {
  try {
    const revenucorrectionget = await http.post(apiEndpointnarativeD,{revenueproductid,startdate,enddate,fiscalyearid});
    return revenucorrectionget
     
  } catch (ex) {
    return toast.error("An Error Occured, while fetching revenucorrection data, Please try again later"+ex);
  }
}
export async function deleterevenucorrection(RevenueCorrectionId) {
  try {
     await http.delete(apiEndpoint, {
       data: { RevenueCorrectionId: RevenueCorrectionId },
     });
   } catch (ex) {
     return toast.error(
       "An Error Occured, while deleting RevenueCorrection Please try again later" +
         ex
     );
   }
}
export async function addrevenucorrection(RevenueCorrectionId ,RevenueProductId,RevenuePaymentId,loadData) {
  try {
      
        //loadData=JSON.stringify(loadData)
     await http.post(apiEndpoint,{ RevenueCorrectionId ,RevenueProductId,RevenuePaymentId,loadData});
     //toast.error("wow");
    
    
     
  } catch (ex) {
    return toast.error("An Error Occured, while uploading revenucorrection  Please try again later" + ex );
  }
}
 
   



 