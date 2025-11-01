import http from "../httpService";
import  apiUrl  from "../../config.json";
import { toast } from "react-toastify";
const apiEndpoint = apiUrl.apiUrl + "/fiscalyear/fiscalyear";
const apiEndpoints = apiUrl.apiUrl + "/fiscalyear/fiscalyears";
import { useNavigate } from 'react-router-dom';

const handleServiceUnavailable = () => {
  navigate('/pages/error503');  // Redirect to "/service-unavailable" route
};
export async function getFiscalyears() {
  try {
    const Fiscalyear = await http.get(apiEndpoint);
    return Fiscalyear
  } catch (ex) {
    if (ex.response && (ex.response.status === 503 || ex.response.status === 204 || ex.response.status === 400 )) {
      handleServiceUnavailable(navigate); // Redirect to Service Unavailable page
    }
    return null;
  }

  

}
export async function getFiscalyearAll() {
  try {
    const Fiscalyear = await http.get(apiEndpoints);
    return Fiscalyear;
  } catch (ex) {
    return null;
  }
}




export async function deleteFiscalyear(FiscalYearId) {
  try {
      await http.delete(apiEndpoint,{ data: { FiscalYearId: FiscalYearId } });
    
  } catch (ex) {
    return toast.error("An Error Occured, while deleting Fiscalyear Please try again later"+ex);
  }
}
export async function addFiscalyear(fiscalyearid, fiscalyear, islocked, isselected) {
  try {
    

    await http.post(apiEndpoint, {
      fiscalyearid,
      fiscalyear,
      islocked,
      isselected,
    });
  } catch (ex) {
    return toast.error(
      "An Error Occured, while saving Fiscalyear of funds Please try again later" +
        ex
    );
  }
}
 


 