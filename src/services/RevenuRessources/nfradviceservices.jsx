import http from "../httpService";
import  apiUrl  from "../../config.json";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
//import { useHistory } from 'react-router-dom';  
// Import useHistory for routing
const apiEndpoint = apiUrl.apiUrl + "/nfradvice/nfradvice";
const apiNewEndpoint=apiUrl.apiUrl + "/nfradvice/nfradvicenew";
const apiDisEndpoint=apiUrl.apiUrl + "/nfradvice/discripancy";
const apiEndpointtotal = apiUrl.apiUrl + "/revenucorrection/revenucorrectiontotal";
const apiEndpointproduct = apiUrl.apiUrl + "/revenucorrection/RevenueCorrectiontotalperrevenueproduct";
const apiEndpointpercentage = apiUrl.apiUrl + "/revenucorrection/RevenueCorrectionpercentage";
const apiEndpointrevbyfiscalyear = apiUrl.apiUrl+"/nfradvice/nfradvicebyfiscalyear";
const apiEndpointrevdipbyfiscalyear= apiUrl.apiUrl+"/nfradvice/nfradviceDiplicatebyfiscalyear";
const apiEndpointrevdipbyfiscalyearrecordnumber= apiUrl.apiUrl+"/nfradvice/nfradviceDiplicatebyfiscalyearrecordnumber";
const apiEndpointrevdipbyfiscalyeartotalpayment = apiUrl.apiUrl+"/nfradvice/nfradviceDiplicatebyfiscalyeartotalpayment";
const apiEndpoinsum = apiUrl.apiUrl+"/nfradvice/sumnfradvicebyfiscalyear";
const apiEndpointrevdipbyfiscalyearrecordnumberall= apiUrl.apiUrl+"/nfradvice/nfradviceDiplicatebyfiscalyearrecordnumberall";
const apiEndpointrevdipbyfiscalyeartotalpaymentall = apiUrl.apiUrl+"/nfradvice/nfradviceDiplicatebyfiscalyeartotalpaymentall";
const apiEndpointnarativeD = apiUrl.apiUrl+"/revenucorrection/narativedashboardrevenuecorrection";
const apiEndpointduplicateDetail = apiUrl.apiUrl+"/nfradvice/nfradvicediplicatebyfiscalyeardetail";
const apiExportExcel = apiUrl.apiUrl+"/nfradvice/nfrnadvice/export/excel";
const apiExportPDF  = apiUrl.apiUrl+"/nfradvice/nfrnadvice/export/pdf";
const apiExportPDFbydate  = apiUrl.apiUrl+"/nfradvice/nfrnadvicebydate/export/pdf";
const apiExportExcelbydate = apiUrl.apiUrl+"/nfradvice/nfrnadvicebydate/export/excel";

const handleServiceUnavailable = () => {
  const navigate = useNavigate();
  navigate('../pages/Pages/Error503');  // Redirect to "Service Unavailable" page
};


export async function getnfradvices() {
  try {
    const getnfradvice = await http.get(apiEndpoint);
    return getnfradvice
  } catch (ex) {
    if (ex.response && ex.response.status === 503) {
      handleServiceUnavailable(); // Redirect to the Service Unavailable page
    }
    return null;
  }

  

}

