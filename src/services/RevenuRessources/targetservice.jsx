import http from "../httpService";
import apiUrl from "../../config.json";
import { toast } from "react-toastify";
const apiEndpoint = apiUrl.apiUrl + "/annualtarget/annualtarget";
const apiEndpoints = apiUrl.apiUrl + "/annualtarget/annualtargetfiscalyear";
const apiEndpointsum=apiUrl.apiUrl + "/annualtarget//annualtargetfiscalyearsum";
import { useNavigate } from 'react-router-dom';

const handleServiceUnavailable = () => {
  const navigate = useNavigate();
  navigate('../pages/Pages/Error503');  // Redirect to "Service Unavailable" page
};

export async function getannualtargets() {
  try {
    const annualtargetget = await http.get(apiEndpoint);
    return annualtargetget;
  } catch (ex) {
    if (ex.response && ex.response.status === 503) {
      handleServiceUnavailable(); // Redirect to the Service Unavailable page
    }
    return null;
  }
}


export async function getannualtargetById(annualtargetId) {
  try {
    return await http.get(apiEndpoint, annualtargetId);
  } catch (ex) {
    if (ex.response && ex.response.status === 503) {
      handleServiceUnavailable(); // Redirect to the Service Unavailable page
    }
    return toast.error(
      "An Error Occured, while fetching annualtarget data, Please try again later" +
        ex
    );
  }
}


    export async function deleteannualtarget(annualtargetid) {
      try {
         await http.delete(apiEndpoint, {
           data: { annualtargetid: annualtargetid },
         });
       } catch (ex) {
        if (ex.response && ex.response.status === 503) {
          handleServiceUnavailable(); // Redirect to the Service Unavailable page
        }
         return toast.error(
           "An Error Occured, while deleting annualtarget Please try again later" +
             ex
         );
       }
    }
  
export async function addannualtarget(
    AnnualTargetid,
    fiscalyearid,
    AnnualTargetdiscription,
    AmountTargeted,
    revenueproductid
) {
  try {
    await http.post(apiEndpoint, {
        AnnualTargetid,
        fiscalyearid,
        AnnualTargetdiscription,
        AmountTargeted,
        revenueproductid
    });
    
  } catch (ex) {
    if (ex.response && ex.response.status === 503) {
      handleServiceUnavailable(); // Redirect to the Service Unavailable page
    }
    return toast.error(
      "An Error Occured, while saving AnnualTarget of funds Please try again later" +
        ex
    );
  }
}

export async function getannualtargetByFiscalyear( fiscalyearid) {
  try {
     const annualtarget = await http.post(apiEndpoints, {
       fiscalyearid
     });
     return annualtarget;
  } catch (ex) {
    if (ex.response && ex.response.status === 503) {
      handleServiceUnavailable(); // Redirect to the Service Unavailable page
    }
    return toast.error(
      "An Error Occured, while fetching annualtarget by fiscal year of funds Please try again later" +
        ex
    );
  }
}
//apiEndpointsum

export async function getannualtargetByFiscalyears( fiscalyearid) {
  try {
     const annualtarget = await http.post(apiEndpointsum, {
       fiscalyearid
     });
     return annualtarget;
  } catch (ex) {
    if (ex.response && ex.response.status === 503) {
      handleServiceUnavailable(); // Redirect to the Service Unavailable page
    }
    return toast.error(
      "An Error Occured, while fetching annualtarget by fiscal year of funds Please try again later" +
        ex
    );
  }
}
