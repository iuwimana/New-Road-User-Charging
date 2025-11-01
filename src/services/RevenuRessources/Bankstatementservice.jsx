import http from "../httpService";
import  apiUrl  from "../../config.json";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
//import { useHistory } from 'react-router-dom';  
// Import useHistory for routing
const apiEndpoint = apiUrl.apiUrl + "/bankstatement/bankstatement";
const apiEndpointf = apiUrl.apiUrl + "/bankstatement/bankstatementbyfiscalyear";
const apiarchivebankstatement = apiUrl.apiUrl + "/bankstatement/archivebankstatementbyadvice";
const apiEndpointDis = apiUrl.apiUrl + "/bankstatement/discrepancy";
const apiEndpointDiscrepancy = apiUrl.apiUrl + "/bankstatement/Discrepancy";
const apiEndpointDiscrepancyAmount = apiUrl.apiUrl + "/bankstatement/Discrepancysum";
const apiEndpointDiscrepancydetail = apiUrl.apiUrl + "/bankstatement/DiscrepancyDetail";
const apiEndpointdip = apiUrl.apiUrl + "/bankstatement/bankstatementdiplicationbyfiscalyear";
const apiEndpointbanknotinnfr = apiUrl.apiUrl + "/bankstatement/nfrnotinbankstatementbyfiscalyear";
const apiEndpointnfrnotinbank = apiUrl.apiUrl + "/bankstatement/bankstatementnotinnfrbyfiscalyear";
const apiEndpointdownloadexcel= apiUrl.apiUrl + "/bankstatement/bankstatementdiplicate/export/excel";
const apiEndpointdownloadpdf= apiUrl.apiUrl + "/bankstatement/bankstatementdiplicate/export/pdf";
const apiEndpointdownloadexcelnfrnotinbank= apiUrl.apiUrl + "/bankstatement/nfrnotinbankstatementbyfiscalyear/export/excel";
const apiEndpointdownloadpdfnfrnotinbank= apiUrl.apiUrl + "/bankstatement/nfrnotinbankstatementbyfiscalyear/export/pdf";

const apiEndpointdownloadexceldiscrepanct= apiUrl.apiUrl + "/bankstatement/discrepancyDetailexcel";
const apiEndpointdownloadpdfdiscrepanct= apiUrl.apiUrl + "/bankstatement/DiscrepancyDetailpdf";
//--------------------
const apiEndpointdiplicationnumber= apiUrl.apiUrl + "/bankstatement/bankstatementdiplicationbyfiscalyearnumberofrecord";
const apiEndpointdiplicationamount= apiUrl.apiUrl + "/bankstatement/bankstatementdiplicationbyfiscalyeartotalamount";

const apiEndpointdeclarationnumber= apiUrl.apiUrl + "/bankstatement/nfrnotinbankstatementbyfiscalyearnumberofrecord";
const apiEndpointdeclarationaount = apiUrl.apiUrl + "/bankstatement/nfrnotinbankstatementbyfiscalyeartotalamount";

const apiEndpointpaymentnumber = apiUrl.apiUrl + "/bankstatement/bankstatementnotinnfrbyfiscalyearnumberofrecord";
const apiEndpointpaymentamount = apiUrl.apiUrl + "/bankstatement/bankstatementnotinnfrbyfiscalyeartotalamount";
const apiNewEndpoint=apiUrl.apiUrl + "/bankstatement/bankstatementnew";
const apiEndpoinsum=apiUrl.apiUrl + "/bankstatement/sumbankstatementbyfiscalyear";

const apiEndpoinrollback=apiUrl.apiUrl + "/bankstatement/rollbackbankstatement";
const apiEndpoinupdatenfr=apiUrl.apiUrl + "/bankstatement/updatenfradvice";
const apiEndpoinupdatebankstatement=apiUrl.apiUrl + "/bankstatement/updatebankstatement";


const apisendbankstatement=apiUrl.apiUrl + "/bankstatement/sendbankstatement";

const apiDepositVariance=apiUrl.apiUrl + "/bankstatement/depositvariancebyfiscalyear";
const apiDepositOverage=apiUrl.apiUrl + "/bankstatement/depositoveragebyfiscalyear";