//apiExportPDF 
export async function getExportPDF(duplicate_number) {
  try {
      const response = await http.post(
        apiExportPDF,
        { duplicate_number },
        { responseType: 'blob' } // Important for binary responses
      );
      
      // Create download link
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `NFRAdviceDetails_${duplicate_number}.pdf`);
      document.body.appendChild(link);
      link.click();
      
      // Clean up
      setTimeout(() => {
        window.URL.revokeObjectURL(url);
        link.remove();
      }, 100);
      
      return true;
    } catch (ex) {
      toast.error(`PDF Export Failed: ${ex.message}`);
      console.error('PDF export error:', ex);
      return false;
    }
}
export async function getExportPDFbydate(fiscalyearid, startdate, enddate) {
  try {
      const response = await http.post(
        apiExportPDFbydate,
        { fiscalyearid, startdate, enddate },
        { responseType: 'blob' } // Important for binary responses
      );
      
      // Create download link
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `NFRAdviceDetails_${fiscalyearid}.pdf`);
      document.body.appendChild(link);
      link.click();
      
      // Clean up
      setTimeout(() => {
        window.URL.revokeObjectURL(url);
        link.remove();
      }, 100);
      
      return true;
    } catch (ex) {
      toast.error(`PDF Export Failed: ${ex.message}`);
      console.error('PDF export error:', ex);
      return false;
    }
}
export async function getExportExcelbydate(fiscalyearid, startdate, enddate) {
  try {
      const response = await http.post(
        apiExportExcelbydate,
        { fiscalyearid, startdate, enddate },
        { responseType: 'blob' }
      );
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `NFRAdviceDetails_${fiscalyearid}.xlsx`);
      document.body.appendChild(link);
      link.click();
      
      setTimeout(() => {
        window.URL.revokeObjectURL(url);
        link.remove();
      }, 100);
      
      return true;
    } catch (ex) {
      toast.error(`Excel Export Failed: ${ex.message}`);
      console.error('Excel export error:', ex);
      return false;
    }
}
export async function getExportExcel(duplicate_number) {
  try {
      const response = await http.post(
        apiExportExcel,
        { duplicate_number },
        { responseType: 'blob' }
      );
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `NFRAdviceDetails_${duplicate_number}.xlsx`);
      document.body.appendChild(link);
      link.click();
      
      setTimeout(() => {
        window.URL.revokeObjectURL(url);
        link.remove();
      }, 100);
      
      return true;
    } catch (ex) {
      toast.error(`Excel Export Failed: ${ex.message}`);
      console.error('Excel export error:', ex);
      return false;
    }
}

export async function getnfradvicebyfiscalyear(fiscalyearid) {
  try {
    const nfradvicebyfiscalyearget = await http.post(apiEndpointrevbyfiscalyear,{fiscalyearid});
    return nfradvicebyfiscalyearget
     
  } catch (ex) {
    if (ex.response && ex.response.status === 503) {
      handleServiceUnavailable(history); // Redirect to the Service Unavailable page
    }
    return toast.error("An Error Occured, while fetching NFR ADVICE data, Please try again later"+ex);
  }
}

export async function creatediscripancy() {
  try {
    const nfradvicebyfiscalyearget = await http.post(apiDisEndpoint);
    return nfradvicebyfiscalyearget
     
  } catch (ex) {
    if (ex.response && ex.response.status === 503) {
      handleServiceUnavailable(history); // Redirect to the Service Unavailable page
    }
    return toast.error("An Error Occured, while fetching NFR ADVICE data, Please try again later"+ex);
  }
}

//
export async function getnfradvicediplicatebyfiscalyear(fiscalyearid) {
  try {
    const nfradvicebyfiscalyearget = await http.post(apiEndpointrevdipbyfiscalyear,{fiscalyearid});
    return nfradvicebyfiscalyearget
     
  } catch (ex) {
    if (ex.response && ex.response.status === 503) {
      handleServiceUnavailable(history); // Redirect to the Service Unavailable page
    }
    return toast.error("An Error Occured, while fetching NFR ADVICE data, Please try again later"+ex);
  }
}
export async function getnfradvicediplicatebyfiscalyearrecordnumber(fiscalyearid) {
  try {
    const nfradvicebyfiscalyearget = await http.post(apiEndpointrevdipbyfiscalyearrecordnumber,{fiscalyearid});
    return nfradvicebyfiscalyearget
     
  } catch (ex) {
    if (ex.response && ex.response.status === 503) {
      handleServiceUnavailable(history); // Redirect to the Service Unavailable page
    }
    return toast.error("An Error Occured, while fetching NFR ADVICE data, Please try again later"+ex);
  }
}
export async function getnfradvicediplicatebyfiscalyeartotalpayment(fiscalyearid) {
  try {
    const nfradvicebyfiscalyearget = await http.post(apiEndpointrevdipbyfiscalyeartotalpayment,{fiscalyearid});
    return nfradvicebyfiscalyearget
     
  } catch (ex) {
    if (ex.response && ex.response.status === 503) {
      handleServiceUnavailable(history); // Redirect to the Service Unavailable page
    }
    return toast.error("An Error Occured, while fetching NFR ADVICE data, Please try again later"+ex);
  }
}
export async function getsumnfradvice(fiscalyearid) {
  try {
    const Sumnfradvicebyfiscalyearget = await http.post(apiEndpoinsum,{fiscalyearid});
    return Sumnfradvicebyfiscalyearget
     
  } catch (ex) {
    if (ex.response && ex.response.status === 503) {
      handleServiceUnavailable(history); // Redirect to the Service Unavailable page
    }
    return toast.error("An Error Occured, while fetching NFR ADVICE data, Please try again later"+ex);
  }
}


