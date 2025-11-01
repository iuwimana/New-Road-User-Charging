import http from "../httpService";
import apiUrl from "../../config.json";
import { toast } from "react-toastify";
const apiEndpoint = apiUrl.apiUrl + "/damagedItem/damagedItem";
const apiEndpoints = apiUrl.apiUrl + "/damagedItem/damagedItembyfiscalyear";
const apiEndpointdecl=apiUrl.apiUrl + "/damagedItem/damagedItembydeclarationid";
import { useNavigate } from 'react-router-dom';

{/**
  "SiteInspectionID": 0,
  "ItemName": "trafic right",
  "ItemPrice": 781245960  
    
    */}

const handleServiceUnavailable = () => {
    const navigate = useNavigate();
    navigate('/error503'); // Redirect to service unavailable page
  };
  
  export async function getAllSiteInspections() {
    try {
      const response = await http.get(apiEndpoint);
      return response.data;
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

  export async function getAllSiteInspectionbydeclaration(declarationid) {
    try {
    const response = await http.post(apiEndpointdecl,{declarationid});
      return response.data;
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

  export async function getAllSiteInspectionbyfiscalyears(FiscalYearID) {
    try {
    const response = await http.post(apiEndpoints,{FiscalYearID});
      return response.data;
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
  
  export async function getSiteInspectionById (DamagedItemID) {
    try {
      const response = await http.get(`${apiEndpoint}/${DamagedItemID}`);
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
  
  export async function saveSiteInspection(siteinspectionData) {
    try {
        // Construct payload according to backend expectations
        const payload = {
            DamagedItemID: siteinspectionData.DamagedItemID || 0, // Default to 0 for new items
            DeclarationID: parseInt(siteinspectionData.DeclarationID),
            ItemID: parseInt(siteinspectionData.ItemID)
        };

        // Remove any unnecessary fields that might cause validation issues
        delete payload.InspectionDate;
        delete payload.ItemPrice;
        delete payload.FiscalYearID;

        const isUpdate = payload.DamagedItemID > 0;
        
        const response = await http.post(apiEndpoint, payload);
        
        toast.success(
            `Site Inspection ${isUpdate ? 'updated' : 'created'} successfully!`,
            { autoClose: 3000 }
        );
        
        return response.data;
    } catch (ex) {
        let errorMessage = 'Failed to save inspection';
        
        if (ex.response) {
            const statusCode = ex.response.status;
            const errorData = ex.response.data;
            
            if (statusCode === 503) {
                handleServiceUnavailable();
            } else if (statusCode === 400) {
                errorMessage = errorData.details || errorData.error || 'Invalid data submitted';
            } else if (statusCode === 404) {
                errorMessage = 'Related declaration or item not found';
            } else if (statusCode === 409) {
                errorMessage = 'Duplicate entry detected';
            }
        } else if (ex.request) {
            errorMessage = 'No response from server - check your connection';
        }

        toast.error(errorMessage, { autoClose: 7000 });
        throw ex;
    }
}
  
  export async function deleteSiteInspection (DamagedItemID) {
    try {
      await http.delete(apiEndpoint, { data: { DamagedItemID: DamagedItemID } });
      toast.success("Site Inspection deleted successfully!", { autoClose: 3000 });
      return true;
    } catch (ex) {
      if (ex.response) {
        if (ex.response.status === 503) {
          handleServiceUnavailable();
        } else if (ex.response.status === 404) {
          toast.warning("Road item not found or already deleted");
        } else {
          toast.error(
            `Failed to delete road item: ${ex.response.data.error || ex.message}`,
            { autoClose: 5000 }
          );
        }
      }
      return false;
    }
  }
export default {
    deleteSiteInspection,
    saveSiteInspection ,
    getSiteInspectionById,
    getAllSiteInspectionbyfiscalyears,
    getAllSiteInspectionbydeclaration,
    getAllSiteInspections
  };