const apiDepositOveragepdf=apiUrl.apiUrl + "/bankstatement/depositoveragebyfiscalyear/export/pdf";
const apiDepositOverageexcel=apiUrl.apiUrl + "/bankstatement/depositoveragebyfiscalyear/export/excel";
const apiDepositvariancepdf=apiUrl.apiUrl + "/bankstatement/depositvariancebyfiscalyear/export/pdf";
const apiDepositvarianceexcel=apiUrl.apiUrl + "/bankstatement/depositvariancebyfiscalyear/export/excel";

const apiDepositOveragesummary=apiUrl.apiUrl + "/bankstatement/summarydepositoveragebyfiscalyear";
const apiDepositvariancesummary=apiUrl.apiUrl + "/bankstatement/summarydepositvariancebyfiscalyear";

export async function getbankstatements() {
  try {
    const getbankstatement = await http.get(apiEndpoint);
    return getbankstatement
  } catch (ex) {
    
    return null;
  }

  

}
//----------------------------------------------------
export async function getDepositVariancebyfiscalyear(fiscalyearid) {
  try {
    const bankstatementbyfiscalyearget = await http.post(apiDepositVariance,{fiscalyearid});
    return bankstatementbyfiscalyearget
     
  } catch (ex) {
    
    return toast.error("An Error Occured, while fetching NFR ADVICE data, Please try again later"+ex);
  }
}

export async function getDepositOveragebyfiscalyear(fiscalyearid) {
  try {
    const bankstatementbyfiscalyearget = await http.post(apiDepositOverage,{fiscalyearid});
    return bankstatementbyfiscalyearget
     
  } catch (ex) {
    
    return toast.error("An Error Occured, while fetching NFR ADVICE data, Please try again later"+ex);
  }
}

export async function getsummarydepositoveragebyfiscalyear(fiscalyearid) {
  try {
    const bankstatementbyfiscalyearget = await http.post(apiDepositOveragesummary,{fiscalyearid});
    return bankstatementbyfiscalyearget
     
  } catch (ex) {
    
    return toast.error("An Error Occured, while fetching NFR ADVICE data, Please try again later"+ex);
  }
}
export async function getsummarydepositvariancebyfiscalyear(fiscalyearid) {
  try {
    const bankstatementbyfiscalyearget = await http.post(apiDepositvariancesummary,{fiscalyearid});
    return bankstatementbyfiscalyearget
     
  } catch (ex) {
    
    return toast.error("An Error Occured, while fetching NFR ADVICE data, Please try again later"+ex);
  }
}

//--------------------------------------------------------
export async function getsumbankstatement(fiscalyearid) {
  try {
    const Sumbankstatement = await http.post(apiEndpoinsum,{fiscalyearid});
    return Sumbankstatement
     
  } catch (ex) {
    if (ex.response && ex.response.status === 503) {
      handleServiceUnavailable(history); // Redirect to the Service Unavailable page
    }
    return toast.error("An Error Occured, while fetching bankstatement data, Please try again later"+ex);
  }
}

export async function getbankstatementbyfiscalyear(fiscalyearid) {
  try {
    const bankstatementbyfiscalyearget = await http.post(apiEndpointf,{fiscalyearid});
    return bankstatementbyfiscalyearget
     
  } catch (ex) {
    
    return toast.error("An Error Occured, while fetching NFR ADVICE data, Please try again later"+ex);
  }
}
export async function getarchivebankstatementbyadvice(advice) {
  try {
    const bankstatementbyfiscalyearget = await http.post(apiarchivebankstatement,{advice});
    return bankstatementbyfiscalyearget
     
  } catch (ex) {
    
    return toast.error("An Error Occured, while fetching archive payment receipt data, Please try again later"+ex);
  }
}
//apiarchivebankstatement

export async function creatediscrepancy() {
  try {
    const bankstatement = await http.post(apiEndpointDis);
    return bankstatement
     
  } catch (ex) {
    
    return toast.error("An Error Occured, creatediscrepancy, Please try again later"+ex);
  }
}

//
export async function getDiscrepancy(){
  
  try {
    const bankstatementbyfiscalyearget = await http.get(apiEndpointDiscrepancy);
    return bankstatementbyfiscalyearget
     
  } catch (ex) {
    
    return toast.error("An Error Occured, while fetching NFR ADVICE data, Please try again later"+ex);
  }
  
}
//apiEndpointDiscrepancyAmount

