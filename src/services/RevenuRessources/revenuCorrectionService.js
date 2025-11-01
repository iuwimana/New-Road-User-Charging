import http from "../httpService";
import  apiUrl  from "../../config.json";
import { toast } from "react-toastify";
const apiEndpoint = apiUrl.apiUrl + "/revenucorrection/revenucorrection";
const apiEndpointtotal = apiUrl.apiUrl + "/revenucorrection/revenucorrectiontotal";
const apiEndpointproduct = apiUrl.apiUrl + "/revenucorrection/RevenueCorrectiontotalperrevenueproduct";
const apiEndpointpercentage = apiUrl.apiUrl + "/revenucorrection/RevenueCorrectionpercentage";
const apiEndpointrevbyfiscalyear = apiUrl.apiUrl+"/revenucorrection/revenucorrectionbyfiscalyear";
const apiEndpointrevDipbyfiscalyear= apiUrl.apiUrl+"/nfradvice/nfradviceDiplicatebyfiscalyear";
const apiEndpointnarativeD = apiUrl.apiUrl+"/revenucorrection/narativedashboardrevenuecorrection";
const apiEndpointsummary = apiUrl.apiUrl+"/revenucorrection/revenusummarybyfiscalyear";
const apiEndpointdetails = apiUrl.apiUrl+"/revenucorrection/revenusummarydetails";
import { useNavigate } from 'react-router-dom';

const handleServiceUnavailable = () => {
  const navigate = useNavigate();
  navigate('../pages/Pages/Error503');  // Redirect to "Service Unavailable" page
};

export async function getrevenucorrections() {
  try {
    const revenucorrectionget = await http.get(apiEndpoint);
    return revenucorrectionget
  } catch (ex) {
    if (ex.response && ex.response.status === 503) {
      handleServiceUnavailable(); // Redirect to the Service Unavailable page
    }
    return null;
  }

  

}

export async function getrevenucorrectiontotal() {
  try {
    const revenucorrectionget = await http.get(apiEndpointtotal);
    return revenucorrectionget
  } catch (ex) {
    if (ex.response && ex.response.status === 503) {
      handleServiceUnavailable(); // Redirect to the Service Unavailable page
    }
    return null;
  }  

}

export async function getrevenucorrectionperproduct() {
  try {
    const revenucorrectionget = await http.get(apiEndpointproduct);
    return revenucorrectionget
  } catch (ex) {
    if (ex.response && ex.response.status === 503) {
      handleServiceUnavailable(); // Redirect to the Service Unavailable page
    }
    return null;
  }  

}

export async function getrevenucorrectionpercentage() {
  try {
    const revenucorrectionget = await http.get(apiEndpointpercentage);
    return revenucorrectionget
  } catch (ex) {
    if (ex.response && ex.response.status === 503) {
      handleServiceUnavailable(); // Redirect to the Service Unavailable page
    }
    return null;
  }  

}
export async function getrevenucorrectionById(RevenueCorrectionId) {
  try {
    return await http.get(apiEndpoint,RevenueCorrectionId);
  } catch (ex) {
    if (ex.response && ex.response.status === 503) {
      handleServiceUnavailable(); // Redirect to the Service Unavailable page
    }
    return toast.error("An Error Occured, while fetching revenucorrection ById data, Please try again later", ex);
  }
}

export async function getrevenucorrectionByFiscalYearID(fiscalyearid) {
  try {
    const revenucorrectionget = await http.post(apiEndpointrevbyfiscalyear,{fiscalyearid});
    return revenucorrectionget
     
  } catch (ex) {
    if (ex.response && ex.response.status === 503) {
      handleServiceUnavailable(); // Redirect to the Service Unavailable page
    }
    return toast.error("An Error Occured, while fetching revenucorrection By FiscalYearID data, Please try again later", ex);
  }
}
export async function getrevenucorrectionsummaryByFiscalYearID(fiscalyearid) {
  try {
    const revenucorrectionget = await http.post(apiEndpointsummary,{fiscalyearid});
    return revenucorrectionget
     
  } catch (ex) {
    if (ex.response && ex.response.status === 503) {
      handleServiceUnavailable(); // Redirect to the Service Unavailable page
    }
    return toast.error("An Error Occured, while fetching revenucorrection summary data, Please try again later", ex);
  }
}
//

export async function getrevenucorrectionDiplicateByFiscalYearID(fiscalyearid) {
  try {
    const revenucorrectionget = await http.post(apiEndpointrevDipbyfiscalyear,{fiscalyearid});
    return revenucorrectionget
     
  } catch (ex) {
    if (ex.response && ex.response.status === 503) {
      handleServiceUnavailable(); // Redirect to the Service Unavailable page
    }
    return toast.error("An Error Occured, while fetching duplication revenucorrection DiplicateByFiscalYearID data, Please try again later",ex);
  }
}
export async function getrevenucorrectionDetails(revenuecorrectionsummaryid) {
  try {
    const response = await http.post(apiEndpointdetails, { revenuecorrectionsummaryid });
    return response; // Make sure this returns the full response object
  } catch (ex) {
    if (ex.response && ex.response.status === 503) {
      handleServiceUnavailable();
    }
    toast.error("An Error Occurred while fetching revenue correction details: " + ex.message);
    throw ex; // Important: re-throw the error so the component can handle it
  }
}


//
export async function getnarativedashboardrevenuecorrection(revenueproductid,startdate,enddate,fiscalyearid) {
  try {
    const revenucorrectionget = await http.post(apiEndpointnarativeD,{revenueproductid,startdate,enddate,fiscalyearid});
    return revenucorrectionget
     
  } catch (ex) {
    if (ex.response && ex.response.status === 503) {
      handleServiceUnavailable(); // Redirect to the Service Unavailable page
    }
    return toast.error("An Error Occured, while fetching revenucorrection data, Please try again later");
  }
}
export async function deleterevenucorrection(RevenueCorrectionId) {
  try {
     await http.delete(apiEndpoint, {
       data: { RevenueCorrectionId: RevenueCorrectionId },
     });
   } catch (ex) {
    if (ex.response && ex.response.status === 503) {
      handleServiceUnavailable(); // Redirect to the Service Unavailable page
    }
     return toast.error(
       "An Error Occured, while deleting RevenueCorrection Please try again later" 
     );
   }
}
export async function addrevenucorrection(RevenueCorrectionId ,RevenueProductId,RevenuePaymentId,loadData) {
  try {
      
        //loadData=JSON.stringify(loadData)
     await http.post(apiEndpoint,{ RevenueCorrectionId ,RevenueProductId,RevenuePaymentId,loadData});
     //toast.error("wow");
    
    
     
  } catch (ex) {
    if (ex.response && ex.response.status === 503) {
      handleServiceUnavailable(); // Redirect to the Service Unavailable page
    }
    return toast.error("An Error Occured, while uploading revenucorrection  Please try again later"  );
  }
}
 
   



 