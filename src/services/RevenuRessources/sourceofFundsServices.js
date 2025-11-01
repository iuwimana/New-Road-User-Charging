import http from "../httpService";
import  apiUrl  from "../../config.json";
import { toast } from "react-toastify";
const apiEndpoint = apiUrl.apiUrl + "/source/sources";
import { useNavigate } from 'react-router-dom';

const handleServiceUnavailable = () => {
  const navigate = useNavigate();
  navigate('../pages/Pages/Error503');  // Redirect to "Service Unavailable" page
};


export async function getSource() {
  try {
    const sourceget = await http.get(apiEndpoint);
    return sourceget
  } catch (ex) {
    if (ex.response && ex.response.status === 503) {
      handleServiceUnavailable(); // Redirect to the Service Unavailable page
    }
    return null;
  }

  

}

export async function getsourceById(SourceofFundId) {
  try {
    return await http.get(apiEndpoint,SourceofFundId);
  } catch (ex) {
    if (ex.response && ex.response.status === 503) {
      handleServiceUnavailable(); // Redirect to the Service Unavailable page
    }
    return toast.error("An Error Occured, while fetching SourceofFund data, Please try again later"+ex);
  }
}
export async function deleteSource(sourceoffundid) {
  try {
    await http.delete(apiEndpoint, { data: { sourceoffundid: sourceoffundid } });
  } catch (ex) {
    if (ex.response && ex.response.status === 503) {
      handleServiceUnavailable(); // Redirect to the Service Unavailable page
    }
    return toast.error(
      "An Error Occured, while deleting SourceofFund Please try again later" + ex
    );
}
}
export async function addsource(SourceofFundId,SourceofFundname,AccountNumber,BankId,RevenueTypeId,currencyid,StartDate,EndDate) {
  try {
    
  
     await http.post(apiEndpoint,{ SourceofFundId,SourceofFundname,AccountNumber,BankId,RevenueTypeId,currencyid,StartDate,EndDate});
    
  } catch (ex) {
    if (ex.response && ex.response.status === 503) {
      handleServiceUnavailable(); // Redirect to the Service Unavailable page
    }
    return toast.error("An Error Occured, while saving source of funds Please try again later" + ex );;
  }
}
 
   



 