export async function getDiscrepancysum(){
  
  try {
    const bankstatementbyfiscalyearget = await http.get(apiEndpointDiscrepancyAmount);
    return bankstatementbyfiscalyearget
     
  } catch (ex) {
    
    return toast.error("An Error Occured, while fetching NFR ADVICE data, Please try again later"+ex);
  }
  
}

export async function getDiscrepancydetail(duplicate_group_id){
  //duplicateGroupId
  try {
    const bankstatementbyfiscalyearget = await http.post(apiEndpointDiscrepancydetail,{duplicate_group_id});
    return bankstatementbyfiscalyearget
     
  } catch (ex) {
    
    return toast.error("An Error Occured, while fetching NFR ADVICE data, Please try again later"+ex);
  }
  
}
{/**------------------------------------------------------------------------------------ */}

export async function getbankstatementdiplicationbyfiscalyear(fiscalyearid) {
  try {
    const bankstatementbyfiscalyearget = await http.post(apiEndpointdip,{fiscalyearid});
    return bankstatementbyfiscalyearget
     
  } catch (ex) {
    
    return toast.error("An Error Occured, while fetching NFR ADVICE data, Please try again later"+ex);
  }
}

export async function getnfrnotinbankstatementbyfiscalyear(fiscalyearid) {
  try {
    const bankstatementbyfiscalyearget = await http.post(apiEndpointbanknotinnfr ,{fiscalyearid});
    return bankstatementbyfiscalyearget
     
  } catch (ex) {
    
    return toast.error("An Error Occured, while fetching NFR ADVICE data, Please try again later"+ex);
  }
}

export async function getbankstatementnotinnfrbyfiscalyear(fiscalyearid) {
  try {
    const bankstatementbyfiscalyearget = await http.post(apiEndpointnfrnotinbank,{fiscalyearid});
    return bankstatementbyfiscalyearget
     
  } catch (ex) {
    
    return toast.error("An Error Occured, while fetching NFR ADVICE data, Please try again later"+ex);
  }
}

{/**------------------------------------------------------------------------------------ */}

export async function getpaymentamount (fiscalyearid) {
  try {
    const nfradvicebyfiscalyearget = await http.post(apiEndpointpaymentamount,{fiscalyearid});
    return nfradvicebyfiscalyearget
     
  } catch (ex) {
    if (ex.response && ex.response.status === 503) {
      handleServiceUnavailable(history); // Redirect to the Service Unavailable page
    }
    return toast.error("An Error Occured, while fetching NFR ADVICE data, Please try again later"+ex);
  }
}


export async function getpaymentnumber(fiscalyearid) {
  try {
    const nfradvicebyfiscalyearget = await http.post(apiEndpointpaymentnumber,{fiscalyearid});
    return nfradvicebyfiscalyearget
     
  } catch (ex) {
    if (ex.response && ex.response.status === 503) {
      handleServiceUnavailable(history); // Redirect to the Service Unavailable page
    }
    return toast.error("An Error Occured, while fetching NFR ADVICE data, Please try again later"+ex);
  }
}
{/**------------------------------------------------------------------------------------ */}
//apisendbankstatement
export async function sendbankstatement(fiscalyearid) {
  try {
    const nfradvicebyfiscalyearget = await http.post(apisendbankstatement,{fiscalyearid});
    return nfradvicebyfiscalyearget
     
  } catch (ex) {
    if (ex.response && ex.response.status === 503) {
      handleServiceUnavailable(history); // Redirect to the Service Unavailable page
    }
    return toast.error("An Error Occured, while fetching NFR ADVICE data, Please try again later"+ex);
  }
}
{/**------------------------------------------------------------------------------------ */}
//apisendbankstatement
export async function rollbackbankstatement(revenuecorrectionsummaryid) {
  try {
    const nfradvicebyfiscalyearget = await http.post(apiEndpoinrollback,{revenuecorrectionsummaryid});
    return nfradvicebyfiscalyearget
     
  } catch (ex) {
    if (ex.response && ex.response.status === 503) {
      handleServiceUnavailable(history); // Redirect to the Service Unavailable page
    }
    return toast.error("An Error Occured, while rolling back revenue collected, Please try again later", ex);
  }
}
{/**------------------------------------------------------------------------------------ */}
//apisendbankstatement
export async function updatebankstatement(statuses,advice) {
  try {
    const nfradvicebyfiscalyearget = await http.post(apiEndpoinupdatebankstatement,{statuses,advice});
    return nfradvicebyfiscalyearget
     
  } catch (ex) {
    if (ex.response && ex.response.status === 503) {
      handleServiceUnavailable(history); // Redirect to the Service Unavailable page
    }
    return toast.error("An Error Occured, while updating Bank statement, Please try again later",ex);
  }
}