export async function getnfradvicediplicatebyfiscalyeardetails(duplicate_number) {
  try {
    const duplicateDetail = await http.post(apiEndpointduplicateDetail,{duplicate_number});
    return duplicateDetail
     
  } catch (ex) {
    if (ex.response && ex.response.status === 503) {
      handleServiceUnavailable(history); // Redirect to the Service Unavailable page
    }
    return toast.error("An Error Occured, while fetching NFR ADVICE data, Please try again later"+ex);
  }
}
export async function getnfradvicediplicatebyfiscalyearrecordnumberall(fiscalyearid) {
  try {
    const nfradvicebyfiscalyearget = await http.post(apiEndpointrevdipbyfiscalyearrecordnumberall,{fiscalyearid});
    return nfradvicebyfiscalyearget
     
  } catch (ex) {
    if (ex.response && ex.response.status === 503) {
      handleServiceUnavailable(history); // Redirect to the Service Unavailable page
    }
    return toast.error("An Error Occured, while fetching NFR ADVICE data, Please try again later"+ex);
  }
}
export async function getnfradvicediplicatebyfiscalyeartotalpaymentall(fiscalyearid) {
  try {
    const nfradvicebyfiscalyearget = await http.post(apiEndpointrevdipbyfiscalyeartotalpaymentall,{fiscalyearid});
    return nfradvicebyfiscalyearget
     
  } catch (ex) {
    if (ex.response && ex.response.status === 503) {
      handleServiceUnavailable(history); // Redirect to the Service Unavailable page
    }
    return toast.error("An Error Occured, while fetching NFR ADVICE data, Please try again later"+ex);
  }
}

export async function deletenfradvice(nfradviceid) {
  try {
     await http.delete(apiEndpoint, {
       data: { nfradviceid: nfradviceid },
     });
   } catch (ex) {
    if (ex.response && ex.response.status === 503) {
      handleServiceUnavailable(); // Redirect to the Service Unavailable page
    }
     return toast.error(
       "An Error Occured, while deleting NFR ADVICE Please try again later" +
         ex
     );
   }
}
export async function addrevenucorrection(nfradviceid, RevenueProductId, RevenuePaymentId, loadData, currencyid) {
  try {
      
        //loadData=JSON.stringify(loadData)
     await http.post(apiEndpoint,{ nfradviceid, RevenueProductId, RevenuePaymentId, loadData, currencyid});
     //toast.error("wow");
   
     
  } catch (ex) {
    if (ex.response && ex.response.status === 503) {
      handleServiceUnavailable(); // Redirect to the Service Unavailable page
    }
    return toast.error("An Error Occured, while uploading revenucorrection  Please try again later" + ex );
  }
}

export async function addNewrevenucorrection(nfradviceid,
  RevenueProductId,
  RevenuePaymentId,
  Advice,
  Name,
  TaxCenter,
  PaymentDate,
  Amount,
  currencyid) {
  try {
      
        //loadData=JSON.stringify(loadData)
     await http.post(apiNewEndpoint,{ nfradviceid,
      RevenueProductId,
      RevenuePaymentId,
      Advice,
      Name,
      TaxCenter,
      PaymentDate,
      Amount,
      currencyid});
     //toast.error("wow");
    
    
     
  } catch (ex) {
    if (ex.response && ex.response.status === 503) {
      handleServiceUnavailable(); // Redirect to the Service Unavailable page
    }
    return toast.error("An Error Occured, while Add new advice Please try again later" + ex );
  }
}
 
   



 