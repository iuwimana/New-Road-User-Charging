import http from "../httpService";
import apiUrl from "../../config.json";
import { toast } from "react-toastify";
const apiEndpoint = apiUrl.apiUrl + "/insurance/insurance";
//const apiEndpoints = apiUrl.apiUrl + "/declaration/declarationbyfiscalyear";
//const apiEndpointsum=apiUrl.apiUrl + "/annualtarget//annualtargetfiscalyearsum";
import { useNavigate } from 'react-router-dom';

{/**
  "InsuranceID": 0,
  "ItemName": "trafic right",
  "ItemPrice": 781245960  
    
    */}

const handleServiceUnavailable = () => {
    const navigate = useNavigate();
    navigate('/error503'); // Redirect to service unavailable page
  };
  
  export async function getAllInsurances() {
    try {
      const response = await http.get(apiEndpoint);
      return response;
    } catch (ex) {
      if (ex.response && ex.response.status === 503) {
        handleServiceUnavailable();
      } else {
        toast.error(
          "An error occurred while fetching road items. Please try again later.",
          { autoClose: 5000 }
        );
      }
      return null;
    }
  }
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
  
  
  export async function getInsuranceById(InsuranceID) {
    try {
      const response = await http.get(`${apiEndpoint}/${InsuranceID}`);
      return response.data;
    } catch (ex) {
      if (ex.response) {
        if (ex.response.status === 503) {
          handleServiceUnavailable();
        } else if (ex.response.status === 404) {
          toast.warning("Road item not found");
        } else {
          toast.error(
            `Failed to get road item: ${ex.response.data.error || ex.message}`,
            { autoClose: 5000 }
          );
        }
      }
      return null;
    }
  }
  
/**
 * Create or update an insurance record
 */
export async function saveInsurance(insurance) {
  try {
    const response = await http.post(apiEndpoint, {
      insuranceid: insurance.insuranceid || 0,
      companyname: insurance.companyname,
      policynumber: insurance.policynumber,
      startdate: insurance.startdate,
      enddate: insurance.enddate,
    });

    toast.success(response.data.message, { autoClose: 3000 });
    return response.data;
  } catch (ex) {
    if (ex.response) {
      if (ex.response.status === 503) {
        handleServiceUnavailable();
      } else {
        toast.error(
          `Failed to save insurance: ${ex.response.data.error || ex.message}`,
          { autoClose: 5000 }
        );
      }
    } else {
      toast.error("Network error occurred while saving insurance.");
    }
    return null;
  }
}

/**
 * Delete an insurance record
 */
export async function deleteInsurance(insuranceid) {
  try {
    const response = await http.delete(apiEndpoint, { data: { insuranceid } });
    toast.success("Insurance deleted successfully.", { autoClose: 3000 });
    return response.data;
  } catch (ex) {
    if (ex.response) {
      if (ex.response.status === 503) {
        handleServiceUnavailable();
      } else if (ex.response.status === 409) {
        toast.warning("The insurance record does not exist.");
      } else {
        toast.error(
          `Failed to delete insurance: ${ex.response.data.error || ex.message}`,
          { autoClose: 5000 }
        );
      }
    } else {
      toast.error("Network error occurred while deleting insurance.");
    }
    return null;
  }
}

export default {
  getAllInsurances,
  getInsuranceById,
  saveInsurance,
  deleteInsurance,
};
 