{/**------------------------------------------------------------------------------------ */}
//apisendbankstatement
export async function updatenfradvice(statuses,advice) {
  try {
    const nfradvicebyfiscalyearget = await http.post(apiEndpoinupdatenfr,{statuses,advice});
    return nfradvicebyfiscalyearget
     
  } catch (ex) {
    if (ex.response && ex.response.status === 503) {
      handleServiceUnavailable(history); // Redirect to the Service Unavailable page
    }
    return toast.error("An Error Occured, while updating  NFR ADVICE data, Please try again later", ex);
  }
}

{/**------------------------------------------------------------------------------------ */}


export async function getdeclarationaount(fiscalyearid) {
  try {
    const nfradvicebyfiscalyearget = await http.post(apiEndpointdeclarationaount,{fiscalyearid});
    return nfradvicebyfiscalyearget
     
  } catch (ex) {
    if (ex.response && ex.response.status === 503) {
      handleServiceUnavailable(history); // Redirect to the Service Unavailable page
    }
    return toast.error("An Error Occured, while fetching NFR ADVICE data, Please try again later"+ex);
  }
}


export async function getdeclarationnumber(fiscalyearid) {
  try {
    const nfradvicebyfiscalyearget = await http.post(apiEndpointdeclarationnumber,{fiscalyearid});
    return nfradvicebyfiscalyearget
     
  } catch (ex) {
    if (ex.response && ex.response.status === 503) {
      handleServiceUnavailable(history); // Redirect to the Service Unavailable page
    }
    return toast.error("An Error Occured, while fetching NFR ADVICE data, Please try again later"+ex);
  }
}
{/**------------------------------------------------------------------------------------ */}
{/**------------------------------------------------------------------------------------ */}

export async function getdiplicationamount(fiscalyearid) {
  try {
    const nfradvicebyfiscalyearget = await http.post(apiEndpointdiplicationamount,{fiscalyearid});
    return nfradvicebyfiscalyearget
     
  } catch (ex) {
    if (ex.response && ex.response.status === 503) {
      handleServiceUnavailable(history); // Redirect to the Service Unavailable page
    }
    return toast.error("An Error Occured, while fetching NFR ADVICE data, Please try again later"+ex);
  }
}
    
export async function getdiplicationnumber(fiscalyearid) {
  try {
    const nfradvicebyfiscalyearget = await http.post(apiEndpointdiplicationnumber,{fiscalyearid});
    return nfradvicebyfiscalyearget
     
  } catch (ex) {
    if (ex.response && ex.response.status === 503) {
      handleServiceUnavailable(history); // Redirect to the Service Unavailable page
    }
    return toast.error("An Error Occured, while fetching NFR ADVICE data, Please try again later"+ex);
  }
}
{/**------------------------------------------------------------------------------------ */}
{/**------------------------------------------------------------------------------------ */}
 
export async function deletebankstatement(bankstatementid ) {
  try {
     await http.delete(apiEndpoint, {
       data: { bankstatementid: bankstatementid },
     });
   } catch (ex) {
    
     return toast.error(
       "An Error Occured, while deleting bankstatement Please try again later" +
         ex
     );
   }
}



//-----------------------------pdf and excel diplication
// Add these new export functions to your existing service file
export async function exportToPDF(fiscalyearid) {
  try {
    const response = await http.post(
       apiEndpointdownloadpdf,
      { fiscalyearid },
      { responseType: 'blob' } // Important for binary responses
    );
    
    // Create download link
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `bank_statements_${fiscalyearid}.pdf`);
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

export async function exportToExcel(fiscalyearid) {
  try {
    const response = await http.post(
      apiEndpointdownloadexcel,
      { fiscalyearid },
      { responseType: 'blob' }
    );
    
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `bank_statements_${fiscalyearid}.xlsx`);
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
//------------------------------report excel and pdf for depositoverage
//----------------------------------pdf
export async function exportDepositOverageToPDF(fiscalyearid) {
  try {
    const response = await http.post(
       apiDepositOveragepdf,
      { fiscalyearid },
      { responseType: 'blob' } // Important for binary responses
    );
    
    // Create download link
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `depositoverage_FY${fiscalyearid}.pdf`);
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
//----------------------------------Excel
export async function exportDepositOverageToExcel(fiscalyearid) {
  try {
    const response = await http.post(
      apiDepositOverageexcel,
      { fiscalyearid },
      { responseType: 'blob' }
    );
    
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `depositoverage_FY${fiscalyearid}.xlsx`);
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

//------------------------------report excel and pdf for depositoverage
//----------------------------------pdf
export async function exportDepositvarianceToPDF(fiscalyearid) {
  try {
    const response = await http.post(
       apiDepositvariancepdf,
      { fiscalyearid },
      { responseType: 'blob' } // Important for binary responses
    );
    
    // Create download link
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `bank_depositvariance_${fiscalyearid}.pdf`);
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
//----------------------------------Excel
export async function exportDepositvarianceToExcel(fiscalyearid) {
  try {
    const response = await http.post(
      apiDepositvarianceexcel,
      { fiscalyearid },
      { responseType: 'blob' }
    );
    
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `bank_depositvariance_$${fiscalyearid}.xlsx`);
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


//-----------------------------pdf and excel NFR Advice not in Bank Statement
// Add these new export functions to your existing service file
export async function exportnfrnotinbankToPDF(fiscalyearid) {
  try {
    const response = await http.post(
      apiEndpointdownloadpdfnfrnotinbank,
      { fiscalyearid },
      { responseType: 'blob' } // Important for binary responses
    );
    
    // Create download link
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `bank_statements_${fiscalyearid}.pdf`);
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
    //console.error('PDF export error:', ex);
    return false;
  }
}

export async function exportnfrnotinbankToExcel(fiscalyearid) {
  try {
    const response = await http.post(
      apiEndpointdownloadexcelnfrnotinbank,
      { fiscalyearid },
      { responseType: 'blob' }
    );
    
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `bank_statements_${fiscalyearid}.xlsx`);
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
 //------------------------------------------------------------

 //-----------------------------pdf and excel NFR Advice not in Discrepancy
// Add these new export functions to your existing service file
export async function exportdiscrepancyToPDF() {
  try {
    const response = await http.get(
      apiEndpointdownloadpdfdiscrepanct,
      { responseType: 'blob' } // Important for binary responses
    );
    
    // Create download link
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `bank_statementDiscrepancys_1.pdf`);
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
    //console.error('PDF export error:', ex);
    return false;
  }
}

export async function exportdiscrepancyToExcel() {
  try {
    const response = await http.get(
      apiEndpointdownloadexceldiscrepanct,
      { responseType: 'blob' }
    );
    
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `bank_statementDiscrepancys_1.xlsx`);
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
 //------------------------------------------------------------

export async function addbankstatement( bankstatementid, RevenueProductId, RevenuePaymentId,loadData,currencyid) {
  try {
      
        //loadData=JSON.stringify(loadData)
     await http.post(apiEndpoint,{ bankstatementid, RevenueProductId, RevenuePaymentId,loadData, currencyid});
     //toast.error("wow");
    
    
     
  } catch (ex) {
   
    return toast.error("An Error Occured, while uploading revenucorrection  Please try again later" + ex );
  }
}

export async function addNewbankstatement(
  bankstatementid,
  RevenueProductId,
  RevenuePaymentId,
  Advice,
  Name,
  refnumber,
  TaxCenter,
  PaymentDate,
  Amount,
  currencyid) {
  try {
      
        //loadData=JSON.stringify(loadData)
     await http.post(apiNewEndpoint,{ 
      bankstatementid,
      RevenueProductId,
      RevenuePaymentId,
      Advice,
      Name,
      refnumber,
      TaxCenter,
      PaymentDate,
      Amount,
      currencyid,});
     //toast.error("wow");
    
    
     
  } catch (ex) {
    if (ex.response && ex.response.status === 503) {
      handleServiceUnavailable(); // Redirect to the Service Unavailable page
    }
    return toast.error("An Error Occured, while Add new bank statements Please try again later" + ex );
  }
}
 
   



 